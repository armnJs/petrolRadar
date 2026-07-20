'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Droplets } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();

  // Do not render the footer on the map page to preserve full-screen map UX
  if (pathname === '/map') {
    return null;
  }

  return (
    <footer className="relative z-10 border-t border-slate-200 dark:border-slate-800 py-6 px-6 mt-auto bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 dark:text-slate-400">
        
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4 text-indigo-500" />
          <span className="text-xs font-bold text-slate-900 dark:text-white">&copy; 2026 Premium Petrol Radar</span>
        </div>

        <p className="text-[10px] sm:text-xs">
          Engineered by <a href="https://armaan-mangaonkar.vercel.app" target="_blank" rel="noopener noreferrer" className="font-bold text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">Armaan Mangaonkar</a>
        </p>

        <div className="flex items-center gap-3">
          <Link href="/terms" className="text-[10px] sm:text-xs font-medium hover:text-slate-900 dark:hover:text-white transition-colors">
            Terms
          </Link>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <Link href="/privacy" className="text-[10px] sm:text-xs font-medium hover:text-slate-900 dark:hover:text-white transition-colors">
            Privacy
          </Link>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <a 
            href="https://medium.com/@armaanshaikh0706/the-green-transitions-blind-spot-how-we-built-a-machine-learning-radar-for-india-s-ultra-premium-9b7e744d2fd9" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[10px] sm:text-xs font-medium text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
          >
            Medium Case Study
          </a>
        </div>
      </div>
    </footer>
  );
}
