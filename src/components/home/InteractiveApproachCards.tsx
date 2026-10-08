'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ApproachCardItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bgStyle: string;
  titleColor: string;
  subtitleColor: string;
  descColor: string;
  borderStyle: string;
  accentBar: string;
}

const APPROACH_CARDS: ApproachCardItem[] = [
  {
    id: 'evaluation',
    title: 'Thoughtful Evaluation',
    subtitle: 'Signal over Noise',
    description:
      'Rigorous analysis and disciplined capital allocation prioritizing signal over market noise.',
    bgStyle: 'bg-gradient-to-br from-[#071910] via-[#0b2417] to-[#071910]',
    titleColor: 'text-white',
    subtitleColor: 'text-emerald-300 font-mono text-xs uppercase tracking-wider',
    descColor: 'text-emerald-100/90',
    borderStyle: 'border-[#133d26] hover:border-[#008751]',
    accentBar: 'bg-gradient-to-r from-[#008751] via-[#b6950b] to-[#008751]',
  },
  {
    id: 'perspective',
    title: 'Long-term Perspective',
    subtitle: 'Compound Resilience',
    description:
      'Patient capital structured to allow resilient compound growth without artificial pressure.',
    bgStyle: 'bg-gradient-to-br from-[#fffdfa] via-amber-50/60 to-white',
    titleColor: 'text-slate-900 group-hover:text-[#008751]',
    subtitleColor: 'text-[#b6950b] font-mono text-xs uppercase tracking-wider font-bold',
    descColor: 'text-slate-700',
    borderStyle: 'border-amber-200/90 hover:border-[#b6950b]',
    accentBar: 'bg-gradient-to-r from-[#b6950b] via-amber-400 to-[#b6950b]',
  },
  {
    id: 'relationships',
    title: 'Aligned Relationships',
    subtitle: 'Deep Mutual Trust',
    description:
      'Deep mutual trust with visionary founders tackling real-world socioeconomic challenges.',
    bgStyle: 'bg-gradient-to-br from-[#f0fdf4] via-emerald-50/50 to-white',
    titleColor: 'text-slate-900 group-hover:text-[#008751]',
    subtitleColor: 'text-[#008751] font-mono text-xs uppercase tracking-wider font-bold',
    descColor: 'text-slate-700',
    borderStyle: 'border-emerald-200/90 hover:border-[#008751]',
    accentBar: 'bg-gradient-to-r from-[#008751] via-emerald-400 to-[#008751]',
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
            className={`group relative rounded-2xl p-7 lg:p-8 ${card.bgStyle} border ${card.borderStyle} shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#008751] overflow-hidden flex flex-col justify-between`}
          >
            {/* Top Accent Indicator */}
            <div className={`absolute top-0 inset-x-0 h-1 ${card.accentBar}`} />

            {/* Header & Subtitle */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={card.subtitleColor}>{card.subtitle}</span>
                <div className="md:hidden flex items-center text-xs text-slate-400 group-hover:text-[#008751]">
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </div>
              {/* Prominent Large Title without Icons */}
              <h3 className={`text-xl sm:text-2xl font-extrabold tracking-tight transition-colors ${card.titleColor}`}>
                {card.title}
              </h3>
            </div>

            {/* Description with Smooth Transition / Expand on Focus and Hover */}
            <div
              className={`mt-6 pt-4 border-t border-black/10 transition-all duration-300 ${
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
