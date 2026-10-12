
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, HeartHandshake, Leaf, MapPin } from 'lucide-react';

import {
  HowItWorksSection,
  ImpactSection,
  AudienceSection,
  SafetySection,
  FinalCTASection,
} from '@/components/landing';
import { BlurText, MoltenMetal } from '@/components/effects';
import { useStartupReveal } from '@/components/common';

import '@/components/landing/landing.css';

function usePublicTheme() {
  const [theme, setTheme] = useState(() =>
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light'
  );

  useEffect(() => {
    const root = document.documentElement;
    const syncTheme = () => setTheme(root.classList.contains('dark') ? 'dark' : 'light');
    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    syncTheme();
    return () => observer.disconnect();
  }, []);

  return theme;
}

function LandingHero() {
  const theme = usePublicTheme();
  const { phase, isHeroRevealing } = useStartupReveal();

  return (
    <section className="fb-hero-section relative overflow-hidden bg-background text-text-primary" data-startup-reveal={phase}>
      <MoltenMetal
        theme={theme}
        speed={0.22}
        scale={4}
        detail={3}
        glow={1.25}
        brightness={1.05}
        opacity={0.65}
        grain
        grainIntensity={0.025}
        mouseInteraction
        mouseStrength={0.15}
      />

      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-40"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 75% 30%, rgba(34,197,94,0.15), transparent 48%), radial-gradient(ellipse at 10% 90%, rgba(22,101,52,0.10), transparent 45%)',
        }}
      />

      <div className="relative z-10 mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:px-12 lg:py-28">
        <div className="fb-hero-reveal-item fb-hero-reveal-item--copy max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            <Leaf size={16} />
            Less waste. More good.
          </div>

          <h1 className="text-5xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            <BlurText
              as="span"
              text="Connecting surplus food to"
              animateBy="words"
              direction="top"
              delay={0}
              stepDuration={0.55}
              stagger={0.12}
              active={isHeroRevealing}
            />{' '}
            <span className="text-primary">
              <BlurText
                as="span"
                text="communities in need."
                animateBy="words"
                direction="top"
                delay={520}
                stepDuration={0.55}
                stagger={0.12}
                active={isHeroRevealing}
              />
            </span>
          </h1>

          <div className="fb-hero-supporting">
            <p className="mt-7 max-w-xl text-base leading-8 text-text-secondary sm:text-lg">
              FoodBridge connects food donors with community organizations,
              helping good food reach the people who need it instead of going
              to waste.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/auth/register"
               className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white shadow-lg shadow-primary/15 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Donate Surplus Food
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/auth/login"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-6 py-3 font-semibold text-text-primary transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/10 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Find Food
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-text-secondary">
              <span className="inline-flex items-center gap-2">
                <HeartHandshake size={17} className="text-primary" />
                Community-focused
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin size={17} className="text-primary" />
                Local connections
              </span>
              <span className="inline-flex items-center gap-2">
                <Leaf size={17} className="text-primary" />
                Less food waste
              </span>
            </div>
          </div>
        </div>

        <div className="fb-hero-reveal-item fb-hero-reveal-item--network relative mx-auto w-full max-w-lg">
          <div
            className="absolute -inset-5 rounded-[2rem] bg-primary/10 blur-2xl"
            aria-hidden="true"
          />

          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-6 shadow-2xl shadow-black/5 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  The FoodBridge Network
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  From surplus to shared.
                </h2>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <HeartHandshake size={25} />
              </div>
            </div>

            <p className="mt-3 text-sm leading-6 text-text-secondary">
              A simple connection between those with extra food and
              organizations ready to redistribute it.
            </p>

            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-4 rounded-2xl border border-border p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Leaf size={22} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">Food donors</p>
                  <p className="mt-1 text-sm text-text-secondary">
                    Restaurants, hostels and canteens
                  </p>
                </div>
                <span className="text-xs font-medium text-primary">01</span>
              </div>

              <div className="flex justify-center" aria-hidden="true">
                <div className="h-7 border-l-2 border-dashed border-primary/40" />
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <HeartHandshake size={22} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">FoodBridge</p>
                  <p className="mt-1 text-sm text-text-secondary">
                    Discover, coordinate and arrange pickups
                  </p>
                </div>
                <span className="text-xs font-medium text-primary">02</span>
              </div>

              <div className="flex justify-center" aria-hidden="true">
                <div className="h-7 border-l-2 border-dashed border-primary/40" />
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-border p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin size={22} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">Community organizations</p>
                  <p className="mt-1 text-sm text-text-secondary">
                    Coordinate collection and distribution
                  </p>
                </div>
                <span className="text-xs font-medium text-primary">03</span>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-primary/5 px-4 py-3 text-center text-sm text-text-secondary">
              Every connection can make a difference.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
    <div className="fb-landing">
      <LandingHero />
      <HowItWorksSection />
      <ImpactSection />
      <AudienceSection />
      <SafetySection />
      <FinalCTASection />
    </div>
  );
}

export default LandingPage;
