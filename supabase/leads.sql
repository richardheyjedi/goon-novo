-- Execute este arquivo uma única vez no SQL Editor do Supabase.
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 120),
  phone text not null check (char_length(phone) between 6 and 40),
  revenue text not null check (char_length(revenue) between 1 and 120),
  instagram text not null check (char_length(instagram) between 1 and 120)
);

alter table public.leads enable row level security;

revoke all on table public.leads from anon, authenticated;
grant insert on table public.leads to anon, authenticated;
grant select, delete on table public.leads to authenticated;

drop policy if exists "Public can submit leads" on public.leads;
create policy "Public can submit leads"
on public.leads
for insert
to anon, authenticated
with check (true);

drop policy if exists "Authenticated users can read leads" on public.leads;
create policy "Authenticated users can read leads"
on public.leads
for select
to authenticated
using (true);

drop policy if exists "Authenticated users can delete leads" on public.leads;
create policy "Authenticated users can delete leads"
on public.leads
for delete
to authenticated
using (true);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
