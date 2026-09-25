import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const maxWidthMap = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
};

export const PageContainer = forwardRef(function PageContainer(
  {
    children,
    className = '',
    maxWidth = '7xl',
    noPadding = false,
    as: Component = 'div',
    ...props
  },
  ref
) {
  return (
    <Component
      ref={ref}
      className={cn(
        'w-full mx-auto',
        maxWidthMap[maxWidth] || maxWidthMap['7xl'],
        !noPadding && 'px-4 sm:px-6 lg:px-8 py-6 sm:py-8',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
});

PageContainer.displayName = 'PageContainer';

export default PageContainer;
