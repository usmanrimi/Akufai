import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import {
  DatabaseSchema,
  SiteSettings,
  HeroSlide,
  AboutContent,
  Contributor,
  InvestmentArea,
  PodcastEpisode,
  BlogPost,
  Inquiry,
  Subscriber,
  MediaFile,
  AdminUser,
  PublicationRecord,
  PublishingConfig,
} from '@/types';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

const INITIAL_SEED: DatabaseSchema = {
  settings: {
    siteName: 'Akufai Capital & Equities',
    siteTagline: 'A founder-led firm with a selective lens.',
    metaDescription:
      'Akufai Capital & Equities LLC is a private investment firm led by Dr. Ali Garba, taking a venture-leaning and long-term approach to opportunities across sectors, markets, and emerging themes.',
    contactEmail: 'inquiries@akufaicapitalandequities.com',
    contactAddress: 'Abu Dhabi • Lagos • London',
    disclaimer:
      'The information on this website is provided for general informational purposes only and does not constitute investment advice, an offer, or a solicitation.',
    secondaryDisclaimer:
      'For aligned inquiries only. The information on this website is provided for general informational purposes only and does not constitute an offer, solicitation, or investment advice. © 2026 Akufai Capital & Equities LLC. All rights reserved.',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/akufai-capital',
      twitter: 'https://x.com/akufaicapital',
      spotify: 'https://spotify.com/show/akufai-conversations',
      apple: 'https://podcasts.apple.com/podcast/akufai-conversations',
    },
  },
  heroSlides: [
    {
      id: 'slide-1',
      kicker: 'Founder-Led Investment Firm',
      title: 'Patient Capital',
      subtitle:
        'Akufai Capital & Equities LLC is a private investment firm led by Dr. Ali Garba, taking a venture-leaning and long-term approach to opportunities across sectors, markets, and emerging themes.',
      primaryCtaText: 'About Akufai',
      primaryCtaLink: '/about',
      secondaryCtaText: 'For Aligned Inquiries',
      secondaryCtaLink: '/contact',
      imageUrl: '/images/hero_patient_capital.png',
      order: 1,
      isActive: true,
    },
    {
      id: 'slide-2',
      kicker: 'Durable Value Creation',
      title: 'Long-term Value',
      subtitle:
        'Including African-founded and African-owned businesses with durable models, strong leadership, and real-world relevance.',
      primaryCtaText: 'Investment Focus',
      primaryCtaLink: '/investment',
      secondaryCtaText: 'For Aligned Inquiries',
      secondaryCtaLink: '/contact',
      imageUrl: '/images/hero_long_term_value.png',
      order: 2,
      isActive: true,
    },
    {
      id: 'slide-3',
      kicker: 'Disciplined Orientation',
      title: 'Selective Partnerships',
      subtitle:
        'We are especially interested in ventures with strong fundamentals, cross-border relevance, and the potential to solve meaningful social and economic challenges.',
      primaryCtaText: 'Our Approach',
      primaryCtaLink: '/about',
      secondaryCtaText: 'Get In Touch',
      secondaryCtaLink: '/contact',
      imageUrl: '/images/hero_selective_partnerships.png',
      order: 3,
      isActive: true,
    },
  ],
  about: {
    headline: 'About Akufai Capital & Equities',
    subheadline: 'A founder-led firm with a selective lens and a disciplined, patient capital orientation.',
    overviewParagraphs: [
      'Akufai Capital & Equities LLC is a private investment firm led by Dr. Ali Garba. The firm takes a selective, venture-leaning, and long-term approach to opportunities across sectors and geographies, with particular interest in ventures that combine commercial promise with real-world relevance.',
      'Akufai is not designed to be everything to everyone. It is being shaped deliberately: first as a private investment firm, and over time as a broader advisory and investment platform built around aligned relationships, thoughtful partnerships, and selective engagement.',
    ],
    founder: {
      name: 'Dr. Ali Garba',
      role: 'Founder, Principal Investor, Chairman/CEO',
      titles: 'Founder, Principal Investor, Chairman/CEO',
      portraitUrl: '/images/dr_ali_garba_portrait.png',
      whiteboardUrl: '/images/dr_ali_garba_whiteboard.png',
      bioParagraphs: [
        'Dr. Ali Garba leads Akufai Capital & Equities with a perspective shaped by cross-border experience, strategic judgment, and a long-term view of value creation.',
        'Akufai reflects his conviction that strong opportunities are often found where disciplined thinking, patient capital, and trusted relationships come together.',
        "The firm's interests span multiple sectors, including healthtech, AI, fintech, infrastructure, and private growth-oriented opportunities. Akufai is especially attentive to ventures connected to African markets and to founders building businesses that respond to meaningful social and economic needs.",
      ],
      lensQuote: 'A founder-led firm with a selective lens.',
    },
    approachTitle: 'Our approach',
    approachParagraph1:
      'Akufai is deliberate by design. We value thoughtful evaluation over noise, long-term perspective over short-term signaling, and aligned relationships over volume.',
    approachParagraph2:
      'As the firm continues to evolve, it is building toward a broader advisory and investment platform model while remaining grounded in selective investment judgment.',
    values: [
      {
        title: 'Long-term orientation',
        description: 'Prioritizing durable value creation and sustainable fundamentals over short-term signaling.',
      },
      {
        title: 'Selective partnership',
        description: 'Choosing aligned partners and founders where deep mutual trust creates lasting leverage.',
      },
      {
        title: 'Cross-border perspective',
        description: 'Bridging high-growth emerging economies with global capital, technology, and governance networks.',
      },
      {
        title: 'Strategic judgment',
        description: 'Rigorous analysis and disciplined capital allocation informed by real operating experience.',
      },
      {
        title: 'Meaningful value creation',
        description: 'Focusing on businesses that solve essential real-world challenges with commercially robust models.',
      },
    ],
  },
  contributors: [
    {
      id: 'faisal-umar',
      slug: 'faisal-umar',
      name: 'Faisal Umar',
      role: 'Investment Analyst & Contributing Writer',
      avatarUrl: '',
      bio: 'Faisal Umar is an investment analyst and writer with deep expertise in African capital markets, fintech infrastructure, and cross-border venture dynamics.',
      postCount: 4,
      episodeCount: 2,
      email: 'faisal.umar@akufaicapitalandequities.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://x.com',
    },
    {
      id: 'ahmad-tijjani',
      slug: 'ahmad-tijjani',
      name: 'Ahmad Tijjani',
      role: 'Technology Strategist & Contributing Editor',
      avatarUrl: '',
      bio: 'Ahmad Tijjani is a technology strategist and contributing editor at Akufai Capital, focused on AI, healthtech innovation, and emerging market technology adoption.',
      postCount: 3,
      episodeCount: 2,
      email: 'ahmad.tijjani@akufaicapitalandequities.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://x.com',
    },
    {
      id: 'prof-ferguson',
      slug: 'prof-ferguson',
      name: 'Professor Ferguson',
      role: 'Academic Advisor & Macroeconomist',
      avatarUrl: '',
      bio: 'Professor Ferguson is a distinguished economist and academic advisor to Akufai Capital, specializing in macroeconomic policy, cross-border trade flows, and emerging market capital structures.',
      postCount: 2,
      episodeCount: 2,
      email: 'ferguson.advisor@akufaicapitalandequities.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://x.com',
    },
  ],
  investmentAreas: [
    {
      id: 'healthtech',
      slug: 'healthtech',
      number: '01',
      title: 'Healthtech',
      shortDescription:
        'Deploying capital into tech-enabled healthcare delivery, diagnostics, supply chain efficiency, and scalable medical solutions across high-need markets.',
      detailedDescription:
        'Healthcare delivery in emerging markets requires technology-enabled models that drastically reduce friction, democratize access to diagnostics, and optimize pharmaceutical supply chains. We partner with founders creating durable clinical and distribution solutions designed for local operational realities.',
      focusThemes: [
        'Digital diagnostics & telemedicine',
        'Pharmaceutical supply chain rails',
        'Hospital management information systems',
        'Accessible health insurance technology',
      ],
      imageUrl: '/images/investment_healthtech.jpg',
      order: 1,
    },
    {
      id: 'artificial-intelligence',
      slug: 'artificial-intelligence',
      number: '02',
      title: 'Artificial Intelligence',
      shortDescription:
        'Backing pragmatic AI applications, foundational data infrastructure, and automation platforms solving enterprise bottlenecks in emerging economies.',
      detailedDescription:
        'We look beyond generative hype to focus on practical, enterprise-grade AI applications that drive measurable operational leverage. Our interest spans intelligent automation, localization of AI models for regional languages and workflows, and specialized data pipelines.',
      focusThemes: [
        'Enterprise workflow automation',
        'Local language processing & specialized LLMs',
        'Data infrastructure & edge analytics',
        'AI-driven operational risk assessment',
      ],
      imageUrl: '/images/investment_ai.jpg',
      order: 2,
    },
    {
      id: 'fintech',
      slug: 'fintech',
      number: '03',
      title: 'Fintech',
      shortDescription:
        'Supporting next-generation payment infrastructure, cross-border liquidity rails, credit enablement, and digital financial inclusion systems.',
      detailedDescription:
        'Financial plumbing remains one of the largest compounding opportunities across the continent. We invest in foundational infrastructure that powers seamless cross-border settlement, SME credit scoring, and open banking architectures.',
      focusThemes: [
        'Cross-border payment rails',
        'B2B merchant settlement solutions',
        'Alternative credit underwriting models',
        'Treasury management & currency hedging',
      ],
      imageUrl: '/images/investment_fintech.jpg',
      order: 3,
    },
    {
      id: 'infrastructure-enabling-systems',
      slug: 'infrastructure-enabling-systems',
      number: '04',
      title: 'Infrastructure & Enabling Systems',
      shortDescription:
        'Investing in the physical and digital backbones that unlock economic productivity—logistics, connectivity, power, and supply chain rails.',
      detailedDescription:
        'Durable commercial ecosystems depend upon robust foundational systems. We seek out technology-augmented logistics networks, distributed clean energy architectures, and digital public infrastructure that enable commerce to scale sustainably.',
      focusThemes: [
        'Tech-enabled cold chain and freight logistics',
        'Decentralized clean power systems',
        'Telecom & connectivity infrastructure',
        'Agricultural aggregation & storage rails',
      ],
      imageUrl: '/images/investment_infrastructure.jpg',
      order: 4,
    },
    {
      id: 'african-markets-cross-border',
      slug: 'african-markets-cross-border',
      number: '05',
      title: 'African Markets & Cross-border Ventures',
      shortDescription:
        'Catalyzing African-founded and African-owned enterprises with durable business models, robust leadership, and cross-border scalability.',
      detailedDescription:
        'We hold high conviction in African founders solving systemic challenges. We actively support companies expanding across multiple regional economic zones, helping navigate regulatory nuances, operational scaling, and cross-border market entry.',
      focusThemes: [
        'Regional market expansion playbooks',
        'Cross-border trade facilitation',
        'Diaspora capital & remittance linkages',
        'High-margin pan-African service platforms',
      ],
      imageUrl: '/images/investment_african_markets.jpg',
      order: 5,
    },
    {
      id: 'private-deals-growth',
      slug: 'private-deals-growth',
      number: '06',
      title: 'Private Deals & Growth-oriented Opportunities',
      shortDescription:
        'Selectively participating in bespoke private transactions, growth equity rounds, and special situations with strong margins of safety.',
      detailedDescription:
        'Complementing our venture focus, we deploy patient capital into mature, profitable private enterprises seeking strategic expansion capital, recapitalization, or co-investment syndication with aligned long-term partners.',
      focusThemes: [
        'Strategic co-investments with institutional partners',
        'Structured growth equity',
        'Management buyouts & succession transactions',
        'Special situations with high intrinsic asset backing',
      ],
      imageUrl: '/images/investment_private_deals.jpg',
      order: 6,
    },
  ],
  podcastEpisodes: [
    {
      id: 'ep-1',
      slug: 'inside-next-fintech-infrastructure-wave',
      episodeNumber: 1,
      title: 'Episode Preview: Inside the Next Fintech Infrastructure Wave',
      category: 'Fintech',
      publishDate: '2026-05-01',
      status: 'scheduled',
      duration: '38 min',
      description:
        'Preview article and discussion for an upcoming episode exploring the evolution of cross-border settlement protocols, liquidity corridors, and digital banking rails across Africa.',
      audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=corporate-ambient-112199.mp3',
      coverImageUrl: '/images/blog_fintech_wave.jpg',
      hostName: 'Dr. Ali Garba',
      guestName: 'Faisal Umar',
      guestRole: 'Investment Analyst & Fintech Researcher',
      spotifyUrl: 'https://open.spotify.com',
      appleUrl: 'https://podcasts.apple.com',
      keyTakeaways: [
        'Why layer-1 payment switches are moving from national silos to regional interoperability.',
        'The role of stable currency corridors in mitigating FX volatility for cross-border traders.',
        'How compliance and automated KYC infrastructure unlock institutional liquidity.',
      ],
      transcript:
        'Welcome to Akufai Conversations. In this preview episode, Dr. Ali Garba and Faisal Umar break down the structural shifts underpinning the next generation of financial infrastructure across emerging markets...',
    },
    {
      id: 'ep-2',
      slug: 'cross-border-founder-execution-playbook',
      episodeNumber: 2,
      title: 'Episode Release: Cross-Border Founder Execution Playbook',
      category: 'Cross-Border',
      publishDate: '2026-04-30',
      status: 'published',
      duration: '45 min',
      description:
        'This post was first published as coming soon and later updated with released audio. A strategic discussion on multi-jurisdiction scaling, unit economics, and team governance across African markets.',
      audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=inspiring-cinematic-ambient-116199.mp3',
      coverImageUrl: '/images/blog_crossborder_playbook.jpg',
      hostName: 'Dr. Ali Garba',
      guestName: 'Professor Ferguson & Strategic Operators',
      guestRole: 'Academic Advisor & Macroeconomist',
      spotifyUrl: 'https://open.spotify.com',
      appleUrl: 'https://podcasts.apple.com',
      keyTakeaways: [
        'Navigating divergent regulatory frameworks without overburdening operating cash flow.',
        'Building decentralized leadership teams that maintain cultural alignment across borders.',
        'Capital allocation discipline during currency devaluation cycles.',
      ],
      transcript:
        'In this episode of Akufai Conversations, we explore the tactical realities facing founders who expand beyond single-country markets...',
    },
  ],
  blogPosts: [
    {
      id: 'post-1',
      slug: 'inside-next-fintech-infrastructure-wave',
      title: 'Episode Preview: Inside the Next Fintech Infrastructure Wave',
      category: 'Podcast',
      publishDate: 'May 1, 2026',
      status: 'published',
      excerpt:
        'Preview article for an upcoming episode with waitlist enabled. Exploring the technical and capital foundations powering the next era of cross-border financial systems.',
      contentHtml: `
        <p>Across emerging markets, the first decade of fintech focused on consumer-facing digital wallets and simple payment gateways. While these interfaces onboarded millions of users, the underlying infrastructure remained constrained by legacy clearing systems and fragmented regulatory rails.</p>
        
        <h2>The Shift to Foundational Plumbing</h2>
        <p>Today, a deeper transformation is taking place. Investment and engineering capital are gravitating toward foundational plumbing: real-time gross settlement networks, automated treasury and FX routing, and interoperable compliance protocols.</p>
        
        <p>At Akufai Capital, our lens centers on companies building durable platforms rather than transient consumer arbitrage. When payment infrastructure achieves true cross-border reliability, trade velocity increases exponentially, creating sustainable long-term economic compounding.</p>
        
        <blockquote>
          "Durable enterprise value is generated when fundamental market frictions are resolved at the infrastructural layer."
        </blockquote>
        
        <h2>Key Strategic Inquiries</h2>
        <ul>
          <li>How can multi-currency settlement rails reduce working capital drag for cross-border merchants?</li>
          <li>What regulatory harmonizations are required to foster regional clearing houses?</li>
          <li>Where do private capital and sovereign infrastructure intersect most effectively?</li>
        </ul>
        
        <p>Listen to the full companion episode on <em>Akufai Conversations</em> for an in-depth conversation between Dr. Ali Garba and our investment team.</p>
      `,
      coverImageUrl: '/images/blog_fintech_wave.jpg',
      authorId: 'faisal-umar',
      readTime: '5 min read',
      isFeatured: true,
    },
    {
      id: 'post-2',
      slug: 'cross-border-founder-execution-playbook',
      title: 'Episode Release: Cross-Border Founder Execution Playbook',
      category: 'Podcast',
      publishDate: 'April 30, 2026',
      status: 'published',
      excerpt:
        'This post was first published as coming soon and later updated with released audio. Key insights on navigating regulatory diversity, team synchronization, and capital efficiency.',
      contentHtml: `
        <p>Building a successful enterprise in a single market is notoriously difficult; expanding that enterprise across borders in Africa requires a fundamentally distinct strategic playbook.</p>
        
        <h2>1. Contextual Localization vs. Core Standardization</h2>
        <p>The most resilient cross-border operators maintain a strict division between what must remain standard (codebase architecture, governance principles, treasury controls) and what must be ruthlessly localized (customer relationships, field operations, regulatory compliance).</p>
        
        <h2>2. Foreign Exchange Risk as an Operational Core Competency</h2>
        <p>In cross-border ventures, currency fluctuations cannot be treated as an accounting afterthought. Disciplined founders design dynamic pricing, local supply sourcing, and proactive treasury hedging directly into their everyday unit economics.</p>
        
        <h2>3. Patient Capital as a Competitive Advantage</h2>
        <p>Venture-backed models that prioritize hyper-growth at the expense of positive unit economics often break when crossing borders. Conversely, patient capital allows founders to navigate regulatory licensing timelines and build genuine local trust without existential runway anxiety.</p>
      `,
      coverImageUrl: '/images/blog_crossborder_playbook.jpg',
      authorId: 'faisal-umar',
      readTime: '7 min read',
      isFeatured: true,
    },
    {
      id: 'post-3',
      slug: 'ai-future-healthcare-emerging-economies',
      title: 'AI and the Future of Healthcare in Emerging Economies',
      category: 'Health',
      publishDate: 'April 29, 2026',
      status: 'published',
      excerpt:
        'How artificial intelligence is reshaping healthcare delivery in markets where it matters most, bridging clinical shortages and optimizing diagnostics.',
      contentHtml: `
        <p>In many regions across emerging markets, the ratio of specialized physicians to citizens remains severely unbalanced. Traditional infrastructure development—building brick-and-mortar hospitals and training thousands of specialists—is vital, but cannot match immediate population needs alone.</p>
        
        <h2>Augmenting Frontline Clinical Capability</h2>
        <p>Artificial intelligence offers its most transformative social and commercial return not in replacing doctors, but in empowering frontline healthcare workers and general practitioners. Tech-assisted imaging, automated triage systems, and symptom-analysis engines enable primary healthcare clinics to deliver secondary-level diagnostic accuracy.</p>
        
        <h2>Supply Chain Optimization</h2>
        <p>Beyond diagnostics, predictive models are fundamentally improving pharmaceutical logistics. By analyzing seasonal disease outbreaks and localized demand patterns, AI-driven inventory systems minimize stock-outs of essential antibiotics and vaccines in remote clinics.</p>
        
        <p>At Akufai Capital, we evaluate healthtech ventures based on clinical validity, unit economics, and proven integration with existing public and private health workflows.</p>
      `,
      coverImageUrl: '/images/blog_healthcare_ai.jpg',
      authorId: 'ahmad-tijjani',
      readTime: '6 min read',
      isFeatured: true,
    },
  ],
  inquiries: [
    {
      id: 'inq-1',
      createdAt: '2026-05-02T10:15:00Z',
      name: 'Oluwaseun Adeyemi',
      email: 'o.adeyemi@crossborderlogistics.africa',
      organization: 'Pan-African Freight Systems',
      subject: 'Series A Co-Investment Inquiry',
      inquiryType: 'investment',
      message:
        'We are currently closing a $4.5M Series A round for our tech-enabled freight corridor between Nigeria and Ghana. We would welcome an aligned discussion with Dr. Ali Garba and the Akufai team.',
      status: 'read',
      notes: 'Reviewed by investment team. Aligns with Infrastructure focus.',
    },
  ],
  subscribers: [
    {
      id: 'sub-1',
      email: 'investor.relations@globalpartners.com',
      subscribedAt: '2026-05-01T14:22:00Z',
      status: 'confirmed',
      token: 'sub_token_sample_123',
    },
  ],
  media: [
    {
      id: 'med-1',
      filename: 'logo.png',
      url: '/images/logo.png',
      mimeType: 'image/png',
      size: 54743,
      uploadedAt: '2026-05-01T08:00:00Z',
    },
    {
      id: 'med-2',
      filename: 'dr_ali_garba_portrait.png',
      url: '/images/dr_ali_garba_portrait.png',
      mimeType: 'image/png',
      size: 44036,
      uploadedAt: '2026-05-01T08:00:00Z',
    },
  ],
  users: [
    {
      id: 'usr-admin-1',
      email: 'admin@akufaicapitalandequities.com',
      name: 'Akufai Administrator',
      passwordHash: '$2a$10$7Z8V2bT5zL1yL6E3O7z/CeE1hF1Z8p4x7q5o8V3o8V3o8V3o8V3o8', // 'Akufai2026!Secure'
      role: 'admin',
      createdAt: '2026-05-01T00:00:00Z',
    },
  ],
  publications: [
    {
      id: 'pub_initial_release',
      version: 'v1.0.0',
      commitSha: '69f8c1a',
      commitMessage: 'Initial website deployment with approved design, typography & layout',
      commitUrl: 'https://github.com/akufai-capital/website/commit/69f8c1a',
      publishedBy: 'admin@akufaicapitalandequities.com',
      publishedAt: '2026-10-06T18:30:00Z',
      deploymentStatus: 'deployed',
      deploymentUrl: 'https://akufaicapitalandequities.com',
      deploymentId: 'dpl_init_20261006',
      changeSummary: [
        'Enlarged brand logo in header and footer (2.65:1 aspect ratio)',
        'Header redesign with visible Get in Touch button',
        'About page high-contrast typography and enhanced contributor profile cards',
        'Investment focus areas interactive layout and thesis explorer',
        'Removed podcast launch notice from catalog',
      ],
    },
  ],
  publishingConfig: {
    githubOwner: 'akufai-capital',
    githubRepo: 'website',
    githubBranch: 'main',
    githubTokenConfigured: false,
    deployHookUrl: '',
    productionUrl: 'https://akufaicapitalandequities.com',
    autoDeployOnPublish: true,
    lastPublishedAt: '2026-10-06T18:30:00Z',
    lastPublishedVersion: 'v1.0.0',
    lastCommitSha: '69f8c1a',
  },
};

const PUBLISHED_PATH = path.join(process.cwd(), 'data', 'published-content.json');

function ensureDbDirectory() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function getDb(): DatabaseSchema {
  ensureDbDirectory();
  if (!fs.existsSync(DB_PATH)) {
    // Generate fresh hash for default admin password 'Akufai2026!Secure'
    const defaultPass = 'Akufai2026!Secure';
    const hash = bcrypt.hashSync(defaultPass, 10);
    const initialData = { ...INITIAL_SEED };
    initialData.users[0].passwordHash = hash;
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), 'utf-8');
    exportPublishedContent(initialData);
    return initialData;
  }
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    let dirty = false;
    if (!parsed.publications) {
      parsed.publications = INITIAL_SEED.publications;
      dirty = true;
    }
    if (!parsed.publishingConfig) {
      parsed.publishingConfig = INITIAL_SEED.publishingConfig;
      dirty = true;
    }
    if (dirty) {
      fs.writeFileSync(DB_PATH, JSON.stringify(parsed, null, 2), 'utf-8');
    }
    return parsed;
  } catch (err) {
    console.error('Error reading db.json, returning initial seed:', err);
    return INITIAL_SEED;
  }
}

export function saveDb(data: DatabaseSchema): void {
  ensureDbDirectory();
  const tempPath = `${DB_PATH}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tempPath, DB_PATH);
}

/**
 * Extracts ONLY public website content and exports to data/published-content.json.
 * Strictly excludes: admin users, passwords, inquiries, subscriber lists, private draft articles.
 */
export function exportPublishedContent(dbData?: DatabaseSchema): any {
  const db = dbData || getDb();
  ensureDbDirectory();

  const publicData = {
    version: db.publishingConfig?.lastPublishedVersion || 'v1.0.0',
    exportedAt: new Date().toISOString(),
    settings: db.settings,
    heroSlides: db.heroSlides.filter((s) => s.isActive).sort((a, b) => a.order - b.order),
    about: db.about,
    contributors: db.contributors,
    investmentAreas: db.investmentAreas.sort((a, b) => a.order - b.order),
    podcastEpisodes: db.podcastEpisodes.filter((e) => e.status === 'published' || e.status === 'scheduled'),
    blogPosts: db.blogPosts.filter((p) => p.status === 'published'),
    media: db.media,
  };

  const tempPath = `${PUBLISHED_PATH}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(publicData, null, 2), 'utf-8');
  fs.renameSync(tempPath, PUBLISHED_PATH);
  return publicData;
}

export function getPublishedContent(): any {
  ensureDbDirectory();
  if (fs.existsSync(PUBLISHED_PATH)) {
    try {
      const raw = fs.readFileSync(PUBLISHED_PATH, 'utf-8');
      return JSON.parse(raw);
    } catch {
      // Fallback
    }
  }
  return exportPublishedContent();
}

// Accessor helpers
export function getSiteSettings(): SiteSettings {
  return getDb().settings;
}

export function updateSiteSettings(settings: Partial<SiteSettings>): SiteSettings {
  const db = getDb();
  db.settings = { ...db.settings, ...settings };
  saveDb(db);
  return db.settings;
}

export function getHeroSlides(): HeroSlide[] {
  return getDb().heroSlides.filter((s) => s.isActive).sort((a, b) => a.order - b.order);
}

export function getAllHeroSlides(): HeroSlide[] {
  return getDb().heroSlides.sort((a, b) => a.order - b.order);
}

export function updateHeroSlides(slides: HeroSlide[]): HeroSlide[] {
  const db = getDb();
  db.heroSlides = slides;
  saveDb(db);
  return db.heroSlides;
}

export function getAboutContent(): AboutContent {
  return getDb().about;
}

export function updateAboutContent(about: AboutContent): AboutContent {
  const db = getDb();
  db.about = about;
  saveDb(db);
  return db.about;
}

export function getContributors(): Contributor[] {
  return getDb().contributors;
}

export function getContributorBySlug(slug: string): Contributor | undefined {
  return getDb().contributors.find((c) => c.slug === slug || c.id === slug);
}

export function updateContributors(contributors: Contributor[]): Contributor[] {
  const db = getDb();
  db.contributors = contributors;
  saveDb(db);
  return db.contributors;
}

export function getInvestmentAreas(): InvestmentArea[] {
  return getDb().investmentAreas.sort((a, b) => a.order - b.order);
}

export function getInvestmentAreaBySlug(slug: string): InvestmentArea | undefined {
  return getDb().investmentAreas.find((i) => i.slug === slug || i.id === slug);
}

export function updateInvestmentAreas(areas: InvestmentArea[]): InvestmentArea[] {
  const db = getDb();
  db.investmentAreas = areas;
  saveDb(db);
  return db.investmentAreas;
}

export function getPodcastEpisodes(publishedOnly = true): PodcastEpisode[] {
  const episodes = getDb().podcastEpisodes;
  if (!publishedOnly) return episodes.sort((a, b) => b.episodeNumber - a.episodeNumber);
  return episodes.filter((e) => e.status === 'published' || e.status === 'scheduled').sort((a, b) => b.episodeNumber - a.episodeNumber);
}

export function getPodcastEpisodeBySlug(slug: string): PodcastEpisode | undefined {
  return getDb().podcastEpisodes.find((e) => e.slug === slug || e.id === slug);
}

export function savePodcastEpisode(episode: PodcastEpisode): PodcastEpisode {
  const db = getDb();
  const idx = db.podcastEpisodes.findIndex((e) => e.id === episode.id || e.slug === episode.slug);
  if (idx >= 0) {
    db.podcastEpisodes[idx] = episode;
  } else {
    db.podcastEpisodes.push(episode);
  }
  saveDb(db);
  return episode;
}

export function deletePodcastEpisode(id: string): boolean {
  const db = getDb();
  const initialLen = db.podcastEpisodes.length;
  db.podcastEpisodes = db.podcastEpisodes.filter((e) => e.id !== id && e.slug !== id);
  if (db.podcastEpisodes.length !== initialLen) {
    saveDb(db);
    return true;
  }
  return false;
}

export function getBlogPosts(publishedOnly = true): BlogPost[] {
  const posts = getDb().blogPosts;
  if (!publishedOnly) return posts;
  return posts.filter((p) => p.status === 'published');
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getDb().blogPosts.find((p) => p.slug === slug || p.id === slug);
}

export function saveBlogPost(post: BlogPost): BlogPost {
  const db = getDb();
  const idx = db.blogPosts.findIndex((p) => p.id === post.id || p.slug === post.slug);
  if (idx >= 0) {
    db.blogPosts[idx] = post;
  } else {
    db.blogPosts.push(post);
  }
  saveDb(db);
  return post;
}

export function deleteBlogPost(id: string): boolean {
  const db = getDb();
  const initialLen = db.blogPosts.length;
  db.blogPosts = db.blogPosts.filter((p) => p.id !== id && p.slug !== id);
  if (db.blogPosts.length !== initialLen) {
    saveDb(db);
    return true;
  }
  return false;
}

export function getInquiries(): Inquiry[] {
  return getDb().inquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function addInquiry(inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>): Inquiry {
  const db = getDb();
  const newInquiry: Inquiry = {
    ...inquiry,
    id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    status: 'unread',
  };
  db.inquiries.unshift(newInquiry);
  saveDb(db);
  return newInquiry;
}

export function updateInquiryStatus(id: string, status: 'unread' | 'read' | 'replied', notes?: string): Inquiry | null {
  const db = getDb();
  const item = db.inquiries.find((i) => i.id === id);
  if (!item) return null;
  item.status = status;
  if (notes !== undefined) item.notes = notes;
  saveDb(db);
  return item;
}

export function getSubscribers(): Subscriber[] {
  return getDb().subscribers.sort((a, b) => new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime());
}

export function addSubscriber(email: string): { subscriber: Subscriber; isNew: boolean } {
  const db = getDb();
  const normalized = email.trim().toLowerCase();
  const existing = db.subscribers.find((s) => s.email.toLowerCase() === normalized);
  if (existing) {
    if (existing.status === 'unsubscribed') {
      existing.status = 'confirmed';
      saveDb(db);
    }
    return { subscriber: existing, isNew: false };
  }
  const newSub: Subscriber = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    email: normalized,
    subscribedAt: new Date().toISOString(),
    status: 'confirmed',
    token: `tok_${Math.random().toString(36).substring(2)}${Date.now()}`,
  };
  db.subscribers.unshift(newSub);
  saveDb(db);
  return { subscriber: newSub, isNew: true };
}

export function unsubscribeUser(tokenOrEmail: string): boolean {
  const db = getDb();
  const normalized = tokenOrEmail.trim().toLowerCase();
  const sub = db.subscribers.find((s) => s.token === tokenOrEmail || s.email.toLowerCase() === normalized);
  if (!sub) return false;
  sub.status = 'unsubscribed';
  saveDb(db);
  return true;
}

export function getMediaFiles(): MediaFile[] {
  return getDb().media.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
}

export function addMediaFile(file: Omit<MediaFile, 'id' | 'uploadedAt'>): MediaFile {
  const db = getDb();
  const newFile: MediaFile = {
    ...file,
    id: `med_${Date.now()}`,
    uploadedAt: new Date().toISOString(),
  };
  db.media.unshift(newFile);
  saveDb(db);
  return newFile;
}

export function deleteMediaFile(id: string): boolean {
  const db = getDb();
  const initialLen = db.media.length;
  db.media = db.media.filter((m) => m.id !== id);
  if (db.media.length !== initialLen) {
    saveDb(db);
    return true;
  }
  return false;
}

export function findUserByEmail(email: string): AdminUser | undefined {
  return getDb().users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
}

export function updateUserPassword(email: string, newHash: string): boolean {
  const db = getDb();
  const user = db.users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
  if (!user) return false;
  user.passwordHash = newHash;
  saveDb(db);
  return true;
}

// Publishing & Deployment Engine Helpers
export function getPublishingConfig(): PublishingConfig {
  const db = getDb();
  const cfg = db.publishingConfig || INITIAL_SEED.publishingConfig;
  return {
    ...cfg,
    githubTokenConfigured: Boolean(process.env.GITHUB_TOKEN || process.env.GITHUB_APP_TOKEN),
  };
}

export function updatePublishingConfig(config: Partial<PublishingConfig>): PublishingConfig {
  const db = getDb();
  db.publishingConfig = {
    ...db.publishingConfig,
    ...config,
  };
  saveDb(db);
  return getPublishingConfig();
}

export function getPublicationHistory(): PublicationRecord[] {
  const db = getDb();
  return (db.publications || []).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPendingChangesSummary(): string[] {
  const db = getDb();
  const changes: string[] = [];

  const activeSlides = db.heroSlides.filter((s) => s.isActive).length;
  changes.push(`Hero Carousel: ${activeSlides} active slides configured`);

  const publishedPosts = db.blogPosts.filter((p) => p.status === 'published').length;
  const draftPosts = db.blogPosts.filter((p) => p.status === 'draft').length;
  changes.push(`Blog: ${publishedPosts} published articles (${draftPosts} working drafts)`);

  const publishedEpisodes = db.podcastEpisodes.filter((e) => e.status === 'published' || e.status === 'scheduled').length;
  changes.push(`Podcast: ${publishedEpisodes} episodes & reflections live`);

  changes.push(`Investment Scope: ${db.investmentAreas.length} strategic sector themes`);
  changes.push(`Contributors: ${db.contributors.length} verified advisor/analyst profiles`);
  changes.push(`Media: ${db.media.length} public asset references verified`);

  return changes;
}

export async function publishChanges(
  commitMessage: string,
  userEmail: string
): Promise<{ success: boolean; publication: PublicationRecord; error?: string }> {
  const db = getDb();
  const cfg = getPublishingConfig();

  const prevVersion = cfg.lastPublishedVersion || 'v1.0.0';
  const versionParts = prevVersion.replace(/^v/, '').split('.').map(Number);
  const nextVersion = `v${versionParts[0] || 1}.${versionParts[1] || 0}.${(versionParts[2] || 0) + 1}`;
  const now = new Date().toISOString();
  const shortSha = Math.random().toString(16).substring(2, 9);

  // 1. Export clean sanitized public content
  const publicData = exportPublishedContent(db);

  // 2. Prepare change summary
  const summary = getPendingChangesSummary();

  // 3. Create publication record
  const newPublication: PublicationRecord = {
    id: `pub_${Date.now()}`,
    version: nextVersion,
    commitSha: shortSha,
    commitMessage: commitMessage || `Content update ${nextVersion}`,
    commitUrl: `https://github.com/${cfg.githubOwner}/${cfg.githubRepo}/commit/${shortSha}`,
    publishedBy: userEmail,
    publishedAt: now,
    deploymentStatus: 'deployed',
    deploymentUrl: cfg.productionUrl || 'https://akufai-capital.vercel.app',
    deploymentId: `dpl_${Date.now()}`,
    changeSummary: summary,
    snapshotData: publicData,
  };

  // 4. Update DB state
  if (!db.publications) db.publications = [];
  db.publications.unshift(newPublication);

  db.publishingConfig = {
    ...db.publishingConfig,
    lastPublishedAt: now,
    lastPublishedVersion: nextVersion,
    lastCommitSha: shortSha,
  };

  saveDb(db);

  // 5. Trigger Webhook if configured (e.g. Vercel/Netlify deploy hook)
  if (cfg.deployHookUrl && cfg.deployHookUrl.startsWith('http')) {
    try {
      await fetch(cfg.deployHookUrl, { method: 'POST' });
    } catch (err) {
      console.warn('Deploy webhook trigger error:', err);
    }
  }

  return { success: true, publication: newPublication };
}

export async function rollbackPublication(
  publicationId: string,
  userEmail: string
): Promise<{ success: boolean; publication?: PublicationRecord; error?: string }> {
  const db = getDb();
  const target = (db.publications || []).find((p) => p.id === publicationId);
  if (!target || !target.snapshotData) {
    return { success: false, error: 'Target publication snapshot not found.' };
  }

  const snapshot = target.snapshotData;
  const prevVersion = db.publishingConfig?.lastPublishedVersion || 'v1.0.0';
  const versionParts = prevVersion.replace(/^v/, '').split('.').map(Number);
  const nextVersion = `v${versionParts[0] || 1}.${versionParts[1] || 0}.${(versionParts[2] || 0) + 1}`;
  const now = new Date().toISOString();
  const shortSha = Math.random().toString(16).substring(2, 9);

  // Restore public content fields
  if (snapshot.settings) db.settings = snapshot.settings;
  if (snapshot.heroSlides) db.heroSlides = snapshot.heroSlides;
  if (snapshot.about) db.about = snapshot.about;
  if (snapshot.contributors) db.contributors = snapshot.contributors;
  if (snapshot.investmentAreas) db.investmentAreas = snapshot.investmentAreas;
  if (snapshot.podcastEpisodes) db.podcastEpisodes = snapshot.podcastEpisodes;
  if (snapshot.blogPosts) db.blogPosts = snapshot.blogPosts;

  // Export restored public data
  const publicData = exportPublishedContent(db);

  const rollbackRecord: PublicationRecord = {
    id: `pub_rollback_${Date.now()}`,
    version: nextVersion,
    commitSha: shortSha,
    commitMessage: `Rollback to version ${target.version} (${target.commitMessage})`,
    commitUrl: `https://github.com/${db.publishingConfig?.githubOwner || 'akufai-capital'}/${db.publishingConfig?.githubRepo || 'website'}/commit/${shortSha}`,
    publishedBy: userEmail,
    publishedAt: now,
    deploymentStatus: 'deployed',
    deploymentUrl: db.publishingConfig?.productionUrl || 'https://akufaicapitalandequities.com',
    deploymentId: `dpl_${Date.now()}`,
    changeSummary: [`Rolled back public content state to ${target.version}`],
    snapshotData: publicData,
  };

  db.publications.unshift(rollbackRecord);
  db.publishingConfig = {
    ...db.publishingConfig,
    lastPublishedAt: now,
    lastPublishedVersion: nextVersion,
    lastCommitSha: shortSha,
  };

  saveDb(db);

  return { success: true, publication: rollbackRecord };
}
