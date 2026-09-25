import React from 'react';
import { cn } from '@/utils/cn';

export function PageSection({
  title,
  description,
  action,
  children,
  divider = false,
  className = '',
  headerClassName = '',
}) {
  return (
    <section className={cn('space-y-4', divider && 'pb-8 border-b border-border/80', className)}>
      {(title || description || action) && (
        <div className={cn('flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5', headerClassName)}>
          <div className="space-y-0.5">
            {title && (
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-text-primary">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {action && <div className="shrink-0 flex items-center gap-2">{action}</div>}
        </div>
      )}

      {children}
    </section>
  );
}

export default PageSection;
