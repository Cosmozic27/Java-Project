import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FoodBridgeJourney } from '@/components/landing/FoodBridgeJourney';
import '@/components/landing/landing.css';

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
    <div className="fb-landing fb-cinematic-page">
      <FoodBridgeJourney />
    </div>
  );
}

export default LandingPage;
