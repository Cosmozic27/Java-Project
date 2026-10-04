import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';

/**
 * Format route path segment into human readable title
 */
function formatSegment(str) {
  if (!str) return '';
  if (str.toLowerCase() === 'ngo') return 'NGO';
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function Breadcrumbs({
  items,
  className = '',
}) {
  const location = useLocation();

  // If items are not passed manually, auto-generate from current location pathname
  const breadcrumbItems = items || (() => {
    const segments = location.pathname.split('/').filter(Boolean);
    let accumPath = '';
    return segments.map((seg, idx) => {
      accumPath += `/${seg}`;
      const isLast = idx === segments.length - 1;
      return {
        label: seg === 'support' || seg === 'help' ? 'Help & FAQ' : formatSegment(seg),
        to: isLast ? null : accumPath,
      };
    });
  })();

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center text-xs text-text-secondary overflow-x-auto py-1 scrollbar-none', className)}
    >
      <ol className="flex items-center gap-1.5 whitespace-nowrap">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1 || !item.to;

          return (
            <li key={index} className="inline-flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight
                  className="h-3.5 w-3.5 shrink-0 text-text-muted"
                  aria-hidden="true"
                />
              )}

              {item.icon && (
                <span className="text-text-secondary shrink-0">{item.icon}</span>
              )}

              {isLast ? (
                <span
                  className="font-semibold text-text-primary truncate max-w-[180px] sm:max-w-xs"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  className="hover:text-text-primary transition-colors truncate max-w-[140px] sm:max-w-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded p-0.5"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
