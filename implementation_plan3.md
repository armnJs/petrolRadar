# Implementation Plan: Analytics Dashboard & Predictive Workflow Engine

## Goal Description
Transform Premium Petrol Radar into a full-fledged data science platform by building a rich frontend analytics dashboard to visualize fuel metrics, alongside a backend Python predictive engine to automate shortage and price forecasting.

## Proposed Architecture

### 1. Python Predictive Workflow Engine (Backend)
I will create a standalone Python service module (`scripts/analytics_engine/predictive_model.py`) simulating an automated data science pipeline.
- **Data Ingestion**: Simulate fetching data from the `fuel_imports_sales` and `regional_fuel_usage` tables.
- **Predictive Modeling**: Implement a script that calculates the *Shortage Probability* (Sales Velocity > Import Velocity) and *Predicted Exhaustion Date*.
- **Output**: This script would normally write back to the `supply_predictions` table.

### 2. Next.js Analytics Dashboard (Frontend)
I will build a dedicated `/analytics` route (`src/app/analytics/page.tsx`) to serve as the Business Intelligence hub.
- **Charting**: I will install `recharts` to render beautiful, responsive, dark-mode compatible charts.
- **Metrics Visualized**:
  - Macro View: Area chart comparing *Import Volumes vs Sales Volumes* over time.
  - Micro View: Bar chart showing *Daily Consumption* categorized by specific high-octane grades (XP100, Speed97).
  - Edge Cases: A dedicated alert panel showing stations/regions with a high probability of impending shortages.
- **Navigation**: Update the main `Header.tsx` or `Sidebar.tsx` to include a navigation link to this new Dashboard.

## Open Questions

> [!WARNING]
> **Python Environment**: I will write the Python script as a standard `.py` file using `pandas` and `scikit-learn` syntax. You will need to run `pip install pandas scikit-learn` on your machine if you want to execute it locally. Is this acceptable?
> **Charting Library**: I plan to use `recharts` because it integrates beautifully with React and Next.js. Let me know if you prefer a different library (like Chart.js or D3).
