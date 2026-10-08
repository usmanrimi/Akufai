import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function NewsletterConfirmPage() {
  return (
    <div className="bg-white min-h-[60vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl bg-slate-50 border border-slate-200">
        <div className="w-16 h-16 rounded-full bg-[#f0fdf4] text-[#008751] border border-[#dcfce7] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-900">Subscription Confirmed</h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Thank you for subscribing to Akufai Capital & Equities updates and selected reflections.
          </p>
        </div>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#008751] hover:bg-[#056839] text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
          >
            <span>Return to Homepage</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
