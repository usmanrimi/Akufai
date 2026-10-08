'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { InvestmentArea } from '@/types';

interface InteractiveInvestmentAreasProps {
  areas: InvestmentArea[];
}

export default function InteractiveInvestmentAreas({ areas }: InteractiveInvestmentAreasProps) {
  const [activeAreaId, setActiveAreaId] = useState<string>(areas[0]?.id || '');

  return (
    <div className="space-y-10">
      {areas.map((area, index) => {
        const isEven = index % 2 === 1;
        const isActive = activeAreaId === area.id;

        return (
          <div
            id={area.slug}
            key={area.id}
            onMouseEnter={() => setActiveAreaId(area.id)}
            onClick={() => setActiveAreaId(area.id)}
            className={`scroll-mt-28 p-8 sm:p-12 rounded-3xl border transition-all duration-300 ${
              isActive
                ? 'bg-gradient-to-br from-white via-[#f0fdf4]/40 to-slate-50 border-[#008751] shadow-lg ring-1 ring-[#008751]/30'
                : 'bg-white border-slate-200/90 shadow-xs hover:border-slate-300'
            }`}
          >
            <div
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                isEven ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Information Column */}
              <div className={`lg:col-span-7 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                {/* Title Row with Prominent, Significantly Larger & Bolder Gold Number Beside Title */}
                <div className="flex items-baseline gap-4 sm:gap-6">
                  <span className="text-4xl sm:text-5xl lg:text-6xl font-mono font-black text-[#b6950b] shrink-0 leading-none select-none drop-shadow-xs">
                    {area.number}
                  </span>
                  <div className="space-y-1">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                      {area.title}
                    </h2>
                  </div>
                </div>

                <p className="text-base sm:text-lg font-medium text-slate-800 leading-relaxed">
                  {area.shortDescription}
                </p>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {area.detailedDescription}
                </p>

                {/* Subsector Focus Themes */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Key Focus Themes & Criteria
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {area.focusThemes?.map((theme, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                        <div className="w-5 h-5 rounded-full bg-[#f0fdf4] text-[#008751] flex items-center justify-center shrink-0 border border-[#dcfce7]">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span>{theme}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct CTA */}
                <div className="pt-3">
                  <Link
                    href="/contact"
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                      isActive
                        ? 'bg-[#008751] hover:bg-[#056839] text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    } group`}
                  >
                    <span>Submit {area.title} Opportunity</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Landscape Media Column */}
              <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md bg-slate-100 border-2 border-[#b6950b]/20 group">
                  <Image
                    src={area.imageUrl || '/images/hero_patient_capital.png'}
                    alt={area.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
