-- Role of the instructor in the school (e.g. "Fundador e instructor"), shown under the name.
alter table public.instructors
  add column role text;
