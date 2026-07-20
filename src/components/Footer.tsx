'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Droplets, Github, Linkedin } from 'lucide-react';

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

          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <Link href="/terms" className="min-h-[48px] min-w-[32px] flex items-center justify-center text-[10px] sm:text-xs font-medium hover:text-slate-900 dark:hover:text-white transition-colors">
              Terms
            </Link>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <Link href="/privacy" className="min-h-[48px] min-w-[32px] flex items-center justify-center text-[10px] sm:text-xs font-medium hover:text-slate-900 dark:hover:text-white transition-colors">
              Privacy
            </Link>
            <span className="text-slate-300 dark:text-slate-700 mx-1">•</span>
            <div className="flex items-center gap-2">
              <a 
                href="https://github.com/armnJs" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="min-h-[48px] min-w-[48px] flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="https://www.linkedin.com/in/armaan-mangaonkar-88620a298/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="min-h-[48px] min-w-[48px] flex items-center justify-center text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
  );
}
