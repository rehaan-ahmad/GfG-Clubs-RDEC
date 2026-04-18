import Link from 'next/link';
import GlassCard from '@/components/shared/GlassCard';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <GlassCard hover={false} className="text-center p-12 max-w-md">
        <div className="text-7xl mb-6 opacity-60">🔍</div>
        <h1 className="font-heading text-5xl font-bold text-text mb-4">404</h1>
        <p className="font-body text-lg text-text-muted mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 rounded-xl bg-accent text-white font-button text-lg font-semibold hover:bg-opacity-90 transition-all shadow-md"
        >
          Go Home
        </Link>
      </GlassCard>
    </div>
  );
}
