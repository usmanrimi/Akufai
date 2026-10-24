'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  audioUrl?: string;
  title: string;
  episodeNumber: number;
}

export default function AudioPlayer({ audioUrl, title, episodeNumber }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration || 0);
      setCurrentTime(audio.currentTime || 0);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current || !audioUrl) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch((err) => console.log('Audio playback error:', err));
    }
  };

  const seek = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + seconds));
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
    if (isNaN(sec)) return '00:00';
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {audioUrl && (
        <audio ref={audioRef} src={audioUrl} preload="metadata" />
      )}

      {/* Track Info */}
      <div className="flex items-center justify-between border-b border-[#123823] pb-4">
        <div>
          <span className="text-xs font-mono text-[#d4b429]">EPISODE {episodeNumber}</span>
          <h3 className="text-lg font-bold text-white leading-tight">{title}</h3>
        </div>
        <button
          onClick={cycleSpeed}
          className="px-2.5 py-1 rounded bg-[#0b2919] hover:bg-[#123823] border border-[#b6960b]/30 text-xs font-mono font-bold text-[#d4b429] transition-colors"
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
          max={duration || 100}
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
          onClick={toggleMute}
          className="p-2 text-slate-400 hover:text-[#d4b429] rounded-lg transition-colors focus:outline-none"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5" />}
        </button>

        <div className="flex items-center gap-4">
          <button
            onClick={() => seek(-15)}
            className="p-2 text-slate-400 hover:text-[#d4b429] rounded-lg transition-colors"
            title="Rewind 15s"
            aria-label="Rewind 15 seconds"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-gradient-to-br from-[#d4b429] to-[#b6960b] ring-4 ring-[#d4b429]/30 text-[#042f1b] flex items-center justify-center shadow-[0_0_25px_rgba(212,180,41,0.5)] transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#d4b429]"
            aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-[#042f1b]" />
            ) : (
              <Play className="w-6 h-6 fill-[#042f1b] translate-x-0.5" />
            )}
          </button>

          <button
            onClick={() => seek(15)}
            className="p-2 text-slate-400 hover:text-[#d4b429] rounded-lg transition-colors"
            title="Forward 15s"
            aria-label="Forward 15 seconds"
          >
            <RotateCw className="w-5 h-5" />
          </button>
        </div>

        <div className="w-9" /> {/* Visual spacer */}
      </div>
    </div>
  );
}
