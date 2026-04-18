'use client';

import { useState } from 'react';
import Link from 'next/link';
import AnimatedSection from '@/components/shared/AnimatedSection';
import GlassCard from '@/components/shared/GlassCard';
import type { Club, CampusEvent, SocialLink, ClubMember } from '@/types';

type Tab = 'overview' | 'events' | 'social';

const platformIcon: Record<string, string> = {
  Instagram: '📸',
  LinkedIn: '💼',
  WhatsApp: '💬',
  GitHub: '🐙',
  YouTube: '🎬',
  Twitter: '🐦',
};

interface ClubDetailTabsProps {
  club: Club;
  events: CampusEvent[];
  socialLinks: SocialLink[];
  members: ClubMember[];
}

export default function ClubDetailTabs({
  club,
  events,
  socialLinks,
  members,
}: ClubDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const tabs: { key: Tab; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'events', label: `Events (${events.length})` },
    { key: 'social', label: 'Social Links' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 pb-24">
      <div className="flex gap-1 mb-10 border-b border-text/10 overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-3 font-body font-semibold text-sm transition-all duration-300 whitespace-nowrap border-b-2 -mb-px ${
              activeTab === tab.key
                ? 'border-accent text-accent'
                : 'border-transparent text-text-muted hover:text-text'
            }`}
          >
            {tab.label}
          </button>
        ))}
        <Link
          href={`/clubs/${club.slug}/team`}
          className="px-6 py-3 font-body font-semibold text-sm text-text-muted hover:text-text transition-all border-b-2 border-transparent -mb-px whitespace-nowrap"
        >
          Team ({members.length})
        </Link>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-10">
          <AnimatedSection className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <GlassCard hover={false} className="text-center py-6">
              <div className="font-heading text-3xl font-bold text-accent">{members.length}</div>
              <div className="font-body text-sm text-text-muted mt-1">Members</div>
            </GlassCard>
            <GlassCard hover={false} className="text-center py-6">
              <div className="font-heading text-3xl font-bold text-accent">{events.length}</div>
              <div className="font-body text-sm text-text-muted mt-1">Events</div>
            </GlassCard>
            <GlassCard hover={false} className="text-center py-6">
              <div className="font-heading text-3xl font-bold text-accent">
                {socialLinks.length}
              </div>
              <div className="font-body text-sm text-text-muted mt-1">Social Channels</div>
            </GlassCard>
            <GlassCard hover={false} className="text-center py-6">
              <div className="font-heading text-3xl font-bold" style={{ color: club.color }}>
                ●
              </div>
              <div className="font-body text-sm text-text-muted mt-1 capitalize">{club.status}</div>
            </GlassCard>
          </AnimatedSection>

          {events.length > 0 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-text mb-6">Upcoming Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.slice(0, 2).map((evt) => (
                  <GlassCard key={evt.id} className="p-6">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-3 ${
                        evt.status === 'ongoing'
                          ? 'bg-red-500/20 text-red-500'
                          : 'bg-accent/20 text-accent'
                      }`}
                    >
                      {evt.status}
                    </span>
                    <h3 className="font-heading text-xl font-bold text-text mb-2">{evt.title}</h3>
                    <p className="font-body text-sm text-text-muted line-clamp-2">
                      {evt.description}
                    </p>
                    {evt.venue && (
                      <p className="font-body text-sm text-text-muted mt-3">📍 {evt.venue}</p>
                    )}
                  </GlassCard>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'events' && (
        <div>
          {events.length > 0 ? (
            <AnimatedSection
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              stagger={80}
            >
              {events.map((evt) => (
                <GlassCard key={evt.id} className="p-6 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                        evt.status === 'ongoing'
                          ? 'bg-red-500/20 text-red-500'
                          : 'bg-accent/20 text-accent'
                      }`}
                    >
                      {evt.status}
                    </span>
                    {evt.event_type && (
                      <span className="text-xs font-body text-text-muted">{evt.event_type}</span>
                    )}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-text mb-2">{evt.title}</h3>
                  <p className="font-body text-sm text-text-muted line-clamp-3 mb-4">
                    {evt.description}
                  </p>
                  <div className="mt-auto pt-4 border-t border-text/10 text-sm text-text-muted font-body">
                    {evt.venue && <p>📍 {evt.venue}</p>}
                    {evt.start_at && (
                      <p className="mt-1">
                        📅{' '}
                        {new Date(evt.start_at).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    )}
                  </div>
                </GlassCard>
              ))}
            </AnimatedSection>
          ) : (
            <div className="text-center py-16 text-text-muted font-body text-lg">
              No events scheduled yet for {club.name}.
            </div>
          )}
        </div>
      )}

      {activeTab === 'social' && (
        <div>
          {socialLinks.length > 0 ? (
            <AnimatedSection
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
              stagger={80}
            >
              {socialLinks.map((link) => (
                <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer">
                  <GlassCard className="p-6 flex items-center gap-4 group">
                    <span className="text-3xl">{platformIcon[link.platform] || '🔗'}</span>
                    <div>
                      <h3 className="font-body font-bold text-text group-hover:text-accent transition-colors">
                        {link.platform}
                      </h3>
                      {link.label && (
                        <p className="font-body text-sm text-text-muted">@{link.label}</p>
                      )}
                    </div>
                  </GlassCard>
                </a>
              ))}
            </AnimatedSection>
          ) : (
            <div className="text-center py-16 text-text-muted font-body text-lg">
              No social links added yet for {club.name}.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
