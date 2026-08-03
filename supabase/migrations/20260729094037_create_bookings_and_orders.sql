/*
# Create bookings and order_requests tables (single-tenant, no auth)

This is a marketing website for a rice brand ("Mavuno") that also operates
two guest houses. Visitors can submit room booking requests and rice order
requests without signing in. There is no sign-in screen, so the app runs as
the `anon` role for its entire lifetime. All policies therefore target
`anon, authenticated` and the data is intentionally public/shared.

1. New Tables
- `bookings`
  - id (uuid, primary key)
  - guest_name, guest_email, guest_phone — contact details
  - guest_house, room_type — chosen lodging
  - check_in, check_out, guests — stay details
  - preferences (text[]) — selected amenity preferences
  - price_per_night, total_nights, total_price — pricing snapshot
  - special_requests, status, created_at
- `order_requests`
  - id (uuid, primary key)
  - customer_name, customer_phone — contact details
  - rice_grade, package_size, quantity — product selection
  - unit_price, total_price — pricing snapshot
  - delivery_notes, status, created_at

2. Security
- Enable RLS on both tables.
- Allow anon + authenticated full CRUD because this is a single-tenant,
  no-auth marketing site and the submitted data is intentionally shared.
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name text NOT NULL,
  guest_email text NOT NULL,
  guest_phone text,
  guest_house text NOT NULL,
  room_type text NOT NULL,
  check_in date NOT NULL,
  check_out date NOT NULL,
  guests int NOT NULL DEFAULT 1,
  preferences text[] NOT NULL DEFAULT '{}',
  price_per_night numeric NOT NULL,
  total_nights int NOT NULL,
  total_price numeric NOT NULL,
  special_requests text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS order_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  rice_grade text NOT NULL,
  package_size text NOT NULL,
  quantity int NOT NULL DEFAULT 1,
  unit_price numeric NOT NULL,
  total_price numeric NOT NULL,
  delivery_notes text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_bookings_check_in ON bookings(check_in);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at);
CREATE INDEX IF NOT EXISTS idx_order_requests_created_at ON order_requests(created_at);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_bookings" ON bookings;
CREATE POLICY "anon_select_bookings" ON bookings FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_bookings" ON bookings;
CREATE POLICY "anon_insert_bookings" ON bookings FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_bookings" ON bookings;
CREATE POLICY "anon_update_bookings" ON bookings FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_bookings" ON bookings;
CREATE POLICY "anon_delete_bookings" ON bookings FOR DELETE
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_select_orders" ON order_requests;
CREATE POLICY "anon_select_orders" ON order_requests FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_orders" ON order_requests;
CREATE POLICY "anon_insert_orders" ON order_requests FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_orders" ON order_requests;
CREATE POLICY "anon_update_orders" ON order_requests FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_orders" ON order_requests;
CREATE POLICY "anon_delete_orders" ON order_requests FOR DELETE
  TO anon, authenticated USING (true);
