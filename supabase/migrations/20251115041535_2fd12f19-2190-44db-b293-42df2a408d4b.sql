-- Create bookings table for real-time token management
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id TEXT NOT NULL,
  hospital_id TEXT NOT NULL,
  patient_name TEXT NOT NULL,
  age INTEGER NOT NULL,
  gender TEXT NOT NULL,
  phone TEXT NOT NULL,
  booking_date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  token_number INTEGER NOT NULL,
  consultation_fee DECIMAL(10,2) NOT NULL,
  has_insurance BOOLEAN DEFAULT false,
  insurance_provider TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(doctor_id, hospital_id, booking_date, token_number)
);

-- Enable RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view bookings (to check availability)
CREATE POLICY "Anyone can view bookings"
ON public.bookings
FOR SELECT
USING (true);

-- Allow anyone to create bookings
CREATE POLICY "Anyone can create bookings"
ON public.bookings
FOR INSERT
WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX idx_bookings_doctor_date ON public.bookings(doctor_id, hospital_id, booking_date);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;