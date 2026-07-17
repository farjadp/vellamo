-- Run this SQL in the Supabase SQL Editor (https://app.supabase.io/project/_/sql)
-- It creates the tables, Row Level Security policies, and a public storage bucket.

-- 1. SEO settings ----------------------------------------------------------
create table if not exists public.seo_settings (
  id bigint generated always as identity primary key,
  pathname text not null unique,
  title text,
  description text,
  og_title text,
  og_description text,
  keywords text,
  updated_at timestamp with time zone default now()
);

comment on table public.seo_settings is 'Per-route SEO metadata (pathname like / or /product)';

-- 2. Posts / Articles -------------------------------------------------------
create table if not exists public.posts (
  id bigint generated always as identity primary key,
  slug text not null unique,
  title text not null,
  tag text not null default 'Article',
  date date not null default current_date,
  excerpt text not null,
  body text not null default '',
  published boolean not null default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

comment on table public.posts is 'News and knowledge base articles';

-- 3. Team members -----------------------------------------------------------
-- Replaces/supplements hard-coded team members. If `public` is true and photo_url is set, it is shown on the site.
create table if not exists public.team_members (
  id bigint generated always as identity primary key,
  key text not null unique,
  name text not null,
  role text not null,
  bio text not null,
  photo_url text,
  display_order integer not null default 0,
  public boolean not null default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

comment on table public.team_members is 'Team members and advisors';

-- 4. Contact messages -------------------------------------------------------
create table if not exists public.messages (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  organization text,
  message text not null,
  read boolean not null default false,
  created_at timestamp with time zone default now()
);

comment on table public.messages is 'Messages submitted via the contact form';

-- 5. Site settings ----------------------------------------------------------
create table if not exists public.site_settings (
  id integer primary key default 1 check (id = 1),
  contact_email text default 'hello@vellamo.fi',
  updated_at timestamp with time zone default now()
);

insert into public.site_settings (id, contact_email) values (1, 'hello@vellamo.fi')
on conflict (id) do nothing;

comment on table public.site_settings is 'Global editable site settings';

-- 6. Enable Row Level Security (RLS) ----------------------------------------
alter table public.seo_settings enable row level security;
alter table public.posts enable row level security;
alter table public.team_members enable row level security;
alter table public.messages enable row level security;
alter table public.site_settings enable row level security;

-- 7. Policies: public can read published/visible data -----------------------
create policy "Public read seo" on public.seo_settings
  for select to anon using (true);

create policy "Public read posts" on public.posts
  for select to anon using (published = true);

create policy "Public read team" on public.team_members
  for select to anon using (public = true);

create policy "Public read settings" on public.site_settings
  for select to anon using (true);

-- 8. Policies: authenticated users (admins) can manage everything -----------
create policy "Admin manage seo" on public.seo_settings
  for all to authenticated using (true) with check (true);

create policy "Admin manage posts" on public.posts
  for all to authenticated using (true) with check (true);

create policy "Admin manage team" on public.team_members
  for all to authenticated using (true) with check (true);

create policy "Admin manage messages" on public.messages
  for all to authenticated using (true) with check (true);

create policy "Admin manage settings" on public.site_settings
  for all to authenticated using (true) with check (true);

-- 9. Storage bucket for team photos and article images ----------------------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- Public can read uploaded media
begin;
  drop policy if exists "Public read media" on storage.objects;
  create policy "Public read media" on storage.objects
    for select to anon using (bucket_id = 'media');

  drop policy if exists "Admin manage media" on storage.objects;
  create policy "Admin manage media" on storage.objects
    for all to authenticated using (bucket_id = 'media') with check (bucket_id = 'media');
commit;
