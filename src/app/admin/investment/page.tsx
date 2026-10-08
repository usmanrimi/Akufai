'use client';

import React, { useState, useEffect } from 'react';
import { InvestmentArea } from '@/types';
import { Save, CheckCircle2, Loader2, Compass } from 'lucide-react';

export default function AdminInvestmentPage() {
  const [areas, setAreas] = useState<InvestmentArea[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/admin/content')
      .then((res) => res.json())
      .then((res) => {
        if (res.data?.investmentAreas) setAreas(res.data.investmentAreas);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (index: number, field: keyof InvestmentArea, value: any) => {
    setAreas((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_investment', payload: areas }),
      });
      if (res.ok) {
        setMessage('Investment focus areas saved and published.');
        setTimeout(() => setMessage(''), 4000);
      }
    } catch {
      alert('Error saving investment areas.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-sm text-slate-500">Loading investment areas...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Investment Focus CMS</h1>
          <p className="text-xs text-slate-500">
            Manage the six core investment sectors, theses, and subsector focus points.
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

      <div className="space-y-6">
        {areas.map((area, idx) => (
          <div
            key={area.id}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-mono font-bold text-[#008751]">
                Sector {area.number} • {area.title}
              </span>
              <span className="text-xs font-mono text-slate-400">{area.slug}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-slate-600">Sector Title</label>
                <input
                  type="text"
                  value={area.title}
                  onChange={(e) => handleChange(idx, 'title', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-slate-600">Featured Image Path</label>
                <input
                  type="text"
                  value={area.imageUrl}
                  onChange={(e) => handleChange(idx, 'imageUrl', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-slate-600">Short Summary</label>
              <textarea
                value={area.shortDescription}
                onChange={(e) => handleChange(idx, 'shortDescription', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 resize-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-slate-600">Detailed Thesis & Strategy</label>
              <textarea
                value={area.detailedDescription}
                onChange={(e) => handleChange(idx, 'detailedDescription', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 resize-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
