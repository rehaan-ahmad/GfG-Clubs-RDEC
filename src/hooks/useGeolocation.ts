'use client'

import { useCallback, useState } from 'react'

type GeolocationState = {
  lat: number | null
  lng: number | null
  error: string | null
  loading: boolean
}

const GEOLOCATION_ERRORS: Record<number, string> = {
  1: 'Permission denied. Please allow location access and try again.',
  2: 'Position unavailable. Try again in a better signal area.',
  3: 'Location request timed out. Please retry.',
}

export function useGeolocation() {
  const [{ lat, lng, error, loading }, setState] = useState<GeolocationState>({
    lat: null,
    lng: null,
    error: null,
    loading: false,
  })

  const request = useCallback(() => {
    if (!navigator.geolocation) {
      setState({
        lat: null,
        lng: null,
        error: 'Geolocation is not supported by this browser.',
        loading: false,
      })
      return
    }

    setState((current) => ({ ...current, loading: true, error: null }))

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          error: null,
          loading: false,
        })
      },
      (positionError) => {
        setState({
          lat: null,
          lng: null,
          error:
            GEOLOCATION_ERRORS[positionError.code] ??
            'Unable to fetch your location.',
          loading: false,
        })
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    )
  }, [])

  return { lat, lng, error, loading, request }
}
