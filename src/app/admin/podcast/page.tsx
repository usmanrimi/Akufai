'use client';

import React, { useState, useEffect } from 'react';
import { PodcastEpisode } from '@/types';
import { Plus, Edit3, Trash2, Save, X, CheckCircle2, Loader2, Radio, ExternalLink } from 'lucide-react';

export default function AdminPodcastPage() {
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEpisode, setEditingEpisode] = useState<PodcastEpisode | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const loadData = () => {
    fetch('/api/admin/content')
      .then((res) => res.json())
      .then((res) => {
        if (res.data?.podcastEpisodes) setEpisodes(res.data.podcastEpisodes);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateNew = () => {
    const newEp: PodcastEpisode = {
      id: `ep-${Date.now()}`,
      slug: `episode-${episodes.length + 1}-strategic-discussion`,
      episodeNumber: episodes.length + 1,
      title: `Episode ${episodes.length + 1}: Emerging Market Dynamics`,
      category: 'Fintech',
      publishDate: '2026-05-15',
      status: 'scheduled',
      duration: '40 min',
      description: 'Strategic dialogue exploring cross-border execution, capital allocation, and market resilience.',
      audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=corporate-ambient-112199.mp3',
      coverImageUrl: '/images/blog_fintech_wave.jpg',
      hostName: 'Dr. Ali Garba',
      guestName: 'Strategic Operator',
      guestRole: 'Executive Leader',
      keyTakeaways: [
        'Strategic insights on multi-jurisdiction scaling.',
        'Capital structure discipline in high-growth environments.',
      ],
      transcript: 'Welcome to Akufai Conversations...',
    };
    setEditingEpisode(newEp);
  };

  const handleSave = async () => {
    if (!editingEpisode) return;
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save_podcast_episode', payload: editingEpisode }),
      });
      if (res.ok) {
        setMessage('Podcast episode saved and updated.');
        setEditingEpisode(null);
        loadData();
        setTimeout(() => setMessage(''), 4000);
      }
    } catch {
      alert('Error saving episode.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this podcast episode?')) return;
    try {
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete_podcast_episode', payload: { id } }),
      });
      loadData();
    } catch {
      alert('Error deleting episode.');
    }
  };

  if (loading) return <div className="text-sm text-slate-500">Loading podcast episodes...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Akufai Conversations Podcast CMS</h1>
          <p className="text-xs text-slate-500">
            Manage audio releases, preview tracks, guest bios, and episode transcripts.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#008751] hover:bg-[#056839] rounded-lg shadow-xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Podcast Episode</span>
        </button>
      </div>

      {message && (
        <div className="p-3 bg-[#f0fdf4] border border-[#dcfce7] rounded-lg text-xs text-[#008751] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Editor Modal */}
      {editingEpisode && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900">Edit Podcast Episode</h2>
              <button onClick={() => setEditingEpisode(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold uppercase text-slate-600">Episode Title</label>
                  <input
                    type="text"
                    value={editingEpisode.title}
                    onChange={(e) => setEditingEpisode({ ...editingEpisode, title: e.target.value })}
                    className="w-full px-3 py-2 text-sm font-semibold border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-600">Episode Number</label>
                  <input
                    type="number"
                    value={editingEpisode.episodeNumber}
                    onChange={(e) =>
                      setEditingEpisode({ ...editingEpisode, episodeNumber: parseInt(e.target.value) || 1 })
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-600">Category</label>
                  <input
                    type="text"
                    value={editingEpisode.category}
                    onChange={(e) => setEditingEpisode({ ...editingEpisode, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-600">Status</label>
                  <select
                    value={editingEpisode.status}
                    onChange={(e) => setEditingEpisode({ ...editingEpisode, status: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900"
                  >
                    <option value="published">Published</option>
                    <option value="scheduled">Scheduled / Preview</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-600">Duration</label>
                  <input
                    type="text"
                    value={editingEpisode.duration}
                    onChange={(e) => setEditingEpisode({ ...editingEpisode, duration: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-600">Host Name</label>
                  <input
                    type="text"
                    value={editingEpisode.hostName}
                    onChange={(e) => setEditingEpisode({ ...editingEpisode, hostName: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-600">Guest Name</label>
                  <input
                    type="text"
                    value={editingEpisode.guestName || ''}
                    onChange={(e) => setEditingEpisode({ ...editingEpisode, guestName: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-slate-600">Audio Stream URL (MP3 / CDN)</label>
                <input
                  type="text"
                  value={editingEpisode.audioUrl || ''}
                  onChange={(e) => setEditingEpisode({ ...editingEpisode, audioUrl: e.target.value })}
                  placeholder="https://.../episode.mp3"
                  className="w-full px-3 py-2 text-xs font-mono border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-slate-600">Episode Description & Show Notes</label>
                <textarea
                  value={editingEpisode.description}
                  onChange={(e) => setEditingEpisode({ ...editingEpisode, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-slate-600">Full Transcript (Optional)</label>
                <textarea
                  value={editingEpisode.transcript || ''}
                  onChange={(e) => setEditingEpisode({ ...editingEpisode, transcript: e.target.value })}
                  rows={5}
                  className="w-full px-3 py-2 text-xs font-mono border border-slate-200 rounded-lg text-slate-900"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setEditingEpisode(null)}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2 text-xs font-bold text-white bg-[#008751] hover:bg-[#056839] rounded-lg shadow-sm flex items-center gap-1.5"
              >
                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                <span>Save Episode</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Episodes List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="divide-y divide-slate-100">
          {episodes.map((ep) => (
            <div key={ep.id} className="p-5 hover:bg-slate-50 transition-colors flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#008751]">EPISODE {ep.episodeNumber}</span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs font-medium text-slate-600">{ep.category}</span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500">{ep.duration}</span>
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      ep.status === 'published'
                        ? 'bg-emerald-100 text-emerald-800'
                        : ep.status === 'scheduled'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {ep.status}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{ep.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-1">{ep.description}</p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`/podcast/${ep.slug}`}
                  target="_blank"
                  className="p-2 text-slate-400 hover:text-[#008751] rounded-lg hover:bg-slate-100"
                  title="View on public site"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setEditingEpisode(ep)}
                  className="p-2 text-slate-600 hover:text-[#008751] rounded-lg hover:bg-slate-100"
                  title="Edit episode"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(ep.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100"
                  title="Delete episode"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
