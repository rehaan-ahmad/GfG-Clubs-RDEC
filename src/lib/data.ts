import { createClient } from '@/lib/supabase/server';
import type { Club, CampusEvent, ClubMember, Deal, Merch, Sponsor, SocialLink } from '@/types';

export async function getClubs(): Promise<Club[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('clubs')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) {
    console.error('Error fetching clubs:', error);
    return [];
  }
  return data || [];
}

export async function getClubBySlug(slug: string): Promise<Club | null> {
  const supabase = createClient();
  const { data, error } = await supabase.from('clubs').select('*').eq('slug', slug).single();

  if (error) {
    console.error(`Error fetching club by slug ${slug}:`, error);
    return null;
  }
  return data;
}

export async function getEvents(limit?: number): Promise<CampusEvent[]> {
  const supabase = createClient();
  let query = supabase
    .from('events')
    .select('*, club:clubs(*)')
    .order('start_at', { ascending: true });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }
  return data || [];
}

export async function getEventsByClub(clubId: string): Promise<CampusEvent[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('club_id', clubId)
    .order('start_at', { ascending: true });

  if (error) {
    console.error(`Error fetching events for club ${clubId}:`, error);
    return [];
  }
  return data || [];
}

export async function getClubTeam(clubId: string): Promise<ClubMember[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('club_members')
    .select('*, profile:profiles(*)')
    .eq('club_id', clubId)
    .order('role_rank', { ascending: true });

  if (error) {
    console.error(`Error fetching team for club ${clubId}:`, error);
    return [];
  }
  return data || [];
}

export async function getDeals(): Promise<Deal[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('deals')
    .select('*, club:clubs(*)')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching deals:', error);
    return [];
  }
  return data || [];
}

export async function getMerch(): Promise<Merch[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('merch')
    .select('*, club:clubs(*)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching merch:', error);
    return [];
  }
  return data || [];
}

export async function getSponsors(): Promise<Sponsor[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('sponsors')
    .select('*')
    .eq('is_active', true)
    .order('order_index', { ascending: true });

  if (error) {
    console.error('Error fetching sponsors:', error);
    return [];
  }
  return data || [];
}

export async function getSocialLinks(clubId?: string): Promise<SocialLink[]> {
  const supabase = createClient();
  let query = supabase.from('social_links').select('*').order('order_index', { ascending: true });

  if (clubId) {
    query = query.eq('club_id', clubId);
  } else {
    query = query.is('club_id', null);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching social links:', error);
    return [];
  }
  return data || [];
}

export async function getAllSocialLinks(): Promise<SocialLink[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('social_links')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) {
    console.error('Error fetching all social links:', error);
    return [];
  }
  return data || [];
}
