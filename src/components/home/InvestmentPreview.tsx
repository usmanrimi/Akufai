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
    <section className="relative py-16 lg:py-24 bg-white border-b border-[#dec668]/50 overflow-hidden">
      {/* Subtle Ambient Gold Center Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[360px] bg-radial from-[#d4b429]/12 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header without small eyebrow title */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#042f1b] tracking-tight">
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
              className="gold-card-surface gold-glow-card rounded-2xl border border-[#dec668] shadow-xs flex flex-col justify-between overflow-hidden group relative"
            >
              {/* Prominent Top Metallic Gold Accent */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#8f7506] via-[#e5c846] to-[#8f7506] z-10" />

              {/* Image thumbnail */}
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden border-b border-[#dec668]/50">
                <Image
                  src={area.imageUrl || '/images/hero_patient_capital.png'}
                  alt={area.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-gradient-to-br from-[#d4b429] to-[#b6960b] px-3 py-1 rounded-lg text-sm font-mono font-black text-[#042f1b] border border-[#fff3b8] shadow-[0_4px_14px_rgba(182,150,11,0.4)]">
                  {area.number}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-[#042f1b] group-hover:text-[#036c3e] transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {area.shortDescription}
                  </p>
                </div>

                {/* Bottom CTA neatly positioned at the bottom of the card */}
                <div className="pt-3 border-t border-[#dec668]/50">
                  <Link
                    href={`/investment#${area.slug}`}
                    className="w-full inline-flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-gradient-to-r from-[#fcf6df] to-[#f7ebc1] hover:from-[#d4b429] hover:to-[#b6960b] text-xs font-bold text-[#042f1b] border border-[#dec668] shadow-2xs transition-all duration-300 group/cta"
                  >
                    <span>Explore Thesis & Criteria</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#042f1b] transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
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
              className="gold-btn-luxury inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold rounded-lg active:scale-[0.98] group"
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
