import React, { useState, useRef, useEffect } from 'react';
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

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const alignmentClasses = {
    left: 'left-0 origin-top-left',
    right: 'right-0 origin-top-right',
    center: 'left-1/2 -translate-x-1/2 origin-top',
  };

  return (
    <div ref={dropdownRef} className={cn('relative inline-block text-left', className)}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen((prev) => !prev);
          }
        }}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="cursor-pointer inline-flex items-center"
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className={cn(
            'absolute z-50 mt-2 min-w-[200px] rounded-xl bg-surface border border-border p-1.5 shadow-md transition-all duration-150 ease-out focus:outline-none animate-in fade-in zoom-in-95',
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

              const itemClass = cn(
                'group flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors cursor-pointer select-none text-left',
                item.danger
                  ? 'text-danger hover:bg-danger/10 active:bg-danger/15'
                  : 'text-text-primary hover:bg-background-subtle active:bg-border/30',
                item.disabled && 'opacity-40 cursor-not-allowed pointer-events-none'
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
                        setIsOpen(false);
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
                      setIsOpen(false);
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
