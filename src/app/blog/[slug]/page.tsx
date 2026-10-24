import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getBlogPosts, getContributorBySlug } from '@/lib/db';
import { Calendar, Clock, ArrowLeft, ArrowUpRight } from 'lucide-react';
import ShareButtons from '@/components/blog/ShareButtons';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: `${post.title} | From the Desk of Akufai`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImageUrl || '/images/hero_patient_capital.png'],
    },
  };
}

export const revalidate = 0;

export default async function BlogPostDetailPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const author = getContributorBySlug(post.authorId);
  const relatedPosts = getBlogPosts(true).filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <article className="bg-white py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#036c3e] hover:text-[#02522f]"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#b6960b]" />
            <span>Back to All Articles</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="space-y-6 border-b border-[#dec668]/60 pb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-md bg-gradient-to-r from-[#fcf6df] to-[#f7ebc1] text-[#042f1b] text-xs font-bold uppercase tracking-wider border border-[#b6960b]/60">
              {post.category}
            </span>
            <div className="flex items-center gap-2 text-xs text-slate-500">
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
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#042f1b] tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed font-normal">
            {post.excerpt}
          </p>

          {/* Author Byline */}
          {author && (
            <div className="flex items-center justify-between pt-4 border-t border-[#dec668]/50">
              <Link
                href={`/authors/${author.slug}`}
                className="flex items-center gap-3 group"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#d4b429] to-[#b6960b] text-[#042f1b] border border-[#fff3b8] shadow-xs flex items-center justify-center font-bold text-sm font-serif">
                  {author.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#042f1b] group-hover:text-[#8f7506] transition-colors">
                    {author.name}
                  </p>
                  <p className="text-xs text-[#8f7506] font-semibold">{author.role}</p>
                </div>
              </Link>

              <ShareButtons title={post.title} />
            </div>
          )}
        </header>

        {/* Featured Image */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-[0_14px_34px_-8px_rgba(182,150,11,0.25)] border-2 border-[#b6960b] bg-slate-100">
          <Image
            src={post.coverImageUrl || '/images/blog_fintech_wave.jpg'}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Article Body Content */}
        <div
          className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-[#042f1b] prose-headings:tracking-tight prose-a:text-[#036c3e] prose-blockquote:border-[#b6960b] prose-blockquote:bg-[#fcf6df]/60 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Author Bio Box - Clean text-based Initials Badge Presentation */}
        {author && (
          <div className="gold-card-surface gold-glow-card p-6 sm:p-8 rounded-2xl border border-[#dec668] mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d4b429] to-[#b6960b] text-[#042f1b] border border-[#fff3b8] flex items-center justify-center font-bold text-2xl font-serif shrink-0 shadow-[0_4px_14px_rgba(182,150,11,0.3)]">
              {author.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div className="space-y-2 text-center sm:text-left flex-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8f7506]">
                About the Author
              </span>
              <h3 className="text-lg font-bold text-[#042f1b]">{author.name}</h3>
              <p className="text-xs font-medium text-slate-500">{author.role}</p>
              <p className="text-sm text-slate-600 leading-relaxed">{author.bio}</p>
              <div className="pt-2">
                <Link
                  href={`/authors/${author.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#8f7506] hover:text-[#042f1b] transition-colors"
                >
                  <span>View full author profile & articles</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#b6960b]" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="pt-12 border-t border-[#dec668]/60 space-y-6">
            <h3 className="text-xl font-bold text-[#042f1b]">Related Reflections</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((related) => (
                <div
                  key={related.id}
                  className="gold-card-surface gold-glow-card p-5 rounded-xl border border-[#dec668] space-y-2 group"
                >
                  <span className="text-xs font-bold text-[#8f7506] uppercase tracking-wider">
                    {related.category}
                  </span>
                  <h4 className="text-base font-bold text-[#042f1b] group-hover:text-[#8f7506] transition-colors leading-snug">
                    <Link href={`/blog/${related.slug}`}>{related.title}</Link>
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2">{related.excerpt}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
