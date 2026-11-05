'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  // Lightweight scroll-reveal observer for subtle fade-in & slide-up animations across all pages
  useEffect(() => {
    if (isAdmin || typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const selectors = [
      'main section > div',
      'main .gold-card-surface',
      'main .gold-glow-card',
      'main article',
    ];

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(selectors.join(', '))
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.setAttribute('data-scroll-reveal', 'visible');
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -32px 0px',
      }
    );

    elements.forEach((el, idx) => {
      // Do not hide elements already well within the initial viewport fold
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.88) {
        el.setAttribute('data-scroll-reveal', 'visible');
      } else {
        el.style.transitionDelay = `${(idx % 3) * 70}ms`;
        el.setAttribute('data-scroll-reveal', 'pending');
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [pathname, isAdmin]);

  // If in admin workspace or authentication, completely omit public header & footer
  if (isAdmin) {
    return <>{children}</>;
  }

  // Public website layout
  return (
    <>
      <Header />
      <main className="flex-grow page-fade-enter">{children}</main>
      <Footer />
    </>
  );
}
