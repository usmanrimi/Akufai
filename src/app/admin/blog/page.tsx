'use client';

import React, { useState, useEffect } from 'react';
import { BlogPost, Contributor } from '@/types';
import { Plus, Edit3, Trash2, Save, X, CheckCircle2, Loader2, FileText, ExternalLink } from 'lucide-react';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const loadData = () => {
    fetch('/api/admin/content')
      .then((res) => res.json())
      .then((res) => {
        if (res.data?.blogPosts) setPosts(res.data.blogPosts);
        if (res.data?.contributors) setContributors(res.data.contributors);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateNew = () => {
    const newPost: BlogPost = {
      id: `post-${Date.now()}`,
      slug: `article-${Date.now()}`,
      title: 'New Editorial Perspective',
      category: 'Fintech',
      publishDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      status: 'published',
      excerpt: 'Summary of the investment reflection or sector analysis...',
      contentHtml: '<p>Write the full article content here with rich editorial perspective...</p>',
      coverImageUrl: '/images/blog_fintech_wave.jpg',
      authorId: contributors[0]?.id || 'faisal-umar',
      readTime: '5 min read',
      isFeatured: true,
    };
    setEditingPost(newPost);
  };

  const handleSavePost = async () => {
    if (!editingPost) return;
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save_blog_post', payload: editingPost }),
      });
      if (res.ok) {
        setMessage('Article saved and published.');
        setEditingPost(null);
        loadData();
        setTimeout(() => setMessage(''), 4000);
      }
    } catch {
      alert('Error saving article.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete_blog_post', payload: { id } }),
      });
      loadData();
    } catch {
      alert('Error deleting post.');
    }
  };

  if (loading) return <div className="text-sm text-slate-500">Loading blog articles...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">From the Desk of Akufai CMS</h1>
          <p className="text-xs text-slate-500">
            Publish, edit, and organize editorial reflections and analysis.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#008751] hover:bg-[#056839] rounded-lg shadow-xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Write New Article</span>
        </button>
      </div>

      {message && (
        <div className="p-3 bg-[#f0fdf4] border border-[#dcfce7] rounded-lg text-xs text-[#008751] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Editor Modal */}
      {editingPost && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900">Edit Blog Article</h2>
              <button
                onClick={() => setEditingPost(null)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-slate-600">Article Title</label>
                <input
                  type="text"
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  className="w-full px-3 py-2 text-sm font-semibold border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-600">URL Slug</label>
                  <input
                    type="text"
                    value={editingPost.slug}
                    onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-mono border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-600">Category</label>
                  <input
                    type="text"
                    value={editingPost.category}
                    onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-600">Publication Status</label>
                  <select
                    value={editingPost.status}
                    onChange={(e) => setEditingPost({ ...editingPost, status: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-600">Author</label>
                  <select
                    value={editingPost.authorId}
                    onChange={(e) => setEditingPost({ ...editingPost, authorId: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900"
                  >
                    {contributors.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-600">Publish Date</label>
                  <input
                    type="text"
                    value={editingPost.publishDate}
                    onChange={(e) => setEditingPost({ ...editingPost, publishDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-600">Reading Time</label>
                  <input
                    type="text"
                    value={editingPost.readTime}
                    onChange={(e) => setEditingPost({ ...editingPost, readTime: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-slate-600">Featured Image URL</label>
                <input
                  type="text"
                  value={editingPost.coverImageUrl}
                  onChange={(e) => setEditingPost({ ...editingPost, coverImageUrl: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-slate-600">Short Excerpt</label>
                <textarea
                  value={editingPost.excerpt}
                  onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-slate-600">Article Content (HTML/Rich Text)</label>
                <textarea
                  value={editingPost.contentHtml}
                  onChange={(e) => setEditingPost({ ...editingPost, contentHtml: e.target.value })}
                  rows={8}
                  className="w-full px-3 py-2 text-xs font-mono border border-slate-200 rounded-lg text-slate-900"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setEditingPost(null)}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePost}
                disabled={saving}
                className="px-5 py-2 text-xs font-bold text-white bg-[#008751] hover:bg-[#056839] rounded-lg shadow-sm flex items-center gap-1.5"
              >
                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                <span>Save Article</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Articles List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="divide-y divide-slate-100">
          {posts.map((post) => (
            <div key={post.id} className="p-5 hover:bg-slate-50 transition-colors flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#008751] uppercase">{post.category}</span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500">{post.publishDate}</span>
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      post.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {post.status}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{post.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-1">{post.excerpt}</p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className="p-2 text-slate-400 hover:text-[#008751] rounded-lg hover:bg-slate-100"
                  title="View on public site"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setEditingPost(post)}
                  className="p-2 text-slate-600 hover:text-[#008751] rounded-lg hover:bg-slate-100"
                  title="Edit article"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100"
                  title="Delete article"
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
