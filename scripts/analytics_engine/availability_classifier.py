import pandas as pd
import numpy as np

def run_availability_classifier(demand_forecasts):
    """
    Simulates a Classification model (e.g. Random Forest) to predict 
    the probability of individual fuel stations running out of stock.
    Takes demand_forecasts as an external feature.
    """
    print("[Model: Availability Classifier] Initializing classification tree...")
    
    # 1. Generate synthetic station data
    stations = [
        {"id": "MUM-001", "name": "IOCL COCO Prabhadevi", "region": "Mumbai", "current_stock_level": 85, "avg_queue_time": 5},
        {"id": "MUM-006", "name": "Shell Bandra West", "region": "Mumbai", "current_stock_level": 30, "avg_queue_time": 15},
        {"id": "DEL-004", "name": "HPCL Connaught Place", "region": "Delhi NCR", "current_stock_level": 15, "avg_queue_time": 25},
        {"id": "BLR-001", "name": "HPCL Millennium MG Road", "region": "Bengaluru", "current_stock_level": 60, "avg_queue_time": 8},
    ]
    
    print("[Model: Availability Classifier] Evaluating Random Forest Probabilities (simulated)...")
    
    predictions = []
    
    for station in stations:
        # Find if this region has a demand spike
        region_spikes = [f for f in demand_forecasts if f['region'] == station['region'] and f['demand_spike_alert']]
        has_regional_spike = len(region_spikes) > 0
        
        # Calculate risk score based on stock level, queue time, and regional macro spikes
        # Low stock + High Queue + Regional Spike = Very High Risk
        base_risk = (100 - station['current_stock_level']) * 0.5 + (station['avg_queue_time'] * 1.5)
        
        if has_regional_spike:
            base_risk *= 1.4 # 40% risk multiplier if the whole region is surging
            
        probability = min(base_risk / 100.0, 0.99)
        
        # Classify
        if probability > 0.8:
            status_prediction = "High Risk (Out of Stock Imminent)"
        elif probability > 0.5:
            status_prediction = "Medium Risk (Limited Stock Expected)"
        else:
            status_prediction = "Low Risk (Stable)"
            
        predictions.append({
            "station_id": station["id"],
            "station_name": station["name"],
            "region": station["region"],
            "stock_out_probability": round(probability, 2),
            "predicted_status": status_prediction
        })
        
    high_risk_count = sum(1 for p in predictions if p['stock_out_probability'] > 0.8)
    print(f"[Model: Availability Classifier] Complete. {high_risk_count} stations at critical risk.")
    
    return {
        "model_name": "Random Forest Classifier",
        "target": "Station_StockOut_Probability",
        "high_risk_stations_count": high_risk_count,
        "station_predictions": predictions
    }

if __name__ == "__main__":
    # If run standalone, provide an empty array for demand forecasts
    run_availability_classifier([])
