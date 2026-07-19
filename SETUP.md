# Premium Petrol Radar — Setup Guide

> India's first interactive map for locating high-octane and low-ethanol fuel stations.

---

## Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | 18+ | Frontend runtime |
| npm | 9+ | Package manager |
| Python | 3.9+ | Data ingestion scripts (optional) |
| Supabase Account | Free tier | Database (optional — app uses mock data by default) |

---

## Quick Start (3 Steps)

### 1. Install Dependencies

```bash
cd petrolRadar
npm install
```

### 2. Create Environment File

```bash
cp .env.local.example .env.local
```

> **Note:** The app works fully out of the box without any API keys. The built-in mock dataset contains 120+ realistic stations across 25+ Indian cities.

### 3. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Optional: Supabase Setup (Live Database Mode)

### Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a free account.
2. Create a new project (any name, choose the region closest to you).
3. Wait for the project to initialize (~2 minutes).

### Step 2: Enable PostGIS

1. In your Supabase dashboard, go to **SQL Editor**.
2. Run:
   ```sql
   CREATE EXTENSION IF NOT EXISTS postgis;
   ```

### Step 3: Run the Schema

1. Open `database/schema.sql` from this project.
2. Copy the entire contents and paste into the **SQL Editor**.
3. Click **Run**. This creates all tables, indexes, RLS policies, and functions.

### Step 4: Add API Keys

1. Go to **Settings → API** in Supabase.
2. Copy the **Project URL** and **anon (public) key**.
3. Update your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your_key_here
```

### Step 5: Seed the Database (Optional)

To populate the database with real OpenStreetMap station data:

```bash
cd scripts
pip install requests
python overpass_ingest.py
```

This generates `stations_seed.json` which can be imported into Supabase via the Table Editor or REST API.

---

## Optional: Daily Price Updates

To set up automated daily fuel price fetching:

```bash
cd scripts
pip install requests
python price_fetcher.py
```

In production, schedule this as a cron job (GitHub Actions, Railway, etc.).

---

## Deploy to Vercel (Free)

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Initial commit: Premium Petrol Radar"
git push origin main
```

### Step 2: Deploy

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **Import Project** and select your repository.
3. Vercel auto-detects Next.js — no configuration needed.
4. Add environment variables if using Supabase:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click **Deploy**.

Your app will be live at `https://your-project.vercel.app` within ~60 seconds.

---

## Project Structure

```
petrolRadar/
├── database/
│   └── schema.sql          # PostgreSQL + PostGIS schema
├── scripts/
│   ├── overpass_ingest.py   # OSM data ingestion (Layer A)
│   └── price_fetcher.py    # Daily price fetcher (Layer B)
├── src/
│   ├── app/
│   │   ├── globals.css      # Tailwind + custom CSS
│   │   ├── layout.tsx       # Root layout (fonts, SEO, dark mode)
│   │   └── page.tsx         # Main page orchestrator
│   ├── components/
│   │   ├── FuelToggle.tsx   # ★ Core 3-position fuel filter
│   │   ├── Header.tsx       # Top navigation bar
│   │   ├── MapDashboard.tsx # Leaflet map with custom markers
│   │   ├── MapLegend.tsx    # Dynamic map legend
│   │   ├── ReportModal.tsx  # Crowdsource report form
│   │   ├── Sidebar.tsx      # Analytics sidebar with station list
│   │   ├── StationCard.tsx  # Individual station card
│   │   └── StatsPanel.tsx   # Analytics metrics cards
│   ├── hooks/
│   │   ├── useGeolocation.ts # HTML5 geolocation hook
│   │   └── useStations.ts   # Station data + filtering hook
│   └── lib/
│       ├── constants.ts     # Colors, grades, map config
│       ├── mock-data.ts     # 120+ seed stations
│       ├── supabase.ts      # Supabase client (dual-mode)
│       └── types.ts         # TypeScript interfaces
├── .env.local.example       # Environment variable template
├── SETUP.md                 # This file
└── package.json
```

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Fuel Toggle** | 3-position animated slider: Standard → High Octane → Ultra Premium |
| **120+ Stations** | Pre-seeded data across Mumbai, Delhi, Bengaluru, Hyderabad, Chennai, Pune, Kolkata + 18 more cities |
| **Custom Markers** | Color-coded SVG dots with pulsing animation for Ultra Premium fuels |
| **Rich Popups** | Station name, brand, price, ethanol %, availability, Google Maps navigate button |
| **Analytics Sidebar** | Total counts, price delta, recently verified stations |
| **Report Modal** | Community crowdsourcing with GPS auto-detect and queue wait time |
| **Dark Mode** | CartoDB Dark Matter tiles with premium dark UI |
| **Responsive** | Works on desktop, tablet, and mobile |

---

## Tech Stack

- **Frontend:** Next.js 15 + TypeScript + Tailwind CSS v4
- **Mapping:** Leaflet.js + react-leaflet + CartoDB tiles
- **Icons:** Lucide React
- **Database:** Supabase (PostgreSQL + PostGIS)
- **Data:** OpenStreetMap Overpass API
- **Deploy:** Vercel (free tier)
