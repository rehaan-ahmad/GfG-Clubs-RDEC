import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { Club } from '@/types';

interface ClubBadgeProps {
  club: Club;
  size?: 'sm' | 'md';
  linked?: boolean;
  className?: string;
}

export default function ClubBadge({ club, size = 'sm', linked = false, className }: ClubBadgeProps) {
  const content = (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-body font-semibold',
        size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm',
        className
      )}
      style={{
        backgroundColor: `${club.color || '#5E7287'}15`,
        color: club.color || '#5E7287',
      }}
    >
      <span
        className={cn('rounded-full', size === 'sm' ? 'w-2 h-2' : 'w-2.5 h-2.5')}
        style={{ backgroundColor: club.color || '#5E7287' }}
      />
      {club.name.split(' — ')[0].split(' - ')[0]}
    </span>
  );

  if (linked) {
    return (
      <Link href={`/clubs/${club.slug}`} className="hover:opacity-80 transition-opacity">
        {content}
      </Link>
    );
  }

  return content;
}
