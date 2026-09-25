import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { PORTAL_ROLES } from '@/constants/navigation';
import { getPrototypeAuth } from '@/constants/authData';

/**
 * Lightweight frontend-only guard for the current demo accounts.
 * Replace this with the real auth provider once backend authentication exists.
 */
export function ProtectedRoute({ allowedRoles, children }) {
  const location = useLocation();
  const roles = Array.isArray(allowedRoles)
    ? allowedRoles.map((role) => String(role).toLowerCase())
    : [];
  const prototypeAuth = getPrototypeAuth();

  if (import.meta.env.DEV) {
    const unknown = roles.filter((role) => !PORTAL_ROLES.includes(role));
    if (unknown.length > 0) {
      console.warn(
        `ProtectedRoute: unknown role id(s): ${unknown.join(', ')}. Expected ${PORTAL_ROLES.join(', ')}.`
      );
    }
  }

  if (!prototypeAuth) {
    return <Navigate to="/auth/login" replace state={{ from: location.pathname }} />;
  }

  if (roles.length > 0 && !roles.includes(prototypeAuth.role)) {
    return <Navigate to={`/${prototypeAuth.role}`} replace />;
  }

  return children ?? <Outlet />;
}

export default ProtectedRoute;
