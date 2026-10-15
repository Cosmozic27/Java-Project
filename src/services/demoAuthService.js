import { DEMO_CONFIG, isConfiguredDemoAdmin } from '../config/demoConfig.js';

/**
 * FoodBridge — Demo Authentication Service
 *
 * Isolated service handling demo-only Admin authentication.
 * Completely decoupled from real Donor / NGO authentication.
 * Ensures NO fake JWT token is ever generated or passed to the backend.
 */

export function isDemoModeAvailable() {
  return Boolean(DEMO_CONFIG.enabled);
}

export function isDemoAdminActive() {
  if (typeof window === 'undefined') return false;
  return (
    sessionStorage.getItem(DEMO_CONFIG.sessionKeys.isDemo) === 'true' &&
    sessionStorage.getItem(DEMO_CONFIG.sessionKeys.loggedIn) === 'true'
  );
}

export function authenticateDemoAdmin(email, password) {
  if (!DEMO_CONFIG.enabled) {
    return {
      success: false,
      error: 'Demo presentation mode is currently disabled.',
    };
  }

  const isValid = isConfiguredDemoAdmin(email, password);

  if (!isValid) {
    return {
      success: false,
      error: 'Invalid demo admin credentials. Access is restricted to the configured presentation admin credentials.',
    };
  }

  const demoUser = {
    id: 'DEMO-ADMIN-01',
    name: DEMO_CONFIG.admin.name,
    email: DEMO_CONFIG.admin.email,
    role: DEMO_CONFIG.admin.role,
    portal: DEMO_CONFIG.admin.portal,
    label: DEMO_CONFIG.admin.label,
    isDemoAdmin: true,
  };

  return {
    success: true,
    user: demoUser,
  };
}

export function startDemoAdminSession(user) {
  if (typeof window === 'undefined') return;

  const demoUser = user || {
    id: 'DEMO-ADMIN-01',
    name: DEMO_CONFIG.admin.name,
    email: DEMO_CONFIG.admin.email,
    role: DEMO_CONFIG.admin.role,
    portal: DEMO_CONFIG.admin.portal,
    label: DEMO_CONFIG.admin.label,
    isDemoAdmin: true,
  };

  // Explicitly remove any JWT token to prevent fake tokens from being sent to backend
  sessionStorage.removeItem(DEMO_CONFIG.sessionKeys.token);

  // Set explicit demo session flags
  sessionStorage.setItem(DEMO_CONFIG.sessionKeys.isDemo, 'true');
  sessionStorage.setItem(DEMO_CONFIG.sessionKeys.loggedIn, 'true');
  sessionStorage.setItem(
    DEMO_CONFIG.sessionKeys.user,
    JSON.stringify(demoUser)
  );
}

export function clearDemoAdminSession() {
  if (typeof window === 'undefined') return;

  sessionStorage.removeItem(DEMO_CONFIG.sessionKeys.isDemo);
  sessionStorage.removeItem(DEMO_CONFIG.sessionKeys.loggedIn);
  sessionStorage.removeItem(DEMO_CONFIG.sessionKeys.user);
  sessionStorage.removeItem(DEMO_CONFIG.sessionKeys.token);
  sessionStorage.removeItem(DEMO_CONFIG.sessionKeys.demoData);
}

export function getDemoAdminUser() {
  if (typeof window === 'undefined') return null;

  try {
    const raw = sessionStorage.getItem(DEMO_CONFIG.sessionKeys.user);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
