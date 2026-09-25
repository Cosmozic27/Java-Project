import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function Reveal({ children, className = '', delay = 0, y = 18, scale = 0.985, as = 'div' }) {
  const { ref, isVisible, reducedMotion } = useScrollReveal();
  const Component = as === 'section' ? motion.section : motion.div;

  return (
    <Component
      ref={ref}
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y, scale }}
      animate={isVisible || reducedMotion ? { opacity: 1, y: 0, scale: 1 } : undefined}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}

export function RevealGroup({ children, className = '', delay = 0, stagger = 0.08 }) {
  const { ref, isVisible, reducedMotion } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reducedMotion ? false : 'hidden'}
      animate={isVisible || reducedMotion ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { delayChildren: delay, staggerChildren: stagger } },
      }}
    >
      {React.Children.map(children, (child) => (
        <motion.div
          variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
