import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getPodcastEpisodes } from '@/lib/db';
import { Calendar, Clock, Play, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Podcast: Akufai Conversations',
  description:
    'A forthcoming podcast exploring capital, enterprise, technology, leadership, and the ideas shaping long-term value creation across markets.',
};

export const revalidate = 0;

export default async function PodcastPage() {
  const episodes = getPodcastEpisodes(false);

  return (
    <div className="bg-white">
      {/* 1. Approved High-Contrast Green Brand Hero */}
      <section className="py-20 lg:py-28 bg-[#061c11] text-white relative overflow-hidden border-b-2 border-[#b6960b]/40">
        <div className="absolute inset-0 bg-radial from-[#036c3e]/35 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <h1
            style={{ color: '#ffffff' }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white !text-white tracking-tight leading-[1.12]"
          >
            Akufai Conversations
          </h1>
          <p
            style={{ color: '#e6f4ed' }}
            className="text-lg sm:text-xl !text-emerald-50/95 leading-relaxed max-w-2xl mx-auto font-medium"
          >
            A podcast exploring capital, enterprise, technology, leadership, and the ideas shaping long-term value creation across markets.
          </p>
        </div>
      </section>

      {/* 2. Episodes Catalog */}
      <section className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <h2 className="text-2xl font-bold text-[#036c3e]">All Episodes</h2>
          <span className="text-xs text-[#b6960b] font-semibold">
            Showing {episodes.length} episodes
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {episodes.map((ep) => (
            <div
              key={ep.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group hover:border-[#b6960b]"
            >
              {/* Media Thumbnail */}
              <div className="relative aspect-[16/9] bg-[#061c11] overflow-hidden">
                <Image
                  src={ep.coverImageUrl || '/images/blog_fintech_wave.jpg'}
                  alt={ep.title}
                  fill
                  className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-xs font-bold text-[#036c3e] border border-[#b6960b]/30">
                  Episode {ep.episodeNumber} • {ep.category}
                </div>
                {ep.status === 'scheduled' && (
                  <div className="absolute top-3 right-3 bg-[#b6960b] text-[#042f1b] px-2.5 py-1 rounded-md text-xs font-bold">
                    PREVIEW
                  </div>
                )}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    href={`/podcast/${ep.slug}`}
                    className="w-12 h-12 rounded-full bg-[#036c3e] ring-2 ring-[#b6960b] text-white flex items-center justify-center shadow-lg"
                    aria-label={`Listen to ${ep.title}`}
                  >
                    <Play className="w-5 h-5 fill-white translate-x-0.5" />
                  </Link>
                </div>
              </div>

              {/* Episode Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#b6960b]" />
                      {ep.publishDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#b6960b]" />
                      {ep.duration}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#036c3e] transition-colors leading-snug">
                    <Link href={`/podcast/${ep.slug}`}>{ep.title}</Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {ep.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-500">
                    Host: <strong className="text-[#036c3e] font-semibold">{ep.hostName}</strong>
                  </span>
                  <Link
                    href={`/podcast/${ep.slug}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#f2f9f5] text-xs font-semibold text-[#036c3e] border border-[#d6ebe0] hover:bg-[#036c3e] hover:text-white hover:border-[#036c3e] transition-all duration-200 shrink-0 group/btn"
                  >
                    <span>Listen & Show Notes</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#b6960b] group-hover/btn:text-[#d4b429]" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
