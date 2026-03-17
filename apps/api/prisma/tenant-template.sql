CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS listings (
  id UUID PRIMARY KEY,
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  short_description TEXT NOT NULL,
  images JSONB NOT NULL DEFAULT '[]'::jsonb,
  cover_image TEXT,
  video_url TEXT,
  duration_hours DOUBLE PRECISION,
  duration_days INTEGER,
  location TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  meeting_point TEXT,
  difficulty TEXT,
  min_age INTEGER NOT NULL DEFAULT 0,
  max_participants INTEGER NOT NULL,
  min_participants INTEGER NOT NULL DEFAULT 1,
  inclusions JSONB NOT NULL DEFAULT '[]'::jsonb,
  exclusions JSONB NOT NULL DEFAULT '[]'::jsonb,
  what_to_bring JSONB NOT NULL DEFAULT '[]'::jsonb,
  cancellation_policy TEXT,
  faq JSONB NOT NULL DEFAULT '[]'::jsonb,
  base_price DOUBLE PRECISION NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  price_type TEXT NOT NULL DEFAULT 'per_person',
  status TEXT NOT NULL DEFAULT 'draft',
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  view_count INTEGER NOT NULL DEFAULT 0,
  booking_count INTEGER NOT NULL DEFAULT 0,
  average_rating DOUBLE PRECISION NOT NULL DEFAULT 0,
  review_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS availability (
  id UUID PRIMARY KEY,
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  available_slots INTEGER NOT NULL,
  booked_slots INTEGER NOT NULL DEFAULT 0,
  price_override DOUBLE PRECISION,
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE (listing_id, date)
);

CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY,
  booking_number TEXT NOT NULL UNIQUE,
  listing_id UUID NOT NULL REFERENCES listings(id),
  customer_id UUID NOT NULL REFERENCES customers(id),
  agent_id UUID,
  booking_date DATE NOT NULL,
  number_of_participants INTEGER NOT NULL,
  participants JSONB NOT NULL DEFAULT '[]'::jsonb,
  total_amount DOUBLE PRECISION NOT NULL,
  deposit_amount DOUBLE PRECISION,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  booking_status TEXT NOT NULL DEFAULT 'pending',
  special_requests TEXT,
  cancellation_reason TEXT,
  stripe_payment_intent_id TEXT,
  platform_commission DOUBLE PRECISION NOT NULL DEFAULT 0,
  agent_commission DOUBLE PRECISION,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(booking_status);
CREATE INDEX IF NOT EXISTS idx_bookings_payment_status ON bookings(payment_status);

CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY,
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES customers(id),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
