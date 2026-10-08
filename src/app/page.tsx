import React from 'react';
import HeroSlider from '@/components/home/HeroSlider';
import FounderSection from '@/components/home/FounderSection';
import InvestmentPreview from '@/components/home/InvestmentPreview';
import ApproachSection from '@/components/home/ApproachSection';
import ValuesSection from '@/components/home/ValuesSection';
import PodcastFeature from '@/components/home/PodcastFeature';
import BlogPreview from '@/components/home/BlogPreview';
import {
  getHeroSlides,
  getAboutContent,
  getInvestmentAreas,
  getPodcastEpisodes,
  getBlogPosts,
} from '@/lib/db';

export const revalidate = 0; // Dynamic server rendering with immediate database updates

export default async function HomePage() {
  const heroSlides = getHeroSlides();
  const about = getAboutContent();
  const investmentAreas = getInvestmentAreas();
  const podcastEpisodes = getPodcastEpisodes();
  const blogPosts = getBlogPosts();

  return (
    <div className="flex flex-col bg-white">
      {/* 1. Hero Split Slider */}
      <HeroSlider slides={heroSlides} />

      {/* 2. Founder Section: "A founder-led firm with a selective lens" */}
      <FounderSection about={about} />

      {/* 3. Investment Focus Preview: 6 Focus Areas (What we look for) */}
      <InvestmentPreview areas={investmentAreas} />

      {/* 4. Distinct Our Approach Section */}
      <ApproachSection about={about} />

      {/* 5. Distinct Our Values Section */}
      <ValuesSection about={about} />

      {/* 6. Podcast Spotlight: "Akufai Conversations" */}
      <PodcastFeature episodes={podcastEpisodes} />

      {/* 7. Thought Leadership: "From the desk of Akufai" */}
      <BlogPreview posts={blogPosts} />
    </div>
  );
}
