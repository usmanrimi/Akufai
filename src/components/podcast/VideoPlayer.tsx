'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
} from 'lucide-react';

interface VideoPlayerProps {
  videoUrl?: string;
  audioUrl?: string;
  coverImageUrl: string;
  title: string;
  episodeNumber: number;
  hostName?: string;
  guestName?: string;
  compact?: boolean;
}

function getEmbedUrl(url?: string): string | null {
  if (!url) return null;
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (ytMatch) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`;
  }
  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
  }
  return null;
}

export default function VideoPlayer({
  videoUrl,
  audioUrl = '/media/akufai-audio-episode.wav',
  coverImageUrl,
  title,
  episodeNumber,
  hostName = 'Dr. Ali Garba',
  guestName,
  compact = false,
}: VideoPlayerProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [useStudioBroadcast, setUseStudioBroadcast] = useState(
    !videoUrl || videoUrl.includes('akufai-studio-broadcast')
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const embedUrl = getEmbedUrl(videoUrl);
  const activeMediaRef = useStudioBroadcast ? audioRef : videoRef;

  useEffect(() => {
    const media = activeMediaRef.current;
    if (!media) return;

    const handleLoadedMetadata = () => {
      if (media.duration && !isNaN(media.duration) && isFinite(media.duration)) {
        setDuration(media.duration);
      }
      setCurrentTime(media.currentTime || 0);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(media.currentTime || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    media.addEventListener('loadedmetadata', handleLoadedMetadata);
    media.addEventListener('loadeddata', handleLoadedMetadata);
    media.addEventListener('timeupdate', handleTimeUpdate);
    media.addEventListener('ended', handleEnded);

    return () => {
      media.removeEventListener('loadedmetadata', handleLoadedMetadata);
      media.removeEventListener('loadeddata', handleLoadedMetadata);
      media.removeEventListener('timeupdate', handleTimeUpdate);
      media.removeEventListener('ended', handleEnded);
    };
  }, [useStudioBroadcast, activeMediaRef]);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const togglePlay = () => {
    if (embedUrl) {
      setHasStarted(true);
      setIsPlaying(true);
      return;
    }

    const media = activeMediaRef.current;
    if (!media) return;

    setHasStarted(true);
    if (isPlaying) {
      media.pause();
      setIsPlaying(false);
    } else {
      media
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Fallback to studio broadcast audio if external video fails
          if (!useStudioBroadcast) {
            setUseStudioBroadcast(true);
            setTimeout(() => {
              audioRef.current?.play().then(() => setIsPlaying(true)).catch(() => {});
            }, 50);
          }
        });
    }
  };

  const seek = (delta: number) => {
    const media = activeMediaRef.current;
    if (!media) return;
    const next = Math.max(0, Math.min(duration || 30, media.currentTime + delta));
    media.currentTime = next;
    setCurrentTime(next);
  };

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = parseFloat(e.target.value);
    setCurrentTime(next);
    const media = activeMediaRef.current;
    if (media) {
      media.currentTime = next;
    }
  };

  const cycleSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const nextSpeed = speeds[(speeds.indexOf(playbackRate) + 1) % speeds.length];
    setPlaybackRate(nextSpeed);
    if (activeMediaRef.current) {
      activeMediaRef.current.playbackRate = nextSpeed;
    }
  };

  const toggleMute = () => {
    const media = activeMediaRef.current;
    if (!media) return;
    media.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const formatSeconds = (sec: number) => {
    if (isNaN(sec) || !isFinite(sec)) return '00:00';
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-xl overflow-hidden bg-[#061c11] border border-[#b6960b]/60 shadow-[0_14px_34px_-8px_rgba(182,150,11,0.28)] select-none group/video"
    >
      {/* Video Viewport (16:9) */}
      <div className="relative aspect-video w-full bg-[#04150c] overflow-hidden">
        {embedUrl && hasStarted ? (
          <iframe
            src={embedUrl}
            title={title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            {/* Native HTML5 Video when external MP4/WebM URL is used */}
            {!useStudioBroadcast && videoUrl && (
              <video
                ref={videoRef}
                src={videoUrl}
                poster={coverImageUrl}
                playsInline
                preload="metadata"
                onClick={togglePlay}
                onError={() => setUseStudioBroadcast(true)}
                className="w-full h-full object-cover cursor-pointer"
              />
            )}

            {/* Studio Broadcast Audio + Visual Feed */}
            {useStudioBroadcast && (
              <>
                <audio
                  ref={audioRef}
                  src={audioUrl || '/media/akufai-audio-episode.wav'}
                  preload="metadata"
                />
                <div
                  onClick={togglePlay}
                  className="relative w-full h-full cursor-pointer overflow-hidden"
                >
                  <Image
                    src={coverImageUrl || '/images/podcast_video_episode.jpg'}
                    alt={title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className={`object-cover object-center transition-transform duration-[4000ms] ease-out ${
                      isPlaying
                        ? 'scale-108'
                        : 'scale-100 group-hover/video:scale-105'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04150c]/90 via-[#04150c]/20 to-black/30 pointer-events-none" />

                  {/* Live Studio Broadcast Overlay when Playing */}
                  {hasStarted && (
                    <div className="absolute inset-x-4 bottom-3 flex items-end justify-between gap-4 pointer-events-none z-10">
                      <div className="bg-[#061c11]/88 backdrop-blur-md border border-[#b6960b]/50 rounded-lg px-3 py-1.5 max-w-[70%]">
                        <p className="text-[10px] font-mono uppercase tracking-wider text-[#d4b429] font-bold">
                          EPISODE {episodeNumber} • VIDEO STREAM
                        </p>
                        <p className="text-xs font-bold text-white truncate">
                          {hostName}
                          {guestName ? ` & ${guestName}` : ''}
                        </p>
                      </div>

                      {/* Animated Equalizer Bars */}
                      <div className="flex items-end gap-1 h-7 px-2.5 py-1.5 rounded-lg bg-[#061c11]/85 border border-[#b6960b]/40">
                        {[0.45, 0.85, 0.6, 1, 0.5, 0.9, 0.7, 0.4].map((h, i) => (
                          <span
                            key={i}
                            style={{
                              height: isPlaying ? `${Math.max(25, ((currentTime * 7 + i * 3) % 1) * 100 * h)}%` : '25%',
                            }}
                            className="w-1 bg-gradient-to-t from-[#b6960b] to-[#e5c846] rounded-full transition-all duration-150"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Center Play Button Overlay when Paused */}
            {!isPlaying && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 bg-black/35 hover:bg-black/25 transition-colors flex items-center justify-center cursor-pointer z-20"
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  aria-label={`Play video: ${title}`}
                  className="w-15 h-15 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#e5c846] via-[#d4b429] to-[#b6960b] text-[#042f1b] ring-4 ring-[#d4b429]/40 flex items-center justify-center shadow-[0_0_30px_rgba(212,180,41,0.65)] hover:scale-110 active:scale-95 transition-transform duration-300 cursor-pointer"
                >
                  <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-[#042f1b] translate-x-0.5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Interactive Video Playback Control Bar */}
      {!embedUrl && (
        <div className="bg-[#061c11] border-t border-[#b6960b]/40 px-3.5 py-2.5 space-y-2">
          {/* Scrubber Bar */}
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] font-mono text-[#d4b429] w-9 text-right shrink-0">
              {formatSeconds(currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={duration || 30}
              step={0.1}
              value={currentTime}
              onChange={handleScrub}
              className="flex-1 h-1.5 bg-[#0b2919] rounded-lg appearance-none cursor-pointer accent-[#d4b429]"
              aria-label="Video playback timeline"
            />
            <span className="text-[11px] font-mono text-slate-400 w-9 shrink-0">
              {formatSeconds(duration)}
            </span>
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={togglePlay}
                className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#d4b429] to-[#b6960b] text-[#042f1b] flex items-center justify-center shadow-xs hover:brightness-110 transition-all cursor-pointer"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-[#042f1b]" />
                ) : (
                  <Play className="w-4 h-4 fill-[#042f1b] translate-x-0.5" />
                )}
              </button>

              {!compact && (
                <>
                  <button
                    type="button"
                    onClick={() => seek(-15)}
                    className="p-1.5 text-slate-300 hover:text-[#d4b429] rounded-md transition-colors cursor-pointer"
                    title="Rewind 15s"
                    aria-label="Rewind 15 seconds"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => seek(15)}
                    className="p-1.5 text-slate-300 hover:text-[#d4b429] rounded-md transition-colors cursor-pointer"
                    title="Forward 15s"
                    aria-label="Forward 15 seconds"
                  >
                    <RotateCw className="w-4 h-4" />
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={toggleMute}
                className="p-1.5 text-slate-300 hover:text-[#d4b429] rounded-md transition-colors cursor-pointer"
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-rose-400" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={cycleSpeed}
                className="px-2 py-0.5 rounded bg-[#0b2919] hover:bg-[#123823] border border-[#b6960b]/40 text-[11px] font-mono font-bold text-[#d4b429] transition-colors cursor-pointer"
                title="Playback speed"
              >
                {playbackRate}x
              </button>

              <button
                type="button"
                onClick={toggleFullscreen}
                className="p-1.5 text-slate-300 hover:text-[#d4b429] rounded-md transition-colors cursor-pointer"
                title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
