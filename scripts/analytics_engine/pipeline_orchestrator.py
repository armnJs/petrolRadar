import json
import os
from datetime import datetime

# Import the specialized models
from price_forecaster import run_price_forecast
from demand_predictor import run_demand_forecast
from availability_classifier import run_availability_classifier

def run_pipeline():
    print("="*60)
    print("STARTING PREMIUM PETROL RADAR ML PIPELINE")
    print("="*60)
    
    # 1. Run Price Forecaster
    price_results = run_price_forecast()
    print("-" * 40)
    
    # 2. Run Demand Predictor
    demand_results = run_demand_forecast()
    print("-" * 40)
    
    # 3. Run Station Availability Classifier (Using demand features)
    availability_results = run_availability_classifier(demand_results.get('all_forecasts', []))
    print("-" * 40)
    
    # 4. Aggregate Output
    output_payload = {
        "pipeline_run_at": datetime.now().isoformat(),
        "status": "SUCCESS",
        "models_executed": 3,
        "results": {
            "price_forecast": price_results,
            "demand_forecast": demand_results,
            "availability_classification": availability_results
        }
    }
    
    # 5. Write to output file for Next.js to consume
    os.makedirs(os.path.dirname(os.path.abspath(__file__)), exist_ok=True)
    output_path = os.path.join(os.path.dirname(__file__), 'advanced_predictions.json')
    
    with open(output_path, 'w') as f:
        json.dump(output_payload, f, indent=2)
        
    print(f"PIPELINE COMPLETE. Aggregated results saved to {output_path}")
    print("="*60)

if __name__ == "__main__":
    run_pipeline()
