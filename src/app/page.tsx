'use client';

import Link from 'next/link';
import { ChevronRight, Map, Activity, BrainCircuit, Droplets, Globe, Zap, Database } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <Droplets className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight">PetrolRadar</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/analytics" className="text-sm font-bold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors hidden sm:block">
            ML Analytics
          </Link>
          <Link href="/map" className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold px-5 py-2.5 rounded-full text-sm hover:scale-105 transition-transform shadow-lg">
            Launch App
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center pt-20 pb-32 px-4 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter max-w-5xl leading-tight mb-8">
          Find High-Octane <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-sky-400">Premium Fuel.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-12 leading-relaxed">
          The definitive platform for locating XP100, Speed97, and Power99 stations across India. Backed by real-time data and advanced analytics.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link 
            href="/map" 
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto justify-center"
          >
            <Map className="w-5 h-5" />
            Explore the Map
          </Link>
          <Link 
            href="/analytics" 
            className="flex items-center gap-2 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-900 dark:text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-sm hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto justify-center group"
          >
            <Activity className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform" />
            View ML Analytics
          </Link>
        </div>
      </main>

      {/* Bento Grid Features */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-slate-200 dark:border-slate-800/60">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">A complete ecosystem.</h2>
          <p className="text-slate-600 dark:text-slate-400">Everything you need to track, analyze, and predict the premium automotive fuel market.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="md:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow group overflow-hidden relative">
            <div className="absolute -right-10 -top-10 text-slate-100 dark:text-slate-800/30 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
              <Globe className="w-64 h-64" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-sky-100 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 rounded-xl flex items-center justify-center mb-6">
                <Map className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Live Interactive Mapping</h3>
              <p className="text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
                Pinpoint over 120+ verified premium fuel stations across India. Filter dynamically by XP100, Speed97, Power99, and E20 availability in real-time.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-6">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">ML Forecasting</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Run continuous learning workflows. Our ensemble of Auto-ARIMA and XGBoost simulates deep demand forecasting.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center mb-6">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Crowdsourced Data</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Users can verify and request station listings. A self-healing data pipeline ensures maps stay accurate.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="md:col-span-2 bg-gradient-to-br from-indigo-900 to-slate-900 dark:from-indigo-950 dark:to-black border border-indigo-800/50 rounded-3xl p-8 shadow-xl text-white overflow-hidden relative">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mb-6 border border-white/20">
                <Activity className="w-6 h-6 text-indigo-300" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Business Intelligence</h3>
              <p className="text-indigo-200 max-w-md leading-relaxed mb-6">
                Access gorgeous macro-level analytics. Visualize fuel imports vs sales velocity and instantly identify supply chain deficits.
              </p>
              <Link href="/analytics" className="inline-flex items-center gap-2 text-sm font-bold text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors">
                View Dashboard <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200 dark:border-slate-800 py-12 text-center text-slate-500 dark:text-slate-400">
        <div className="flex flex-col items-center justify-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Droplets className="w-5 h-5" />
            <span className="font-bold text-slate-900 dark:text-white">Premium Petrol Radar</span>
          </div>
          <p className="text-sm">
            Created and Maintained by <a href="https://armaan-mangaonkar.vercel.app" target="_blank" rel="noopener noreferrer" className="font-bold text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">Armaan Mangaonkar</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
