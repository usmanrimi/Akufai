import type { Metadata } from 'next';
import './globals.css';
import AppShell from '@/components/layout/AppShell';

export const metadata: Metadata = {
  metadataBase: new URL('https://akufaicapitalandequities.com'),
  title: {
    default: 'Akufai Capital & Equities | Founder-Led Private Investment Firm',
    template: '%s | Akufai Capital & Equities',
  },
  description:
    'Akufai Capital & Equities LLC is a private investment firm led by Dr. Ali Garba, taking a venture-leaning and long-term approach to opportunities across sectors, markets, and emerging themes.',
  keywords: [
    'Akufai Capital',
    'Dr. Ali Garba',
    'Private Investment',
    'Healthtech',
    'Artificial Intelligence',
    'Fintech',
    'African Markets',
    'Infrastructure',
    'Venture Capital',
    'Cross-border Ventures',
  ],
  authors: [{ name: 'Akufai Capital & Equities' }],
  creator: 'Akufai Capital & Equities',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Akufai Capital & Equities | Patient Capital & Long-Term Value',
    description:
      'A founder-led firm with a selective lens, built on disciplined judgment, patient capital, and cross-border perspective.',
    url: 'https://akufaicapitalandequities.com',
    siteName: 'Akufai Capital & Equities',
    images: [
      {
        url: '/images/hero_patient_capital.png',
        width: 1200,
        height: 630,
        alt: 'Akufai Capital & Equities',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Akufai Capital & Equities',
    description: 'A founder-led firm with a selective lens.',
    images: ['/images/hero_patient_capital.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-white text-slate-800 antialiased selection:bg-[#036c3e] selection:text-white">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
