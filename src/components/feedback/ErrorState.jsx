import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { cn } from '@/utils/cn';

export function ErrorState({
  title = 'Something went wrong',
  description = 'An error occurred while loading this section. Please try again or contact support if the issue persists.',
  onRetry,
  retryLabel = 'Try Again',
  isRetrying = false,
  variant = 'card', // 'card' | 'banner'
  className = '',
}) {
  if (variant === 'banner') {
    return (
      <div
        role="alert"
        className={cn(
          'flex items-center justify-between gap-3 p-4 rounded-xl border border-red-200 bg-red-50 text-red-800 text-xs sm:text-sm',
          className
        )}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <AlertTriangle className="h-4 w-4 text-danger shrink-0" aria-hidden="true" />
          <div className="truncate">
            <span className="font-semibold">{title}</span>
            {description && <span className="ml-1.5 opacity-90">{description}</span>}
          </div>
        </div>

        {onRetry && (
          <Button
            variant="danger"
            size="sm"
            onClick={onRetry}
            isLoading={isRetrying}
            leftIcon={<RotateCcw className="h-3.5 w-3.5" />}
          >
            {retryLabel}
          </Button>
        )}
      </div>
    );
  }

  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-center justify-center text-center rounded-2xl border border-red-200/80 bg-red-50/40 p-8 sm:p-12 transition-colors',
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-danger shadow-2xs mb-4">
        <AlertTriangle className="h-6 w-6 stroke-[1.75]" aria-hidden="true" />
      </div>

      <h3 className="text-base font-bold text-text-primary tracking-tight">
        {title}
      </h3>

      {description && (
        <p className="mt-1.5 text-xs sm:text-sm text-text-secondary max-w-md leading-relaxed">
          {description}
        </p>
      )}

      {onRetry && (
        <div className="mt-5">
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            isLoading={isRetrying}
            leftIcon={<RotateCcw className="h-3.5 w-3.5" />}
          >
            {retryLabel}
          </Button>
        </div>
      )}
    </div>
  );
}

export default ErrorState;
