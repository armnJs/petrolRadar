import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12 font-sans selection:bg-indigo-500/30">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Radar
        </Link>
        
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-12 shadow-sm">
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-200 dark:border-slate-800">
            <div className="w-12 h-12 bg-sky-100 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 rounded-xl flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white">Privacy Policy</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">Last updated: July 2026</p>
            </div>
          </div>
          
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2>1. Data Collection & Geolocation</h2>
            <p>Premium Petrol Radar may request access to your device's geolocation to center the interactive map and provide distance calculations to nearby premium fuel stations. This location data is processed locally on your device and is not permanently stored or linked to any personally identifiable information on our servers.</p>
            
            <h2>2. Crowdsourced Intelligence</h2>
            <p>When you utilize the "Request Area" or "Report Pump" features, the coordinates and metadata (e.g., fuel grade availability) you submit are ingested into our PostgreSQL/Supabase database. This data becomes part of the public intelligence graph. Please do not submit personal details in these forms.</p>
            
            <h2>3. Machine Learning Analytics</h2>
            <p>Queries submitted to our predictive Machine Learning engine are logged anonymously in the <code>ml_prediction_queries</code> database table. We store the query text, the generated prediction, and later reconcile it with actual outcomes to calculate model drift (accuracy delta) for continuous reinforcement learning. No user IP addresses or user accounts are tied to these queries.</p>
            
            <h2>4. Third-Party Services</h2>
            <p>We utilize the following infrastructure and third-party services:</p>
            <ul>
              <li><strong>Vercel:</strong> For edge hosting, routing, and analytics.</li>
              <li><strong>Supabase:</strong> For secure database hosting and Row Level Security.</li>
              <li><strong>OpenStreetMap / Leaflet:</strong> For rendering mapping tiles.</li>
            </ul>
            <p>These services may collect anonymized telemetry data in accordance with their respective privacy policies.</p>
            
            <h2>5. Contact Us</h2>
            <p>For data removal requests or privacy concerns, please contact the developer, Armaan Mangaonkar, through the portfolio link provided in the application footer.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
