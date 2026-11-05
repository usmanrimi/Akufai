import React from 'react';
import Link from 'next/link';
import { Headphones, ArrowRight } from 'lucide-react';
import { PodcastEpisode } from '@/types';
import VideoPlayer from '@/components/podcast/VideoPlayer';
import AudioPlayer from '@/components/podcast/AudioPlayer';

interface PodcastFeatureProps {
  episodes: PodcastEpisode[];
}

export default function PodcastFeature({ episodes }: PodcastFeatureProps) {
  const featured = episodes[0];
  const isVideo = featured?.mediaType === 'video' || Boolean(featured?.videoUrl);

  return (
    <section className="py-16 lg:py-24 gold-surface-wash border-b border-[#dec668]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="gold-card-surface gold-glow-card rounded-2xl border border-[#dec668] shadow-md overflow-hidden relative">
          {/* Top Metallic Gold Bar */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#8f7506] via-[#e5c846] to-[#036c3e]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-8 sm:p-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#042f1b] tracking-tight">
                  Akufai Conversations
                </h2>
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
                  A podcast exploring capital, enterprise, technology, leadership, and the ideas shaping long-term value creation across markets.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
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
                    className="px-3 py-1 rounded-md bg-gradient-to-r from-[#fcf6df] to-[#f7ebc1] text-[#042f1b] border border-[#dec668] text-xs font-semibold shadow-2xs"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/podcast"
                  className="gold-btn-luxury inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold rounded-lg active:scale-[0.98] group"
                >
                  <Headphones className="w-4 h-4 text-[#042f1b]" />
                  <span>Explore Podcast Episodes</span>
                </Link>

                <Link
                  href="/contact"
                  className="green-gold-btn inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold rounded-lg active:scale-[0.98] group"
                >
                  <span>Suggest a Topic or Guest</span>
                  <ArrowRight className="w-4 h-4 text-[#d4b429] transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            {/* Right Card / Interactive Player Preview */}
            <div className="lg:col-span-5">
              <div className="bg-[#061c11] text-white rounded-xl p-6 shadow-[0_18px_40px_-10px_rgba(182,150,11,0.35)] border border-[#b6960b]/70 space-y-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-36 h-36 bg-[#b6960b]/25 rounded-full blur-2xl pointer-events-none gold-ambient-glow" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#d4b429]">
                    <span className="w-2 h-2 rounded-full bg-[#d4b429] animate-ping" />
                    <span>{isVideo ? 'VIDEO EPISODE' : 'AUDIO EPISODE'}</span>
                  </div>
                  <span className="text-xs text-[#d4b429]/80 font-mono">
                    Episode 0{featured?.episodeNumber || 1}
                  </span>
                </div>

                {isVideo ? (
                  <VideoPlayer
                    videoUrl={featured?.videoUrl}
                    audioUrl={featured?.audioUrl}
                    coverImageUrl={featured?.coverImageUrl || '/images/podcast_video_episode.jpg'}
                    title={featured?.title || 'Inside the Next Fintech Infrastructure Wave'}
                    episodeNumber={featured?.episodeNumber || 1}
                    hostName={featured?.hostName}
                    guestName={featured?.guestName}
                    compact
                  />
                ) : (
                  <AudioPlayer
                    audioUrl={featured?.audioUrl}
                    title={featured?.title || 'Inside the Next Fintech Infrastructure Wave'}
                    episodeNumber={featured?.episodeNumber || 1}
                  />
                )}

                <div className="space-y-1">
                  <p className="text-xs font-semibold text-[#d4b429] uppercase tracking-wider">
                    {featured?.category || 'Fintech Infrastructure'}
                  </p>
                  <h4 className="text-base font-bold text-white leading-snug">
                    <Link
                      href={`/podcast/${featured?.slug || 'inside-next-fintech-infrastructure-wave'}`}
                      className="hover:text-[#d4b429] transition-colors"
                    >
                      {featured?.title || 'Inside the Next Fintech Infrastructure Wave'}
                    </Link>
                  </h4>
                  <p className="text-xs text-slate-300">
                    Host: {featured?.hostName || 'Dr. Ali Garba'}
                    {featured?.guestName ? ` • Guest: ${featured.guestName}` : ''}
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
