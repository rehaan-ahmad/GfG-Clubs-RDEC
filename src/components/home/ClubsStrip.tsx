'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import anime from 'animejs';
import GlassCard from '@/components/shared/GlassCard';
import type { Club } from '@/types';

interface ClubsStripProps {
  clubs: Club[];
}

export default function ClubsStrip({ clubs }: ClubsStripProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          anime({
            targets: '.club-strip-card',
            translateY: [40, 0],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 800,
            delay: anime.stagger(100),
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="py-16 max-w-7xl mx-auto px-6 w-full">
      <div className="flex justify-between items-end mb-10">
        <div>
          <span className="text-accent uppercase font-bold tracking-widest text-sm mb-2 block">
            Our Communities
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-text">
            Explore Student Bodies
          </h2>
        </div>
        <Link
          href="/clubs"
          className="hidden sm:inline-block font-button text-lg text-accent hover:underline decoration-2 underline-offset-4"
        >
          View all
        </Link>
      </div>

      <div className="flex overflow-x-auto pb-8 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 snap-x snap-mandatory hide-scrollbar">
        {clubs.map((club, idx) => (
          <Link
            key={idx}
            href={`/clubs/${club.slug}`}
            className="min-w-[80vw] sm:min-w-[300px] md:min-w-0 snap-center outline-none"
          >
            <GlassCard className="club-strip-card opacity-0 h-full flex flex-col items-center justify-center p-8 text-center group cursor-pointer transition-transform">
              <div
                className="w-20 h-20 rounded-full mb-6 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${club.color}20`, border: `1px solid ${club.color}50` }}
              >
                <div
                  className="w-12 h-12 rounded-full"
                  style={{ backgroundColor: club.color }}
                ></div>
              </div>
              <h3 className="font-body font-bold text-xl text-text mb-2">{club.name}</h3>
              {club.status === 'coming-soon' ? (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-bg-alt text-text-muted mt-2 uppercase tracking-wide">
                  Coming Soon
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent mt-2">
                  Established
                </span>
              )}
            </GlassCard>
          </Link>
        ))}
      </div>
      <div className="mt-6 text-center sm:hidden">
        <Link
          href="/clubs"
          className="font-button text-lg text-accent hover:underline decoration-2 underline-offset-4"
        >
          View all communities →
        </Link>
      </div>
    </section>
  );
}
