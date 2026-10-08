'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Pause, Play, ArrowUpRight } from 'lucide-react';
import { HeroSlide } from '@/types';

interface HeroSliderProps {
  slides: HeroSlide[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Autoplay with ~3s cycle and reduced-motion preference check
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsPlaying(false);
      return;
    }

    if (!isPlaying || slides.length <= 1) return;
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide, slides.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch swipe gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
  };

  if (!slides || slides.length === 0) return null;

  const current = slides[currentIndex];

  return (
    <section
      className="relative bg-white overflow-hidden py-12 lg:py-20 border-b border-slate-100 group"
      aria-roledescription="carousel"
      aria-label="Featured Firm Highlights"
      tabIndex={0}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Hero Text Content */}
          <div className="lg:col-span-6 space-y-6 lg:space-y-8 z-10">
            <div key={`text-${current.id}`} className="space-y-5 transition-all duration-500 ease-out">
              {/* Main Hero Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                {current.title}
              </h1>

              {/* Hero Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                {current.subtitle}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href={current.primaryCtaLink || '/about'}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#008751] hover:bg-[#056839] rounded-lg shadow-sm transition-all duration-200 active:scale-[0.98] group/btn"
                >
                  <span>{current.primaryCtaText || 'About Akufai'}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </Link>

                <Link
                  href={current.secondaryCtaLink || '/contact'}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-800 bg-slate-50 hover:bg-[#f0fdf4] hover:text-[#008751] border border-slate-200 hover:border-[#008751]/40 rounded-lg transition-all duration-200 active:scale-[0.98]"
                >
                  <span>{current.secondaryCtaText || 'Get in Touch'}</span>
                </Link>
              </div>
            </div>

            {/* Accessible Pause/Resume Control available on focus & subtle slide indicator */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 focus:bg-[#f0fdf4] focus:text-[#008751] focus:ring-2 focus:ring-[#008751] rounded-full transition-all focus:outline-none opacity-0 focus:opacity-100 group-focus-within:opacity-100 hover:opacity-100"
                aria-label={isPlaying ? 'Pause slideshow' : 'Resume slideshow'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Pause auto-rotation' : 'Play auto-rotation'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Photograph */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden shadow-xl border-2 border-[#b6950b]/25 bg-slate-100">
              <div key={`img-${current.id}`} className="relative w-full h-full transition-opacity duration-500 ease-in-out">
                <Image
                  src={current.imageUrl || '/images/hero_patient_capital.png'}
                  alt={current.title}
                  fill
                  priority
                  className="object-cover object-top sm:object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
