-- Free class form: ask for the age instead of the class of interest.

-- Age range the form accepts; a business rule, so it lives with the site settings.
alter table public.site_settings
  add column free_class_min_age smallint not null default 5,
  add column free_class_max_age smallint not null default 80,
  add check (free_class_min_age between 1 and free_class_max_age),
  add check (free_class_max_age <= 120);

-- Dropping the column also drops its index, foreign key and column grant.
alter table public.free_class_requests
  drop column class_group_id,
  add column age smallint not null check (age between 1 and 120);

-- The public can only insert the form fields (see the initial migration).
grant insert (age) on public.free_class_requests to anon;
