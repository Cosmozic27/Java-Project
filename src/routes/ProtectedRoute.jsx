import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { DEMO_CONFIG } from '@/config/demoConfig';

export function ProtectedRoute({ allowedRoles, children }) {
  const location = useLocation();

  const isLoggedIn =
    sessionStorage.getItem('foodbridgeLoggedIn') === 'true';

  let user = null;

  try {
    const storedUser = sessionStorage.getItem('foodbridgeUser');
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    user = null;
  }

  if (!isLoggedIn || !user || !user.role) {
    return (
      <Navigate
        to="/auth/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  const isDemoAdmin =
    sessionStorage.getItem('foodbridgeIsDemoAdmin') === 'true' ||
    Boolean(user?.isDemoAdmin);

  // If user is a demo admin, ensure demo mode is still enabled
  if (isDemoAdmin) {
    const isDemoEnabled = DEMO_CONFIG.enabled;
    if (!isDemoEnabled) {
      sessionStorage.clear();
      return <Navigate to="/auth/login" replace />;
    }
  }

  const userRole = String(user.role).toUpperCase();

  const roles = Array.isArray(allowedRoles)
    ? allowedRoles.map((role) => String(role).toUpperCase())
    : [];

  // A demo admin session cannot access Donor or NGO portals
  if (isDemoAdmin && !roles.includes('ADMIN')) {
    return <Navigate to="/admin" replace />;
  }

  if (roles.length > 0 && !roles.includes(userRole)) {
    const dashboardPath = {
      DONOR: '/donor',
      NGO: '/ngo',
      ADMIN: '/admin',
    }[userRole];

    return (
      <Navigate
        to={dashboardPath || '/auth/login'}
        replace
      />
    );
  }

  return children ?? <Outlet />;
}

export default ProtectedRoute;