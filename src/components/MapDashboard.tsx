'use client';
// ============================================================
// Premium Petrol Radar — MapDashboard Component
// Interactive Leaflet map with custom markers & rich popups
// ============================================================
import { useEffect, useRef, useMemo } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet';
import { useTheme } from 'next-themes';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import type { StationMarker, FuelFilterMode } from '@/lib/types';
import {
  TILE_URL,
  TILE_ATTRIBUTION,
  DEFAULT_CENTER,
  DEFAULT_ZOOM,
  GRADE_COLORS,
  BRAND_COLORS,
} from '@/lib/constants';

// ── Helpers ──────────────────────────────────────────────────

/** Create a pulsing SVG dot icon for a given colour */
function createMarkerIcon(color: string, isPulsing: boolean): L.DivIcon {
  const size = isPulsing ? 20 : 14;
  const pulseRing = isPulsing
    ? `<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:${size + 16}px;height:${size + 16}px;border-radius:50%;border:2px solid ${color};opacity:0.4;animation:ppr-pulse 2s ease-out infinite;"></div>`
    : '';

  return L.divIcon({
    className: 'ppr-custom-marker',
    html: `
      <div style="position:relative;width:${size + 20}px;height:${size + 20}px;">
        ${pulseRing}
        <div style="
          position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
          width:${size}px;height:${size}px;border-radius:50%;
          background:${color};
          border:2.5px solid rgba(255,255,255,0.9);
          box-shadow:0 0 12px ${color}88, 0 0 24px ${color}44;
          transition: all 0.3s ease;
        "></div>
      </div>
    `,
    iconSize: [size + 20, size + 20],
    iconAnchor: [(size + 20) / 2, (size + 20) / 2],
    popupAnchor: [0, -(size + 20) / 2 + 4],
  });
}

/** Rich popup HTML for a station marker */
function createPopupContent(station: StationMarker): string {
  const color = GRADE_COLORS[station.gradeName] || '#64748b';
  const brandColor = BRAND_COLORS[station.brand] || '#64748b';
  const ethanolColor =
    station.ethanolPct === 0
      ? '#22c55e'
      : station.ethanolPct <= 11
        ? '#eab308'
        : '#f97316';
  const statusColor =
    station.availabilityStatus === 'Available'
      ? '#22c55e'
      : station.availabilityStatus === 'Limited Stock'
        ? '#eab308'
        : '#ef4444';

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lng}`;

  return `
    <div style="font-family:'Inter',system-ui,sans-serif;min-width:260px;max-width:300px;padding:4px;">
      <!-- Header -->
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px;">
        <span style="font-size:11px;font-weight:800;padding:3px 8px;border-radius:6px;color:white;background:${color};letter-spacing:0.02em;">
          ${station.gradeName} (${station.ronRating} RON)
        </span>
        <span style="font-size:10px;font-weight:600;padding:2px 8px;border-radius:6px;color:${statusColor};background:${statusColor}18;border:1px solid ${statusColor}30;">
          ${station.availabilityStatus}
        </span>
      </div>

      <!-- Station Name -->
      <h4 style="font-size:14px;font-weight:800;margin:0 0 2px 0;color:#0f172a;line-height:1.3;">
        ${station.name}
      </h4>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:10px;">
        <span style="font-size:10px;font-weight:700;padding:2px 6px;border-radius:4px;color:white;background:${brandColor};">
          ${station.brand}
        </span>
        <span style="font-size:11px;color:#64748b;font-weight:500;">
          ${station.city}, ${station.state}
        </span>
      </div>

      <!-- Price & Ethanol Grid -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:10px 0;border-top:1px solid #e2e8f0;border-bottom:1px solid #e2e8f0;">
        <div>
          <div style="font-size:9px;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Price</div>
          <div style="font-size:18px;font-weight:900;color:#0f172a;">₹${station.pricePerLitre.toFixed(2)}<span style="font-size:11px;color:#94a3b8;font-weight:500;">/L</span></div>
        </div>
        <div>
          <div style="font-size:9px;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Ethanol Blend</div>
          <div style="font-size:18px;font-weight:900;color:${ethanolColor};">~${station.ethanolPct}%</div>
        </div>
      </div>

      ${station.queueWaitMins !== undefined ? `
        <div style="padding:6px 0;font-size:11px;color:#64748b;">
          <span style="font-weight:600;">Queue:</span> ~${station.queueWaitMins} min wait
        </div>
      ` : ''}

      <!-- Verified + Navigate -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-top:10px;">
        <span style="font-size:10px;color:${station.verified ? '#22c55e' : '#94a3b8'};font-weight:600;">
          ${station.verified ? '✓ Community Verified' : '⏳ Unverified'}
        </span>
        <a
          href="${googleMapsUrl}"
          target="_blank"
          rel="noopener noreferrer"
          style="
            display:inline-flex;align-items:center;gap:4px;
            font-size:11px;font-weight:700;
            padding:6px 14px;border-radius:8px;
            color:white;background:linear-gradient(135deg,#3b82f6,#2563eb);
            text-decoration:none;
            box-shadow:0 2px 8px rgba(37,99,235,0.3);
            transition:all 0.2s;
          "
        >
          🧭 Navigate
        </a>
      </div>
    </div>
  `;
}

// ── Sub-component: Re-center on geolocation ──────────────────
function FlyToCenter({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  const hasFiredRef = useRef(false);

  useEffect(() => {
    if (!hasFiredRef.current && center[0] !== DEFAULT_CENTER[0]) {
      map.flyTo(center, zoom, { duration: 1.8 });
      hasFiredRef.current = true;
    }
  }, [center, zoom, map]);

  return null;
}

// ── Main MapDashboard ────────────────────────────────────────
interface MapDashboardProps {
  stations: StationMarker[];
  filterMode: FuelFilterMode;
  userLocation: [number, number];
  onMarkerClick?: (station: StationMarker) => void;
}

export default function MapDashboard({
  stations,
  filterMode,
  userLocation,
  onMarkerClick,
}: MapDashboardProps) {
  const isPremiumMode = filterMode === 'ultra-premium';
  const { theme } = useTheme();

  const activeTileUrl = theme === 'light'
    ? 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
    : TILE_URL;

  // Memoize icons so Leaflet doesn't re-create them every render
  const markerIcons = useMemo(() => {
    const icons: Record<string, L.DivIcon> = {};
    for (const station of stations) {
      const color = GRADE_COLORS[station.gradeName] || '#64748b';
      const key = `${station.gradeName}-${isPremiumMode}`;
      if (!icons[key]) {
        icons[key] = createMarkerIcon(color, isPremiumMode);
      }
    }
    return icons;
  }, [stations, isPremiumMode]);

  return (
    <MapContainer
      center={userLocation}
      zoom={DEFAULT_ZOOM}
      minZoom={4}
      maxBounds={[
        [6.5, 68], // South-West India
        [35.5, 97], // North-East India
      ]}
      maxBoundsViscosity={1.0}
      className="w-full h-full"
      zoomControl={false}
      attributionControl={true}
    >
      <TileLayer url={activeTileUrl} attribution={TILE_ATTRIBUTION} />
      <FlyToCenter center={userLocation} zoom={userLocation[0] !== DEFAULT_CENTER[0] ? 12 : DEFAULT_ZOOM} />

      {stations.map((station) => {
        const key = `${station.gradeName}-${isPremiumMode}`;
        return (
          <Marker
            key={station.id}
            position={[station.lat, station.lng]}
            icon={markerIcons[key]}
            eventHandlers={{
              click: () => onMarkerClick?.(station),
            }}
          >
            <Popup className="ppr-popup" maxWidth={320} minWidth={260}>
              <div
                dangerouslySetInnerHTML={{
                  __html: createPopupContent(station),
                }}
              />
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
