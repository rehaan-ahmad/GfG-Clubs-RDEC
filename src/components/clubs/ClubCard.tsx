import Link from 'next/link';
import GlassCard from '@/components/shared/GlassCard';
import type { Club } from '@/types';

interface ClubCardProps {
  club: Club;
  memberCount?: number;
  eventCount?: number;
}

export default function ClubCard({ club, memberCount = 0, eventCount = 0 }: ClubCardProps) {
  const isComingSoon = club.status === 'coming-soon';

  return (
    <Link href={`/clubs/${club.slug}`} className="outline-none block h-full">
      <GlassCard className="h-full flex flex-col p-6 group cursor-pointer relative overflow-hidden">
        {isComingSoon && (
          <div className="absolute inset-0 z-20 bg-bg/60 backdrop-blur-sm flex items-center justify-center rounded-[inherit]">
            <span className="px-4 py-2 rounded-full bg-text/10 border border-text/20 text-text font-body font-semibold text-sm uppercase tracking-widest">
              Coming Soon
            </span>
          </div>
        )}

        <div
          className="w-full h-1 rounded-full mb-6 transition-all duration-300 group-hover:h-1.5"
          style={{ backgroundColor: club.color || 'var(--accent)' }}
        />

        <div
          className="w-16 h-16 rounded-full mb-5 flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110"
          style={{
            backgroundColor: `${club.color || '#5E7287'}15`,
            border: `1px solid ${club.color || '#5E7287'}40`,
          }}
        >
          <div
            className="w-9 h-9 rounded-full"
            style={{ backgroundColor: club.color || '#5E7287' }}
          />
        </div>

        <h3 className="font-heading text-xl font-bold text-text mb-1 group-hover:text-accent transition-colors">
          {club.name}
        </h3>
        {club.tagline && (
          <p className="font-body text-sm text-text-muted mb-4 line-clamp-2">{club.tagline}</p>
        )}

        <div className="mt-auto pt-4 border-t border-text/10 flex items-center gap-6 text-sm font-body text-text-muted">
          <span>
            <strong className="text-text">{memberCount}</strong> members
          </span>
          <span>
            <strong className="text-text">{eventCount}</strong> events
          </span>
        </div>

        <div className="absolute top-6 right-6">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide"
            style={{
              backgroundColor: `${club.color || '#5E7287'}15`,
              color: club.color || '#5E7287',
            }}
          >
            {club.status === 'coming-soon' ? 'Soon' : 'Active'}
          </span>
        </div>
      </GlassCard>
    </Link>
  );
}
