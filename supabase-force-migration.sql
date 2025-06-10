-- Aggressive migration script to completely remove old tables
-- Use this if the previous migration didn't work

-- Drop tables with CASCADE to remove all dependencies
drop table if exists public.thought_tags cascade;
drop table if exists public.tags cascade; 
drop table if exists public.categories cascade;

-- Ensure foreign key constraint is dropped from thoughts table
alter table public.thoughts 
drop constraint if exists thoughts_category_id_fkey;

-- Drop the category_id column if it still exists
alter table public.thoughts 
drop column if exists category_id cascade;

-- Drop the is_archived column
alter table public.thoughts 
drop column if exists is_archived cascade;

-- Add tags column to thoughts table (if it doesn't exist)
alter table public.thoughts 
add column if not exists tags text[] default '{}';

-- Create index for tags array
drop index if exists public.thoughts_tags_idx;
create index thoughts_tags_idx on public.thoughts using gin(tags);

-- Update any existing thoughts to have empty tags array
update public.thoughts set tags = '{}' where tags is null;

-- Clean up any orphaned indexes
drop index if exists public.thoughts_category_id_idx;
drop index if exists public.categories_user_id_idx;
drop index if exists public.thoughts_is_archived_idx; 