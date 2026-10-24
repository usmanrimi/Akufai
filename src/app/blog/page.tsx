import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogPosts, getContributors } from '@/lib/db';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'From the Desk of Akufai | Insights & Articles',
  description:
    'Occasional reflections on investing, enterprise, market perspective, and the kinds of questions that shape long-term conviction.',
};

export const revalidate = 0;

export default async function BlogPage() {
  const posts = getBlogPosts(true);
  const contributors = getContributors();

  const authorMap = new Map(contributors.map((c) => [c.id, c]));

  return (
    <div className="bg-white">
      {/* 1. Approved High-Contrast Green Brand Hero */}
      <section className="py-20 lg:py-28 bg-[#061c11] text-white relative overflow-hidden border-b-2 border-[#b6960b]/40">
        <div className="absolute inset-0 bg-radial from-[#036c3e]/35 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <h1
            style={{ color: '#ffffff' }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white !text-white tracking-tight leading-[1.12]"
          >
            From the desk of Akufai
          </h1>
          <p
            style={{ color: '#e6f4ed' }}
            className="text-lg sm:text-xl !text-emerald-50/95 leading-relaxed max-w-2xl mx-auto font-medium"
          >
            Occasional reflections on investing, enterprise, market perspective, and the kinds of questions that shape long-term conviction.
          </p>
        </div>
      </section>

      {/* 2. Article Grid */}
      <section className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const author = authorMap.get(post.authorId);
            return (
              <article
                key={post.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:border-[#b6960b]"
              >
                {/* Cover Image */}
                <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                  <Image
                    src={post.coverImageUrl || '/images/blog_fintech_wave.jpg'}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-xs font-bold text-[#036c3e] border border-[#b6960b]/30">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#b6960b]" />
                        {post.publishDate}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#b6960b]" />
                        {post.readTime || '5 min read'}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-[#036c3e] transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>

                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    {author ? (
                      <Link
                        href={`/authors/${author.slug}`}
                        className="flex items-center gap-2 text-xs text-slate-600 hover:text-[#036c3e]"
                      >
                        <div className="w-6 h-6 rounded-full bg-[#f2f9f5] text-[#036c3e] border border-[#b6960b]/40 flex items-center justify-center font-bold text-[10px]">
                          {author.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <span className="font-semibold">{author.name}</span>
                      </Link>
                    ) : (
                      <span className="text-xs text-slate-500">Akufai Research</span>
                    )}

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#036c3e] hover:text-[#b6960b] transition-colors"
                    >
                      <span>Read Article</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#b6960b]" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
