import HeroSection from '@/components/home/HeroSection';
import StatsRow from '@/components/home/StatsRow';
import ClubsStrip from '@/components/home/ClubsStrip';
import EventsPreview from '@/components/home/EventsPreview';
import FeaturesGrid from '@/components/home/FeaturesGrid';
import AppCTABanner from '@/components/home/AppCTABanner';
import { getClubs, getEvents } from '@/lib/data';

export default async function Home() {
  const [clubs, events] = await Promise.all([getClubs(), getEvents(6)]);

  return (
    <div className="flex flex-col gap-16 pb-24">
      <HeroSection />
      <StatsRow />
      <ClubsStrip clubs={clubs} />
      <EventsPreview events={events} />
      <FeaturesGrid />
      <AppCTABanner />
    </div>
  );
}
