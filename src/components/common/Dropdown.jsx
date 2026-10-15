import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';

export function Dropdown({
  trigger,
  items = [],
  children,
  align = 'right',
  className = '',
  menuClassName = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const alignmentClasses = {
    left: 'left-0 origin-top-left',
    right: 'right-0 origin-top-right',
    center: 'left-1/2 -translate-x-1/2 origin-top',
  };

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    setFocusedIndex(-1);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    }

    function handleKeyDown(event) {
      if (!isOpen) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        closeDropdown();
        triggerRef.current?.focus();
        return;
      }

      if (items && items.length > 0) {
        const actionableElements = menuRef.current
          ? Array.from(menuRef.current.querySelectorAll('[role="menuitem"]:not([disabled])'))
          : [];

        if (actionableElements.length === 0) return;

        if (event.key === 'ArrowDown') {
          event.preventDefault();
          setFocusedIndex((prev) => (prev + 1) % actionableElements.length);
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          setFocusedIndex((prev) => (prev <= 0 ? actionableElements.length - 1 : prev - 1));
        } else if (event.key === 'Tab') {
          closeDropdown();
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen, items, closeDropdown]);

  useEffect(() => {
    if (focusedIndex >= 0 && menuRef.current) {
      const actionableElements = menuRef.current.querySelectorAll(
        '[role="menuitem"]:not([disabled])'
      );
      if (actionableElements[focusedIndex]) {
        actionableElements[focusedIndex].focus();
      }
    }
  }, [focusedIndex]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    setFocusedIndex(-1);
  };

  return (
    <div ref={dropdownRef} className={cn('relative inline-block text-left', className)}>
      {React.isValidElement(trigger) ? (
        React.cloneElement(trigger, {
          ref: triggerRef,
          onClick: (e) => {
            trigger.props.onClick?.(e);
            toggleDropdown();
          },
          onKeyDown: (e) => {
            trigger.props.onKeyDown?.(e);
            if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
              if (!isOpen) {
                e.preventDefault();
                setIsOpen(true);
                setFocusedIndex(0);
              }
            } else if (e.key === 'Escape' && isOpen) {
              e.preventDefault();
              closeDropdown();
            }
          },
          'aria-haspopup': 'menu',
          'aria-expanded': isOpen,
        })
      ) : (
        <button
          ref={triggerRef}
          type="button"
          onClick={toggleDropdown}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          className="cursor-pointer inline-flex items-center"
        >
          {trigger}
        </button>
      )}

      {isOpen && (
        <div
          ref={menuRef}
          role="menu"
          aria-orientation="vertical"
          className={cn(
            'absolute z-50 mt-2 min-w-[220px] rounded-xl bg-surface border border-border/80 p-1.5 shadow-xl transition-all duration-150 ease-out focus:outline-none animate-in fade-in zoom-in-95',
            alignmentClasses[align] || alignmentClasses.right,
            menuClassName
          )}
        >
          {children ||
            items.map((item, index) => {
              if (item.divider) {
                return (
                  <div
                    key={`divider-${index}`}
                    className="my-1 border-t border-border/80"
                    role="separator"
                  />
                );
              }

              if (item.header) {
                return (
                  <div
                    key={`header-${index}`}
                    className="px-3 py-2 border-b border-border/60 mb-1 select-none"
                  >
                    <p className="text-xs font-semibold text-text-primary truncate">
                      {item.name || item.label}
                    </p>
                    {item.role && (
                      <p className="text-[11px] text-text-secondary truncate mt-0.5">
                        {item.role}
                      </p>
                    )}
                    {item.email && (
                      <p className="text-[11px] text-text-muted truncate mt-0.5">
                        {item.email}
                      </p>
                    )}
                  </div>
                );
              }

              const itemClass = cn(
                'group flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors cursor-pointer select-none text-left focus:outline-none focus:bg-background-subtle focus:ring-1 focus:ring-primary/20',
                item.danger
                  ? 'text-danger hover:bg-danger/10 active:bg-danger/15'
                  : 'text-text-primary hover:bg-background-subtle active:bg-border/30',
                item.disabled && 'opacity-60 cursor-default pointer-events-none'
              );

              const innerContent = (
                <>
                  {item.icon && (
                    <span
                      className={cn(
                        'shrink-0 text-text-secondary transition-colors',
                        item.danger ? 'text-danger' : 'group-hover:text-primary'
                      )}
                    >
                      {item.icon}
                    </span>
                  )}
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-primary-light text-primary-dark">
                      {item.badge}
                    </span>
                  )}
                </>
              );

              if (item.to) {
                return (
                  <Link
                    key={index}
                    to={item.to}
                    role="menuitem"
                    onClick={() => {
                      if (!item.disabled) {
                        closeDropdown();
                        item.onClick?.();
                      }
                    }}
                    className={itemClass}
                  >
                    {innerContent}
                  </Link>
                );
              }

              return (
                <button
                  key={index}
                  type="button"
                  role="menuitem"
                  disabled={item.disabled}
                  onClick={() => {
                    if (!item.disabled) {
                      closeDropdown();
                      item.onClick?.();
                    }
                  }}
                  className={itemClass}
                >
                  {innerContent}
                </button>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
