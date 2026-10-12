import React, { useEffect, useState } from 'react';
import { useStartupReveal } from './useStartupReveal';
import './InitialLoader.css';

function getTheme() {
  return typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
    ? 'dark'
    : 'light';
}

export function InitialLoader() {
  const { phase, retry } = useStartupReveal();
  const [theme, setTheme] = useState(getTheme);

  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(getTheme()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  if (phase === 'complete' || phase === 'hero-revealing') return null;

  const isError = phase === 'error';
  const isExiting = phase === 'revealing';

  return (
    <div
      className={`fb-initial-loader fb-initial-loader--${theme} ${isExiting ? 'is-exiting' : ''} ${isError ? 'is-error' : ''}`}
      role={isError ? 'alert' : 'status'}
      aria-live="polite"
      aria-busy={!isError}
    >
      <div className="fb-initial-loader__glow" aria-hidden="true" />
      <div className="fb-initial-loader__content">
        <div className="fb-initial-loader__brand" aria-label="FoodBridge">
          <span className="fb-initial-loader__mark" aria-hidden="true">
            <svg viewBox="0 0 48 48" role="presentation">
              <path d="M9 28c7-11 16-16 30-16-2 12-8 22-20 26-5 1-9-2-10-10Z" />
              <path d="M10 37c6-10 14-16 25-20" />
              <path d="M28 12c4 2 8 5 11 9" />
            </svg>
          </span>
          <span>FoodBridge</span>
        </div>

        <div className="fb-initial-loader__visual" aria-hidden="true">
          <svg viewBox="0 0 360 132" preserveAspectRatio="none">
            <defs>
              <linearGradient id="fb-loader-path" x1="0" x2="1">
                <stop offset="0" stopColor="currentColor" stopOpacity="0.12" />
                <stop offset="0.5" stopColor="currentColor" stopOpacity="0.8" />
                <stop offset="1" stopColor="currentColor" stopOpacity="0.16" />
              </linearGradient>
            </defs>
            <path className="fb-initial-loader__route" d="M12 96 C72 18 118 18 180 66 S286 116 348 34" />
            <path className="fb-initial-loader__route fb-initial-loader__route--secondary" d="M12 34 C72 112 126 108 180 66 S286 18 348 96" />
            <circle className="fb-initial-loader__hub" cx="180" cy="66" r="7" />
            <circle className="fb-initial-loader__particle fb-initial-loader__particle--one" cx="12" cy="96" r="4" />
            <circle className="fb-initial-loader__particle fb-initial-loader__particle--two" cx="348" cy="34" r="4" />
            <circle className="fb-initial-loader__particle fb-initial-loader__particle--three" cx="12" cy="34" r="4" />
            <circle className="fb-initial-loader__particle fb-initial-loader__particle--four" cx="348" cy="96" r="4" />
          </svg>
        </div>

        <p className="fb-initial-loader__tagline">Connecting surplus to those in need.</p>
        {isError ? (
          <div className="fb-initial-loader__error">
            <p>We’re taking a little longer than expected.</p>
            <button type="button" onClick={retry}>Try again</button>
          </div>
        ) : (
          <p className="fb-initial-loader__status">Preparing your experience</p>
        )}
        <div className="fb-initial-loader__progress" aria-hidden="true">
          <span />
        </div>
      </div>
    </div>
  );
}

export default InitialLoader;
