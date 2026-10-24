'use client';

import React, { useState, useEffect } from 'react';
import { Contributor } from '@/types';
import { Save, Plus, Trash2, CheckCircle2, Loader2, UserCheck } from 'lucide-react';

export default function AdminContributorsPage() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/admin/content')
      .then((res) => res.json())
      .then((res) => {
        if (res.data?.contributors) setContributors(res.data.contributors);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (index: number, field: keyof Contributor, value: any) => {
    setContributors((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleAdd = () => {
    const slug = `contributor-${Date.now()}`;
    const newContrib: Contributor = {
      id: slug,
      slug,
      name: 'New Contributor',
      role: 'Contributing Analyst',
      avatarUrl: '/images/contributor_faisal.jpg',
      bio: 'Biographical overview of expertise and research focus.',
      postCount: 0,
      episodeCount: 0,
      email: 'contributor@akufaicapitalandequities.com',
    };
    setContributors([...contributors, newContrib]);
  };

  const handleDelete = (index: number) => {
    if (confirm('Are you sure you want to remove this contributor profile?')) {
      setContributors(contributors.filter((_, i) => i !== index));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_contributors', payload: contributors }),
      });
      if (res.ok) {
        setMessage('Contributors updated successfully.');
        setTimeout(() => setMessage(''), 4000);
      }
    } catch {
      alert('Error saving contributors.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-sm text-slate-500">Loading contributors...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Contributors & Authors CMS</h1>
          <p className="text-xs text-slate-500">
            Manage intellectual contributors, biographies, and author profiles.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Contributor</span>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contributors.map((c, idx) => (
          <div
            key={c.id}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold font-mono text-[#036c3e]">{c.name}</span>
              <button
                onClick={() => handleDelete(idx)}
                className="text-slate-400 hover:text-rose-600 p-1"
                title="Delete contributor"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-slate-600">Full Name</label>
                <input
                  type="text"
                  value={c.name}
                  onChange={(e) => handleChange(idx, 'name', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-slate-600">URL Slug</label>
                <input
                  type="text"
                  value={c.slug}
                  onChange={(e) => handleChange(idx, 'slug', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-900 font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-slate-600">Role / Title</label>
              <input
                type="text"
                value={c.role}
                onChange={(e) => handleChange(idx, 'role', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-900"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-slate-600">Biography</label>
              <textarea
                value={c.bio}
                onChange={(e) => handleChange(idx, 'bio', e.target.value)}
                rows={3}
                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-900 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-slate-600">Avatar Image Path</label>
                <input
                  type="text"
                  value={c.avatarUrl}
                  onChange={(e) => handleChange(idx, 'avatarUrl', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-slate-600">Email Contact</label>
                <input
                  type="text"
                  value={c.email || ''}
                  onChange={(e) => handleChange(idx, 'email', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-900"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
