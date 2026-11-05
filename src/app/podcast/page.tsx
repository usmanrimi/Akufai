import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getPodcastEpisodes } from '@/lib/db';
import { Calendar, Clock, ArrowUpRight, Headphones, Video } from 'lucide-react';
import AudioPlayer from '@/components/podcast/AudioPlayer';
import VideoPlayer from '@/components/podcast/VideoPlayer';

export const metadata: Metadata = {
  title: 'Podcast: Akufai Conversations',
  description:
    'A podcast exploring capital, enterprise, technology, leadership, and the ideas shaping long-term value creation across markets.',
};

export const revalidate = 0;

export default async function PodcastPage() {
  const episodes = getPodcastEpisodes(false);

  return (
    <div className="gold-surface-wash">
      {/* 1. Approved High-Contrast Green Brand Hero with Ambient Golden Glow */}
      <section className="py-20 lg:py-28 bg-[#061c11] text-white relative overflow-hidden border-b-2 border-[#b6960b]">
        <div className="absolute inset-0 bg-radial from-[#b6960b]/28 via-[#036c3e]/20 to-transparent pointer-events-none gold-ambient-glow" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <h1
            style={{ color: '#ffffff' }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white !text-white tracking-tight leading-[1.12]"
          >
            Akufai Conversations
          </h1>
          <p
            style={{ color: '#f8efcf' }}
            className="text-lg sm:text-xl !text-[#f8efcf] leading-relaxed max-w-2xl mx-auto font-medium"
          >
            A podcast exploring capital, enterprise, technology, leadership, and the ideas shaping long-term value creation across markets.
          </p>
        </div>
      </section>

      {/* 2. Episodes Catalog (Audio & Video Coexisting) */}
      <section className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#dec668]/60 pb-4">
          <h2 className="text-2xl font-bold text-[#042f1b]">All Episodes</h2>
          <span className="text-xs text-[#8f7506] font-bold">
            Showing {episodes.length} episodes (Audio &amp; Video)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {episodes.map((ep) => {
            const isVideo = ep.mediaType === 'video' || Boolean(ep.videoUrl);
            return (
              <div
                key={ep.id}
                className="gold-card-surface gold-glow-card rounded-2xl border border-[#dec668] overflow-hidden shadow-xs flex flex-col justify-between group"
              >
                {/* Media Section: Embedded Video Player for Video Episodes, or Thumbnail + Audio Player for Audio Episodes */}
                {isVideo ? (
                  <div className="relative bg-[#061c11] border-b border-[#dec668]/50">
                    <div className="absolute top-3 left-3 z-30 bg-gradient-to-r from-[#fcf6df] to-[#f7ebc1] px-2.5 py-1 rounded-md text-xs font-bold text-[#042f1b] border border-[#b6960b]/60 inline-flex items-center gap-1.5 pointer-events-none shadow-xs">
                      <Video className="w-3.5 h-3.5 text-[#036c3e]" />
                      <span>Episode {ep.episodeNumber} • Video</span>
                    </div>
                    {ep.status === 'scheduled' && (
                      <div className="absolute top-3 right-3 z-30 bg-[#b6960b] text-[#042f1b] px-2.5 py-1 rounded-md text-xs font-bold pointer-events-none">
                        PREVIEW
                      </div>
                    )}
                    <VideoPlayer
                      videoUrl={ep.videoUrl}
                      audioUrl={ep.audioUrl}
                      coverImageUrl={ep.coverImageUrl || '/images/podcast_video_episode.jpg'}
                      title={ep.title}
                      episodeNumber={ep.episodeNumber}
                      hostName={ep.hostName}
                      guestName={ep.guestName}
                      compact
                    />
                  </div>
                ) : (
                  <div className="bg-[#061c11] border-b border-[#dec668]/50">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={ep.coverImageUrl || '/images/podcast_cover_art.jpg'}
                        alt={ep.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#061c11]/80 via-transparent to-black/20 pointer-events-none" />
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-[#fcf6df] to-[#f7ebc1] px-2.5 py-1 rounded-md text-xs font-bold text-[#042f1b] border border-[#b6960b]/60 inline-flex items-center gap-1.5 shadow-xs">
                        <Headphones className="w-3.5 h-3.5 text-[#036c3e]" />
                        <span>Episode {ep.episodeNumber} • Audio</span>
                      </div>
                      {ep.status === 'scheduled' && (
                        <div className="absolute top-3 right-3 bg-[#b6960b] text-[#042f1b] px-2.5 py-1 rounded-md text-xs font-bold">
                          PREVIEW
                        </div>
                      )}
                    </div>
                    {/* Functional Embedded Audio Player */}
                    <AudioPlayer
                      audioUrl={ep.audioUrl}
                      title={ep.title}
                      episodeNumber={ep.episodeNumber}
                      compact
                    />
                  </div>
                )}

                {/* Episode Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="font-semibold text-[#036c3e]">{ep.category}</span>
                      <span className="text-[#b6960b]">•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#b6960b]" />
                        {ep.publishDate}
                      </span>
                      <span className="text-[#b6960b]">•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#b6960b]" />
                        {ep.duration}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#042f1b] group-hover:text-[#8f7506] transition-colors leading-snug">
                      <Link href={`/podcast/${ep.slug}`}>{ep.title}</Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {ep.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#dec668]/50 flex items-center justify-between gap-3">
                    <span className="text-xs text-slate-600">
                      Host: <strong className="text-[#042f1b] font-semibold">{ep.hostName}</strong>
                    </span>
                    <Link
                      href={`/podcast/${ep.slug}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#fcf6df] to-[#f7ebc1] text-xs font-bold text-[#042f1b] border border-[#dec668] hover:from-[#d4b429] hover:to-[#b6960b] transition-all duration-200 shrink-0 group/btn"
                    >
                      <span>{isVideo ? 'Watch & Show Notes' : 'Listen & Show Notes'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#042f1b]" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
