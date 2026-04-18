create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'club_status') then
    create type public.club_status as enum ('established', 'coming-soon');
  end if;

  if not exists (select 1 from pg_type where typname = 'event_status') then
    create type public.event_status as enum ('upcoming', 'ongoing', 'completed', 'cancelled');
  end if;

  if not exists (select 1 from pg_type where typname = 'app_status') then
    create type public.app_status as enum ('pending', 'approved', 'rejected');
  end if;

  if not exists (select 1 from pg_type where typname = 'sponsor_tier') then
    create type public.sponsor_tier as enum ('platinum', 'gold', 'silver', 'bronze', 'partner');
  end if;

  if not exists (select 1 from pg_type where typname = 'user_role') then
    create type public.user_role as enum ('student', 'club-admin', 'faculty', 'super-admin');
  end if;

  if not exists (select 1 from pg_type where typname = 'social_platform') then
    create type public.social_platform as enum ('Instagram', 'LinkedIn', 'WhatsApp', 'GitHub', 'YouTube', 'Twitter', 'Discord');
  end if;
end
$$;

create table if not exists public.clubs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  tagline text,
  description text,
  color text not null,
  logo_url text,
  status public.club_status not null default 'established',
  order_index integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  roll_number text unique,
  email text unique,
  avatar_url text,
  linkedin_url text,
  resume_url text,
  gfg_username text,
  role public.user_role not null default 'student',
  created_at timestamptz not null default now()
);

create table if not exists public.club_members (
  id uuid primary key default gen_random_uuid(),
  club_id uuid not null references public.clubs (id) on delete cascade,
  profile_id uuid not null references public.profiles (id) on delete cascade,
  role_title text not null,
  role_rank integer not null default 100,
  is_active boolean not null default true,
  joined_at timestamptz not null default now(),
  unique (club_id, profile_id)
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  club_id uuid not null references public.clubs (id) on delete cascade,
  title text not null,
  description text,
  event_type text,
  status public.event_status not null default 'upcoming',
  venue text,
  lat double precision,
  lng double precision,
  geofence_radius integer not null default 120,
  start_at timestamptz,
  end_at timestamptz,
  reg_link text,
  cover_url text,
  created_by uuid not null references public.profiles (id) on delete restrict,
  created_at timestamptz not null default now()
);

create table if not exists public.attendance_sessions (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events (id) on delete set null,
  club_id uuid not null references public.clubs (id) on delete cascade,
  venue_name text,
  lat double precision not null,
  lng double precision not null,
  radius_m integer not null default 120,
  open boolean not null default true,
  created_by uuid not null references public.profiles (id) on delete restrict,
  created_at timestamptz not null default now(),
  closed_at timestamptz
);

create table if not exists public.attendance_records (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.attendance_sessions (id) on delete cascade,
  profile_id uuid not null references public.profiles (id) on delete cascade,
  marked_at timestamptz not null default now(),
  user_lat double precision,
  user_lng double precision,
  distance_m double precision,
  verified boolean not null default false,
  unique (session_id, profile_id)
);

create table if not exists public.student_id_applications (
  id uuid primary key default gen_random_uuid(),
  club_id uuid not null references public.clubs (id) on delete cascade,
  applicant_id uuid not null references public.profiles (id) on delete cascade,
  full_name text not null,
  roll_number text not null,
  extra_field text,
  status public.app_status not null default 'pending',
  reviewed_by uuid references public.profiles (id) on delete set null,
  reviewed_at timestamptz,
  id_card_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.deals (
  id uuid primary key default gen_random_uuid(),
  club_id uuid references public.clubs (id) on delete set null,
  title text not null,
  provider text,
  description text,
  coupon_code text,
  discount_pct numeric(5,2),
  link text,
  expires_at timestamptz,
  is_active boolean not null default true,
  cover_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.merch (
  id uuid primary key default gen_random_uuid(),
  club_id uuid not null references public.clubs (id) on delete cascade,
  name text not null,
  description text,
  price_inr numeric(10,2),
  image_url text,
  order_link text,
  available boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.sponsors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  website_url text,
  tier public.sponsor_tier not null default 'partner',
  description text,
  is_active boolean not null default true,
  order_index integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.social_links (
  id uuid primary key default gen_random_uuid(),
  club_id uuid references public.clubs (id) on delete cascade,
  platform public.social_platform not null,
  url text not null,
  label text,
  order_index integer not null default 0
);

create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid not null references public.profiles (id) on delete cascade,
  action text not null,
  target_table text not null,
  target_id uuid,
  ip_address inet,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_club_members_profile on public.club_members (profile_id);
create index if not exists idx_events_club on public.events (club_id, start_at);
create index if not exists idx_attendance_sessions_club on public.attendance_sessions (club_id, created_at desc);
create index if not exists idx_attendance_records_profile on public.attendance_records (profile_id, marked_at desc);
create index if not exists idx_student_id_applications_applicant on public.student_id_applications (applicant_id, created_at desc);
create index if not exists idx_deals_active on public.deals (is_active, expires_at);
create index if not exists idx_merch_club on public.merch (club_id, available);
create index if not exists idx_social_links_club on public.social_links (club_id, order_index);
create index if not exists idx_audit_log_actor on public.audit_log (actor_id, created_at desc);

create or replace function public.current_user_role()
returns public.user_role
language sql
stable
as $$
  select coalesce(
    (select role from public.profiles where id = auth.uid()),
    'student'::public.user_role
  )
$$;

create or replace function public.is_super_admin()
returns boolean
language sql
stable
as $$
  select public.current_user_role() = 'super-admin'::public.user_role
$$;

create or replace function public.can_manage_club(target_club_id uuid)
returns boolean
language sql
stable
as $$
  select
    public.current_user_role() in ('faculty'::public.user_role, 'super-admin'::public.user_role)
    or exists (
      select 1
      from public.club_members cm
      where cm.club_id = target_club_id
        and cm.profile_id = auth.uid()
        and cm.is_active = true
        and lower(cm.role_title) = 'president'
    )
$$;

alter table public.clubs enable row level security;
alter table public.profiles enable row level security;
alter table public.club_members enable row level security;
alter table public.events enable row level security;
alter table public.attendance_sessions enable row level security;
alter table public.attendance_records enable row level security;
alter table public.student_id_applications enable row level security;
alter table public.deals enable row level security;
alter table public.merch enable row level security;
alter table public.sponsors enable row level security;
alter table public.social_links enable row level security;
alter table public.audit_log enable row level security;

drop policy if exists "clubs public read" on public.clubs;
create policy "clubs public read" on public.clubs
for select using (true);

drop policy if exists "clubs super admin write" on public.clubs;
create policy "clubs super admin write" on public.clubs
for all using (public.is_super_admin()) with check (public.is_super_admin());

drop policy if exists "profiles public read" on public.profiles;
create policy "profiles public read" on public.profiles
for select using (true);

drop policy if exists "profiles own update" on public.profiles;
create policy "profiles own update" on public.profiles
for update using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "profiles own insert" on public.profiles;
create policy "profiles own insert" on public.profiles
for insert with check (auth.uid() = id);

drop policy if exists "club members public read" on public.club_members;
create policy "club members public read" on public.club_members
for select using (true);

drop policy if exists "club members club admin write" on public.club_members;
create policy "club members club admin write" on public.club_members
for all using (public.can_manage_club(club_id)) with check (public.can_manage_club(club_id));

drop policy if exists "events public read" on public.events;
create policy "events public read" on public.events
for select using (true);

drop policy if exists "events club admin write" on public.events;
create policy "events club admin write" on public.events
for all using (public.can_manage_club(club_id)) with check (public.can_manage_club(club_id));

drop policy if exists "attendance sessions auth read" on public.attendance_sessions;
create policy "attendance sessions auth read" on public.attendance_sessions
for select using (auth.role() = 'authenticated');

drop policy if exists "attendance sessions club admin write" on public.attendance_sessions;
create policy "attendance sessions club admin write" on public.attendance_sessions
for all using (public.can_manage_club(club_id)) with check (public.can_manage_club(club_id));

drop policy if exists "attendance records own insert" on public.attendance_records;
create policy "attendance records own insert" on public.attendance_records
for insert with check (auth.uid() = profile_id);

drop policy if exists "attendance records admin read" on public.attendance_records;
create policy "attendance records admin read" on public.attendance_records
for select using (
  public.is_super_admin()
  or exists (
    select 1
    from public.attendance_sessions s
    where s.id = session_id
      and public.can_manage_club(s.club_id)
  )
  or auth.uid() = profile_id
);

drop policy if exists "student id own read" on public.student_id_applications;
create policy "student id own read" on public.student_id_applications
for select using (
  auth.uid() = applicant_id
  or public.is_super_admin()
  or public.can_manage_club(club_id)
);

drop policy if exists "student id own insert" on public.student_id_applications;
create policy "student id own insert" on public.student_id_applications
for insert with check (auth.uid() = applicant_id);

drop policy if exists "student id admin update" on public.student_id_applications;
create policy "student id admin update" on public.student_id_applications
for update using (public.is_super_admin() or public.can_manage_club(club_id))
with check (public.is_super_admin() or public.can_manage_club(club_id));

drop policy if exists "deals public read" on public.deals;
create policy "deals public read" on public.deals
for select using (true);

drop policy if exists "deals admin write" on public.deals;
create policy "deals admin write" on public.deals
for all using (
  public.is_super_admin()
  or (club_id is not null and public.can_manage_club(club_id))
) with check (
  public.is_super_admin()
  or (club_id is not null and public.can_manage_club(club_id))
);

drop policy if exists "merch public read" on public.merch;
create policy "merch public read" on public.merch
for select using (true);

drop policy if exists "merch admin write" on public.merch;
create policy "merch admin write" on public.merch
for all using (public.can_manage_club(club_id)) with check (public.can_manage_club(club_id));

drop policy if exists "sponsors public read" on public.sponsors;
create policy "sponsors public read" on public.sponsors
for select using (true);

drop policy if exists "sponsors super admin write" on public.sponsors;
create policy "sponsors super admin write" on public.sponsors
for all using (public.is_super_admin()) with check (public.is_super_admin());

drop policy if exists "social links public read" on public.social_links;
create policy "social links public read" on public.social_links
for select using (true);

drop policy if exists "social links admin write" on public.social_links;
create policy "social links admin write" on public.social_links
for all using (
  public.is_super_admin()
  or (club_id is not null and public.can_manage_club(club_id))
) with check (
  public.is_super_admin()
  or (club_id is not null and public.can_manage_club(club_id))
);

drop policy if exists "audit log own insert" on public.audit_log;
create policy "audit log own insert" on public.audit_log
for insert with check (auth.uid() = actor_id);

drop policy if exists "audit log super admin read" on public.audit_log;
create policy "audit log super admin read" on public.audit_log
for select using (public.is_super_admin());

insert into public.clubs (slug, name, color, status, order_index)
values
  ('gfg', 'GfG Student Community', '#2F8D46', 'established', 1),
  ('nexora', 'Nexora - Tech Club', '#5E7287', 'established', 2),
  ('mehfil', 'Mehfil - Cultural Club', '#8B3A62', 'established', 3),
  ('spotlight', 'Spotlight - Campus Connect', '#CC7A00', 'established', 4),
  ('velocity', 'Velocity - Sports & E-Sports', '#1A5CA8', 'established', 5),
  ('sukham', 'Sukham - Wellness Club', '#2E7D5A', 'established', 6),
  ('hottake', 'HotTake - Debates', '#A83232', 'established', 7),
  ('ieee', 'IEEE Student Body', '#00629B', 'coming-soon', 8),
  ('placement', 'Student Placement Cell', '#4A4A8A', 'established', 9)
on conflict (slug) do update
set
  name = excluded.name,
  color = excluded.color,
  status = excluded.status,
  order_index = excluded.order_index;
