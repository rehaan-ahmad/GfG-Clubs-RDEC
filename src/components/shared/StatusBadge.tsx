import { cn } from '@/lib/utils';

type StatusType = 'upcoming' | 'ongoing' | 'completed' | 'cancelled' | 'pending' | 'approved' | 'rejected' | 'established' | 'coming-soon';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { bg: string; text: string; label: string }> = {
  upcoming: { bg: 'bg-blue-500/15', text: 'text-blue-500', label: 'Upcoming' },
  ongoing: { bg: 'bg-red-500/15', text: 'text-red-500', label: 'Live' },
  completed: { bg: 'bg-green-500/15', text: 'text-green-600', label: 'Completed' },
  cancelled: { bg: 'bg-gray-500/15', text: 'text-gray-500', label: 'Cancelled' },
  pending: { bg: 'bg-amber-500/15', text: 'text-amber-600', label: 'Pending' },
  approved: { bg: 'bg-green-500/15', text: 'text-green-600', label: 'Approved' },
  rejected: { bg: 'bg-red-500/15', text: 'text-red-500', label: 'Rejected' },
  established: { bg: 'bg-green-500/15', text: 'text-green-600', label: 'Active' },
  'coming-soon': { bg: 'bg-gray-500/15', text: 'text-gray-500', label: 'Coming Soon' },
};

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.upcoming;

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide',
        config.bg,
        config.text,
        status === 'ongoing' && 'animate-pulse',
        className
      )}
    >
      {config.label}
    </span>
  );
}
