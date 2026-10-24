import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function NewsletterConfirmPage() {
  return (
    <div className="bg-white min-h-[60vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl bg-white border border-[#e6d58f] shadow-sm">
        <div className="w-16 h-16 rounded-full bg-[#f2f9f5] text-[#036c3e] border border-[#b6960b]/40 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 text-[#b6960b]" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-[#036c3e]">Subscription Confirmed</h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Thank you for subscribing to Akufai Capital & Equities updates and selected reflections.
          </p>
        </div>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#036c3e] hover:bg-[#02522f] text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
          >
            <span>Return to Homepage</span>
            <ArrowRight className="w-4 h-4 text-[#d4b429]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
