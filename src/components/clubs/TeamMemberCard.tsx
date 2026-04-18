import Image from 'next/image';
import GlassCard from '@/components/shared/GlassCard';
import type { ClubMember } from '@/types';

interface TeamMemberCardProps {
  member: ClubMember;
  isLeader?: boolean;
}

export default function TeamMemberCard({ member, isLeader = false }: TeamMemberCardProps) {
  const profile = member.profile;
  if (!profile) return null;

  return (
    <GlassCard
      className={`flex flex-col items-center text-center p-6 ${isLeader ? 'md:col-span-1 lg:p-10' : ''}`}
      hover
    >
      <div
        className={`rounded-full overflow-hidden mb-4 bg-accent/10 border-2 border-accent/20 flex items-center justify-center ${isLeader ? 'w-28 h-28' : 'w-20 h-20'}`}
      >
        {profile.avatar_url ? (
          <Image
            src={profile.avatar_url}
            alt={profile.full_name || 'Member'}
            width={isLeader ? 112 : 80}
            height={isLeader ? 112 : 80}
            className="w-full h-full object-cover"
          />
        ) : (
          <span
            className={`font-heading font-bold text-accent ${isLeader ? 'text-3xl' : 'text-xl'}`}
          >
            {(profile.full_name || '?').charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      <h3 className={`font-heading font-bold text-text mb-1 ${isLeader ? 'text-2xl' : 'text-lg'}`}>
        {profile.full_name || 'Unnamed'}
      </h3>
      {member.role_title && (
        <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wide mb-4">
          {member.role_title}
        </span>
      )}

      <div className="flex items-center gap-3 mt-auto pt-4">
        {profile.linkedin_url && (
          <a
            href={profile.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#0077b5]/30 text-[#0077b5] text-sm font-body font-semibold hover:bg-[#0077b5] hover:text-white transition-all"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
        )}
        {profile.resume_url && (
          <a
            href={profile.resume_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-accent/30 text-accent text-sm font-body font-semibold hover:bg-accent hover:text-white transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Resume
          </a>
        )}
      </div>
    </GlassCard>
  );
}
