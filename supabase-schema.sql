-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create thoughts table with tags as array
create table public.thoughts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  content text not null,
  tags text[] default '{}',
  color text default '#3B82F6',
  is_favorite boolean default false,
  user_id text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes for better performance
create index thoughts_user_id_idx on public.thoughts(user_id);
create index thoughts_created_at_idx on public.thoughts(created_at desc);
create index thoughts_is_favorite_idx on public.thoughts(is_favorite);
create index thoughts_tags_idx on public.thoughts using gin(tags);

-- Enable Row Level Security (RLS)
alter table public.thoughts enable row level security;

-- Create RLS policies for thoughts
create policy "Users can view their own thoughts" on public.thoughts
  for select using (auth.uid()::text = user_id);

create policy "Users can insert their own thoughts" on public.thoughts
  for insert with check (auth.uid()::text = user_id);

create policy "Users can update their own thoughts" on public.thoughts
  for update using (auth.uid()::text = user_id);

create policy "Users can delete their own thoughts" on public.thoughts
  for delete using (auth.uid()::text = user_id);

-- Create function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create trigger for thoughts table
create trigger update_thoughts_updated_at
  before update on public.thoughts
  for each row execute function update_updated_at_column(); 