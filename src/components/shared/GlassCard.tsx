import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass p-6 relative overflow-hidden transition-all duration-300',
        hover && 'hover:-translate-y-1 hover:border-accent hover:shadow-xl',
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-[inherit]" />
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}
