export const RDEC_HOSTING_STACK = {
  frontend: 'Vercel',
  database: 'Supabase',
  email: 'Resend',
  edge: 'Cloudflare',
} as const

export const RDEC_SUPABASE_PROJECT = {
  name: 'clubs-portal',
  url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://your-project.supabase.co',
} as const

export const RDEC_CLUBS = [
  {
    slug: 'gfg',
    name: 'GfG Student Community',
    color: '#2F8D46',
    status: 'established',
  },
  {
    slug: 'nexora',
    name: 'Nexora - Tech Club',
    color: '#5E7287',
    status: 'established',
  },
  {
    slug: 'mehfil',
    name: 'Mehfil - Cultural Club',
    color: '#8B3A62',
    status: 'established',
  },
  {
    slug: 'spotlight',
    name: 'Spotlight - Campus Connect',
    color: '#CC7A00',
    status: 'established',
  },
  {
    slug: 'velocity',
    name: 'Velocity - Sports & E-Sports',
    color: '#1A5CA8',
    status: 'established',
  },
  {
    slug: 'sukham',
    name: 'Sukham - Wellness Club',
    color: '#2E7D5A',
    status: 'established',
  },
  {
    slug: 'hottake',
    name: 'HotTake - Debates',
    color: '#A83232',
    status: 'established',
  },
  {
    slug: 'ieee',
    name: 'IEEE Student Body',
    color: '#00629B',
    status: 'coming-soon',
  },
  {
    slug: 'placement',
    name: 'Student Placement Cell',
    color: '#4A4A8A',
    status: 'established',
  },
] as const

export const DEFAULT_GEOFENCE = {
  lat: Number(process.env.NEXT_PUBLIC_GEOFENCE_LAT ?? '28.6890'),
  lng: Number(process.env.NEXT_PUBLIC_GEOFENCE_LNG ?? '77.4538'),
} as const

export const SITE_CONFIG = {
  name: 'RDEC Student Bodies Portal',
  description:
    'Student portal for RDEC clubs, events, attendance, IDs, deals, merch, and campus community.',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
} as const
