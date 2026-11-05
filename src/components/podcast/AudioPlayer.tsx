'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  audioUrl?: string;
  title: string;
  episodeNumber: number;
  compact?: boolean;
}

export default function AudioPlayer({
  audioUrl,
  title,
  episodeNumber,
  compact = false,
}: AudioPlayerProps) {
  const [srcUrl, setSrcUrl] = useState(
    audioUrl || '/media/akufai-audio-episode.wav'
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setSrcUrl(audioUrl || '/media/akufai-audio-episode.wav');
  }, [audioUrl]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
      setCurrentTime(audio.currentTime || 0);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime || 0);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('loadedmetadata', setAudioData);
    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [srcUrl]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          if (srcUrl !== '/media/akufai-audio-episode.wav') {
            setSrcUrl('/media/akufai-audio-episode.wav');
            setTimeout(() => {
              audioRef.current?.play().then(() => setIsPlaying(true)).catch(() => {});
            }, 50);
          }
        });
    }
  };

  const seek = (seconds: number) => {
    if (!audioRef.current) return;
    const next = Math.max(0, Math.min(duration || 30, audioRef.current.currentTime + seconds));
    audioRef.current.currentTime = next;
    setCurrentTime(next);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const cycleSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const nextSpeed = speeds[(speeds.indexOf(playbackRate) + 1) % speeds.length];
    setPlaybackRate(nextSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed;
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatSeconds = (sec: number) => {
    if (isNaN(sec) || !isFinite(sec)) return '00:00';
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (compact) {
    return (
      <div className="bg-[#061c11] text-white px-4 py-3 border-t border-[#b6960b]/45 space-y-2">
        <audio
          ref={audioRef}
          src={srcUrl}
          preload="metadata"
          onError={() => {
            if (srcUrl !== '/media/akufai-audio-episode.wav') {
              setSrcUrl('/media/akufai-audio-episode.wav');
            }
          }}
        />
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={togglePlay}
            className="w-9 h-9 rounded-full bg-gradient-to-br from-[#d4b429] to-[#b6960b] text-[#042f1b] flex items-center justify-center shrink-0 shadow-[0_0_16px_rgba(212,180,41,0.45)] hover:scale-105 active:scale-95 transition-transform cursor-pointer"
            aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-[#042f1b]" />
            ) : (
              <Play className="w-4 h-4 fill-[#042f1b] translate-x-0.5" />
            )}
          </button>

          <div className="flex-1 space-y-1">
            <input
              type="range"
              min={0}
              max={duration || 30}
              step={0.1}
              value={currentTime}
              onChange={handleSliderChange}
              className="w-full h-1.5 bg-[#0b2919] rounded-lg appearance-none cursor-pointer accent-[#d4b429]"
              aria-label="Audio scrubber"
            />
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
              <span className="text-[#d4b429]">{formatSeconds(currentTime)}</span>
              <span>{formatSeconds(duration)}</span>
            </div>
          </div>

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
            onClick={toggleMute}
            className="p-1.5 text-slate-300 hover:text-[#d4b429] rounded-md transition-colors cursor-pointer"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-rose-400" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <audio
        ref={audioRef}
        src={srcUrl}
        preload="metadata"
        onError={() => {
          if (srcUrl !== '/media/akufai-audio-episode.wav') {
            setSrcUrl('/media/akufai-audio-episode.wav');
          }
        }}
      />

      {/* Track Info */}
      <div className="flex items-center justify-between border-b border-[#123823] pb-4">
        <div>
          <span className="text-xs font-mono text-[#d4b429]">
            EPISODE {episodeNumber} • AUDIO STREAM
          </span>
          <h3 className="text-lg font-bold text-white leading-tight">{title}</h3>
        </div>
        <button
          type="button"
          onClick={cycleSpeed}
          className="px-2.5 py-1 rounded bg-[#0b2919] hover:bg-[#123823] border border-[#b6960b]/30 text-xs font-mono font-bold text-[#d4b429] transition-colors cursor-pointer"
          title="Playback speed"
        >
          {playbackRate}x
        </button>
      </div>

      {/* Time Slider */}
      <div className="space-y-2">
        <input
          type="range"
          min={0}
          max={duration || 30}
          step={0.1}
          value={currentTime}
          onChange={handleSliderChange}
          className="w-full h-1.5 bg-[#0b2919] rounded-lg appearance-none cursor-pointer accent-[#b6960b]"
          aria-label="Audio scrubber"
        />
        <div className="flex justify-between text-xs font-mono text-slate-400">
          <span>{formatSeconds(currentTime)}</span>
          <span>{formatSeconds(duration || 0)}</span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={toggleMute}
          className="p-2 text-slate-400 hover:text-[#d4b429] rounded-lg transition-colors focus:outline-none cursor-pointer"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5" />}
        </button>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => seek(-15)}
            className="p-2 text-slate-400 hover:text-[#d4b429] rounded-lg transition-colors cursor-pointer"
            title="Rewind 15s"
            aria-label="Rewind 15 seconds"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-gradient-to-br from-[#d4b429] to-[#b6960b] ring-4 ring-[#d4b429]/30 text-[#042f1b] flex items-center justify-center shadow-[0_0_25px_rgba(212,180,41,0.5)] transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#d4b429] cursor-pointer"
            aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-[#042f1b]" />
            ) : (
              <Play className="w-6 h-6 fill-[#042f1b] translate-x-0.5" />
            )}
          </button>

          <button
            type="button"
            onClick={() => seek(15)}
            className="p-2 text-slate-400 hover:text-[#d4b429] rounded-lg transition-colors cursor-pointer"
            title="Forward 15s"
            aria-label="Forward 15 seconds"
          >
            <RotateCw className="w-5 h-5" />
          </button>
        </div>

        <div className="w-9" />
      </div>
    </div>
  );
}
