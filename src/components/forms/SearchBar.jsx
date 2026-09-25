import React, { forwardRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';

export const SearchBar = forwardRef(function SearchBar(
  {
    value,
    defaultValue,
    onChange,
    onClear,
    onSubmit,
    placeholder = 'Search donations, organizations, food types...',
    className = '',
    containerClassName = '',
    isLoading = false,
    size = 'md',
    shortcut,
    ...props
  },
  ref
) {
  const hasValue = Boolean(value);

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChange) {
      // Simulate synthetic event for clear
      onChange({ target: { value: '' } });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSubmit) {
      e.preventDefault();
      onSubmit(value);
    }
  };

  const sizeClasses = {
    sm: 'h-8 text-xs pl-8 pr-7',
    md: 'h-10 text-sm pl-9 pr-8',
    lg: 'h-11 text-base pl-10 pr-9',
  };

  const iconSizes = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  return (
    <div className={cn('relative flex items-center w-full', containerClassName)}>
      {/* Left Search Icon or Loading Spinner */}
      <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none text-text-secondary">
        {isLoading ? (
          <Loader2 className={cn('animate-spin text-primary', iconSizes[size] || iconSizes.md)} />
        ) : (
          <Search className={cn(iconSizes[size] || iconSizes.md)} aria-hidden="true" />
        )}
      </div>

      <input
        ref={ref}
        type="search"
        role="searchbox"
        aria-label="Search input"
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn(
          'w-full rounded-xl border border-border bg-surface text-text-primary transition-all duration-150',
          'placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
          'hover:border-border-strong',
          // Remove native webkit search cancel button in favor of our custom accessible clear button
          '[&::-webkit-search-cancel-button]:hidden',
          sizeClasses[size] || sizeClasses.md,
          hasValue && 'pr-9',
          className
        )}
        {...props}
      />

      {/* Right Action: Clear Button or Keyboard Shortcut */}
      <div className="absolute right-2.5 inset-y-0 flex items-center gap-1.5">
        {hasValue ? (
          <button
            type="button"
            aria-label="Clear search query"
            onClick={handleClear}
            className="rounded-md p-1 text-text-secondary hover:bg-background-subtle hover:text-text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary transition-colors cursor-pointer"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        ) : shortcut ? (
          <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-border bg-surface-muted px-1.5 py-0.5 text-[10px] font-medium text-text-secondary select-none">
            {shortcut}
          </kbd>
        ) : null}
      </div>
    </div>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;
