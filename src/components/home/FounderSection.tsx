import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { AboutContent } from '@/types';

interface FounderSectionProps {
  about: AboutContent;
}

export default function FounderSection({ about }: FounderSectionProps) {
  return (
    <section className="py-16 lg:py-24 bg-[#f8faf8] border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Prominent High-Resolution Founder Action Scene */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-2 border-[#b6950b]/25 bg-slate-50 group">
              <Image
                src="/images/founder_business_meeting.jpg"
                alt="Dr. Ali Garba leading strategic investment engagement"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top sm:object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="text-base font-bold drop-shadow-xs">{about.founder.name}</p>
                <p className="text-xs text-slate-200 drop-shadow-xs">{about.founder.role}</p>
              </div>
            </div>
          </div>

          {/* Editorial Text Content */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                A founder-led firm with a selective lens
              </h2>
            </div>

            <div className="space-y-4 text-base text-slate-600 leading-relaxed">
              <p>
                Akufai Capital & Equities reflects the investment perspective and long-term orientation of{' '}
                <strong className="text-slate-900 font-semibold">{about.founder.name}</strong>, {about.founder.role}. The firm&apos;s approach is grounded in disciplined judgment, cross-border perspective, and an interest in ventures that combine commercial promise with real-world relevance.
              </p>
              <p>
                Akufai is not designed to be everything to everyone. It is being shaped deliberately: first as a private investment firm, and over time as a broader advisory and investment platform built around aligned relationships, thoughtful partnerships, and selective engagement.
              </p>
            </div>

            {/* Strategic Pillars */}
            <div className="pt-1 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[
                'Disciplined evaluation over volume',
                'Patient, venture-leaning capital',
                'Pan-African & cross-border linkages',
                'Durable economic fundamentals',
              ].map((pillar, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-[#f0fdf4] text-[#008751] flex items-center justify-center shrink-0 border border-[#dcfce7]">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{pillar}</span>
                </div>
              ))}
            </div>

            {/* Prominent Actionable CTA Button at the bottom */}
            <div className="pt-4 border-t border-slate-100">
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-[#008751] hover:bg-[#056839] rounded-lg shadow-sm transition-all duration-200 active:scale-[0.98] group"
              >
                <span>Read More About Our Approach and Leadership</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
