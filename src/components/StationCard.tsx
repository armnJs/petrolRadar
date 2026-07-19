'use client';
// ============================================================
// Premium Petrol Radar — StationCard Component
// ============================================================
import type { StationMarker } from '@/lib/types';
import { GRADE_COLORS, BRAND_COLORS } from '@/lib/constants';

interface StationCardProps {
  station: StationMarker;
  onClick: () => void;
  isActive?: boolean;
}

export default function StationCard({ station, onClick, isActive }: StationCardProps) {
  const gradeColor = GRADE_COLORS[station.gradeName] || '#64748b';
  const brandColor = BRAND_COLORS[station.brand] || '#64748b';

  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left bg-white/60 dark:bg-slate-900/40 backdrop-blur-md border rounded-xl p-3.5 cursor-pointer
        transition-all duration-300 group hover:scale-[1.01] shadow-sm
        ${isActive
          ? 'border-amber-500/60 bg-amber-50 dark:bg-amber-500/10 shadow-md shadow-amber-500/10'
          : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-50 dark:hover:bg-slate-800/50'
        }
      `}
    >
      {/* Top Row: Grade badge + Price */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="text-[10px] font-extrabold px-2 py-0.5 rounded-md text-white uppercase tracking-wide shrink-0"
              style={{ backgroundColor: gradeColor }}
            >
              {station.gradeName}
            </span>
            <span
              className="text-[9px] font-bold px-1.5 py-0.5 rounded text-white shrink-0"
              style={{ backgroundColor: brandColor }}
            >
              {station.brand}
            </span>
          </div>
          <h4 className="font-bold text-sm leading-snug text-slate-800 dark:text-slate-100 group-hover:text-slate-900 dark:group-hover:text-white transition-colors truncate">
            {station.name}
          </h4>
          <div className="flex items-center gap-1 mt-0.5">
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{station.city}, {station.state}</p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-base font-bold text-slate-900 dark:text-slate-200">₹{station.pricePerLitre.toFixed(2)}</div>
          <div className="text-[10px] text-slate-500 font-medium">{station.ronRating} RON</div>
        </div>
      </div>

      {/* Bottom Row: Ethanol + Status */}
      <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700/40 flex items-center justify-between text-xs">
        <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          Ethanol: <strong className="text-slate-800 dark:text-slate-200">~{station.ethanolPct}%</strong>
        </span>
        <span className="flex items-center gap-1">
          <span className="font-semibold text-[11px] text-slate-600 dark:text-slate-300">
            {station.availabilityStatus} {station.verified ? '(Verified)' : ''}
          </span>
        </span>
      </div>
    </button>
  );
}
