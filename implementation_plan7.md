# Supabase Database Integration for Bulk Upload

This plan details how we will wire the `handleConfirmBulk` function in your `RequestAreaModal` directly to your Supabase PostgreSQL database. This ensures that when you click "Plot Stations", the data is permanently saved across sessions.

## Proposed Changes

### 1. Supabase Insertion Logic (`RequestAreaModal.tsx`)
#### [MODIFY] [RequestAreaModal.tsx](file:///d:/Armaan/Data%20visualization/petrolRadar/src/components/RequestAreaModal.tsx)
- Import the initialized `supabase` client from `src/lib/supabase.ts`.
- Inside `handleConfirmBulk`, intercept the parsed CSV data.
- **Data Pipeline**:
  - Iterate through the `parsedStations`.
  - For each station, execute an `INSERT` into the `public.fuel_stations` table (providing `name`, `brand`, `city`, `lat`, and `lng`). The database triggers will automatically generate the geospatial `location` coordinates.
  - Retrieve the automatically generated `id` from the `fuel_stations` insert.
  - Execute a secondary `INSERT` into the `public.fuel_grades` table, tying the station's ID to the fuel `grade_name` and `price_per_litre`.
- **Error Handling**: Display standard database errors to the user (e.g., if Supabase keys are missing or RLS policies block the insert).

### 2. Frontend State Sync
- Even though the data will be sent to Supabase, we will still call `onBulkAdd(parsedStations)` so that the frontend map instantly plots the stations without requiring a hard refresh or a secondary `SELECT` query.

## Open Questions

> [!WARNING]
> **Environment Variables**: The `isSupabaseConfigured` check in `supabase.ts` expects `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to be present in your `.env.local` file. Currently, you only have `.env.local.example`. You will need to rename that file and add your actual Supabase keys for this to write to the database!

> [!IMPORTANT]
> **Row Level Security (RLS)**: Does your Supabase instance currently allow anonymous `INSERT` requests into `fuel_stations` and `fuel_grades`? If RLS is enabled and blocks anonymous inserts, these API calls will throw a 401 Unauthorized error until you update the policies in your Supabase dashboard.

## Verification Plan
1. Update `RequestAreaModal.tsx` with the dual-table insertion logic using the Supabase JS client.
2. Add graceful error handling if the `supabase` client returns null (e.g., missing `.env` keys).
3. Request you to add your `.env.local` variables and test the upload pipeline.
