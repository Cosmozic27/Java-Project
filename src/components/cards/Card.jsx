import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const cardVariants = {
  default: 'bg-surface border-border shadow-xs hover:border-border-strong/80',
  subtle: 'bg-surface-muted border-border/80 shadow-none',
  flat: 'bg-surface border-border shadow-none',
  interactive:
    'bg-surface border-border shadow-xs hover:shadow-md hover:border-primary/40 hover:-translate-y-0.5 cursor-pointer transition-all duration-200',
  elevated: 'bg-surface border-border/60 shadow-md',
};

const paddingVariants = {
  none: '',
  sm: 'p-3.5 sm:p-4',
  md: 'p-5 sm:p-6',
  lg: 'p-6 sm:p-8',
};

export const Card = forwardRef(function Card(
  {
    children,
    className = '',
    variant = 'default',
    padding = 'md',
    as: Component = 'div',
    ...props
  },
  ref
) {
  return (
    <Component
      ref={ref}
      className={cn(
        'rounded-xl border transition-colors',
        cardVariants[variant] || cardVariants.default,
        paddingVariants[padding],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
});

Card.displayName = 'Card';

export const CardHeader = forwardRef(function CardHeader(
  { children, className = '', ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 pb-4', className)}
      {...props}
    >
      {children}
    </div>
  );
});

CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef(function CardTitle(
  { children, className = '', as: Component = 'h3', ...props },
  ref
) {
  return (
    <Component
      ref={ref}
      className={cn(
        'text-base font-semibold leading-none tracking-tight text-text-primary',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
});

CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef(function CardDescription(
  { children, className = '', ...props },
  ref
) {
  return (
    <p
      ref={ref}
      className={cn('text-sm text-text-secondary leading-relaxed', className)}
      {...props}
    >
      {children}
    </p>
  );
});

CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef(function CardContent(
  { children, className = '', ...props },
  ref
) {
  return (
    <div ref={ref} className={cn('', className)} {...props}>
      {children}
    </div>
  );
});

CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef(function CardFooter(
  { children, className = '', ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn('flex items-center pt-4 border-t border-border/60 mt-4', className)}
      {...props}
    >
      {children}
    </div>
  );
});

CardFooter.displayName = 'CardFooter';

export default Card;
