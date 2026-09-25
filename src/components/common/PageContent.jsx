import React from 'react';
import { cn } from '@/utils/cn';

export function PageContent({
  children,
  className = '',
  spacing = 'normal', // 'tight' | 'normal' | 'loose'
}) {
  const spacingMap = {
    tight: 'space-y-4 sm:space-y-6',
    normal: 'space-y-6 sm:space-y-8',
    loose: 'space-y-8 sm:space-y-12',
  };

  return (
    <div className={cn('w-full', spacingMap[spacing] || spacingMap.normal, className)}>
      {children}
    </div>
  );
}

export default PageContent;
