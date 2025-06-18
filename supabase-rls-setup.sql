-- Final RLS setup for Thought Cache
-- Run this in your Supabase SQL Editor

-- Drop existing policies that use auth.uid()
DROP POLICY IF EXISTS "Users can view their own thoughts" ON public.thoughts;
DROP POLICY IF EXISTS "Users can insert their own thoughts" ON public.thoughts;
DROP POLICY IF EXISTS "Users can update their own thoughts" ON public.thoughts;
DROP POLICY IF EXISTS "Users can delete their own thoughts" ON public.thoughts;

-- Disable RLS temporarily to allow API operations
ALTER TABLE public.thoughts DISABLE ROW LEVEL SECURITY;

-- Optional: If you want to re-enable RLS with proper policies later, uncomment below:
-- ALTER TABLE public.thoughts ENABLE ROW LEVEL SECURITY;

-- CREATE POLICY "Allow service role full access" ON public.thoughts
--   FOR ALL 
--   TO service_role 
--   USING (true) 
--   WITH CHECK (true);

-- CREATE POLICY "Allow authenticated operations with valid user_id" ON public.thoughts
--   FOR ALL 
--   TO authenticated, anon
--   USING (user_id IS NOT NULL AND user_id != '') 
--   WITH CHECK (user_id IS NOT NULL AND user_id != ''); 