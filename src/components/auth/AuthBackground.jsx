import React from 'react';
import './AuthBackground.css';

/**
 * AuthBackground — Local SVG/CSS topographic contour background for FoodBridge.
 *
 * Implements smooth undulating topographic contour lines and ambient illumination.
 * Fully local and self-contained: zero external scripts, zero third-party watermarks.
 * Supports light (warm cream + sage green) and dark (forest black + emerald) palettes.
 */
export function AuthBackground({ theme = 'light' }) {
  const isDark = theme === 'dark';

  return (
    <div
      className={`auth-bg-root${isDark ? ' auth-bg-root--dark' : ''}`}
      aria-hidden="true"
    >
      {/* Ambient gradient base */}
      <div className="auth-bg-gradient" />

      {/* Primary Topographic Contour Map Layer */}
      <div className="auth-topo-layer auth-topo-layer--primary">
        <svg
          className="auth-topo-svg"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <g className="auth-topo-group">
            {/* Elevation Level 1 - Outermost gentle contours */}
            <path
              className="auth-contour contour-lvl-1"
              d="M-80,120 C180,60 380,240 680,180 C980,120 1180,280 1520,200"
            />
            <path
              className="auth-contour contour-lvl-1"
              d="M-60,780 C220,720 420,860 740,790 C1060,720 1260,840 1540,760"
            />

            {/* Elevation Level 2 - Intermediate terrain flows */}
            <path
              className="auth-contour contour-lvl-2"
              d="M-100,220 C140,160 340,320 640,270 C940,220 1140,370 1560,300"
            />
            <path
              className="auth-contour contour-lvl-2"
              d="M-80,680 C180,600 390,730 700,670 C1010,610 1220,720 1550,650"
            />

            {/* Elevation Level 3 - Deep organic ripples */}
            <path
              className="auth-contour contour-lvl-3"
              d="M-120,320 C110,250 310,410 610,360 C910,310 1110,460 1580,390"
            />
            <path
              className="auth-contour contour-lvl-3"
              d="M-100,580 C150,500 360,620 670,560 C980,500 1190,610 1560,540"
            />

            {/* Elevation Level 4 - Core ridge lines */}
            <path
              className="auth-contour contour-lvl-4"
              d="M-140,410 C90,340 280,490 580,450 C880,410 1080,540 1600,480"
            />
            <path
              className="auth-contour contour-lvl-4"
              d="M-120,490 C120,420 330,530 640,480 C950,430 1160,520 1570,470"
            />

            {/* Topographic Elevation Rings - Top-Left Terrain Node */}
            <ellipse
              className="auth-contour contour-ring contour-ring-1"
              cx="180"
              cy="220"
              rx="240"
              ry="160"
              transform="rotate(-15 180 220)"
            />
            <ellipse
              className="auth-contour contour-ring contour-ring-2"
              cx="190"
              cy="215"
              rx="180"
              ry="115"
              transform="rotate(-15 190 215)"
            />
            <ellipse
              className="auth-contour contour-ring contour-ring-3"
              cx="200"
              cy="210"
              rx="120"
              ry="75"
              transform="rotate(-15 200 210)"
            />
            <ellipse
              className="auth-contour contour-ring contour-ring-4"
              cx="205"
              cy="208"
              rx="60"
              ry="38"
              transform="rotate(-15 205 208)"
            />

            {/* Topographic Elevation Rings - Bottom-Right Terrain Node */}
            <ellipse
              className="auth-contour contour-ring contour-ring-1"
              cx="1260"
              cy="680"
              rx="260"
              ry="170"
              transform="rotate(18 1260 680)"
            />
            <ellipse
              className="auth-contour contour-ring contour-ring-2"
              cx="1250"
              cy="685"
              rx="195"
              ry="125"
              transform="rotate(18 1250 685)"
            />
            <ellipse
              className="auth-contour contour-ring contour-ring-3"
              cx="1240"
              cy="690"
              rx="130"
              ry="80"
              transform="rotate(18 1240 690)"
            />
            <ellipse
              className="auth-contour contour-ring contour-ring-4"
              cx="1235"
              cy="692"
              rx="65"
              ry="40"
              transform="rotate(18 1235 692)"
            />

            {/* Subtle Cross-Contour Flow Lines */}
            <path
              className="auth-contour contour-subtle"
              d="M100,-50 C240,220 320,480 280,950"
            />
            <path
              className="auth-contour contour-subtle"
              d="M1340,-50 C1200,240 1140,510 1190,950"
            />
          </g>
        </svg>
      </div>

      {/* Secondary Organic Contour Layer (Counter-Drift) */}
      <div className="auth-topo-layer auth-topo-layer--secondary">
        <svg
          className="auth-topo-svg"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <g className="auth-topo-group-secondary">
            <path
              className="auth-contour contour-lvl-2"
              d="M-50,300 C280,240 520,380 820,320 C1120,260 1320,420 1520,360"
            />
            <path
              className="auth-contour contour-lvl-3"
              d="M-70,620 C240,540 480,680 780,610 C1080,540 1280,660 1500,590"
            />
          </g>
        </svg>
      </div>

      {/* Soft Ambient Illumination Wash */}
      <div className="auth-bg-glow" />
      <div className="auth-bg-glow-secondary" />
    </div>
  );
}

export default AuthBackground;
