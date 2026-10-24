'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Sliders,
  FileText,
  Radio,
  Compass,
  Users,
  Inbox,
  Mail,
  Image as ImageIcon,
  Settings,
  LogOut,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  UserCheck,
  Send,
  ShieldCheck,
  Eye,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

const ADMIN_NAV = [
  { name: 'Dashboard Overview', href: '/admin', icon: LayoutDashboard, section: 'Core' },
  { name: 'Pages & Hero Slides', href: '/admin/hero', icon: Sliders, section: 'Content' },
  { name: 'About & Leadership', href: '/admin/about', icon: Users, section: 'Content' },
  { name: 'Contributors', href: '/admin/contributors', icon: UserCheck, section: 'Content' },
  { name: 'Investment Areas', href: '/admin/investment', icon: Compass, section: 'Content' },
  { name: 'Blog Articles', href: '/admin/blog', icon: FileText, section: 'Content' },
  { name: 'Podcast Episodes', href: '/admin/podcast', icon: Radio, section: 'Content' },
  { name: 'Media Library', href: '/admin/media', icon: ImageIcon, section: 'Assets' },
  { name: 'Contact Submissions', href: '/admin/inquiries', icon: Inbox, section: 'Engagement' },
  { name: 'Newsletter Subscribers', href: '/admin/subscribers', icon: Mail, section: 'Engagement' },
  { name: 'Site Settings & SEO', href: '/admin/settings', icon: Settings, section: 'System' },
  { name: 'Publishing & Deployment', href: '/admin/publishing', icon: Send, section: 'System' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [publishStatus, setPublishStatus] = useState<{ lastVersion: string; isSynced: boolean }>({
    lastVersion: 'v1.0.0',
    isSynced: true,
  });

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated) {
          router.push('/admin/login');
        } else {
          setUser(data.user);
        }
      })
      .catch(() => router.push('/admin/login'))
      .finally(() => setLoading(false));

    // Fetch publication summary
    fetch('/api/admin/publish')
      .then((res) => res.json())
      .then((data) => {
        if (data.config) {
          setPublishStatus({
            lastVersion: data.config.lastPublishedVersion || 'v1.0.0',
            isSynced: true,
          });
        }
      })
      .catch(() => {});
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  if (isLoginPage) {
    return <div className="min-h-screen bg-slate-100 flex flex-col justify-center">{children}</div>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#036c3e] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Loading Super Admin Workspace...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faf9] flex flex-col md:flex-row font-sans antialiased text-slate-800">
      {/* Mobile Top Navigation Bar */}
      <div className="md:hidden bg-white border-b border-slate-200/90 px-4 py-3 flex items-center justify-between z-30 sticky top-0 shadow-xs">
        <div className="relative h-9 w-36">
          <Image src="/images/logo.png" alt="Akufai Admin" fill className="object-contain object-left" />
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/publishing"
            className="px-2.5 py-1 text-[11px] font-bold text-white bg-[#036c3e] rounded-md shadow-xs"
          >
            Publish
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#036c3e]"
            aria-label="Toggle Navigation Sidebar"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Main Admin Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-white border-r border-slate-200/90 z-40 flex flex-col justify-between transition-transform duration-300 ease-in-out shadow-sm ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Logo & Portal Branding */}
          <div className="p-5 pb-4 border-b border-slate-100 space-y-3">
            <Link href="/admin" className="block focus:outline-none">
              <div className="relative h-10 w-44">
                <Image
                  src="/images/logo.png"
                  alt="Akufai Capital Admin"
                  fill
                  priority
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#036c3e] bg-[#f0fdf4] px-2 py-0.5 rounded border border-[#dcfce7]">
                Super Admin
              </span>
              <span className="text-[10px] font-mono text-slate-400 font-medium">
                {publishStatus.lastVersion}
              </span>
            </div>
          </div>

          {/* Navigation Links Scrollable List */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto" aria-label="Super Admin Navigation">
            {ADMIN_NAV.map((item) => {
              const isActive =
                item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 text-xs font-medium rounded-lg transition-all duration-150 ${
                    isActive
                      ? 'text-[#036c3e] bg-[#f0fdf4] font-bold border-l-3 border-[#036c3e] shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#036c3e]' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#036c3e]" />}
                </Link>
              );
            })}
          </nav>

          {/* User Profile & Sign Out Footer */}
          <div className="p-4 border-t border-slate-200/90 bg-slate-50/80 space-y-3">
            <div className="flex items-center gap-2.5 text-xs">
              <div className="w-8 h-8 rounded-full bg-[#036c3e] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-slate-900 truncate leading-tight">{user?.name || 'Administrator'}</p>
                <p className="text-slate-500 truncate text-[11px]">{user?.email}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-700 bg-white hover:bg-rose-50 border border-rose-200 rounded-lg shadow-xs transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Admin Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Desktop Workspace Toolbar */}
        <header className="hidden md:flex bg-white border-b border-slate-200/90 px-6 py-3.5 items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Workspace
            </span>
            <span className="text-slate-300">/</span>
            <h2 className="text-sm font-bold text-slate-900">
              {ADMIN_NAV.find((n) => (n.href === '/admin' ? pathname === '/admin' : pathname.startsWith(n.href)))?.name ||
                'Management Workspace'}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Link to Public Site */}
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 hover:text-slate-900 border border-slate-200 rounded-lg transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              <span>Live Website</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </Link>

            {/* Publishing & Deployments CTA */}
            <Link
              href="/admin/publishing"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-[#036c3e] hover:bg-[#02522f] rounded-lg shadow-xs transition-colors group"
            >
              <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              <span>Publish Changes</span>
            </Link>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
