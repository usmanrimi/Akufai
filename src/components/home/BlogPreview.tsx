import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Clock, ArrowUpRight } from 'lucide-react';
import { BlogPost } from '@/types';

interface BlogPreviewProps {
  posts: BlogPost[];
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  return (
    <section className="py-16 lg:py-24 bg-white border-b border-[#dec668]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header without small decorative label */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#042f1b] tracking-tight">
            From the desk of Akufai
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Occasional reflections on investing, enterprise, market perspective, and the kinds of questions that shape long-term conviction.
          </p>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post) => (
            <article
              key={post.id}
              className="gold-card-surface gold-glow-card group rounded-xl border border-[#dec668] overflow-hidden shadow-xs flex flex-col justify-between"
            >
              {/* Cover Image */}
              <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden border-b border-[#dec668]/50">
                <Image
                  src={post.coverImageUrl || '/images/blog_fintech_wave.jpg'}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-gradient-to-r from-[#fcf6df] to-[#f7ebc1] px-2.5 py-1 rounded-md text-xs font-bold text-[#042f1b] border border-[#b6960b]/60 shadow-xs">
                  {post.category}
                </div>
              </div>

              {/* Text Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#b6960b]" />
                      {post.publishDate}
                    </span>
                    <span className="text-[#b6960b]">•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#b6960b]" />
                      {post.readTime || '5 min read'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#042f1b] leading-snug group-hover:text-[#8f7506] transition-colors">
                    <Link href={`/blog/${post.slug}`} className="focus:outline-none">
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#dec668]/50">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8f7506] hover:text-[#042f1b] group/link transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#b6960b] transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Posts Button */}
        <div className="text-center pt-4">
          <Link
            href="/blog"
            className="gold-btn-luxury inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold rounded-lg active:scale-[0.98] group"
          >
            <span>View All Posts</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
