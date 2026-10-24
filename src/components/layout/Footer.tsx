'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'Thank you for subscribing to selected Akufai updates.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Unable to subscribe. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('A network error occurred. Please try again.');
    }
  };

  return (
    <footer className="bg-[#061c11] text-white border-t-2 border-[#b6960b]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-18">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Column 1: Brand & Larger Logo */}
          <div className="md:col-span-5 space-y-5">
            <Link
              href="/"
              className="inline-block bg-white rounded-xl p-2 sm:p-2.5 border border-[#b6960b]/30 shadow-sm hover:opacity-95 transition-opacity"
            >
              <div className="relative h-18 w-56 sm:h-22 sm:w-72 lg:h-24 lg:w-80">
                <Image
                  src="/images/logo.png"
                  alt="Akufai Capital & Equities"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed pr-4">
              Akufai Capital & Equities LLC is a private investment firm led by Dr. Ali Garba. The firm takes a long-term, selective approach to opportunities across multiple sectors, with particular interest in ventures with strong fundamentals, cross-border relevance, and meaningful social impact.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4b429]">Navigation</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-slate-300 hover:text-[#d4b429] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-300 hover:text-[#d4b429] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/investment" className="text-slate-300 hover:text-[#d4b429] transition-colors">
                  Investment Focus
                </Link>
              </li>
              <li>
                <Link href="/podcast" className="text-slate-300 hover:text-[#d4b429] transition-colors">
                  Podcast
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-300 hover:text-[#d4b429] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about#contributors" className="text-slate-300 hover:text-[#d4b429] transition-colors">
                  Authors & Contributors
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-[#d4b429] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Stay Connected Newsletter Form */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4b429]">Stay Connected</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Receive occasional firm updates, launch announcements, and selected reflections from Akufai Capital & Equities.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2.5">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 px-4 py-2.5 text-sm bg-[#0b2919] border border-[#b6960b]/30 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#b6960b] focus:border-transparent transition-all"
                  aria-label="Email address for updates"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-sm font-bold text-[#042f1b] bg-[#b6960b] hover:bg-[#d4b429] disabled:bg-slate-600 rounded-lg shadow-sm transition-all whitespace-nowrap active:scale-[0.98] group cursor-pointer"
                >
                  {status === 'loading' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </div>

              {status === 'success' && (
                <div className="flex items-center gap-2 text-xs text-[#d4b429] bg-[#0b2919] p-2.5 rounded-md border border-[#b6960b]/40">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{message}</span>
                </div>
              )}

              {status === 'error' && (
                <div className="flex items-center gap-2 text-xs text-rose-300 bg-rose-950/50 p-2.5 rounded-md border border-rose-800">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{message}</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar: Cleaned without disclaimer banner, admin portal, or aligned inquiries label */}
        <div className="mt-12 pt-8 border-t border-[#123823] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © 2026 Akufai Capital & Equities LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
