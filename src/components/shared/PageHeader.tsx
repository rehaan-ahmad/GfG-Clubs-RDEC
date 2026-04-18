interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

import Link from 'next/link';

export default function PageHeader({ eyebrow, title, subtitle, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="pt-28 pb-10 px-6 max-w-7xl mx-auto w-full">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-2 text-sm font-body text-text-muted mb-4">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span className="opacity-40">/</span>}
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-accent transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-text">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}
      {eyebrow && (
        <span className="text-accent uppercase font-bold tracking-[0.2em] text-xs mb-3 block">
          {eyebrow}
        </span>
      )}
      <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text mb-4">
        {title}
      </h1>
      {subtitle && <p className="font-body text-lg text-text-muted max-w-2xl">{subtitle}</p>}
    </div>
  );
}
