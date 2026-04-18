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
- Set `RESEND_FROM_EMAIL` after your sending domain is configured in Resend

#### How to complete GitHub and Vercel

1. Push the `development` branch to GitHub.
2. Open Vercel and choose `Add New Project`.
3. Import `rehaan-ahmad/GfG-Clubs-RDEC`.
4. In the project setup screen, keep the framework as Next.js and use the repo root as the project root.
5. Before the first deploy, open `Settings -> Environment Variables`.
6. Copy every variable from `.env.local` into both `Preview` and `Production`.
7. Add `RESEND_FROM_EMAIL` with the sender address you verified in Resend.
8. Trigger a deploy from `development` and verify the build succeeds.
9. In Vercel, open `Settings -> Git` and confirm preview deployments are enabled for pull requests.
10. When `main` is used later for production promotion, keep `development` as the active branch for ongoing implementation work.

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

#### How to complete after applying SQL

1. In Supabase, open `Table Editor` and confirm all 12 tables are present.
2. Open each table's settings and confirm Row Level Security is enabled.
3. Open `clubs` and verify these 9 rows exist:
   `gfg`, `nexora`, `mehfil`, `spotlight`, `velocity`, `sukham`, `hottake`, `ieee`, `placement`.
4. In `Authentication -> Users`, create or use your own login account.
5. Copy that user ID.
6. Open `Table Editor -> profiles`, find the matching profile row created by the trigger, and set `role` to `super-admin`.
7. Optionally add `full_name`, `roll_number`, and any profile metadata you want for testing.
8. Sign into the app with that account once auth screens exist and verify privileged actions can read admin-only data.
