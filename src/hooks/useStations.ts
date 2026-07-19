'use client';
// ============================================================
// Premium Petrol Radar — useStations Hook
// ============================================================
import { useState, useEffect, useMemo } from 'react';
import type { StationMarker, FuelFilterMode, Analytics } from '@/lib/types';
import { MOCK_STATIONS } from '@/lib/mock-data';
import { GRADE_TO_FILTER } from '@/lib/constants';

/**
 * Main data hook: provides filtered stations + analytics.
 * Falls back to mock data when Supabase is not configured.
 */
export function useStations(filterMode: FuelFilterMode) {
  const [allStations, setAllStations] = useState<StationMarker[]>([]);
  const [loading, setLoading] = useState(true);

  // ── Load data ──────────────────────────────────────────────
  useEffect(() => {
    // Use mock data (app works instantly out-of-the-box)
    setAllStations(MOCK_STATIONS);
    setLoading(false);
  }, []);

  // ── Filter by fuel toggle mode ─────────────────────────────
  const filteredStations = useMemo(() => {
    return allStations.filter(
      (s) => GRADE_TO_FILTER[s.gradeName] === filterMode
    );
  }, [allStations, filterMode]);

  // ── Compute analytics ──────────────────────────────────────
  const analytics: Analytics = useMemo(() => {
    const xp100 = allStations.filter(
      (s) => s.gradeName === 'XP100' || s.gradeName === 'Power100'
    );
    const power99 = allStations.filter((s) => s.gradeName === 'Power99');
    const speed97 = allStations.filter((s) => s.gradeName === 'Speed97');
    const xp95 = allStations.filter(
      (s) => s.gradeName === 'XP95' || s.gradeName === 'Power95'
    );
    const standard = allStations.filter(
      (s) =>
        s.gradeName === 'E20' ||
        s.gradeName === 'E10' ||
        s.gradeName === 'Standard'
    );

    const premiumPrices = [...xp100, ...power99].map((s) => s.pricePerLitre);
    const standardPrices = standard.map((s) => s.pricePerLitre);

    const avgPremium =
      premiumPrices.length > 0
        ? premiumPrices.reduce((a, b) => a + b, 0) / premiumPrices.length
        : 0;
    const avgStandard =
      standardPrices.length > 0
        ? standardPrices.reduce((a, b) => a + b, 0) / standardPrices.length
        : 0;

    // "Recently verified" = last 7 days + verified flag
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentlyVerified = allStations
      .filter(
        (s) => s.verified && new Date(s.lastVerified) >= sevenDaysAgo
      )
      .sort(
        (a, b) =>
          new Date(b.lastVerified).getTime() -
          new Date(a.lastVerified).getTime()
      )
      .slice(0, 8);

    return {
      totalStations: allStations.length,
      xp100Count: xp100.length,
      power99Count: power99.length,
      speed97Count: speed97.length,
      xp95Count: xp95.length,
      standardCount: standard.length,
      avgPriceStandard: Math.round(avgStandard * 100) / 100,
      avgPricePremium: Math.round(avgPremium * 100) / 100,
      priceDelta: Math.round((avgPremium - avgStandard) * 100) / 100,
      recentlyVerified,
    };
  }, [allStations]);

  // ── Add community-reported station ─────────────────────────
  const addStation = (station: StationMarker) => {
    setAllStations((prev) => [station, ...prev]);
  };

  return { allStations, filteredStations, analytics, loading, addStation };
}
