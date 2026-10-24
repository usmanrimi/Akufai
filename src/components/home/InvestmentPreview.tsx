import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { InvestmentArea } from '@/types';

interface InvestmentPreviewProps {
  areas: InvestmentArea[];
}

export default function InvestmentPreview({ areas }: InvestmentPreviewProps) {
  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header without small eyebrow title */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#036c3e] tracking-tight">
            What we look for
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Akufai reviews opportunities selectively across multiple sectors, with particular interest in ventures and businesses that show strong leadership, clear market need, and long-term value creation potential.
          </p>
        </div>

        {/* 6 Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {areas.map((area) => (
            <div
              key={area.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-[#b6960b] relative"
            >
              {/* Subtle Top Gold Accent */}
              <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#b6960b]/60 to-transparent z-10" />

              {/* Image thumbnail */}
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={area.imageUrl || '/images/hero_patient_capital.png'}
                  alt={area.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-lg text-sm font-mono font-black text-[#b6960b] border border-[#e6d58f] shadow-xs">
                  {area.number}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#036c3e] transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {area.shortDescription}
                  </p>
                </div>

                {/* Bottom CTA neatly positioned at the bottom of the card */}
                <div className="pt-3 border-t border-slate-100">
                  <Link
                    href={`/investment#${area.slug}`}
                    className="w-full inline-flex items-center justify-between px-3.5 py-2 rounded-lg bg-[#f2f9f5]/70 hover:bg-[#036c3e] text-xs font-semibold text-[#036c3e] hover:text-white border border-[#d6ebe0] hover:border-[#036c3e] transition-all group/cta"
                  >
                    <span>Explore Thesis & Criteria</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#b6960b] group-hover/cta:text-[#d4b429] transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Callout & Bottom Action */}
        <div className="max-w-2xl mx-auto text-center space-y-6 pt-4">
          <p className="text-sm sm:text-base text-slate-700 italic">
            &ldquo;We are especially interested in ventures addressing significant social and economic challenges through durable, well-led business models.&rdquo;
          </p>
          <div>
            <Link
              href="/investment"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-[#042f1b] bg-[#b6960b] hover:bg-[#9e8109] hover:text-white border border-[#b6960b] rounded-lg shadow-sm transition-all duration-200 active:scale-[0.98] group"
            >
              <span>Learn More About Our Investment Focus</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
