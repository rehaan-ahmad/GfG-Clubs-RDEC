'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import anime from 'animejs';

export default function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (headingRef.current) {
      const text = headingRef.current.innerText;
      headingRef.current.innerHTML = text
        .split('')
        .map(
          (char) =>
            `<span class="inline-block opacity-0 translate-y-4 filter blur-sm">${char === ' ' ? '&nbsp;' : char}</span>`
        )
        .join('');

      anime({
        targets: headingRef.current.querySelectorAll('span'),
        translateY: [16, 0],
        opacity: [0, 1],
        filter: ['blur(4px)', 'blur(0px)'],
        easing: 'easeOutExpo',
        duration: 1200,
        delay: anime.stagger(30, { start: 300 }),
      });
    }

    anime({
      targets: '.hero-cta',
      translateY: [20, 0],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 1200,
      delay: 1200,
    });
  }, []);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[30vw] h-[30vw] bg-accent-soft/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <span className="hero-cta opacity-0 inline-block py-1 px-3 rounded-full border border-accent/30 bg-accent/5 text-accent text-sm font-body mb-6 uppercase tracking-wider font-semibold">
          RDEC Student Bodies Portal
        </span>

        <h1
          ref={headingRef}
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-text leading-tight mb-8"
        >
          Discover Your Campus Community
        </h1>

        <p className="hero-cta opacity-0 text-lg md:text-xl text-text-muted font-body max-w-2xl mx-auto mb-12 text-balance">
          Join clubs, track attendance, and stay updated with the latest events happening at RDEC.
        </p>

        <div className="hero-cta opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/clubs"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-text text-bg font-button text-xl font-semibold hover:scale-[1.03] transition-transform duration-300 shadow-xl"
          >
            Explore Clubs
          </Link>
          <Link
            href="/events"
            className="w-full sm:w-auto px-8 py-4 rounded-xl glass border border-text/10 text-text font-button text-xl font-semibold hover:border-accent transition-all duration-300"
          >
            View Events
          </Link>
        </div>
      </div>
    </section>
  );
}
