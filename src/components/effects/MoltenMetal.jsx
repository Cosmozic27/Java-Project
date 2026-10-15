import React, { useEffect, useRef } from 'react';
import { Mesh, Program, Renderer, Triangle, Vec2 } from 'ogl';
import './MoltenMetal.css';

const PALETTES = {
  light: ['#123D2A', '#43865B', '#DDE9C8'],
  dark: ['#07150E', '#1C6A3A', '#B8D99A'],
};

const vertex = `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragment = `
  precision mediump float;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uScale;
  uniform float uDetail;
  uniform float uGlow;
  uniform float uBrightness;
  uniform float uOpacity;
  uniform float uGrain;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  varying vec2 vUv;

  const mat2 ROTATION = mat2(0.83646, -0.54802, 0.54802, 0.83646);

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i), hash21(i + vec2(1.0, 0.0)), f.x), mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0; float amplitude = 0.5;
    for (int i = 0; i < 3; i++) {
      value += amplitude * noise(p);
      p = ROTATION * p * 2.02 + 3.1;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / min(uResolution.x, uResolution.y);
    vec2 mouse = (uMouse - 0.5) * 0.22;
    float time = uTime * uSpeed;
    vec2 flow = uv * uScale + mouse;
    flow += vec2(sin(time * 0.31), cos(time * 0.23)) * 0.55;
    float field = fbm(flow + vec2(time * 0.09, -time * 0.07));
    float ribbons = sin((flow.x + field * 1.8) * 2.3 + sin(flow.y * 1.7 + time) * 1.8);
    float liquid = smoothstep(-0.45, 0.85, ribbons + field * 1.35);
    float highlight = smoothstep(0.52, 0.88, field + liquid * 0.32);
    float edge = smoothstep(0.18, 0.72, abs(ribbons) * 0.55 + field * 0.5);
    vec3 color = mix(uColor1, uColor2, smoothstep(0.22, 0.68, field));
    color = mix(color, uColor3, highlight * 0.68);
    color *= uBrightness + highlight * uGlow * 0.2;
    color += edge * uColor2 * 0.08;
    if (uGrain > 0.0) {
      color += (hash21(gl_FragCoord.xy + uTime) - 0.5) * uGrain;
    }
    float vignette = smoothstep(1.45, 0.15, length(uv * vec2(0.82, 0.72)));
    gl_FragColor = vec4(color * vignette, uOpacity);
  }
`;

function hexToRgb(hex) {
  const value = hex.replace('#', '');
  return [0, 2, 4].map((offset) => parseInt(value.slice(offset, offset + 2), 16) / 255);
}

export function MoltenMetal({
  theme = 'light',
  speed = 0.22,
  scale = 4,
  detail = 3,
  glow = 1.25,
  brightness = 1.05,
  opacity = 0.65,
  grain = true,
  grainIntensity = 0.025,
  mouseInteraction = true,
  mouseStrength = 0.15,
  className = '',
}) {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const lowPower = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false;
    const dprCap = coarsePointer ? 0.65 : lowPower ? 0.72 : 0.85;
    const targetFrameMs = coarsePointer || lowPower ? 33.3 : 0;
    const probe = document.createElement('canvas');
    const canUseWebgl2 = Boolean(probe.getContext('webgl2'));
    probe.remove();
    if (!canUseWebgl2) {
      host.classList.add('is-fallback');
      return undefined;
    }

    host.classList.remove('is-fallback');
    const canvas = document.createElement('canvas');
    const renderer = new Renderer({ alpha: true, antialias: false, dpr: Math.min(window.devicePixelRatio || 1, dprCap), canvas });
    const gl = renderer.gl;
    host.appendChild(canvas);

    const geometry = new Triangle(gl);
    const palette = PALETTES[theme] || PALETTES.light;
    const uniforms = {
      uTime: { value: 0 },
      uSpeed: { value: reducedMotion.matches ? 0 : speed },
      uScale: { value: scale },
      uDetail: { value: detail },
      uGlow: { value: glow },
      uBrightness: { value: brightness },
      uOpacity: { value: opacity },
      uGrain: { value: grain ? grainIntensity * (lowPower || coarsePointer ? 0 : 0.6) : 0 },
      uResolution: { value: new Vec2(1, 1) },
      uMouse: { value: new Vec2(0.5, 0.5) },
      uColor1: { value: hexToRgb(palette[0]) },
      uColor2: { value: hexToRgb(palette[1]) },
      uColor3: { value: hexToRgb(palette[2]) },
    };
    const program = new Program(gl, { vertex, fragment, uniforms, transparent: true, depthTest: false, depthWrite: false });
    const mesh = new Mesh(gl, { geometry, program });
    const mouse = new Vec2(0.5, 0.5);
    let bounds = { left: 0, top: 0, width: 1, height: 1 };
    let frame = 0;
    let visible = true;
    let pageVisible = !document.hidden;
    let lastTime = 0;
    let lastRenderTime = 0;

    const resize = () => {
      const rect = host.getBoundingClientRect();
      bounds = { left: rect.left, top: rect.top, width: Math.max(1, rect.width), height: Math.max(1, rect.height) };
      renderer.setSize(bounds.width, bounds.height);
      uniforms.uResolution.value.set(bounds.width, bounds.height);
    };
    const render = (time) => {
      frame = 0;
      if (!visible || !pageVisible) return;
      if (targetFrameMs && lastRenderTime && time - lastRenderTime < targetFrameMs) {
        frame = requestAnimationFrame(render);
        return;
      }
      const delta = Math.min(32, time - lastTime || 16);
      lastTime = time;
      lastRenderTime = time;
      uniforms.uTime.value += delta * 0.001;
      uniforms.uMouse.value.lerp(mouse, Math.min(1, delta * 0.006 * mouseStrength * 10));
      renderer.render({ scene: mesh });
      if (!reducedMotion.matches) frame = requestAnimationFrame(render);
    };
    const start = () => {
      if (!reducedMotion.matches && frame === 0 && visible && pageVisible) frame = requestAnimationFrame(render);
      if (reducedMotion.matches) renderer.render({ scene: mesh });
    };
    const onPointerMove = (event) => {
      if (!mouseInteraction) return;
      mouse.set(
        (event.clientX - bounds.left) / bounds.width,
        1 - (event.clientY - bounds.top) / bounds.height,
      );
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    }, { threshold: 0.01 });
    const onVisibility = () => {
      pageVisible = !document.hidden;
      if (pageVisible) start();
      else if (frame) cancelAnimationFrame(frame);
    };
    const onMotionChange = () => {
      uniforms.uSpeed.value = reducedMotion.matches ? 0 : speed;
      if (reducedMotion.matches && frame) cancelAnimationFrame(frame);
      start();
    };

    resize();
    observer.observe(host);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    reducedMotion.addEventListener?.('change', onMotionChange);
    start();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibility);
      reducedMotion.removeEventListener?.('change', onMotionChange);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      canvas.remove();
    };
  }, [brightness, detail, glow, grain, grainIntensity, mouseInteraction, mouseStrength, opacity, scale, speed, theme]);

  return <div ref={hostRef} className={`fb-molten-metal ${className}`.trim()} aria-hidden="true" />;
}

export default MoltenMetal;
