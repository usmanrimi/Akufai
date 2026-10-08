import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getInvestmentAreas } from '@/lib/db';
import { ArrowRight, Check } from 'lucide-react';
import InteractiveInvestmentAreas from '@/components/investment/InteractiveInvestmentAreas';

export const metadata: Metadata = {
  title: 'Investment Focus | Akufai Capital & Equities',
  description:
    'Our core investment focus areas: Healthtech, Artificial Intelligence, Fintech, Infrastructure & Enabling Systems, African Markets & Cross-border Ventures, and Private Deals.',
};

export const revalidate = 0;

export default async function InvestmentPage() {
  const areas = getInvestmentAreas();

  return (
    <div className="bg-white">
      {/* 1. High-Contrast Brand Color Hero */}
      <section className="py-20 lg:py-28 bg-[#071910] text-white relative overflow-hidden border-b border-[#0d2a1b]">
        <div className="absolute inset-0 bg-radial from-[#008751]/25 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <h1
            style={{ color: '#ffffff' }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white !text-white tracking-tight leading-[1.12]"
          >
            Investment Focus
          </h1>
          <p
            style={{ color: '#d1fae5' }}
            className="text-lg sm:text-xl !text-emerald-100/95 leading-relaxed max-w-2xl mx-auto font-medium"
          >
            Akufai reviews opportunities selectively across multiple sectors, with particular interest in ventures and businesses that show strong leadership, clear market need, and long-term value creation potential.
          </p>
        </div>
      </section>

      {/* 2. Structured Strategic Pillars */}
      <section className="py-16 lg:py-20 bg-[#f8faf8] border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border border-slate-200/90 bg-white hover:border-[#008751]/50 hover:shadow-md transition-all duration-300 space-y-4 shadow-xs">
              <span className="text-3xl sm:text-4xl font-mono font-black text-[#b6950b]">01</span>
              <h3 className="text-lg font-bold text-slate-900">Foundational Real-World Utility</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We invest in companies addressing foundational economic challenges—power, healthcare, finance, logistics—rather than transient consumer trends.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-slate-200/90 bg-white hover:border-[#008751]/50 hover:shadow-md transition-all duration-300 space-y-4 shadow-xs">
              <span className="text-3xl sm:text-4xl font-mono font-black text-[#b6950b]">02</span>
              <h3 className="text-lg font-bold text-slate-900">Patient & Aligned Capital</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We provide patient capital structured for resilient compounding, insulating high-conviction founders from artificial short-term pressures.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-slate-200/90 bg-white hover:border-[#008751]/50 hover:shadow-md transition-all duration-300 space-y-4 shadow-xs">
              <span className="text-3xl sm:text-4xl font-mono font-black text-[#b6950b]">03</span>
              <h3 className="text-lg font-bold text-slate-900">Regional & Global Scalability</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Focus on ventures designed with cross-border architectures that unlock multi-market scale and currency resilience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Detailed 6 Investment Areas */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <InteractiveInvestmentAreas areas={areas} />
      </section>

      {/* 4. Inquiry & Submission Callout */}
      <section className="py-16 lg:py-20 bg-[#f8faf8] border-t border-slate-200/70 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Submit a venture or co-investment opportunity
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
            We are especially interested in ventures addressing significant social and economic challenges through durable, well-led business models.
          </p>
          <div className="pt-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-[#008751] hover:bg-[#056839] rounded-lg shadow-sm transition-all duration-200 group"
            >
              <span>Submit an Opportunity</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
