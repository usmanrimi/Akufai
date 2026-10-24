'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MediaFile } from '@/types';
import { Upload, Copy, Check, Trash2, Loader2, Image as ImageIcon, ExternalLink } from 'lucide-react';

export default function AdminMediaPage() {
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadMedia = () => {
    fetch('/api/admin/content')
      .then((res) => res.json())
      .then((res) => {
        if (res.data?.media) setMedia(res.data.media);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        loadMedia();
      } else {
        alert(data.error || 'Failed to upload file.');
      }
    } catch {
      alert('Upload error.');
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media reference?')) return;
    try {
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete_media', payload: { id } }),
      });
      loadMedia();
    } catch {
      alert('Error deleting media entry.');
    }
  };

  if (loading) return <div className="text-sm text-slate-500">Loading media library...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Media Library</h1>
          <p className="text-xs text-slate-500">
            Upload images, photography, cover artwork, and audio files for public content.
          </p>
        </div>

        <label className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#036c3e] hover:bg-[#02522f] rounded-lg shadow-xs cursor-pointer transition-colors">
          {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
          <span>{uploading ? 'Uploading Asset...' : 'Upload Asset'}</span>
          <input
            type="file"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
            accept="image/*,audio/*"
          />
        </label>
      </div>

      {/* Grid of media */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {media.map((file) => (
          <div
            key={file.id}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:border-[#036c3e]/40 transition-all flex flex-col justify-between group"
          >
            <div className="relative aspect-square bg-slate-100 overflow-hidden">
              {file.mimeType.startsWith('image') ? (
                <Image src={file.url} alt={file.filename} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <ImageIcon className="w-8 h-8" />
                </div>
              )}
            </div>

            <div className="p-3 space-y-2 text-xs">
              <p className="font-medium text-slate-900 truncate" title={file.filename}>
                {file.filename}
              </p>
              <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-slate-400 text-[10px]">
                <span>{(file.size / 1024).toFixed(0)} KB</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => copyToClipboard(file.url, file.id)}
                    className="p-1 hover:text-[#036c3e] rounded"
                    title="Copy URL"
                  >
                    {copiedId === file.id ? (
                      <Check className="w-3.5 h-3.5 text-[#036c3e]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(file.id)}
                    className="p-1 hover:text-rose-600 rounded"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
