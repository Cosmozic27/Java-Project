import React, { useEffect, useMemo, useRef } from 'react';
import { motion, useAnimationControls, useInView } from 'motion/react';

function splitText(text, animateBy) {
  if (animateBy === 'words') {
    return String(text).split(/(\s+)/).map((part, index) => ({
      value: part,
      key: `word-${index}`,
      isWhitespace: /^\s+$/.test(part),
    }));
  }

  return Array.from(String(text)).map((character, index) => ({
    value: character,
    key: `char-${index}`,
    isWhitespace: /\s/.test(character),
  }));
}

function BlurTextPart({ value, axis, offset, active, isInView, delay, index, stepDuration, stagger }) {
  const controls = useAnimationControls();

  useEffect(() => {
    if (!active || !isInView) return undefined;

    controls.start({
      opacity: 1,
      filter: 'blur(0px)',
      [axis]: 0,
      transition: {
        duration: stepDuration,
        delay: delay / 1000 + index * stagger,
        ease: [0.22, 1, 0.36, 1],
      },
    });

    return undefined;
  }, [active, axis, controls, delay, index, isInView, offset, stagger, stepDuration]);

  return (
    <motion.span
      aria-hidden="true"
      className="fb-blur-text__part"
      initial={{ opacity: 0, filter: 'blur(4px)', [axis]: offset }}
      animate={controls}
    >
      {value}
    </motion.span>
  );
}

export function BlurText({
  text,
  delay = 120,
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  stepDuration = 0.3,
  stagger = 0.065,
  onAnimationComplete,
  as = 'span',
  className = '',
  active = true,
}) {
  const ref = useRef(null);
  const controls = useAnimationControls();
  const isInView = useInView(ref, {
    once: true,
    amount: threshold,
    margin: rootMargin,
  });

  const parts = useMemo(() => splitText(text, animateBy), [text, animateBy]);
  const MotionTag = motion[as] || motion.span;
  const offset = direction === 'bottom' ? 18 : direction === 'left' ? 18 : direction === 'right' ? -18 : -18;
  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';

  useEffect(() => {
    if (!active || !isInView) return undefined;

    controls.start({
      opacity: 1,
      filter: 'blur(0px)',
      [axis]: 0,
      transition: {
        duration: stepDuration,
        delay: delay / 1000,
        ease: [0.22, 1, 0.36, 1],
      },
    }).then(() => onAnimationComplete?.());

    return undefined;
  }, [active, axis, controls, delay, isInView, onAnimationComplete, stepDuration]);

  return (
    <MotionTag
      ref={ref}
      className={`fb-blur-text ${className}`.trim()}
      aria-label={text}
      initial={{ opacity: 0, filter: 'blur(6px)', [axis]: offset }}
      animate={controls}
    >
      {parts.map(({ value, key, isWhitespace }, index) =>
        isWhitespace ? (
          value
        ) : (
          <BlurTextPart
            key={key}
            value={value}
            axis={axis}
            offset={offset}
            active={active}
            isInView={isInView}
            delay={delay}
            index={index}
            stepDuration={stepDuration}
            stagger={stagger}
          />
        )
      )}
    </MotionTag>
  );
}

export default BlurText;
