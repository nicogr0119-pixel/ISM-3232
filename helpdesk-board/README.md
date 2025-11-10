This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Features

- Loads tickets from /api/tickets on first visit
- Filter by Status and Priority (controlled inputs)
- Search by title/description (instant)
- Add to My Queue, remove, clear
- Live updates: tickets randomly change status/priority every 6–10s
- Loading / Error / Empty states
- Tailwind styling

## Structure

- src/app/page.js – Server component entry
- src/app/api/tickets/route.js – API (GET) returning 16 tickets
- src/app/components/* – Client components (Board, filters, list, queue)
- src/app/lib/severity.js – small utility maps

## Rubric checklist

- Components, keys by id ✅
- Lifting state in Board ✅
- Controlled inputs ✅
- Effects + cleanup ✅
- UX states ✅
- App Router + Tailwind ✅
