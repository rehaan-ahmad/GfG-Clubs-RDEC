# RDEC Student Bodies Portal

Next.js 14 app for the RDEC student bodies portal. The project uses Supabase for auth, database, and storage, Resend for email, and the Stage 0 constants from `TODO.md` are codified in the app.

## Setup

1. Copy `.env.example` to `.env.local`.
2. Fill in the Supabase and Resend keys.
3. Start the app:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Stage 0 constants

- Supabase project: `clubs-portal` (`bouhbfufhdeeuukfoxqu`)
- Default geofence fallback: `28.6890`, `77.4538`
- Seeded clubs and hosting stack: `src/lib/constants/site.ts`

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Deploy on Vercel

Configure the same environment variables from `.env.example` in Vercel for Preview and Production.

## Status

- Stage 0 repo constants are implemented.
- Stage 1 repo setup is complete.
- External infra steps in `TODO.md` still need to be done in Supabase, GitHub, and Vercel.
