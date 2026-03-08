CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ime text NOT NULL,
  komentar text,
  ocena numeric(2,1) NOT NULL CHECK (ocena >= 0.5 AND ocena <= 5),
  kreirano timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read reviews" ON public.reviews FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can insert reviews" ON public.reviews FOR INSERT TO anon, authenticated WITH CHECK (true);