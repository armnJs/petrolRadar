'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ServerCrash, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service in production
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl text-center relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-red-500/5 dark:bg-red-600/10 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ServerCrash className="w-8 h-8" />
          </div>
          
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">502</h1>
          <h2 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-4">Pipeline Failure</h2>
          
          <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            The data science engine encountered an unexpected runtime error. We are unable to process the requested metrics at this moment.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
            <button
              onClick={() => reset()}
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/40 w-full sm:w-auto"
            >
              <RefreshCw className="w-4 h-4" />
              Reboot Engine
            </button>
            <Link 
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold px-6 py-3 rounded-xl transition-all w-full sm:w-auto"
            >
              Back to Map
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
