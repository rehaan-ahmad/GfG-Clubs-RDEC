import { clsx, type ClassValue } from 'clsx'
import { format, formatDistanceToNow, isPast } from 'date-fns'
import { twMerge } from 'tailwind-merge'

import type { SponsorTier } from '@/types'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const formatDate = (d: string) => format(new Date(d), 'dd MMM yyyy')
export const formatTime = (d: string) => format(new Date(d), 'hh:mm a')
export const timeFromNow = (d: string) =>
  formatDistanceToNow(new Date(d), { addSuffix: true })
export const isExpired = (d?: string) => (d ? isPast(new Date(d)) : false)

export const tierOrder: Record<SponsorTier, number> = {
  platinum: 1,
  gold: 2,
  silver: 3,
  bronze: 4,
  partner: 5,
}

export const clampText = (text: string, max: number) =>
  text.length > max ? `${text.slice(0, max)}…` : text
