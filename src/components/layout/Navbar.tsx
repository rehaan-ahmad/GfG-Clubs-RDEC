'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'glass mx-4 mt-4 px-6 py-3 shadow-lg' : 'bg-transparent px-8 py-5'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="font-heading text-2xl font-bold text-accent">
          RDEC Portal
        </Link>
        <div className="hidden md:flex gap-8 items-center font-body text-text font-medium">
          <Link href="/clubs" className="hover:text-accent transition-colors">
            Clubs
          </Link>
          <Link href="/events" className="hover:text-accent transition-colors">
            Events
          </Link>
          <Link href="/deals" className="hover:text-accent transition-colors">
            Deals
          </Link>
          <Link href="/merch" className="hover:text-accent transition-colors">
            Merch
          </Link>
        </div>
        <div className="hidden md:flex gap-4 items-center">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="relative inline-flex h-8 w-14 items-center rounded-full bg-text/10 border border-text/10 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label="Toggle Dark Mode"
            >
              <span className="sr-only">Toggle Dark Mode</span>
              <span
                className={cn(
                  'inline-flex h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300 items-center justify-center',
                  theme === 'dark' ? 'translate-x-7 bg-[#0c2320]' : 'translate-x-1'
                )}
              >
                {theme === 'dark' ? (
                  <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </span>
            </button>
          )}
          <Link
            href="/login"
            className="font-button text-lg px-5 py-2 rounded-lg border border-accent text-accent hover:bg-accent hover:text-white transition-all"
          >
            Login
          </Link>
          <Link
            href="/student-id"
            className="font-button text-lg px-5 py-2 rounded-lg bg-accent text-white hover:bg-opacity-90 transition-all shadow-md"
          >
            Get ID
          </Link>
        </div>

        <button
          className="md:hidden text-accent focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-white/10 flex flex-col gap-4 font-body animate-in fade-in slide-in-from-top-2">
          <Link href="/clubs" className="text-text hover:text-accent p-2" onClick={() => setMobileMenuOpen(false)}>
            Clubs
          </Link>
          <Link href="/events" className="text-text hover:text-accent p-2" onClick={() => setMobileMenuOpen(false)}>
            Events
          </Link>
          <Link href="/deals" className="text-text hover:text-accent p-2" onClick={() => setMobileMenuOpen(false)}>
            Deals
          </Link>
          <Link href="/merch" className="text-text hover:text-accent p-2" onClick={() => setMobileMenuOpen(false)}>
            Merch
          </Link>
          {mounted && (
            <div className="flex items-center justify-between p-2">
              <span className="text-text font-medium">Switch Theme</span>
              <button
                onClick={() => {
                  setTheme(theme === 'dark' ? 'light' : 'dark');
                  setMobileMenuOpen(false);
                }}
                className="relative inline-flex h-8 w-14 items-center rounded-full bg-text/10 border border-text/10 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label="Toggle Dark Mode"
              >
                <span className="sr-only">Toggle Dark Mode</span>
                <span
                  className={cn(
                    'inline-flex h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300 items-center justify-center',
                    theme === 'dark' ? 'translate-x-7 bg-[#0c2320]' : 'translate-x-1'
                  )}
                >
                  {theme === 'dark' ? (
                    <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  ) : (
                    <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                </span>
              </button>
            </div>
          )}
          <div className="flex flex-col gap-2 mt-2">
            <Link href="/login" className="text-center font-button text-lg px-5 py-2 rounded-lg border border-accent text-accent" onClick={() => setMobileMenuOpen(false)}>
              Login
            </Link>
            <Link href="/student-id" className="text-center font-button text-lg px-5 py-2 rounded-lg bg-accent text-white" onClick={() => setMobileMenuOpen(false)}>
              Get ID
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
