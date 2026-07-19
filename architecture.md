# Premium Petrol Radar - Architecture

The application is built using a modern, scalable, and hybrid tech stack that allows it to operate both with a live database and a local mock dataset.

## Tech Stack
*   **Frontend:** Next.js 15 (App Router), React, TypeScript, Tailwind CSS v4.
*   **Mapping:** Leaflet.js with `react-leaflet`, using OpenStreetMap tiles (CartoDB Dark Matter theme) for zero-cost, high-performance rendering.
*   **Icons & UI:** Lucide React for iconography.
*   **Database / Backend:** Supabase (PostgreSQL with PostGIS extension enabled).

## Application Architecture

### 1. The Data Layer (Dual-Mode)
The application is designed to work seamlessly out-of-the-box.
*   **Mock Mode (Fallback):** If Supabase environment variables are missing, the app defaults to using `src/lib/mock-data.ts`, which contains 120+ pre-seeded, realistic fuel stations across 25+ Indian cities.
*   **Live Mode (Supabase):** If configured, the app uses Supabase RPC functions for spatial proximity queries using PostGIS (`ST_DWithin`).

### 2. The Ingestion Pipeline (Scripts)
Since no live API exists, a 3-layer data ingestion strategy is employed:
*   **Layer A (Seed Data):** `scripts/overpass_ingest.py` queries the free OpenStreetMap Overpass API for fuel stations in Indian metros, applies brand heuristics, and outputs JSON for the database.
*   **Layer B (Prices):** `scripts/price_fetcher.py` is a template script for fetching daily retail selling prices and uploading them to the database.
*   **Layer C (Crowdsourcing):** The frontend includes a `ReportModal` where users can submit real-time pins for verified fuel grades and queue times.

### 3. Frontend Component Structure
*   `page.tsx`: The orchestrator component that manages the global state (filter mode, active station) and dynamically imports the Leaflet map (to avoid SSR window errors).
*   `FuelToggle.tsx`: The core 3-position segmented control that acts as the primary filter for the map data.
*   `MapDashboard.tsx`: The Leaflet map integration, handling custom pulsing SVG markers and rich HTML popups.
*   `Sidebar.tsx`: A collapsible panel housing the list of stations (`StationCard.tsx`) and summary analytics (`StatsPanel.tsx`).
*   `ReportModal.tsx`: The crowdsourcing form with HTML5 Geolocation API integration to auto-detect the user's coordinates.

## Database Schema (Supabase + PostGIS)
*   **`fuel_stations`**: Stores the station metadata and a PostGIS `GEOGRAPHY(POINT)` column for spatial indexing and proximity searches.
*   **`fuel_grades`**: A one-to-many relationship with stations, tracking what grades (XP100, E20, etc.), RON rating, ethanol percentage, and price are available.
*   **`community_reports`**: Stores crowdsourced pins submitted via the frontend.
*   **`daily_prices`**: Tracks state/city level base prices.
*   **Row Level Security (RLS)** is enabled to allow public read access but restrict inserts to authenticated or anonymous community reporting.
