-- Fix function search path security warnings by setting search_path
-- Update existing functions to have secure search_path

-- Fix update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- Fix generate_booking_id function
CREATE OR REPLACE FUNCTION public.generate_booking_id()
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER SET search_path = public
AS $function$
DECLARE
  booking_id TEXT;
BEGIN
  booking_id := 'BK' || TO_CHAR(NOW(), 'YYYYMMDD') || LPAD((EXTRACT(EPOCH FROM NOW())::INTEGER % 10000)::TEXT, 4, '0');
  RETURN booking_id;
END;
$function$;

-- Fix set_booking_id function
CREATE OR REPLACE FUNCTION public.set_booking_id()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER SET search_path = public
AS $function$
BEGIN
  IF NEW.booking_id IS NULL OR NEW.booking_id = '' THEN
    NEW.booking_id := generate_booking_id();
  END IF;
  RETURN NEW;
END;
$function$;

-- Fix handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER SET search_path = public
AS $function$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$function$;