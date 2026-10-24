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
    accentColor: '#b6960b',
    bgGradient: 'from-[#fcf6df] via-white to-[#f2f9f5]',
    borderColor: 'border-[#dec668] hover:border-[#b6960b]',
    iconBg: 'bg-gradient-to-br from-[#d4b429] to-[#b6960b]',
    iconColor: 'text-[#042f1b]',
  },
  {
    id: 'cross-border-scope',
    title: 'Cross-Border Scope',
    tagline: 'Pan-African & global linkages',
    description:
      'Connecting dynamic African economic hubs with international capital, strategic knowledge, and global execution networks.',
    icon: Globe,
    accentColor: '#b6960b',
    bgGradient: 'from-[#faefca] via-[#fdf9ec] to-white',
    borderColor: 'border-[#b6960b]/80 hover:border-[#b6960b]',
    iconBg: 'bg-gradient-to-br from-[#d4b429] to-[#b6960b]',
    iconColor: 'text-[#042f1b]',
  },
  {
    id: 'target-sectors',
    title: 'Target Sectors',
    tagline: 'High-conviction focal areas',
    description:
      'Healthtech, Artificial Intelligence, Fintech, Infrastructure & Enabling Systems, Cross-border & Private Growth Deals.',
    icon: Sparkles,
    accentColor: '#b6960b',
    bgGradient: 'from-[#fcf6df] via-white to-[#f2f9f5]',
    borderColor: 'border-[#dec668] hover:border-[#b6960b]',
    iconBg: 'bg-gradient-to-br from-[#d4b429] to-[#b6960b]',
    iconColor: 'text-[#042f1b]',
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
            className={`gold-glow-card group relative rounded-2xl p-7 lg:p-8 bg-gradient-to-b ${card.bgGradient} border ${card.borderColor} shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b6960b] flex flex-col justify-between text-left overflow-hidden`}
          >
            {/* Top Metallic Gold Bar */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#8f7506] via-[#e5c846] to-[#8f7506]" />

            {/* Top Row: Icon & Interactive Hint */}
            <div className="flex items-center justify-between">
              <div
                className={`w-12 h-12 rounded-xl ${card.iconBg} ${card.iconColor} border border-[#fff3b8] flex items-center justify-center shadow-[0_4px_14px_rgba(182,150,11,0.35)] transition-transform duration-300 group-hover:scale-110`}
              >
                <Icon className="w-6 h-6" />
              </div>

              <div className="md:hidden flex items-center gap-1 text-xs font-semibold text-[#8f7506] group-hover:text-[#042f1b]">
                <span>{isExpanded ? 'Collapse' : 'Details'}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isExpanded ? 'rotate-180 text-[#b6960b]' : ''
                  }`}
                />
              </div>
            </div>

            {/* Title & Tagline - Prominently Displayed without 01/02/03 Numbers */}
            <div className="mt-5 space-y-1.5">
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#042f1b] group-hover:text-[#036c3e] transition-colors">
                {card.title}
              </h3>
              <p className="text-xs font-bold text-[#8f7506] uppercase tracking-wider">
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
