import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useScrollReveal';

export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer || reducedMotion) return undefined;

    document.body.classList.add('has-custom-cursor');
    let pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let ring = { ...pointer };
    let active = null;
    let frame;

    const move = (event) => {
      pointer = { x: event.clientX, y: event.clientY };
      const target = event.target.closest?.('a, button, [role="button"], [data-cursor]');
      active = target?.dataset.cursor || (target ? 'interactive' : null);
    };
    const down = () => document.body.classList.add('cursor-click');
    const up = () => document.body.classList.remove('cursor-click');

    const render = () => {
      ring.x += (pointer.x - ring.x) * 0.16;
      ring.y += (pointer.y - ring.y) * 0.16;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0)`;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
        ringRef.current.dataset.state = active || 'default';
      }
      frame = requestAnimationFrame(render);
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', down, { passive: true });
    window.addEventListener('pointerup', up, { passive: true });
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.body.classList.remove('has-custom-cursor', 'cursor-click');
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <>
      <span ref={dotRef} className="fb-cursor-dot" aria-hidden="true" />
      <span ref={ringRef} className="fb-cursor-ring" aria-hidden="true" data-state="default" />
    </>
  );
}

export default CustomCursor;
