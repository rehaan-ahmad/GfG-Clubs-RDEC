'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';
import GlassCard from '@/components/shared/GlassCard';

const features = [
  {
    title: 'One Portal',
    desc: 'All RDEC student bodies and clubs under a single unified dashboard.',
  },
  {
    title: 'Smart Attendance',
    desc: 'Geo-fenced attendance marking ensures you are actually at the venue.',
  },
  {
    title: 'Digital ID Cards',
    desc: 'Carry your verifiable club membership ID natively on your phone.',
  },
  {
    title: 'Student Deals',
    desc: 'Exclusive discounts and software deals compiled for RDEC students.',
  },
];

export default function FeaturesGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          anime({
            targets: '.feature-card',
            translateY: [40, 0],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 800,
            delay: anime.stagger(150),
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="py-16 max-w-7xl mx-auto px-6 w-full">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <span className="text-accent uppercase font-bold tracking-widest text-sm mb-2 block">
          Platform Capabilities
        </span>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-text mb-6">
          Why use the Portal?
        </h2>
        <p className="font-body text-text-muted text-lg">
          Designed specifically for RDEC, providing the core digital infrastructure for all aspects
          of campus life.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
        {features.map((f, i) => (
          <GlassCard key={i} className="feature-card opacity-0 p-8 md:p-10" hover={true}>
            <div className="w-14 h-14 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center mb-6 text-3xl shadow-sm">
              ✨
            </div>
            <h3 className="font-heading text-2xl font-bold text-text mb-3">{f.title}</h3>
            <p className="font-body text-text-muted leading-relaxed font-medium">{f.desc}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
