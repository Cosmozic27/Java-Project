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
  variant = 'default',
  className = '',
  iconContainerClassName = '',
}) {
  const iconVariants = {
    // Deliberate forest green / sage / gold hierarchy
    sage: 'bg-[#E2EEE3] text-[#194D2C] border border-[#237A43]/15 dark:bg-[#142C1D] dark:text-[#7BDFA0] dark:border-[#237A43]/30',
    'sage-strong': 'bg-[#D6E8D8] text-[#194D2C] border border-[#237A43]/20 dark:bg-[#1A3D27] dark:text-[#88E5AC] dark:border-[#237A43]/35',
    'sage-pale': 'bg-[#EBF3EC] text-[#237A43] border border-[#237A43]/12 dark:bg-[#122719] dark:text-[#72DC97] dark:border-[#237A43]/25',
    gold: 'bg-[#F7F1D9] text-[#876B1F] border border-[#C8AC4C]/30 dark:bg-[#2B2410] dark:text-[#F0D268] dark:border-[#C8AC4C]/35',
    'forest-solid': 'bg-[#237A43] text-white border border-[#194D2C]/30 dark:bg-[#237A43] dark:text-white dark:border-[#7BDFA0]/30',

    // Cohesive fallback & shared variants
    default: 'bg-[#E2EEE3] text-[#194D2C] border border-[#237A43]/15 dark:bg-[#142C1D] dark:text-[#7BDFA0] dark:border-[#237A43]/30',
    primary: 'bg-[#237A43] text-white border border-[#194D2C]/30 dark:bg-[#237A43] dark:text-white dark:border-[#7BDFA0]/30',
    accent: 'bg-[#F7F1D9] text-[#876B1F] border border-[#C8AC4C]/30 dark:bg-[#2B2410] dark:text-[#F0D268] dark:border-[#C8AC4C]/35',
    warning: 'bg-[#F7F1D9] text-[#876B1F] border border-[#C8AC4C]/30 dark:bg-[#2B2410] dark:text-[#F0D268] dark:border-[#C8AC4C]/35',
    info: 'bg-[#E8EFF7] text-[#527DA8] border border-[#527DA8]/20 dark:bg-[#152332] dark:text-[#8BB3DE] dark:border-[#527DA8]/30',
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
              'flex h-12 w-12 sm:h-[50px] sm:w-[50px] shrink-0 items-center justify-center rounded-[13px] transition-colors',
              iconVariants[variant] || iconVariants.default,
              iconContainerClassName
            )}
          >
            {React.isValidElement(Icon) ? (
              Icon
            ) : (
              <Icon className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden="true" />
            )}
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
                    ? 'bg-green-50 text-green-700 border border-green-200 dark:bg-green-950/40 dark:text-green-300 dark:border-green-800/40'
                    : 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800/40'
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
