import Link from 'next/link';
import { RDEC_CLUBS } from '@/lib/constants/site';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/clubs', label: 'Clubs' },
  { href: '/deals', label: 'Deals' },
  { href: '/merch', label: 'Merch' },
  { href: '/sponsors', label: 'Sponsors' },
];

const ACCOUNT_LINKS = [
  { href: '/student-id', label: 'Student ID' },
  { href: '/community', label: 'Community' },
  { href: '/login', label: 'Admin Login' },
  { href: '/about', label: 'About RDEC' },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-text/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                <span className="font-heading text-sm font-bold text-accent">RD</span>
              </div>
              <div>
                <div className="font-heading text-lg font-bold text-text leading-none">RDEC</div>
                <div className="text-[0.6rem] uppercase tracking-[0.12em] text-text-muted font-body">Student Bodies</div>
              </div>
            </div>
            <p className="font-body text-sm text-text-muted leading-relaxed mb-6">
              Official portal for RDEC student clubs and organizations. Events, attendance, ID cards, and more.
            </p>
            <a
              href="https://rdec.edu.in"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-text/10 text-text-muted text-xs font-body font-medium hover:border-accent hover:text-accent transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              rdec.edu.in
            </a>
          </div>

          {/* Navigate Column */}
          <div>
            <h4 className="font-body font-bold text-text text-sm uppercase tracking-wider mb-5">Navigate</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-body text-sm text-text-muted hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Communities Column */}
          <div>
            <h4 className="font-body font-bold text-text text-sm uppercase tracking-wider mb-5">Communities</h4>
            <ul className="space-y-3">
              {RDEC_CLUBS.filter(c => c.status === 'established').slice(0, 7).map((club) => (
                <li key={club.slug}>
                  <Link href={`/clubs/${club.slug}`} className="font-body text-sm text-text-muted hover:text-accent transition-colors flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: club.color }} />
                    {club.name.split(' — ')[0].split(' - ')[0]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Column */}
          <div>
            <h4 className="font-body font-bold text-text text-sm uppercase tracking-wider mb-5">Account</h4>
            <ul className="space-y-3">
              {ACCOUNT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-body text-sm text-text-muted hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-text/5">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-body tracking-wider text-text-muted">
            &copy; {new Date().getFullYear()} RDEC Student Bodies Portal. All rights reserved.
          </p>
          <p className="text-xs font-body text-text-muted/50">
            v0.1.0
          </p>
        </div>
      </div>
    </footer>
  );
}
