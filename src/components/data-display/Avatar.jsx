import React, { useState } from 'react';
import { cn } from '@/utils/cn';

const sizeMap = {
  xs: { box: 'h-6 w-6 text-[10px]', dot: 'h-1.5 w-1.5 ring-1' },
  sm: { box: 'h-8 w-8 text-xs', dot: 'h-2 w-2 ring-1.5' },
  md: { box: 'h-10 w-10 text-sm', dot: 'h-2.5 w-2.5 ring-2' },
  lg: { box: 'h-12 w-12 text-base', dot: 'h-3 w-3 ring-2' },
  xl: { box: 'h-16 w-16 text-xl', dot: 'h-3.5 w-3.5 ring-2' },
};

function getInitials(name) {
  if (!name) return 'FB';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Avatar({
  src,
  alt = 'Avatar',
  name,
  fallback,
  size = 'md',
  status, // 'online' | 'offline' | 'busy' | 'verified'
  className = '',
}) {
  const [imageError, setImageError] = useState(false);
  const currentSize = sizeMap[size] || sizeMap.md;

  const initials = fallback || getInitials(name || alt);

  const statusColors = {
    online: 'bg-primary',
    offline: 'bg-slate-400',
    busy: 'bg-warning',
    verified: 'bg-info',
  };

  return (
    <div className={cn('relative inline-flex shrink-0 select-none', className)}>
      <div
        className={cn(
          'relative flex items-center justify-center rounded-full overflow-hidden border border-border/80 bg-surface-muted font-semibold text-text-primary transition-colors',
          currentSize.box
        )}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            onError={() => setImageError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="tracking-tight text-text-secondary">
            {initials}
          </span>
        )}
      </div>

      {status && statusColors[status] && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full ring-surface',
            statusColors[status],
            currentSize.dot
          )}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
}

export default Avatar;
