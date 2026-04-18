# Manual Setup Checklist

This file tracks the steps that cannot be completed from local code edits alone.

## Stage 1

### Supabase buckets

Create these buckets in Supabase Storage:

- `avatars` — public, images only, max 2 MB
- `resumes` — private, PDF only, max 5 MB
- `merch` — public, max 5 MB
- `sponsors` — public, max 5 MB
- `id-cards` — private, generated PDFs
- `covers` — public, event and club cover images

### GitHub and Vercel

- Connect the repo to Vercel
- Add `.env.local` values to Vercel Preview and Production
- Enable preview deployments

## Stage 2

### Database bootstrap

Run these SQL files in Supabase SQL Editor, in order:

1. `supabase/schema.sql`
2. `supabase/profile_trigger.sql`

### After applying SQL

- Verify the `clubs`, `profiles`, `club_members`, `events`, `attendance_sessions`, `attendance_records`, `student_id_applications`, `deals`, `merch`, `sponsors`, `social_links`, and `audit_log` tables exist
- Verify RLS is enabled on all of them
- Verify the 9 base clubs were seeded
- Create at least one `super-admin` profile for dashboard access
