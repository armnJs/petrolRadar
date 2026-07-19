'use client';
// ============================================================
// Premium Petrol Radar — StatsPanel Component
// ============================================================
import type { Analytics } from '@/lib/types';

interface StatsPanelProps {
  analytics: Analytics;
}

export default function StatsPanel({ analytics }: StatsPanelProps) {
  const stats = [
    {
      label: 'Total Tracked',
      value: analytics.totalStations,
    },
    {
      label: 'XP100 / Power100',
      value: analytics.xp100Count,
    },
    {
      label: 'Power 99',
      value: analytics.power99Count,
    },
    {
      label: 'Speed 97 / XP95',
      value: analytics.speed97Count + analytics.xp95Count,
    },
    {
      label: 'Standard E20/E10',
      value: analytics.standardCount,
    },
  ];

  return (
    <div className="space-y-3">
      {/* Stat Cards Grid */}
      <div className="grid grid-cols-2 gap-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-slate-50/80 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-xl p-3 transition-all hover:scale-[1.02] shadow-sm"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
            <div className="text-xl font-bold text-slate-900 dark:text-slate-200">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Price Delta Card */}
      <div className="bg-slate-50/80 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-white/20 rounded-xl p-3.5 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-slate-700 dark:text-slate-300 font-bold">Price Comparison</span>
        </div>
        <div className="grid grid-cols-2 gap-3 text-center">
          <div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 mb-0.5">Avg Standard</div>
            <div className="text-lg font-bold text-slate-900 dark:text-slate-200">₹{analytics.avgPriceStandard.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 mb-0.5">Avg Premium</div>
            <div className="text-lg font-bold text-slate-900 dark:text-slate-200">₹{analytics.avgPricePremium.toFixed(2)}</div>
          </div>
        </div>
        <div className="mt-2 pt-2 border-t border-slate-200 dark:border-white/10 text-center">
          <span className="text-xs text-slate-500 dark:text-slate-400">Premium Delta: </span>
          <span className="text-sm font-bold text-slate-900 dark:text-slate-200">+₹{analytics.priceDelta.toFixed(2)}/L</span>
        </div>
      </div>
    </div>
  );
}
