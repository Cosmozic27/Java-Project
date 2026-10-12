import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StartupRevealContext } from './startupRevealStore';

const MIN_DISPLAY_MS = 2500;
const EXIT_DURATION_MS = 620;
const HERO_REVEAL_DELAY_MS = 300;
const STARTUP_TIMEOUT_MS = 5000;

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function waitForInitialView() {
  return new Promise((resolve, reject) => {
    let settled = false;
    const finish = (callback) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      callback();
    };
    const timeout = window.setTimeout(() => finish(resolve), STARTUP_TIMEOUT_MS);
    const fontsReady = document.fonts?.ready || Promise.resolve();

    fontsReady
      .then(() => {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => finish(resolve));
        });
      })
      .catch((error) => finish(() => reject(error)));
  });
}

export function StartupRevealProvider({ children }) {
  const [phase, setPhase] = useState('loading');
  const [attempt, setAttempt] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion);
  const startedAt = useRef(0);

  const retry = useCallback(() => {
    startedAt.current = typeof performance !== 'undefined' ? performance.now() : Date.now();
    setPhase('loading');
    setAttempt((value) => value + 1);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncReducedMotion = () => setReducedMotion(mediaQuery.matches);
    syncReducedMotion();
    mediaQuery.addEventListener?.('change', syncReducedMotion);
    return () => mediaQuery.removeEventListener?.('change', syncReducedMotion);
  }, []);

  useEffect(() => {
    let active = true;
    let revealTimer;
    let finishTimer;
    let heroRevealTimer;
    startedAt.current = typeof performance !== 'undefined' ? performance.now() : Date.now();

    waitForInitialView()
      .then(() => {
        if (!active) return;
        const minDuration = reducedMotion ? 0 : MIN_DISPLAY_MS;
        const elapsed = (typeof performance !== 'undefined' ? performance.now() : Date.now()) - startedAt.current;
        const remaining = Math.max(0, minDuration - elapsed);

        revealTimer = window.setTimeout(() => {
          if (!active) return;
          setPhase('revealing');
          finishTimer = window.setTimeout(() => {
            if (!active) return;
            setPhase('complete');
            heroRevealTimer = window.setTimeout(() => {
              if (active) setPhase('hero-revealing');
            }, reducedMotion ? 0 : HERO_REVEAL_DELAY_MS);
          }, reducedMotion ? 0 : EXIT_DURATION_MS);
        }, remaining);
      })
      .catch(() => {
        if (active) setPhase('error');
      });

    return () => {
      active = false;
      window.clearTimeout(revealTimer);
      window.clearTimeout(finishTimer);
      window.clearTimeout(heroRevealTimer);
    };
  }, [attempt, reducedMotion]);

  const value = useMemo(() => ({
    phase,
    retry,
    reducedMotion,
    isHeroRevealing: phase === 'hero-revealing',
  }), [phase, reducedMotion, retry]);

  return <StartupRevealContext.Provider value={value}>{children}</StartupRevealContext.Provider>;
}
