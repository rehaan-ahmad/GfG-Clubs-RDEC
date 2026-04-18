'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/clubs', label: 'Clubs' },
  { href: '/events', label: 'Events' },
  { href: '/deals', label: 'Deals' },
  { href: '/merch', label: 'Merch' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/community', label: 'Community' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const pathname = usePathname();
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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'glass mx-4 mt-4 px-6 py-3 shadow-lg' : 'bg-transparent px-8 py-5'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center transition-transform group-hover:scale-105">
            <span className="font-heading text-sm font-bold text-accent">RD</span>
          </div>
          <div className="hidden sm:block">
            <div className="font-heading text-lg font-bold text-text leading-none">RDEC</div>
            <div className="text-[0.6rem] uppercase tracking-[0.12em] text-text-muted font-body">Student Bodies</div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex gap-1 items-center font-body">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'text-accent bg-accent/10'
                    : 'text-text-muted hover:text-text hover:bg-text/5'
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex gap-3 items-center">
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
            className="font-button text-base px-4 py-2 rounded-lg border border-accent text-accent hover:bg-accent hover:text-white transition-all"
          >
            Login
          </Link>
          <Link
            href="/student-id"
            className="font-button text-base px-4 py-2 rounded-lg bg-accent text-white hover:bg-opacity-90 transition-all shadow-md"
          >
            Get ID
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden text-accent focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-4 pt-4 border-t border-white/10 flex flex-col gap-1 font-body animate-in fade-in slide-in-from-top-2">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-3 rounded-lg text-sm font-medium transition-all',
                  isActive ? 'text-accent bg-accent/10' : 'text-text hover:text-accent hover:bg-text/5'
                )}
              >
                {link.label}
              </Link>
            );
          })}

          {mounted && (
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-text font-medium text-sm">Switch Theme</span>
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
            </div>
          )}

          <div className="flex flex-col gap-2 mt-2 px-4">
            <Link href="/login" className="text-center font-button text-base px-5 py-2.5 rounded-lg border border-accent text-accent">
              Login
            </Link>
            <Link href="/student-id" className="text-center font-button text-base px-5 py-2.5 rounded-lg bg-accent text-white">
              Get ID
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
