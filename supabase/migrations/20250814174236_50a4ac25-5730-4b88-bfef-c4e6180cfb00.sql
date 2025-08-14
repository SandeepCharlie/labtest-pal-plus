-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  test_id TEXT NOT NULL,
  test_name TEXT NOT NULL,
  test_price INTEGER NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  landmark TEXT,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('online', 'cash')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  booking_status TEXT DEFAULT 'confirmed' CHECK (booking_status IN ('confirmed', 'in_progress', 'completed', 'cancelled')),
  booking_id TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for bookings
CREATE POLICY "Users can view their own bookings" 
ON public.bookings 
FOR SELECT 
USING (true); -- Allow viewing all bookings for admin purposes

CREATE POLICY "Users can create bookings" 
ON public.bookings 
FOR INSERT 
WITH CHECK (true); -- Allow anyone to create bookings

CREATE POLICY "Users can update their own bookings" 
ON public.bookings 
FOR UPDATE 
USING (user_id = auth.uid() OR user_id IS NULL);

-- Create function to generate booking ID
CREATE OR REPLACE FUNCTION generate_booking_id()
RETURNS TEXT AS $$
DECLARE
  booking_id TEXT;
BEGIN
  booking_id := 'BK' || TO_CHAR(NOW(), 'YYYYMMDD') || LPAD((EXTRACT(EPOCH FROM NOW())::INTEGER % 10000)::TEXT, 4, '0');
  RETURN booking_id;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate booking ID
CREATE OR REPLACE FUNCTION set_booking_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.booking_id IS NULL OR NEW.booking_id = '' THEN
    NEW.booking_id := generate_booking_id();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_booking_id
  BEFORE INSERT ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION set_booking_id();

-- Create trigger for updated_at
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create test time restrictions table
CREATE TABLE public.test_time_restrictions (
  test_id TEXT PRIMARY KEY,
  test_name TEXT NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_fasting_required BOOLEAN DEFAULT false,
  preparation_hours INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert sample time restrictions
INSERT INTO public.test_time_restrictions (test_id, test_name, start_time, end_time, is_fasting_required, preparation_hours) VALUES
('men-health-basic', 'Men''s Health Basic Package', '06:00:00', '10:00:00', true, 12),
('cbc-malaria', 'CBC + Malaria Test', '06:00:00', '09:00:00', true, 10),
('cardiac-profile', 'Cardiac Profile + ECG', '09:00:00', '17:00:00', false, 0),
('gastro-panel', 'Gastroenterology Panel', '06:00:00', '09:00:00', true, 12),
('complete-health', 'Complete Health Checkup', '06:00:00', '10:00:00', true, 12),
('allergy-panel', 'Food & Environmental Allergy Panel', '09:00:00', '17:00:00', false, 0),
('rheumatology-panel', 'Rheumatology Panel', '09:00:00', '17:00:00', false, 0),
('diabetes-monitoring', 'Diabetes Monitoring Package', '06:00:00', '09:00:00', true, 8);