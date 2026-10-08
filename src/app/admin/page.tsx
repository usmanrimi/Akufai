import React from 'react';
import Link from 'next/link';
import {
  getInquiries,
  getSubscribers,
  getBlogPosts,
  getPodcastEpisodes,
  getInvestmentAreas,
  getPublicationHistory,
  getPublishingConfig,
} from '@/lib/db';
import {
  Inbox,
  Mail,
  FileText,
  Radio,
  ArrowUpRight,
  Send,
  CheckCircle2,
  Clock,
  Layers,
  ChevronRight,
  Globe,
  Sliders,
  ExternalLink,
} from 'lucide-react';

export const revalidate = 0;

export default async function AdminDashboardOverviewPage() {
  const inquiries = getInquiries();
  const subscribers = getSubscribers();
  const posts = getBlogPosts(false);
  const episodes = getPodcastEpisodes(false);
  const areas = getInvestmentAreas();
  const history = getPublicationHistory();
  const config = getPublishingConfig();

  const unreadInquiries = inquiries.filter((i) => i.status === 'unread').length;
  const latestPub = history[0];

  return (
    <div className="space-y-8">
      {/* Executive Welcome & Live State Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Super Admin Active
              </span>
              <span className="text-xs text-slate-400">|</span>
              <span className="text-xs text-slate-500">
                Version: <span className="font-mono font-bold text-slate-800">{latestPub ? latestPub.id : 'v1.0.0'}</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
              Akufai Executive Portal
            </h1>
            <p className="text-slate-500 text-sm mt-1 max-w-2xl">
              Manage website content across all 12 modules, review confidential inquiries, and publish changes to your production site.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/publishing"
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm"
            >
              <Send className="w-4 h-4" />
              Publish Live Release
            </Link>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
            >
              <Globe className="w-4 h-4 text-emerald-400" />
              View Website
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Live Publication Status Sub-card */}
        <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold font-mono">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="text-slate-500">Live Status</div>
              <div className="font-semibold text-slate-900">
                {latestPub ? 'Published & Active' : 'Initial Draft'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-slate-500">Last Published</div>
              <div className="font-semibold text-slate-900">
                {latestPub ? new Date(latestPub.publishedAt).toLocaleString() : 'Never'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-slate-500">Release History</div>
              <div className="font-semibold text-slate-900">
                {history.length} versions recorded
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Inquiries */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Visitor Inquiries
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">{inquiries.length}</span>
            {unreadInquiries > 0 ? (
              <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                {unreadInquiries} unread
              </span>
            ) : (
              <span className="text-xs text-slate-400">all reviewed</span>
            )}
          </div>
          <Link
            href="/admin/inquiries"
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 pt-1"
          >
            <span>Review inquiries inbox</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Newsletter Subscribers */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Subscribers
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">
              {subscribers.filter((s) => s.status === 'confirmed').length}
            </span>
            <span className="text-xs text-slate-400">active contacts</span>
          </div>
          <Link
            href="/admin/subscribers"
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 pt-1"
          >
            <span>View subscriber list</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Blog Posts */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Articles & Insights
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">{posts.length}</span>
            <span className="text-xs text-slate-400">
              ({posts.filter((p) => p.status === 'published').length} live)
            </span>
          </div>
          <Link
            href="/admin/blog"
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 pt-1"
          >
            <span>Manage publications</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Podcast Episodes */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Podcast Episodes
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Radio className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">{episodes.length}</span>
            <span className="text-xs text-slate-400">conversations</span>
          </div>
          <Link
            href="/admin/podcast"
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 pt-1"
          >
            <span>Manage audio episodes</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Two Column Layout: Recent Inquiries & Quick CMS Links */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Inquiries */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="space-y-0.5">
              <h2 className="text-base font-bold text-slate-900">Recent Inquiries</h2>
              <p className="text-xs text-slate-500">Latest executive inquiries submitted via the website</p>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
            >
              View All Inquiries →
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {inquiries.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">No inquiries received yet.</div>
            ) : (
              inquiries.slice(0, 5).map((inq) => (
                <div key={inq.id} className="p-4 hover:bg-slate-50 transition-colors flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{inq.name}</span>
                      {inq.organization && (
                        <span className="text-xs text-slate-500">• {inq.organization}</span>
                      )}
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                          inq.status === 'unread'
                            ? 'bg-amber-100 text-amber-800'
                            : inq.status === 'replied'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {inq.status}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-800">{inq.subject}</p>
                    <p className="text-xs text-slate-500 line-clamp-1">{inq.message}</p>
                  </div>

                  <Link
                    href="/admin/inquiries"
                    className="shrink-0 text-xs font-semibold text-emerald-700 hover:underline"
                  >
                    View
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Management Shortcuts */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <h2 className="text-base font-bold text-slate-900">Content Sections</h2>
            <div className="space-y-2 text-xs">
              <Link
                href="/admin/hero"
                className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 hover:border-slate-200 transition-colors"
              >
                <span className="font-medium text-slate-700">Hero Section & Headlines</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
              <Link
                href="/admin/about"
                className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 hover:border-slate-200 transition-colors"
              >
                <span className="font-medium text-slate-700">About & Leadership Text</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
              <Link
                href="/admin/contributors"
                className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 hover:border-slate-200 transition-colors"
              >
                <span className="font-medium text-slate-700">Contributor Profiles</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
              <Link
                href="/admin/investment"
                className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 hover:border-slate-200 transition-colors"
              >
                <span className="font-medium text-slate-700">Investment Focus Sectors</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
              <Link
                href="/admin/media"
                className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 hover:border-slate-200 transition-colors"
              >
                <span className="font-medium text-slate-700">Media Library & Assets</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
              <Link
                href="/admin/settings"
                className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 hover:border-slate-200 transition-colors"
              >
                <span className="font-medium text-slate-700">Site Settings, SEO & Security</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
