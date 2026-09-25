import React from 'react';
import { Outlet } from 'react-router-dom';
import { PORTAL_ROLES } from '@/constants/navigation';

/**
 * Structural wrapper for future role-based access.
 *
 * Does not authenticate. `allowedRoles` is reserved for donor | ngo | admin
 * checks once a real session exists. Until then this always renders the
 * protected tree so layout and navigation can be verified.
 *
 * Future integration:
 *   const { user, isAuthenticated } = useAuth();
 *   if (!isAuthenticated) return <Navigate to="/auth/login" replace />;
 *   if (allowedRoles?.length && !allowedRoles.includes(user.role)) {
 *     return <Navigate to="/unauthorized" replace />;
 *   }
 */
export function ProtectedRoute({ allowedRoles, children }) {
  const roles = Array.isArray(allowedRoles)
    ? allowedRoles.map((role) => String(role).toLowerCase())
    : [];

  if (import.meta.env.DEV) {
    const unknown = roles.filter((role) => !PORTAL_ROLES.includes(role));
    if (unknown.length > 0) {
      console.warn(
        `ProtectedRoute: unknown role id(s): ${unknown.join(', ')}. Expected ${PORTAL_ROLES.join(', ')}.`
      );
    }
  }

  return children ?? <Outlet />;
}

export default ProtectedRoute;
