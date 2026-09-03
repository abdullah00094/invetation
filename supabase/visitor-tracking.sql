-- Run once in Supabase Dashboard > SQL Editor.
create table if not exists public.site_visitors (
  visitor_id uuid primary key,
  ip_address inet,
  user_agent text not null,
  device_type text not null check (device_type in ('mobile', 'tablet', 'desktop')),
  visit_count bigint not null default 0 check (visit_count >= 0),
  open_count bigint not null default 0 check (open_count >= 0),
  first_visited_at timestamptz not null default now(),
  last_visited_at timestamptz not null default now(),
  first_opened_at timestamptz,
  last_opened_at timestamptz,
  country_code text,
  region text,
  city text
);

-- Upgrade installations created by the earlier privacy-preserving version.
alter table public.site_visitors add column if not exists ip_address inet;
alter table public.site_visitors drop column if exists ip_hash;
alter table public.site_visitors add column if not exists open_count bigint not null default 0;
alter table public.site_visitors add column if not exists first_opened_at timestamptz;
alter table public.site_visitors add column if not exists last_opened_at timestamptz;
alter table public.site_visitors add column if not exists country_code text;
alter table public.site_visitors add column if not exists region text;
alter table public.site_visitors add column if not exists city text;
alter table public.site_visitors alter column visit_count set default 0;
alter table public.site_visitors drop constraint if exists site_visitors_visit_count_check;
alter table public.site_visitors add constraint site_visitors_visit_count_check
check (visit_count >= 0);

alter table public.site_visitors enable row level security;
revoke all on table public.site_visitors from anon, authenticated;

drop function if exists public.record_site_visit(uuid, text, text, text);
drop function if exists public.record_site_visit(uuid, text, text, text, text, text, text, text);

create function public.record_site_visit(
  p_visitor_id uuid,
  p_ip_address text,
  p_user_agent text,
  p_device_type text,
  p_event text,
  p_country_code text,
  p_region text,
  p_city text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.site_visitors (
    visitor_id,
    ip_address,
    user_agent,
    device_type,
    visit_count,
    open_count,
    first_opened_at,
    last_opened_at,
    country_code,
    region,
    city
  ) values (
    p_visitor_id,
    nullif(p_ip_address, '')::inet,
    left(p_user_agent, 500),
    p_device_type,
    case when p_event = 'visit' then 1 else 0 end,
    case when p_event = 'invitation_open' then 1 else 0 end,
    case when p_event = 'invitation_open' then now() else null end,
    case when p_event = 'invitation_open' then now() else null end,
    p_country_code,
    p_region,
    p_city
  )
  on conflict (visitor_id) do update set
    ip_address = excluded.ip_address,
    user_agent = excluded.user_agent,
    device_type = excluded.device_type,
    visit_count = public.site_visitors.visit_count
      + case when p_event = 'visit' then 1 else 0 end,
    open_count = public.site_visitors.open_count
      + case when p_event = 'invitation_open' then 1 else 0 end,
    first_opened_at = case
      when p_event = 'invitation_open' then coalesce(public.site_visitors.first_opened_at, now())
      else public.site_visitors.first_opened_at
    end,
    last_opened_at = case
      when p_event = 'invitation_open' then now()
      else public.site_visitors.last_opened_at
    end,
    last_visited_at = case
      when p_event = 'visit' then now()
      else public.site_visitors.last_visited_at
    end,
    country_code = coalesce(excluded.country_code, public.site_visitors.country_code),
    region = coalesce(excluded.region, public.site_visitors.region),
    city = coalesce(excluded.city, public.site_visitors.city);
end;
$$;

revoke all on function public.record_site_visit(uuid, text, text, text, text, text, text, text)
from public, anon, authenticated;
grant execute on function public.record_site_visit(uuid, text, text, text, text, text, text, text)
to service_role;

create index if not exists site_visitors_last_visited_at_idx
on public.site_visitors (last_visited_at desc);
