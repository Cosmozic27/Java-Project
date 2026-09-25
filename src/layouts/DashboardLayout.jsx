import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '@/components/navigation/Sidebar';
import { MobileNav } from '@/components/navigation/MobileNav';
import { DashboardHeader } from '@/components/navigation/DashboardHeader';
import { getNavigationForRole, resolvePortalId } from '@/constants/navigation';
import { useToast } from '@/components/feedback';
import { cn } from '@/utils/cn';

export function DashboardLayout({
  role: explicitRole,
  navigationItems: explicitNav,
  userInfo: explicitUser,
  headerTitle,
  headerDescription,
  children,
}) {
  const location = useLocation();
  const toast = useToast();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

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
    toast.info('Logged out from dashboard', 'Session Ended');
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background font-sans text-text-primary">
      {/* 1. Desktop Persistent Sidebar */}
      <div className="hidden md:flex shrink-0 h-full">
        <Sidebar
          navigationItems={activeNav}
          userInfo={currentUser}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
          onLogout={handleLogout}
        />
      </div>

      {/* 2. Mobile Drawer Navigation */}
      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        navigationItems={activeNav}
        userInfo={currentUser}
        onLogout={handleLogout}
      />

      {/* 3. Main Content Column */}
      <div className="flex flex-1 flex-col h-full min-w-0 overflow-hidden">
        {/* Top Dashboard Header */}
        <DashboardHeader
          title={headerTitle}
          description={headerDescription}
          userInfo={currentUser}
          portal={derivedRole}
          onMenuClick={() => setMobileNavOpen(true)}
          onNotificationClick={() => toast.info('You have 2 pending notifications')}
          notificationCount={2}
          onLogout={handleLogout}
        />

        {/* Scrollable Main Application Content */}
        <main
          className={cn(
            'flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 scrollbar-none',
            'focus:outline-none'
          )}
        >
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
