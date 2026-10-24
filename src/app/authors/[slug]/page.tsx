import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getContributorBySlug, getBlogPosts, getPodcastEpisodes } from '@/lib/db';
import { ArrowLeft, ArrowUpRight, Calendar, Clock, Headphones } from 'lucide-react';

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = getContributorBySlug(slug);
  if (!author) return { title: 'Contributor Not Found' };
  return {
    title: `${author.name} | Contributor Profile`,
    description: author.bio,
  };
}

export const revalidate = 0;

export default async function ContributorProfilePage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = getContributorBySlug(slug);

  if (!author) {
    notFound();
  }

  const posts = getBlogPosts(true).filter((p) => p.authorId === author.id || p.authorId === author.slug);
  const episodes = getPodcastEpisodes(false).filter(
    (e) => e.guestName?.toLowerCase().includes(author.name.toLowerCase().split(' ')[0]) || e.hostName?.toLowerCase().includes(author.name.toLowerCase().split(' ')[0])
  );

  return (
    <div className="bg-white py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/about#contributors"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#036c3e] hover:text-[#02522f]"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#b6960b]" />
            <span>Back to Contributors</span>
          </Link>
        </div>

        {/* Profile Card */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#f2f9f5]/40 border border-[#e6d58f] flex flex-col sm:flex-row items-center sm:items-start gap-8 relative overflow-hidden">
          {/* Subtle Top Gold Accent */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#036c3e] via-[#b6960b] to-[#036c3e]" />

          <div className="w-20 h-20 rounded-2xl bg-[#f2f9f5] text-[#036c3e] border border-[#b6960b]/40 flex items-center justify-center font-bold text-2xl font-serif shrink-0 shadow-xs">
            {author.name.split(' ').map((n) => n[0]).join('')}
          </div>

          <div className="space-y-4 text-center sm:text-left flex-1">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#036c3e]">{author.name}</h1>
              <p className="text-sm font-semibold text-[#b6960b] mt-0.5">{author.role}</p>
            </div>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {author.bio}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-medium text-slate-600">
              <span className="bg-white px-3 py-1 rounded-md border border-[#e6d58f]">
                <strong className="text-[#b6960b] font-bold">{posts.length}</strong> Published Articles
              </span>
              <span className="bg-white px-3 py-1 rounded-md border border-[#e6d58f]">
                <strong className="text-[#b6960b] font-bold">{episodes.length}</strong> Podcast Appearances
              </span>
            </div>
          </div>
        </div>

        {/* Authored Articles */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[#036c3e] border-b border-slate-100 pb-3">
            Articles & Reflections
          </h2>

          {posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="p-6 rounded-xl border border-slate-200 bg-white hover:border-[#b6960b] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="text-[#b6960b] font-semibold uppercase">{post.category}</span>
                      <span>•</span>
                      <span>{post.publishDate}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#036c3e] transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-[#036c3e] hover:text-[#b6960b] transition-colors"
                  >
                    <span>Read</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#b6960b]" />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 italic">No published articles yet.</p>
          )}
        </div>

        {/* Podcast Appearances */}
        {episodes.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-slate-100">
            <h2 className="text-2xl font-bold text-[#036c3e] border-b border-slate-100 pb-3">
              Podcast Conversations
            </h2>

            <div className="space-y-4">
              {episodes.map((ep) => (
                <div
                  key={ep.id}
                  className="p-6 rounded-xl border border-slate-200 bg-white hover:border-[#b6960b] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="text-[#b6960b] font-semibold uppercase">Episode {ep.episodeNumber}</span>
                      <span>•</span>
                      <span>{ep.duration}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#036c3e] transition-colors">
                      <Link href={`/podcast/${ep.slug}`}>{ep.title}</Link>
                    </h3>
                  </div>

                  <Link
                    href={`/podcast/${ep.slug}`}
                    className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-[#036c3e] hover:text-[#b6960b] transition-colors"
                  >
                    <span>Listen</span>
                    <Headphones className="w-3.5 h-3.5 text-[#b6960b]" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
