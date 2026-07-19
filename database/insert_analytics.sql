-- ============================================================
-- Premium Petrol Radar — Mock Analytics Data Insertion
-- ============================================================

-- Insert macro level Import vs Sales volume for the last 5 days
INSERT INTO public.fuel_imports_sales (region, fuel_type, import_volume_kl, sales_volume_kl, record_date)
VALUES 
  ('Maharashtra', 'Petrol', 45000.00, 42000.00, CURRENT_DATE - INTERVAL '5 days'),
  ('Maharashtra', 'Diesel', 60000.00, 58000.00, CURRENT_DATE - INTERVAL '5 days'),
  ('Maharashtra', 'Petrol', 46000.00, 43500.00, CURRENT_DATE - INTERVAL '4 days'),
  ('Maharashtra', 'Diesel', 59000.00, 59500.00, CURRENT_DATE - INTERVAL '4 days'),
  ('Maharashtra', 'Petrol', 44000.00, 45000.00, CURRENT_DATE - INTERVAL '3 days'),
  ('Maharashtra', 'Diesel', 62000.00, 61000.00, CURRENT_DATE - INTERVAL '3 days'),
  ('Maharashtra', 'Petrol', 47000.00, 48000.00, CURRENT_DATE - INTERVAL '2 days'),
  ('Maharashtra', 'Diesel', 60500.00, 62000.00, CURRENT_DATE - INTERVAL '2 days'),
  ('Maharashtra', 'Petrol', 42000.00, 46000.00, CURRENT_DATE - INTERVAL '1 day'),
  ('Maharashtra', 'Diesel', 58000.00, 61500.00, CURRENT_DATE - INTERVAL '1 day');

-- Insert granular usage data for high-octane fuels vs standard fuels
INSERT INTO public.regional_fuel_usage (city, grade_name, daily_consumption_litres, record_date)
VALUES 
  ('Mumbai', 'XP100', 1200, CURRENT_DATE - INTERVAL '5 days'),
  ('Mumbai', 'Speed97', 3500, CURRENT_DATE - INTERVAL '5 days'),
  ('Mumbai', 'E20', 210000, CURRENT_DATE - INTERVAL '5 days'),
  ('Mumbai', 'XP100', 1350, CURRENT_DATE - INTERVAL '4 days'),
  ('Mumbai', 'Speed97', 3800, CURRENT_DATE - INTERVAL '4 days'),
  ('Mumbai', 'E20', 225000, CURRENT_DATE - INTERVAL '4 days'),
  ('Mumbai', 'XP100', 1800, CURRENT_DATE - INTERVAL '3 days'), -- Weekend Spike
  ('Mumbai', 'Speed97', 4200, CURRENT_DATE - INTERVAL '3 days'),
  ('Mumbai', 'E20', 250000, CURRENT_DATE - INTERVAL '3 days'),
  ('Mumbai', 'XP100', 1900, CURRENT_DATE - INTERVAL '2 days'), -- Weekend Spike
  ('Mumbai', 'Speed97', 4400, CURRENT_DATE - INTERVAL '2 days'),
  ('Mumbai', 'E20', 260000, CURRENT_DATE - INTERVAL '2 days'),
  ('Mumbai', 'XP100', 1100, CURRENT_DATE - INTERVAL '1 day'),
  ('Mumbai', 'Speed97', 3200, CURRENT_DATE - INTERVAL '1 day'),
  ('Mumbai', 'E20', 195000, CURRENT_DATE - INTERVAL '1 day');

-- Insert predictive edge-case model outputs (e.g. flagging a potential shortage in Pune due to high sales volume)
INSERT INTO public.supply_predictions (city, grade_name, shortage_probability, predicted_exhaustion_date, model_version)
VALUES 
  ('Pune', 'Speed97', 0.85, CURRENT_TIMESTAMP + INTERVAL '2 days', 'xgboost-v1.2'),
  ('Mumbai', 'XP100', 0.15, CURRENT_TIMESTAMP + INTERVAL '14 days', 'xgboost-v1.2'),
  ('Delhi', 'Power99', 0.60, CURRENT_TIMESTAMP + INTERVAL '4 days', 'xgboost-v1.2');
