'use client';

import { useState } from 'react';
import GlassCard from '@/components/shared/GlassCard';
import type { Club } from '@/types';

type Step = 1 | 2 | 3;

interface StudentIDFormProps {
  clubs: Club[];
}

export default function StudentIDForm({ clubs }: StudentIDFormProps) {
  const [step, setStep] = useState<Step>(1);
  const [selectedClubId, setSelectedClubId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ fullName: '', rollNumber: '', gfgUsername: '' });
  const [submitted, setSubmitted] = useState(false);

  const selectedClub = clubs.find((c) => c.id === selectedClubId);
  const isGfG = selectedClub?.slug === 'gfg';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setStep(3);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 pb-24">
      <div className="flex items-center gap-3 mb-10">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-3 flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-body font-bold text-sm transition-all duration-300 ${
                step >= s
                  ? 'bg-accent text-white shadow-lg shadow-accent/20'
                  : 'glass text-text-muted'
              }`}
            >
              {step > s ? '✓' : s}
            </div>
            {s < 3 && (
              <div
                className={`flex-1 h-0.5 rounded-full transition-all duration-500 ${
                  step > s ? 'bg-accent' : 'bg-text/10'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div>
          <h2 className="font-heading text-2xl font-bold text-text mb-6">Select a Club to Join</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {clubs
              .filter((c) => c.status === 'established')
              .map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedClubId(c.id);
                    setStep(2);
                  }}
                  className="text-left outline-none"
                >
                  <GlassCard
                    className={`p-5 flex items-center gap-4 group cursor-pointer transition-all ${
                      selectedClubId === c.id ? 'border-accent ring-2 ring-accent/20' : ''
                    }`}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex-shrink-0"
                      style={{ backgroundColor: c.color }}
                    />
                    <div>
                      <h3 className="font-body font-bold text-text group-hover:text-accent transition-colors">
                        {c.name}
                      </h3>
                      {c.tagline && (
                        <p className="font-body text-xs text-text-muted">{c.tagline}</p>
                      )}
                    </div>
                  </GlassCard>
                </button>
              ))}
          </div>
        </div>
      )}

      {step === 2 && selectedClub && (
        <div>
          <button
            onClick={() => setStep(1)}
            className="font-body text-sm text-accent mb-6 hover:underline"
          >
            ← Change club
          </button>
          <GlassCard hover={false} className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: selectedClub.color }}
              />
              <h2 className="font-heading text-xl font-bold text-text">
                Apply to {selectedClub.name}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-body font-semibold text-text text-sm mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-bg-alt border border-text/10 font-body text-text focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block font-body font-semibold text-text text-sm mb-1.5">
                  Roll Number
                </label>
                <input
                  type="text"
                  required
                  value={formData.rollNumber}
                  onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-bg-alt border border-text/10 font-body text-text focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                  placeholder="e.g. 2201001"
                />
              </div>
              {isGfG && (
                <div>
                  <label className="block font-body font-semibold text-text text-sm mb-1.5">
                    GfG Username
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.gfgUsername}
                    onChange={(e) => setFormData({ ...formData, gfgUsername: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-bg-alt border border-text/10 font-body text-text focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                    placeholder="Your GeeksforGeeks username"
                  />
                </div>
              )}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-accent text-white font-button text-lg font-semibold hover:bg-opacity-90 transition-all shadow-md mt-4"
              >
                Submit Application
              </button>
            </form>
          </GlassCard>
        </div>
      )}

      {step === 3 && submitted && (
        <div className="text-center">
          <GlassCard hover={false} className="p-12">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="font-heading text-3xl font-bold text-text mb-4">
              Application Submitted!
            </h2>
            <p className="font-body text-text-muted mb-2">
              Your membership application for{' '}
              <strong className="text-accent">{selectedClub?.name}</strong> has been received.
            </p>
            <p className="font-body text-text-muted mb-8">
              The club President will review and approve your application. You&apos;ll receive an
              email once your digital ID card is ready.
            </p>
            <div className="inline-block px-6 py-3 rounded-full bg-accent/10 text-accent font-body font-semibold">
              Status: Pending Review
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
