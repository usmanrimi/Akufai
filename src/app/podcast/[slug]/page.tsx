import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPodcastEpisodeBySlug, getPodcastEpisodes } from '@/lib/db';
import { Calendar, Clock, ArrowLeft, Check, Radio, Headphones } from 'lucide-react';
import AudioPlayer from '@/components/podcast/AudioPlayer';

interface EpisodePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EpisodePageProps): Promise<Metadata> {
  const { slug } = await params;
  const ep = getPodcastEpisodeBySlug(slug);
  if (!ep) return { title: 'Episode Not Found' };
  return {
    title: `${ep.title} | Akufai Conversations`,
    description: ep.description,
  };
}

export const revalidate = 0;

export default async function PodcastEpisodeDetailPage({ params }: EpisodePageProps) {
  const { slug } = await params;
  const episode = getPodcastEpisodeBySlug(slug);

  if (!episode) {
    notFound();
  }

  const allEpisodes = getPodcastEpisodes(false).filter((e) => e.id !== episode.id);

  return (
    <div className="bg-white py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/podcast"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#008751] hover:text-[#056839]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Episodes</span>
          </Link>
        </div>

        {/* Episode Header */}
        <div className="space-y-4 border-b border-slate-100 pb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-md bg-[#f0fdf4] text-[#008751] text-xs font-bold uppercase tracking-wider border border-[#dcfce7]">
              Episode {episode.episodeNumber} • {episode.category}
            </span>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {episode.publishDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {episode.duration}
              </span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {episode.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {episode.description}
          </p>
        </div>

        {/* Interactive Playable Audio Player */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl">
          <AudioPlayer
            audioUrl={episode.audioUrl || ''}
            title={episode.title}
            episodeNumber={episode.episodeNumber}
          />
        </div>

        {/* Host & Guest Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-xl bg-slate-50 border border-slate-200">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Host</span>
            <p className="text-base font-bold text-slate-900">{episode.hostName}</p>
            <p className="text-xs text-slate-600">Founder & CEO, Akufai Capital & Equities</p>
          </div>
          {episode.guestName && (
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Guest</span>
              <p className="text-base font-bold text-slate-900">{episode.guestName}</p>
              <p className="text-xs text-slate-600">{episode.guestRole || 'Featured Contributor'}</p>
            </div>
          )}
        </div>

        {/* Key Takeaways */}
        {episode.keyTakeaways && episode.keyTakeaways.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">Key Discussion Takeaways</h3>
            <div className="space-y-2.5">
              {episode.keyTakeaways.map((takeaway, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                  <div className="w-5 h-5 rounded-full bg-[#f0fdf4] text-[#008751] flex items-center justify-center shrink-0 mt-0.5 border border-[#dcfce7]">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{takeaway}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Transcript Section */}
        {episode.transcript && (
          <div className="space-y-4 pt-6 border-t border-slate-100">
            <h3 className="text-xl font-bold text-slate-900">Episode Transcript</h3>
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 leading-relaxed whitespace-pre-line font-mono">
              {episode.transcript}
            </div>
          </div>
        )}

        {/* External Platform Links */}
        <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-semibold text-slate-500">Also available on major platforms:</span>
          <div className="flex items-center gap-3">
            <a
              href={episode.spotifyUrl || 'https://open.spotify.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-700 transition-colors"
            >
              Spotify
            </a>
            <a
              href={episode.appleUrl || 'https://podcasts.apple.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-700 transition-colors"
            >
              Apple Podcasts
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
