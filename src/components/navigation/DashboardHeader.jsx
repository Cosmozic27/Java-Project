import React from 'react';
import { Menu, Bell, User, Settings, HelpCircle, LogOut } from 'lucide-react';
import { Avatar } from '@/components/data-display/Avatar';
import { Dropdown } from '@/components/common/Dropdown';
import { SearchBar } from '@/components/forms/SearchBar';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { resolvePortalId } from '@/constants/navigation';
import { cn } from '@/utils/cn';

export function DashboardHeader({
  title,
  description,
  breadcrumbs,
  showBreadcrumbs = true,
  searchPlaceholder = 'Search dashboard...',
  onSearch,
  onMenuClick,
  notificationCount = 0,
  onNotificationClick,
  userInfo = {
    name: 'FoodBridge User',
    role: 'Partner',
    portal: 'donor',
    email: 'user@foodbridge.org',
  },
  portal,
  userMenuItems,
  onLogout,
  actions,
  className = '',
}) {
  const portalId = resolvePortalId(portal ?? userInfo.portal ?? userInfo.roleId);

  const defaultUserMenu = [
    { label: userInfo.name, disabled: true },
    { label: userInfo.email, disabled: true },
    { divider: true },
    { label: 'My Profile', icon: <User className="h-4 w-4" />, to: `/${portalId}/profile` },
    { label: 'Settings', icon: <Settings className="h-4 w-4" />, to: `/${portalId}/settings` },
    { label: 'Help & FAQs', icon: <HelpCircle className="h-4 w-4" />, to: `/${portalId}/support` },
    { divider: true },
    { label: 'Sign Out', icon: <LogOut className="h-4 w-4" />, danger: true, onClick: onLogout },
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-30 flex flex-col border-b border-border/70 bg-surface/80 backdrop-blur-xl transition-colors shadow-[0_6px_24px_rgba(18,55,42,0.04)]',
        className
      )}
    >
      {/* Top Bar Navigation Area */}
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        {/* Left Side: Mobile Menu Button & Breadcrumbs / Title */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {onMenuClick && (
            <button
              type="button"
              onClick={onMenuClick}
              aria-label="Open sidebar menu"
              className="flex md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-background-subtle border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors cursor-pointer shrink-0"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}

          <div className="hidden sm:block min-w-0">
            {showBreadcrumbs && (breadcrumbs || <Breadcrumbs />)}
          </div>
        </div>

        {/* Right Side: Search, Notifications, Actions, User Dropdown */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Quick Search */}
          <div className="hidden lg:block w-64 xl:w-80">
            <SearchBar
              size="sm"
              placeholder={searchPlaceholder}
              onSubmit={onSearch}
              shortcut="⌘K"
            />
          </div>

          {/* Action slots */}
          {actions}

          {/* Notification Button */}
          <button
            type="button"
            onClick={onNotificationClick}
            aria-label="Notifications"
            className="relative p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-background-subtle border border-border/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors cursor-pointer"
          >
            <Bell className="h-4 w-4" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[9px] font-bold text-white shadow-2xs">
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
          </button>

          {/* User Profile Dropdown */}
          <Dropdown
            align="right"
            trigger={
              <button
                type="button"
                className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-background-subtle border border-transparent hover:border-border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="User menu"
              >
                <Avatar
                  name={userInfo.name}
                  src={userInfo.avatar}
                  size="sm"
                  status="online"
                />
                <span className="hidden xl:inline-block text-xs font-semibold text-text-primary truncate max-w-[120px]">
                  {userInfo.name}
                </span>
              </button>
            }
            items={userMenuItems || defaultUserMenu}
          />
        </div>
      </div>

      {/* Sub-header title banner (if title provided) */}
      {title && (
        <div className="px-4 sm:px-6 lg:px-8 py-3.5 bg-background/60 border-t border-border/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
              {title}
            </h1>
            {description && (
              <p className="text-xs text-text-secondary mt-0.5 max-w-2xl">
                {description}
              </p>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default DashboardHeader;
