'use client';

import { useState } from 'react';
import AnimatedSection from '@/components/shared/AnimatedSection';
import GlassCard from '@/components/shared/GlassCard';
import type { CampusEvent } from '@/types';

type Filter = 'all' | 'upcoming' | 'ongoing' | 'completed';

interface EventsListProps {
  initialEvents: CampusEvent[];
}

export default function EventsList({ initialEvents }: EventsListProps) {
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = initialEvents.filter((e) => filter === 'all' || e.status === filter);

  return (
    <div className="max-w-7xl mx-auto px-6 pb-24">
      <div className="flex flex-wrap gap-2 mb-10">
        {(['all', 'upcoming', 'ongoing', 'completed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-6 py-2.5 rounded-xl font-body font-semibold text-sm transition-all duration-300 capitalize ${
              filter === f
                ? 'bg-accent text-white shadow-lg shadow-accent/20'
                : 'glass text-text hover:border-accent'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <AnimatedSection
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          stagger={80}
        >
          {filtered.map((evt) => (
            <div key={evt.id}>
              <GlassCard className="h-full flex flex-col p-6 group">
                <div className="flex justify-between items-start mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                      evt.status === 'ongoing'
                        ? 'bg-red-500/20 text-red-500 animate-pulse'
                        : evt.status === 'completed'
                          ? 'bg-green-500/20 text-green-500'
                          : 'bg-accent/20 text-accent'
                    }`}
                  >
                    {evt.status}
                  </span>
                  {evt.event_type && (
                    <span className="px-3 py-1 rounded-full text-xs font-body bg-bg-alt text-text-muted">
                      {evt.event_type}
                    </span>
                  )}
                </div>
                <h3 className="font-heading text-2xl font-bold text-text mb-2 group-hover:text-accent transition-colors">
                  {evt.title}
                </h3>
                {evt.club && (
                  <p
                    className="font-body text-sm font-semibold mb-3"
                    style={{ color: evt.club.color }}
                  >
                    {evt.club.name}
                  </p>
                )}
                <p className="font-body text-sm text-text-muted line-clamp-3 mb-4">
                  {evt.description}
                </p>
                <div className="mt-auto pt-4 border-t border-text/10 space-y-1 text-sm text-text-muted font-body">
                  {evt.venue && <p>📍 {evt.venue}</p>}
                  {evt.start_at && (
                    <p>
                      📅{' '}
                      {new Date(evt.start_at).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  )}
                </div>
                {evt.reg_link && (
                  <a
                    href={evt.reg_link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-block text-center px-5 py-2 rounded-lg bg-accent text-white font-button font-semibold hover:bg-opacity-90 transition-all"
                  >
                    Register
                  </a>
                )}
              </GlassCard>
            </div>
          ))}
        </AnimatedSection>
      ) : (
        <div className="text-center py-16 text-text-muted font-body text-lg">
          No {filter !== 'all' ? filter : ''} events found.
        </div>
      )}
    </div>
  );
}
