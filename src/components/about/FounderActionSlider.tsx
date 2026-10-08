'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Pause, Play } from 'lucide-react';

interface ActionSlide {
  url: string;
  caption: string;
  alt: string;
}

const ACTION_SLIDES: ActionSlide[] = [
  {
    url: '/images/founder_business_meeting.jpg',
    caption: 'Strategic Engagement & Operational Alignment',
    alt: 'Illustrative scene: Dr. Ali Garba reviewing strategy documents with executive leadership.',
  },
  {
    url: '/images/founder_networking_break.jpg',
    caption: 'Cross-Border Networks & Collaborative Exchange',
    alt: 'Illustrative scene: Dr. Ali Garba engaging with peers and international partners.',
  },
  {
    url: '/images/founder_panel_discussion.jpg',
    caption: 'Executive Leadership & Long-Term Orientation',
    alt: 'Illustrative scene: Dr. Ali Garba leading a strategic dialogue.',
  },
];

export default function FounderActionSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % ACTION_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + ACTION_SLIDES.length) % ACTION_SLIDES.length);
  }, []);

  // Autoplay ~3s with reduced-motion check
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsPlaying(false);
      return;
    }

    if (!isPlaying) return;
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  };

  // Touch swipe gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  const current = ACTION_SLIDES[currentIndex];

  return (
    <div
      className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-md bg-slate-900 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#008751]"
      aria-roledescription="carousel"
      aria-label="Executive leadership action gallery"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {ACTION_SLIDES.map((slide, idx) => (
          <div
            key={slide.url}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <Image
              src={slide.url}
              alt={slide.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={idx === 0}
              className="object-cover object-top sm:object-center"
            />
            {/* Subtle Gradient for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
          </div>
        ))}

        {/* Caption & Accessible Controls Overlay */}
        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-20 flex items-end justify-between gap-4 text-white">
          <div className="space-y-1 max-w-[80%]">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
              Leadership in Action
            </span>
            <p className="text-xs sm:text-sm font-semibold text-white/95 line-clamp-1 drop-shadow-xs">
              {current.caption}
            </p>
          </div>

          {/* Accessible Pause/Resume Control on Focus/Hover */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-full bg-slate-900/80 text-slate-300 hover:text-emerald-400 hover:bg-slate-900 focus:text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 backdrop-blur-md border border-white/10 transition-all opacity-0 focus:opacity-100 group-focus-within:opacity-100 hover:opacity-100"
            aria-label={isPlaying ? 'Pause slideshow' : 'Resume slideshow'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
