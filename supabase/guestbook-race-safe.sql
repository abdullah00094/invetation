-- Run once in Supabase Dashboard > SQL Editor.
-- Race-safe guest book wishes + failure logging.

-- 1. Idempotency key: one intent (client_id) maps to at most one row.
alter table public.guestbook_wishes
  add column if not exists client_id uuid;

-- Backfill existing rows so the NOT NULL + unique/PK change below succeeds.
update public.guestbook_wishes
set client_id = gen_random_uuid()
where client_id is null;

-- Existing duplicate wishes (same guest re-clicking) are historical data:
-- leave them, only new submissions get deduped by client_id.
alter table public.guestbook_wishes
  alter column client_id set not null;

-- Fast lookup for admin queries by time.
create index if not exists guestbook_wishes_created_at_idx
on public.guestbook_wishes (created_at desc);

-- Raise the DB wish-length cap from the old 500 to match the app (2000).
-- The old constraint name may vary per install: drop whichever exists.
alter table public.guestbook_wishes
  drop constraint if exists guestbook_wishes_wish_check;
alter table public.guestbook_wishes
  drop constraint if exists guestbook_wishes_wish_length_check;
alter table public.guestbook_wishes
  add constraint guestbook_wishes_wish_check
  check (char_length(wish) between 1 and 2000);

-- Unique constraint = the race guard. Two concurrent inserts with the same
-- client_id: the second blocks on the index, then hits the conflict clause,
-- so exactly one row survives even without an outer transaction.
create unique index if not exists guestbook_wishes_client_id_key
on public.guestbook_wishes (client_id);

-- 2. Failure log: every rejected/failed submission attempt lands here.
create table if not exists public.guestbook_failure_logs (
  id bigint generated always as identity primary key,
  request_id text not null,
  reason text not null check (reason in (
    'invalid_payload',
    'validation_failed',
    'rate_limited',
    'insert_failed',
    'unhandled_error'
  )),
  client_id uuid,
  payload_name text,
  payload_attendance text,
  payload_wish_length integer,
  error_message text,
  ip_address inet,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists guestbook_failure_logs_created_at_idx
on public.guestbook_failure_logs (created_at desc);

alter table public.guestbook_failure_logs enable row level security;
revoke all on table public.guestbook_failure_logs from anon, authenticated;

-- 3. Lock down direct anon writes to wishes: submissions must go through
-- the server route (service_role), which validates and logs failures.
alter table public.guestbook_wishes enable row level security;

drop policy if exists "anon can insert wishes" on public.guestbook_wishes;
revoke insert on table public.guestbook_wishes from anon, authenticated;
