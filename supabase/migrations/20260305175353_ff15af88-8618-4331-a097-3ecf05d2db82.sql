
-- Drop existing restrictive policies on orders
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;
DROP POLICY IF EXISTS "No public reads on orders" ON public.orders;

-- Drop existing restrictive policies on order_items
DROP POLICY IF EXISTS "Anyone can create order items" ON public.order_items;
DROP POLICY IF EXISTS "No public reads on order items" ON public.order_items;

-- Create permissive INSERT policy for orders (anon + authenticated)
CREATE POLICY "Anyone can submit orders" ON public.orders
FOR INSERT TO anon, authenticated
WITH CHECK (true);

-- Create permissive INSERT policy for order_items (anon + authenticated)
CREATE POLICY "Anyone can submit order items" ON public.order_items
FOR INSERT TO anon, authenticated
WITH CHECK (true);

-- Create permissive SELECT policy for orders (authenticated only)
CREATE POLICY "Authenticated users can view orders" ON public.orders
FOR SELECT TO authenticated
USING (true);

-- Create permissive SELECT policy for order_items (authenticated only)
CREATE POLICY "Authenticated users can view order items" ON public.order_items
FOR SELECT TO authenticated
USING (true);

-- Also allow anon to SELECT orders (needed for .select("id") after insert)
CREATE POLICY "Anon can read own insert" ON public.orders
FOR SELECT TO anon
USING (true);

CREATE POLICY "Anon can read own insert items" ON public.order_items
FOR SELECT TO anon
USING (true);
