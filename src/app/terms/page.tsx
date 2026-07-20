import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

export default function TermsPage() {
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
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white">Terms & Conditions</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">Last updated: July 2026</p>
            </div>
          </div>
          
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using Premium Petrol Radar (the "Service"), you accept and agree to be bound by the terms and provision of this agreement. The Service is engineered for high-performance automotive enthusiasts and data analysts tracking India's premium fuel supply.</p>
            
            <h2>2. User-Generated Content & Crowdsourcing</h2>
            <p>Users may submit fuel station coordinates, fuel grades (XP100, Speed97, E20), and operational status. By submitting data, you grant us a non-exclusive, royalty-free license to use, verify, modify, and display the data. We reserve the right to remove unverified or malicious submissions via our automated data pipelines or manual review.</p>
            
            <h2>3. Machine Learning & Predictive Output</h2>
            <p>The Service utilizes predictive machine learning models (including Auto-ARIMA and XGBoost) to simulate and forecast regional fuel demand and pricing. These outputs are for informational and analytical purposes only. We do not guarantee the accuracy of future predictions or real-time fuel stock at physical pumps.</p>
            
            <h2>4. Service Availability & Limits</h2>
            <p>We provide the Service on an "as is" and "as available" basis. We reserve the right to throttle API requests or ML query submissions to prevent database overload and maintain operational integrity.</p>
            
            <h2>5. Liability</h2>
            <p>Premium Petrol Radar and its creator, Armaan Mangaonkar, shall not be held liable for any damages, engine damage from incorrect fuel usage, or travel expenses incurred relying upon the Service's data. Always verify fuel grades physically at the station.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
