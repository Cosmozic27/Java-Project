import React, { useEffect, useRef, useState } from 'react';
import './AuthBackground.css';

/**
 * Procedural WebGL Topo Lines Shader Implementation
 *
 * Implements the continuous multi-octave FBM topographic height field,
 * domain warping, screen-space antialiased contour lines, periodic index
 * contours (every 5th line), hypsometric elevation tinting, and soft relief.
 *
 * 100% self-contained & local: zero third-party runtime, zero network requests, zero watermarks.
 */

const VERTEX_SHADER_SRC = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SRC = `
precision highp float;
varying vec2 v_uv;
uniform vec2 u_res;
uniform float u_time;
uniform float u_speed;
uniform float u_density;
uniform float u_scale;
uniform float u_warp;
uniform float u_lineW;
uniform float u_idxEvery;
uniform float u_idxWeight;
uniform float u_tint;
uniform float u_relief;
uniform float u_paper;
uniform float u_bgalpha;
uniform float u_colorCount;
uniform vec2 u_mouse;
uniform float u_mouseAct;
uniform float u_mouseStr;
uniform vec3 u_bg;
uniform vec3 u_ink0;
uniform vec3 u_ink1;
uniform vec3 u_c0;
uniform vec3 u_c1;
uniform vec3 u_c2;
uniform vec3 u_c3;
uniform vec3 u_c4;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm2(vec2 p, float t) {
  float v = 0.0;
  float a = 0.56;
  mat2 m = mat2(0.80, 0.60, -0.60, 0.80);
  vec2 sh = vec2(t * 0.11, t * 0.07);
  for (int i = 0; i < 2; i++) {
    v += a * noise(p + sh);
    p = m * p * 2.02 + vec2(7.3, 3.1);
    sh = m * sh * 1.35;
    a *= 0.52;
  }
  return v * 1.18;
}

float fbm3(vec2 p, float t) {
  float v = 0.0;
  float a = 0.54;
  mat2 m = mat2(0.80, 0.60, -0.60, 0.80);
  vec2 sh = vec2(t * 0.10, t * 0.06);
  for (int i = 0; i < 3; i++) {
    v += a * noise(p + sh);
    p = m * p * 2.02 + vec2(7.3, 3.1);
    sh = m * sh * 1.35;
    a *= 0.52;
  }
  return v * 1.04;
}

float fbm4(vec2 p, float t) {
  float v = 0.0;
  float a = 0.52;
  mat2 m = mat2(0.80, 0.60, -0.60, 0.80);
  vec2 sh = vec2(t * 0.085, t * 0.055);
  for (int i = 0; i < 4; i++) {
    v += a * noise(p + sh);
    p = m * p * 2.03 + vec2(7.3, 3.1);
    sh = m * sh * 1.35;
    a *= 0.52;
  }
  return v * 1.02;
}

float terrain(vec2 p, float t) {
  p = mat2(1.02, 0.20, -0.14, 0.92) * p;
  float base = fbm3(p * 0.5, t * 0.7);
  base = (base - 0.5) * 1.7 + 0.5;
  float hi = smoothstep(0.35, 0.85, base);
  float d = fbm4(p * 1.75 + vec2(13.7, 5.2), t);
  return base + (d - 0.50) * (0.30 + 0.50 * hi);
}

float height(vec2 uv, vec2 wOff, float t, float mAmp, float mR2) {
  float h = terrain(uv * u_scale + wOff, t);
  vec2 mr = uv - u_mouse;
  h += mAmp * exp(-dot(mr, mr) / mR2);
  return h;
}

vec3 pick(float k) {
  if (k < 0.5) return u_c0;
  if (k < 1.5) return u_c1;
  if (k < 2.5) return u_c2;
  if (k < 3.5) return u_c3;
  return u_c4;
}

vec3 ramp(float x) {
  float f = clamp(x, 0.0, 1.0) * (u_colorCount - 1.0);
  float fr = fract(f);
  fr = fr * fr * (3.0 - 2.0 * fr);
  vec3 a = pick(floor(f));
  vec3 b = pick(min(floor(f) + 1.0, u_colorCount - 1.0));
  return sqrt(mix(a * a, b * b, fr));
}

void main() {
  float aspect = u_res.x / max(u_res.y, 1.0);
  vec2 uv = vec2(v_uv.x * aspect, v_uv.y);
  float t = u_time * u_speed;
  float e = 1.0 / max(u_res.y, 1.0);

  float mAct = u_mouseStr * u_mouseAct;
  float mAmp = mAct * 7.5 / max(u_density, 4.0);
  float mR = 0.085 + 0.050 * mAct;
  float mR2 = mR * mR;

  vec2 q = vec2(
    fbm2(uv * 0.8 + vec2(2.3, 9.1), t * 0.55),
    fbm2(uv * 0.8 + vec2(8.7, 3.9), t * 0.50)
  );
  vec2 wOff = (q - 0.5) * u_warp;

  float h0 = height(uv, wOff, t, mAmp, mR2);
  float hx = height(uv + vec2(e, 0.0), wOff, t, mAmp, mR2);
  float hy = height(uv + vec2(0.0, e), wOff, t, mAmp, mR2);
  vec2 slope = vec2(hx - h0, hy - h0) / e;

  float N = u_density;
  float H = h0 * N;
  float gradPx = length(vec2(hx - h0, hy - h0)) * N;
  float spacing = 1.0 / max(gradPx, 1e-4);
  float dInt = 0.5 - abs(fract(H) - 0.5);
  float dPx = dInt / max(gradPx, 1e-4);

  float ie = max(u_idxEvery, 2.0);
  float idx = floor(H + 0.5);
  float hasIdx = (u_idxEvery > 1.5) ? 1.0 : 0.0;
  float isIdx = hasIdx * (1.0 - step(0.5, mod(idx, ie)));

  float aa = 0.65;
  float halfW = u_lineW * mix(0.50, 0.50 + 0.62 * u_idxWeight, isIdx);
  float line = 1.0 - smoothstep(halfW - aa, halfW + aa, dPx);
  line *= smoothstep(2.1, 4.6, spacing);
  float inkA = line * mix(0.55, 1.0, isIdx);

  vec2 mrel = uv - u_mouse;
  inkA = min(inkA * (1.0 + 0.30 * mAct * exp(-dot(mrel, mrel) / (mR2 * 5.0))), 1.0);

  float bandN = mix(1.0, ie, hasIdx);
  float Hi = H / bandN;
  float fi = fract(Hi);
  float stepAA = clamp(fi * bandN / max(gradPx * 1.5, 1e-4), 0.0, 1.0);
  float lev = clamp(((floor(Hi) + stepAA) * bandN / N + 0.18) * 0.78, 0.0, 1.0);
  vec3 fill = mix(u_bg, ramp(lev), u_tint);

  float shade = dot(slope, vec2(-0.51, 0.86));
  fill *= 1.0 + u_relief * clamp(shade * 0.13, -0.20, 0.24);

  float mot = noise(gl_FragCoord.xy * 0.055) * 0.65 + noise(gl_FragCoord.xy * 0.21 + 7.3) * 0.35;
  fill *= 1.0 + u_paper * (mot - 0.5) * 0.075;
  fill += u_paper * (hash(gl_FragCoord.xy) - 0.5) * 0.024;

  float vig = smoothstep(0.42, 0.85, length((v_uv - 0.5) * vec2(1.15, 1.0)));
  fill *= 1.0 - 0.05 * vig;

  vec3 inkCol = mix(u_ink0, u_ink1, isIdx);
  vec3 col = mix(fill, inkCol, inkA);

  col += (hash(gl_FragCoord.xy + fract(t * 3.7) * vec2(31.7, 17.3)) - 0.5) * 0.007;
  col = clamp(col, 0.0, 1.0);

  float alpha = max(u_bgalpha, clamp(inkA + u_tint * 0.4 * smoothstep(0.05, 0.6, lev), 0.0, 1.0));
  gl_FragColor = vec4(col, alpha);
}
`;

function hexToRgb(hex) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map((x) => x + x).join('');
  const num = parseInt(c, 16);
  return [(num >> 16 & 255) / 255, (num >> 8 & 255) / 255, (num & 255) / 255];
}

export function AuthBackground({ theme = 'light' }) {
  const isDark = theme === 'dark';
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const themeRef = useRef(isDark);
  const applyPaletteRef = useRef(null);
  const [externalRuntimeReady, setExternalRuntimeReady] = useState(() =>
    typeof window !== 'undefined' && Boolean(window.AIFX?.register)
  );
  const [webglSupported] = useState(() => {
    if (typeof window === 'undefined') return true;
    try {
      const c = document.createElement('canvas');
      return Boolean(c.getContext('webgl2') || c.getContext('webgl') || c.getContext('experimental-webgl'));
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const handleRuntimeReady = () => setExternalRuntimeReady(true);
    window.addEventListener('aifx:runtime-ready', handleRuntimeReady);

    return () => window.removeEventListener('aifx:runtime-ready', handleRuntimeReady);
  }, []);

  useEffect(() => {
    themeRef.current = isDark;
    applyPaletteRef.current?.();
  }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (externalRuntimeReady || !canvas || !container) return undefined;

    let gl = null;
    try {
      gl =
        canvas.getContext('webgl2', { alpha: true, antialias: false, premultipliedAlpha: false }) ||
        canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: false }) ||
        canvas.getContext('experimental-webgl');
    } catch (e) {
      console.warn('[FoodBridge Topo] getContext exception:', e);
    }

    if (!gl) {
      console.warn('[FoodBridge Topo] WebGL context unavailable');
      return;
    }

    function createShader(type, src) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn('[FoodBridge Topo] Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
    const fs = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);
    if (!vs || !fs) {
      return;
    }

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('[FoodBridge Topo] Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Full screen quad buffer
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(program, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Uniform cache
    const uniforms = {};
    function getUniform(name) {
      if (!uniforms[name]) {
        uniforms[name] = gl.getUniformLocation(program, name);
      }
      return uniforms[name];
    }

    function set1f(name, v) {
      const loc = getUniform(name);
      if (loc) gl.uniform1f(loc, v);
    }
    function set2f(name, x, y) {
      const loc = getUniform(name);
      if (loc) gl.uniform2f(loc, x, y);
    }
    function set3f(name, r, g, b) {
      const loc = getUniform(name);
      if (loc) gl.uniform3f(loc, r, g, b);
    }

    // Configure theme-based palettes
    function applyThemePalette() {
      if (themeRef.current) {
        // Dark theme: Near-black base (#050705) with restrained fluorescent-green contours (#39FF14)
        const bg = hexToRgb('#050705');
        const ink0 = hexToRgb('#16A34A'); // Subtle emerald regular contours
        const ink1 = hexToRgb('#39FF14'); // Restrained fluorescent green index contours
        const rampColors = [
          hexToRgb('#050705'),
          hexToRgb('#070E07'),
          hexToRgb('#0B170B'),
          hexToRgb('#102211'),
          hexToRgb('#162F18'),
        ];

        set3f('u_bg', bg[0], bg[1], bg[2]);
        set3f('u_ink0', ink0[0], ink0[1], ink0[2]);
        set3f('u_ink1', ink1[0], ink1[1], ink1[2]);
        set1f('u_colorCount', rampColors.length);
        ['u_c0', 'u_c1', 'u_c2', 'u_c3', 'u_c4'].forEach((name, i) => {
          const c = rampColors[i];
          set3f(name, c[0], c[1], c[2]);
        });
        set1f('u_tint', 0.25);
        set1f('u_relief', 0.22);
        set1f('u_paper', 0.10);
      } else {
        // Light theme: Warm cream base (#FFFDF3) with subtle sage/forest-green contours (#4A7C52 / #275333)
        const bg = hexToRgb('#FFFDF3');
        const ink0 = hexToRgb('#4A7C52'); // Subtle sage green lines
        const ink1 = hexToRgb('#275333'); // Prominent forest-green index contours
        const rampColors = [
          hexToRgb('#FFFDF3'),
          hexToRgb('#F1F7EE'),
          hexToRgb('#DFEBE0'),
          hexToRgb('#CDE0CE'),
          hexToRgb('#B8D4BB'),
        ];

        set3f('u_bg', bg[0], bg[1], bg[2]);
        set3f('u_ink0', ink0[0], ink0[1], ink0[2]);
        set3f('u_ink1', ink1[0], ink1[1], ink1[2]);
        set1f('u_colorCount', rampColors.length);
        ['u_c0', 'u_c1', 'u_c2', 'u_c3', 'u_c4'].forEach((name, i) => {
          const c = rampColors[i];
          set3f(name, c[0], c[1], c[2]);
        });
        set1f('u_tint', 0.38);
        set1f('u_relief', 0.32);
        set1f('u_paper', 0.22);
      }

      set1f('u_density', 24.0);
      set1f('u_lineW', 1.25);
      set1f('u_idxEvery', 5.0);
      set1f('u_idxWeight', 1.15);
      set1f('u_speed', 0.32); // Fluid organic motion
      set1f('u_scale', 1.35);
      set1f('u_warp', 0.58);
      set1f('u_bgalpha', 1.0);
      set1f('u_mouseStr', 0.65);
    }

    applyPaletteRef.current = applyThemePalette;
    applyThemePalette();

    const prefersReducedMotion =
      typeof matchMedia === 'function' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const parentW = container.clientWidth || window.innerWidth || 1280;
      const parentH = container.clientHeight || window.innerHeight || 800;
      const w = Math.max(1, Math.round(parentW * dpr));
      const h = Math.max(1, Math.round(parentH * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
        set2f('u_res', w, h);
      }
    }
    resize();

    let mouseX = 0.5;
    let mouseY = 0.5;
    let smoothMouseX = 0.5;
    let smoothMouseY = 0.5;
    let mouseActivity = 0.0;
    let lastMouseMove = -1e9;

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return;
      mouseX = (e.clientX - rect.left) / rect.width;
      mouseY = (e.clientY - rect.top) / rect.height;
      lastMouseMove = performance.now();
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    let animationFrameId = null;
    let isVisible = true;
    const startTime = performance.now();

    function renderFrame(now) {
      if (!isVisible) return;
      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(renderFrame);
      }

      const elapsedSec = (now - startTime) / 1000;
      smoothMouseX += (mouseX - smoothMouseX) * 0.06;
      smoothMouseY += (mouseY - smoothMouseY) * 0.06;

      const isRecent = now - lastMouseMove < 2500 ? 1.0 : 0.0;
      mouseActivity += (isRecent - mouseActivity) * 0.04;

      const aspect = (container.clientWidth || window.innerWidth || 1) / Math.max(container.clientHeight || window.innerHeight || 1, 1);
      set2f('u_mouse', smoothMouseX * aspect, 1.0 - smoothMouseY);
      set1f('u_mouseAct', mouseActivity);
      set1f('u_time', prefersReducedMotion ? 0.0 : elapsedSec);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    const observer =
      typeof IntersectionObserver === 'function'
        ? new IntersectionObserver((entries) => {
            const intersecting = entries.some((e) => e.isIntersecting);
            if (intersecting && !isVisible) {
              isVisible = true;
              if (!prefersReducedMotion) {
                animationFrameId = requestAnimationFrame(renderFrame);
              } else {
                renderFrame(performance.now());
              }
            } else if (!intersecting && isVisible) {
              isVisible = false;
              if (animationFrameId) cancelAnimationFrame(animationFrameId);
            }
          })
        : null;

    if (observer) observer.observe(container);

    const resizeObserver =
      typeof ResizeObserver === 'function'
        ? new ResizeObserver(() => {
            resize();
            if (prefersReducedMotion) renderFrame(performance.now());
          })
        : null;

    if (resizeObserver) resizeObserver.observe(container);

    renderFrame(performance.now());

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      if (observer) observer.disconnect();
      if (resizeObserver) resizeObserver.disconnect();
      applyPaletteRef.current = null;
    };
  }, [externalRuntimeReady]);

  return (
    <div
      ref={containerRef}
      className={`auth-bg-root relative isolate pointer-events-none inset-0 absolute overflow-hidden${
        isDark ? ' auth-bg-root--dark' : ''
      }`}
      aria-hidden="true"
    >
      {/* AIDesigner effect integration hook */}
      <div
        data-aifx="topo-lines"
        data-aifx-bg={isDark ? '#050705' : '#FFFDF3'}
        data-aifx-colors={isDark ? '#070E07,#0B170B,#102211,#162F18' : '#F1F7EE,#DFEBE0,#CDE0CE,#B8D4BB'}
        data-aifx-ink={isDark ? '#16A34A,#39FF14' : '#4A7C52,#275333'}
        data-aifx-bg-alpha="1"
        data-aifx-speed="0.32"
        data-aifx-density="24"
        data-aifx-line-weight="1.25"
        data-aifx-mouse="0.65"
        className="absolute inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
      />

      {/* WebGL Procedural Topographic Canvas */}
      {!externalRuntimeReady && webglSupported ? (
        <canvas
          ref={canvasRef}
          className="auth-topo-canvas absolute inset-0 w-full h-full block pointer-events-none"
        />
      ) : (
        /* Genuine nested irregular SVG fallback */
        <div className="auth-topo-layer auth-topo-layer--primary">
          <svg
            className="auth-topo-svg"
            viewBox="0 0 1440 900"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <g className="auth-topo-group">
              <path
                className="auth-contour contour-lvl-1"
                d="M-50,80 C120,40 280,180 500,140 C750,90 920,240 1200,160 C1350,120 1450,180 1550,150"
              />
              <path
                className="auth-contour contour-lvl-2"
                d="M-70,180 C100,130 250,260 480,210 C720,160 890,310 1160,230 C1320,190 1420,250 1550,220"
              />
              <path
                className="auth-contour contour-lvl-3"
                d="M-90,280 C80,220 220,350 450,290 C690,230 860,390 1120,310 C1290,260 1400,320 1550,290"
              />
              <path
                className="auth-contour contour-lvl-4"
                d="M-110,380 C60,310 190,440 420,370 C660,300 830,470 1080,390 C1260,340 1380,400 1550,370"
              />
            </g>
          </svg>
        </div>
      )}
    </div>
  );
}

export default AuthBackground;
