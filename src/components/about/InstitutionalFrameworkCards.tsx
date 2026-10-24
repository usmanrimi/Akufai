'use client';

import React, { useState } from 'react';
import { Scale, Globe, Sparkles, ChevronDown } from 'lucide-react';

interface FrameworkCard {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  bgGradient: string;
  borderColor: string;
  iconBg: string;
  iconColor: string;
}

const FRAMEWORK_CARDS: FrameworkCard[] = [
  {
    id: 'capital-orientation',
    title: 'Capital Orientation',
    tagline: 'Patient equity & disciplined allocation',
    description:
      'Long-term, patient equity aligned with operational founders solving systemic real-world needs across key economic sectors.',
    icon: Scale,
    accentColor: '#036c3e',
    bgGradient: 'from-[#f2f9f5]/80 via-white to-white',
    borderColor: 'border-[#d6ebe0] hover:border-[#036c3e]',
    iconBg: 'bg-[#f2f9f5]',
    iconColor: 'text-[#036c3e]',
  },
  {
    id: 'cross-border-scope',
    title: 'Cross-Border Scope',
    tagline: 'Pan-African & global linkages',
    description:
      'Connecting dynamic African economic hubs with international capital, strategic knowledge, and global execution networks.',
    icon: Globe,
    accentColor: '#b6960b',
    bgGradient: 'from-[#fcf8e8]/70 via-white to-white',
    borderColor: 'border-[#e6d58f] hover:border-[#b6960b]',
    iconBg: 'bg-[#fcf8e8]',
    iconColor: 'text-[#b6960b]',
  },
  {
    id: 'target-sectors',
    title: 'Target Sectors',
    tagline: 'High-conviction focal areas',
    description:
      'Healthtech, Artificial Intelligence, Fintech, Infrastructure & Enabling Systems, Cross-border & Private Growth Deals.',
    icon: Sparkles,
    accentColor: '#036c3e',
    bgGradient: 'from-[#f2f9f5]/80 via-white to-white',
    borderColor: 'border-[#d6ebe0] hover:border-[#036c3e]',
    iconBg: 'bg-[#f2f9f5]',
    iconColor: 'text-[#036c3e]',
  },
];

export default function InstitutionalFrameworkCards() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      {FRAMEWORK_CARDS.map((card) => {
        const Icon = card.icon;
        const isExpanded = expandedId === card.id;

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
            className={`group relative rounded-2xl p-7 lg:p-8 bg-gradient-to-b ${card.bgGradient} border ${card.borderColor} shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#036c3e] flex flex-col justify-between text-left`}
          >
            {/* Top Row: Icon & Interactive Hint */}
            <div className="flex items-center justify-between">
              <div
                className={`w-12 h-12 rounded-xl ${card.iconBg} ${card.iconColor} border border-black/5 flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-110`}
              >
                <Icon className="w-6 h-6" />
              </div>

              <div className="md:hidden flex items-center gap-1 text-xs font-semibold text-slate-500 group-hover:text-[#036c3e]">
                <span>{isExpanded ? 'Collapse' : 'Details'}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isExpanded ? 'rotate-180 text-[#036c3e]' : ''
                  }`}
                />
              </div>
            </div>

            {/* Title & Tagline - Prominently Displayed without 01/02/03 Numbers */}
            <div className="mt-5 space-y-1.5">
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#036c3e] group-hover:text-[#02522f] transition-colors">
                {card.title}
              </h3>
              <p className="text-xs font-semibold text-[#b6960b] uppercase tracking-wider">
                {card.tagline}
              </p>
            </div>

            {/* Expandable Description Area on Mobile, Smooth Reveal on Desktop Hover/Focus */}
            <div
              className={`mt-4 pt-4 border-t border-slate-200/70 transition-all duration-300 ${
                isExpanded
                  ? 'block opacity-100 max-h-60'
                  : 'hidden md:block md:opacity-90 md:group-hover:opacity-100 md:group-focus-within:opacity-100'
              }`}
            >
              <p className="text-sm text-slate-700 leading-relaxed font-normal">
                {card.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
