# vellamo — marketing site

Single-page marketing website for Vellamo, a Finland-based structural health
monitoring company for marine and port infrastructure.

## Stack

- React 18 (functional components) + Vite
- Tailwind CSS 3 with brand colors exposed as CSS variables
- All graphics are inline SVG — no external images

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Editing copy

All section text lives in `src/content.js` — edit copy there without touching
layout code in `src/App.jsx`.

## Brand rules encoded in the code

- Palette variables in `src/index.css`; the marketing site uses blue / teal /
  ice / gray only. Amber and red are defined but reserved for the future
  product dashboard.
- The logo mark (`src/components/Graphics.jsx`) is strictly orthogonal — no
  diagonal lines.
- Team cards use placeholder icon avatars; comments in `src/App.jsx` mark
  where real photos go.
