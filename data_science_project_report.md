# Premium Petrol Radar: Data Science Project Report
**Author:** Armaan Mangaonkar  
**Target Domain:** Geospatial Analytics & Supply Chain Machine Learning

---

## 1. Executive Summary
The **Premium Petrol Radar** is an end-to-end data platform engineered to track, analyze, and predict the supply chain of ultra-premium, high-octane fuels (XP100, Power99, Speed97) and low-ethanol (E0) petrol across India. 

From a Data Science perspective, the project transcends simple mapping. It serves as a comprehensive **Machine Learning pipeline** that ingests real-time crowdsourced spatial data, processes it via advanced PostGIS spatial queries, and feeds it into predictive models (Prophet/ARIMA, XGBoost, and Random Forest) to forecast price fluctuations and localized stock-out probabilities.

---

## 2. Data Architecture & Engineering (The Foundation)
To train robust models, the data pipeline requires high-quality, normalized relational data. The PostgreSQL database is designed across three maturity stages:

### A. Spatial Ingestion (Base Schema)
- **PostGIS Integration**: Fuel station coordinates are automatically cast into `GEOGRAPHY(POINT)` data types using database triggers (`ST_SetSRID(ST_MakePoint(lng, lat), 4326)`).
- **Proximity Indexing**: Uses Generalized Search Tree (GiST) indexing to allow the models to rapidly pull station clusters within dynamic radii (e.g., "Find all Speed97 stations within 5km").

### B. Time-Series Aggregation (V2 Schema)
- **Macro Data (`fuel_imports_sales`)**: Tracks state-level supply chain volumes in Kilolitres to establish baseline supply constraints.
- **Micro Data (`regional_fuel_usage`)**: Tracks localized daily consumption.
- **Pricing History (`fuel_pricing_history`)**: Maintains a strict ledger of historical prices necessary for time-series forecasting.

### C. Continuous Learning Loop (V3 Schema)
- **`ml_prediction_queries` Table**: Every prediction made by the engine is stored alongside the model version and confidence score. As crowdsourced verifications come in, an `actual_outcome` is recorded, allowing us to calculate an `accuracy_delta`. This creates a true **Reinforcement Learning** feedback loop to dynamically retrain weights.

---

## 3. Machine Learning Ecosystem

The analytics engine (`advanced_predictions.json` pipeline) deploys three distinct supervised learning models tailored to different supply-chain questions.

### Model 1: Price Volatility Forecasting
* **Algorithm**: Time-Series Auto-ARIMA / Facebook Prophet
* **Target Variable**: `XP100_Price` (Continuous Numeric)
* **Feature Engineering**: Historical prices, macro import volumes, and regional sales spikes.
* **Objective**: Forecast the 7-day moving average price to warn high-performance vehicle owners of impending price hikes. 

### Model 2: Regional Demand Modeling
* **Algorithm**: Spatial XGBoost Regressor
* **Target Variable**: `Regional_Demand_Volume` (Kilolitres)
* **Objective**: Predicts volumetric demand across massive metros (Mumbai, Bengaluru, Delhi NCR). 
* **Why XGBoost?**: Tree-boosting models are highly resilient to non-linear spatial data and handle the complex, sparse features (e.g., occasional E20 spikes vs. XP100 consistency) exceptionally well without overfitting.

### Model 3: Station Stock-Out Classification
* **Algorithm**: Random Forest Classifier
* **Target Variable**: `Station_StockOut_Probability` (Binary/Probabilistic)
* **Objective**: Calculates the exact probability (0.00 to 1.00) that a specific station (e.g., *Shell Bandra West*) will run out of premium fuel within 48 hours.
* **Output Mapping**: Probabilities are bucketed into UI-friendly classifications:
  - `< 0.30`: Low Risk (Stable)
  - `0.30 - 0.70`: Medium Risk (Limited Stock Expected)
  - `> 0.70`: High Risk (Stock-Out Imminent)

---

## 4. Key Interview Talking Points

If asked about this project in an interview, focus on these critical Data Science competencies:

1. **"I didn't just build a model; I built a feedback loop."**
   * Emphasize the V3 Schema. Explain how storing `predicted_value` vs. `actual_outcome` allows you to measure model drift in production, which is a massive real-world industry problem.
2. **"I integrated geospatial awareness into traditional ML."**
   * Highlight the use of PostGIS. Explain that predicting demand isn't just about time (when), but space (where). Combining ST_Distance queries with XGBoost makes the predictions hyper-localized.
3. **"I handled data sparsity through crowdsourcing."**
   * Ultra-premium fuel data is incredibly scarce in India. Explain how you built a user-friendly React frontend to actively gather crowdsourced data (`addStationsBulk`, CSV ingestion) to solve the "Cold Start" problem for your ML models.

---

*Note: You can easily export this Markdown document to a PDF using your browser's Print feature (Ctrl+P -> Save as PDF) or an IDE Markdown extension.*
