'use client';

import { useEffect, useRef, ReactNode } from 'react';
import anime from 'animejs';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  translateY?: number;
  stagger?: number;
}

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  translateY = 30,
  stagger = 100,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const targets = el.children.length > 1 ? el.children : el;
          anime({
            targets,
            translateY: [translateY, 0],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 800,
            delay: anime.stagger(stagger, { start: delay }),
          });
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, translateY, stagger]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
