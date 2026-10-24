'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { MailX, CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email') || '';
  const tokenParam = searchParams.get('token') || '';

  const [email, setEmail] = useState(emailParam);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email && !tokenParam) {
      setStatus('error');
      setMessage('Please enter your email address to unsubscribe.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token: tokenParam }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'You have been successfully unsubscribed from Akufai updates.');
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to process unsubscribe request.');
      }
    } catch {
      setStatus('error');
      setMessage('A network error occurred. Please try again.');
    }
  };

  return (
    <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
      <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center mx-auto">
        <MailX className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-900">Unsubscribe from Updates</h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          We are sorry to see you go. Confirm your email below to stop receiving occasional firm reflections and announcements.
        </p>
      </div>

      {status === 'success' ? (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-[#f2f9f5] border border-[#d6ebe0] flex items-center justify-center gap-2 text-xs text-[#036c3e]">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#b6960b]" />
            <span>{message}</span>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#036c3e] hover:text-[#b6960b]"
          >
            <span>Return to Homepage</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#b6960b]" />
          </Link>
        </div>
      ) : (
        <form onSubmit={handleUnsubscribe} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="w-full px-4 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#036c3e]"
          />

          {status === 'error' && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 flex items-center gap-2 text-xs text-rose-700">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{message}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold text-white bg-slate-800 hover:bg-slate-900 disabled:bg-slate-400 transition-colors flex items-center justify-center gap-2"
          >
            {status === 'loading' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              'Confirm Unsubscribe'
            )}
          </button>
        </form>
      )}
    </div>
  );
}

export default function NewsletterUnsubscribePage() {
  return (
    <div className="bg-slate-50 min-h-[60vh] flex items-center justify-center py-16 px-4">
      <Suspense fallback={<div className="text-sm text-slate-500">Loading...</div>}>
        <UnsubscribeContent />
      </Suspense>
    </div>
  );
}
