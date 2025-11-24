'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { analytics } from '@/lib/analytics';

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view on route change
    analytics.trackPageView(pathname || '/');
  }, [pathname]);

  useEffect(() => {
    // Track scroll depth
    let scrollDepthTracked = {
      25: false,
      50: false,
      75: false,
      100: false,
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;

      if (scrollPercent >= 25 && !scrollDepthTracked[25]) {
        analytics.trackScrollDepth(25);
        scrollDepthTracked[25] = true;
      }
      if (scrollPercent >= 50 && !scrollDepthTracked[50]) {
        analytics.trackScrollDepth(50);
        scrollDepthTracked[50] = true;
      }
      if (scrollPercent >= 75 && !scrollDepthTracked[75]) {
        analytics.trackScrollDepth(75);
        scrollDepthTracked[75] = true;
      }
      if (scrollPercent >= 100 && !scrollDepthTracked[100]) {
        analytics.trackScrollDepth(100);
        scrollDepthTracked[100] = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <>{children}</>;
}

