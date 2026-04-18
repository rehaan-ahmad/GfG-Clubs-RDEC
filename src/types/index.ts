export type ClubStatus = 'established' | 'coming-soon'
export type EventStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
export type AppStatus = 'pending' | 'approved' | 'rejected'
export type SponsorTier = 'platinum' | 'gold' | 'silver' | 'bronze' | 'partner'
export type UserRole = 'student' | 'club-admin' | 'faculty' | 'super-admin'
export type Platform =
  | 'Instagram'
  | 'LinkedIn'
  | 'WhatsApp'
  | 'GitHub'
  | 'YouTube'
  | 'Twitter'
  | 'Discord'

export interface Club {
  id: string
  slug: string
  name: string
  tagline?: string
  description?: string
  color: string
  logo_url?: string
  status: ClubStatus
  order_index: number
  created_at: string
}

export interface Profile {
  id: string
  full_name?: string
  roll_number?: string
  email?: string
  avatar_url?: string
  linkedin_url?: string
  resume_url?: string
  gfg_username?: string
  role: UserRole
  created_at: string
}

export interface ClubMember {
  id: string
  club_id: string
  profile_id: string
  role_title: string
  role_rank: number
  is_active: boolean
  joined_at?: string
  profile?: Profile
  club?: Club
}

export interface Event {
  id: string
  club_id: string
  title: string
  description?: string
  event_type?: string
  status: EventStatus
  venue?: string
  lat?: number
  lng?: number
  geofence_radius: number
  start_at?: string
  end_at?: string
  reg_link?: string
  cover_url?: string
  created_by: string
  created_at: string
  club?: Club
}

export interface AttendanceSession {
  id: string
  event_id?: string
  club_id: string
  venue_name?: string
  lat: number
  lng: number
  radius_m: number
  open: boolean
  created_by: string
  created_at: string
  closed_at?: string
  event?: Event
  club?: Club
}

export interface AttendanceRecord {
  id: string
  session_id: string
  profile_id: string
  marked_at: string
  user_lat?: number
  user_lng?: number
  distance_m?: number
  verified: boolean
  profile?: Profile
}

export interface StudentIDApplication {
  id: string
  club_id: string
  applicant_id: string
  full_name: string
  roll_number: string
  extra_field?: string
  status: AppStatus
  reviewed_by?: string
  reviewed_at?: string
  id_card_url?: string
  created_at: string
  club?: Club
  profile?: Profile
}

export interface Deal {
  id: string
  club_id?: string
  title: string
  provider?: string
  description?: string
  coupon_code?: string
  discount_pct?: number
  link?: string
  expires_at?: string
  is_active: boolean
  cover_url?: string
  created_at: string
  club?: Club
}

export interface Merch {
  id: string
  club_id: string
  name: string
  description?: string
  price_inr?: number
  image_url?: string
  order_link?: string
  available: boolean
  created_at: string
  club?: Club
}

export interface Sponsor {
  id: string
  name: string
  logo_url?: string
  website_url?: string
  tier: SponsorTier
  description?: string
  is_active: boolean
  order_index: number
  created_at: string
}

export interface SocialLink {
  id: string
  club_id?: string
  platform: Platform
  url: string
  label?: string
  order_index: number
  club?: Club
}

export const isAdmin = (role: UserRole) => role !== 'student'
export const isSuperAdmin = (role: UserRole) => role === 'super-admin'
