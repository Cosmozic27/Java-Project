import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HeroSection } from './HeroSection';

const FoodBridgeScene = lazy(() => import('./FoodBridgeScene'));

const CHAPTERS = [
  {
    id: 'donors',
    eyebrow: '01 / AT THE SOURCE',
    title: <>Good food should<br />never go to waste.</>,
    description: 'Every day, perfectly usable food becomes surplus.',
    tone: 'warm',
  },
  {
    id: 'food-surplus',
    eyebrow: '02 / SURPLUS, REIMAGINED',
    title: <>Turn surplus into<br />something useful.</>,
    description: 'A prepared meal can become someone’s next good day.',
    tone: 'amber',
  },
  {
    id: 'how-it-works',
    eyebrow: '03 / THE FOODBRIDGE NETWORK',
    title: <>Connect the people<br />who have food with<br />those who can share it.</>,
    description: 'One trusted network brings local donors and community partners together.',
    tone: 'green',
  },
  {
    id: 'pickup',
    eyebrow: '04 / A CLEAR WAY FORWARD',
    title: <>Collect.<br />Connect. Deliver.</>,
    description: 'Coordinated pickups move good food where it can do the most good.',
    tone: 'road',
  },
  {
    id: 'ngos',
    eyebrow: '05 / THE COMMUNITY HUB',
    title: <>From surplus<br />to community.</>,
    description: 'Local organizations receive food and share it with the people they serve.',
    tone: 'community',
  },
  {
    id: 'impact',
    eyebrow: '06 / ONE CONNECTED SYSTEM',
    title: <>Turn surplus food<br />into <em>impact.</em></>,
    description: 'A simple connection can change where good food goes next.',
    tone: 'impact',
    final: true,
  },
];

const PROGRESS_STOPS = [
  { label: 'SURPLUS', progress: 0.08 },
  { label: 'CONNECT', progress: 0.34 },
  { label: 'PICKUP', progress: 0.54 },
  { label: 'COMMUNITY', progress: 0.74 },
  { label: 'IMPACT', progress: 0.94 },
];

function sceneIndexForProgress(progress) {
  return Math.max(0, Math.min(CHAPTERS.length - 1, Math.floor(progress * CHAPTERS.length)));
}

export function FoodBridgeJourney() {
  const experienceRef = useRef(null);
  const stageRef = useRef(null);
  const progressRef = useRef(0);
  const reducedMotion = useReducedMotion();
  const [activeChapter, setActiveChapter] = useState(0);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 760);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const element = experienceRef.current;
        if (!element) return;
        const rect = element.getBoundingClientRect();
        const scrollRange = Math.max(1, rect.height - window.innerHeight);
        const nextProgress = Math.max(0, Math.min(1, -rect.top / scrollRange));
        progressRef.current = nextProgress;
        stageRef.current?.style.setProperty('--journey-progress', `${nextProgress}`);
        const nextChapter = sceneIndexForProgress(nextProgress);
        setActiveChapter((current) => current === nextChapter ? current : nextChapter);
        setIsMobile((current) => {
          const next = window.innerWidth <= 760;
          return current === next ? current : next;
        });
      });
    };

    measure();
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, []);

  const moveToProgress = (progress) => {
    const element = experienceRef.current;
    if (!element) return;
    const top = window.scrollY + element.getBoundingClientRect().top;
    const range = Math.max(0, element.offsetHeight - window.innerHeight);
    window.scrollTo({ top: top + range * progress, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <section
      ref={experienceRef}
      className="fb-cinematic-experience"
      aria-label="A scroll-driven journey through the FoodBridge network"
      data-chapter={CHAPTERS[activeChapter].tone}
    >
      <div ref={stageRef} className="fb-cinematic-stage">
        <div className="fb-cinematic-backdrop" aria-hidden="true" />
        <div className="fb-cinematic-canvas" aria-label="A continuous 3D FoodBridge neighborhood journey">
          <Suspense fallback={<div className="fb-cinematic-loading" aria-hidden="true"><span /><span /><span /></div>}>
            <FoodBridgeScene progressRef={progressRef} reducedMotion={Boolean(reducedMotion)} isMobile={isMobile} />
          </Suspense>
        </div>

        <div className="fb-cinematic-shade" aria-hidden="true" />
        <HeroSection chapter={CHAPTERS[activeChapter]} reducedMotion={Boolean(reducedMotion)} />

        <div className="fb-journey-instruction" aria-hidden="true">
          <span className="fb-scroll-line" /><span>SCROLL TO TRAVEL</span><ArrowDown size={13} />
        </div>

        <nav className="fb-progress-nav" aria-label="FoodBridge journey chapters">
          {PROGRESS_STOPS.map((stop, index) => {
            const selected = Math.min(PROGRESS_STOPS.length - 1, Math.floor(activeChapter * PROGRESS_STOPS.length / CHAPTERS.length));
            const active = index === selected;
            return (
              <button
                key={stop.label}
                type="button"
                className={`fb-progress-stop${active ? ' is-active' : ''}`}
                aria-label={`Go to ${stop.label.toLowerCase()} chapter`}
                aria-current={active ? 'step' : undefined}
                onClick={() => moveToProgress(stop.progress)}
              >
                <span className="fb-progress-dot" aria-hidden="true" />
                <span className="fb-progress-label"><small>0{index + 1}</small>{stop.label}</span>
              </button>
            );
          })}
          <span className="fb-progress-rail" aria-hidden="true" />
          <span className="fb-progress-fill" aria-hidden="true" />
        </nav>

        {activeChapter === 0 && (
          <Link className="fb-opening-skip" to="/#how-it-works" aria-label="Skip to the FoodBridge connection chapter">
            <span>THE STORY</span><ArrowRight size={14} />
          </Link>
        )}
      </div>
      {CHAPTERS.map((chapter, index) => (
        <span
          key={chapter.id}
          id={chapter.id}
          className="fb-journey-anchor"
          style={{ top: `${index * 120}svh` }}
          aria-hidden="true"
        />
      ))}
      <span id="audiences" className="fb-journey-anchor" style={{ top: '0svh' }} aria-hidden="true" />
      <span id="safety" className="fb-journey-anchor" style={{ top: '480svh' }} aria-hidden="true" />
      <div className="fb-cinematic-scroll-space" aria-hidden="true" />
    </section>
  );
}

export default FoodBridgeJourney;
