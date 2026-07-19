'use client';
// ============================================================
// Premium Petrol Radar — Header Component
// ============================================================
import { Menu, X, Sun, Moon, BarChart3, Map as MapIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { FuelFilterMode } from '@/lib/types';
import FuelToggle from './FuelToggle';

interface HeaderProps {
  onReportClick: () => void;
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
  filterMode: FuelFilterMode;
  onFilterChange: (mode: FuelFilterMode) => void;
}

export default function Header({ onReportClick, onToggleSidebar, sidebarOpen, filterMode, onFilterChange }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isAnalytics = pathname === '/analytics';

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="bg-slate-50/80 dark:bg-slate-900/40 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 shadow-sm dark:shadow-lg sticky top-0 z-[500] px-4 py-3 transition-colors duration-300">
      <div className="max-w-[1920px] mx-auto flex items-center justify-between gap-4">
        {/* Logo & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-900 dark:text-slate-100"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2.5">
            <div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Premium Petrol Radar
              </h1>
              <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                High Octane & Low-Ethanol Fuel Tracker • India
              </p>
            </div>
          </div>
        </div>

        {/* Center: Fuel Toggle (hidden on small screens, or we can make it responsive) */}
        <div className="hidden lg:flex flex-1 justify-center max-w-md mx-4">
          <FuelToggle activeMode={filterMode} onChange={onFilterChange} className="w-full" />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="https://armaan-mangaonkar.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
          >
            by Armaan
          </a>
          
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}

          {isAnalytics ? (
            <Link
              href="/"
              className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold px-4 py-2 rounded-xl text-sm transition-all duration-300"
            >
              <MapIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Map</span>
            </Link>
          ) : (
            <Link
              href="/analytics"
              className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold px-4 py-2 rounded-xl text-sm transition-all duration-300"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Analytics</span>
            </Link>
          )}

          <button
            onClick={onReportClick}
            className="group flex items-center gap-2 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-50 text-white dark:text-slate-900 font-semibold px-4 py-2 rounded-xl text-sm transition-all duration-300"
          >
            <span className="hidden sm:inline">Report Pump</span>
            <span className="sm:hidden">Report</span>
          </button>
        </div>
      </div>
    </header>
  );
}
