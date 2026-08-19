# vellamo — monorepo

Vellamo is a Finland-based structural health monitoring company for marine
and port infrastructure. This repo holds the marketing site and, going
forward, the actual product (sensor data, digital twin, customer dashboard).

## Layout

```
apps/
  marketing/   The public site + admin panel (React + Vite + Tailwind).
                 This is what deploys to vellamo.io — see below.
  dashboard/   The product: customer-facing condition dashboard. (planned)
packages/
  simulator/   Synthetic sensor-data generator for demos, before real
                 hardware exists. (planned)
supabase/
  schema.sql   Shared database schema — marketing content tables today,
                 product tables (structures, sensors, readings, alerts)
                 as they're added.
```

## Run locally

```bash
npm install          # installs all workspaces
npm run dev           # marketing site, http://localhost:5173
```

## Build

```bash
npm run build
```

Builds the marketing app and writes output to the repo-root `dist/` —
Vercel's default Vite detection (root directory unset, output `dist`)
keeps working unchanged even though the app itself lives in
`apps/marketing/`.

## Editing marketing copy

All section text lives in `apps/marketing/src/content/{en,fi,sv}.js` — one
file per locale, same shape — edit copy there without touching layout code.

## Brand rules encoded in the code

- Palette variables in `apps/marketing/src/index.css`; the marketing site
  uses blue / teal / ice / gray only. Amber and red are defined but
  reserved for the product dashboard.
- The logo mark (`apps/marketing/src/components/Graphics.jsx`) is strictly
  orthogonal — no diagonal lines.
