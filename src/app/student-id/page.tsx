import PageHeader from '@/components/shared/PageHeader';
import StudentIDForm from '@/components/id/StudentIDForm';
import { getClubs } from '@/lib/data';

export default async function StudentIDPage() {
  const clubs = await getClubs();

  return (
    <>
      <PageHeader
        eyebrow="Membership"
        title="Student ID Card"
        subtitle="Apply for your official RDEC student body membership card — digital and verifiable."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Student ID' }]}
      />

      <StudentIDForm clubs={clubs} />
    </>
  );
}
