
-- Function to generate short 8-char IDs
CREATE OR REPLACE FUNCTION generate_short_id() RETURNS text AS $$
DECLARE
  chars text := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  result text := '';
  i integer;
BEGIN
  FOR i IN 1..8 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Drop foreign key first
ALTER TABLE public.order_items DROP CONSTRAINT IF EXISTS order_items_order_id_fkey;

-- Drop existing policies
DROP POLICY IF EXISTS "Anon can read own insert" ON public.orders;
DROP POLICY IF EXISTS "Anyone can submit orders" ON public.orders;
DROP POLICY IF EXISTS "Authenticated users can view orders" ON public.orders;
DROP POLICY IF EXISTS "Anon can read own insert items" ON public.order_items;
DROP POLICY IF EXISTS "Anyone can submit order items" ON public.order_items;
DROP POLICY IF EXISTS "Authenticated users can view order items" ON public.order_items;

-- Recreate orders table with Serbian names and short IDs
DROP TABLE public.order_items;
DROP TABLE public.orders;

CREATE TABLE public.orders (
  id text NOT NULL DEFAULT generate_short_id() PRIMARY KEY,
  ime_kupca text NOT NULL,
  telefon text NOT NULL,
  nacin_dostave text NOT NULL,
  adresa_dostave text,
  cena_dostave integer NOT NULL DEFAULT 0,
  ukupno integer NOT NULL,
  status text NOT NULL DEFAULT 'na_cekanju',
  kreirano timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE public.order_items (
  id text NOT NULL DEFAULT generate_short_id() PRIMARY KEY,
  narudzbina_id text NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  naziv_stavke text NOT NULL,
  cena_stavke integer NOT NULL,
  kolicina integer NOT NULL,
  dodaci text[],
  kreirano timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Anyone can submit orders" ON public.orders FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can read orders" ON public.orders FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can submit order items" ON public.order_items FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can read order items" ON public.order_items FOR SELECT TO anon, authenticated USING (true);
