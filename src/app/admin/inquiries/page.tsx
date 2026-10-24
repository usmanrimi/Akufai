'use client';

import React, { useState, useEffect } from 'react';
import { Inquiry } from '@/types';
import { Mail, CheckCircle2, Clock, Download, Eye, X, Send, User, Building, Tag } from 'lucide-react';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read' | 'replied'>('all');
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState('');

  const loadInquiries = () => {
    fetch('/api/admin/content')
      .then((res) => res.json())
      .then((res) => {
        if (res.data?.inquiries) setInquiries(res.data.inquiries);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const handleSelect = (inq: Inquiry) => {
    setSelectedInquiry(inq);
    setNotes(inq.notes || '');
    if (inq.status === 'unread') {
      updateStatus(inq.id, 'read');
    }
  };

  const updateStatus = async (id: string, status: 'unread' | 'read' | 'replied', customNotes?: string) => {
    try {
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_inquiry',
          payload: { id, status, notes: customNotes !== undefined ? customNotes : notes },
        }),
      });
      loadInquiries();
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry({ ...selectedInquiry, status, notes: customNotes !== undefined ? customNotes : notes });
      }
    } catch {
      alert('Error updating inquiry status.');
    }
  };

  const exportCSV = () => {
    const headers = ['ID', 'Date', 'Name', 'Email', 'Organization', 'Inquiry Type', 'Subject', 'Message', 'Status', 'Notes'];
    const rows = inquiries.map((i) => [
      i.id,
      i.createdAt,
      `"${i.name.replace(/"/g, '""')}"`,
      `"${i.email}"`,
      `"${(i.organization || '').replace(/"/g, '""')}"`,
      i.inquiryType,
      `"${i.subject.replace(/"/g, '""')}"`,
      `"${i.message.replace(/"/g, '""')}"`,
      i.status,
      `"${(i.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `akufai_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = inquiries.filter((i) => {
    if (filter === 'all') return true;
    return i.status === filter;
  });

  if (loading) return <div className="text-sm text-slate-500">Loading inquiries...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Aligned Inquiries Inbox</h1>
          <p className="text-xs text-slate-500">
            Review venture proposals, partnership opportunities, and direct firm messages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs">
        {(['all', 'unread', 'read', 'replied'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-lg font-semibold uppercase tracking-wider transition-colors ${
              filter === tab
                ? 'bg-[#036c3e] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab} ({inquiries.filter((i) => (tab === 'all' ? true : i.status === tab)).length})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Inquiries Table */}
        <div className={`space-y-3 ${selectedInquiry ? 'lg:col-span-6' : 'lg:col-span-12'}`}>
          {filtered.length === 0 ? (
            <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-xs text-slate-400">
              No inquiries found under this filter.
            </div>
          ) : (
            filtered.map((inq) => (
              <div
                key={inq.id}
                onClick={() => handleSelect(inq)}
                className={`p-4 rounded-xl border cursor-pointer transition-all shadow-xs ${
                  selectedInquiry?.id === inq.id
                    ? 'bg-emerald-50/50 border-[#036c3e] ring-1 ring-[#036c3e]'
                    : inq.status === 'unread'
                    ? 'bg-white border-amber-300 hover:border-slate-300'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{inq.name}</span>
                      <span
                        className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
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
                    <p className="text-xs font-semibold text-slate-800">{inq.subject}</p>
                    <p className="text-xs text-slate-500 line-clamp-1">{inq.message}</p>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 shrink-0">
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Detail Panel */}
        {selectedInquiry && (
          <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono font-bold text-[#036c3e] uppercase">
                  INQUIRY #{selectedInquiry.id}
                </span>
                <h3 className="text-base font-bold text-slate-900">{selectedInquiry.subject}</h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sender Meta */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-3.5 rounded-lg border border-slate-100">
              <div>
                <span className="text-slate-400 uppercase font-bold block text-[10px]">Submitted By</span>
                <span className="font-bold text-slate-900">{selectedInquiry.name}</span>
              </div>
              <div>
                <span className="text-slate-400 uppercase font-bold block text-[10px]">Email Address</span>
                <a
                  href={`mailto:${selectedInquiry.email}`}
                  className="text-[#036c3e] font-semibold hover:underline"
                >
                  {selectedInquiry.email}
                </a>
              </div>
              <div>
                <span className="text-slate-400 uppercase font-bold block text-[10px]">Organization</span>
                <span className="text-slate-700">{selectedInquiry.organization || '—'}</span>
              </div>
              <div>
                <span className="text-slate-400 uppercase font-bold block text-[10px]">Inquiry Type</span>
                <span className="text-slate-700 font-semibold uppercase">{selectedInquiry.inquiryType}</span>
              </div>
            </div>

            {/* Message Body */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Proposal / Message Body
              </span>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                {selectedInquiry.message}
              </div>
            </div>

            {/* Internal Review Notes */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Internal Evaluation Notes
              </span>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add investment review notes, sector alignment, next steps..."
                rows={3}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 resize-none"
              />
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => updateStatus(selectedInquiry.id, selectedInquiry.status, notes)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
                >
                  Save Notes
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateStatus(selectedInquiry.id, 'replied', notes)}
                    className="px-3 py-1.5 text-xs font-bold text-white bg-[#036c3e] hover:bg-[#02522f] rounded-lg shadow-xs"
                  >
                    Mark Replied
                  </button>
                  <button
                    onClick={() => updateStatus(selectedInquiry.id, 'unread', notes)}
                    className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Mark Unread
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
