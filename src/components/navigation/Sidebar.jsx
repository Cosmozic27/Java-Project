import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  LogOut 
} from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { Avatar } from '@/components/data-display/Avatar';
import { cn } from '@/utils/cn';

export function Sidebar({
  navigationItems = [],
  userInfo = {
    name: 'Green Earth NGO',
    role: 'Food Redistribution Partner',
    avatar: '',
  },
  isCollapsed = false,
  onToggleCollapse,
  onItemClick,
  onLogout,
  footerItems,
  className = '',
}) {
  // Normalize items to grouped structure
  const groupedSections =
    navigationItems.length > 0 && navigationItems[0].items
      ? navigationItems
      : [{ group: null, items: navigationItems }];

  return (
    <aside
      className={cn(
        'relative flex flex-col h-full bg-surface border-r border-border transition-all duration-200 ease-in-out select-none',
        isCollapsed ? 'w-20' : 'w-64',
        className
      )}
    >
      {/* Sidebar Header: Brand Logo */}
      <div className="flex h-16 shrink-0 items-center justify-between px-4 border-b border-border/80">
        <div className="flex items-center min-w-0">
          <Logo size={isCollapsed ? 'sm' : 'md'} iconOnly={isCollapsed} />
        </div>

        {/* Desktop Collapse Toggle Button */}
        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="hidden md:flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-surface-muted text-text-secondary hover:text-text-primary hover:bg-background-subtle focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary transition-colors cursor-pointer"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {/* Sidebar Navigation Links (Scrollable) */}
      <nav
        aria-label="Sidebar Navigation"
        className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-none"
      >
        {groupedSections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1">
            {section.group && !isCollapsed && (
              <h3 className="px-3 text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-2">
                {section.group}
              </h3>
            )}

            <div className="space-y-1">
              {section.items.map((item, idx) => {
                const IconComponent = item.icon;

                return (
                  <NavLink
                    key={idx}
                    to={item.to}
                    end={item.to.split('/').length <= 2}
                    onClick={onItemClick}
                    title={isCollapsed ? item.label : undefined}
                    className={({ isActive }) =>
                      cn(
                        'group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 relative',
                        isActive
                          ? 'bg-primary-light text-primary-dark font-semibold shadow-2xs'
                          : 'text-text-secondary hover:text-text-primary hover:bg-background-subtle',
                        isCollapsed && 'justify-center px-0'
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {/* Active vertical accent pill on left */}
                        {isActive && !isCollapsed && (
                          <span
                            className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-primary"
                            aria-hidden="true"
                          />
                        )}

                        {IconComponent && (
                          <IconComponent
                            className={cn(
                              'h-5 w-5 shrink-0 transition-colors',
                              isActive
                                ? 'text-primary'
                                : 'text-text-secondary group-hover:text-text-primary'
                            )}
                            aria-hidden="true"
                          />
                        )}

                        {!isCollapsed && (
                          <span className="flex-1 truncate">{item.label}</span>
                        )}

                        {!isCollapsed && item.badge && (
                          <span
                            className={cn(
                              'ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0',
                              isActive
                                ? 'bg-primary text-white'
                                : 'bg-surface-muted text-text-secondary border border-border'
                            )}
                          >
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Sidebar Footer / User Profile Card */}
      <div className="shrink-0 p-3 border-t border-border/80 bg-surface-muted/40 space-y-2">
        {footerItems && <div className="space-y-1 mb-2">{footerItems}</div>}

        {userInfo && (
          <div
            className={cn(
              'flex items-center gap-3 p-2 rounded-xl border border-border/60 bg-surface transition-colors',
              isCollapsed && 'justify-center p-2'
            )}
          >
            <Avatar
              name={userInfo.name}
              src={userInfo.avatar}
              size={isCollapsed ? 'sm' : 'md'}
              status="online"
            />

            {!isCollapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-text-primary truncate">
                  {userInfo.name}
                </p>
                <p className="text-[11px] text-text-secondary truncate capitalize">
                  {userInfo.role}
                </p>
              </div>
            )}

            {!isCollapsed && onLogout && (
              <button
                type="button"
                onClick={onLogout}
                title="Log out"
                aria-label="Log out"
                className="p-1.5 rounded-lg text-text-secondary hover:text-danger hover:bg-danger/10 transition-colors cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
