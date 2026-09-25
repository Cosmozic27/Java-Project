import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';

/**
 * Single skeleton pulse primitive
 */
export function Skeleton({ className = '', ...props }) {
  return (
    <div
      className={cn('animate-pulse rounded-lg bg-slate-200/80', className)}
      {...props}
    />
  );
}

/**
 * Card skeleton layout
 */
function CardSkeleton({ count = 1 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="rounded-xl border border-border bg-surface p-5 space-y-4 shadow-2xs"
        >
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-24 rounded-md" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
          <div className="pt-3 border-t border-border/60 flex items-center justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-24 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Table rows skeleton layout
 */
function TableSkeleton({ rows = 4, cols = 4 }) {
  return (
    <div className="w-full rounded-xl border border-border bg-surface overflow-hidden shadow-2xs">
      <div className="border-b border-border bg-surface-muted/60 p-4 flex gap-4">
        {Array.from({ length: cols }).map((_, c) => (
          <Skeleton key={c} className="h-4 flex-1" />
        ))}
      </div>
      <div className="divide-y divide-border/60">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="p-4 flex gap-4 items-center">
            {Array.from({ length: cols }).map((_, c) => (
              <Skeleton key={c} className="h-4 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Main LoadingState component
 */
export function LoadingState({
  variant = 'card', // 'card' | 'table' | 'skeleton' | 'spinner'
  count = 3,
  rows = 4,
  cols = 4,
  message = 'Loading data...',
  className = '',
}) {
  if (variant === 'spinner') {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center p-8 sm:p-12 text-center',
          className
        )}
      >
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-3" aria-hidden="true" />
        <p className="text-xs sm:text-sm font-medium text-text-secondary">{message}</p>
      </div>
    );
  }

  if (variant === 'table') {
    return (
      <div className={className}>
        <TableSkeleton rows={rows} cols={cols} />
      </div>
    );
  }

  if (variant === 'skeleton') {
    return (
      <div className={cn('space-y-3 w-full', className)}>
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
    );
  }

  return (
    <div className={className}>
      <CardSkeleton count={count} />
    </div>
  );
}

export default LoadingState;
