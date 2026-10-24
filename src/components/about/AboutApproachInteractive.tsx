'use client';

import React, { useState } from 'react';
import { ValueItem } from '@/types';
import { ChevronRight } from 'lucide-react';

interface AboutApproachInteractiveProps {
  values: ValueItem[];
}

export default function AboutApproachInteractive({ values }: AboutApproachInteractiveProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(0);

  return (
    <div className="space-y-3.5">
      {values.map((val, idx) => {
        const isActive = activeIdx === idx;
        const numStr = `0${idx + 1}`;

        return (
          <div
            key={idx}
            onMouseEnter={() => setActiveIdx(idx)}
            onClick={() => setActiveIdx(isActive ? null : idx)}
            className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer ${
              isActive
                ? 'bg-[#f2f9f5] border-[#036c3e] shadow-sm'
                : 'bg-white border-slate-200 hover:border-[#b6960b] hover:bg-slate-50/70'
            }`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setActiveIdx(isActive ? null : idx);
              }
            }}
            aria-expanded={isActive}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span
                  className={`text-sm font-mono font-bold transition-colors duration-200 ${
                    isActive ? 'text-[#b6960b]' : 'text-slate-400'
                  }`}
                >
                  {numStr} —
                </span>
                <h3
                  className={`text-base sm:text-lg font-bold transition-colors duration-200 ${
                    isActive ? 'text-[#036c3e]' : 'text-slate-900'
                  }`}
                >
                  {val.title}
                </h3>
              </div>
              <ChevronRight
                className={`w-4 h-4 transition-transform duration-300 ${
                  isActive ? 'text-[#036c3e] rotate-90' : 'text-slate-400'
                }`}
              />
            </div>

            {/* Expandable Supporting Content */}
            <div
              className={`grid transition-all duration-300 ease-out ${
                isActive ? 'grid-rows-[1fr] opacity-100 pt-3.5' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <p className="text-sm text-slate-700 leading-relaxed pl-8 border-l-2 border-[#b6960b]">
                  {val.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
