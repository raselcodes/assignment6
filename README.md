# FitLog — Workout Library

A dark, no-nonsense gym companion. Browse a library of lifts, lock them into today's plan, save others for later, and watch your daily minutes and calories add up.

## Technologies Used

- Next.js 14 (App Router)
- React 18
- Tailwind CSS 3
- lucide-react icons
- Oswald + Inter (next/font)

## Features

1. **Workout library** — 12 lifts from the FitLog API in a responsive 3-column grid with a loading animation.
2. **Sort & search** — sort by Duration, Calories or Rating, and search by name or muscle group.
3. **Workout details** — two-column page with key specs, 4-step instructions and image.
4. **Plan & Saved** — add to today's plan (capped at 5 lifts) or save for later; navbar badges update live.
5. **My Plan dashboard** — live Exercises / Minutes / Calories totals, Mark as Done, remove, and empty states.
6. **Persistence & toasts** — plan and saved lists survive reloads via localStorage; every action shows a toast.
7. **Fully responsive** with a custom 404 page.

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deployment

Deploy to Vercel (zero config). Reloading any route works because Next.js serves every route.

## API

- All: `https://api.abcz.workers.dev/api/fitlog`
- Single: `https://api.abcz.workers.dev/api/fitlog/:id`
- Fallback: `https://api.api-store.workers.dev/api/fitlog`
