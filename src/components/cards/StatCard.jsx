import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '@/components/cards/Card';
import { cn } from '@/utils/cn';

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  description,
  variant = 'default', // 'default' | 'primary' | 'accent' | 'warning'
  className = '',
}) {
  const iconVariants = {
    default: 'bg-primary-light text-primary-dark',
    primary: 'bg-primary text-white',
    accent: 'bg-accent/20 text-accent-hover',
    warning: 'bg-amber-100 text-amber-700',
    info: 'bg-blue-100 text-blue-700',
  };

  return (
    <Card
      variant="default"
      padding="md"
      className={cn(
        'group transition-all duration-200 hover:shadow-sm hover:border-border-strong',
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
            {title}
          </p>
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
            {value}
          </div>
        </div>

        {Icon && (
          <div
            className={cn(
              'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 shadow-xs',
              iconVariants[variant] || iconVariants.default
            )}
          >
            {React.isValidElement(Icon) ? Icon : <Icon className="h-5 w-5" aria-hidden="true" />}
          </div>
        )}
      </div>

      {(trend || description) && (
        <div className="mt-3.5 pt-3 border-t border-border/60 flex items-center justify-between gap-2 text-xs">
          {trend && (
            <div className="flex items-center gap-1.5 font-medium">
              <span
                className={cn(
                  'inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 font-semibold text-[11px]',
                  trend.isPositive
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                )}
              >
                {trend.isPositive ? (
                  <TrendingUp className="h-3 w-3" aria-hidden="true" />
                ) : (
                  <TrendingDown className="h-3 w-3" aria-hidden="true" />
                )}
                {trend.value}
              </span>
              {trend.label && (
                <span className="text-text-secondary truncate">{trend.label}</span>
              )}
            </div>
          )}

          {description && (
            <span className="text-text-secondary truncate ml-auto">{description}</span>
          )}
        </div>
      )}
    </Card>
  );
}

export default StatCard;
