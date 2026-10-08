import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AboutContent } from '@/types';
import InteractiveApproachCards from '@/components/home/InteractiveApproachCards';

interface ApproachSectionProps {
  about: AboutContent;
}

export default function ApproachSection({ about }: ApproachSectionProps) {
  return (
    <section id="approach" className="py-20 lg:py-28 bg-[#f8faf8] border-b border-slate-200/70 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
        {/* Main Heading */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            {about.approachTitle || 'Our Approach'}
          </h2>
        </div>

        {/* Coordinated Color Panels for Intro Paragraphs: Deep Green & Pale Green */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 text-left">
          {/* Panel 1: Deep Green with White Text & Gold Accent */}
          <div className="relative rounded-2xl p-7 sm:p-8 bg-[#071910] text-white border border-[#0d2a1b] shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden group">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#008751] via-[#b6950b] to-[#008751]" />
            <p className="text-base sm:text-lg font-medium text-white/95 leading-relaxed pt-1">
              {about.approachParagraph1 ||
                'Akufai is deliberate by design. We value thoughtful evaluation over noise, long-term perspective over short-term signaling, and aligned relationships over volume.'}
            </p>
          </div>

          {/* Panel 2: Pale Green with Dark Text & Emerald Accent */}
          <div className="relative rounded-2xl p-7 sm:p-8 bg-[#f0fdf4] text-slate-800 border border-[#dcfce7] shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden group flex items-center">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#008751] via-emerald-400 to-[#008751]" />
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal pt-1">
              {about.approachParagraph2 ||
                'As the firm continues to evolve, it is building toward a broader advisory and investment platform model while remaining grounded in selective investment judgment.'}
            </p>
          </div>
        </div>

        {/* Coordinated 3 Supportive Cards without Icons, Large Titles, Smooth Interactive Reveal */}
        <InteractiveApproachCards />

        {/* Centered Action Button */}
        <div className="pt-4">
          <Link
            href="/about#approach"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-white bg-[#008751] hover:bg-[#056839] rounded-lg shadow-sm hover:shadow transition-all duration-200 active:scale-[0.98] group"
          >
            <span>Explore Our Full Approach</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
