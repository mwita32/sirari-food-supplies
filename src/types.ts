export interface PackageOption {
  size: string;
  weightKg: number;
  price: number;
}

export interface RiceProduct {
  id: string;
  grade: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  features: string[];
  packages: PackageOption[];
  accent: 'forest' | 'gold' | 'clay';
}

export interface Room {
  id: string;
  type: string;
  pricePerNight: number;
  capacity: number;
  beds: string;
  view: string;
  size: string;
  image: string;
  amenities: string[];
  popular?: boolean;
}

export interface GuestHouse {
  id: string;
  name: string;
  location: string;
  blurb: string;
  description: string;
  image: string;
  gallery: string[];
  highlights: string[];
  rooms: Room[];
  startingPrice: number;
  mapUrl: string;
  whatsappNumbers: string[];
}

export const ALL_PREFERENCES = [
  'Wi-Fi',
  'Breakfast included',
  'Air conditioning',
  'River view',
  'Mountain view',
  'Balcony',
  'Family room',
  'Fireplace',
] as const;

export type Preference = (typeof ALL_PREFERENCES)[number];

export interface BookingPayload {
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  guest_house: string;
  room_type: string;
  check_in: string;
  check_out: string;
  guests: number;
  preferences: string[];
  price_per_night: number;
  total_nights: number;
  total_price: number;
  special_requests: string;
}

export interface OrderPayload {
  customer_name: string;
  customer_phone: string;
  rice_grade: string;
  package_size: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  delivery_notes: string;
  branch: string;
  payment_method: string | null;
  pickup_location: string | null;
}
