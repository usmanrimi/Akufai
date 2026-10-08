export interface SiteSettings {
  siteName: string;
  siteTagline: string;
  metaDescription: string;
  contactEmail: string;
  contactAddress: string;
  disclaimer: string;
  secondaryDisclaimer: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    spotify?: string;
    apple?: string;
  };
}

export interface HeroSlide {
  id: string;
  kicker: string;
  title: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  imageUrl: string;
  order: number;
  isActive: boolean;
}

export interface ValueItem {
  title: string;
  description: string;
}

export interface AboutContent {
  headline: string;
  subheadline: string;
  overviewParagraphs: string[];
  founder: {
    name: string;
    role: string;
    titles: string;
    portraitUrl: string;
    whiteboardUrl: string;
    bioParagraphs: string[];
    lensQuote: string;
  };
  approachTitle: string;
  approachParagraph1: string;
  approachParagraph2: string;
  values: ValueItem[];
}

export interface Contributor {
  id: string;
  slug: string;
  name: string;
  role: string;
  avatarUrl: string;
  bio: string;
  postCount: number;
  episodeCount: number;
  email?: string;
  linkedin?: string;
  twitter?: string;
}

export interface InvestmentArea {
  id: string;
  slug: string;
  number: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  focusThemes: string[];
  imageUrl: string;
  order: number;
}

export interface PodcastEpisode {
  id: string;
  slug: string;
  episodeNumber: number;
  title: string;
  category: string;
  publishDate: string;
  status: 'published' | 'draft' | 'scheduled';
  duration: string;
  description: string;
  audioUrl?: string;
  coverImageUrl: string;
  hostName: string;
  guestName?: string;
  guestRole?: string;
  spotifyUrl?: string;
  appleUrl?: string;
  keyTakeaways: string[];
  transcript?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  publishDate: string;
  status: 'published' | 'draft';
  excerpt: string;
  contentHtml: string;
  coverImageUrl: string;
  authorId: string;
  readTime: string;
  isFeatured: boolean;
}

export interface Inquiry {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  organization?: string;
  subject: string;
  inquiryType: 'investment' | 'partnership' | 'podcast' | 'general';
  message: string;
  status: 'unread' | 'read' | 'replied';
  notes?: string;
}

export interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
  status: 'confirmed' | 'unsubscribed';
  token: string;
}

export interface MediaFile {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  size: number;
  uploadedAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  role: 'admin' | 'editor';
  createdAt: string;
}

export interface PublicationRecord {
  id: string;
  version: string;
  commitSha?: string;
  commitMessage: string;
  commitUrl?: string;
  publishedBy: string;
  publishedAt: string;
  deploymentStatus: 'draft' | 'committed' | 'deploying' | 'deployed' | 'failed';
  deploymentUrl?: string;
  deploymentId?: string;
  changeSummary: string[];
  snapshotData?: any;
}

export interface PublishingConfig {
  githubOwner: string;
  githubRepo: string;
  githubBranch: string;
  githubTokenConfigured: boolean;
  deployHookUrl?: string;
  productionUrl: string;
  autoDeployOnPublish: boolean;
  lastPublishedAt?: string;
  lastPublishedVersion?: string;
  lastCommitSha?: string;
}

export interface DatabaseSchema {
  settings: SiteSettings;
  heroSlides: HeroSlide[];
  about: AboutContent;
  contributors: Contributor[];
  investmentAreas: InvestmentArea[];
  podcastEpisodes: PodcastEpisode[];
  blogPosts: BlogPost[];
  inquiries: Inquiry[];
  subscribers: Subscriber[];
  media: MediaFile[];
  users: AdminUser[];
  publications: PublicationRecord[];
  publishingConfig: PublishingConfig;
}
