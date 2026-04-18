'use client';

import { useState } from 'react';
import AnimatedSection from '@/components/shared/AnimatedSection';
import ClubCard from '@/components/clubs/ClubCard';
import type { Club } from '@/types';

interface ClubsListProps {
  initialClubs: Club[];
}

export default function ClubsList({ initialClubs }: ClubsListProps) {
  const [filter, setFilter] = useState<'all' | 'established' | 'coming-soon'>('all');

  const filteredClubs = initialClubs.filter((c) => filter === 'all' || c.status === filter);

  return (
    <div className="max-w-7xl mx-auto px-6 pb-24">
      <div className="flex flex-wrap gap-2 mb-10">
        {(['all', 'established', 'coming-soon'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-6 py-2.5 rounded-xl font-body font-semibold text-sm transition-all duration-300 capitalize ${
              filter === f
                ? 'bg-accent text-white shadow-lg shadow-accent/20'
                : 'glass text-text hover:border-accent'
            }`}
          >
            {f === 'coming-soon' ? 'Coming Soon' : f}
          </button>
        ))}
      </div>

      <AnimatedSection
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        stagger={80}
      >
        {filteredClubs.map((club) => (
          <div key={club.id}>
            <ClubCard
              club={club}
              memberCount={0}
              eventCount={0}
            />
          </div>
        ))}
      </AnimatedSection>

      {filteredClubs.length === 0 && (
        <div className="text-center py-16 text-text-muted font-body text-lg">
          No clubs found for this filter.
        </div>
      )}
    </div>
  );
}
