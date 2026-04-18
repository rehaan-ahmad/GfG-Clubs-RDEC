'use client';

import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import GlassCard from '@/components/shared/GlassCard';

interface Stat {
  label: string;
  value: number;
  suffix: string;
}

const stats: Stat[] = [
  { label: 'Active Members', value: 950, suffix: '+' },
  { label: 'Events Hosted', value: 100, suffix: '+' },
  { label: 'Student Bodies', value: 9, suffix: '' },
];

export default function StatsRow() {
  const rowRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          anime({
            targets: '.stat-card',
            translateY: [40, 0],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 1000,
            delay: anime.stagger(150),
          });

          const DOMNodes = document.querySelectorAll('.stat-number');
          DOMNodes.forEach((node, index) => {
            const targetObj = { count: 0 };
            anime({
              targets: targetObj,
              count: stats[index].value,
              round: 1,
              easing: 'easeOutExpo',
              duration: 2000,
              delay: index * 150,
              update: function () {
                if (node) {
                  node.innerHTML = targetObj.count + stats[index].suffix;
                }
              },
            });
          });
        }
      },
      { threshold: 0.2 }
    );

    if (rowRef.current) {
      observer.observe(rowRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={rowRef} className="max-w-6xl mx-auto px-6 w-full -mt-16 z-20 relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <GlassCard
            key={idx}
            className="stat-card opacity-0 flex flex-col items-center justify-center py-10"
            hover={false}
          >
            <h3 className="stat-number font-heading text-6xl font-bold text-accent mb-2">
              0{stat.suffix}
            </h3>
            <p className="font-body text-text-muted text-lg font-medium tracking-wide uppercase">
              {stat.label}
            </p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
