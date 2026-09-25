import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * Route protection wrapper placeholder for role-based access.
 * Authentication logic will be attached here in a future phase.
 * Currently permits all access to facilitate layout/navigation architecture verification.
 *
 * Future integration pattern:
 *   const { user, isAuthenticated } = useAuth();
 *   if (!isAuthenticated) return <Navigate to="/auth/login" replace />;
 *   if (_allowedRoles && !_allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" replace />;
 */
export function ProtectedRoute({ allowedRoles: _allowedRoles, children }) {
  return children || <Outlet />;
}

export default ProtectedRoute;
