import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Headphones, Radio, Calendar, ArrowRight, Play } from 'lucide-react';
import { PodcastEpisode } from '@/types';

interface PodcastFeatureProps {
  episodes: PodcastEpisode[];
}

export default function PodcastFeature({ episodes }: PodcastFeatureProps) {
  const featured = episodes[0];

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-8 sm:p-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">

              <div className="space-y-3">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Akufai Conversations
                </h2>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
                  A podcast exploring capital, enterprise, technology, leadership, and the ideas shaping long-term value creation across markets.
                </p>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Expect thoughtful conversations, practical reflections, and founder- and investor-oriented perspectives from within Akufai&apos;s wider ecosystem.
                </p>
              </div>

              {/* Episode topics */}
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  'Fintech Infrastructure',
                  'Cross-Border Playbooks',
                  'Emerging Market AI',
                  'Macroeconomic Policy',
                  'Venture Governance',
                ].map((topic, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/podcast"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#008751] hover:bg-[#056839] rounded-lg shadow-sm transition-all active:scale-[0.98] group"
                >
                  <Headphones className="w-4 h-4" />
                  <span>Explore Podcast Episodes</span>
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-700 bg-slate-50 hover:bg-[#f0fdf4] hover:text-[#008751] border border-slate-200 hover:border-[#008751]/40 rounded-lg transition-all active:scale-[0.98] group"
                >
                  <span>Suggest a Topic or Guest</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            {/* Right Card / Player Preview */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900 text-white rounded-xl p-6 shadow-xl space-y-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#008751]/20 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    PREVIEW STREAM
                  </div>
                  <span className="text-xs text-slate-400">Episode 01</span>
                </div>

                <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-800 border border-slate-700">
                  <Image
                    src={featured?.coverImageUrl || '/images/blog_fintech_wave.jpg'}
                    alt="Podcast preview"
                    fill
                    className="object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Link
                      href={`/podcast/${featured?.slug || 'inside-next-fintech-infrastructure-wave'}`}
                      className="w-14 h-14 rounded-full bg-[#008751] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform focus:outline-none"
                      aria-label="Play preview audio"
                    >
                      <Play className="w-6 h-6 fill-white translate-x-0.5" />
                    </Link>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    {featured?.category || 'Fintech Infrastructure'}
                  </p>
                  <h4 className="text-base font-bold text-white leading-snug">
                    {featured?.title || 'Inside the Next Fintech Infrastructure Wave'}
                  </h4>
                  <p className="text-xs text-slate-300">
                    Host: Dr. Ali Garba • Guest: Faisal Umar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
