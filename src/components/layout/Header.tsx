'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Investment', href: '/investment' },
  { name: 'Podcast', href: '/podcast' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] py-3'
          : 'bg-white border-b border-slate-100 py-4 lg:py-4.5'
      }`}
    >
      {/* Subtle Logo-Sampled Gold Top Accent Line */}
      <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-[#008751] via-[#b6950b] to-[#008751]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Prominent brand logo with natural proportions */}
          <Link
            href="/"
            className="flex items-center shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#008751] rounded-lg"
            aria-label="Akufai Capital & Equities Home"
          >
            <div className="relative h-14 w-52 sm:h-16 sm:w-60 lg:h-18 lg:w-72 transition-transform duration-300 group-hover:opacity-95">
              <Image
                src="/images/logo.png"
                alt="Akufai Capital & Equities"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-2 text-[14.5px] font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-[#008751] font-semibold bg-[#f0fdf4]'
                      : 'text-slate-700 hover:text-[#008751] hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-3.5 right-3.5 h-[2px] bg-[#008751] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop "Get in Touch" Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-white bg-[#008751] hover:bg-[#056839] rounded-lg shadow-xs hover:shadow transition-all duration-200 active:scale-[0.98] group"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2.5 rounded-lg text-slate-700 hover:text-[#008751] hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#008751] transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#f0fdf4] text-[#008751] font-semibold border-l-3 border-[#008751]'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-[#008751]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="pt-2">
            <Link
              href="/contact"
              className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#008751] hover:bg-[#056839] rounded-lg shadow-sm transition-colors"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
