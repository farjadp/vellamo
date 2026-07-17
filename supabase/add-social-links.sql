-- Run this in the Supabase SQL Editor if you already created the schema
-- and only need to add the social_links table.

create table if not exists public.social_links (
  id bigint generated always as identity primary key,
  platform text not null,
  url text not null,
  display_order integer not null default 0,
  active boolean not null default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

comment on table public.social_links is 'Social media links shown in the footer';

alter table public.social_links enable row level security;

create policy "Public read social" on public.social_links
  for select to anon using (active = true);

create policy "Admin manage social" on public.social_links
  for all to authenticated using (true) with check (true);
