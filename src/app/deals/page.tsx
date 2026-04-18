import PageHeader from '@/components/shared/PageHeader';
import DealsList from '@/components/deals/DealsList';
import { getDeals } from '@/lib/data';

export default async function DealsPage() {
  const deals = await getDeals();

  return (
    <>
      <PageHeader
        eyebrow="Exclusive Offers"
        title="Student Deals"
        subtitle="Curated discounts, free tools, and exclusive offers compiled for RDEC students."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Deals' }]}
      />

      <DealsList initialDeals={deals} />
    </>
  );
}
