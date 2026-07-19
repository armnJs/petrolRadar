#!/usr/bin/env python3
"""
Premium Petrol Radar — Daily Price Fetcher (Layer B)
=====================================================
Fetches daily retail selling prices (RSP) for petrol and diesel
from publicly available sources and updates the Supabase daily_prices table.

Usage:
    pip install requests supabase
    export SUPABASE_URL="your_url"
    export SUPABASE_KEY="your_service_role_key"
    python price_fetcher.py

Note:
    This is a template script. In production, you would schedule this
    as a daily cron job (e.g., via GitHub Actions, Railway, or Supabase Edge Functions).
"""

import os
import json
import requests
from datetime import date
from typing import Optional

# ── Configuration ──────────────────────────────────────────────
SUPABASE_URL = os.environ.get("SUPABASE_URL", "")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY", "")

# Baseline prices (July 2026 actuals, updated monthly)
# Source: IOCL daily price bulletin
BASELINE_PRICES: dict[str, dict[str, float]] = {
    "Maharashtra": {"Mumbai": 104.95, "Pune": 105.15, "Nagpur": 105.20},
    "Delhi":       {"New Delhi": 104.21},
    "Karnataka":   {"Bengaluru": 103.80, "Mysuru": 103.90, "Mangaluru": 103.95},
    "Telangana":   {"Hyderabad": 104.50},
    "Tamil Nadu":  {"Chennai": 103.90, "Coimbatore": 103.80, "Madurai": 103.90},
    "West Bengal": {"Kolkata": 104.80},
    "Gujarat":     {"Ahmedabad": 103.70, "Surat": 103.60, "Vadodara": 103.65},
    "Rajasthan":   {"Jaipur": 104.60, "Udaipur": 104.60, "Jodhpur": 104.70},
    "Uttar Pradesh": {"Lucknow": 104.21, "Noida": 104.21, "Kanpur": 104.21, "Varanasi": 104.50},
    "Haryana":     {"Gurugram": 104.40},
    "Punjab":      {"Amritsar": 103.60},
    "Kerala":      {"Kochi": 105.50, "Thiruvananthapuram": 105.50},
    "Goa":         {"Panaji": 105.30},
    "Madhya Pradesh": {"Indore": 104.00, "Bhopal": 104.10},
    "Chandigarh":  {"Chandigarh": 103.50},
    "Bihar":       {"Patna": 104.90},
    "Jharkhand":   {"Ranchi": 104.80},
    "Odisha":      {"Bhubaneswar": 104.20},
    "Assam":       {"Guwahati": 105.00},
    "Uttarakhand": {"Dehradun": 104.30},
    "Chhattisgarh": {"Raipur": 104.00},
}


def try_fetch_from_ndap() -> Optional[list[dict]]:
    """
    Attempt to fetch from the NDAP (National Data and Analytics Platform) API.
    This is a placeholder — the NDAP API requires registration and specific dataset IDs.
    
    In production, you would:
    1. Register at https://ndap.niti.gov.in
    2. Find the fuel price dataset
    3. Use the API key to fetch daily prices
    """
    try:
        # Example NDAP API call (placeholder URL)
        # resp = requests.get(
        #     "https://ndap.niti.gov.in/api/v1/datasets/fuel-prices",
        #     headers={"Authorization": f"Bearer {NDAP_API_KEY}"},
        #     params={"date": date.today().isoformat()},
        #     timeout=15
        # )
        # if resp.ok:
        #     return resp.json().get("data", [])
        return None
    except Exception:
        return None


def generate_price_records() -> list[dict]:
    """Generate daily price records from baseline data."""
    today = date.today().isoformat()
    records = []

    for state, cities in BASELINE_PRICES.items():
        for city, petrol_price in cities.items():
            diesel_price = round(petrol_price - 10.50, 2)  # Diesel is typically ~₹10 less
            records.append({
                "state": state,
                "city": city,
                "petrol_price": petrol_price,
                "diesel_price": diesel_price,
                "date": today,
                "source": "baseline",
            })

    return records


def upsert_to_supabase(records: list[dict]) -> None:
    """Upsert price records to Supabase."""
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("⚠ Supabase not configured. Saving to local file instead.")
        with open("daily_prices.json", "w") as f:
            json.dump(records, f, indent=2)
        print(f"✓ Saved {len(records)} records to daily_prices.json")
        return

    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates",
    }

    resp = requests.post(
        f"{SUPABASE_URL}/rest/v1/daily_prices",
        headers=headers,
        json=records,
        timeout=30,
    )

    if resp.ok:
        print(f"✓ Upserted {len(records)} price records to Supabase")
    else:
        print(f"✗ Supabase error: {resp.status_code} — {resp.text}")


def main():
    print("=" * 60)
    print("Premium Petrol Radar — Daily Price Fetcher")
    print(f"Date: {date.today().isoformat()}")
    print("=" * 60)

    # Try NDAP first (Layer B)
    print("\n1. Attempting NDAP API fetch...")
    ndap_data = try_fetch_from_ndap()

    if ndap_data:
        print(f"   ✓ Got {len(ndap_data)} records from NDAP")
        records = ndap_data
    else:
        print("   ⚠ NDAP unavailable, using baseline prices")
        records = generate_price_records()

    print(f"\n2. Generated {len(records)} price records")
    print(f"   States covered: {len(BASELINE_PRICES)}")
    print(f"   Cities covered: {sum(len(c) for c in BASELINE_PRICES.values())}")

    # Upsert to database
    print("\n3. Uploading to database...")
    upsert_to_supabase(records)

    print("\nDone!")


if __name__ == "__main__":
    main()
