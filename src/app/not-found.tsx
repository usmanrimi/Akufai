import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="bg-white min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-[#008751] uppercase tracking-widest">
            ERROR 404
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Page not found
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            The page or perspective you are seeking does not exist or has been relocated within our architecture.
          </p>
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#008751] hover:bg-[#056839] text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
          <Link
            href="/investment"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-semibold rounded-lg border border-slate-200 transition-all"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Investment Focus</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
