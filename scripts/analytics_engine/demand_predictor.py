import pandas as pd
import numpy as np
from datetime import datetime

def run_demand_forecast():
    """
    Simulates a regression/gradient boosting model (e.g. XGBoost) 
    to forecast regional demand spikes based on historical usage.
    """
    print("[Model: Demand Predictor] Initializing spatial regression analysis...")
    
    # 1. Generate synthetic regional usage data
    regions = ['Mumbai', 'Delhi NCR', 'Bengaluru']
    grades = ['XP100', 'Speed97', 'E20']
    
    np.random.seed(202)
    
    forecasts = []
    
    print("[Model: Demand Predictor] Fitting XGBoost Regressor (simulated)...")
    
    for region in regions:
        for grade in grades:
            # Base daily demand (litres)
            base_demand = np.random.randint(5000, 25000)
            
            # Simulate features: day of week factor, local events, seasonal trend
            day_factor = 1.15 if datetime.today().weekday() >= 4 else 0.95 # Higher on weekends
            event_spike = 1.3 if (region == 'Mumbai' and grade == 'Speed97') else 1.0 # Mock event in Mumbai
            
            predicted_demand = int(base_demand * day_factor * event_spike)
            
            # Calculate % increase vs historical average
            hist_avg = base_demand
            pct_change = round(((predicted_demand - hist_avg) / hist_avg) * 100, 1)
            
            is_anomaly = pct_change > 25.0
            
            forecasts.append({
                "region": region,
                "grade": grade,
                "predicted_demand_kl": round(predicted_demand / 1000, 2),
                "pct_change_vs_avg": pct_change,
                "demand_spike_alert": is_anomaly
            })
            
    # Filter to only show high-risk demand spikes
    spikes = [f for f in forecasts if f['demand_spike_alert']]
    
    print(f"[Model: Demand Predictor] Complete. Detected {len(spikes)} significant demand spikes.")
    
    return {
        "model_name": "Spatial XGBoost Regressor",
        "target": "Regional_Demand_Volume",
        "total_regions_analyzed": len(regions),
        "critical_spikes": spikes,
        "all_forecasts": forecasts
    }

if __name__ == "__main__":
    run_demand_forecast()
