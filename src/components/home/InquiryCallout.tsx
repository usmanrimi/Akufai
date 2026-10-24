import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function InquiryCallout() {
  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-100 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#036c3e] tracking-tight">
          For aligned inquiries
        </h2>

        <div className="max-w-2xl mx-auto space-y-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          <p>
            Akufai welcomes a limited number of aligned inquiries, strategic introductions, and partnership conversations.
          </p>
          <p>
            For relevant opportunities or thoughtful introductions, please get in touch via the contact form or email.
          </p>
        </div>

        <div className="pt-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-white bg-[#036c3e] hover:bg-[#02522f] border border-[#b6960b]/30 rounded-lg shadow-md hover:shadow-lg transition-all active:scale-[0.98] group"
          >
            <span>GET IN TOUCH</span>
            <ArrowRight className="w-4 h-4 text-[#d4b429] group-hover:text-white transition-all duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
