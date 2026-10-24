import React from 'react';
import { AboutContent } from '@/types';

interface ValuesSectionProps {
  about: AboutContent;
}

export default function ValuesSection({ about }: ValuesSectionProps) {
  const values = about.values || [];

  return (
    <section id="values" className="py-20 lg:py-28 bg-white border-b border-slate-100 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#036c3e] tracking-tight">
            Our Core Values
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            The core convictions that guide our selective investment decisions, governance practices, and aligned founder partnerships.
          </p>
        </div>

        {/* Structured Grid of 5 Values with Green, White, Restrained Gold & Large Bold Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {values.map((val, idx) => {
            const isLast = idx === 4;
            return (
              <div
                key={idx}
                className={`p-8 rounded-2xl border border-slate-200/90 bg-white hover:border-[#b6960b] hover:shadow-lg transition-all duration-300 space-y-5 group flex flex-col justify-between ${
                  isLast ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Header with Substantially Larger & Bolder Gold Number with High Contrast */}
                <div className="flex items-baseline justify-between border-b border-slate-100 pb-4">
                  <span className="text-3xl sm:text-4xl font-mono font-black text-[#b6960b] group-hover:text-[#036c3e] transition-colors">
                    0{idx + 1}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#b6960b]/40 group-hover:bg-[#b6960b] transition-colors" />
                </div>

                <div className="space-y-2.5 flex-1">
                  <h3 className="text-xl font-bold text-[#036c3e] group-hover:text-[#02522f] transition-colors">
                    {val.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
