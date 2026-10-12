import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  HeroSection,
  HowItWorksSection,
  ImpactSection,
  AudienceSection,
  SafetySection,
  FinalCTASection,
} from '@/components/landing';
import '@/components/landing/landing.css';

export function LandingPage() {
  const location = useLocation();

  useEffect(() => {
    const targetId = location.hash.replace(/^#/, '');
    if (!targetId) return undefined;

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth',
        block: 'start',
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.hash]);

  return (
    <div className="flex w-full flex-col">
      <HeroSection />
      <HowItWorksSection />
      <ImpactSection />
      <AudienceSection />
      <SafetySection />
      <FinalCTASection />
    </div>
  );
}

export default LandingPage;
