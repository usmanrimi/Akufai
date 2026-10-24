'use client';

import React, { useState } from 'react';
import { Mail, MapPin, CheckCircle2, AlertCircle, Loader2, ArrowRight, ShieldCheck, Check, Sparkles } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    inquiryType: 'investment',
    subject: '',
    message: '',
    hp: '', // Honeypot spam trap
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formData.hp) {
      // Silently succeed for bots
      setStatus('success');
      setFeedback('Your inquiry has been submitted successfully.');
      return;
    }

    if (!formData.name || !formData.email || !formData.message || !formData.subject) {
      setStatus('error');
      setFeedback('Please complete all required fields.');
      return;
    }

    setStatus('loading');
    setFeedback('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          organization: formData.organization,
          inquiryType: formData.inquiryType,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setFeedback(
          data.message ||
            'Your inquiry has been successfully received. Due to our selective review process, we will follow up with aligned opportunities.'
        );
        setFormData({
          name: '',
          email: '',
          organization: '',
          inquiryType: 'investment',
          subject: '',
          message: '',
          hp: '',
        });
      } else {
        setStatus('error');
        setFeedback(data.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch {
      setStatus('error');
      setFeedback('A network error occurred. Please try again later or email us directly.');
    }
  };

  return (
    <div className="gold-surface-wash">
      {/* 1. Approved High-Contrast Green Brand Hero with Ambient Golden Glow */}
      <section className="py-20 lg:py-28 bg-[#061c11] text-white relative overflow-hidden border-b-2 border-[#b6960b]">
        <div className="absolute inset-0 bg-radial from-[#b6960b]/28 via-[#036c3e]/20 to-transparent pointer-events-none gold-ambient-glow" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <h1
            style={{ color: '#ffffff' }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white !text-white tracking-tight leading-[1.12]"
          >
            For Aligned Inquiries
          </h1>
          <p
            style={{ color: '#f8efcf' }}
            className="text-lg sm:text-xl !text-[#f8efcf] leading-relaxed max-w-2xl mx-auto font-medium"
          >
            Akufai welcomes a limited number of aligned inquiries, strategic introductions, and partnership conversations.
          </p>
        </div>
      </section>

      {/* 2. Main Contact Grid with Rich Green/Gold Panel & Luxury Form */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left Column: Clearly Structured Green Information Panel with Golden Glow */}
          <div className="lg:col-span-5 bg-[#061c11] text-white rounded-3xl p-8 sm:p-10 lg:p-11 border-2 border-[#b6960b]/70 shadow-[0_18px_42px_-10px_rgba(182,150,11,0.3)] relative overflow-hidden flex flex-col justify-between space-y-8">
            {/* Subtle Golden Gradient Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#b6960b]/22 rounded-full blur-3xl pointer-events-none gold-ambient-glow" />

            <div className="space-y-6 relative z-10">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Engagement Guidelines
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed pt-1">
                  For relevant opportunities or thoughtful introductions, please get in touch via the contact form or direct email.
                </p>
              </div>

              {/* Well-Spaced Guideline Items with Restrained Gold Accents */}
              <div className="space-y-5 pt-2">
                <div className="space-y-1.5 p-4 rounded-2xl bg-[#0b2919]/80 border border-[#b6960b]/50">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d4b429]">
                    <Check className="w-4 h-4 text-[#d4b429]" />
                    <span>Selective Alignment</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-6">
                    We prioritize ventures with verified market traction, strong leadership, and real-world socioeconomic utility.
                  </p>
                </div>

                <div className="space-y-1.5 p-4 rounded-2xl bg-[#0b2919]/80 border border-[#b6960b]/50">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d4b429]">
                    <ShieldCheck className="w-4 h-4 text-[#d4b429]" />
                    <span>Strict Confidentiality</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-6">
                    All submitted materials, financials, and proprietary communications remain strictly confidential under institutional standards.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Channels Footer inside Panel */}
            <div className="space-y-4 pt-6 border-t border-[#b6960b]/35 relative z-10">
              <div className="flex items-start gap-3.5 text-sm text-slate-300">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#d4b429] to-[#b6960b] text-[#042f1b] flex items-center justify-center shrink-0 border border-[#fff3b8] shadow-xs">
                  <Mail className="w-4 h-4 text-[#042f1b]" />
                </div>
                <div>
                  <span className="block text-[11px] font-bold text-[#d4b429] uppercase tracking-wider">
                    Official Inquiries Email
                  </span>
                  <a
                    href="mailto:inquiries@akufaicapitalandequities.com"
                    className="font-medium text-white hover:text-[#d4b429] transition-colors break-all"
                  >
                    inquiries@akufaicapitalandequities.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-sm text-slate-300">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#d4b429] to-[#b6960b] text-[#042f1b] flex items-center justify-center shrink-0 border border-[#fff3b8] shadow-xs">
                  <MapPin className="w-4 h-4 text-[#042f1b]" />
                </div>
                <div>
                  <span className="block text-[11px] font-bold text-[#d4b429] uppercase tracking-wider">
                    Geographic Focus & Hubs
                  </span>
                  <span className="font-medium text-white">
                    Abu Dhabi • Lagos • London
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Submission Form */}
          <div className="lg:col-span-7 gold-card-surface p-8 sm:p-10 lg:p-11 rounded-3xl border border-[#dec668] shadow-[0_14px_34px_-8px_rgba(182,150,11,0.18)] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#8f7506] via-[#e5c846] to-[#036c3e]" />
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot Spam Trap */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="hp"
                  value={formData.hp}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-[#036c3e]">
                    Full Name <span className="text-[#b6960b]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Dr. Ali Garba"
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#036c3e] focus:border-transparent transition-all"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#036c3e]">
                    Corporate Email <span className="text-[#b6960b]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="name@firm.com"
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#036c3e] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Organization */}
                <div className="space-y-1.5">
                  <label htmlFor="organization" className="block text-xs font-bold uppercase tracking-wider text-[#036c3e]">
                    Organization / Entity
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="e.g. HealthTech Global LLC"
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#036c3e] focus:border-transparent transition-all"
                  />
                </div>

                {/* Inquiry Type */}
                <div className="space-y-1.5">
                  <label htmlFor="inquiryType" className="block text-xs font-bold uppercase tracking-wider text-[#036c3e]">
                    Inquiry Nature
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#036c3e] focus:border-transparent transition-all"
                  >
                    <option value="investment">Investment / Venture Proposal</option>
                    <option value="partnership">Strategic Partnership</option>
                    <option value="podcast">Podcast / Media Reflection</option>
                    <option value="general">General Inquiries</option>
                  </select>
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-[#036c3e]">
                  Subject <span className="text-[#b6960b]">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Summary of proposition or intro"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#036c3e] focus:border-transparent transition-all"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-[#036c3e]">
                  Message / Proposal Context <span className="text-[#b6960b]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Please provide concise background context on the venture, fundamentals, or partnership alignment..."
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#036c3e] focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Feedback messages */}
              {status === 'success' && (
                <div className="p-4 rounded-xl bg-[#f2f9f5] border border-[#d6ebe0] flex items-start gap-3 text-sm text-[#036c3e]">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-[#b6960b]" />
                  <span>{feedback}</span>
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-sm text-rose-700">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{feedback}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="gold-btn-luxury w-full py-3.5 px-6 rounded-xl text-sm font-bold disabled:bg-slate-400 flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing Submission...</span>
                  </>
                ) : (
                  <>
                    <span>SUBMIT ALIGNED INQUIRY</span>
                    <ArrowRight className="w-4 h-4 text-[#042f1b]" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
