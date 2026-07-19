'use client';
// ============================================================
// Premium Petrol Radar — MapLegend Component
// ============================================================
import type { FuelFilterMode } from '@/lib/types';

interface MapLegendProps {
  filterMode: FuelFilterMode;
}

const LEGENDS: Record<FuelFilterMode, { label: string; color: string }[]> = {
  'ultra-premium': [
    { label: '100 RON (XP100)', color: '#a855f7' },
    { label: '100 RON (Power100)', color: '#c084fc' },
    { label: '99 RON (Power 99)', color: '#ef4444' },
  ],
  'high-octane': [
    { label: '97 RON (Speed 97)', color: '#f97316' },
    { label: '95 RON (XP95)', color: '#eab308' },
    { label: '95 RON (Power 95)', color: '#facc15' },
  ],
  standard: [
    { label: 'E20 Petrol', color: '#3b82f6' },
    { label: 'E10 Petrol', color: '#60a5fa' },
    { label: 'Regular', color: '#64748b' },
  ],
};

export default function MapLegend({ filterMode }: MapLegendProps) {
  const items = LEGENDS[filterMode];

  return (
    <div className="absolute bottom-5 right-5 bg-white/60 dark:bg-slate-900/40 backdrop-blur-2xl border border-slate-200 dark:border-white/20 p-3.5 rounded-2xl z-[400] text-xs space-y-2 shadow-2xl max-w-[200px]">
      <div className="font-bold text-slate-700 dark:text-slate-300 text-[11px] uppercase tracking-wider mb-1.5">
        Fuel Legend
      </div>
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2.5">
          <span
            className="w-3 h-3 rounded-full shrink-0 shadow-sm dark:shadow-lg"
            style={{
              backgroundColor: item.color,
              boxShadow: `0 0 8px ${item.color}66`,
            }}
          />
          <span className="text-slate-700 dark:text-slate-300 font-medium">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
