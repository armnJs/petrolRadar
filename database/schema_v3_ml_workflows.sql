-- ==============================================================================
-- Premium Petrol Radar — V3 Schema: ML Workflows & Continuous Learning
-- ==============================================================================

-- 0. Create the trigger function first so PostgreSQL can find it
CREATE OR REPLACE FUNCTION public.update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 1. Create the ml_prediction_queries table
CREATE TABLE public.ml_prediction_queries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Updated to native gen_random_uuid() if uuid_generate_v4() extension isn't loaded
    
    -- Query Context
    user_query TEXT NOT NULL,
    target_location VARCHAR(100),
    target_grade VARCHAR(50),
    target_timeframe VARCHAR(50),
    
    -- Model Execution
    model_version VARCHAR(50) DEFAULT 'v1.2-beta',
    execution_time_ms INTEGER,
    
    -- Outputs
    predicted_value NUMERIC(10, 2), -- e.g., predicted demand in kL, or price
    confidence_score NUMERIC(3, 2), -- 0.00 to 1.00
    
    -- Reinforcement Learning (Filled later when actual data arrives)
    actual_outcome NUMERIC(10, 2), 
    accuracy_delta NUMERIC(10, 2),
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Indexing for fast ML training data retrieval
CREATE INDEX idx_ml_queries_location ON public.ml_prediction_queries(target_location);
CREATE INDEX idx_ml_queries_grade ON public.ml_prediction_queries(target_grade);
CREATE INDEX idx_ml_queries_created_at ON public.ml_prediction_queries(created_at);

-- 3. Add updated_at trigger (Now it will find the function perfectly)
CREATE TRIGGER trg_ml_queries_updated_at
    BEFORE UPDATE ON public.ml_prediction_queries
    FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();

-- 4. Enable RLS (Row Level Security)
ALTER TABLE public.ml_prediction_queries ENABLE ROW LEVEL SECURITY;

-- 5. Policies
CREATE POLICY "Allow public inserts for ML queries" ON public.ml_prediction_queries
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public reads for ML queries" ON public.ml_prediction_queries
    FOR SELECT USING (true);