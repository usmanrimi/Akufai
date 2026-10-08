'use client';

import React, { useState, useEffect } from 'react';
import { SiteSettings } from '@/types';
import { Save, CheckCircle2, Loader2, Settings, Shield } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/admin/content')
      .then((res) => res.json())
      .then((res) => {
        if (res.data?.settings) setSettings(res.data.settings);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (field: keyof SiteSettings, value: any) => {
    if (!settings) return;
    setSettings({ ...settings, [field]: value });
  };

  const handleSocialChange = (network: string, value: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      socialLinks: { ...settings.socialLinks, [network]: value },
    });
  };

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_settings', payload: settings }),
      });
      if (res.ok) {
        setMessage('Site settings and SEO metadata saved.');
        setTimeout(() => setMessage(''), 4000);
      }
    } catch {
      alert('Error saving settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) return <div className="text-sm text-slate-500">Loading settings...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Site Settings & SEO Configuration</h1>
          <p className="text-xs text-slate-500">
            Configure global brand metadata, legal disclaimers, contact details, and social links.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#008751] hover:bg-[#056839] disabled:bg-slate-400 rounded-lg shadow-xs transition-colors"
        >
          {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          <span>Save Settings</span>
        </button>
      </div>

      {message && (
        <div className="p-3 bg-[#f0fdf4] border border-[#dcfce7] rounded-lg text-xs text-[#008751] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Global Meta */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
          Brand Identity & SEO
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase text-slate-600">Firm Name</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => handleChange('siteName', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase text-slate-600">Brand Tagline</label>
            <input
              type="text"
              value={settings.siteTagline}
              onChange={(e) => handleChange('siteTagline', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold uppercase text-slate-600">
            Search Engine Meta Description
          </label>
          <textarea
            value={settings.metaDescription}
            onChange={(e) => handleChange('metaDescription', e.target.value)}
            rows={2}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 resize-none"
          />
        </div>
      </div>

      {/* Contact & Legal Notices */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
          Contact Details & Legal Disclaimers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase text-slate-600">Official Inquiries Email</label>
            <input
              type="email"
              value={settings.contactEmail}
              onChange={(e) => handleChange('contactEmail', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase text-slate-600">Hub Locations</label>
            <input
              type="text"
              value={settings.contactAddress}
              onChange={(e) => handleChange('contactAddress', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold uppercase text-slate-600">
            Primary Legal Disclaimer
          </label>
          <textarea
            value={settings.disclaimer}
            onChange={(e) => handleChange('disclaimer', e.target.value)}
            rows={2}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 resize-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold uppercase text-slate-600">
            Footer Copyright & Disclaimer Note
          </label>
          <textarea
            value={settings.secondaryDisclaimer}
            onChange={(e) => handleChange('secondaryDisclaimer', e.target.value)}
            rows={2}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 resize-none"
          />
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
          Podcast & Social Channels
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase text-slate-600">LinkedIn URL</label>
            <input
              type="text"
              value={settings.socialLinks?.linkedin || ''}
              onChange={(e) => handleSocialChange('linkedin', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase text-slate-600">X (Twitter) URL</label>
            <input
              type="text"
              value={settings.socialLinks?.twitter || ''}
              onChange={(e) => handleSocialChange('twitter', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase text-slate-600">Spotify Podcast URL</label>
            <input
              type="text"
              value={settings.socialLinks?.spotify || ''}
              onChange={(e) => handleSocialChange('spotify', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase text-slate-600">Apple Podcasts URL</label>
            <input
              type="text"
              value={settings.socialLinks?.apple || ''}
              onChange={(e) => handleSocialChange('apple', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900"
            />
          </div>
        </div>
      </div>

      {/* Super Admin Security Section */}
      <PasswordChangeCard />
    </div>
  );
}

function PasswordChangeCard() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('admin@akufaicapitalandequities.com');
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [updating, setUpdating] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    if (newPassword.length < 8) {
      setMsg({ type: 'error', text: 'New password must be at least 8 characters long.' });
      return;
    }

    setUpdating(true);
    setMsg(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, currentPassword, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg({ type: 'success', text: 'Administrative password updated successfully.' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMsg({ type: 'error', text: data.error || 'Failed to update password.' });
      }
    } catch {
      setMsg({ type: 'error', text: 'Network error updating password.' });
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
      <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
        <Shield className="w-4 h-4 text-emerald-600" />
        Administrator Credentials & Security
      </h2>
      <p className="text-xs text-slate-500">
        Update the primary super administrator access password. Changes take effect immediately.
      </p>

      {msg && (
        <div
          className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
            msg.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {msg.text}
        </div>
      )}

      <form onSubmit={handleUpdate} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="text-[11px] font-bold uppercase text-slate-600">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold uppercase text-slate-600">New Password (8+ chars)</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold uppercase text-slate-600">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div className="sm:col-span-3 flex justify-end pt-2">
          <button
            type="submit"
            disabled={updating}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 flex items-center gap-1.5"
          >
            {updating ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </form>
    </div>
  );
}

