'use client';

import { useState } from 'react';
import AnimatedSection from '@/components/shared/AnimatedSection';
import GlassCard from '@/components/shared/GlassCard';
import type { Deal } from '@/types';

interface DealsListProps {
  initialDeals: Deal[];
}

export default function DealsList({ initialDeals }: DealsListProps) {
  const [revealedCodes, setRevealedCodes] = useState<Set<string>>(new Set());

  const toggleReveal = (id: string) => {
    setRevealedCodes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pb-24">
      <AnimatedSection
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        stagger={80}
      >
        {initialDeals.map((deal) => (
          <div key={deal.id}>
            <GlassCard className="h-full flex flex-col p-6 group">
              <div className="flex justify-between items-start mb-4">
                {deal.discount_pct && (
                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-600 text-xs font-bold uppercase">
                    {deal.discount_pct}% OFF
                  </span>
                )}
                {deal.expires_at && (
                  <span className="text-xs font-body text-text-muted">
                    Expires{' '}
                    {new Date(deal.expires_at).toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                )}
              </div>

              <h3 className="font-heading text-xl font-bold text-text mb-1 group-hover:text-accent transition-colors">
                {deal.title}
              </h3>
              {deal.provider && (
                <p className="font-body text-sm font-semibold text-accent mb-3">
                  by {deal.provider}
                </p>
              )}
              <p className="font-body text-sm text-text-muted line-clamp-3 mb-4">
                {deal.description}
              </p>

              <div className="mt-auto space-y-3">
                {deal.coupon_code && (
                  <button
                    onClick={() => toggleReveal(deal.id)}
                    className="w-full py-2.5 rounded-lg border-2 border-dashed border-accent/40 font-body font-bold text-accent tracking-widest text-sm hover:border-accent transition-all"
                  >
                    {revealedCodes.has(deal.id) ? deal.coupon_code : '● ● ● ● ●  TAP TO REVEAL'}
                  </button>
                )}
                {deal.link && (
                  <a
                    href={deal.link}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-center py-2.5 rounded-lg bg-accent text-white font-button font-semibold hover:bg-opacity-90 transition-all"
                  >
                    Claim Deal →
                  </a>
                )}
              </div>
            </GlassCard>
          </div>
        ))}
      </AnimatedSection>

      {initialDeals.length === 0 && (
        <div className="text-center py-16 text-text-muted font-body text-lg">
          No active deals found at the moment.
        </div>
      )}
    </div>
  );
}
