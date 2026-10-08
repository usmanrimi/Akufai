import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAboutContent, getContributors } from '@/lib/db';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import FounderActionSlider from '@/components/about/FounderActionSlider';
import InstitutionalFrameworkCards from '@/components/about/InstitutionalFrameworkCards';
import InteractiveApproachCards from '@/components/home/InteractiveApproachCards';

export const metadata: Metadata = {
  title: 'About | Akufai Capital & Equities',
  description:
    'About Akufai Capital & Equities LLC, led by Dr. Ali Garba. Our leadership, approach, core values, and network of contributing experts.',
};

export const revalidate = 0;

export default async function AboutPage() {
  const about = getAboutContent();
  const contributors = getContributors();

  return (
    <div className="bg-white">
      {/* 1. Visually Strong, High-Contrast Brand Color Hero */}
      <section className="py-20 lg:py-28 bg-[#071910] text-white relative overflow-hidden border-b border-[#0d2a1b]">
        <div className="absolute inset-0 bg-radial from-[#008751]/25 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <h1
            style={{ color: '#ffffff' }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight !text-white leading-[1.12]"
          >
            {about.headline || 'About Akufai Capital & Equities'}
          </h1>
          <p
            style={{ color: '#d1fae5' }}
            className="text-lg sm:text-xl !text-emerald-100/95 leading-relaxed max-w-2xl mx-auto font-medium"
          >
            {about.subheadline ||
              'A founder-led private investment firm built on disciplined judgment, patient capital, and cross-border perspective.'}
          </p>
        </div>
      </section>

      {/* 2. Introduction & Action Photographs (Balanced Composition without Firm Overview Label) */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Company Narrative */}
          <div className="lg:col-span-6 space-y-6 text-slate-700 leading-relaxed text-base sm:text-lg">
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                A selective, venture-leaning investment platform
              </h2>
            </div>
            {about.overviewParagraphs.map((para, i) => (
              <p key={i} className="leading-relaxed text-slate-700">
                {para}
              </p>
            ))}
          </div>

          {/* Right: Substantial Rectangular Action Photo Area */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl p-1 bg-gradient-to-br from-[#008751]/20 via-[#b6950b]/30 to-[#008751]/20 shadow-lg">
              <FounderActionSlider />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Distinct Institutional Framework Section */}
      <section className="py-20 lg:py-28 bg-[#f8faf8] border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Institutional Framework
            </h2>
            <p className="text-base text-slate-600">
              The strategic pillars underpinning our governance, geographic scope, and capital deployment discipline.
            </p>
          </div>

          {/* Coordinated Interactive Framework Cards */}
          <InstitutionalFrameworkCards />

          <div className="text-center pt-4">
            <Link
              href="/investment"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-[#f0fdf4] text-xs font-bold uppercase tracking-wider text-[#008751] border border-slate-200 hover:border-[#008751]/40 shadow-xs transition-all group"
            >
              <span>View Full Investment Focus</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Leadership by Character: Founder's Story */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-50 via-white to-[#f0fdf4]/30 rounded-3xl p-8 sm:p-12 lg:p-14 border border-slate-200/90 shadow-sm relative overflow-hidden">
            {/* Subtle Top Accent Divider */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#008751] via-[#b6950b] to-[#008751]" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Prominent Rectangular Founder Portrait */}
              <div className="md:col-span-5 flex flex-col items-center sm:items-start text-center sm:text-left space-y-4">
                <div className="relative w-64 h-80 sm:w-72 sm:h-92 rounded-2xl overflow-hidden border-2 border-[#b6950b]/30 shadow-md bg-slate-100">
                  <Image
                    src="/images/dr_ali_garba_portrait.png"
                    alt={about.founder.name}
                    fill
                    sizes="(max-width: 768px) 256px, 320px"
                    priority
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{about.founder.name}</h3>
                  <p className="text-xs font-semibold text-[#008751] uppercase tracking-wider mt-1">
                    {about.founder.titles || about.founder.role}
                  </p>
                </div>
              </div>

              {/* Founder Biography Narrative */}
              <div className="md:col-span-7 space-y-5 text-slate-700 leading-relaxed text-base sm:text-lg">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Leadership by Character
                </h2>
                {about.founder.bioParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Distinct Our Approach Section with Coordinated Deep Green & Pale Green Panels */}
      <section id="approach" className="py-20 lg:py-28 bg-[#f8faf8] border-b border-slate-200/70 scroll-mt-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              {about.approachTitle || 'Our Approach'}
            </h2>
          </div>

          {/* Coordinated Color Panels for Approach Paragraphs */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 text-left">
            <div className="relative rounded-2xl p-7 sm:p-8 bg-[#071910] text-white border border-[#0d2a1b] shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden group">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#008751] via-[#b6950b] to-[#008751]" />
              <p className="text-base sm:text-lg font-medium text-white/95 leading-relaxed pt-1">
                {about.approachParagraph1}
              </p>
            </div>

            <div className="relative rounded-2xl p-7 sm:p-8 bg-[#f0fdf4] text-slate-800 border border-[#dcfce7] shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden group flex items-center">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#008751] via-emerald-400 to-[#008751]" />
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal pt-1">
                {about.approachParagraph2}
              </p>
            </div>
          </div>

          {/* 3 Interactive Cards */}
          <InteractiveApproachCards />
        </div>
      </section>

      {/* 6. Distinct Our Core Values Section */}
      <section id="values" className="py-20 lg:py-28 bg-[#f0fdf4]/40 border-b border-slate-200/70 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Our Core Values
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              The foundational convictions that guide our investment lens, governance standards, and partner relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {about.values.map((val, idx) => {
              const isLast = idx === 4;
              return (
                <div
                  key={idx}
                  className={`p-8 rounded-2xl border border-slate-200/90 bg-white hover:border-[#008751] hover:shadow-lg transition-all duration-300 space-y-5 group flex flex-col justify-between ${
                    isLast ? 'md:col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  <div className="flex items-baseline justify-between border-b border-slate-100 pb-4">
                    <span className="text-3xl sm:text-4xl font-mono font-black text-[#b6950b] group-hover:text-[#008751] transition-colors">
                      0{idx + 1}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#008751]/30 group-hover:bg-[#008751] transition-colors" />
                  </div>

                  <div className="space-y-2.5 flex-1">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#008751] transition-colors">
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

      {/* 7. Contributors Section (Clean, Text-Based Layout without Demo Stock Photos) */}
      <section id="contributors" className="py-20 lg:py-28 bg-[#f8faf8] border-b border-slate-200/70 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our Contributors
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              The analysts, economists, and researchers authoring insights and perspectives across our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contributors.map((contrib) => (
              <div
                key={contrib.id}
                className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6 group hover:border-[#008751]/50 relative overflow-hidden"
              >
                {/* Top Subtle Accent Indicator */}
                <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#008751]/40 to-transparent" />

                <div className="space-y-4">
                  {/* Text-based Header with Initials Badge */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-[#f0fdf4] text-[#008751] border border-[#dcfce7] flex items-center justify-center font-bold text-base font-serif">
                      {contrib.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#008751] transition-colors">
                        {contrib.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#008751] uppercase tracking-wider">
                        {contrib.role}
                      </p>
                    </div>
                  </div>

                  {/* Biography Text */}
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {contrib.bio}
                  </p>
                </div>

                {/* Profile Link & Stats */}
                <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{contrib.postCount} publications</span>
                    <span>•</span>
                    <span>{contrib.episodeCount} episodes</span>
                  </div>
                  <Link
                    href={`/authors/${contrib.slug}`}
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-lg text-xs font-semibold text-[#008751] bg-[#f0fdf4] border border-[#dcfce7] hover:bg-[#008751] hover:text-white hover:border-[#008751] transition-all duration-200 shadow-xs group/btn"
                  >
                    <span>View Profile & Insights</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Aligned Inquiries Callout */}
      <section className="py-16 lg:py-20 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">For aligned inquiries</h2>
          <p className="text-sm sm:text-base text-slate-600">
            Akufai welcomes a limited number of aligned inquiries, strategic introductions, and partnership conversations.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-[#008751] hover:bg-[#056839] rounded-lg shadow-sm transition-all duration-200 group"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
