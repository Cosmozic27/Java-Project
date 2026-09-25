import React, { forwardRef, useId } from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/utils/cn';

export const Input = forwardRef(function Input(
  {
    id: externalId,
    label,
    type = 'text',
    name,
    placeholder,
    error,
    helperText,
    disabled = false,
    required = false,
    leftIcon,
    rightIcon,
    className = '',
    containerClassName = '',
    ...props
  },
  ref
) {
  const generatedId = useId();
  const inputId = externalId || generatedId;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  const describedBy = error
    ? errorId
    : helperText
    ? helperId
    : undefined;

  return (
    <div className={cn('flex flex-col space-y-1.5 w-full', containerClassName)}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold text-text-primary select-none flex items-center justify-between"
        >
          <span>
            {label}
            {required && <span className="text-danger ml-0.5" aria-hidden="true">*</span>}
          </span>
        </label>
      )}

      <div className="relative flex items-center w-full">
        {leftIcon && (
          <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none text-text-secondary">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cn(
            'w-full h-10 rounded-lg border bg-surface px-3.5 text-sm text-text-primary transition-all duration-150',
            'placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-offset-0',
            'disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-text-muted disabled:border-border',
            leftIcon && 'pl-9',
            (rightIcon || error) && 'pr-9',
            error
              ? 'border-danger text-danger focus:border-danger focus:ring-danger/20'
              : 'border-border hover:border-border-strong focus:border-primary focus:ring-primary/20',
            className
          )}
          {...props}
        />

        {error ? (
          <div className="absolute right-3 inset-y-0 flex items-center pointer-events-none text-danger">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
          </div>
        ) : rightIcon ? (
          <div className="absolute right-3 inset-y-0 flex items-center pointer-events-none text-text-secondary">
            {rightIcon}
          </div>
        ) : null}
      </div>

      {error ? (
        <p id={errorId} role="alert" className="text-xs text-danger font-medium flex items-center gap-1 mt-1">
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

Input.displayName = 'Input';

export default Input;
