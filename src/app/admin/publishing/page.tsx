'use client';

import React, { useState, useEffect } from 'react';
import {
  Send,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Clock,
  GitBranch,
  Globe,
  Radio,
  ShieldCheck,
  RefreshCw,
  Sliders,
  History,
  Info,
  ExternalLink,
} from 'lucide-react';
import { PublicationRecord, PublishingConfig } from '@/types';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export default function PublishingPage() {
  const [config, setConfig] = useState<PublishingConfig | null>(null);
  const [history, setHistory] = useState<PublicationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [rollbackModal, setRollbackModal] = useState<PublicationRecord | null>(null);
  const [activeTab, setActiveTab] = useState<'publish' | 'config' | 'history'>('publish');

  // Config form state
  const [githubOwner, setGithubOwner] = useState('');
  const [githubRepo, setGithubRepo] = useState('');
  const [githubBranch, setGithubBranch] = useState('main');
  const [deployHookUrl, setDeployHookUrl] = useState('');
  const [productionUrl, setProductionUrl] = useState('');
  const [autoDeploy, setAutoDeploy] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/publish');
      if (res.ok) {
        const data = await res.json();
        setConfig(data.config);
        setHistory(data.history || []);
        if (data.config) {
          setGithubOwner(data.config.githubOwner || 'akufai-capital');
          setGithubRepo(data.config.githubRepo || 'website');
          setGithubBranch(data.config.githubBranch || 'main');
          setDeployHookUrl(data.config.deployHookUrl || '');
          setProductionUrl(data.config.productionUrl || 'https://akufaicapitalandequities.com');
          setAutoDeploy(data.config.autoDeployOnPublish ?? true);
        }
      }
    } catch {
      setStatusMsg({ type: 'error', text: 'Failed to load publishing state.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setStatusMsg(null);

    try {
      const res = await fetch('/api/admin/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'publish',
          message: message || 'Updated site content and configuration',
          triggerDeploy: autoDeploy,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatusMsg({
          type: 'success',
          text: 'Changes successfully compiled and published to the live environment!',
        });
        setMessage('');
        fetchData();
      } else {
        setStatusMsg({ type: 'error', text: data.error || 'Publish failed.' });
      }
    } catch {
      setStatusMsg({ type: 'error', text: 'A network error occurred while publishing.' });
    } finally {
      setActionLoading(false);
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setStatusMsg(null);

    try {
      const res = await fetch('/api/admin/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_config',
          config: {
            githubOwner,
            githubRepo,
            githubBranch,
            deployHookUrl,
            productionUrl,
            autoDeployOnPublish: autoDeploy,
          },
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatusMsg({
          type: 'success',
          text: 'Publishing and repository settings updated successfully.',
        });
        setConfig(data.config);
      } else {
        setStatusMsg({ type: 'error', text: data.error || 'Failed to update settings.' });
      }
    } catch {
      setStatusMsg({ type: 'error', text: 'Network error saving settings.' });
    } finally {
      setActionLoading(false);
    }
  };

  const handleRollback = async (record: PublicationRecord) => {
    setActionLoading(true);
    setStatusMsg(null);

    try {
      const res = await fetch('/api/admin/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'rollback',
          versionId: record.id,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatusMsg({
          type: 'success',
          text: `Successfully rolled back to version ${record.version || record.id}.`,
        });
        setRollbackModal(null);
        fetchData();
      } else {
        setStatusMsg({ type: 'error', text: data.error || 'Rollback failed.' });
      }
    } catch {
      setStatusMsg({ type: 'error', text: 'Network error during rollback.' });
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner & Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Radio className="w-3 h-3 animate-pulse text-emerald-500" />
                Live Release Control
              </span>
              <span className="text-xs text-slate-400">|</span>
              <span className="text-xs text-slate-500 font-mono">
                Branch: {githubBranch || 'main'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
              Publishing & Deployment Center
            </h1>
            <p className="text-slate-500 text-sm mt-1 max-w-2xl">
              Manage the deployment pipeline for Akufai Capital & Equities. Any edits made in the admin draft workspace take effect on the live website when published.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={loading}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
              title="Refresh status"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
            >
              <Globe className="w-4 h-4 text-emerald-400" />
              View Public Website
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 mt-8 -mb-6">
          <button
            onClick={() => setActiveTab('publish')}
            className={`pb-4 px-4 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'publish'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Send className="w-4 h-4" />
            Publish Release
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`pb-4 px-4 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'history'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <History className="w-4 h-4" />
            Release History & Rollback ({history.length})
          </button>
          <button
            onClick={() => setActiveTab('config')}
            className={`pb-4 px-4 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'config'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sliders className="w-4 h-4" />
            Deployment & GitHub Settings
          </button>
        </div>
      </div>

      {/* Notifications */}
      {statusMsg && (
        <div
          className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
            statusMsg.type === 'success'
              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
              : 'bg-red-50/80 border-red-200 text-red-900'
          }`}
        >
          {statusMsg.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          )}
          <div className="flex-1 text-sm font-medium">{statusMsg.text}</div>
          <button
            onClick={() => setStatusMsg(null)}
            className="text-slate-400 hover:text-slate-600 text-sm font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* TAB 1: PUBLISH RELEASE */}
      {activeTab === 'publish' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Publish Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Send className="w-5 h-5 text-emerald-600" />
                Publish Working Draft to Live Website
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Publishing compiles the current working database into the production bundle, updates the live version ledger, and triggers automatic deployment to your hosting platform.
              </p>

              <form onSubmit={handlePublish} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                    Release Notes / Commit Summary
                  </label>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. Updated leadership team biographies and refreshed portfolio focus"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                  />
                  <p className="text-xs text-slate-400 mt-1.5">
                    This note will be attached to the permanent publication ledger and git commit history.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-slate-800">Automatic Deployment Hook</div>
                      <div className="text-xs text-slate-500">
                        {deployHookUrl
                          ? 'Trigger hosting rebuild automatically after export'
                          : 'No webhook URL configured (will export content locally)'}
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={autoDeploy}
                        onChange={(e) => setAutoDeploy(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-sm transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {actionLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Compiling and Publishing...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Publish All Changes Now
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Scope of Publication Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-600" />
                What Gets Published vs Protected
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-emerald-50/50 border border-emerald-100 rounded-lg space-y-1.5">
                  <div className="font-semibold text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Published to Public Site
                  </div>
                  <ul className="space-y-1 text-slate-600 list-disc list-inside">
                    <li>Hero & Headline Content</li>
                    <li>About Us & Executive Profiles</li>
                    <li>Contributors & Partners</li>
                    <li>Investment Focus & Criteria</li>
                    <li>Articles & Insights</li>
                    <li>Podcast Episodes & Audio</li>
                    <li>Approved Media Assets</li>
                    <li>SEO & Site Identity</li>
                  </ul>
                </div>

                <div className="p-3.5 bg-amber-50/50 border border-amber-100 rounded-lg space-y-1.5">
                  <div className="font-semibold text-amber-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    Protected / Kept Private
                  </div>
                  <ul className="space-y-1 text-slate-600 list-disc list-inside">
                    <li>Visitor Inquiries & Messages</li>
                    <li>Newsletter Subscribers</li>
                    <li>Admin Passwords & Hashes</li>
                    <li>API Keys & Deployment Tokens</li>
                    <li>Internal Admin Audit Logs</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Side Info Cards */}
          <div className="space-y-6">
            {/* Live Environment Status */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                Current Live Release
              </h3>
              {history.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold font-mono text-sm">
                      {history[0].version || history[0].id}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">
                        {history[0].commitMessage || 'Live Release'}
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        {new Date(history[0].publishedAt).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Author</span>
                      <span className="font-medium text-slate-800">{history[0].publishedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Branch</span>
                      <span className="font-mono text-slate-800">{githubBranch || 'main'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Deploy Status</span>
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                        <CheckCircle2 className="w-3 h-3" />
                        {history[0].deploymentStatus || 'Active'}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-slate-400 text-sm">
                  No publication history found yet.
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 text-white shadow-sm space-y-4">
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Deployment Tip
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Publishing is instantaneous. All public pages will immediately reflect the new content upon the next visitor request without server downtime.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('history')}
                  className="w-full py-2.5 px-4 bg-slate-700/80 hover:bg-slate-700 text-slate-100 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  View Rollback Options
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RELEASE HISTORY & ROLLBACK */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-900">Publication Ledger & Version Rollback</h2>
            <p className="text-xs text-slate-500 mt-1">
              Select any previously published version to immediately restore that state to the live site.
            </p>
          </div>

          {history.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-sm">
              No previous versions recorded.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-6">Version</th>
                    <th className="py-3 px-6">Release Message</th>
                    <th className="py-3 px-6">Published Date</th>
                    <th className="py-3 px-6">Author</th>
                    <th className="py-3 px-6">Status</th>
                    <th className="py-3 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {history.map((record, index) => {
                    const isLatest = index === 0;
                    return (
                      <tr key={record.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-xs">
                              {record.version || record.id}
                            </span>
                            {isLatest && (
                              <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-700 rounded-full">
                                CURRENT LIVE
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-slate-800 font-medium">
                          {record.commitMessage}
                        </td>
                        <td className="py-4 px-6 text-slate-500 text-xs">
                          {new Date(record.publishedAt).toLocaleString()}
                        </td>
                        <td className="py-4 px-6 text-slate-600 text-xs">
                          {record.publishedBy || 'Administrator'}
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                            {record.deploymentStatus || 'Published'}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          {!isLatest ? (
                            <button
                              onClick={() => setRollbackModal(record)}
                              disabled={actionLoading}
                              className="px-3 py-1.5 bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-800 rounded text-xs font-semibold transition-colors inline-flex items-center gap-1.5"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              Rollback
                            </button>
                          ) : (
                            <span className="text-xs text-slate-400 italic">Active</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: DEPLOYMENT & GITHUB SETTINGS */}
      {activeTab === 'config' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm max-w-3xl">
          <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
            <GithubIcon className="w-5 h-5 text-slate-800" />
            Repository & Build Webhook Configuration
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Configure how super admin publishing interacts with your Git provider and automated hosting infrastructure.
          </p>

          <form onSubmit={handleSaveConfig} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                  GitHub Owner / Organization
                </label>
                <input
                  type="text"
                  value={githubOwner}
                  onChange={(e) => setGithubOwner(e.target.value)}
                  placeholder="akufai-capital"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                  Repository Name
                </label>
                <input
                  type="text"
                  value={githubRepo}
                  onChange={(e) => setGithubRepo(e.target.value)}
                  placeholder="website"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                  Production Branch
                </label>
                <div className="relative">
                  <GitBranch className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={githubBranch}
                    onChange={(e) => setGithubBranch(e.target.value)}
                    placeholder="main"
                    className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                  Production Website URL
                </label>
                <input
                  type="text"
                  value={productionUrl}
                  onChange={(e) => setProductionUrl(e.target.value)}
                  placeholder="https://akufaicapitalandequities.com"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                Deploy Webhook URL (Optional)
              </label>
              <input
                type="url"
                value={deployHookUrl}
                onChange={(e) => setDeployHookUrl(e.target.value)}
                placeholder="https://api.vercel.com/v1/integrations/deploy/..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
              <p className="text-xs text-slate-400 mt-1.5">
                Paste your Vercel, Netlify, or Cloudflare Pages Deploy Hook URL to automatically trigger a rebuild whenever you publish.
              </p>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={actionLoading}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
              >
                {actionLoading ? 'Saving...' : 'Save Configuration'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Rollback Confirmation Modal */}
      {rollbackModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-slate-900">Confirm Version Rollback</h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to revert the live website to{' '}
                <span className="font-bold text-slate-800 font-mono">{rollbackModal.version || rollbackModal.id}</span>?
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
              <div className="text-slate-500">Version Notes:</div>
              <div className="font-medium text-slate-800">{rollbackModal.commitMessage}</div>
              <div className="text-slate-400 pt-1">
                Published on {new Date(rollbackModal.publishedAt).toLocaleString()} by {rollbackModal.publishedBy}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setRollbackModal(null)}
                className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleRollback(rollbackModal)}
                disabled={actionLoading}
                className="flex-1 py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                {actionLoading ? 'Rolling back...' : 'Confirm Rollback'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
