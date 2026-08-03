/*
# Add branch, payment, and pickup fields to order_requests

Sirari Food Supply operates a main branch in Tanzania and a branch in Kenya.
Kenya customers pay and select a pick-up location when ordering. This migration
adds the columns needed to capture that information.

1. Modified Tables
- order_requests
  - branch (text) — which branch the order is for: "tanzania" or "kenya"
  - payment_method (text) — chosen payment method for Kenya orders
    (e.g. "mpesa", "cash", "bank"); null for Tanzania orders
  - pickup_location (text) — selected pick-up location for Kenya orders
    (e.g. "Nairobi CBD"); null for Tanzania orders

2. Notes
- All new columns are nullable. Tanzania orders leave payment_method and
  pickup_location null. Existing rows are unaffected.
- No security changes — RLS policies already allow anon CRUD.
*/

ALTER TABLE order_requests ADD COLUMN IF NOT EXISTS branch text;
ALTER TABLE order_requests ADD COLUMN IF NOT EXISTS payment_method text;
ALTER TABLE order_requests ADD COLUMN IF NOT EXISTS pickup_location text;
