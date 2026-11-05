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

  // Smooth autoplay with ~5s cycle and reduced-motion preference check
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsPlaying(false);
      return;
    }

    if (!isPlaying || slides.length <= 1) return;
    const interval = setInterval(nextSlide, 5000);
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

  return (
    <section
      className="relative bg-[#042f1b] text-white overflow-hidden py-14 lg:py-22 border-b-2 border-[#b6960b] group"
      aria-roledescription="carousel"
      aria-label="Featured Firm Highlights"
      tabIndex={0}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. Professional Institutional Background Image */}
      <div className="absolute inset-0 pointer-events-none select-none z-0" aria-hidden="true">
        <Image
          src="/images/hero_bg_institutional.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-30 scale-105 transition-transform duration-1000"
        />
        {/* Subtle Dark-Green Institutional Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#042f1b]/94 via-[#061c11]/88 to-[#036c3e]/82" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#042f1b]/90 via-transparent to-[#042f1b]/55" />
      </div>

      {/* 2. Large, Subtle Transparent Existing Logo Icon Watermark */}
      <div
        className="absolute -left-16 sm:left-6 lg:left-[34%] top-1/2 -translate-y-1/2 w-[340px] h-[285px] sm:w-[480px] sm:h-[400px] lg:w-[580px] lg:h-[485px] opacity-[0.075] pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <Image
          src="/images/logo-icon-watermark.png"
          alt=""
          fill
          sizes="580px"
          className="object-contain"
        />
      </div>

      {/* Subtle Ambient Golden Glow Aura */}
      <div className="absolute -top-24 -right-24 w-[480px] h-[480px] bg-radial from-[#d4b429]/24 via-[#b6960b]/10 to-transparent rounded-full blur-3xl pointer-events-none gold-ambient-glow z-0" />
      <div className="absolute -bottom-24 -left-24 w-[380px] h-[380px] bg-radial from-[#b6960b]/16 via-transparent to-transparent rounded-full blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Hero Text Content with Smooth Fade & Slide Motion */}
          <div className="lg:col-span-6 space-y-6 lg:space-y-8 z-10">
            <div className="grid grid-cols-1 grid-rows-1 items-center">
              {slides.map((slide, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <div
                    key={slide.id}
                    aria-hidden={!isActive}
                    className={`col-start-1 row-start-1 space-y-5 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive
                        ? 'opacity-100 translate-y-0 z-10'
                        : 'opacity-0 translate-y-4 pointer-events-none z-0'
                    }`}
                  >
                    {/* Main Hero Headline */}
                    <h1
                      style={{ color: '#ffffff' }}
                      className="text-4xl sm:text-5xl lg:text-6xl font-extrabold !text-white tracking-tight leading-[1.1] drop-shadow-xs"
                    >
                      {slide.title}
                    </h1>

                    {/* Hero Subtitle */}
                    <p
                      style={{ color: '#f8efcf' }}
                      className="text-base sm:text-lg !text-[#f8efcf]/95 leading-relaxed max-w-xl font-medium"
                    >
                      {slide.subtitle}
                    </p>

                    {/* Action Buttons */}
                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <Link
                        href={slide.primaryCtaLink || '/about'}
                        tabIndex={isActive ? 0 : -1}
                        className="gold-btn-luxury inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold rounded-lg active:scale-[0.98] group/btn"
                      >
                        <span>{slide.primaryCtaText || 'About Akufai'}</span>
                        <ArrowUpRight className="w-4 h-4 text-[#042f1b] transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </Link>

                      <Link
                        href={slide.secondaryCtaLink || '/contact'}
                        tabIndex={isActive ? 0 : -1}
                        className="green-gold-btn inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-lg active:scale-[0.98]"
                      >
                        <span>{slide.secondaryCtaText || 'Get in Touch'}</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Slide Indicators & Accessible Pause/Resume Control */}
            <div className="pt-2 flex items-center gap-4">
              <div className="flex items-center gap-2" role="tablist" aria-label="Slide selector">
                {slides.map((slide, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Show slide ${idx + 1}: ${slide.title}`}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                        isActive
                          ? 'w-8 bg-gradient-to-r from-[#e5c846] to-[#b6960b] shadow-[0_0_12px_rgba(212,180,41,0.7)]'
                          : 'w-2 bg-white/35 hover:bg-white/60'
                      }`}
                    />
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#f8efcf] bg-[#061c11]/80 hover:bg-[#061c11] border border-[#b6960b]/50 focus:ring-2 focus:ring-[#d4b429] rounded-full transition-all focus:outline-none opacity-80 hover:opacity-100 cursor-pointer"
                aria-label={isPlaying ? 'Pause slideshow' : 'Resume slideshow'}
              >
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5 text-[#d4b429]" />
                ) : (
                  <Play className="w-3.5 h-3.5 text-[#d4b429]" />
                )}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Photograph with Preloaded Crossfade & Gentle Zoom */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden border-2 border-[#d4b429] ring-4 ring-[#b6960b]/25 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.55)] bg-[#061c11] transition-shadow duration-500 hover:shadow-[0_28px_68px_-10px_rgba(182,150,11,0.45)] group/frame">
              {slides.map((slide, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <div
                    key={slide.id}
                    aria-hidden={!isActive}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    <Image
                      src={slide.imageUrl || '/images/hero_patient_capital.png'}
                      alt={slide.title}
                      fill
                      priority={idx === 0}
                      loading="eager"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className={`object-cover object-center transition-transform duration-[5500ms] ease-out group-hover/frame:scale-108 ${
                        isActive ? 'scale-105' : 'scale-100'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#042f1b]/30 via-transparent to-transparent pointer-events-none" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
