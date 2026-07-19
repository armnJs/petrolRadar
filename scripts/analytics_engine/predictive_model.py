import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import json
import os

# ============================================================
# Premium Petrol Radar — Analytics Engine
# ============================================================
# This script simulates a predictive workflow pulling from Supabase,
# running a shortage probability model, and outputting to JSON/DB.

print("Initializing Premium Petrol Radar Analytics Engine...")

# ── 1. Mock Data Ingestion (Simulating Supabase Fetch) ──────
print("Fetching historical import & sales data...")
np.random.seed(42)

# Generate 30 days of mock data
dates = [datetime.today() - timedelta(days=i) for i in range(30)]
data = {
    'record_date': dates,
    'import_volume_kl': np.random.normal(50000, 2000, 30),
    'sales_volume_kl': np.random.normal(48000, 3000, 30)
}
df_macro = pd.DataFrame(data)

# Inject an anomaly (High demand spike 5 days ago)
df_macro.loc[5, 'sales_volume_kl'] = 65000 

print(f"Loaded {len(df_macro)} macro records.")

# ── 2. Predictive Modeling (Shortage Probability) ───────────
# We calculate a simple 'Sales Velocity' vs 'Import Velocity' model.
# If rolling sales exceed rolling imports consistently, shortage probability goes up.

print("Running shortage probability models...")
df_macro['rolling_sales'] = df_macro['sales_volume_kl'].rolling(window=3).mean()
df_macro['rolling_imports'] = df_macro['import_volume_kl'].rolling(window=3).mean()

# Calculate deficit ratio
df_macro['deficit_ratio'] = df_macro['rolling_sales'] / df_macro['rolling_imports']

# Normalize deficit to a probability between 0 and 1
def calculate_probability(ratio):
    if pd.isna(ratio):
        return 0.0
    # If ratio > 1.0 (selling more than importing), risk increases exponentially
    if ratio <= 1.0:
        return 0.05
    else:
        prob = (ratio - 1.0) * 2.5
        return min(max(prob, 0.05), 0.95)

df_macro['shortage_probability'] = df_macro['deficit_ratio'].apply(calculate_probability)

latest_risk = df_macro.iloc[0]['shortage_probability']
print(f"Current Macro Shortage Probability: {latest_risk * 100:.1f}%")

# ── 3. Edge Case Trigger ────────────────────────────────────
if latest_risk > 0.75:
    print("CRITICAL ALERT: High probability of fuel exhaustion detected.")
    # Here we would normally trigger an email, SMS, or Push notification via Supabase Edge Functions.

# ── 4. Output Generation ────────────────────────────────────
# We write the outputs to a JSON file that the Next.js frontend can consume (mocking DB insert).
output = {
    "generated_at": datetime.now().isoformat(),
    "model_version": "v1.2-beta",
    "predictions": [
        {
            "city": "Mumbai",
            "grade_name": "Speed97",
            "shortage_probability": round(latest_risk, 2),
            "predicted_exhaustion_date": (datetime.now() + timedelta(days=2)).isoformat() if latest_risk > 0.7 else None
        },
        {
            "city": "Pune",
            "grade_name": "XP100",
            "shortage_probability": 0.15,
            "predicted_exhaustion_date": None
        }
    ]
}

os.makedirs(os.path.dirname(os.path.abspath(__file__)), exist_ok=True)
output_path = os.path.join(os.path.dirname(__file__), 'latest_predictions.json')
with open(output_path, 'w') as f:
    json.dump(output, f, indent=2)

print(f"Pipeline complete. Outputs written to {output_path}.")
