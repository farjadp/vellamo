-- ---------------------------------------------------------------------------
-- The actual product: structures being monitored, their sensors, sensor
-- readings, computed condition snapshots, and alerts.
--
-- MVP scope (see Mission Control): synthetic sensor data (packages/simulator)
-- feeding a simple statistical model, not a real fluid-structure-interaction
-- / fatigue physics engine. Schema is designed so a real physics engine can
-- later write into condition_snapshots the same way the simulator does now.
-- ---------------------------------------------------------------------------

-- 1. Structures ---------------------------------------------------------
create table if not exists public.structures (
  id bigint generated always as identity primary key,
  key text not null unique,
  name text not null,
  structure_type text not null default 'quay', -- quay | foundation | hull | berth
  location text,
  commissioned_on date,
  active boolean not null default true,
  created_at timestamp with time zone default now()
);

comment on table public.structures is 'Physical structures being monitored (quays, foundations, hulls, etc.)';

-- 2. Sensors --------------------------------------------------------------
create table if not exists public.sensors (
  id bigint generated always as identity primary key,
  structure_id bigint not null references public.structures (id) on delete cascade,
  key text not null,
  sensor_type text not null, -- strain | vibration | tilt
  unit text not null,
  baseline_mean numeric not null default 0,
  baseline_stddev numeric not null default 1,
  warn_z numeric not null default 2.5,   -- z-score threshold for "watch"
  alert_z numeric not null default 4,    -- z-score threshold for "attention"
  drift_per_reading numeric not null default 0, -- simulator-only: slow synthetic degradation per tick
  active boolean not null default true,
  created_at timestamp with time zone default now(),
  unique (structure_id, key)
);

comment on table public.sensors is 'Sensors attached to a structure; baseline/thresholds drive the simple statistical model';

-- 3. Sensor readings (time series) ----------------------------------------
create table if not exists public.sensor_readings (
  id bigint generated always as identity primary key,
  sensor_id bigint not null references public.sensors (id) on delete cascade,
  recorded_at timestamp with time zone not null default now(),
  value numeric not null
);

comment on table public.sensor_readings is 'Raw time-series sensor data — synthetic for now (packages/simulator)';

create index if not exists sensor_readings_sensor_time_idx
  on public.sensor_readings (sensor_id, recorded_at desc);

-- 4. Condition snapshots (the "digital twin" output, simple model for MVP) --
create table if not exists public.condition_snapshots (
  id bigint generated always as identity primary key,
  structure_id bigint not null references public.structures (id) on delete cascade,
  computed_at timestamp with time zone not null default now(),
  status text not null default 'healthy', -- healthy | watch | attention
  remaining_life_pct numeric not null default 100,
  summary text not null default '',
  created_at timestamp with time zone default now()
);

comment on table public.condition_snapshots is 'Point-in-time condition assessment per structure, computed by the simulator''s statistical model today, a real physics engine later';

create index if not exists condition_snapshots_structure_time_idx
  on public.condition_snapshots (structure_id, computed_at desc);

-- 5. Alerts -----------------------------------------------------------------
create table if not exists public.alerts (
  id bigint generated always as identity primary key,
  structure_id bigint not null references public.structures (id) on delete cascade,
  sensor_id bigint references public.sensors (id) on delete set null,
  severity text not null default 'warning', -- info | warning | critical
  message text not null,
  acknowledged boolean not null default false,
  created_at timestamp with time zone default now()
);

comment on table public.alerts is 'Early alerts raised by the condition model';

-- 6. RLS: product data is authenticated-only for now (no separate customer
--    accounts yet — same admin/pilot users as the marketing admin panel) ----
alter table public.structures enable row level security;
alter table public.sensors enable row level security;
alter table public.sensor_readings enable row level security;
alter table public.condition_snapshots enable row level security;
alter table public.alerts enable row level security;

create policy "Authenticated read structures" on public.structures
  for select to authenticated using (true);
create policy "Authenticated manage structures" on public.structures
  for all to authenticated using (true) with check (true);

create policy "Authenticated read sensors" on public.sensors
  for select to authenticated using (true);
create policy "Authenticated manage sensors" on public.sensors
  for all to authenticated using (true) with check (true);

create policy "Authenticated read readings" on public.sensor_readings
  for select to authenticated using (true);
create policy "Authenticated manage readings" on public.sensor_readings
  for all to authenticated using (true) with check (true);

create policy "Authenticated read snapshots" on public.condition_snapshots
  for select to authenticated using (true);
create policy "Authenticated manage snapshots" on public.condition_snapshots
  for all to authenticated using (true) with check (true);

create policy "Authenticated read alerts" on public.alerts
  for select to authenticated using (true);
create policy "Authenticated manage alerts" on public.alerts
  for all to authenticated using (true) with check (true);
