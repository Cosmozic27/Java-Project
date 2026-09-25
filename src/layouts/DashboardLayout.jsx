import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/navigation/Sidebar';
import { MobileNav } from '@/components/navigation/MobileNav';
import { DashboardHeader } from '@/components/navigation/DashboardHeader';
import { getNavigationForRole, resolvePortalId } from '@/constants/navigation';
import { useToast } from '@/components/feedback';
import { cn } from '@/utils/cn';
import { clearPrototypeAuth } from '@/constants/authData';

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
    clearPrototypeAuth();
    toast.info('Logged out from dashboard', 'Session Ended');
    navigate('/auth/login', { replace: true });
  };

  return (
    <div className="min-h-screen w-full bg-background font-sans text-text-primary md:flex">
      {/* 1. Desktop Persistent Sidebar */}
      <div className="hidden shrink-0 md:block">
        <div className="sticky top-0 h-screen">
          <Sidebar
            navigationItems={activeNav}
            userInfo={currentUser}
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
            onLogout={handleLogout}
          />
        </div>
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
      <div className="flex min-w-0 flex-1 flex-col">
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
            'min-w-0 p-4 sm:p-6 lg:p-8',
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
