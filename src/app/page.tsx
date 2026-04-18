import {
  DEFAULT_GEOFENCE,
  RDEC_CLUBS,
  RDEC_HOSTING_STACK,
  RDEC_SUPABASE_PROJECT,
  SITE_CONFIG,
} from '@/lib/constants/site'

export default function Home() {
  return (
    <main className="min-h-screen bg-rdec-bg px-6 py-20 text-rdec-text sm:px-10">
      <section className="glass glass-hover mx-auto flex max-w-6xl flex-col gap-8 border border-rdec-border p-8 shadow-[0_20px_80px_rgba(26,20,16,0.08)] sm:p-12">
        <div className="space-y-4">
          <p className="font-button text-sm uppercase tracking-[0.35em] text-rdec-dimmed">
            Stage 1 Foundation
          </p>
          <h1 className="font-heading text-4xl leading-tight sm:text-6xl">
            {SITE_CONFIG.name}
          </h1>
          <p className="max-w-2xl text-base leading-7 text-rdec-dimmed sm:text-lg">
            Base theme tokens, typography, security headers, and Supabase SSR wiring
            are now in place. The project is ready to move from setup into feature
            work.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-card border border-rdec-border bg-rdec-card p-5">
            <p className="font-button text-sm uppercase tracking-[0.2em] text-rdec-dimmed">
              UI Base
            </p>
            <p className="mt-2 text-sm leading-6">
              Tailwind theme extensions and global design tokens match the Stage 1
              spec.
            </p>
          </div>
          <div className="rounded-card border border-rdec-border bg-rdec-card p-5">
            <p className="font-button text-sm uppercase tracking-[0.2em] text-rdec-dimmed">
              App Shell
            </p>
            <p className="mt-2 text-sm leading-6">
              Root metadata, font preconnects, and a non-placeholder homepage are set.
            </p>
          </div>
          <div className="rounded-card border border-rdec-border bg-rdec-card p-5">
            <p className="font-button text-sm uppercase tracking-[0.2em] text-rdec-dimmed">
              Auth Base
            </p>
            <p className="mt-2 text-sm leading-6">
              Browser, server, admin, and middleware Supabase clients are aligned for
              SSR auth flows.
            </p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-card border border-rdec-border bg-rdec-card p-5">
            <p className="font-button text-sm uppercase tracking-[0.2em] text-rdec-dimmed">
              Stage 0 Constants
            </p>
            <dl className="mt-4 space-y-3 text-sm leading-6">
              <div>
                <dt className="text-rdec-dimmed">Supabase project</dt>
                <dd>{RDEC_SUPABASE_PROJECT.name}</dd>
              </div>
              <div>
                <dt className="text-rdec-dimmed">Project ID</dt>
                <dd>{RDEC_SUPABASE_PROJECT.id}</dd>
              </div>
              <div>
                <dt className="text-rdec-dimmed">Geofence fallback</dt>
                <dd>
                  {DEFAULT_GEOFENCE.lat}, {DEFAULT_GEOFENCE.lng}
                </dd>
              </div>
              <div>
                <dt className="text-rdec-dimmed">Hosting stack</dt>
                <dd>
                  {RDEC_HOSTING_STACK.frontend} / {RDEC_HOSTING_STACK.database} /{' '}
                  {RDEC_HOSTING_STACK.email} / {RDEC_HOSTING_STACK.edge}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-card border border-rdec-border bg-rdec-card p-5">
            <p className="font-button text-sm uppercase tracking-[0.2em] text-rdec-dimmed">
              Seeded Clubs
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {RDEC_CLUBS.map((club) => (
                <li
                  key={club.slug}
                  className="rounded-card border border-rdec-border bg-rdec-bg/60 p-3"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: club.color }}
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-medium">{club.name}</p>
                      <p className="text-xs uppercase tracking-[0.15em] text-rdec-dimmed">
                        {club.status}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
