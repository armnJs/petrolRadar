#!/usr/bin/env python3
"""
Premium Petrol Radar — Overpass API Ingestion Script (Layer A)
==============================================================
Fetches fuel station geolocations from OpenStreetMap for Indian cities
and produces a JSON file ready for Supabase seeding.

Usage:
    pip install requests
    python overpass_ingest.py

Output:
    stations_seed.json — Array of station objects with brand/grade tags
"""

import json
import time
import requests
from typing import Any

# ── Configuration ──────────────────────────────────────────────
OVERPASS_URL = "https://overpass-api.de/api/interpreter"

# Major Indian metro bounding boxes [south, west, north, east]
CITY_BBOXES: dict[str, list[float]] = {
    "Mumbai":       [18.85, 72.75, 19.30, 73.05],
    "New Delhi":    [28.40, 76.85, 28.90, 77.40],
    "Bengaluru":    [12.80, 77.45, 13.15, 77.80],
    "Hyderabad":    [17.25, 78.25, 17.55, 78.60],
    "Chennai":      [12.85, 80.10, 13.20, 80.35],
    "Kolkata":      [22.40, 88.25, 22.70, 88.50],
    "Pune":         [18.40, 73.70, 18.65, 73.95],
    "Ahmedabad":    [22.95, 72.50, 23.10, 72.65],
    "Jaipur":       [26.80, 75.70, 27.00, 75.90],
    "Lucknow":      [26.78, 80.88, 26.95, 81.05],
    "Chandigarh":   [30.68, 76.72, 30.78, 76.82],
    "Kochi":        [9.90, 76.22, 10.10, 76.40],
    "Gurugram":     [28.38, 76.95, 28.52, 77.12],
    "Surat":        [21.10, 72.75, 21.25, 72.90],
    "Indore":       [22.65, 75.80, 22.80, 75.95],
}

# Brand recognition patterns (case-insensitive matching)
BRAND_PATTERNS: dict[str, list[str]] = {
    "IndianOil": ["indian oil", "indianoil", "iocl", "ioc "],
    "HPCL":      ["hindustan petroleum", "hpcl", "hp petrol"],
    "BPCL":      ["bharat petroleum", "bpcl", "bp petrol"],
    "Shell":     ["shell"],
    "Nayara":    ["nayara", "essar"],
    "Reliance":  ["reliance", "jio-bp"],
}

# Grade heuristics based on brand + station type
GRADE_HEURISTICS: dict[str, dict[str, Any]] = {
    "IndianOil": {
        "coco_grade": "XP100",
        "coco_ron": 100,
        "coco_ethanol": 0,
        "coco_price": 160.00,
        "default_grade": "E20",
        "default_ron": 87,
        "default_ethanol": 20,
        "default_price": 104.50,
    },
    "HPCL": {
        "coco_grade": "Power99",
        "coco_ron": 99,
        "coco_ethanol": 11,
        "coco_price": 118.50,
        "default_grade": "E20",
        "default_ron": 87,
        "default_ethanol": 20,
        "default_price": 104.50,
    },
    "BPCL": {
        "coco_grade": "Speed97",
        "coco_ron": 97,
        "coco_ethanol": 12,
        "coco_price": 115.50,
        "default_grade": "E20",
        "default_ron": 87,
        "default_ethanol": 20,
        "default_price": 104.50,
    },
    "Shell": {
        "coco_grade": "XP95",
        "coco_ron": 95,
        "coco_ethanol": 0,
        "coco_price": 113.00,
        "default_grade": "E10",
        "default_ron": 87,
        "default_ethanol": 10,
        "default_price": 105.00,
    },
    "Nayara": {
        "coco_grade": "E20",
        "coco_ron": 87,
        "coco_ethanol": 20,
        "coco_price": 104.00,
        "default_grade": "E20",
        "default_ron": 87,
        "default_ethanol": 20,
        "default_price": 104.00,
    },
}


def identify_brand(name: str, brand_tag: str, operator_tag: str) -> str:
    """Identify the OMC brand from OSM tags."""
    combined = f"{name} {brand_tag} {operator_tag}".lower()
    for brand, patterns in BRAND_PATTERNS.items():
        for pattern in patterns:
            if pattern in combined:
                return brand
    return "Other"


def is_coco_outlet(name: str) -> bool:
    """Heuristic: COCO (Company Owned Company Operated) stations
    are more likely to carry premium fuels."""
    keywords = ["coco", "company owned", "flagship", "auto care", "in & out", "in and out"]
    name_lower = name.lower()
    return any(kw in name_lower for kw in keywords)


def assign_grade(brand: str, name: str) -> dict:
    """Assign fuel grade based on brand heuristics."""
    heuristics = GRADE_HEURISTICS.get(brand)
    if not heuristics:
        return {
            "grade_name": "E20",
            "ron_rating": 87,
            "ethanol_pct": 20,
            "price_per_litre": 104.50,
        }

    if is_coco_outlet(name):
        return {
            "grade_name": heuristics["coco_grade"],
            "ron_rating": heuristics["coco_ron"],
            "ethanol_pct": heuristics["coco_ethanol"],
            "price_per_litre": heuristics["coco_price"],
        }
    else:
        return {
            "grade_name": heuristics["default_grade"],
            "ron_rating": heuristics["default_ron"],
            "ethanol_pct": heuristics["default_ethanol"],
            "price_per_litre": heuristics["default_price"],
        }


def query_overpass(city: str, bbox: list[float]) -> list[dict]:
    """Query Overpass API for fuel stations in a bounding box."""
    south, west, north, east = bbox
    query = f"""
    [out:json][timeout:30];
    (
      node["amenity"="fuel"]({south},{west},{north},{east});
      way["amenity"="fuel"]({south},{west},{north},{east});
    );
    out center body;
    """

    print(f"  Querying {city} ({south},{west},{north},{east})...")

    try:
        resp = requests.post(OVERPASS_URL, data={"data": query}, timeout=60)
        resp.raise_for_status()
        data = resp.json()
        elements = data.get("elements", [])
        print(f"  → Found {len(elements)} fuel stations in {city}")
        return elements
    except Exception as e:
        print(f"  ✗ Error querying {city}: {e}")
        return []


def process_elements(elements: list[dict], city: str) -> list[dict]:
    """Process raw Overpass elements into station records."""
    stations = []
    for el in elements:
        tags = el.get("tags", {})

        # Get coordinates (node has lat/lon directly, way has center)
        lat = el.get("lat") or el.get("center", {}).get("lat")
        lon = el.get("lon") or el.get("center", {}).get("lon")
        if not lat or not lon:
            continue

        name = tags.get("name", tags.get("brand", "Unknown Station"))
        brand_tag = tags.get("brand", "")
        operator_tag = tags.get("operator", "")

        brand = identify_brand(name, brand_tag, operator_tag)
        grade_info = assign_grade(brand, name)

        station = {
            "name": name,
            "brand": brand,
            "city": city,
            "state": "",  # Can be enriched later
            "lat": round(lat, 6),
            "lng": round(lon, 6),
            **grade_info,
            "availability_status": "Available",
            "verified": False,
        }
        stations.append(station)

    return stations


def main():
    print("=" * 60)
    print("Premium Petrol Radar — Overpass API Ingestion")
    print("=" * 60)

    all_stations: list[dict] = []

    for city, bbox in CITY_BBOXES.items():
        elements = query_overpass(city, bbox)
        stations = process_elements(elements, city)
        all_stations.extend(stations)
        # Rate limiting: be polite to Overpass API
        time.sleep(2)

    print(f"\nTotal stations fetched: {len(all_stations)}")

    # Brand distribution
    brand_counts: dict[str, int] = {}
    for s in all_stations:
        brand_counts[s["brand"]] = brand_counts.get(s["brand"], 0) + 1
    print("\nBrand Distribution:")
    for brand, count in sorted(brand_counts.items(), key=lambda x: -x[1]):
        print(f"  {brand}: {count}")

    # Grade distribution
    grade_counts: dict[str, int] = {}
    for s in all_stations:
        grade_counts[s["grade_name"]] = grade_counts.get(s["grade_name"], 0) + 1
    print("\nGrade Distribution:")
    for grade, count in sorted(grade_counts.items(), key=lambda x: -x[1]):
        print(f"  {grade}: {count}")

    # Save output
    output_file = "stations_seed.json"
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(all_stations, f, indent=2, ensure_ascii=False)

    print(f"\n✓ Saved {len(all_stations)} stations to {output_file}")
    print("  Import this file into Supabase using the dashboard or CLI.")


if __name__ == "__main__":
    main()
