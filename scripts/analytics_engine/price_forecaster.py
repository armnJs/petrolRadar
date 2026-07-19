import pandas as pd
import numpy as np
from datetime import datetime, timedelta

def run_price_forecast():
    """
    Simulates a time-series model (e.g. ARIMA/Prophet) to forecast fuel prices.
    Uses historical prices from 'price_history' and macro import/sales trends.
    """
    print("[Model: Price Forecaster] Initializing time-series analysis...")
    
    # 1. Generate synthetic historical price data for XP100
    base_price = 160.0
    dates = [datetime.today() - timedelta(days=i) for i in range(60, 0, -1)]
    
    # Simulate a slight upward trend with noise
    np.random.seed(101)
    noise = np.random.normal(0, 0.5, 60)
    trend = np.linspace(0, 2.5, 60)
    historical_prices = base_price + trend + noise
    
    df = pd.DataFrame({
        'date': dates,
        'price': historical_prices
    })
    
    # 2. Simulate Forecast for next 7 days
    print("[Model: Price Forecaster] Fitting Auto-ARIMA (simulated)...")
    last_price = df.iloc[-1]['price']
    forecast_dates = [datetime.today() + timedelta(days=i) for i in range(1, 8)]
    
    # Predict a continued increase due to recent high demand
    forecast_trend = np.linspace(0.1, 1.2, 7)
    forecast_noise = np.random.normal(0, 0.2, 7)
    predicted_prices = last_price + forecast_trend + forecast_noise
    
    forecast_df = pd.DataFrame({
        'date': [d.isoformat()[:10] for d in forecast_dates],
        'predicted_price': np.round(predicted_prices, 2)
    })
    
    # Calculate 7-day average prediction
    avg_7d_forecast = round(forecast_df['predicted_price'].mean(), 2)
    price_delta = round(avg_7d_forecast - last_price, 2)
    
    print(f"[Model: Price Forecaster] Complete. 7-Day Forecast Avg: INR {avg_7d_forecast} ({'+' if price_delta > 0 else ''}{price_delta})")
    
    return {
        "model_name": "Time-Series Auto-ARIMA",
        "target": "XP100_Price",
        "current_price": round(last_price, 2),
        "7d_forecast_avg": avg_7d_forecast,
        "price_delta": price_delta,
        "daily_forecasts": forecast_df.to_dict('records')
    }

if __name__ == "__main__":
    run_price_forecast()
