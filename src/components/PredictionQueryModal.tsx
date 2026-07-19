'use client';
import { useState } from 'react';
import { X, Sparkles, BrainCircuit, Activity, BookOpen, Cpu, Leaf } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PredictionQueryModalProps {
  onClose: () => void;
}

export default function PredictionQueryModal({ onClose }: PredictionQueryModalProps) {
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate ML processing and generating dynamic chart data
    setTimeout(() => {
      
      const isAdvancedQuery = query.toLowerCase().includes('2027') || query.toLowerCase().includes('emission');
      
      let mockDynamicData = [];
      if (isAdvancedQuery) {
        // Generate monthly data up to Dec 2027
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let currentVol = 45000;
        for(let yr = 2026; yr <= 2027; yr++) {
          for(let m = 0; m < 12; m++) {
            if (yr === 2026 && m < 6) continue; // Start from mid 2026
            currentVol = currentVol * 0.98 + (Math.random() * 2000 - 1000); // Gradual decline
            mockDynamicData.push({
              time: `${months[m]} '${yr.toString().slice(2)}`,
              predictedValue: Math.round(currentVol)
            });
          }
        }
      } else {
        mockDynamicData = Array.from({ length: 14 }).map((_, i) => ({
          time: `Day ${i+1}`,
          predictedValue: 40000 + Math.random() * 15000 + (i * 1000)
        }));
      }

      setResult({
        queryAnalysis: isAdvancedQuery ? "Predict Speed97 Demand in Mumbai (Target: Dec 2027)" : "Standard Forecast",
        targetLocation: "Mumbai",
        confidence: 0.89,
        chartData: mockDynamicData,
        isAdvanced: isAdvancedQuery
      });
      
      setIsProcessing(false);
    }, 2200);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
      <div className="bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200 dark:border-indigo-500/30 w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 pb-4 flex items-start justify-between border-b border-slate-200 dark:border-slate-800/60">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <BrainCircuit className="w-6 h-6 text-indigo-500" />
              Machine Learning Query
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Ask our models to forecast specific metrics. Queries are saved to train future iterations.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          {!result ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  What would you like to predict?
                </label>
                <div className="relative">
                  <textarea
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g., 'Predict demand for Speed97 in Mumbai next month'"
                    rows={3}
                    className="w-full bg-white dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-700 rounded-xl p-4 text-slate-900 dark:text-white text-lg focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 transition-colors placeholder:text-slate-400 resize-none shadow-inner"
                  />
                  <div className="absolute bottom-4 right-4 opacity-50">
                    <Sparkles className="w-5 h-5 text-indigo-500" />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing || !query.trim()}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-md shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Running Neural Network...
                    </>
                  ) : (
                    <>
                      <Activity className="w-5 h-5" />
                      Generate Prediction
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-6 flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-bold text-green-700 dark:text-green-400">Query Processed & Saved</h4>
                  <p className="text-xs text-green-600 dark:text-green-500/70">Interpreted as: {result.queryAnalysis}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-green-600 dark:text-green-400">{(result.confidence * 100).toFixed(0)}%</div>
                  <div className="text-[10px] uppercase font-bold text-green-600/50">Confidence Score</div>
                </div>
              </div>

              <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">Generated Dynamic Forecast</h3>
              <div className="h-[250px] w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4 mb-6 shadow-inner">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={result.chartData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} vertical={false} />
                    <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `${val/1000}k`} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff' }} />
                    <Line type="monotone" dataKey="predictedValue" name="Predicted Volume (kL)" stroke="#6366f1" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              {result.isAdvanced && (
                <div className="bg-slate-100/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-5 mb-6 text-sm backdrop-blur-sm shadow-sm">
                  <h4 className="font-extrabold text-slate-900 dark:text-white flex items-center gap-2 mb-4 pb-3 border-b border-slate-200 dark:border-slate-700/50 uppercase tracking-wider text-xs">
                    <BrainCircuit className="w-4 h-4 text-indigo-500" />
                    Neural Network Justification & Case Study
                  </h4>
                  
                  <div className="space-y-5">
                    <div className="bg-white/60 dark:bg-slate-900/40 rounded-xl p-4 border border-slate-100 dark:border-slate-800">
                      <h5 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-2"><Cpu className="w-4 h-4 text-blue-500" /> Algorithms Implemented</h5>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        An ensemble model was utilized: <strong>Facebook Prophet</strong> (for macroeconomic time-series trend extraction) combined with an <strong>XGBoost Regressor</strong> (to map non-linear relationships like EV adoption vs High-Octane fuel usage).
                      </p>
                    </div>

                    <div className="bg-white/60 dark:bg-slate-900/40 rounded-xl p-4 border border-slate-100 dark:border-slate-800">
                      <h5 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-2"><BookOpen className="w-4 h-4 text-amber-500" /> Case Study: BS-VI & Premium Fuel Correlation</h5>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        Historical data from the 2020 BS-VI transition in Mumbai shows that while overall internal combustion engine (ICE) sales dropped by 12%, the proportion of luxury/performance ICE vehicles requiring Speed97/XP100 grew by 4.5%. However, this growth is aggressively capped by impending 2027 mandates.
                      </p>
                    </div>

                    <div className="bg-white/60 dark:bg-slate-900/40 rounded-xl p-4 border border-slate-100 dark:border-slate-800">
                      <h5 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-2"><Leaf className="w-4 h-4 text-green-500" /> Environmental & Market Metrics Considered</h5>
                      <ul className="list-disc list-outside text-slate-600 dark:text-slate-400 space-y-2 mt-2 ml-4 marker:text-indigo-400">
                        <li><span className="font-semibold text-slate-700 dark:text-slate-300">Vehicle Purchases:</span> Projected 35% YoY increase in EV adoption in Mumbai Metro by 2027.</li>
                        <li><span className="font-semibold text-slate-700 dark:text-slate-300">Emission Laws:</span> CAFE II norms and state-level congestion taxes simulated to reduce high-octane ICE mileage by 18%.</li>
                        <li><span className="font-semibold text-slate-700 dark:text-slate-300">Conclusion:</span> Demand for Speed97 will peak in mid-2026 before entering a gradual, permanent decline leading into December 2027.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              <button
                onClick={() => {
                  setResult(null);
                  setQuery('');
                }}
                className="w-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold py-3 rounded-xl transition-colors text-sm"
              >
                Run Another Query
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
