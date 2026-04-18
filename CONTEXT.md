# RDEC Student Bodies Portal — AI Agent Context

**Generated:** 18 Apr 2026  
**Project:** RDEC Student Clubs Portal  
**Dev:** Rehaan Ahmad (B.Tech CSE, RDEC Ghaziabad)  
**Deadline:** 29 Apr 2026 (11 days from start)

---

## Project Status Summary

**Current Phase:** Stage 1 Complete — Foundation & Setup  
**Next Phase:** Stage 2 — Database Bootstrap & Manual Setup

### What's Done (Stage 1)
- ✅ Next.js 14 project initialized with TypeScript, Tailwind, App Router
- ✅ All dependencies installed (Supabase, Radix UI, Framer Motion, animejs, jsPDF, Resend, etc.)
- ✅ Design tokens configured (colors, typography, spacing in `globals.css` and `tailwind.config.ts`)
- ✅ Supabase clients wired (browser, server, admin)
- ✅ Middleware set up for route protection (`/admin/*`, `/attend/*`)
- ✅ TypeScript types defined (`src/types/index.ts`)
- ✅ Utility functions created (`utils.ts`, `geo.ts`, `email.ts`, `pdf.ts`)
- ✅ Custom hooks implemented (`useGeolocation`, `useTheme`, `useRole`)
- ✅ Constants centralized (`src/lib/constants/site.ts`)
- ✅ Basic homepage displaying Stage 1 completion status

### What's Pending (Stage 2 — Manual Setup)
- [ ] Apply `supabase/schema.sql` in Supabase SQL Editor
- [ ] Apply `supabase/profile_trigger.sql` for auto-profile creation
- [ ] Create 6 Supabase Storage buckets (`avatars`, `resumes`, `merch`, `sponsors`, `id-cards`, `covers`)
- [ ] Push repo to GitHub and connect to Vercel
- [ ] Add environment variables to Vercel (Production + Preview)
- [ ] Create first `super-admin` profile manually in database

---

## Architecture Overview

### Tech Stack
```
Frontend:  Next.js 14 (App Router) + React 18 + TypeScript
Styling:   Tailwind CSS + custom CSS variables (glass morphism theme)
Animation: Framer Motion + animejs
UI:        Radix UI primitives (dialog, dropdown, tabs, select, slider, switch)
Backend:   Next.js API Routes + Supabase (PostgreSQL + Auth + Storage)
Database:  Supabase (free tier: 500MB DB, 1GB storage, 50k MAU)
Email:     Resend (free: 3,000 emails/mo)
Hosting:   Vercel (free: 100GB bandwidth, unlimited deploys)
CDN/WAF:   Cloudflare (free)
```

### Design System
**Color Tokens (Light Mode)**
- `--bg`: #F2E7D6 (page background)
- `--bg-card`: #FAF5EE (card surfaces)
- `--accent`: #5E7287 (primary accent)
- `--text`: #1A1410 (primary text)
- `--text-muted`: #5E7287 (secondary text)

**Typography**
- Heading: 'Cinzel Decorative' (placeholder for Alsani/Shallamin)
- Body: 'Sofia Sans'
- Buttons: 'Cormorant Garamond'

**Key UI Patterns**
- `.glass` class: backdrop-filter blur with transparency
- `.glass-hover`: shimmer sweep animation on hover
- `.marquee-track`: infinite horizontal scroll for clubs strip
- All cards use `border-radius: 10px` (card) or `14px` (glass)

---

## File Structure

```
src/
├── app/
│   ├── fonts/                 # Geist VF fonts (local)
│   ├── globals.css            # Design tokens + glass utilities + animations
│   ├── layout.tsx             # Root layout (metadata + font preconnects)
│   └── page.tsx               # Homepage (Stage 1 status display)
├── hooks/
│   ├── useGeolocation.ts      # Location permission + position fetching
│   ├── useRole.ts             # Session-based role checking (student/admin/super-admin)
│   └── useTheme.ts            # Light/dark mode toggle with localStorage persistence
├── lib/
│   ├── constants/
│   │   └── site.ts            # Supabase config, clubs array, geofence defaults
│   ├── supabase/
│   │   ├── client.ts          # Browser client (Client Components)
│   │   ├── server.ts          # Server client (Server Components + API routes)
│   │   └── admin.ts           # Service role client (server-only, bypasses RLS)
│   ├── email.ts               # Resend email functions (application/approval/rejection)
│   ├── geo.ts                 # Haversine distance calculation
│   ├── pdf.ts                 # jsPDF + html2canvas helpers for ID cards + attendance
│   └── utils.ts               # cn(), date formatting, text clamping, tier ordering
├── middleware.ts              # Auth guard for /admin/* and /attend/* routes
└── types/
    └── index.ts               # All TypeScript interfaces + role check helpers

supabase/
├── schema.sql                 # Full database schema (12 tables + RLS policies + seed data)
└── profile_trigger.sql        # Auto-create profile on user signup
```

---

## Database Schema (Pending Application)

### Tables (12 total)
1. `clubs` — 9 seeded clubs (gfg, nexora, mehfil, spotlight, velocity, sukham, hottake, ieee, placement)
2. `profiles` — Extended user data (roll_number, linkedin, resume, role)
3. `club_members` — Many-to-many join (profiles ↔ clubs) with role_title + role_rank
4. `events` — Club events with geofence data + status tracking
5. `attendance_sessions` — Geo-fenced attendance windows (linked to events)
6. `attendance_records` — Individual attendance marks with distance verification
7. `student_id_applications` — Membership applications with approval workflow
8. `deals` — Student discounts (club-specific or college-wide)
9. `merch` — Club merchandise with availability tracking
10. `sponsors` — Tiered sponsor listings (platinum → partner)
11. `social_links` — Platform links (club-specific or college-wide)
12. `audit_log` — Action tracking for admin activities

### Key RLS Policies
- `clubs`: Public read, super-admin write only
- `profiles`: Public read, own write
- `club_members`: Public read, President/Faculty/SuperAdmin write
- `attendance_records`: Auth users can insert own records, admins can read all
- `student_id_applications`: Own read/insert, club President + super-admin full access

---

## Environment Variables

**Required in `.env.local` (and Vercel)**
```env
NEXT_PUBLIC_SUPABASE_URL=https://bouhbfufhdeeuukfoxqu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<publishable_key>
SUPABASE_SERVICE_ROLE_KEY=<secret_key>
RESEND_API_KEY=<resend_key>
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GEOFENCE_LAT=28.6890
NEXT_PUBLIC_GEOFENCE_LNG=77.4538
```

---

## Key Features to Implement (per TODO.md)

### Completed Sections
- **Section 0:** Constants (done)
- **Section 1:** Initial Setup (done)
- **Section 2:** Database SQL prepared (pending manual application)
- **Section 3:** TypeScript types (done)
- **Section 4:** Utility functions (done)

### Pending Implementation (Sections 5-18)
- **Section 5:** Shared Components (GlassCard, AnimatedSection, PageHeader, ClubBadge, StatusBadge, QRCodeDisplay)
- **Section 6:** Layout Components (Navbar, Footer, ThemeProvider)
- **Section 7:** Home Page Sections (Hero, StatsRow, EventsPreview, ClubsStrip, FeaturesGrid, AppCTABanner)
- **Section 8:** Clubs Pages (Directory, Detail, Team Profiles with resume upload)
- **Section 9:** Events Pages (List, Detail with countdown)
- **Section 10:** Attendance System (Student mark page, Admin session creation, Live view with Realtime, PDF export)
- **Section 11:** Deals Page (Public listing + Admin CRUD)
- **Section 12:** Student ID System (Application form, Admin approval, PDF generation with html2canvas)
- **Section 13:** Community Page (Social links directory)
- **Section 14:** Merch Page (Product listing + Admin management)
- **Section 15:** Sponsors Page (Tiered display)
- **Section 16:** About Page (College info + departments)
- **Section 17:** Auth Pages (Login, Callback handler)
- **Section 18:** Admin Dashboard (Role-based navigation, ID requests, Deals/Merch/Sponsors management)

---

## Critical Implementation Notes

### Security
- `SUPABASE_SERVICE_ROLE_KEY` must NEVER be exposed client-side or in `NEXT_PUBLIC_` variables
- Middleware protects `/admin/*` and `/attend/*` routes (requires valid session)
- RLS policies enforce data access at database level
- Resume storage bucket is private (signed URLs only)

### Performance
- Static generation with `revalidate` for events, clubs, merch, deals pages
- Supabase Realtime for live attendance tracking
- Image optimization via Next.js `<Image>` component (domain configured for Supabase storage)

### PDF Generation Strategy
- ID cards and attendance sheets generated client-side using `html2canvas` + `jsPDF`
- Avoids Vercel serverless function memory limits
- ID cards use CR80 standard dimensions (85.6mm × 53.98mm)

### Geofencing
- Haversine formula calculates distance between session coordinates and user location
- Attendance verified only if distance ≤ session radius_m
- Default geofence: RDEC B Block (28.6890, 77.4538)

---

## Next Actions for AI Agent

1. **If continuing implementation:** Start with Section 5 (Shared Components) → build reusable UI primitives first
2. **If database setup needed:** Guide user through applying SQL in Supabase Dashboard → SQL Editor
3. **If deployment issues:** Check Vercel environment variables match `.env.local` exactly
4. **If type errors:** Verify all imports reference `src/types/index.ts` instead of redeclaring interfaces

---

## Contact / Reference
- **Supabase Project:** https://bouhbfufhdeeuukfoxqu.supabase.co
- **TODO.md:** Full specification (1600+ lines) with exact component props, API routes, and SQL
- **MANUAL_SETUP.md:** Checklist for non-code tasks (buckets, Vercel, SQL application)
