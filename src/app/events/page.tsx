import PageHeader from '@/components/shared/PageHeader';
import EventsList from '@/components/events/EventsList';
import { getEvents } from '@/lib/data';

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <>
      <PageHeader
        eyebrow="What's Happening"
        title="Campus Events"
        subtitle="Stay up to date with workshops, contests, festivals, and more happening across all student bodies."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Events' }]}
      />

      <EventsList initialEvents={events} />
    </>
  );
}
