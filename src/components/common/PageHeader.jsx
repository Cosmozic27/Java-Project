import React from 'react';
import { cn } from '@/utils/cn';

export function PageHeader({
  title,
  description,
  badge,
  actions,
  breadcrumbs,
  className = '',
  divider = false,
  children,
}) {
  return (
    <header
      className={cn(
        'flex flex-col gap-4 pb-6 animate-in fade-in slide-in-from-bottom-2 duration-500',
        divider && 'border-b border-border mb-6',
        className
      )}
    >
      {breadcrumbs && <nav className="text-xs text-text-muted">{breadcrumbs}</nav>}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1.5 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              {title}
            </h1>
            {badge && <div>{badge}</div>}
          </div>
          {description && (
            <p className="text-sm text-text-secondary max-w-3xl leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            {actions}
          </div>
        )}
      </div>

      {children && <div className="mt-2">{children}</div>}
    </header>
  );
}

export default PageHeader;
