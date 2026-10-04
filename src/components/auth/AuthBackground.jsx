import React from 'react';
import './AuthBackground.css';

/**
 * AuthBackground — lightweight CSS-animated background for Login & Register.
 *
 * Replaces Three.js/WebGL PixelSnow with GPU-friendly CSS animations:
 * - Animated gradient wash
 * - Soft floating blob orbs
 * - Pulsing green/accent nodes (representing FoodBridge ecosystem nodes)
 * - Subtle connector lines
 *
 * Zero JavaScript animation loops. Zero canvas/WebGL.
 * Respects prefers-reduced-motion automatically via CSS.
 */
export function AuthBackground() {
  return (
    <div className="auth-bg-root" aria-hidden="true">
      {/* Animated gradient layer */}
      <div className="auth-bg-gradient" />

      {/* Floating soft orbs */}
      <div className="auth-bg-orbs">
        <div className="auth-bg-orb auth-bg-orb-1" />
        <div className="auth-bg-orb auth-bg-orb-2" />
        <div className="auth-bg-orb auth-bg-orb-3" />
        <div className="auth-bg-orb auth-bg-orb-4" />
      </div>

      {/* Ecosystem nodes — Restaurant → Surplus → NGO → Pickup */}
      <div className="auth-bg-nodes">
        <div className="auth-bg-node" title="Donor" />
        <div className="auth-bg-node" />
        <div className="auth-bg-node" title="Surplus Food" />
        <div className="auth-bg-node" />
        <div className="auth-bg-node" title="NGO" />
        <div className="auth-bg-node" title="Pickup" />
        <div className="auth-bg-node" />
        <div className="auth-bg-node" />
      </div>
    </div>
  );
}

export default AuthBackground;
