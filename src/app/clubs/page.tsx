import PageHeader from '@/components/shared/PageHeader';
import ClubsList from '@/components/clubs/ClubsList';
import { getClubs } from '@/lib/data';

export default async function ClubsPage() {
  const clubs = await getClubs();

  return (
    <>
      <PageHeader
        eyebrow="Student Bodies"
        title="Explore Our Clubs"
        subtitle="Discover the vibrant student communities at RDEC — from tech and culture to sports and wellness."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Clubs' }]}
      />

      <ClubsList initialClubs={clubs} />
    </>
  );
}
