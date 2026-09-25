import React, { forwardRef, useId } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';
import { cn } from '@/utils/cn';

export const Select = forwardRef(function Select(
  {
    id: externalId,
    label,
    options = [],
    placeholder = 'Select an option',
    error,
    helperText,
    disabled = false,
    required = false,
    className = '',
    containerClassName = '',
    children,
    ...props
  },
  ref
) {
  const generatedId = useId();
  const selectId = externalId || generatedId;
  const errorId = `${selectId}-error`;
  const helperId = `${selectId}-helper`;

  const describedBy = error
    ? errorId
    : helperText
    ? helperId
    : undefined;

  return (
    <div className={cn('flex flex-col space-y-1.5 w-full', containerClassName)}>
      {label && (
        <label
          htmlFor={selectId}
          className="text-xs font-semibold text-text-primary select-none flex items-center justify-between"
        >
          <span>
            {label}
            {required && <span className="text-danger ml-0.5" aria-hidden="true">*</span>}
          </span>
        </label>
      )}

      <div className="relative flex items-center w-full">
        <select
          ref={ref}
          id={selectId}
          disabled={disabled}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cn(
            'w-full h-10 appearance-none rounded-lg border bg-surface pl-3.5 pr-10 text-sm text-text-primary transition-all duration-150',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            'disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-text-muted disabled:border-border',
            error
              ? 'border-danger text-danger focus:border-danger focus:ring-danger/20'
              : 'border-border hover:border-border-strong focus:border-primary focus:ring-primary/20',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {children ||
            options.map((opt, idx) => (
              <option key={idx} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
        </select>

        <div className="absolute right-3 inset-y-0 flex items-center pointer-events-none text-text-secondary">
          {error ? (
            <AlertCircle className="h-4 w-4 text-danger" aria-hidden="true" />
          ) : (
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          )}
        </div>
      </div>

      {error ? (
        <p id={errorId} role="alert" className="text-xs text-danger font-medium mt-1">
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className="text-xs text-text-secondary mt-1">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
