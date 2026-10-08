'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid corporate or professional email address.');
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
        setMessage(data.message || 'You are now subscribed to occasional firm updates and selected reflections.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('A network error occurred. Please try again later.');
    }
  };

  return (
    <section id="newsletter" className="py-16 lg:py-20 bg-slate-50/80 border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#f0fdf4] text-[#008751] border border-[#dcfce7] shadow-xs">
          <Mail className="w-5 h-5" />
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Stay connected to selected Akufai updates
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            Receive occasional firm updates, launch announcements, and selected reflections from Akufai Capital & Equities.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#008751] focus:border-transparent transition-all shadow-xs"
              aria-label="Email address for firm updates"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-[#008751] hover:bg-[#056839] disabled:bg-slate-400 rounded-lg shadow-sm transition-all whitespace-nowrap active:scale-[0.98]"
            >
              {status === 'loading' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'SUBSCRIBE'
              )}
            </button>
          </div>

          {status === 'success' && (
            <div className="flex items-center justify-center gap-2 text-xs text-[#008751] bg-[#f0fdf4] p-3 rounded-lg border border-[#dcfce7]">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{message}</span>
            </div>
          )}

          {status === 'error' && (
            <div className="flex items-center justify-center gap-2 text-xs text-rose-700 bg-rose-50 p-3 rounded-lg border border-rose-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{message}</span>
            </div>
          )}

          <p className="text-xs text-slate-400">
            We respect your privacy. Unsubscribe anytime with a single click.
          </p>
        </form>
      </div>
    </section>
  );
}
