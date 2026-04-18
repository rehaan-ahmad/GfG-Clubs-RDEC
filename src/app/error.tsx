'use client';

import GlassCard from '@/components/shared/GlassCard';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <GlassCard hover={false} className="text-center p-12 max-w-md">
        <div className="text-7xl mb-6 opacity-60">⚠️</div>
        <h1 className="font-heading text-4xl font-bold text-text mb-4">Something Went Wrong</h1>
        <p className="font-body text-text-muted mb-8">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <button
          onClick={reset}
          className="inline-block px-8 py-3 rounded-xl bg-accent text-white font-button text-lg font-semibold hover:bg-opacity-90 transition-all shadow-md"
        >
          Try Again
        </button>
      </GlassCard>
    </div>
  );
}
