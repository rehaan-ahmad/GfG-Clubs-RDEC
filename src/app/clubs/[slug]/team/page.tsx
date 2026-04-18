import Link from 'next/link';
import PageHeader from '@/components/shared/PageHeader';
import AnimatedSection from '@/components/shared/AnimatedSection';
import TeamMemberCard from '@/components/clubs/TeamMemberCard';
import { getClubBySlug, getClubTeam } from '@/lib/data';

export default async function TeamPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const club = await getClubBySlug(slug);

  if (!club) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl font-bold text-text mb-4">Club Not Found</h1>
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

  const members = await getClubTeam(club.id);
  const leaders = members.filter((m) => m.role_rank <= 2);
  const coreTeam = members.filter((m) => m.role_rank > 2);

  return (
    <>
      <PageHeader
        eyebrow={`${club.name} — Team`}
        title="Meet the Team"
        subtitle={`The people behind ${club.name} who make it all happen.`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Clubs', href: '/clubs' },
          { label: club.name, href: `/clubs/${slug}` },
          { label: 'Team' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 pb-24">
        {members.length === 0 ? (
          <div className="text-center py-16 text-text-muted font-body text-lg">
            No team members added yet for {club.name}.
          </div>
        ) : (
          <>
            {leaders.length > 0 && (
              <div className="mb-12">
                <h2 className="font-heading text-2xl font-bold text-text mb-6">Leadership</h2>
                <AnimatedSection
                  className={`grid gap-6 ${leaders.length === 1 ? 'grid-cols-1 max-w-md mx-auto' : 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto'}`}
                  stagger={150}
                >
                  {leaders.map((member) => (
                    <div key={member.id}>
                      <TeamMemberCard member={member} isLeader />
                    </div>
                  ))}
                </AnimatedSection>
              </div>
            )}

            {coreTeam.length > 0 && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-text mb-6">Core Team</h2>
                <AnimatedSection
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  stagger={80}
                >
                  {coreTeam.map((member) => (
                    <div key={member.id}>
                      <TeamMemberCard member={member} />
                    </div>
                  ))}
                </AnimatedSection>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
