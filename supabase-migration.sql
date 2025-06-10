-- Migration script to update existing database
-- Run this in your Supabase SQL Editor instead of the schema.sql

-- First, drop the tables and policies we no longer need
drop policy if exists "Users can view their own thought tags" on public.thought_tags;
drop policy if exists "Users can insert their own thought tags" on public.thought_tags;
drop policy if exists "Users can delete their own thought tags" on public.thought_tags;
drop table if exists public.thought_tags;

drop policy if exists "Anyone can view tags" on public.tags;
drop policy if exists "Authenticated users can create tags" on public.tags;
drop table if exists public.tags;

drop policy if exists "Users can view their own categories" on public.categories;
drop policy if exists "Users can insert their own categories" on public.categories;
drop policy if exists "Users can update their own categories" on public.categories;
drop policy if exists "Users can delete their own categories" on public.categories;
drop table if exists public.categories;

-- Drop foreign key constraint first
alter table public.thoughts 
drop constraint if exists thoughts_category_id_fkey;

-- Drop old indexes that reference category_id
drop index if exists public.thoughts_category_id_idx;
drop index if exists public.categories_user_id_idx;

-- Add tags column to thoughts table (if it doesn't exist)
alter table public.thoughts 
add column if not exists tags text[] default '{}';

-- Remove category_id column from thoughts table (if it exists)
alter table public.thoughts 
drop column if exists category_id;

-- Create new index for tags array
create index if not exists thoughts_tags_idx on public.thoughts using gin(tags);

-- Update any existing thoughts to have empty tags array if null
update public.thoughts set tags = '{}' where tags is null; 