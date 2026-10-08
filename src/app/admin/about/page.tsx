'use client';

import React, { useState, useEffect } from 'react';
import { AboutContent, ValueItem } from '@/types';
import { Save, CheckCircle2, Loader2, Plus, Trash2 } from 'lucide-react';

export default function AdminAboutPage() {
  const [about, setAbout] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/admin/content')
      .then((res) => res.json())
      .then((res) => {
        if (res.data?.about) setAbout(res.data.about);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleFounderChange = (field: string, value: any) => {
    if (!about) return;
    setAbout({
      ...about,
      founder: { ...about.founder, [field]: value },
    });
  };

  const handleValueChange = (index: number, field: keyof ValueItem, value: string) => {
    if (!about) return;
    const newValues = [...about.values];
    newValues[index] = { ...newValues[index], [field]: value };
    setAbout({ ...about, values: newValues });
  };

  const handleAddValue = () => {
    if (!about) return;
    setAbout({
      ...about,
      values: [...about.values, { title: 'New Core Value', description: 'Description of the principle.' }],
    });
  };

  const handleDeleteValue = (index: number) => {
    if (!about) return;
    setAbout({
      ...about,
      values: about.values.filter((_, i) => i !== index),
    });
  };

  const handleSave = async () => {
    if (!about) return;
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_about', payload: about }),
      });
      if (res.ok) {
        setMessage('About content saved and updated across all public pages.');
        setTimeout(() => setMessage(''), 4000);
      }
    } catch {
      alert('Error saving about content.');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !about) return <div className="text-sm text-slate-500">Loading about settings...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">About & Leadership CMS</h1>
          <p className="text-xs text-slate-500">
            Edit executive biographies, firm overview, approach statements, and core values.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#008751] hover:bg-[#056839] disabled:bg-slate-400 rounded-lg shadow-xs transition-colors"
        >
          {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          <span>Save & Publish</span>
        </button>
      </div>

      {message && (
        <div className="p-3 bg-[#f0fdf4] border border-[#dcfce7] rounded-lg text-xs text-[#008751] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Founder Executive Section */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
          Founder Profile: Dr. Ali Garba
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-slate-600">Full Name</label>
            <input
              type="text"
              value={about.founder.name}
              onChange={(e) => handleFounderChange('name', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-slate-600">Executive Titles</label>
            <input
              type="text"
              value={about.founder.titles}
              onChange={(e) => handleFounderChange('titles', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase text-slate-600">Biography Paragraph 1</label>
          <textarea
            value={about.founder.bioParagraphs[0] || ''}
            onChange={(e) => {
              const bios = [...about.founder.bioParagraphs];
              bios[0] = e.target.value;
              handleFounderChange('bioParagraphs', bios);
            }}
            rows={2}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 resize-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase text-slate-600">Biography Paragraph 2</label>
          <textarea
            value={about.founder.bioParagraphs[1] || ''}
            onChange={(e) => {
              const bios = [...about.founder.bioParagraphs];
              bios[1] = e.target.value;
              handleFounderChange('bioParagraphs', bios);
            }}
            rows={2}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 resize-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase text-slate-600">Biography Paragraph 3</label>
          <textarea
            value={about.founder.bioParagraphs[2] || ''}
            onChange={(e) => {
              const bios = [...about.founder.bioParagraphs];
              bios[2] = e.target.value;
              handleFounderChange('bioParagraphs', bios);
            }}
            rows={2}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 resize-none"
          />
        </div>
      </div>

      {/* Approach & Deliberate Model */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
          Our Approach Content
        </h2>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase text-slate-600">Approach Paragraph 1</label>
          <textarea
            value={about.approachParagraph1}
            onChange={(e) => setAbout({ ...about, approachParagraph1: e.target.value })}
            rows={2}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 resize-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase text-slate-600">Approach Paragraph 2</label>
          <textarea
            value={about.approachParagraph2}
            onChange={(e) => setAbout({ ...about, approachParagraph2: e.target.value })}
            rows={2}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 resize-none"
          />
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h2 className="text-base font-bold text-slate-900">Core Values</h2>
          <button
            onClick={handleAddValue}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#008751] hover:underline"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Value</span>
          </button>
        </div>

        <div className="space-y-3">
          {about.values.map((val, idx) => (
            <div key={idx} className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  value={val.title}
                  onChange={(e) => handleValueChange(idx, 'title', e.target.value)}
                  className="px-2.5 py-1 text-xs font-bold border border-slate-200 rounded bg-white text-slate-900"
                />
                <button
                  onClick={() => handleDeleteValue(idx)}
                  className="text-slate-400 hover:text-rose-600 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <textarea
                value={val.description}
                onChange={(e) => handleValueChange(idx, 'description', e.target.value)}
                rows={2}
                className="w-full px-2.5 py-1 text-xs border border-slate-200 rounded bg-white text-slate-900 resize-none"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
