
-- Allow anyone to update order status
CREATE POLICY "Anyone can update order status" ON public.orders FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
