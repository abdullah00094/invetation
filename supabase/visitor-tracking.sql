-- Run once in Supabase Dashboard > SQL Editor.
create table if not exists public.site_visitors (
  visitor_id uuid primary key,
  ip_hash text not null,
  user_agent text not null,
  device_type text not null check (device_type in ('mobile', 'tablet', 'desktop')),
  visit_count bigint not null default 1 check (visit_count > 0),
  first_visited_at timestamptz not null default now(),
  last_visited_at timestamptz not null default now()
);

alter table public.site_visitors enable row level security;
revoke all on table public.site_visitors from anon, authenticated;

create or replace function public.record_site_visit(
  p_visitor_id uuid,
  p_ip_hash text,
  p_user_agent text,
  p_device_type text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.site_visitors (
    visitor_id,
    ip_hash,
    user_agent,
    device_type
  ) values (
    p_visitor_id,
    p_ip_hash,
    left(p_user_agent, 500),
    p_device_type
  )
  on conflict (visitor_id) do update set
    ip_hash = excluded.ip_hash,
    user_agent = excluded.user_agent,
    device_type = excluded.device_type,
    visit_count = public.site_visitors.visit_count + 1,
    last_visited_at = now();
end;
$$;

revoke all on function public.record_site_visit(uuid, text, text, text)
from public, anon, authenticated;
grant execute on function public.record_site_visit(uuid, text, text, text)
to service_role;

create index if not exists site_visitors_last_visited_at_idx
on public.site_visitors (last_visited_at desc);
