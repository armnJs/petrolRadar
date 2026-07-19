'use client';
// ============================================================
// Premium Petrol Radar — useGeolocation Hook
// ============================================================
import { useState, useEffect } from 'react';
import { DEFAULT_CENTER } from '@/lib/constants';

interface GeolocationState {
  lat: number;
  lng: number;
  loading: boolean;
  error: string | null;
  permissionGranted: boolean;
}

/**
 * Custom hook that wraps the HTML5 Geolocation API.
 * Falls back to central India coordinates if denied or unavailable.
 */
export function useGeolocation(): GeolocationState {
  const [state, setState] = useState<GeolocationState>({
    lat: DEFAULT_CENTER[0],
    lng: DEFAULT_CENTER[1],
    loading: true,
    error: null,
    permissionGranted: false,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState((s) => ({
        ...s,
        loading: false,
        error: 'Geolocation is not supported by your browser.',
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          loading: false,
          error: null,
          permissionGranted: true,
        });
      },
      (err) => {
        setState((s) => ({
          ...s,
          loading: false,
          error: err.message,
          permissionGranted: false,
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 300_000, // 5 min cache
      }
    );
  }, []);

  return state;
}
