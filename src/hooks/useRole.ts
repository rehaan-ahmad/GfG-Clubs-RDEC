'use client'

import { useEffect, useState } from 'react'

import { createClient } from '@/lib/supabase/client'
import { isAdmin as checkIsAdmin, isSuperAdmin as checkIsSuperAdmin } from '@/types'
import type { UserRole } from '@/types'

type ClubRoleMap = Record<string, string>

type UseRoleState = {
  role: UserRole
  isAdmin: boolean
  isSuperAdmin: boolean
  clubRoles: ClubRoleMap
  loading: boolean
}

export function useRole() {
  const [state, setState] = useState<UseRoleState>({
    role: 'student',
    isAdmin: false,
    isSuperAdmin: false,
    clubRoles: {},
    loading: true,
  })

  useEffect(() => {
    let cancelled = false
    const supabase = createClient()

    const loadRole = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user || cancelled) {
        setState({
          role: 'student',
          isAdmin: false,
          isSuperAdmin: false,
          clubRoles: {},
          loading: false,
        })
        return
      }

      const [{ data: profile }, { data: memberships }] = await Promise.all([
        supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .maybeSingle(),
        supabase
          .from('club_members')
          .select('club_id, role_title')
          .eq('profile_id', session.user.id)
          .eq('is_active', true),
      ])

      if (cancelled) {
        return
      }

      const role = (profile?.role as UserRole | undefined) ?? 'student'
      const clubRoles =
        memberships?.reduce<ClubRoleMap>((accumulator, membership) => {
          accumulator[membership.club_id as string] = membership.role_title as string
          return accumulator
        }, {}) ?? {}

      setState({
        role,
        isAdmin: checkIsAdmin(role),
        isSuperAdmin: checkIsSuperAdmin(role),
        clubRoles,
        loading: false,
      })
    }

    void loadRole()

    return () => {
      cancelled = true
    }
  }, [])

  return state
}
