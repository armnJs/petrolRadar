'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import type { FuelFilterMode } from '@/lib/types';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { AlertTriangle, TrendingUp, Droplets, BatteryCharging, Filter, Sparkles } from 'lucide-react';
import PredictionQueryModal from '@/components/PredictionQueryModal';

// Mock data reflecting fuel_imports_sales
const macroData = [
  { date: '10 Jul', import: 45000, sales: 42000 },
  { date: '11 Jul', import: 46000, sales: 43500 },
  { date: '12 Jul', import: 44000, sales: 45000 },
  { date: '13 Jul', import: 47000, sales: 48000 },
  { date: '14 Jul', import: 42000, sales: 46000 },
  { date: '15 Jul', import: 45000, sales: 65000 }, // Anomaly spike
  { date: '16 Jul', import: 48000, sales: 55000 },
];

// Mock data reflecting regional_fuel_usage for high octane
const gradeUsage = [
  { grade: 'XP100', usage: 1200 },
  { grade: 'Speed97', usage: 3500 },
  { grade: 'Power99', usage: 2200 },
  { grade: 'XP95', usage: 15000 },
];

import advancedPredictions from '../../../scripts/analytics_engine/advanced_predictions.json';

export default function AnalyticsDashboard() {
  const [filterMode, setFilterMode] = useState<FuelFilterMode>('ultra-premium');
  const [mounted, setMounted] = useState(false);
  const [queryModalOpen, setQueryModalOpen] = useState(false);
  
  // Dynamic Filters State
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedLocation, setSelectedLocation] = useState('All Regions');
  const [selectedGrade, setSelectedGrade] = useState('All Grades');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <Header
        onReportClick={() => {}}
        onToggleSidebar={() => {}}
        sidebarOpen={false}
        filterMode={filterMode}
        onFilterChange={setFilterMode}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 overflow-y-auto custom-scrollbar">
        
        {/* Header & Actions */}
        <div className="mb-8 flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">Analytics & Intelligence</h1>
            <p className="text-slate-500 dark:text-slate-400">Data science insights, supply chain tracking, and automated edge-case predictions.</p>
          </div>
          
          <button
            onClick={() => setQueryModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl transition-all duration-300 shadow-md shadow-indigo-500/20 whitespace-nowrap"
          >
            <Sparkles className="w-5 h-5" />
            Run Custom ML Query
          </button>
        </div>

        {/* Global Filters */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm mb-8 flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mr-2">
            <Filter className="w-5 h-5" />
            <span className="text-sm font-bold">Filters:</span>
          </div>
          
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="2026">2026</option>
            <option value="2025">2025</option>
          </select>

          <select 
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="All Regions">All Regions</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi NCR">Delhi NCR</option>
            <option value="Bengaluru">Bengaluru</option>
          </select>

          <select 
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="All Grades">All Grades</option>
            <option value="XP100">XP100</option>
            <option value="Speed97">Speed97</option>
            <option value="E20">E20</option>
          </select>
        </div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-600 dark:text-slate-400">Total Import Vol (7d)</h3>
            </div>
            <p className="text-2xl font-extrabold">317,000 <span className="text-sm font-medium text-slate-500">kL</span></p>
          </div>
          
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
                <Droplets className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-600 dark:text-slate-400">Total Sales Vol (7d)</h3>
            </div>
            <p className="text-2xl font-extrabold">344,500 <span className="text-sm font-medium text-slate-500">kL</span></p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg">
                <BatteryCharging className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-600 dark:text-slate-400">Avg Deficit Ratio</h3>
            </div>
            <p className="text-2xl font-extrabold">1.08 <span className="text-sm font-medium text-amber-500 ml-2">↑ High Demand</span></p>
          </div>
          
          <div className="bg-white dark:bg-slate-900 border border-amber-500/50 rounded-2xl p-5 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10">
              <AlertTriangle className="w-24 h-24 text-amber-500" />
            </div>
            <div className="flex items-center gap-3 mb-2 relative z-10">
              <div className="p-2 bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-lg animate-pulse">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-600 dark:text-slate-400">Active Edge Cases</h3>
            </div>
            <p className="text-2xl font-extrabold relative z-10">1 <span className="text-sm font-medium text-slate-500">Region Flagged</span></p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Main Area Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-6">Macro Supply vs Demand (kL)</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={macroData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorImport" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} vertical={false} />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val/1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Area type="monotone" dataKey="import" name="Import Volume" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorImport)" />
                  <Area type="monotone" dataKey="sales" name="Sales Volume" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-6">High-Octane Usage (Litres)</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gradeUsage} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} vertical={false} />
                  <XAxis dataKey="grade" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val/1000}k`} />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff' }}
                  />
                  <Bar dataKey="usage" name="Daily Usage" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Predictive Workflows Output */}
        <div className="mt-4">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Automated ML Engine Output</h2>
            <div className="px-3 py-1 bg-indigo-500/10 text-indigo-500 text-xs font-bold rounded-full border border-indigo-500/20">
              Pipeline Active
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Price Forecaster */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-slate-800 dark:text-white">Price Forecast (XP100)</h3>
                <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded">Auto-ARIMA</span>
              </div>
              
              <div className="flex items-end gap-3 mb-6">
                <div className="text-4xl font-extrabold text-slate-900 dark:text-white">
                  ₹{advancedPredictions.results.price_forecast['7d_forecast_avg'].toFixed(2)}
                </div>
                <div className="text-sm font-bold text-red-500 mb-1 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +{advancedPredictions.results.price_forecast.price_delta.toFixed(2)} vs today
                </div>
              </div>
              
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={advancedPredictions.results.price_forecast.daily_forecasts} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} vertical={false} />
                    <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => val.split('-')[2]} />
                    <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} domain={['dataMin - 1', 'dataMax + 1']} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff' }} />
                    <Line type="monotone" dataKey="predicted_price" name="Predicted Price" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4, fill: '#f43f5e' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Demand & Availability */}
            <div className="space-y-6">
              
              {/* Demand Spikes */}
              <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-500/20 text-amber-600 dark:text-amber-500 rounded-xl flex-shrink-0">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div className="w-full">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-amber-500">Critical Demand Spikes</h3>
                      <span className="text-xs bg-amber-200/50 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 px-2 py-1 rounded border border-amber-500/20">XGBoost</span>
                    </div>
                    
                    <div className="space-y-3 mt-4">
                      {advancedPredictions.results.demand_forecast.critical_spikes.length > 0 ? (
                        advancedPredictions.results.demand_forecast.critical_spikes.map((spike: any, i: number) => (
                          <div key={i} className="flex justify-between items-center bg-white/60 dark:bg-black/20 p-3 rounded-lg border border-amber-500/20">
                            <div>
                              <span className="font-bold text-slate-800 dark:text-slate-200">{spike.region}</span>
                              <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">• {spike.grade}</span>
                            </div>
                            <div className="font-bold text-amber-600 dark:text-amber-400">
                              +{spike.pct_change_vs_avg.toFixed(1)}% Demand
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-slate-500 dark:text-slate-400 italic py-4">No critical demand spikes detected in the current forecast window.</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* High Risk Stations */}
              <div className="bg-red-50 dark:bg-red-500/10 border border-red-500/30 rounded-2xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-500/20 text-red-600 dark:text-red-500 rounded-xl flex-shrink-0">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div className="w-full">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-red-500">High-Risk Stations (Stock Out)</h3>
                      <span className="text-xs bg-red-200/50 dark:bg-red-500/20 text-red-700 dark:text-red-400 px-2 py-1 rounded border border-red-500/20">Random Forest</span>
                    </div>
                    
                    <div className="space-y-3 mt-4">
                      {advancedPredictions.results.availability_classification.station_predictions.filter((p: any) => p.stock_out_probability > 0.7).length > 0 ? (
                        advancedPredictions.results.availability_classification.station_predictions
                          .filter((p: any) => p.stock_out_probability > 0.7)
                          .map((station: any, i: number) => (
                          <div key={i} className="flex justify-between items-center bg-white/60 dark:bg-black/20 p-3 rounded-lg border border-red-500/20">
                            <div>
                              <span className="font-bold text-slate-800 dark:text-slate-200">{station.station_name}</span>
                            </div>
                            <div className="font-bold text-red-600 dark:text-red-400 flex items-center">
                              {(station.stock_out_probability * 100).toFixed(0)}% Risk
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-slate-500 dark:text-slate-400 italic py-4">All stations are currently operating at stable stock levels.</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </main>

      {/* Interactive Query Modal */}
      {queryModalOpen && (
        <PredictionQueryModal onClose={() => setQueryModalOpen(false)} />
      )}
    </div>
  );
}
