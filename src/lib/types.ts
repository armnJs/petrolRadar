// ============================================================
// Premium Petrol Radar — Core Type Definitions
// ============================================================

/** The three filter positions on the hero fuel-toggle bar */
export type FuelFilterMode = 'standard' | 'high-octane' | 'ultra-premium';

/** Oil Marketing Company brands in India */
export type Brand = 'IndianOil' | 'HPCL' | 'BPCL' | 'Shell' | 'Nayara' | 'Reliance' | 'Other';

/** Fuel grade identifiers */
export type GradeName =
  | 'XP100'
  | 'Power100'
  | 'Power99'
  | 'Speed97'
  | 'XP95'
  | 'Power95'
  | 'E20'
  | 'E10'
  | 'Standard';

/** Availability status */
export type AvailabilityStatus =
  | 'Available'
  | 'Limited Stock'
  | 'Out of Stock'
  | 'Just Reported'
  | 'Unverified';

/** A single fuel grade offered at a station */
export interface FuelGrade {
  id: string;
  stationId: string;
  gradeName: GradeName;
  ronRating: number;
  ethanolPct: number;
  pricePerLitre: number;
  availabilityStatus: AvailabilityStatus;
  lastVerified: string; // ISO date
  verifiedBy?: string;
}

/** A fuel station with its location and available grades */
export interface FuelStation {
  id: string;
  name: string;
  brand: Brand;
  city: string;
  state: string;
  lat: number;
  lng: number;
  grades: FuelGrade[];
  createdAt: string;
  updatedAt: string;
}

/** Flattened station view used by the map markers and sidebar cards */
export interface StationMarker {
  id: string;
  name: string;
  brand: Brand;
  city: string;
  state: string;
  lat: number;
  lng: number;
  gradeName: GradeName;
  ronRating: number;
  ethanolPct: number;
  pricePerLitre: number;
  availabilityStatus: AvailabilityStatus;
  lastVerified: string;
  verified: boolean;
  queueWaitMins?: number;
}

/** Community-submitted fuel report */
export interface CommunityReport {
  id?: string;
  stationName: string;
  brand: Brand;
  gradeName: GradeName;
  ronRating: number;
  ethanolPct: number;
  pricePerLitre: number;
  city: string;
  lat?: number;
  lng?: number;
  queueWaitMins?: number;
  notes?: string;
  createdAt?: string;
}

/** Daily fuel price for a city/state */
export interface DailyPrice {
  id: string;
  state: string;
  city: string;
  petrolPrice: number;
  dieselPrice: number;
  date: string;
  source: string;
}

/** Summary analytics for the sidebar */
export interface Analytics {
  totalStations: number;
  xp100Count: number;
  power99Count: number;
  speed97Count: number;
  xp95Count: number;
  standardCount: number;
  avgPriceStandard: number;
  avgPricePremium: number;
  priceDelta: number;
  recentlyVerified: StationMarker[];
}
