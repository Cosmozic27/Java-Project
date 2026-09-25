import React from 'react';
import {
  HeroSection,
  HowItWorksSection,
  ImpactSection,
  AudienceSection,
  SafetySection,
  FinalCTASection,
} from '@/components/landing';

export function LandingPage() {
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
