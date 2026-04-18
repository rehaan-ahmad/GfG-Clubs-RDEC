# RDEC Student Portal — AI Context

**Goal:** Centralized hub for RDEC Student Clubs (GFG, Nexora, etc.) with Auth, Attendance (Geofenced), ID Card generation, and Admin tools.

## Tech Stack
- **Framework:** Next.js 14 (App Router, TS)
- **Styling:** Tailwind CSS + Glassmorphism (`globals.css` utilities)
- **Animation:** Framer Motion + animejs
- **Backend:** Supabase (Auth, Postgres, Storage)
- **Email:** Resend (application/status notifications)
- **PDF:** jsPDF + html2canvas (client-side generation)

## Project Structure
- `src/app/`: App router pages + `layout.tsx` (Theme/Auth providers)
- `src/components/`: `shared/` (GlassCard, AnimatedSection) + `layout/` (Navbar, Footer)
- `src/hooks/`: `useGeolocation`, `useRole` (session-based), `useTheme`
- `src/lib/`:
  - `supabase/`: `client.ts` (browser), `server.ts` (SSR), `admin.ts` (service role)
  - `geo.ts`: Haversine formula for geofencing
  - `pdf.ts`: PDF generation helpers
  - `email.ts`: Resend integration
- `src/types/`: Centralized interfaces (`Club`, `Profile`, `Event`, etc.)
- `supabase/`: `schema.sql` (12 tables) + `profile_trigger.sql` (auto-profile)

## Core Logic
- **Auth:** Middleware protects `/admin/*` and `/attend/*`.
- **Geofencing:** Attendance marked only if user distance $\le$ session radius (using Haversine).
- **PDFs:** ID cards and attendance sheets generated client-side to save server resources.
- **Storage:** 6 buckets (`avatars`, `resumes`, `merch`, `sponsors`, `id-cards`, `covers`). `resumes` and `id-cards` are PRIVATE.

## Current Phase: Stage 1 Complete
- [x] Project init, dependencies, and design tokens.
- [x] Supabase clients & middleware.
- [x] Core types & utility functions.
- [x] Geolocation & Role hooks.

## Next Steps (Priority)
1. **Apply DB Schema:** Run `supabase/schema.sql` in dashboard.
2. **Shared UI:** Build `GlassCard`, `AnimatedSection`, `PageHeader`.
3. **Core Pages:** Home (Stats/Clubs), Club Directory, Event List.
4. **Auth Flow:** Login & Callback handling.
5. **Admin Dash:** Role-based navigation & management tools.

## Quick Reference
- **Supabase URL:** `https://bouhbfufhdeeuukfoxqu.supabase.co`
- **Geofence Center:** RDEC B Block (28.6890, 77.4538)
- **Docs:** See `TODO.md` (detailed specs) and `MANUAL_SETUP.md` (infra checklist).
