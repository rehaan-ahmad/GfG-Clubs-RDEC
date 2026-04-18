'use client';

import { useState } from 'react';
import Link from 'next/link';
import GlassCard from '@/components/shared/GlassCard';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-heading text-4xl font-bold text-text mb-2">Welcome Back</h1>
          <p className="font-body text-text-muted">Sign in to the RDEC Student Bodies Portal</p>
        </div>

        <GlassCard hover={false} className="p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block font-body font-semibold text-text text-sm mb-1.5">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-bg-alt border border-text/10 font-body text-text focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                placeholder="you@rdec.edu.in"
              />
            </div>
            <div>
              <label className="block font-body font-semibold text-text text-sm mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-bg-alt border border-text/10 font-body text-text focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-accent text-white font-button text-lg font-semibold hover:bg-opacity-90 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </GlassCard>

        <p className="text-center mt-6 font-body text-sm text-text-muted">
          Don&apos;t have an account?{' '}
          <Link href="/student-id" className="text-accent hover:underline font-semibold">
            Apply for Student ID
          </Link>
        </p>
      </div>
    </div>
  );
}
