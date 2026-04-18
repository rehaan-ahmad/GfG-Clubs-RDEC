import PageHeader from '@/components/shared/PageHeader';
import AnimatedSection from '@/components/shared/AnimatedSection';
import GlassCard from '@/components/shared/GlassCard';
import { getClubs, getSocialLinks, getAllSocialLinks } from '@/lib/data';

const platformIcon: Record<string, string> = {
  Instagram: '📸',
  LinkedIn: '💼',
  WhatsApp: '💬',
  GitHub: '🐙',
  YouTube: '🎬',
  Twitter: '🐦',
  Discord: '🎮',
};

export default async function CommunityPage() {
  const [clubs, collegeSocials, allSocialLinks] = await Promise.all([
    getClubs(),
    getSocialLinks(undefined),
    getAllSocialLinks(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Stay Connected"
        title="Community Links"
        subtitle="All official social media channels for RDEC and its student bodies — in one place."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Community' }]}
      />

      <div className="max-w-7xl mx-auto px-6 pb-24 space-y-16">
        {collegeSocials.length > 0 && (
          <div>
            <h2 className="font-heading text-2xl font-bold text-text mb-6">
              College-Wide Channels
            </h2>
            <AnimatedSection
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
              stagger={80}
            >
              {collegeSocials.map((link) => (
                <div key={link.id}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="block">
                    <GlassCard className="p-6 flex items-center gap-4 group">
                      <span className="text-3xl">{platformIcon[link.platform] || '🔗'}</span>
                      <div>
                        <h3 className="font-body font-bold text-text group-hover:text-accent transition-colors">
                          {link.platform}
                        </h3>
                        <p className="font-body text-sm text-text-muted">
                          {link.label || 'Official Channel'}
                        </p>
                      </div>
                    </GlassCard>
                  </a>
                </div>
              ))}
            </AnimatedSection>
          </div>
        )}

        <div>
          <h2 className="font-heading text-2xl font-bold text-text mb-6">Club Social Channels</h2>
          <div className="space-y-10">
            {clubs
              .filter((c) => c.status === 'established')
              .map((club) => {
                const links = allSocialLinks.filter((l) => l.club_id === club.id);
                if (links.length === 0) return null;
                return (
                  <div key={club.id}>
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-8 h-8 rounded-full"
                        style={{ backgroundColor: club.color }}
                      />
                      <h3 className="font-body font-bold text-lg text-text">{club.name}</h3>
                    </div>
                    <AnimatedSection
                      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                      stagger={60}
                    >
                      {links.map((link) => (
                        <div key={link.id}>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                          >
                            <GlassCard className="p-5 flex items-center gap-3 group">
                              <span className="text-2xl">
                                {platformIcon[link.platform] || '🔗'}
                              </span>
                              <div>
                                <h4 className="font-body font-semibold text-text group-hover:text-accent transition-colors text-sm">
                                  {link.platform}
                                </h4>
                                {link.label && (
                                  <p className="font-body text-xs text-text-muted">{link.label}</p>
                                )}
                              </div>
                            </GlassCard>
                          </a>
                        </div>
                      ))}
                    </AnimatedSection>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
