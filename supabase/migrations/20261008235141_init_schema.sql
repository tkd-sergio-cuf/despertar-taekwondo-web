-- Initial schema. Source of truth: docs/data-model.md.

-- ---------------------------------------------------------------------------
-- updated_at trigger
-- ---------------------------------------------------------------------------

create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Identity and general content
-- ---------------------------------------------------------------------------

create table public.site_settings (
  id uuid primary key default gen_random_uuid(),
  singleton boolean not null default true unique check (singleton),
  business_name text not null,
  business_subtitle text not null,
  city text not null,
  footer_description text not null,
  copyright_text text not null,
  logo_path text not null,
  logo_alt text not null,
  favicon_path text not null,
  og_image_path text not null,
  seo_title text not null,
  seo_description text not null,
  whatsapp_number text not null,
  free_class_message text not null,
  phone text,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.hero (
  id uuid primary key default gen_random_uuid(),
  singleton boolean not null default true unique check (singleton),
  eyebrow text not null,
  title text not null,
  title_highlight text not null,
  subtitle text not null,
  primary_cta_label text not null,
  secondary_cta_label text not null,
  badge_text text not null,
  image_path text not null,
  image_alt text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.stats (
  id uuid primary key default gen_random_uuid(),
  value text not null,
  label text not null,
  description text not null,
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.section_content (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  eyebrow text,
  title text not null,
  subtitle text,
  body text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.values_principles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  name_ko text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Classes and schedule
-- ---------------------------------------------------------------------------

create table public.class_groups (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  label text not null,
  color_dot text not null,
  color_soft text not null,
  color_ink text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.class_types (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  group_id uuid not null references public.class_groups (id) on delete restrict,
  name text not null,
  description text not null,
  highlights text[] not null default '{}',
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.programs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  audience_label text not null,
  description text not null,
  time_label text not null,
  group_id uuid references public.class_groups (id) on delete set null,
  color text,
  image_path text,
  image_alt text,
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Locations
-- ---------------------------------------------------------------------------

create table public.locations (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  short_name text not null,
  neighborhood_label text not null,
  address text not null,
  reference text,
  phone text,
  whatsapp_message text,
  maps_url text not null,
  map_embed_url text,
  main_image_path text not null,
  main_image_alt text not null,
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.location_images (
  id uuid primary key default gen_random_uuid(),
  location_id uuid not null references public.locations (id) on delete cascade,
  path text not null,
  alt text not null,
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.schedule_slots (
  id uuid primary key default gen_random_uuid(),
  location_id uuid not null references public.locations (id) on delete cascade,
  class_type_id uuid not null references public.class_types (id) on delete restrict,
  weekday smallint not null check (weekday between 1 and 7),
  start_time time not null,
  end_time time not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_time > start_time)
);

-- ---------------------------------------------------------------------------
-- People and reviews
-- ---------------------------------------------------------------------------

create table public.instructors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  rank text not null,
  bio text not null,
  photo_path text not null,
  photo_alt text not null,
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  author_name text not null,
  author_meta text not null,
  rating smallint not null check (rating between 1 and 5),
  source text not null default 'manual',
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Contact and lead capture
-- ---------------------------------------------------------------------------

create table public.social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null,
  url text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Inbound data, not content: no updated_at.
create table public.free_class_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  whatsapp text not null,
  audience text not null,
  location_id uuid not null references public.locations (id) on delete restrict,
  class_group_id uuid references public.class_groups (id) on delete set null,
  status text not null default 'new' check (status in ('new', 'contacted', 'done')),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Indexes on foreign keys
-- ---------------------------------------------------------------------------

create index class_types_group_id_idx on public.class_types (group_id);
create index programs_group_id_idx on public.programs (group_id);
create index location_images_location_id_idx on public.location_images (location_id);
create index schedule_slots_location_id_idx on public.schedule_slots (location_id);
create index schedule_slots_class_type_id_idx on public.schedule_slots (class_type_id);
create index free_class_requests_location_id_idx on public.free_class_requests (location_id);
create index free_class_requests_class_group_id_idx on public.free_class_requests (class_group_id);

-- ---------------------------------------------------------------------------
-- updated_at triggers (all content tables)
-- ---------------------------------------------------------------------------

do $$
declare
  t text;
begin
  foreach t in array array[
    'site_settings', 'hero', 'stats', 'section_content', 'values_principles',
    'class_groups', 'class_types', 'programs', 'locations', 'location_images',
    'schedule_slots', 'instructors', 'testimonials', 'faqs', 'social_links'
  ] loop
    execute format(
      'create trigger set_updated_at before update on public.%I
         for each row execute function public.set_updated_at()',
      t
    );
  end loop;
end;
$$;

-- ---------------------------------------------------------------------------
-- Privileges
-- The remote project does not expose new tables to the Data API automatically,
-- so every privilege is granted explicitly here. RLS then filters the rows.
-- ---------------------------------------------------------------------------

revoke all on all tables in schema public from anon, authenticated;
revoke execute on function public.set_updated_at() from public, anon, authenticated;

grant usage on schema public to anon, authenticated;

-- Content: the public reads, authenticated users manage.
grant select on
  public.site_settings, public.hero, public.stats, public.section_content,
  public.values_principles, public.class_groups, public.class_types,
  public.programs, public.locations, public.location_images,
  public.schedule_slots, public.instructors, public.testimonials,
  public.faqs, public.social_links
to anon;

grant select, insert, update, delete on
  public.site_settings, public.hero, public.stats, public.section_content,
  public.values_principles, public.class_groups, public.class_types,
  public.programs, public.locations, public.location_images,
  public.schedule_slots, public.instructors, public.testimonials,
  public.faqs, public.social_links
to authenticated;

-- Free class requests: the public can only insert the form fields.
grant insert (full_name, whatsapp, audience, location_id, class_group_id)
  on public.free_class_requests to anon;
grant select, insert, update, delete on public.free_class_requests to authenticated;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.site_settings enable row level security;
alter table public.hero enable row level security;
alter table public.stats enable row level security;
alter table public.section_content enable row level security;
alter table public.values_principles enable row level security;
alter table public.class_groups enable row level security;
alter table public.class_types enable row level security;
alter table public.programs enable row level security;
alter table public.locations enable row level security;
alter table public.location_images enable row level security;
alter table public.schedule_slots enable row level security;
alter table public.instructors enable row level security;
alter table public.testimonials enable row level security;
alter table public.faqs enable row level security;
alter table public.social_links enable row level security;
alter table public.free_class_requests enable row level security;

-- Authenticated users manage all content.
do $$
declare
  t text;
begin
  foreach t in array array[
    'site_settings', 'hero', 'stats', 'section_content', 'values_principles',
    'class_groups', 'class_types', 'programs', 'locations', 'location_images',
    'schedule_slots', 'instructors', 'testimonials', 'faqs', 'social_links',
    'free_class_requests'
  ] loop
    execute format(
      'create policy "Authenticated users manage rows" on public.%I
         for all to authenticated using (true) with check (true)',
      t
    );
  end loop;
end;
$$;

-- Public read: tables without is_published expose every row.
do $$
declare
  t text;
begin
  foreach t in array array[
    'site_settings', 'hero', 'section_content', 'values_principles',
    'class_groups', 'social_links'
  ] loop
    execute format(
      'create policy "Public reads all rows" on public.%I
         for select to anon using (true)',
      t
    );
  end loop;
end;
$$;

-- Public read: tables with is_published expose only published rows.
do $$
declare
  t text;
begin
  foreach t in array array[
    'stats', 'class_types', 'programs', 'locations', 'instructors',
    'testimonials', 'faqs'
  ] loop
    execute format(
      'create policy "Public reads published rows" on public.%I
         for select to anon using (is_published)',
      t
    );
  end loop;
end;
$$;

-- A hidden location also hides its thumbnails and its schedule.
create policy "Public reads published rows" on public.location_images
  for select to anon
  using (
    is_published
    and exists (
      select 1 from public.locations l
      where l.id = location_id and l.is_published
    )
  );

create policy "Public reads published rows" on public.schedule_slots
  for select to anon
  using (
    exists (
      select 1 from public.locations l
      where l.id = location_id and l.is_published
    )
    and exists (
      select 1 from public.class_types c
      where c.id = class_type_id and c.is_published
    )
  );

-- The public can submit the form but never read or change requests.
create policy "Public submits requests" on public.free_class_requests
  for insert to anon
  with check (status = 'new');

-- ---------------------------------------------------------------------------
-- Storage: public bucket site-media
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-media',
  'site-media',
  true,
  10485760,
  array['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'image/x-icon']
)
on conflict (id) do nothing;

-- Folder structure from docs/data-model.md (same placeholder Studio uses).
insert into storage.objects (bucket_id, name)
values
  ('site-media', 'brand/.emptyFolderPlaceholder'),
  ('site-media', 'hero/.emptyFolderPlaceholder'),
  ('site-media', 'programs/.emptyFolderPlaceholder'),
  ('site-media', 'locations/.emptyFolderPlaceholder'),
  ('site-media', 'instructors/.emptyFolderPlaceholder')
on conflict do nothing;

create policy "Public reads site-media" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'site-media');

create policy "Authenticated users upload to site-media" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'site-media');

create policy "Authenticated users update site-media" on storage.objects
  for update to authenticated
  using (bucket_id = 'site-media')
  with check (bucket_id = 'site-media');

create policy "Authenticated users delete from site-media" on storage.objects
  for delete to authenticated
  using (bucket_id = 'site-media');
