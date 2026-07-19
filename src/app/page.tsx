'use client';
// ============================================================
// Premium Petrol Radar — Main Page
// ============================================================
import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import type { FuelFilterMode, StationMarker } from '@/lib/types';
import { useStations } from '@/hooks/useStations';
import { useGeolocation } from '@/hooks/useGeolocation';
import Header from '@/components/Header';
import FuelToggle from '@/components/FuelToggle';
import Sidebar from '@/components/Sidebar';
import MapLegend from '@/components/MapLegend';
import ReportModal from '@/components/ReportModal';

// ── Dynamic import: Leaflet requires browser window ──────────
const MapDashboard = dynamic(() => import('@/components/MapDashboard'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-950">
      <div className="text-center space-y-4">
        <div className="relative w-16 h-16 mx-auto">
          <div className="absolute inset-0 rounded-full border-4 border-slate-800" />
          <div className="absolute inset-0 rounded-full border-4 border-t-amber-500 animate-spin" />
        </div>
        <div>
          <p className="text-slate-300 font-bold text-sm">Loading Map Engine</p>
          <p className="text-slate-500 text-xs mt-1">Initializing CartoDB Dark Matter tiles...</p>
        </div>
      </div>
    </div>
  ),
});

export default function HomePage() {
  // ── State ──────────────────────────────────────────────────
  const [filterMode, setFilterMode] = useState<FuelFilterMode>('ultra-premium');
  const [modalOpen, setModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeStationId, setActiveStationId] = useState<string | undefined>();

  // ── Data hooks ─────────────────────────────────────────────
  const { filteredStations, analytics, addStation } = useStations(filterMode);
  const geo = useGeolocation();

  // ── Callbacks ──────────────────────────────────────────────
  const handleStationClick = useCallback((station: StationMarker) => {
    setActiveStationId(station.id);
  }, []);

  const handleReportSubmit = useCallback(
    (station: StationMarker) => {
      addStation(station);
    },
    [addStation]
  );

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <Header
        onReportClick={() => setModalOpen(true)}
        onToggleSidebar={() => setSidebarOpen((o) => !o)}
        sidebarOpen={sidebarOpen}
      />

      {/* Fuel Toggle */}
      <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 shadow-sm dark:shadow-md z-[400] transition-colors duration-300">
        <div className="max-w-3xl mx-auto">
          <FuelToggle activeMode={filterMode} onChange={setFilterMode} />
        </div>
      </div>

      {/* Main Content: Sidebar + Map */}
      <main className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          stations={filteredStations}
          analytics={analytics}
          filterMode={filterMode}
          onStationClick={handleStationClick}
          activeStationId={activeStationId}
          isOpen={sidebarOpen}
        />

        {/* Map Area */}
        <div className="flex-1 relative">
          <MapDashboard
            stations={filteredStations}
            filterMode={filterMode}
            userLocation={[geo.lat, geo.lng]}
            onMarkerClick={handleStationClick}
          />
          <MapLegend filterMode={filterMode} />
        </div>
      </main>

      {/* Report Modal */}
      <ReportModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleReportSubmit}
        userLat={geo.permissionGranted ? geo.lat : undefined}
        userLng={geo.permissionGranted ? geo.lng : undefined}
      />
    </div>
  );
}
