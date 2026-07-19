'use client';
// ============================================================
// Premium Petrol Radar — FuelToggle (Core Feature)
// A sleek 3-position segmented control that filters the map
// ============================================================
import type { FuelFilterMode } from '@/lib/types';

interface FuelToggleProps {
  activeMode: FuelFilterMode;
  onChange: (mode: FuelFilterMode) => void;
  className?: string;
}

const MODES: { key: FuelFilterMode; label: string; sub: string }[] = [
  {
    key: 'standard',
    label: 'Standard',
    sub: 'E20 / E10',
  },
  {
    key: 'high-octane',
    label: 'High Octane',
    sub: 'XP95 / Speed 97',
  },
  {
    key: 'ultra-premium',
    label: 'Ultra Premium',
    sub: 'XP100 / Power 99',
  },
];

export default function FuelToggle({ activeMode, onChange, className = '' }: FuelToggleProps) {
  const activeIdx = MODES.findIndex((m) => m.key === activeMode);

  return (
    <div className={`relative flex items-stretch bg-slate-200/50 dark:bg-slate-900/30 backdrop-blur-2xl border border-slate-300 dark:border-white/20 rounded-2xl p-1 shadow-inner dark:shadow-2xl overflow-hidden transition-colors ${className}`}>
      {/* Sliding Indicator */}
        <div
          className={`absolute top-1 bottom-1 rounded-xl bg-white dark:bg-white/15 shadow-sm transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]`}
          style={{
            width: `calc(${100 / 3}% - 2px)`,
            left: `calc(${(activeIdx * 100) / 3}% + 1px)`,
          }}
        />

        {MODES.map((mode) => {
          const isActive = mode.key === activeMode;
          return (
            <button
              key={mode.key}
              onClick={() => onChange(mode.key)}
              className={`
                relative z-10 flex-1 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5
                py-1.5 px-2 rounded-xl
                transition-all duration-300 cursor-pointer
                ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}
              `}
            >
              <div className="text-center sm:text-left">
                <div className={`text-xs sm:text-sm font-bold leading-tight ${isActive ? 'text-slate-900 dark:text-white' : ''}`}>
                  {mode.label}
                </div>
                <div className={`text-[9px] sm:text-[10px] font-medium leading-tight ${isActive ? 'text-slate-600 dark:text-white/70' : 'text-slate-400 dark:text-slate-500'}`}>
                  {mode.sub}
                </div>
              </div>
            </button>
          );
        })}
        })}
    </div>
  );
}
