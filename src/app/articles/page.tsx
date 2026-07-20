import { BookOpen, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12 font-sans selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Radar
        </Link>
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
              Articles & Case Studies
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Deep dives into the architecture, data science, and mission behind Premium Petrol Radar.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* LinkedIn Embed Section */}
          <div className="flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Live Launch Post</h2>
            </div>
            
            <div className="w-full flex justify-center bg-slate-50 dark:bg-slate-950 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
              <iframe 
                src="https://www.linkedin.com/embed/feed/update/urn:li:share:7484827108448468992" 
                height="800" 
                width="100%" 
                frameBorder="0" 
                allowFullScreen={true} 
                title="Embedded post"
                className="max-w-[504px] w-full"
              ></iframe>
            </div>
          </div>

          {/* Medium Article Section */}
          <div className="flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm sticky top-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Architecture Deep Dive</h2>
            </div>

            <div className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 transition-all hover:shadow-xl hover:shadow-indigo-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 pointer-events-none"></div>
              <div className="p-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-6">
                  Medium Publication
                </div>
                
                <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  The Green Transition’s Blind Spot: How We Built a Machine Learning Radar for India’s Ultra-Premium Fuel Supply
                </h3>
                
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                  As the nation aggressively pushes toward an E20 (20% ethanol blend) standard, a niche but passionate community has been left in a high-compression bind. Read the full engineering breakdown of how we solved this infrastructure blind spot with Data Science and modern web architecture.
                </p>
                
                <a 
                  href="https://medium.com/@armaanshaikh0706/the-green-transitions-blind-spot-how-we-built-a-machine-learning-radar-for-india-s-ultra-premium-9b7e744d2fd9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold px-6 py-3 rounded-xl transition-transform hover:scale-105 shadow-md"
                >
                  Read Full Article <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
