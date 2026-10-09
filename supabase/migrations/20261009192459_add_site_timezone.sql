-- Time zone of the business (IANA name). Used to work out the upcoming classes
-- from the weekly schedule, wherever the server or the visitor is.
alter table public.site_settings
  add column timezone text not null default 'America/Bogota';
