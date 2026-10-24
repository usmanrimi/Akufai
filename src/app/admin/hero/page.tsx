'use client';

import React, { useState, useEffect } from 'react';
import { HeroSlide } from '@/types';
import { Save, Plus, Trash2, CheckCircle2, Loader2, Image as ImageIcon } from 'lucide-react';

export default function AdminHeroPage() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/admin/content')
      .then((res) => res.json())
      .then((res) => {
        if (res.data?.heroSlides) setSlides(res.data.heroSlides);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (index: number, field: keyof HeroSlide, value: any) => {
    setSlides((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleAddSlide = () => {
    const newSlide: HeroSlide = {
      id: `slide-${Date.now()}`,
      kicker: 'Strategic Orientation',
      title: 'New Firm Pillar',
      subtitle: 'Description of the strategic thesis and long-term capital allocation.',
      primaryCtaText: 'Explore More',
      primaryCtaLink: '/about',
      secondaryCtaText: 'For Aligned Inquiries',
      secondaryCtaLink: '/contact',
      imageUrl: '/images/hero_patient_capital.png',
      order: slides.length + 1,
      isActive: true,
    };
    setSlides([...slides, newSlide]);
  };

  const handleDeleteSlide = (index: number) => {
    if (confirm('Are you sure you want to delete this slide?')) {
      setSlides(slides.filter((_, i) => i !== index));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_slides', payload: slides }),
      });
      if (res.ok) {
        setMessage('Hero slides saved and updated on the public website.');
        setTimeout(() => setMessage(''), 4000);
      }
    } catch {
      alert('Error saving slides.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-sm text-slate-500">Loading hero slides...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Hero Carousel Manager</h1>
          <p className="text-xs text-slate-500">
            Configure homepage split hero slides, messaging, and action buttons.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAddSlide}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Slide</span>
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#036c3e] hover:bg-[#02522f] disabled:bg-slate-400 rounded-lg shadow-xs transition-colors"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>Save & Publish</span>
          </button>
        </div>
      </div>

      {message && (
        <div className="p-3 bg-[#f0fdf4] border border-[#dcfce7] rounded-lg text-xs text-[#036c3e] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <div className="space-y-6">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold font-mono text-[#036c3e]">
                Slide #{index + 1}
              </span>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={slide.isActive}
                    onChange={(e) => handleChange(index, 'isActive', e.target.checked)}
                    className="rounded text-[#036c3e] focus:ring-[#036c3e]"
                  />
                  <span>Active</span>
                </label>
                <button
                  onClick={() => handleDeleteSlide(index)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded"
                  title="Delete slide"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-slate-600">Kicker Badge</label>
                <input
                  type="text"
                  value={slide.kicker}
                  onChange={(e) => handleChange(index, 'kicker', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-slate-600">Headline Title</label>
                <input
                  type="text"
                  value={slide.title}
                  onChange={(e) => handleChange(index, 'title', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-slate-600">Supporting Subtitle</label>
              <textarea
                value={slide.subtitle}
                onChange={(e) => handleChange(index, 'subtitle', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-slate-600">Primary Button</label>
                <input
                  type="text"
                  value={slide.primaryCtaText}
                  onChange={(e) => handleChange(index, 'primaryCtaText', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-slate-600">Secondary Button</label>
                <input
                  type="text"
                  value={slide.secondaryCtaText}
                  onChange={(e) => handleChange(index, 'secondaryCtaText', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-slate-600">Image Path / URL</label>
                <input
                  type="text"
                  value={slide.imageUrl}
                  onChange={(e) => handleChange(index, 'imageUrl', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
