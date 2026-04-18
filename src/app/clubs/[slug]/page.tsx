import Link from 'next/link';
import PageHeader from '@/components/shared/PageHeader';
import GlassCard from '@/components/shared/GlassCard';
import ClubDetailTabs from '@/components/clubs/ClubDetailTabs';
import { getClubBySlug, getEventsByClub, getSocialLinks, getClubTeam } from '@/lib/data';

export default async function ClubDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const club = await getClubBySlug(slug);

  if (!club) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl font-bold text-text mb-4">Club Not Found</h1>
          <p className="font-body text-text-muted mb-8">
            The club you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/clubs"
            className="px-6 py-3 rounded-xl bg-accent text-white font-button text-lg"
          >
            Back to Clubs
          </Link>
        </div>
      </div>
    );
  }

  const [events, socialLinks, members] = await Promise.all([
    getEventsByClub(club.id),
    getSocialLinks(club.id),
    getClubTeam(club.id),
  ]);

  const isComingSoon = club.status === 'coming-soon';

  return (
    <div className="relative">
      {isComingSoon && (
        <div className="fixed inset-0 z-40 bg-bg/70 backdrop-blur-md flex items-center justify-center">
          <GlassCard className="text-center p-12 max-w-md mx-6">
            <div
              className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ backgroundColor: `${club.color}20`, border: `2px solid ${club.color}50` }}
            >
              <div className="w-10 h-10 rounded-full" style={{ backgroundColor: club.color }} />
            </div>
            <h2 className="font-heading text-3xl font-bold text-text mb-3">{club.name}</h2>
            <p className="font-body text-text-muted mb-6">
              This student body is currently being set up. Stay tuned for updates!
            </p>
            <Link
              href="/clubs"
              className="inline-block px-6 py-3 rounded-xl bg-accent text-white font-button text-lg"
            >
              ← Back to Clubs
            </Link>
          </GlassCard>
        </div>
      )}

      <div
        className="relative h-48 md:h-64 flex items-end"
        style={{
          background: `linear-gradient(135deg, ${club.color}30 0%, ${club.color}10 50%, transparent 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-bg to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pb-6 flex items-end gap-6">
          <div
            className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center shadow-xl border-2"
            style={{ backgroundColor: `${club.color}15`, borderColor: `${club.color}40` }}
          >
            <div
              className="w-12 h-12 md:w-14 md:h-14 rounded-xl"
              style={{ backgroundColor: club.color }}
            />
          </div>
        </div>
      </div>

      <PageHeader
        eyebrow={club.tagline || undefined}
        title={club.name}
        subtitle={club.description || undefined}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Clubs', href: '/clubs' },
          { label: club.name },
        ]}
      />

      <ClubDetailTabs club={club} events={events} socialLinks={socialLinks} members={members} />
    </div>
  );
}
