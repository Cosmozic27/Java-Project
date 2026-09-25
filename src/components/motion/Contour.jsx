import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useScrollReveal';
import './Contour.css';

const DEFAULT_COLORS = ['rgba(22, 138, 69, 0.16)', 'rgba(134, 169, 106, 0.14)', 'rgba(18, 55, 42, 0.08)'];

function drawContours(context, width, height, time, colors, reducedMotion) {
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  context.setTransform(dpr, 0, 0, dpr, 0, 0);
  context.clearRect(0, 0, width, height);
  context.lineWidth = reducedMotion ? 0.8 : 1;

  const lineCount = width < 640 ? 8 : 12;
  const step = height / (lineCount + 1);
  const phase = reducedMotion ? 0 : time * 0.00018;

  for (let line = 0; line < lineCount; line += 1) {
    context.beginPath();
    context.strokeStyle = colors[line % colors.length];

    for (let x = -24; x <= width + 24; x += 12) {
      const normalizedX = x / Math.max(width, 1);
      const wave = Math.sin(normalizedX * 7.2 + phase + line * 0.46) * 13;
      const secondary = Math.sin(normalizedX * 15 - phase * 0.65 + line * 0.22) * 4;
      const y = step * (line + 1) + wave + secondary;
      if (x === -24) context.moveTo(x, y);
      else context.lineTo(x, y);
    }

    context.stroke();
  }
}

export default function Contour({ className = '', colors = DEFAULT_COLORS }) {
  const canvasRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const context = canvas.getContext('2d');
    if (!context) return undefined;

    let width = 1;
    let height = 1;
    let frame = 0;
    let isVisible = true;
    let pageVisible = !document.hidden;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect?.width || window.innerWidth));
      height = Math.max(1, Math.floor(rect?.height || window.innerHeight));
      const dpr = Math.min(window.devicePixelRatio || 1, width < 640 ? 1 : 1.5);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      drawContours(context, width, height, 0, colors, reducedMotion);
    };

    const render = (time) => {
      drawContours(context, width, height, time, colors, reducedMotion);
      frame = requestAnimationFrame(render);
    };
    const start = () => {
      if (!reducedMotion && isVisible && pageVisible && frame === 0) frame = requestAnimationFrame(render);
    };
    const stop = () => {
      if (frame !== 0) cancelAnimationFrame(frame);
      frame = 0;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas.parentElement || canvas);
    const intersection = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) start();
      else stop();
    });
    intersection.observe(canvas);
    const onVisibility = () => {
      pageVisible = !document.hidden;
      if (pageVisible) start();
      else stop();
    };

    document.addEventListener('visibilitychange', onVisibility);
    resize();
    start();

    return () => {
      stop();
      observer.disconnect();
      intersection.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [colors, reducedMotion]);

  return <div className={`contour-container ${className}`.trim()} aria-hidden="true"><canvas ref={canvasRef} /></div>;
}
