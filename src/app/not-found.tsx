import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="bg-white min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-[#b6960b] uppercase tracking-widest">
            ERROR 404
          </span>
          <h1 className="text-4xl font-extrabold text-[#036c3e] tracking-tight">
            Page not found
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            The page or perspective you are seeking does not exist or has been relocated within our architecture.
          </p>
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#036c3e] hover:bg-[#02522f] text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
          >
            <Home className="w-3.5 h-3.5 text-[#d4b429]" />
            <span>Return to Home</span>
          </Link>
          <Link
            href="/investment"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#b6960b] hover:bg-[#9e8109] text-[#042f1b] hover:text-white text-xs font-bold rounded-lg border border-[#b6960b] transition-all"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Investment Focus</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
