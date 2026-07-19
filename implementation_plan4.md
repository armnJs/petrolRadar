# Implementation Plan: Comprehensive Automated Prediction Pipeline

## Goal Description
Expand our single predictive script into a full-scale, automated **Machine Learning Pipeline**. We will build specialized prediction models for *every* granular data domain we possess (Pricing, Regional Demand, and Station-Level Availability).

## Proposed Architecture

I will structure the `scripts/analytics_engine/` directory into a robust ML workflow containing three specialized models:

### 1. `price_forecaster.py` (Time-Series Price Prediction)
- **Data Source**: `price_history`
- **Algorithm**: Time-Series Forecasting (Simulated ARIMA / Prophet)
- **Goal**: Predict the future price per litre of specialized fuels (like XP100) over the next 30 days based on historical price fluctuations and macro import deficits.

### 2. `demand_predictor.py` (Regional Demand Spikes)
- **Data Source**: `regional_fuel_usage`
- **Algorithm**: Regression / Gradient Boosting (Simulated XGBoost)
- **Goal**: Analyze usage across different cities (Mumbai, Bengaluru, Delhi) to forecast sudden demand spikes for specific grades (e.g., E20 or Speed97) based on day-of-week and seasonal trends.

### 3. `availability_classifier.py` (Station-Level Stock Out Risk)
- **Data Source**: `fuel_stations` + `fuel_grades`
- **Algorithm**: Classification (Simulated Random Forest)
- **Goal**: Predict the exact probability of an individual station going "Out of Stock" or reaching "Limited Stock" status based on its historical queue times, location, and the regional demand predictor.

### 4. `pipeline_orchestrator.py`
- A master script that automatically triggers all three models, aggregates their outputs, and writes a comprehensive `advanced_predictions.json` file.

## Output & Frontend Integration
Once the models are generated, I will update the Next.js **Analytics Dashboard** to display these new insights (e.g., a "Price Forecast" chart and a "High-Risk Stations" table).

## Open Questions

> [!WARNING]
> **Data Scale Simulation**: Since we don't have years of real historical DB data yet, I will simulate highly realistic synthetic datasets within these scripts to train and demonstrate the models. Is that acceptable?
> **Python Libraries**: These scripts will be structured using standard ML concepts (pandas, sklearn). I will keep dependencies standard so you can easily run the orchestrator locally.
