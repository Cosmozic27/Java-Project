import React, { cloneElement, forwardRef, isValidElement } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';

/**
 * Button component variant configurations
 */
const buttonVariants = {
  primary:
    'relative overflow-hidden bg-primary text-white hover:bg-primary-dark active:bg-primary-dark/95 shadow-sm hover:shadow-md focus-visible:ring-primary/30 before:absolute before:inset-y-0 before:-left-1/2 before:w-1/3 before:skew-x-[-20deg] before:bg-white/15 before:transition-transform before:duration-500 hover:before:translate-x-[420%]',
  secondary:
    'bg-primary-light text-primary-dark hover:bg-primary/20 active:bg-primary/25 focus-visible:ring-primary/20',
  outline:
    'border border-border bg-surface text-text-primary hover:bg-surface-muted hover:border-border-strong active:bg-surface-muted/80 shadow-xs focus-visible:ring-primary/20',
  ghost:
    'text-text-secondary hover:text-text-primary hover:bg-background-subtle active:bg-border/40 focus-visible:ring-primary/20',
  accent:
    'bg-accent text-text-primary hover:bg-accent-hover font-semibold shadow-xs focus-visible:ring-accent/30',
  danger:
    'bg-danger text-white hover:bg-danger/90 active:bg-danger/95 shadow-sm focus-visible:ring-danger/30',
  'subtle-danger':
    'bg-red-50 text-danger border border-red-200 hover:bg-red-100/70 focus-visible:ring-danger/20',
};

const buttonSizes = {
  sm: 'text-xs px-2.5 py-1.5 h-8 gap-1.5 rounded-md font-medium',
  md: 'text-sm px-4 py-2 h-10 gap-2 rounded-lg font-medium',
  lg: 'text-base px-5 py-2.5 h-11 gap-2.5 rounded-lg font-semibold',
  icon: 'h-9 w-9 p-0 rounded-lg justify-center',
};

function setRef(ref, node) {
  if (!ref) return;
  if (typeof ref === 'function') {
    ref(node);
  } else {
    ref.current = node;
  }
}

function buttonClassName({ variant, size, fullWidth, className, isDisabled, glow }) {
  return cn(
    'inline-flex items-center justify-center select-none transition-all duration-200 ease-out active:scale-[0.985]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
    'cursor-pointer disabled:cursor-not-allowed disabled:opacity-55 disabled:pointer-events-none',
    buttonVariants[variant] || buttonVariants.primary,
    buttonSizes[size] || buttonSizes.md,
    fullWidth && 'w-full',
    isDisabled && 'cursor-not-allowed opacity-55 pointer-events-none',
    glow && !isDisabled && 'button-glow',
    className
  );
}

function ButtonInner({ isLoading, leftIcon, rightIcon, children }) {
  if (isLoading) {
    return (
      <>
        <Loader2 className="h-4 w-4 animate-spin text-current shrink-0" aria-hidden="true" />
        <span>{children}</span>
      </>
    );
  }

  return (
    <>
      {leftIcon && <span className="shrink-0 inline-flex items-center">{leftIcon}</span>}
      {children && <span>{children}</span>}
      {rightIcon && <span className="shrink-0 inline-flex items-center">{rightIcon}</span>}
    </>
  );
}

function SlotClone({
  element,
  forwardedRef,
  classes,
  isLoading,
  isDisabled,
  leftIcon,
  rightIcon,
  ...props
}) {
  const childProps = element.props ?? {};
  const childRef = element.ref ?? childProps.ref;

  return cloneElement(
    element,
    {
      ...props,
      className: cn(classes, childProps.className),
      'aria-busy': isLoading || undefined,
      'aria-disabled': isDisabled || undefined,
      tabIndex: isDisabled ? -1 : childProps.tabIndex,
      onClick: (event) => {
        if (isDisabled) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        childProps.onClick?.(event);
        if (!event.defaultPrevented) {
          props.onClick?.(event);
        }
      },
      ref: (node) => {
        setRef(forwardedRef, node);
        setRef(childRef, node);
      },
    },
    <ButtonInner isLoading={isLoading} leftIcon={leftIcon} rightIcon={rightIcon}>
      {childProps.children}
    </ButtonInner>
  );
}

export const Button = forwardRef(function Button(
  {
    children,
    type = 'button',
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    isLoading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    glow = variant === 'primary',
    asChild = false,
    ...props
  },
  forwardedRef
) {
  const isDisabled = disabled || isLoading;
  const classes = buttonClassName({ variant, size, fullWidth, className, isDisabled, glow });

  if (asChild) {
    if (!isValidElement(children)) {
      return null;
    }

    return (
      <SlotClone
        element={children}
        forwardedRef={forwardedRef}
        classes={classes}
        isLoading={isLoading}
        isDisabled={isDisabled}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        {...props}
      />
    );
  }

  return (
    <button
      ref={forwardedRef}
      type={type}
      disabled={isDisabled}
      aria-busy={isLoading}
      className={classes}
      {...props}
    >
      <ButtonInner isLoading={isLoading} leftIcon={leftIcon} rightIcon={rightIcon}>
        {children}
      </ButtonInner>
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
