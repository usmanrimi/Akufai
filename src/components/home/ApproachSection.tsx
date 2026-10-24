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
    <section id="approach" className="py-20 lg:py-28 gold-surface-wash border-b border-[#dec668]/60 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
        {/* Main Heading */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#042f1b] tracking-tight">
            {about.approachTitle || 'Our Approach'}
          </h2>
        </div>

        {/* Coordinated Color Panels for Intro Paragraphs: Deep Green & Champagne Gold */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 text-left">
          {/* Panel 1: Deep Green with White Text & Luminous Gold Glow */}
          <div className="gold-glow-card relative rounded-2xl p-7 sm:p-8 bg-[#061c11] text-white border border-[#b6960b]/60 shadow-[0_12px_32px_-8px_rgba(182,150,11,0.28)] overflow-hidden group">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#8f7506] via-[#e5c846] to-[#036c3e]" />
            <p className="text-base sm:text-lg font-medium text-white/95 leading-relaxed pt-1">
              {about.approachParagraph1 ||
                'Akufai is deliberate by design. We value thoughtful evaluation over noise, long-term perspective over short-term signaling, and aligned relationships over volume.'}
            </p>
          </div>

          {/* Panel 2: Rich Champagne Gold with Dark Forest Green Text */}
          <div className="gold-glow-card relative rounded-2xl p-7 sm:p-8 bg-gradient-to-br from-[#fcf5dc] via-[#fdf9eb] to-[#f4e3a4] text-[#042f1b] border border-[#b6960b]/70 shadow-[0_12px_32px_-8px_rgba(182,150,11,0.22)] overflow-hidden group flex items-center">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#b6960b] via-[#e5c846] to-[#b6960b]" />
            <p className="text-base sm:text-lg text-[#042f1b] leading-relaxed font-medium pt-1">
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
            className="gold-btn-luxury inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-bold rounded-lg active:scale-[0.98] group"
          >
            <span>Explore Our Full Approach</span>
            <ArrowRight className="w-4 h-4 text-[#042f1b] transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
