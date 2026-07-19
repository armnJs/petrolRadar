# Implementation Plan: Interactive ML Queries & Dynamic Analytics

## Goal Description
Upgrade the Data Science analytics engine to be fully interactive. We will add granular data filters, an interactive "Prediction Query" modal for users to run on-demand forecasts, and a database schema to store these queries for continuous Machine Learning improvement.

## Proposed Architecture

### 1. Database Schema Update (`database/schema_v3_ml_workflows.sql`)
I will create a new SQL schema to track user queries and prediction outcomes.
- **Table: `ml_prediction_queries`**
- **Fields**: `id`, `user_query` (text), `target_location`, `target_grade`, `predicted_value`, `actual_outcome` (for future reinforcement learning), `created_at`.
- This establishes the foundation for a continuous feedback loop where the ML model learns from past user queries.

### 2. Advanced Analytics Filters (Frontend)
I will update the `/analytics` page to include dynamic dropdown filters:
- **Location**: Mumbai, Delhi NCR, Bengaluru, etc.
- **Petrol Type**: XP100, Speed97, E20, etc.
- **Timeframe**: Year, Month, Date range.
*(These will visually filter the existing Macro and Micro charts).*

### 3. Interactive Prediction Query Modal
I will build a new component (`PredictionQueryModal.tsx`) accessible from the Analytics dashboard via a "Run Custom Prediction" button.
- **User Input**: A text input or structured form where the user can ask for a specific forecast (e.g., "Predict demand for Speed97 in Mumbai for next month").
- **Dynamic Charting**: Upon submission, the modal will render a **dynamic Recharts Line/Bar chart** generated specifically for that query.
- **Workflow Saving**: The modal will simulate saving this query and its result to our new database table for "future learning".

## Open Questions

> [!TIP]
> **Prediction Engine Execution**: For the dynamic charts in the frontend modal, I will simulate the ML inference (generating a realistic dynamic chart based on their dropdown selections) to ensure it works instantly in the browser without needing a live Python server running in the background. Is this frontend simulation acceptable for this phase?
