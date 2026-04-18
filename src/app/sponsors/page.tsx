import PageHeader from '@/components/shared/PageHeader';
import AnimatedSection from '@/components/shared/AnimatedSection';
import GlassCard from '@/components/shared/GlassCard';
import { getSponsors } from '@/lib/data';

const tierConfig: Record<string, { label: string; size: string; border: string }> = {
  platinum: { label: '💎 Platinum', size: 'text-3xl', border: 'border-yellow-400/30' },
  gold: { label: '🥇 Gold', size: 'text-2xl', border: 'border-yellow-500/20' },
  silver: { label: '🥈 Silver', size: 'text-xl', border: 'border-gray-400/20' },
  bronze: { label: '🥉 Bronze', size: 'text-lg', border: 'border-orange-700/20' },
  partner: { label: '🤝 Community Partner', size: 'text-lg', border: 'border-accent/20' },
};

const tiers = ['platinum', 'gold', 'silver', 'bronze', 'partner'] as const;

export default async function SponsorsPage() {
  const allSponsors = await getSponsors();

  return (
    <>
      <PageHeader
        eyebrow="Our Partners"
        title="Sponsors"
        subtitle="The organisations that make our events, workshops, and programs possible."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Sponsors' }]}
      />

      <div className="max-w-7xl mx-auto px-6 pb-24 space-y-16">
        {allSponsors.length > 0 ? (
          tiers.map((tier) => {
            const sponsors = allSponsors.filter((s) => s.tier === tier && s.is_active);
            if (sponsors.length === 0) return null;
            const cfg = tierConfig[tier];
            return (
              <div key={tier}>
                <h2 className="font-heading text-2xl font-bold text-text mb-6">{cfg.label}</h2>
                <AnimatedSection
                  className={`grid gap-6 ${tier === 'platinum' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}
                  stagger={100}
                >
                  {sponsors.map((s) => (
                    <div key={s.id}>
                      <GlassCard
                        className={`h-full p-8 flex flex-col items-center text-center group border ${cfg.border}`}
                      >
                        <div className="w-24 h-24 rounded-full bg-bg-alt flex items-center justify-center mb-6 overflow-hidden">
                          {s.logo_url ? (
                            <img
                              src={s.logo_url}
                              alt={s.name}
                              className="w-full h-full object-contain p-4"
                            />
                          ) : (
                            <span className={`font-heading font-bold text-accent ${cfg.size}`}>
                              {s.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        <h3 className="font-heading text-xl font-bold text-text mb-2 group-hover:text-accent transition-colors">
                          {s.name}
                        </h3>
                        {s.description && (
                          <p className="font-body text-sm text-text-muted mb-4">{s.description}</p>
                        )}
                        {s.website_url && (
                          <a
                            href={s.website_url}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-auto px-5 py-2 rounded-lg border border-accent/30 text-accent font-button font-semibold hover:bg-accent hover:text-white transition-all text-sm"
                          >
                            Visit Website
                          </a>
                        )}
                      </GlassCard>
                    </div>
                  ))}
                </AnimatedSection>
              </div>
            );
          })
        ) : (
          <div className="text-center py-16 text-text-muted font-body text-lg">
            No active sponsors found.
          </div>
        )}

        <div className="text-center pt-8">
          <GlassCard className="inline-block px-12 py-10 text-center" hover={false}>
            <h3 className="font-heading text-2xl font-bold text-text mb-3">Become a Sponsor</h3>
            <p className="font-body text-text-muted mb-6 max-w-md mx-auto">
              Interested in partnering with RDEC student bodies? We&apos;d love to hear from you.
            </p>
            <a
              href="mailto:sponsors@rdec.edu.in"
              className="px-8 py-3 rounded-xl bg-accent text-white font-button text-lg font-semibold hover:bg-opacity-90 transition-all shadow-md"
            >
              Get in Touch
            </a>
          </GlassCard>
        </div>
      </div>
    </>
  );
}
