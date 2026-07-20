# Bulk CSV Upload Integration

This plan outlines how we will transform the mock "Upload CSV" form into a fully functional data ingestion pipeline that parses CSV files directly in your browser and instantly plots the new high-octane stations on the map.

## Proposed Changes

### 1. CSV Parsing Engine (PapaParse)
We will install and configure `papaparse`, a fast, robust CSV parser for the browser. This ensures we can safely read the uploaded file instantly without needing a backend server roundtrip.

### 2. Frontend State Management (`useStations.ts`)
#### [MODIFY] [useStations.ts](file:///d:/Armaan/Data%20visualization/petrolRadar/src/hooks/useStations.ts)
- Add a new `addStationsBulk(stations: StationMarker[])` function to the hook to allow merging an entire array of parsed stations into the live map's global state at once.

### 3. Map Dashboard (`map/page.tsx`)
#### [MODIFY] [map/page.tsx](file:///d:/Armaan/Data%20visualization/petrolRadar/src/app/map/page.tsx)
- Pass the newly created `addStationsBulk` function from the `useStations` hook down to the `RequestAreaModal` component.

### 4. Interactive Upload Modal (`RequestAreaModal.tsx`)
#### [MODIFY] [RequestAreaModal.tsx](file:///d:/Armaan/Data%20visualization/petrolRadar/src/components/RequestAreaModal.tsx)
- Upgrade the `handleSubmit` logic to intercept the bulk CSV file upload.
- Execute `Papa.parse` to read the file's contents into a JSON array.
- **Preview Step**: Before final submission, we'll display a sleek summary (e.g., "Ready to plot 43 new stations from your CSV!") so you know exactly what changes will occur.
- Upon confirmation, pass the mapped stations to `addStationsBulk` and trigger the success animation.

## Open Questions
> [!IMPORTANT]
> Since this is currently a frontend-only mockup, the uploaded stations will disappear if you refresh the page. Is that acceptable for this demonstration phase, or did you want me to integrate this directly with your Supabase database (`database/schema_v3_ml_workflows.sql`) immediately?

> [!NOTE]
> I will assume a standard CSV format with headers: `name, lat, lng, gradeName, pricePerLitre, address, city, state, pin`. I will provide you with a sample CSV to test with once complete!

## Verification Plan
1. Install dependencies (`npm install papaparse @types/papaparse`).
2. Implement the parsing logic and state updates.
3. Provide a dummy CSV file.
4. Upload the CSV and verify that the map instantly populates with the new markers and the analytics sidebar updates to reflect the new total counts.
