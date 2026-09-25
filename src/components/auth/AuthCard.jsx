import React from 'react';
import { cn } from '@/utils/cn';

export function AuthCard({ title, description, children, footer, className = '' }) {
  const titleId = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-title`;

  return (
    <section
      aria-labelledby={titleId}
      className={cn(
        'rounded-2xl border border-border bg-surface p-6 shadow-xs sm:p-8',
        className
      )}
    >
      <div className="space-y-1 text-left">
        <h1 id={titleId} className="text-lg font-bold text-text-primary sm:text-xl">
          {title}
        </h1>
        {description && (
          <p className="text-xs leading-relaxed text-text-secondary sm:text-sm">{description}</p>
        )}
      </div>

      <div className="mt-5">{children}</div>

      {footer && (
        <div className="mt-5 border-t border-border/70 pt-4 text-center text-xs text-text-secondary">
          {footer}
        </div>
      )}
    </section>
  );
}

export default AuthCard;
