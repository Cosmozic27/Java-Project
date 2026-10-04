import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/navigation/Sidebar';
import { MobileNav } from '@/components/navigation/MobileNav';
import { DashboardHeader } from '@/components/navigation/DashboardHeader';
import { LogoutConfirmModal } from '@/components/feedback/LogoutConfirmModal';
import { getNavigationForRole, resolvePortalId } from '@/constants/navigation';
import { useToast } from '@/components/feedback';
import { cn } from '@/utils/cn';
import { clearPrototypeAuth } from '@/constants/authData';
import { SwitchMode } from '@/components/switch-mode';

const PORTAL_THEME_STORAGE_KEY = 'foodbridge.portal.theme';

export function DashboardLayout({
  role: explicitRole,
  navigationItems: explicitNav,
  userInfo: explicitUser,
  headerTitle,
  headerDescription,
  children,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    try {
      return window.localStorage.getItem(PORTAL_THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(PORTAL_THEME_STORAGE_KEY, theme);
    } catch {
      // Keep the in-memory theme if storage is unavailable.
    }
  }, [theme]);

  // Derive role automatically from route path if not passed explicitly: /donor, /ngo, /admin
  const derivedRole = resolvePortalId(
    explicitRole || location.pathname.split('/')[1]
  );

  const activeNav = explicitNav || getNavigationForRole(derivedRole);

  const roleUserMap = {
    donor: {
      name: 'Central Hostel & Canteen',
      role: 'Food Donor',
      portal: 'donor',
      email: 'canteen@campus.edu',
    },
    ngo: {
      name: 'Hope Community Kitchen',
      role: 'NGO Partner',
      portal: 'ngo',
      email: 'contact@hopekitchen.org',
    },
    admin: {
      name: 'System Governance',
      role: 'Platform Administrator',
      portal: 'admin',
      email: 'admin@foodbridge.org',
    },
  };

  const currentUser = explicitUser || roleUserMap[derivedRole] || roleUserMap.donor;

  const handleLogout = () => {
    setLogoutModalOpen(false);
    clearPrototypeAuth();
    toast.info('Logged out from dashboard', 'Session Ended');
    navigate('/', { replace: true });
  };

  const requestLogout = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setLogoutModalOpen(true);
  };

  return (
    <>
      <div className={cn('portal-theme min-h-screen w-full bg-background font-sans text-text-primary md:flex', theme === 'dark' && 'dark')}>
        {/* 1. Desktop Persistent Sidebar */}
        <div className="hidden shrink-0 md:block">
          <div className="sticky top-0 h-screen">
            <Sidebar
              navigationItems={activeNav}
              userInfo={currentUser}
              isCollapsed={sidebarCollapsed}
              onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
              onLogout={requestLogout}
              onLogoClick={requestLogout}
            />
          </div>
        </div>

        {/* 2. Mobile Drawer Navigation */}
        <MobileNav
          isOpen={mobileNavOpen}
          onClose={() => setMobileNavOpen(false)}
          navigationItems={activeNav}
          userInfo={currentUser}
          onLogout={requestLogout}
          onLogoClick={requestLogout}
          isDark={theme === 'dark'}
        />

        {/* 3. Main Content Column */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top Dashboard Header */}
          <DashboardHeader
            title={headerTitle}
            description={headerDescription}
            userInfo={currentUser}
            portal={derivedRole}
            actions={
              <SwitchMode
                theme={theme}
                onToggle={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}
              />
            }
            onMenuClick={() => setMobileNavOpen(true)}
            onNotificationClick={() => toast.info('You have 2 pending notifications')}
            notificationCount={2}
            onLogout={requestLogout}
          />

          {/* Scrollable Main Application Content */}
          <main
            className={cn(
              'min-w-0 p-4 sm:p-6 lg:p-8',
              'focus:outline-none'
            )}
          >
            {children || <Outlet />}
          </main>
        </div>
      </div>

      {/* Logo-click logout confirmation modal */}
      <LogoutConfirmModal
        isOpen={logoutModalOpen}
        isDark={theme === 'dark'}
        onStay={() => setLogoutModalOpen(false)}
        onLogout={handleLogout}
      />
    </>
  );
}

export default DashboardLayout;
