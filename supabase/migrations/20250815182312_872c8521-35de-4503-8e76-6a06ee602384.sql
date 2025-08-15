-- Create labs table
CREATE TABLE public.labs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lab_name TEXT NOT NULL,
  city TEXT NOT NULL,
  address TEXT NOT NULL,
  logo_url TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  rating DECIMAL(3, 2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  phone TEXT,
  email TEXT,
  website TEXT,
  certifications TEXT[],
  timings TEXT NOT NULL DEFAULT '06:00-18:00',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create lab_tests junction table for which tests each lab offers
CREATE TABLE public.lab_tests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lab_id UUID NOT NULL REFERENCES public.labs(id) ON DELETE CASCADE,
  test_id TEXT NOT NULL,
  test_name TEXT NOT NULL,
  price INTEGER NOT NULL,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(lab_id, test_id)
);

-- Enable RLS
ALTER TABLE public.labs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lab_tests ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to labs" 
ON public.labs 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public read access to lab tests" 
ON public.lab_tests 
FOR SELECT 
USING (true);

-- Add indexes for performance
CREATE INDEX idx_labs_city ON public.labs(city);
CREATE INDEX idx_labs_active ON public.labs(is_active);
CREATE INDEX idx_lab_tests_lab_id ON public.lab_tests(lab_id);
CREATE INDEX idx_lab_tests_test_id ON public.lab_tests(test_id);

-- Create trigger for auto-updating timestamps
CREATE TRIGGER update_labs_updated_at
BEFORE UPDATE ON public.labs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_lab_tests_updated_at
BEFORE UPDATE ON public.lab_tests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample lab data
INSERT INTO public.labs (lab_name, city, address, rating, review_count, timings) VALUES
('Apollo Diagnostics', 'Hyderabad', 'Banjara Hills, Road No 12, Hyderabad, Telangana 500034', 4.6, 240, '06:00-18:00'),
('Dr Lal PathLabs', 'Hyderabad', 'Somajiguda, Hyderabad, Telangana 500082', 4.4, 180, '07:00-17:00'),
('Thyrocare', 'Hyderabad', 'Ameerpet, Hyderabad, Telangana 500016', 4.2, 320, '06:30-16:30'),
('SRL Diagnostics', 'Mumbai', 'Andheri West, Mumbai, Maharashtra 400058', 4.5, 290, '06:00-18:00'),
('Metropolis Healthcare', 'Mumbai', 'Bandra West, Mumbai, Maharashtra 400050', 4.3, 210, '07:00-17:30'),
('Quest Diagnostics', 'Delhi', 'Connaught Place, New Delhi, Delhi 110001', 4.4, 150, '06:00-17:00'),
('Pathkind Labs', 'Pune', 'Koregaon Park, Pune, Maharashtra 411001', 4.2, 130, '06:30-17:30');

-- Insert sample lab test offerings with prices
INSERT INTO public.lab_tests (lab_id, test_id, test_name, price) VALUES
-- Apollo Diagnostics (Hyderabad)
((SELECT id FROM public.labs WHERE lab_name = 'Apollo Diagnostics' LIMIT 1), 'CBC001', 'Complete Blood Count (CBC)', 350),
((SELECT id FROM public.labs WHERE lab_name = 'Apollo Diagnostics' LIMIT 1), 'LIP001', 'Lipid Profile', 450),
((SELECT id FROM public.labs WHERE lab_name = 'Apollo Diagnostics' LIMIT 1), 'THY001', 'Thyroid Function Test', 550),
((SELECT id FROM public.labs WHERE lab_name = 'Apollo Diagnostics' LIMIT 1), 'GLU001', 'Blood Glucose Test', 150),

-- Dr Lal PathLabs (Hyderabad)
((SELECT id FROM public.labs WHERE lab_name = 'Dr Lal PathLabs' LIMIT 1), 'CBC001', 'Complete Blood Count (CBC)', 320),
((SELECT id FROM public.labs WHERE lab_name = 'Dr Lal PathLabs' LIMIT 1), 'LIP001', 'Lipid Profile', 420),
((SELECT id FROM public.labs WHERE lab_name = 'Dr Lal PathLabs' LIMIT 1), 'THY001', 'Thyroid Function Test', 520),
((SELECT id FROM public.labs WHERE lab_name = 'Dr Lal PathLabs' LIMIT 1), 'KID001', 'Kidney Function Test', 380),

-- Thyrocare (Hyderabad)
((SELECT id FROM public.labs WHERE lab_name = 'Thyrocare' LIMIT 1), 'CBC001', 'Complete Blood Count (CBC)', 300),
((SELECT id FROM public.labs WHERE lab_name = 'Thyrocare' LIMIT 1), 'LIP001', 'Lipid Profile', 400),
((SELECT id FROM public.labs WHERE lab_name = 'Thyrocare' LIMIT 1), 'THY001', 'Thyroid Function Test', 480),
((SELECT id FROM public.labs WHERE lab_name = 'Thyrocare' LIMIT 1), 'LIV001', 'Liver Function Test', 350);

-- Add lab_id column to bookings table to track which lab was selected
ALTER TABLE public.bookings ADD COLUMN lab_id UUID REFERENCES public.labs(id);
ALTER TABLE public.bookings ADD COLUMN lab_name TEXT;
ALTER TABLE public.bookings ADD COLUMN selected_city TEXT;