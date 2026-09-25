import React from 'react';
import { Inbox } from 'lucide-react';
import { cn } from '@/utils/cn';

export function EmptyState({
  icon: Icon = Inbox,
  title = 'No items found',
  description = 'There are no records matching your current filter criteria.',
  action,
  secondaryAction,
  className = '',
  compact = false,
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center rounded-2xl border border-dashed border-border bg-surface/50 transition-colors',
        compact ? 'p-6 sm:p-8' : 'p-8 sm:p-12',
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-muted border border-border text-text-secondary shadow-2xs mb-4">
        {React.isValidElement(Icon) ? (
          Icon
        ) : (
          <Icon className="h-6 w-6 stroke-[1.75]" aria-hidden="true" />
        )}
      </div>

      <h3 className="text-base font-bold text-text-primary tracking-tight">
        {title}
      </h3>

      {description && (
        <p className="mt-1.5 text-xs sm:text-sm text-text-secondary max-w-sm leading-relaxed">
          {description}
        </p>
      )}

      {(action || secondaryAction) && (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
          {action}
          {secondaryAction}
        </div>
      )}
    </div>
  );
}

export default EmptyState;
