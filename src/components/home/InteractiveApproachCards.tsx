'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ApproachCardItem {
  id: string;
  title: string;
  description: string;
  bgStyle: string;
  titleColor: string;
  descColor: string;
  borderStyle: string;
  accentBar: string;
}

const APPROACH_CARDS: ApproachCardItem[] = [
  {
    id: 'evaluation',
    title: 'Thoughtful Evaluation',
    description:
      'Rigorous analysis and disciplined capital allocation prioritizing signal over market noise.',
    bgStyle: 'bg-gradient-to-br from-[#fcf6df] via-white to-[#f2f9f5]',
    titleColor: 'text-[#042f1b] group-hover:text-[#036c3e]',
    descColor: 'text-slate-700',
    borderStyle: 'border-[#dec668] hover:border-[#b6960b]',
    accentBar: 'bg-gradient-to-r from-[#b6960b] via-[#e5c846] to-[#036c3e]',
  },
  {
    id: 'perspective',
    title: 'Long-term Perspective',
    description:
      'Patient capital structured to allow resilient compound growth without artificial pressure.',
    bgStyle: 'bg-gradient-to-br from-[#faefca] via-[#fdf9ec] to-white',
    titleColor: 'text-[#042f1b] group-hover:text-[#8f7506]',
    descColor: 'text-slate-700',
    borderStyle: 'border-[#b6960b]/80 hover:border-[#b6960b]',
    accentBar: 'bg-gradient-to-r from-[#8f7506] via-[#e5c846] to-[#8f7506]',
  },
  {
    id: 'relationships',
    title: 'Aligned Relationships',
    description:
      'Deep mutual trust with visionary founders tackling real-world socioeconomic challenges.',
    bgStyle: 'bg-gradient-to-br from-[#fcf6df] via-white to-[#f2f9f5]',
    titleColor: 'text-[#042f1b] group-hover:text-[#036c3e]',
    descColor: 'text-slate-700',
    borderStyle: 'border-[#dec668] hover:border-[#b6960b]',
    accentBar: 'bg-gradient-to-r from-[#036c3e] via-[#e5c846] to-[#b6960b]',
  },
];

export default function InteractiveApproachCards() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    setExpandedCard((prev) => (prev === id ? null : id));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-left">
      {APPROACH_CARDS.map((card) => {
        const isExpanded = expandedCard === card.id;

        return (
          <div
            key={card.id}
            tabIndex={0}
            role="button"
            aria-expanded={isExpanded}
            onClick={() => toggleCard(card.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleCard(card.id);
              }
            }}
            className={`gold-glow-card group relative rounded-2xl p-7 lg:p-8 ${card.bgStyle} border ${card.borderStyle} shadow-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b6960b] overflow-hidden flex flex-col justify-between`}
          >
            {/* Top Accent Indicator */}
            <div className={`absolute top-0 inset-x-0 h-1.5 ${card.accentBar}`} />

            {/* Header without secondary subtitle labels */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className={`text-xl sm:text-2xl font-extrabold tracking-tight transition-colors ${card.titleColor}`}>
                  {card.title}
                </h3>
                <div className="md:hidden flex items-center text-xs text-[#b6960b] group-hover:text-[#036c3e]">
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Description with Smooth Transition / Expand on Focus and Hover */}
            <div
              className={`mt-6 pt-4 border-t border-black/5 transition-all duration-300 ${
                isExpanded
                  ? 'block opacity-100 max-h-60'
                  : 'hidden md:block md:opacity-90 md:group-hover:opacity-100 md:group-focus-within:opacity-100'
              }`}
            >
              <p className={`text-sm leading-relaxed font-normal ${card.descColor}`}>
                {card.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
