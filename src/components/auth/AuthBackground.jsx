import React, { useEffect, useState } from 'react';
import './AuthBackground.css';

/**
 * AuthBackground — AIDesigner Topo Lines integration for FoodBridge Auth pages.
 *
 * Implements the official AIDesigner `topo-lines` effect:
 * <div data-aifx="topo-lines" className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true" />
 *
 * Placed within a `relative isolate` container to preserve layering behind the forms.
 * Dynamically adjusts color parameters for FoodBridge light and dark modes,
 * and honors `prefers-reduced-motion` settings.
 */
export function AuthBackground({ theme = 'light' }) {
  const isDark = theme === 'dark';
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const listener = (e) => setPrefersReducedMotion(e.matches);
    media.addEventListener?.('change', listener);
    return () => media.removeEventListener?.('change', listener);
  }, []);

  // Request runtime rescan when mounted or when theme / reduced motion changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.AIFX?.rescan) {
      window.AIFX.rescan();
    }
    const onRuntimeReady = () => {
      if (typeof window !== 'undefined' && window.AIFX?.rescan) {
        window.AIFX.rescan();
      }
    };
    window.addEventListener('aifx:runtime-ready', onRuntimeReady);
    return () => window.removeEventListener('aifx:runtime-ready', onRuntimeReady);
  }, [theme, prefersReducedMotion]);

  // FoodBridge tailored color tokens for Topo Lines
  const palette = isDark
    ? {
        bg: '#030A05',
        colors: '#07140A,#0B2010,#103D20,#087A28',
        ink: '#087A28,#16D928',
        bgAlpha: '1',
        speed: prefersReducedMotion ? '0' : '0.28',
        density: '24',
        lineWeight: '1.2',
        mouse: '0.6',
      }
    : {
        bg: '#FFFDF3',
        colors: '#F1F7EE,#DFEBE0,#CDE0CE,#B8D4BB',
        ink: '#4A7C52,#275333',
        bgAlpha: '1',
        speed: prefersReducedMotion ? '0' : '0.28',
        density: '24',
        lineWeight: '1.2',
        mouse: '0.6',
      };

  return (
    <div
      className="auth-background-container relative isolate absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Exact requested AIDesigner Topo Lines container with FoodBridge theme tokens */}
      <div
        data-aifx="topo-lines"
        data-aifx-bg={palette.bg}
        data-aifx-colors={palette.colors}
        data-aifx-ink={palette.ink}
        data-aifx-bg-alpha={palette.bgAlpha}
        data-aifx-speed={palette.speed}
        data-aifx-density={palette.density}
        data-aifx-line-weight={palette.lineWeight}
        data-aifx-mouse={palette.mouse}
        className="absolute inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}

export default AuthBackground;
