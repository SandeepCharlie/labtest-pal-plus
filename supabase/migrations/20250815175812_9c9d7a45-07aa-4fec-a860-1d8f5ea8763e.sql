-- Enable RLS on test_time_restrictions table
ALTER TABLE public.test_time_restrictions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to test time restrictions
CREATE POLICY "Allow public read access to test time restrictions" 
ON public.test_time_restrictions 
FOR SELECT 
USING (true);