import Link from 'next/link';
import { ChevronRight, Map, Activity, BrainCircuit, Droplets, Fuel, Database, Flame, Search, BarChart3, BookOpen, ExternalLink, MessageSquare } from 'lucide-react';

export default function LandingPage() {

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="relative z-10 w-full max-w-[1600px] mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
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
          <Link href="/map" className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold px-5 py-2.5 rounded-xl text-sm hover:scale-105 transition-transform shadow-lg">
            Launch App
          </Link>
        </div>
      </nav>

      {/* Master Bento Grid - F-Pattern Layout */}
      <main className="relative z-10 max-w-[1600px] mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-12">
        
        {/* ROW 1: TOP BAR OF THE 'F' (Full Width) */}
        {/* 1. Hero Cell */}
        <div className="md:col-span-4 bg-gradient-to-br from-slate-900 to-black dark:from-slate-900 dark:to-black rounded-3xl p-8 md:p-14 flex flex-col justify-center relative border border-slate-800 text-white shadow-xl overflow-hidden group">
          <div className="absolute top-0 right-10 p-8 opacity-20 pointer-events-none group-hover:scale-110 transition-transform duration-700">
            <Fuel className="w-64 h-64 text-indigo-500" />
          </div>
          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-6">
              <Activity className="w-4 h-4" /> Live Network
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] mb-6">
              Find High-Octane <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">Premium Fuel.</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mb-8 leading-relaxed">
              The definitive platform for locating XP100, Speed97, and Power99 stations across India. Backed by real-time crowdsourcing and advanced ML predictive analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/map" className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-4 rounded-xl transition-all">
                <Map className="w-5 h-5" /> Explore Map
              </Link>
              <Link href="/analytics" className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold px-6 py-4 rounded-xl transition-all">
                View ML Dashboard <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* ROW 2: MIDDLE BAR OF THE 'F' */}
        {/* 2. Fuel Types Cell (Wide left) */}
        <div className="md:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-center">
          <h3 className="text-xl font-bold mb-6">Exclusive Fuel Tracking</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold">XP100 & Speed 97</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">100/97 RON fuels exclusively for supercars & superbikes.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Search className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold">E0 / Low-Ethanol</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Protect older ICE vehicles from E20 corrosion tracking.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Feature: Crowdsourcing (Right side dropoff) */}
        <div className="md:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-center">
          <div className="w-10 h-10 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center mb-4">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="font-bold mb-2">Crowdsourced Integrity</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Users actively verify, request, and update station pipelines.</p>
        </div>

        {/* ROW 3/4: VERTICAL STEM OF THE 'F' (Left) AND FILLER (Right) */}
        
        {/* 4. LinkedIn Embed Cell (Tall left column) */}
        <div className="md:col-span-2 lg:row-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold">
              <MessageSquare className="w-5 h-5" /> Launch Post
            </div>
          </div>
          <div className="w-full flex-grow flex justify-center bg-slate-50 dark:bg-slate-950 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
            <iframe 
              src="https://www.linkedin.com/embed/feed/update/urn:li:share:7484827108448468992?collapsed=1" 
              height="509" 
              width="100%" 
              frameBorder="0" 
              allowFullScreen={true} 
              title="Embedded post"
              className="max-w-[504px] w-full"
            ></iframe>
          </div>
        </div>

        {/* 5. How it Works Cell (Right side) */}
        <div className="md:col-span-2 bg-slate-200/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-center">
          <h3 className="font-bold mb-6">How it Works</h3>
          <ol className="relative border-l border-slate-300 dark:border-slate-600 ml-3 space-y-6">
            <li className="pl-6 relative">
              <div className="absolute w-5 h-5 bg-indigo-600 rounded-full -left-[10px] flex items-center justify-center text-[9px] font-bold text-white border-2 border-slate-50 dark:border-slate-900">1</div>
              <h4 className="text-sm font-bold">API Ingestion</h4>
              <p className="text-xs text-slate-500 mt-1">Automated geospatial polling.</p>
            </li>
            <li className="pl-6 relative">
              <div className="absolute w-5 h-5 bg-indigo-600 rounded-full -left-[10px] flex items-center justify-center text-[9px] font-bold text-white border-2 border-slate-50 dark:border-slate-900">2</div>
              <h4 className="text-sm font-bold">Live Mapping</h4>
              <p className="text-xs text-slate-500 mt-1">Filter dynamically via dashboard.</p>
            </li>
            <li className="pl-6 relative">
              <div className="absolute w-5 h-5 bg-indigo-600 rounded-full -left-[10px] flex items-center justify-center text-[9px] font-bold text-white border-2 border-slate-50 dark:border-slate-900">3</div>
              <h4 className="text-sm font-bold">Data Science</h4>
              <p className="text-xs text-slate-500 mt-1">Predictive supply warnings.</p>
            </li>
          </ol>
        </div>

        {/* 6. Feature: ML Engine (Bottom right) */}
        <div className="md:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-center">
          <div className="w-10 h-10 bg-sky-100 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 rounded-xl flex items-center justify-center mb-4">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <h3 className="font-bold mb-2">Predictive ML Engine</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Prophet & XGBoost models forecast future fuel stockouts.</p>
        </div>

        {/* 7. Medium Article Cell (Bottom right) */}
        <div className="md:col-span-1 bg-indigo-600 dark:bg-indigo-900 border border-indigo-500 dark:border-indigo-700 rounded-3xl p-6 text-white shadow-sm flex flex-col justify-between group">
          <div>
            <BookOpen className="w-6 h-6 mb-4 text-indigo-300" />
            <h3 className="text-lg font-bold mb-2 leading-tight">Architecture Deep Dive</h3>
            <p className="text-indigo-200 text-xs leading-relaxed mb-6">
              How we built a Machine Learning Radar for India’s Ultra-Premium Fuel.
            </p>
          </div>
          <Link href="/articles" className="inline-flex items-center gap-2 bg-white text-indigo-900 font-bold px-4 py-2 rounded-xl text-sm transition-transform hover:scale-105 shadow-md w-full justify-center">
            Read <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

      </main>

    </div>
  );
}
