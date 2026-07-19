'use client';
// ============================================================
// Premium Petrol Radar — Sidebar Component
// Collapsible analytics sidebar with station list + stats
// ============================================================
import { useState } from 'react';
import { Search, BarChart3, List, ChevronDown } from 'lucide-react';
import type { StationMarker, FuelFilterMode, Analytics } from '@/lib/types';
import StationCard from './StationCard';
import StatsPanel from './StatsPanel';

interface SidebarProps {
  stations: StationMarker[];
  analytics: Analytics;
  filterMode: FuelFilterMode;
  onStationClick: (station: StationMarker) => void;
  activeStationId?: string;
  isOpen: boolean;
}

type SidebarTab = 'stations' | 'analytics';

export default function Sidebar({
  stations,
  analytics,
  filterMode,
  onStationClick,
  activeStationId,
  isOpen,
}: SidebarProps) {
  const [tab, setTab] = useState<SidebarTab>('stations');
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('ALL');

  // Get unique cities from current stations
  const cities = Array.from(new Set(stations.map((s) => s.city))).sort();

  // Filter stations by search + city
  const filteredStations = stations.filter((s) => {
    const matchSearch =
      search === '' ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.city.toLowerCase().includes(search.toLowerCase()) ||
      s.brand.toLowerCase().includes(search.toLowerCase());
    const matchCity = cityFilter === 'ALL' || s.city === cityFilter;
    return matchSearch && matchCity;
  });

  const modeLabel =
    filterMode === 'standard'
      ? 'Standard (E20/E10)'
      : filterMode === 'high-octane'
        ? 'High Octane (XP95/97)'
        : 'Ultra Premium (XP100/99)';

  return (
    <div
      className={`
        absolute lg:relative z-[450]
        bg-white/90 dark:bg-slate-900/80 backdrop-blur-2xl border-r border-slate-200 dark:border-white/10 shadow-2xl
        h-[calc(100vh-57px)] flex flex-col overflow-hidden
        transition-all duration-500
        ${isOpen ? 'w-full lg:w-[380px] left-0' : 'w-0 lg:w-0 -left-full lg:left-0'}
      `}
    >
      {/* Sidebar Header */}
      <div className="p-3.5 border-b border-slate-200 dark:border-slate-800/60 shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            {modeLabel}
          </h2>
          <span className="text-xs font-bold text-slate-700 dark:text-amber-400 bg-slate-200 dark:bg-amber-500/10 px-2 py-1 rounded-lg border border-slate-300 dark:border-amber-500/20">
            {stations.length} pumps
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-1 bg-slate-100 dark:bg-slate-800/60 rounded-xl p-1 mb-3">
          <button
            onClick={() => setTab('stations')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
              tab === 'stations'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            Stations
          </button>
          <button
            onClick={() => setTab('analytics')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
              tab === 'analytics'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Analytics
          </button>
        </div>

        {/* Search + City Filter (only in stations tab) */}
        {tab === 'stations' && (
          <div className="space-y-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                placeholder="Search pumps..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-slate-500 transition-colors placeholder:text-slate-400 dark:placeholder:text-slate-500"
              />
            </div>
            
            <div className="relative">
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="appearance-none bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl pl-3 pr-8 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-slate-500 font-bold max-w-[120px] truncate cursor-pointer transition-colors"
              >
                <option value="ALL">All Cities ({cities.length})</option>
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-2.5 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
        {tab === 'stations' ? (
          filteredStations.length > 0 ? (
            filteredStations.map((station) => (
              <StationCard
                key={station.id}
                station={station}
                onClick={() => onStationClick(station)}
                isActive={station.id === activeStationId}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-slate-600 text-4xl mb-3">⛽</div>
              <p className="text-slate-500 text-sm font-medium">No stations match your filters.</p>
              <p className="text-slate-600 text-xs mt-1">Try changing the fuel toggle or city filter.</p>
            </div>
          )
        ) : (
          <div className="space-y-4">
            <StatsPanel analytics={analytics} />

            {/* Recently Verified Section */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                  Recently Verified
                </h3>
              </div>
              <div className="space-y-2">
                {analytics.recentlyVerified.slice(0, 5).map((station) => (
                  <button
                    key={station.id}
                    onClick={() => {
                      setTab('stations');
                      onStationClick(station);
                    }}
                    className="w-full text-left bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-white/10 rounded-lg p-2.5 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-slate-200 truncate">{station.name}</p>
                        <p className="text-[10px] text-slate-500">{station.city} • {station.gradeName}</p>
                      </div>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">₹{station.pricePerLitre.toFixed(2)}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
