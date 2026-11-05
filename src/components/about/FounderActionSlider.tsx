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

  // Smooth ~4.5s autoplay with reduced-motion check
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsPlaying(false);
      return;
    }

    if (!isPlaying) return;
    const interval = setInterval(nextSlide, 4500);
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

  return (
    <div
      className="relative rounded-2xl overflow-hidden border border-[#b6960b]/50 shadow-md bg-[#041f12] group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#036c3e]"
      aria-roledescription="carousel"
      aria-label="Executive leadership action gallery"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-[#041f12]">
        {ACTION_SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={slide.url}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-all duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isActive
                  ? 'opacity-100 translate-x-0 z-10'
                  : 'opacity-0 translate-x-5 z-0 pointer-events-none'
              }`}
            >
              <Image
                src={slide.url}
                alt={slide.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={idx === 0}
                loading="eager"
                style={{ objectFit: 'contain' }}
                className="object-contain object-center"
              />
              {/* Subtle Bottom Gradient for Caption Readability */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent pointer-events-none" />
            </div>
          );
        })}

        {/* Smooth Animated Caption & Slide Indicators Overlay */}
        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-20 flex items-end justify-between gap-4 text-white">
          <div className="grid grid-cols-1 grid-rows-1 max-w-[72%]">
            {ACTION_SLIDES.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <div
                  key={slide.url}
                  aria-hidden={!isActive}
                  className={`col-start-1 row-start-1 space-y-1 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActive
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-2 pointer-events-none'
                  }`}
                >
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4b429] font-bold block">
                    Leadership in Action
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-white/95 line-clamp-1 drop-shadow-xs">
                    {slide.caption}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Slide Dots & Pause/Play Control */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5" role="tablist" aria-label="Gallery slide selector">
              {ACTION_SLIDES.map((slide, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={slide.url}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Show image ${idx + 1}: ${slide.caption}`}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                      isActive
                        ? 'w-6 bg-gradient-to-r from-[#e5c846] to-[#b6960b]'
                        : 'w-1.5 bg-white/40 hover:bg-white/70'
                    }`}
                  />
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-full bg-[#061c11]/85 text-slate-300 hover:text-[#d4b429] hover:bg-[#061c11] focus:text-[#d4b429] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b6960b] backdrop-blur-md border border-[#b6960b]/40 transition-all cursor-pointer"
              aria-label={isPlaying ? 'Pause slideshow' : 'Resume slideshow'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
