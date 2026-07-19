// ============================================================
// Premium Petrol Radar — Constants & Configuration
// ============================================================
import type { Brand, GradeName, FuelFilterMode } from './types';

// ── Map defaults ────────────────────────────────────────────
export const DEFAULT_CENTER: [number, number] = [22.5, 78.9]; // Central India
export const DEFAULT_ZOOM = 5;
export const TILE_URL =
  'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
export const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>';

// ── Octane-tier color palette ───────────────────────────────
export const GRADE_COLORS: Record<string, string> = {
  // Ultra Premium – 100 RON
  XP100:    '#a855f7', // purple-500
  Power100: '#c084fc', // purple-400
  // Ultra Premium – 99 RON
  Power99:  '#ef4444', // red-500
  // High Octane – 97 RON
  Speed97:  '#f97316', // orange-500
  // High Octane – 95 RON
  XP95:     '#eab308', // yellow-500
  Power95:  '#facc15', // yellow-400
  // Standard – E20 / E10
  E20:      '#3b82f6', // blue-500
  E10:      '#60a5fa', // blue-400
  Standard: '#64748b', // slate-500
};

export const FILTER_MODE_COLORS: Record<FuelFilterMode, string> = {
  standard:       '#3b82f6',
  'high-octane':  '#f97316',
  'ultra-premium': '#a855f7',
};

// ── Grade → Filter Mode mapping ─────────────────────────────
export const GRADE_TO_FILTER: Record<GradeName, FuelFilterMode> = {
  XP100:    'ultra-premium',
  Power100: 'ultra-premium',
  Power99:  'ultra-premium',
  Speed97:  'high-octane',
  XP95:     'high-octane',
  Power95:  'high-octane',
  E20:      'standard',
  E10:      'standard',
  Standard: 'standard',
};

// ── Grade metadata ──────────────────────────────────────────
export interface GradeInfo {
  name: GradeName;
  label: string;
  ron: number;
  typicalEthanol: number;
  brand: Brand;
  color: string;
  filterMode: FuelFilterMode;
}

export const GRADE_INFO: GradeInfo[] = [
  { name: 'XP100',    label: 'IOCL XP100',       ron: 100, typicalEthanol: 0,   brand: 'IndianOil', color: GRADE_COLORS.XP100,    filterMode: 'ultra-premium' },
  { name: 'Power100', label: 'HPCL Power100',     ron: 100, typicalEthanol: 4.5, brand: 'HPCL',      color: GRADE_COLORS.Power100, filterMode: 'ultra-premium' },
  { name: 'Power99',  label: 'HPCL Power 99',     ron: 99,  typicalEthanol: 11,  brand: 'HPCL',      color: GRADE_COLORS.Power99,  filterMode: 'ultra-premium' },
  { name: 'Speed97',  label: 'BPCL Speed 97',     ron: 97,  typicalEthanol: 12,  brand: 'BPCL',      color: GRADE_COLORS.Speed97,  filterMode: 'high-octane' },
  { name: 'XP95',     label: 'IOCL XP95',         ron: 95,  typicalEthanol: 12,  brand: 'IndianOil', color: GRADE_COLORS.XP95,     filterMode: 'high-octane' },
  { name: 'Power95',  label: 'HPCL Power 95',     ron: 95,  typicalEthanol: 12,  brand: 'HPCL',      color: GRADE_COLORS.Power95,  filterMode: 'high-octane' },
  { name: 'E20',      label: 'Standard E20',      ron: 87,  typicalEthanol: 20,  brand: 'Other',     color: GRADE_COLORS.E20,      filterMode: 'standard' },
  { name: 'E10',      label: 'Standard E10',      ron: 87,  typicalEthanol: 10,  brand: 'Other',     color: GRADE_COLORS.E10,      filterMode: 'standard' },
  { name: 'Standard', label: 'Regular Petrol',    ron: 87,  typicalEthanol: 15,  brand: 'Other',     color: GRADE_COLORS.Standard, filterMode: 'standard' },
];

// ── Brand logo colors ───────────────────────────────────────
export const BRAND_COLORS: Record<Brand, string> = {
  IndianOil: '#e74c3c',
  HPCL:      '#1a5276',
  BPCL:      '#f39c12',
  Shell:     '#dd1d21',
  Nayara:    '#00a651',
  Reliance:  '#003399',
  Other:     '#64748b',
};

// ── Filter toggle labels ────────────────────────────────────
export const FILTER_LABELS: Record<FuelFilterMode, { label: string; sublabel: string; icon: string }> = {
  standard: {
    label: 'Standard',
    sublabel: 'E20 / E10',
    icon: 'Fuel',
  },
  'high-octane': {
    label: 'High Octane',
    sublabel: 'XP95 / Speed 97',
    icon: 'Zap',
  },
  'ultra-premium': {
    label: 'Ultra Premium',
    sublabel: 'XP100 / Power 99',
    icon: 'Crown',
  },
};
