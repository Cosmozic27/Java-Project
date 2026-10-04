import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { HeroSection } from '@/components/landing/HeroSection';
import { AudienceSection } from '@/components/landing/AudienceSection';
import { SafetySection } from '@/components/landing/SafetySection';
import { FinalCTASection } from '@/components/landing/FinalCTASection';
import '@/components/landing/landing.css';

const HowItWorksSection = lazy(() => import('@/components/landing/HowItWorksSection'));
const ImpactSection = lazy(() => import('@/components/landing/ImpactSection'));

function DeferredLandingSection({ id, Section, reserveHeight }) {
  const sectionRef = useRef(null);
  const [isNearViewport, setIsNearViewport] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    if (isNearViewport || !sectionRef.current) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        setIsNearViewport(true);
      }
    }, { rootMargin: '520px 0px', threshold: 0 });

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isNearViewport]);

  return (
    <div
      ref={sectionRef}
      id={isNearViewport ? undefined : id}
      className="fb-deferred-section"
      style={!isNearViewport ? { minHeight: reserveHeight } : undefined}
    >
      {isNearViewport ? (
        <Suspense fallback={<div className="fb-deferred-loading" aria-hidden="true" style={{ minHeight: reserveHeight }} />}>
          <Section anchorInWrapper />
        </Suspense>
      ) : (
        <div className="fb-deferred-placeholder" aria-hidden="true" style={{ minHeight: reserveHeight }} />
      )}
    </div>
  );
}

export function LandingPage() {
  const location = useLocation();

  useEffect(() => {
    const targetId = location.hash.replace(/^#/, '');
    if (!targetId) return undefined;

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.hash]);

  return (
    <div className="fb-landing flex flex-col w-full">
      <HeroSection />
      <DeferredLandingSection id="how-it-works" Section={HowItWorksSection} reserveHeight="clamp(620px, 82vh, 1040px)" />
      <DeferredLandingSection id="impact" Section={ImpactSection} reserveHeight="clamp(500px, 68vh, 820px)" />
      <AudienceSection />
      <SafetySection />
      <FinalCTASection />
    </div>
  );
}

export default LandingPage;
