# RDEC Student Bodies Portal — Complete Build Reference
**Deadline:** 29 Apr 2026 | **Start:** 18 Apr 2026 | **Days:** 11
**Dev:** Rehaan Ahmad · B.Tech CSE · RDEC Ghaziabad · Solo + AI-assisted
**Status:** `[ ]` Todo · `[~]` In Progress · `[x]` Done · `[!]` Blocked

---

## SECTION 0 — CONSTANTS (reference everywhere)

**Repo Status:** `[x]` Implemented in codebase (`src/lib/constants/site.ts`, `globals.css`, `.env.example`, root metadata)

### Hosting ($0/mo)
```
Frontend + API Routes → Vercel (free: 100GB bandwidth, unlimited deploys)
Database + Auth + Storage → Supabase (free: 500MB DB, 1GB storage, 50k MAU)
Email → Resend (free: 3,000 emails/mo)
CDN + WAF + DNS → Cloudflare (free)
```

### Supabase Project
```
Project Name : clubs-portal
Project ID   : bouhbfufhdeeuukfoxqu
URL          : https://bouhbfufhdeeuukfoxqu.supabase.co
```

### Colour Tokens
```css
/* ── LIGHT MODE ─────────────────────────────── */
--bg:           #F2E7D6;   /* page background     */
--bg-alt:       #DFE6EF;   /* section alt bg      */
--bg-card:      #FAF5EE;   /* card surface        */
--accent:       #5E7287;   /* primary accent      */
--accent-soft:  #B2A89A;   /* secondary accent    */
--muted:        #9AA5BB;   /* muted text / icons  */
--text:         #1A1410;   /* primary text        */
--text-muted:   #5E7287;   /* secondary text      */
--border:       rgba(94,114,135,0.18);
--border-hover: rgba(94,114,135,0.38);

/* ── DARK MODE ──────────────────────────────── */
--bg:           #0C2320;
--bg-alt:       #112B27;
--bg-card:      #0F2D29;
--accent:       #AC8563;
--accent-soft:  #1A3B36;
--muted:        #4A6B5F;
--text:         #E4F1E8;
--text-muted:   #AC8563;
--border:       rgba(228,241,232,0.09);
--border-hover: rgba(228,241,232,0.22);
```

### Typography
```css
--font-heading: 'Cinzel Decorative', serif;
/* ↑ Placeholder. Replace with Alsani/Shallamin once licensed.
   Add font files to /public/fonts/ and declare @font-face in globals.css */
--font-button:  'Cormorant Garamond', Georgia, serif;
--font-body:    'Sofia Sans', 'Helvetica Neue', sans-serif;
```

Google Fonts URL (add to root layout `<head>`):
```
https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Sofia+Sans:wght@300;400;500;600&display=swap
```

### Clubs (seeded in DB)
```
slug        name                           color     status
──────────────────────────────────────────────────────────
gfg         GfG Student Community          #2F8D46   established
nexora      Nexora — Tech Club             #5E7287   established
mehfil      Mehfil — Cultural Club         #8B3A62   established
spotlight   Spotlight — Campus Connect     #CC7A00   established
velocity    Velocity — Sports & E-Sports   #1A5CA8   established
sukham      Sukham — Wellness Club         #2E7D5A   established
hottake     HotTake — Debates              #A83232   established
ieee        IEEE Student Body              #00629B   coming-soon
placement   Student Placement Cell         #4A4A8A   established
```

### .env.local
```env
NEXT_PUBLIC_SUPABASE_URL=https://bouhbfufhdeeuukfoxqu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...    # API Keys page → Publishable
SUPABASE_SERVICE_ROLE_KEY=sb_secret_...             # API Keys page → Secret (NEVER expose client-side)
RESEND_API_KEY=re_...                               # resend.com dashboard
NEXT_PUBLIC_SITE_URL=http://localhost:3000          # change to domain on production
NEXT_PUBLIC_GEOFENCE_LAT=28.6890                   # right-click RDEC B Block on Google Maps → copy lat
NEXT_PUBLIC_GEOFENCE_LNG=77.4538                   # same → copy lng
```

---

## SECTION 1 — INITIAL SETUP

**Repo Status:** `[x]` Completed in repo

### 1.1 Create Project
```bash
npx create-next-app@14 rdec-portal --typescript --tailwind --app --src-dir
cd rdec-portal
```

### 1.2 Install All Dependencies
```bash
# Supabase
npm i @supabase/supabase-js @supabase/ssr

# Animation
npm i framer-motion animejs
npm i -D @types/animejs

# UI primitives
npm i @radix-ui/react-dialog
npm i @radix-ui/react-dropdown-menu
npm i @radix-ui/react-tabs
npm i @radix-ui/react-select
npm i @radix-ui/react-slider
npm i @radix-ui/react-switch

# Forms + validation
npm i react-hook-form zod @hookform/resolvers

# PDF + canvas
npm i jspdf html2canvas
npm i jspdf-autotable

# QR code
npm i qrcode react-qr-code
npm i -D @types/qrcode

# Email
npm i resend

# Utilities
npm i date-fns clsx tailwind-merge
npm i sharp
npm i next-sitemap
```

### 1.3 tailwind.config.ts — Full Config
```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'rdec-bg':      'var(--bg)',
        'rdec-alt':     'var(--bg-alt)',
        'rdec-card':    'var(--bg-card)',
        'rdec-accent':  'var(--accent)',
        'rdec-soft':    'var(--accent-soft)',
        'rdec-muted':   'var(--muted)',
        'rdec-text':    'var(--text)',
        'rdec-dimmed':  'var(--text-muted)',
        'rdec-border':  'var(--border)',
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        button:  ['var(--font-button)'],
        body:    ['var(--font-body)'],
      },
      borderRadius: {
        glass: '14px',
        card:  '10px',
        pill:  '9999px',
      },
      backdropBlur: {
        glass: '18px',
      },
    },
  },
  plugins: [],
}
export default config
```

### 1.4 src/app/globals.css — Full Reset + Tokens
```css
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Sofia+Sans:wght@300;400;500;600&display=swap');

/* Optional: @font-face for Alsani/Shallamin when licensed
@font-face {
  font-family: 'Alsani';
  src: url('/fonts/Alsani.woff2') format('woff2');
  font-weight: 400 700;
  font-display: swap;
}
*/

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:           #F2E7D6;
  --bg-alt:       #DFE6EF;
  --bg-card:      #FAF5EE;
  --accent:       #5E7287;
  --accent-soft:  #B2A89A;
  --muted:        #9AA5BB;
  --text:         #1A1410;
  --text-muted:   #5E7287;
  --border:       rgba(94,114,135,0.18);
  --border-hover: rgba(94,114,135,0.38);
  --font-heading: 'Cinzel Decorative', serif;
  --font-button:  'Cormorant Garamond', Georgia, serif;
  --font-body:    'Sofia Sans', 'Helvetica Neue', sans-serif;
}

.dark {
  --bg:           #0C2320;
  --bg-alt:       #112B27;
  --bg-card:      #0F2D29;
  --accent:       #AC8563;
  --accent-soft:  #1A3B36;
  --muted:        #4A6B5F;
  --text:         #E4F1E8;
  --text-muted:   #AC8563;
  --border:       rgba(228,241,232,0.09);
  --border-hover: rgba(228,241,232,0.22);
}

html {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  scroll-behavior: smooth;
  transition: background 0.3s, color 0.3s;
}

/* Glass utility */
.glass {
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(18px) saturate(160%);
  -webkit-backdrop-filter: blur(18px) saturate(160%);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 14px;
}
.dark .glass {
  background: rgba(12,35,32,0.55);
  border-color: rgba(228,241,232,0.08);
}

/* Shimmer sweep on glass hover */
.glass-hover {
  position: relative;
  overflow: hidden;
}
.glass-hover::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%);
  transform: translateX(-100%);
  transition: transform 0.5s ease;
  pointer-events: none;
}
.glass-hover:hover::after { transform: translateX(100%); }

/* Marquee (clubs strip) */
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.marquee-track { animation: marquee 28s linear infinite; }
.marquee-track:hover { animation-play-state: paused; }

/* Count-up target */
.count-target { font-variant-numeric: tabular-nums; }

/* Smooth page transitions */
.page-enter { opacity: 0; transform: translateY(12px); }
.page-enter-active { opacity: 1; transform: translateY(0); transition: 0.3s ease; }
```

### 1.5 next.config.ts
```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['bouhbfufhdeeuukfoxqu.supabase.co'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options',           value: 'DENY' },
          { key: 'X-Content-Type-Options',    value: 'nosniff' },
          { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',        value: 'geolocation=(self)' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
        ],
      },
    ]
  },
}
export default nextConfig
```

### 1.6 Supabase Client Files

```ts
// src/lib/supabase/client.ts  — browser client (use in Client Components)
import { createBrowserClient } from '@supabase/ssr'
export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
```

```ts
// src/lib/supabase/server.ts  — server client (use in Server Components + Route Handlers)
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
export const createClient = () => {
  const cookieStore = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
        set: () => {},
        remove: () => {},
      },
    }
  )
}
```

```ts
// src/lib/supabase/admin.ts  — service role client (server only, bypasses RLS)
// NEVER import this in any client component or NEXT_PUBLIC_ context
import { createClient } from '@supabase/supabase-js'
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
```

### 1.7 Middleware
```ts
// src/middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get:    (n) => request.cookies.get(n)?.value,
        set:    (n, v, o) => { request.cookies.set({ name: n, value: v, ...o }); response.cookies.set({ name: n, value: v, ...o }) },
        remove: (n, o) => { request.cookies.set({ name: n, value: '', ...o }); response.cookies.set({ name: n, value: '', ...o }) },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  // Protect /admin/* and /attend/*
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isAttendRoute = request.nextUrl.pathname.startsWith('/attend')

  if ((isAdminRoute || isAttendRoute) && !session) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('next', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*', '/attend/:path*', '/((?!_next/static|_next/image|favicon.ico).*)'],
}
```

### 1.8 Supabase Storage Buckets
*Create manually in Supabase Dashboard → Storage → New Bucket*

| Bucket name | Public | Notes |
|---|---|---|
| `avatars` | ✅ Yes | Member profile photos. Max 2MB, images only |
| `resumes` | ❌ No | PDFs. Max 5MB. Accessed via signed URL only |
| `merch` | ✅ Yes | Product images. Max 5MB |
| `sponsors` | ✅ Yes | Sponsor logos. Max 5MB |
| `id-cards` | ❌ No | Generated PDFs. Accessed via signed URL only |
| `covers` | ✅ Yes | Event + club cover images. Max 5MB |

### 1.9 Supabase — Profile Auto-Create Trigger
*Run once in Supabase SQL Editor after schema.sql is applied*
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 1.10 GitHub + Vercel Setup
- [!] Create GitHub repo `rdec-portal`
- [!] `git init && git remote add origin [url] && git push -u origin main`
- [!] Connect repo to Vercel (vercel.com → Import Project)
- [!] Add all `.env.local` vars in Vercel → Settings → Environment Variables (for Production + Preview)
- [!] Enable preview deployments on pull requests

---

## SECTION 2 — DATABASE (already applied)

> `schema.sql` was executed. All tables, RLS policies and seed data are live.
> This section is for reference only — do not re-run unless resetting.

### Tables Created
```
clubs · profiles · club_members · events · attendance_sessions
attendance_records · student_id_applications · deals · merch
sponsors · social_links · audit_log
```

### Key Relationships
```
profiles         → auth.users (1:1 via trigger)
club_members     → clubs + profiles (many-to-many join)
events           → clubs
attendance_sessions → events + clubs
attendance_records  → attendance_sessions + profiles
student_id_applications → clubs + profiles
deals            → clubs (nullable = college-wide)
merch            → clubs
social_links     → clubs (nullable = college-wide)
audit_log        → profiles
```

### RLS Summary
```
clubs           → public read, super-admin write
profiles        → public read, own write
club_members    → public read, President+Faculty+SuperAdmin write
events          → public read, President+Faculty+SuperAdmin write (per club)
attendance_sessions → auth read, President insert
attendance_records  → auth insert (WITH CHECK), admin read
student_id_applications → own read+insert, admin all (per club)
deals           → public read, admin write
merch           → public read, admin write (per club)
sponsors        → public read, super-admin write
social_links    → public read, admin write (per club or global)
audit_log       → auth insert, super-admin read
```

---

## SECTION 3 — TYPESCRIPT TYPES
*Create `src/types/index.ts` — import from here everywhere, never redeclare*

```ts
// src/types/index.ts

export type ClubStatus  = 'established' | 'coming-soon'
export type EventStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
export type AppStatus   = 'pending' | 'approved' | 'rejected'
export type SponsorTier = 'platinum' | 'gold' | 'silver' | 'bronze' | 'partner'
export type UserRole    = 'student' | 'club-admin' | 'faculty' | 'super-admin'
export type Platform    = 'Instagram' | 'LinkedIn' | 'WhatsApp' | 'GitHub' | 'YouTube' | 'Twitter' | 'Discord'

export interface Club {
  id: string; slug: string; name: string; tagline?: string
  description?: string; color: string; logo_url?: string
  status: ClubStatus; order_index: number; created_at: string
}

export interface Profile {
  id: string; full_name?: string; roll_number?: string; email?: string
  avatar_url?: string; linkedin_url?: string; resume_url?: string
  gfg_username?: string; role: UserRole; created_at: string
}

export interface ClubMember {
  id: string; club_id: string; profile_id: string; role_title: string
  role_rank: number; is_active: boolean; joined_at?: string
  profile?: Profile; club?: Club
}

export interface Event {
  id: string; club_id: string; title: string; description?: string
  event_type?: string; status: EventStatus; venue?: string
  lat?: number; lng?: number; geofence_radius: number
  start_at?: string; end_at?: string; reg_link?: string
  cover_url?: string; created_by: string; created_at: string
  club?: Club
}

export interface AttendanceSession {
  id: string; event_id?: string; club_id: string; venue_name?: string
  lat: number; lng: number; radius_m: number; open: boolean
  created_by: string; created_at: string; closed_at?: string
  event?: Event; club?: Club
}

export interface AttendanceRecord {
  id: string; session_id: string; profile_id: string; marked_at: string
  user_lat?: number; user_lng?: number; distance_m?: number; verified: boolean
  profile?: Profile
}

export interface StudentIDApplication {
  id: string; club_id: string; applicant_id: string; full_name: string
  roll_number: string; extra_field?: string; status: AppStatus
  reviewed_by?: string; reviewed_at?: string; id_card_url?: string
  created_at: string; club?: Club; profile?: Profile
}

export interface Deal {
  id: string; club_id?: string; title: string; provider?: string
  description?: string; coupon_code?: string; discount_pct?: number
  link?: string; expires_at?: string; is_active: boolean
  cover_url?: string; created_at: string; club?: Club
}

export interface Merch {
  id: string; club_id: string; name: string; description?: string
  price_inr?: number; image_url?: string; order_link?: string
  available: boolean; created_at: string; club?: Club
}

export interface Sponsor {
  id: string; name: string; logo_url?: string; website_url?: string
  tier: SponsorTier; description?: string; is_active: boolean
  order_index: number; created_at: string
}

export interface SocialLink {
  id: string; club_id?: string; platform: Platform
  url: string; label?: string; order_index: number; club?: Club
}

// Utility: role check helpers
export const isAdmin    = (role: UserRole) => role !== 'student'
export const isSuperAdmin = (role: UserRole) => role === 'super-admin'
```

---

## SECTION 4 — UTILITY FUNCTIONS
*All in `src/lib/`*

### 4.1 utils.ts
```ts
// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, formatDistanceToNow, isPast } from 'date-fns'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const formatDate  = (d: string) => format(new Date(d), 'dd MMM yyyy')
export const formatTime  = (d: string) => format(new Date(d), 'hh:mm a')
export const timeFromNow = (d: string) => formatDistanceToNow(new Date(d), { addSuffix: true })
export const isExpired   = (d?: string) => d ? isPast(new Date(d)) : false

export const tierOrder: Record<string, number> = {
  platinum: 1, gold: 2, silver: 3, bronze: 4, partner: 5
}

export const clampText = (text: string, max: number) =>
  text.length > max ? text.slice(0, max) + '…' : text
```

### 4.2 geo.ts
```ts
// src/lib/geo.ts
export function haversineMetres(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R = 6371000
  const φ1 = lat1 * Math.PI / 180
  const φ2 = lat2 * Math.PI / 180
  const Δφ = (lat2 - lat1) * Math.PI / 180
  const Δλ = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(Δφ/2)**2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2)**2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}
```

### 4.3 email.ts
```ts
// src/lib/email.ts
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = 'RDEC Portal <noreply@yourdomain.com>'  // update domain after setup

export async function sendIDApplicationEmail(to: string, name: string, clubName: string) {
  return resend.emails.send({
    from: FROM, to,
    subject: `New Membership Application — ${clubName}`,
    html: `<p><strong>${name}</strong> has applied to join <strong>${clubName}</strong>. Review in your admin dashboard.</p>`,
  })
}

export async function sendIDApprovedEmail(to: string, name: string, downloadUrl: string) {
  return resend.emails.send({
    from: FROM, to,
    subject: 'Your Student ID is Ready',
    html: `<p>Hi ${name}, your student ID card has been approved. <a href="${downloadUrl}">Download it here</a>.</p>`,
  })
}

export async function sendIDRejectedEmail(to: string, name: string, clubName: string) {
  return resend.emails.send({
    from: FROM, to,
    subject: `Application Update — ${clubName}`,
    html: `<p>Hi ${name}, your application to join ${clubName} was not approved this time. Contact the club President for more information.</p>`,
  })
}
```

### 4.4 pdf.ts
```ts
// src/lib/pdf.ts
// jsPDF + jspdf-autotable helpers
// Import and use in AttendancePDFExport component and API routes

export interface AttendancePDFData {
  clubName: string
  eventName: string
  venueName: string
  date: string
  records: {
    name: string
    rollNumber: string
    time: string
    distanceM: number
    verified: boolean
  }[]
}

// Function signature — implement using jsPDF + autoTable
// export function generateAttendancePDF(data: AttendancePDFData): void
// → Creates PDF with header (club, event, venue, date, total)
// → Table: # | Name | Roll No | Time | Distance | Status
// → Footer: "Generated by RDEC Student Portal · [timestamp]"
// → Triggers browser download: `[club]-attendance-[date].pdf`
```

### 4.5 hooks/useGeolocation.ts
```ts
// src/hooks/useGeolocation.ts
// Returns { lat, lng, error, loading, request }
// request() calls navigator.geolocation.getCurrentPosition
// Handles: permission denied, position unavailable, timeout errors
```

### 4.6 hooks/useTheme.ts
```ts
// src/hooks/useTheme.ts
// Reads from localStorage 'rdec-theme'
// Applies 'dark' class to document.documentElement
// Returns { theme: 'light' | 'dark', toggle: () => void }
// Default: 'light'
```

### 4.7 hooks/useRole.ts
```ts
// src/hooks/useRole.ts
// Reads from Supabase session → fetches profile.role
// Returns { role: UserRole, isAdmin, isSuperAdmin, loading }
// Also returns clubRoles: { [clubId]: role_title } for per-club admin checks
```

---

## SECTION 5 — SHARED COMPONENTS

### 5.1 GlassCard
```
File: src/components/shared/GlassCard.tsx
Props:
  children     ReactNode
  accent?      string         Club colour for border on hover
  hover?       boolean        Enable lift + shimmer on hover (default true)
  padding?     string         Tailwind padding class (default 'p-5')
  className?   string

Styles:
  Base:  .glass class from globals.css
  Hover: translateY(-4px), border-color shifts to accent prop
  Shimmer: .glass-hover::after sweep from globals.css
```

### 5.2 AnimatedSection
```
File: src/components/shared/AnimatedSection.tsx
Props:
  children     ReactNode
  delay?       number         ms delay before animation starts (default 0)
  stagger?     boolean        Animate children with stagger (default false)
  staggerDelay? number        ms between each child (default 80)
  translateY?  number         px offset (default 24)
  className?   string

Logic:
  useEffect → IntersectionObserver on wrapper ref
  On intersection: import animejs dynamically → run anime()
  opacity: [0, 1], translateY: [translateY, 0]
  If stagger: targets = wrapper's direct children, delay = anime.stagger(staggerDelay)
```

### 5.3 PageHeader
```
File: src/components/shared/PageHeader.tsx
Props:
  eyebrow     string    e.g. "Student Clubs"
  title       string    e.g. "Our Communities"
  subtitle?   string
  breadcrumb? { label: string; href: string }[]
  centered?   boolean

Layout (top to bottom):
  1. Breadcrumb trail (if provided) — 0.72rem, var(--text-muted)
  2. Eyebrow — 0.72rem, uppercase, letter-spacing 0.12em, var(--accent)
  3. H1 — var(--font-heading), clamp(1.8rem, 3vw, 2.6rem)
  4. Subtitle — 1rem, var(--text-muted), max-w-prose
```

### 5.4 ThemeProvider
```
File: src/components/layout/ThemeProvider.tsx
'use client'
On mount: read localStorage 'rdec-theme' → apply class to <html>
Expose ThemeContext with { theme, toggle }
Wrap entire app in root layout
```

### 5.5 ClubBadge
```
File: src/components/shared/ClubBadge.tsx
Props: club: Club, size?: 'sm' | 'md'
Renders: coloured dot + club name abbreviation as a pill
Used on EventCards, DealCards, etc.
```

### 5.6 StatusBadge
```
File: src/components/shared/StatusBadge.tsx
Props: status: EventStatus | AppStatus | ClubStatus
Maps status → background colour + label
upcoming=blue, ongoing=green, completed=gray, cancelled=red
pending=amber, approved=green, rejected=red
established=green, coming-soon=muted
```

### 5.7 QRCodeDisplay
```
File: src/components/shared/QRCodeDisplay.tsx
Props: value: string, size?: number, label?: string
Uses: react-qr-code
Shows QR with optional label below
Download button: converts to canvas → PNG download
```

---

## SECTION 6 — LAYOUT COMPONENTS

### 6.1 Navbar
```
File: src/components/layout/Navbar.tsx
'use client'

Structure:
  <nav sticky top-0 z-[200] backdrop-blur-glass border-b>
    <Container maxW="1200px">
      Logo | Nav Links | Actions
    </Container>
  </nav>

Logo (left):
  Square monogram "RD" (10px, font-heading) + text stack:
    "RDEC" (0.88rem bold heading font)
    "Student Bodies" (0.6rem uppercase muted)

Nav Links (centre, hidden on mobile):
  Home · Events · Clubs · Team · Resources · Merch · Deals · Community
  Each: 0.845rem, body font, var(--text-muted), hover → var(--text)
  Active (matches current pathname): border-bottom 2px var(--accent)

Actions (right):
  Dark/Light toggle button (☾ Dark / ☀ Light)
  "Student ID" CTA → /student-id (font-button, bg var(--accent))

Mobile (< 768px):
  Hide nav links
  Show hamburger icon button
  On click: slide-down drawer with all nav links + actions
  Framer Motion: height 0 → auto, opacity 0 → 1

Scroll effect:
  On scroll > 10px: add class that intensifies backdrop-filter
  Use useEffect + window.addEventListener('scroll')
```

### 6.2 Footer
```
File: src/components/layout/Footer.tsx
Server Component — fetches social_links WHERE club_id IS NULL

Structure:
  <footer border-t padding-y="44px">
    4-column grid (2fr 1fr 1fr 1fr):
      Col 1: Logo + tagline + "Secured by AthenaGuard" badge
      Col 2: Navigate — Home, Events, Clubs, Team, Resources, Merch
      Col 3: Community — all 9 club names (links to /clubs/[slug])
      Col 4: Account — Student ID, Deals, Leaderboard, Admin Login

    Social icons row (college-wide links from DB)
    Bottom bar: copyright + version

    Mobile: stack columns 1 then 2-4 as 3-col grid, then social row
```

### 6.3 Root Layout
```
File: src/app/layout.tsx
Wraps: ThemeProvider → Navbar → {children} → Footer
Add Google Fonts link in <head>
Add <meta> OG tags (title, description, image, url)
```

---

## SECTION 7 — HOME PAGE `src/app/page.tsx`

Server Component. Fetches: ongoing+upcoming events (limit 6), all clubs, college-wide stats.

### 7.1 HeroSection
```
File: src/components/home/HeroSection.tsx
'use client'

Left column:
  Eyebrow pill: green dot + "Official Student Portal · RDEC Ghaziabad"
  H1: "Where Curiosity Meets Community"
    Animate on mount: split text into chars → anime.js stagger
    anime({ targets: '.hero-char', opacity: [0,1], translateY: [30,0], delay: anime.stagger(28), easing: 'easeOutExpo' })
  Subheading: body text, muted, max-w-[430px]
  CTA buttons: "Explore Clubs" (filled) + "View Events" (outline)
  Club tags strip: coloured pill per club, maps CLUBS array

Right column (desktop only):
  2×2 grid of stat cards (GlassCard):
    9+ Bodies | 950+ Members | 100+ Events | 12+ Partners
  Each card: accent line bar top, large number (heading font), label

Background:
  Radial gradient blobs — CSS @keyframes pulse, 8s infinite
  Two blobs: var(--accent) opacity 0.08, positioned absolutely
  Pointer-events none, z-index -1
```

### 7.2 StatsRow
```
File: src/components/home/StatsRow.tsx
'use client'

4 stat items in a row (bg var(--bg-alt), padding y-12)
Each: icon glyph + large number + label

Count-up animation:
  IntersectionObserver on section
  On enter: anime({ targets: '.count-target', innerHTML: [0, finalValue], round: 1, duration: 1800, easing: 'easeOutExpo' })

Stats: Members (fetch COUNT from profiles), Events (fetch COUNT from events), Clubs (9), Partners (fetch COUNT from sponsors)
```

### 7.3 EventsPreview
```
File: src/components/home/EventsPreview.tsx

Props: events: Event[]
Filter tabs: All / Ongoing / Upcoming (client-side, useState)
Grid of EventCards (max 6)
"View All Events" link → /events

EventCard:
  GlassCard + glass-hover
  Cover image (or club-coloured gradient fallback)
  Status badge + club badge
  Title, venue, date, reg count
  "Register →" button → event.reg_link
```

### 7.4 ClubsStrip
```
File: src/components/home/ClubsStrip.tsx

Section title + subtitle
Grid of mini club cards: logo/monogram, name, tagline, member count
Each links to /clubs/[slug]
Coming-soon club: greyed out + "Coming Soon" badge
AnimatedSection wrapper with stagger
```

### 7.5 FeaturesGrid
```
File: src/components/home/FeaturesGrid.tsx

6 feature tiles in a 3×2 grid:
  1. Digital Student ID — QR-coded membership cards
  2. Geo Attendance — Location-verified event check-in
  3. Merch Store — Club custom merchandise
  4. Exclusive Deals — Partner discounts and free tools
  5. Sponsor Network — College's industry connections
  6. Secure Admin — Role-based management (AthenaGuard)

Each tile: GlassCard, geometric icon, title, 1-line description
Hover: border shifts to accent colour
```

### 7.6 AppCTABanner
```
File: src/components/home/AppCTABanner.tsx

Full-width banner (bg var(--bg-alt), border, border-radius 18px)
Left: "Join Our Community" heading + subtext
Right: "Join WhatsApp" button (outline) + "Submit an Idea" button (filled)
Links: WhatsApp group invite URL (update per club) + Google Form link
```

---

## SECTION 8 — CLUBS PAGES

### 8.1 Clubs Directory `src/app/clubs/page.tsx`
```
Server Component
Fetch: SELECT * FROM clubs ORDER BY order_index

PageHeader: eyebrow="Our Communities", title="Student Clubs & Societies"
Filter bar (client): All / Established / Coming Soon (useState)
Grid: repeat(auto-fill, minmax(240px, 1fr)), gap 20px
ClubCard per club
AnimatedSection stagger wrapper

ClubCard (src/components/clubs/ClubCard.tsx):
  GlassCard glass-hover
  Top: club colour strip (4px height, border-radius top)
  Body: monogram avatar (club colour bg), name, tagline
  Stats row: member count + event count
  Status badge
  Hover: lift + border tints club colour
  onClick: router.push('/clubs/[slug]')
  Coming-soon: overlay with "Coming Soon" + opacity 0.6
```

### 8.2 Club Detail `src/app/clubs/[slug]/page.tsx`
```
generateStaticParams: return all club slugs (SSG)
revalidate: 3600 (rebuild every hour)

Fetch:
  club = SELECT * FROM clubs WHERE slug = $slug
  members = SELECT club_members.*, profiles.* FROM club_members
            JOIN profiles ON ... WHERE club_id = club.id AND is_active = true
            ORDER BY role_rank ASC LIMIT 4
  events = SELECT * FROM events WHERE club_id = club.id
           AND status IN ('upcoming','ongoing') LIMIT 3
  socialLinks = SELECT * FROM social_links WHERE club_id = club.id

Layout:
  Hero banner (cover_url or gradient fallback using club colour)
  Club logo + name + tagline overlay on banner
  Stats chips: member count, events count

  Tab bar (Radix Tabs): Overview | Events | Team | Social Links

  Overview tab:
    Club description
    Featured members preview (first 4: President, VP, 2 core)
    "See full team →" link
    Upcoming events preview (3 cards)
    "Join this club →" CTA → /student-id?club=[slug]

  Events tab:
    All events for this club (EventCard grid)

  Team tab:
    Redirect or inline → /clubs/[slug]/team

  Social Links tab:
    Platform icon grid for this club's links

Coming-soon clubs:
  Show teaser: "Coming Soon", description, countdown (if launch date set)
  No team/events tabs
```

### 8.3 Team Profiles `src/app/clubs/[slug]/team/page.tsx`
```
Server Component
Fetch:
  club
  members = SELECT cm.*, p.* FROM club_members cm
            JOIN profiles p ON p.id = cm.profile_id
            WHERE cm.club_id = club.id AND cm.is_active = true
            ORDER BY cm.role_rank ASC

Check caller's role:
  canEdit = caller is President or Faculty Advisor of this club

Layout:
  PageHeader: eyebrow=[club name], title="Our Team"

  President + Vice President section (larger cards, top)
  Core Team section (grid, smaller cards)

TeamMemberCard (src/components/clubs/TeamMemberCard.tsx):
  Props: member: ClubMember & { profile: Profile }, canEdit: boolean, clubColor: string

  Avatar: <Image> from profile.avatar_url
          Fallback: div with initials, background = clubColor + opacity 0.18
  Name: font-weight 600
  Role title: font-size 0.78rem, var(--text-muted)

  LinkedIn button:
    Visible only if profile.linkedin_url is set
    href={profile.linkedin_url} target="_blank" rel="noopener noreferrer"
    Disabled + greyed if null

  Resume button:
    Visible only if profile.resume_url is set
    onClick: fetch('/api/profile/resume-url?profileId=X') → get signed URL → window.open(signedUrl)
    Disabled + greyed if null

  Edit mode (canEdit=true adds edit overlay):
    Edit LinkedIn URL input
    Upload Resume: <input type="file" accept="application/pdf">
      Client validate: file.type === 'application/pdf' && file.size <= 5_242_880
      On valid: POST /api/upload/resume → { signedUrl, path } → PUT file to signedUrl → update profile
    Remove member button (confirms before removing)
    Change role title
    Drag handle for reordering (updates role_rank)

  Animation: staggered fadeIn + translateY on page load
```

**Resume Upload API:**
```ts
// src/app/api/upload/resume/route.ts
// POST { profileId: string, fileName: string }
// 1. Verify session (cookie)
// 2. Check caller is President/Faculty of a club that profileId belongs to
// 3. supabaseAdmin.storage.from('resumes').createSignedUploadUrl(`${profileId}/${Date.now()}_${fileName}`, 60)
// 4. Return { signedUrl, path }
// Client then: fetch(signedUrl, { method: 'PUT', body: file, headers: { 'Content-Type': 'application/pdf' } })
// Client then: supabase.from('profiles').update({ resume_url: path }).eq('id', profileId)
```

**Resume View API:**
```ts
// src/app/api/profile/resume-url/route.ts
// GET ?profileId=X
// 1. Verify session
// 2. Fetch profile.resume_url
// 3. supabaseAdmin.storage.from('resumes').createSignedUrl(path, 3600)
// 4. Return { signedUrl }
```

---

## SECTION 9 — EVENTS PAGES

### 9.1 Events List `src/app/events/page.tsx`
```
export const revalidate = 60

Fetch: SELECT events.*, clubs.name, clubs.color, clubs.slug
       FROM events JOIN clubs ON events.club_id = clubs.id
       ORDER BY start_at ASC

Client filters (useState):
  Status: All / Ongoing / Upcoming / Completed
  Club: All / [each club name]
  Type: All / Workshop / Contest / Festival / Seminar / Sport / Exhibition

Grid: repeat(auto-fill, minmax(280px, 1fr)), gap 20px
EventCard per event
AnimatedSection stagger
```

### 9.2 Event Detail `src/app/events/[id]/page.tsx`
```
generateStaticParams: all event IDs
revalidate: 300

Fetch: event + club data

Layout:
  Cover image (full width, aspect 16/5)
  Title, club badge, status badge, type badge
  Two-column (desktop): main content | sidebar card

  Main content:
    Description (markdown rendered if needed)
    Venue with map link (Google Maps URL)
    Date range

  Sidebar card (GlassCard):
    EventCountdown (if upcoming): days, hrs, mins, secs — Framer Motion digits
    Register button: href={reg_link}, target="_blank"
    Club info: logo, name, member count, link to club page
    Share: copies window.location.href to clipboard → toast "Copied!"
    Add to calendar link (Google Calendar URL format)
```

**EventCountdown (src/components/events/EventCountdown.tsx):**
```
'use client'
Props: targetDate: string
useEffect interval every second → calculate { days, hours, mins, secs }
Each digit: Framer Motion AnimatePresence → digit flips on change (y: -20 → 0, opacity: 0 → 1)
Stops and shows "Event is live!" when remaining = 0
```

---

## SECTION 10 — ATTENDANCE SYSTEM

### 10.1 Student Attendance Page `src/app/attend/[sessionId]/page.tsx`
```
'use client'
Protected by middleware (must be logged in)

On mount:
  Fetch session: GET /api/attendance/session/[sessionId]
  If session.open = false → show "Session Closed" state
  If already marked → show "Already Marked at [time]" state

UI states (one visible at a time):
  IDLE:     venue name, event name, radius shown; "Mark My Attendance" button
  LOADING:  spinner animation (Framer Motion rotate)
  SUCCESS:  SVG checkmark (stroke-dashoffset 280→0, 0.6s ease); "Attendance Marked · [distance]m away"
  OUTSIDE:  amber warning icon; "You are [X]m away (limit: [radius]m). Attendance not verified."
  DUPLICATE: "Already marked at [time]"
  CLOSED:   "This session is no longer accepting attendance"
  ERROR:    "Could not get your location. Please enable location access."

On button click:
  setStatus('LOADING')
  useGeolocation hook → getCurrentPosition
  POST /api/attendance/mark { sessionId, lat, lng }
  Handle response → set appropriate status
```

### 10.2 Mark Attendance API
```ts
// src/app/api/attendance/mark/route.ts
// POST { sessionId: string, lat: number, lng: number }
//
// 1. Verify session (Supabase cookie auth)
// 2. Zod validate input
// 3. Fetch attendance_session row (must be open=true)
// 4. distanceM = haversineMetres(session.lat, session.lng, body.lat, body.lng)
// 5. verified = distanceM <= session.radius_m
// 6. Try INSERT INTO attendance_records:
//      { session_id, profile_id: user.id, user_lat, user_lng, distance_m, verified }
//    On UNIQUE violation (23505): return { alreadyMarked: true }
// 7. Write to audit_log
// 8. Return { verified, distanceM, alreadyMarked: false }
```

### 10.3 Create Session API
```ts
// src/app/api/attendance/session/route.ts
// POST { clubId, eventId?, venueName, lat, lng, radiusM }
//
// 1. Verify session + check caller is President of clubId (or super-admin)
// 2. Zod validate: lat/lng are valid floats, radiusM between 10–200
// 3. INSERT INTO attendance_sessions
// 4. Write to audit_log
// 5. Return { sessionId }
```

### 10.4 Admin — Create Session Page `src/app/admin/attendance/page.tsx`
```
'use client'
Protected: role_title = 'President' OR super-admin

Form fields:
  Club selector (dropdown — clubs where user is President)
  Event selector (optional — filtered by selected club)
  Venue name (text input)
  Latitude input + Longitude input
  "Use My Location" button → navigator.geolocation → fills lat/lng
  Radius slider: 25–50m (Radix Slider)

On submit:
  POST /api/attendance/session
  On success: show sessionId + QR code (<QRCodeDisplay value={`${SITE_URL}/attend/${sessionId}`} />)
  Download QR button (PNG)
  Link to live view: /admin/attendance/[sessionId]
```

### 10.5 Admin — Live View `src/app/admin/attendance/[sessionId]/page.tsx`
```
'use client'
Protected: must be creator or super-admin

On mount:
  Fetch all attendance_records for session (with profiles joined)
  Subscribe to Supabase Realtime:
    supabase.channel('attendance').on('postgres_changes', { table: 'attendance_records', filter: `session_id=eq.${sessionId}` }, (payload) => { setRecords(prev => [...prev, payload.new]) }).subscribe()

UI:
  Session info bar: venue, event, radius, status (Open/Closed), created time
  Summary row: Total Marked | Verified | Outside Radius
  Table:
    Columns: # | Name | Roll No | Time | Distance (m) | Status (✓ Verified / ⚠ Outside)
    Sorted by marked_at ASC
    New rows animate in: Framer Motion layout animation

  "Close Session" button (shown if session.open = true):
    PATCH /api/attendance/session/[sessionId]/close
    Confirms before closing

  "Export PDF" button:
    Calls generateAttendancePDF(data) from src/lib/pdf.ts
    Triggers browser download

Close Session API:
// PATCH /api/attendance/session/[sessionId]/close
// 1. Verify caller is session creator or super-admin
// 2. UPDATE attendance_sessions SET open=false, closed_at=now() WHERE id=$id
// 3. Write to audit_log
```

---

## SECTION 11 — DEALS PAGE

### 11.1 Public Page `src/app/deals/page.tsx`
```
export const revalidate = 300
Fetch: SELECT deals.*, clubs.name, clubs.color
       FROM deals LEFT JOIN clubs ON deals.club_id = clubs.id
       WHERE is_active = true AND (expires_at IS NULL OR expires_at >= CURRENT_DATE)
       ORDER BY created_at DESC

PageHeader: eyebrow="Exclusive Perks", title="Student Deals"
Filter bar: All Clubs / [each club] + Type filter
DealCard grid: repeat(auto-fill, minmax(260px, 1fr))
```

### 11.2 DealCard `src/components/deals/DealCard.tsx`
```
Props: deal: Deal

GlassCard glass-hover
Top: cover_url image or provider-coloured gradient
Club badge (if club_id set) or "College-Wide" badge
Discount badge: "X% OFF" or "FREE" or "COUPON"
Title (font-weight 600)
Provider name (var(--text-muted))
Description (clamped 2 lines)
Expiry: "Expires [date]" or "No expiry"
Coupon code row: blurred text → click → reveals code + copies to clipboard → toast "Copied!"
"Get Deal →" button: opens deal.link in new tab
```

### 11.3 Admin Deals `src/app/admin/deals/page.tsx`
```
Protected: President (any club) or super-admin
Table of all deals with Edit / Toggle Active / Delete actions
"Add Deal" button → inline form or modal:
  Fields: title, provider, description, coupon_code, discount_pct, link, expires_at, club_id, cover image upload
```

---

## SECTION 12 — STUDENT ID SYSTEM

### 12.1 Public Application Page `src/app/student-id/page.tsx`
```
'use client'
Requires login (check session, show "Login to apply" if no session)

Multi-step form (3 steps):

  Step 1 — Select Club:
    Grid of club cards (name, colour, tagline)
    Click to select → highlight selected card
    "Next" button

  Step 2 — Your Details:
    Full Name (required, text)
    Roll Number (required, text)
    GfG Username (required only if selectedClub.slug === 'gfg', else hidden)
    "Submit Application" button

  Step 3 — Confirmation:
    Show application ID
    Status badge: "Pending President Approval"
    "Track Application" section showing current status

  If application already exists for this user + club:
    Show existing application status instead of form
    If status = 'approved': show "Download ID Card" button
    If status = 'pending': show "Awaiting approval"
    If status = 'rejected': show message + allow re-apply after 7 days

On submit:
  POST /api/student-id/apply
  On success: move to Step 3
```

### 12.2 Apply API
```ts
// src/app/api/student-id/apply/route.ts
// POST { clubId, fullName, rollNumber, extraField? }
//
// 1. Verify session
// 2. Zod validate all fields (strip HTML, max lengths)
// 3. Check no existing 'approved' or 'pending' application for this user + club
//    If exists: return { error: 'Application already exists', status: existing.status }
// 4. Fetch club President's profile (to get email)
// 5. INSERT INTO student_id_applications
// 6. sendIDApplicationEmail(president.email, fullName, club.name)
// 7. Write to audit_log
// 8. Return { applicationId }
```

### 12.3 Admin — ID Requests `src/app/admin/id-requests/page.tsx`
```
Protected: President of their club OR super-admin
Fetch: pending applications for this President's clubs

Tabs: Pending | Approved | Rejected
Table: Name | Roll No | Club | GfG Username | Applied At | Actions

Approve button:
  POST /api/student-id/approve { applicationId }
  On success: row moves to Approved tab

Reject button:
  Confirms dialog → POST /api/student-id/reject { applicationId }
```

### 12.4 Approve API
```ts
// src/app/api/student-id/approve/route.ts
// POST { applicationId }
//
// 1. Verify caller is President of application's club OR super-admin
// 2. Fetch application + applicant profile + club
// 3. UPDATE student_id_applications SET status='approved', reviewed_by=caller.id, reviewed_at=now()
// 4. sendIDApprovedEmail(applicant.email, applicant.full_name, downloadUrl)
// 5. Write to audit_log
// 6. Return { success: true }
// Note: ID card PDF is generated CLIENT-SIDE on the applicant's confirmation page
//       to avoid Vercel function memory limits with html2canvas
```

### 12.5 ID Card Design (IDCardPreview component)
```
File: src/components/student-id/IDCardPreview.tsx
Props: application: StudentIDApplication, club: Club, profile: Profile
Rendered as a hidden div, converted to PDF via html2canvas + jsPDF

Physical size: 85.6mm × 53.98mm (CR80 standard)

FRONT:
  Header strip (club colour, height 20%):
    Left: "RDEC" text (heading font, white)
    Right: club name (body font, white, 0.7rem)
  Body (white/light bg):
    Avatar or initials circle
    Student full name (heading font, 1rem)
    Roll number (body, 0.75rem, muted)
    GfG username row (only if club = gfg)
    Academic year (auto-calculated from admission year if extractable from roll number)
    Club name badge (coloured pill)
  Bottom strip (light version of club colour):
    QR code (links to ${SITE_URL}/profile/${applicant_id})
    "RDEC Student Portal" caption

BACK:
  Club logo/monogram (large, centred)
  R.D. Engineering College
  Ghaziabad, Uttar Pradesh
  www.rdec.edu.in
  Portal: [SITE_URL]
  Club social links (platform + handle, small text)

Download flow (on applicant's page after approval):
  1. Render IDCardPreview in a hidden off-screen div
  2. html2canvas(cardElement, { scale: 3 }) → canvas (high DPI)
  3. new jsPDF({ unit: 'mm', format: [85.6, 53.98], orientation: 'landscape' })
  4. pdf.addImage(canvas, 'PNG', 0, 0, 85.6, 53.98)
  5. pdf.save(`RDEC-ID-${rollNumber}-${clubSlug}.pdf`)
```

---

## SECTION 13 — COMMUNITY PAGE `src/app/community/page.tsx`
```
Server Component
Fetch: SELECT * FROM social_links ORDER BY club_id NULLS FIRST, order_index

PageHeader: eyebrow="Stay Connected", title="Our Community"

Section 1 — College-Wide Links:
  Filter: WHERE club_id IS NULL
  Large icon links grid for college's Instagram, LinkedIn, YouTube, Twitter, etc.

Section 2 — Club Social Links:
  Group by club
  Per-club card (GlassCard):
    Club name + colour header
    Platform icon grid (inline SVG icons, not emoji, not external CDN)
    On hover: icon fills with platform brand colour

Platform SVG icons (create in /public/icons/ or inline in component):
  instagram.svg, linkedin.svg, whatsapp.svg, github.svg,
  youtube.svg, twitter.svg, discord.svg

Admin can edit social links from:
  Per-club: /admin/clubs/[slug]/social (for President/Faculty)
  College-wide: /admin/social (super-admin only)
```

---

## SECTION 14 — MERCH PAGE `src/app/merch/page.tsx`
```
export const revalidate = 300
Fetch: SELECT merch.*, clubs.name, clubs.color
       FROM merch JOIN clubs ON merch.club_id = clubs.id
       ORDER BY clubs.order_index, merch.created_at DESC

PageHeader: eyebrow="Official Gear", title="Merch Store"
Filter: All / per club
Grid: repeat(auto-fill, minmax(220px, 1fr))

MerchCard:
  GlassCard glass-hover
  Product image (or club-colour gradient if no image)
  Club badge
  Product name (font-weight 600)
  Description (2 lines clamped)
  Price: "₹[X]" in heading font or "FREE"
  Sold Out badge (red) if available = false
  "Order Now" button: href={order_link} target="_blank"
    Disabled + greyed if sold out

Admin merch: /admin/merch
  Add/edit/remove items, toggle availability, upload images
```

---

## SECTION 15 — SPONSORS PAGE `src/app/sponsors/page.tsx`
```
export const revalidate = 3600
Fetch: SELECT * FROM sponsors WHERE is_active = true ORDER BY order_index

PageHeader: eyebrow="Our Supporters", title="Sponsors & Partners"

Render per tier (tierOrder from utils.ts):
  PLATINUM: large cards (1 per row on desktop), logo 120px height
  GOLD:     2 per row, logo 80px height
  SILVER:   3 per row, logo 60px height
  BRONZE:   4 per row, logo 48px height
  PARTNER:  5 per row, logo 36px height

Sponsor card per item:
  GlassCard
  Logo (Next.js Image, object-contain)
  Name + description
  "Visit Website →" link (opens in new tab)

Bottom CTA: "Become a Sponsor"
  Large outlined banner with sponsor inquiry email or Google Form link

Admin: /admin/sponsors (super-admin only)
  Add/edit/remove sponsors, upload logos, set tier + order
```

---

## SECTION 16 — ABOUT PAGE `src/app/about/page.tsx`
```
Server Component (static, revalidate: 86400)

Sections:
  1. Hero: "About R.D. Engineering College"
     Prominent CTA button: "Visit Official Website →" → https://rdec.edu.in (target: _blank)

  2. At a Glance:
     Established year | NAAC grade | Location (Ghaziabad, U.P.) | Affiliation (AKTU)
     4 stat chips in a row (GlassCards)

  3. About paragraph:
     2–3 paragraphs about the college (hardcode for now; super-admin CMS later)

  4. Departments list (2-column grid):
     CSE, IT, ECE, EEE, ME, CE, etc.

  5. Student Bodies section:
     Mini cards for all 9 clubs with links to /clubs/[slug]

  6. Campus photos:
     Static images from /public/images/campus/ (4–6 photos in a masonry-style grid)

  7. Contact card (GlassCard):
     Address, phone, email, map embed link
```

---

## SECTION 17 — AUTH PAGES

### 17.1 Login `src/app/login/page.tsx`
```
'use client'

Centred card layout (full viewport height)
GlassCard, max-w-md, mx-auto, mt-20

RDEC logo/monogram at top
"Sign In to RDEC Portal" heading (heading font)

Email input (react-hook-form)
Password input (with show/hide toggle)
"Sign In" button (full width, font-button)

Form submit:
  const supabase = createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if error → show inline error message
  if success → redirect to `next` param OR /admin/dashboard (if admin) OR /student-id

"Forgot password?" link → Supabase magic link flow (future)
No public registration — accounts created by super-admin only
```

### 17.2 Auth Callback `src/app/auth/callback/route.ts`
```ts
// Handles Supabase OAuth / magic link redirect
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'
  if (code) {
    const supabase = createClient()
    await supabase.auth.exchangeCodeForSession(code)
  }
  return NextResponse.redirect(new URL(next, request.url))
}
```

---

## SECTION 18 — ADMIN PAGES

### 18.1 Admin Layout `src/app/admin/layout.tsx`
```
Server Component
Fetch session + profile.role
If no session → redirect /login?next=/admin/dashboard
If role = 'student' → redirect /

Sidebar layout:
  Left sidebar (desktop) / drawer (mobile)
  Sidebar items per role:
    PRESIDENT:
      Dashboard, Events, Members, Attendance, ID Requests, Deals, Merch, Social Links
    FACULTY ADVISOR:
      Dashboard, Members (view+edit), Events (view)
    SUPER-ADMIN:
      All above + Clubs Management, Sponsors, Global Social Links, Audit Log, User Management
  Role badge shown at bottom of sidebar
```

### 18.2 Admin Dashboard `src/app/admin/dashboard/page.tsx`
```
Server Component
Fetch (scoped to user's clubs for Presidents, global for super-admin):
  Pending ID applications count
  Open attendance sessions count
  Upcoming events count
  Recent audit log entries (last 5)

Display:
  Quick stats row (4 metric cards)
  Pending ID applications table (top 5)
  Open attendance sessions list
  Upcoming events (next 3)
```

### 18.3 Admin Members `src/app/admin/members/page.tsx`
```
Protected: President + Faculty + super-admin
Shows club_members for this user's club(s)
Table: avatar, name, roll number, role title, joined date, active toggle, LinkedIn, resume
Actions: Edit role, Remove member, View profile
"Add Member" button: form with fields (name, roll, role_title, role_rank)
  On add: check profile exists by roll_number → link OR create placeholder profile
```

### 18.4 Admin Events `src/app/admin/events/page.tsx`
```
Protected: President + Faculty + super-admin
CRUD for events in this user's club(s)
Table with Edit / Delete / Toggle Status
"Add Event" modal form:
  title, description, event_type, status, venue, lat, lng, geofence_radius,
  start_at, end_at, reg_link, cover image upload
```

---

## SECTION 19 — SECURITY (ATHENAEGUARD FULL CHECKLIST)

### Authentication
- [ ] JWT session via `@supabase/ssr` httpOnly cookies (auto-handled)
- [ ] Access token: 1hr, Refresh token: 7 days (Supabase defaults)
- [ ] Middleware refreshes session on every request
- [ ] Admin routes double-protected: middleware + layout server check
- [ ] No public registration — super-admin creates accounts

### Input Validation
- [ ] Zod schema on every API route — validate before any DB operation
- [ ] Strip HTML from all text inputs (use `.trim()` + Zod `.max()` limits)
- [ ] File uploads: `file.type === 'application/pdf'` + `file.size <= 5_242_880` (client AND server)
- [ ] Lat/lng: validate as floats within realistic bounds (-90/90, -180/180)

### Data Access
- [ ] RLS on all 13 tables (done in schema.sql)
- [ ] `supabaseAdmin` (service role) used only in server-side route handlers
- [ ] Never pass `SUPABASE_SERVICE_ROLE_KEY` to client
- [ ] All client Supabase queries go through anon key + RLS

### Geo Security
- [ ] Haversine check runs SERVER-SIDE in `/api/attendance/mark`
- [ ] Client never determines `verified` flag — only server sets it
- [ ] `user_lat` and `user_lng` stored as-is; only `verified` is trusted

### HTTP Security
- [ ] Security headers in `next.config.ts` (done in Section 1.5)
- [ ] `robots.txt`: disallow `/admin/`, `/attend/`, `/api/`
- [ ] CSRF: SameSite=Lax cookies (Supabase SSR default)
- [ ] Verify `Origin` header on state-mutating API routes

### Rate Limiting (add after launch if traffic grows)
- [ ] `/api/attendance/mark`: 5 req/min per user
- [ ] `/api/student-id/apply`: 3 req/min per user
- [ ] `/api/upload/resume`: 2 req/min per user
- *Use `@upstash/ratelimit` + Vercel KV (both have free tiers)*

### Audit Logging
- [ ] Write to `audit_log` table on every admin action:
  - Member add/remove
  - ID application approve/reject
  - Attendance session create/close
  - Event create/edit/delete
  - Deal add/edit/delete
  - Admin login
- [ ] Include: `actor_id`, `action`, `target_table`, `target_id`, `ip_address` (from request headers)

---

## SECTION 20 — ANIMATIONS MASTER REFERENCE

### Anime.js Patterns
```ts
// Character stagger (hero headline)
anime({
  targets: '.hero-char',
  opacity: [0, 1],
  translateY: [30, 0],
  delay: anime.stagger(28),
  easing: 'easeOutExpo',
  duration: 900,
})

// Count-up (stats row)
const obj = { value: 0 }
anime({
  targets: obj,
  value: finalNumber,
  round: 1,
  duration: 1800,
  easing: 'easeOutExpo',
  update: () => { element.innerHTML = obj.value.toString() + '+' }
})

// Section stagger reveal (AnimatedSection component)
anime({
  targets: wrapper.children,
  opacity: [0, 1],
  translateY: [24, 0],
  delay: anime.stagger(80),
  easing: 'easeOutQuart',
  duration: 600,
})
```

### Framer Motion Patterns
```tsx
// Page transition wrapper
<motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>

// Countdown digit flip
<AnimatePresence mode="popLayout">
  <motion.span key={digit} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}>
    {digit}
  </motion.span>
</AnimatePresence>

// Realtime table row entrance
<motion.tr layout initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
```

### CSS-Only Animations
```css
/* Attendance checkmark draw */
.checkmark-path {
  stroke-dasharray: 280;
  stroke-dashoffset: 280;
  animation: draw 0.6s ease forwards;
}
@keyframes draw { to { stroke-dashoffset: 0; } }

/* ID card reveal */
.id-card-enter {
  animation: card-flip 0.5s ease forwards;
}
@keyframes card-flip {
  from { transform: perspective(1000px) rotateY(90deg); opacity: 0; }
  to   { transform: perspective(1000px) rotateY(0deg);  opacity: 1; }
}

/* Background gradient pulse */
@keyframes gradient-pulse {
  0%, 100% { opacity: 0.06; transform: scale(1); }
  50%       { opacity: 0.10; transform: scale(1.08); }
}
```

---

## SECTION 21 — FULL FOLDER STRUCTURE

```
rdec-portal/
├── public/
│   ├── fonts/               # Alsani/Shallamin files (when licensed)
│   ├── icons/               # platform SVGs: instagram.svg etc.
│   ├── images/
│   │   └── campus/          # 4-6 static campus photos
│   ├── robots.txt
│   └── og-image.png         # 1200×630px Open Graph image
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                           # Home
│   │   ├── globals.css
│   │   ├── about/page.tsx
│   │   ├── clubs/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       ├── page.tsx
│   │   │       └── team/page.tsx
│   │   ├── events/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── deals/page.tsx
│   │   ├── merch/page.tsx
│   │   ├── sponsors/page.tsx
│   │   ├── community/page.tsx
│   │   ├── student-id/page.tsx
│   │   ├── attend/[sessionId]/page.tsx
│   │   ├── login/page.tsx
│   │   ├── auth/callback/route.ts
│   │   ├── admin/
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── attendance/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [sessionId]/page.tsx
│   │   │   ├── members/page.tsx
│   │   │   ├── events/page.tsx
│   │   │   ├── deals/page.tsx
│   │   │   ├── merch/page.tsx
│   │   │   ├── id-requests/page.tsx
│   │   │   ├── social/page.tsx
│   │   │   └── sponsors/page.tsx              # super-admin only
│   │   └── api/
│   │       ├── attendance/
│   │       │   ├── session/route.ts
│   │       │   ├── session/[sessionId]/close/route.ts
│   │       │   └── mark/route.ts
│   │       ├── student-id/
│   │       │   ├── apply/route.ts
│   │       │   ├── approve/route.ts
│   │       │   └── reject/route.ts
│   │       ├── upload/resume/route.ts
│   │       └── profile/resume-url/route.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ThemeProvider.tsx
│   │   ├── shared/
│   │   │   ├── GlassCard.tsx
│   │   │   ├── AnimatedSection.tsx
│   │   │   ├── PageHeader.tsx
│   │   │   ├── QRCodeDisplay.tsx
│   │   │   ├── ClubBadge.tsx
│   │   │   └── StatusBadge.tsx
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── StatsRow.tsx
│   │   │   ├── EventsPreview.tsx
│   │   │   ├── ClubsStrip.tsx
│   │   │   ├── FeaturesGrid.tsx
│   │   │   └── AppCTABanner.tsx
│   │   ├── clubs/
│   │   │   ├── ClubCard.tsx
│   │   │   └── TeamMemberCard.tsx
│   │   ├── events/
│   │   │   ├── EventCard.tsx
│   │   │   └── EventCountdown.tsx
│   │   ├── attendance/
│   │   │   ├── AttendanceMarker.tsx
│   │   │   └── AttendanceLiveTable.tsx
│   │   ├── student-id/
│   │   │   ├── ApplicationForm.tsx
│   │   │   └── IDCardPreview.tsx
│   │   └── deals/
│   │       └── DealCard.tsx
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   ├── server.ts
│   │   │   └── admin.ts
│   │   ├── geo.ts
│   │   ├── pdf.ts
│   │   ├── email.ts
│   │   └── utils.ts
│   ├── hooks/
│   │   ├── useGeolocation.ts
│   │   ├── useTheme.ts
│   │   └── useRole.ts
│   ├── middleware.ts
│   └── types/index.ts
├── .env.local
├── .env.example               # committed, with empty values
├── .gitignore                 # include .env.local
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## SECTION 22 — STATIC FILES TO CREATE MANUALLY

### robots.txt (`public/robots.txt`)
```
User-agent: *
Disallow: /admin/
Disallow: /attend/
Disallow: /api/
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

### next-sitemap config (`next-sitemap.config.js`)
```js
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
  generateRobotsTxt: false,
  exclude: ['/admin/*', '/attend/*', '/api/*'],
}
```
Add to package.json scripts: `"postbuild": "next-sitemap"`

### OG Image
Create `public/og-image.png` — 1200×630px
Content: RDEC logo, "Student Bodies Portal", list of club names, dark bg

---

## SECTION 23 — SPRINT PLAN (11 days)

| Day | Date | Deliverables |
|---|---|---|
| 1 | Apr 18 | Sections 1.1–1.10 complete: project init, all deps, tailwind, globals.css, next.config, supabase clients, middleware, storage buckets, trigger SQL, GitHub + Vercel connected |
| 2 | Apr 19 | Sections 3–6 complete: types/index.ts, all utils, all hooks, ThemeProvider, GlassCard, AnimatedSection, PageHeader, ClubBadge, StatusBadge, Navbar, Footer, root layout |
| 3 | Apr 20 | Section 7 complete: entire Home page — Hero (anime.js), StatsRow (count-up), EventsPreview, ClubsStrip, FeaturesGrid, AppCTABanner |
| 4 | Apr 21 | Sections 8.1–8.2: /clubs directory + /clubs/[slug] detail page with all 4 tabs |
| 5 | Apr 22 | Section 8.3: /clubs/[slug]/team — full profiles, resume upload API, view API, edit mode |
| 6 | Apr 23 | Sections 9–10: /events + /events/[id] + full attendance system (student mark page + admin create + admin live view + PDF export) |
| 7 | Apr 24 | Sections 12–13: complete Student ID system (form, apply API, approval page, approve/reject APIs, ID card PDF generator, email notifications) |
| 8 | Apr 25 | Sections 11, 14–16: Deals + admin, Merch + admin, Community social links, Sponsors, About |
| 9 | Apr 26 | Sections 17–18: Login page, auth callback, admin layout + dashboard + all admin sub-pages |
| 10 | Apr 27 | Section 19–20: Full security pass (rate limiting, headers audit, RLS verify), animations polish pass on all pages, mobile responsive QA |
| 11 | Apr 28 | Section 22 + Pre-launch: robots.txt, sitemap, OG tags all pages, 404/500 pages, Lighthouse fixes (target ≥85/90/90), prod env vars in Vercel, custom domain DNS via Cloudflare, full smoke test |
| — | Apr 29 | **LAUNCH**: merge main → Vercel auto-deploy → smoke test prod URL → share with club Presidents |

---

## SECTION 24 — PRE-LAUNCH CHECKLIST

### Functionality
- [ ] All 16 pages render without errors on Chrome + Safari mobile
- [ ] Dark / light mode works on every page, persists across refresh
- [ ] Student ID flow: apply → President approval email → approved → card downloads as PDF
- [ ] Attendance flow: create session → QR generated → student scans → geo check → PDF export
- [ ] Resume upload: valid PDF ≤5MB ✓, >5MB ✗, non-PDF ✗
- [ ] LinkedIn button only shown when URL is set
- [ ] Coming-soon overlay on IEEE club page
- [ ] Admin routes return 401/redirect for student role
- [ ] Coupon code reveal on deals page works
- [ ] All external links open in new tab with rel="noopener noreferrer"

### Performance + SEO
- [ ] Lighthouse: Performance ≥85, Accessibility ≥90, SEO ≥90, Best Practices ≥90
- [ ] OG meta tags on all pages (title, description, image, url, type)
- [ ] All images use Next.js `<Image>` with width + height + alt
- [ ] robots.txt deployed at /robots.txt
- [ ] sitemap.xml generated via next-sitemap (run postbuild)
- [ ] Custom 404 page (src/app/not-found.tsx) — styled, with "Go Home" button
- [ ] Custom error page (src/app/error.tsx) — styled

### Infrastructure
- [ ] Supabase production project env vars set in Vercel (Production environment)
- [ ] Custom domain connected in Vercel dashboard
- [ ] DNS records pointed to Vercel via Cloudflare (orange-cloud = proxy mode ON)
- [ ] SSL active + HSTS header deployed
- [ ] Profile auto-create trigger is live in Supabase
- [ ] All 6 storage buckets created with correct public/private settings
- [ ] At least 1 super-admin account created and tested
- [ ] Seed: all 9 clubs have at least 1 social link each

---

## SECTION 25 — POST-LAUNCH BACKLOG
*Do not block launch. Implement in order after 29 Apr.*

1. **Leaderboard** `/leaderboard` — GfG + LeetCode public APIs, unified club ranking
2. **Resource Hub** `/resources` — club-tagged notes, LeetCode sheets, GitHub repos
3. **Club Blog** — markdown announcements per club (use `announcements` table)
4. **Alumni Wall** — past members, batch year, current company
5. **Project Showcase** — student project gallery, GitHub + demo links
6. **Event Gallery** — photo albums per event (Supabase storage `event-photos` bucket)
7. **Certificate Generator** — PDF cert + QR-verifiable public URL
8. **PWA Manifest** — installable app + push notifications for event reminders
9. **Analytics** — Vercel Analytics (free, privacy-first, zero config)
10. **Rate Limiting** — `@upstash/ratelimit` + Vercel KV once traffic justifies it
11. **Alsani/Shallamin fonts** — replace Cinzel Decorative once licensed, update `--font-heading`

---

## SECTION 26 — AI PROMPT TEMPLATE
*Paste this block before every code-gen request to maintain consistency:*

```
CONTEXT:
  Framework: Next.js 14 App Router, TypeScript, Tailwind CSS
  Animation: Framer Motion + Anime.js (for scroll reveals and hero)
  DB/Auth: Supabase (@supabase/ssr)
  Forms: react-hook-form + zod
  Utilities: date-fns, clsx, tailwind-merge

DESIGN:
  Light:  bg=#F2E7D6  bg-alt=#DFE6EF  accent=#5E7287  muted=#9AA5BB  text=#1A1410
  Dark:   bg=#0C2320  bg-alt=#112B27  accent=#AC8563  text=#E4F1E8
  Fonts:  heading=Cinzel Decorative, button=Cormorant Garamond, body=Sofia Sans
  Style:  glassmorphism (blur 18px saturate 160%), premium + techy + elegant
          anime.js stagger reveals, Framer Motion page transitions
          NO generic AI aesthetics, NO Inter/Roboto/Arial, NO purple gradients

EXISTING FILES (already created — import, do not redefine):
  src/types/index.ts          → all interfaces
  src/lib/utils.ts            → cn(), formatDate(), etc.
  src/lib/geo.ts              → haversineMetres()
  src/lib/supabase/client.ts  → createClient()
  src/lib/supabase/server.ts  → createClient()
  src/lib/supabase/admin.ts   → supabaseAdmin
  src/components/shared/GlassCard.tsx
  src/components/shared/AnimatedSection.tsx
  src/components/shared/PageHeader.tsx
  src/components/shared/StatusBadge.tsx
  src/components/shared/ClubBadge.tsx

TASK: [file path + component/page name]
REQUIREMENTS: [paste the relevant section from this TODO verbatim]
OUTPUT: complete single file, production-ready TypeScript, no placeholder comments,
        no TODO comments inside code, no console.log, fully typed, mobile-responsive
```

---

*v3 — Complete from-scratch reference · 18 Apr 2026*
*Supabase project bouhbfufhdeeuukfoxqu · schema.sql already applied*
