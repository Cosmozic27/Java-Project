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

export function LandingPage() {
  const location = useLocation();

  useEffect(() => {
    const targetId = location.hash.replace(/^#/, '');
    if (!targetId) return undefined;

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.hash]);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <HeroSection />

      {/* How FoodBridge Works Section */}
      <HowItWorksSection />

      {/* Illustrative Platform Impact Section */}
      <ImpactSection />

      {/* Audience Section: For Donors & For NGOs */}
      <AudienceSection />

      {/* Trust & Food Safety Section */}
      <SafetySection />

      {/* Ready to Make a Difference Final CTA */}
      <FinalCTASection />
    </div>
  );
}

export default LandingPage;
