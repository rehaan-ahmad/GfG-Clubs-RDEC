'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import anime from 'animejs';
import GlassCard from '@/components/shared/GlassCard';
import type { CampusEvent } from '@/types';

interface EventsPreviewProps {
  events: CampusEvent[];
}

export default function EventsPreview({ events }: EventsPreviewProps) {
  const [filter, setFilter] = useState<'all' | 'ongoing' | 'upcoming'>('all');
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredEvents = events.filter((e) => filter === 'all' || e.status === filter);

  useEffect(() => {
    anime({
      targets: '.evt-card',
      translateY: [20, 0],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 600,
      delay: anime.stagger(100),
    });
  }, [filter]);

  return (
    <section ref={containerRef} className="py-16 max-w-7xl mx-auto px-6 w-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div className="text-center md:text-left">
          <span className="text-accent uppercase font-bold tracking-widest text-sm mb-2 block">
            What&apos;s Happening
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-text">Campus Events</h2>
        </div>

        <div className="flex bg-text/5 p-1 rounded-xl border border-text/10">
          {(['all', 'ongoing', 'upcoming'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-lg font-body font-semibold transition-all duration-300 capitalize ${
                filter === f ? 'bg-accent text-white shadow-md' : 'text-text hover:bg-text/10'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((evt) => (
          <GlassCard key={evt.id} className="evt-card opacity-0 h-full flex flex-col p-6 group">
            <div className="flex justify-between items-start mb-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                  evt.status === 'ongoing'
                    ? 'bg-red-500/20 text-red-500 animate-[pulse_2s_ease-in-out_infinite]'
                    : 'bg-accent/20 text-accent'
                }`}
              >
                {evt.status}
              </span>
              <span className="font-body text-sm text-text-muted">
                {evt.start_at
                  ? new Date(evt.start_at).toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : 'TBA'}
              </span>
            </div>
            <h3 className="font-heading text-2xl font-bold text-text mb-2 group-hover:text-accent transition-colors">
              {evt.title}
            </h3>
            <p className="font-body tracking-wide font-medium text-accent mb-4">
              by {evt.club?.name || 'RDEC'}
            </p>
            <div className="mt-auto pt-4 border-t border-text/10 flex items-center gap-2">
              <span className="text-lg">📍</span>
              <span className="text-sm text-text-muted font-body leading-tight">{evt.venue}</span>
            </div>
          </GlassCard>
        ))}
        {filteredEvents.length === 0 && (
          <div className="col-span-full py-10 text-center text-text-muted font-body">
            No {filter !== 'all' ? filter : ''} events found at the moment.
          </div>
        )}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/events"
          className="inline-block px-8 py-3 rounded-xl border border-accent text-accent font-button text-lg font-semibold hover:bg-accent hover:text-white transition-all shadow-sm"
        >
          View Full Calendar
        </Link>
      </div>
    </section>
  );
}
