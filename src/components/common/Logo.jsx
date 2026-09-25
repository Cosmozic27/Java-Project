import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';

const sizes = {
  sm: {
    icon: 'h-6 w-6',
    text: 'text-base font-bold',
    tag: 'text-[9px] px-1.5 py-0.2',
  },
  md: {
    icon: 'h-8 w-8',
    text: 'text-lg sm:text-xl font-bold',
    tag: 'text-[10px] px-1.5 py-0.5',
  },
  lg: {
    icon: 'h-10 w-10',
    text: 'text-2xl font-extrabold',
    tag: 'text-xs px-2 py-0.5',
  },
};

export function Logo({
  size = 'md',
  showTagline = false,
  to = '/',
  className = '',
  iconOnly = false,
}) {
  const currentSize = sizes[size] || sizes.md;

  const content = (
    <div className={cn('inline-flex items-center gap-2.5 select-none group', className)}>
      {/* Brand Icon SVG: Leaf + Bridge arch */}
      <div
        className={cn(
          'relative flex items-center justify-center rounded-xl bg-primary text-white shadow-xs transition-transform duration-200 group-hover:scale-105',
          currentSize.icon
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-3/5 h-3/5 text-white"
        >
          {/* Bridge arch */}
          <path d="M3 18c3-4 6-6 9-6s6 2 9 6" />
          <path d="M3 20h18" />
          {/* Leaf / sprout above bridge */}
          <path
            d="M12 4c2.5 0 4.5 2 4.5 4.5S14.5 12 12 12s-4.5-1-4.5-3.5S9.5 4 12 4z"
            fill="currentColor"
            fillOpacity="0.25"
          />
          <path d="M12 4v8" />
        </svg>
      </div>

      {!iconOnly && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className={cn('tracking-tight text-text-primary', currentSize.text)}>
              Food<span className="text-primary font-bold">Bridge</span>
            </span>
          </div>
          {showTagline && (
            <span className="text-[11px] font-medium text-text-secondary mt-0.5">
              Zero Waste • Surplus Food Network
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
}

export default Logo;
