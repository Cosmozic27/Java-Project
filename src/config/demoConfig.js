/**
 * FoodBridge — Demo Configuration
 *
 * Dedicated configuration for the college project presentation demo mode.
 * Demo mode can be toggled on or off via the `enabled` flag or the
 * `VITE_ENABLE_ADMIN_DEMO` environment variable.
 */

const env = (typeof import.meta !== 'undefined' && import.meta.env) || (typeof process !== 'undefined' && process.env) || {};

export const DEMO_CONFIG = {
  // Set to false to completely disable demo admin access after presentations
  enabled: env.VITE_ENABLE_ADMIN_DEMO !== 'false',

  admin: {
    email: env.VITE_DEMO_ADMIN_EMAIL || 'admin.demo@foodbridge.org',
    password: env.VITE_DEMO_ADMIN_PASSWORD || 'AdminDemo2026!',
    name: 'System Governance (Demo)',
    role: 'ADMIN',
    portal: 'admin',
    label: 'Platform Administrator (Demo Mode)',
  },

  sessionKeys: {
    isDemo: 'foodbridgeIsDemoAdmin',
    demoData: 'foodbridge.demo.admin.data',
    user: 'foodbridgeUser',
    loggedIn: 'foodbridgeLoggedIn',
    token: 'foodbridgeToken',
  },
};

/**
 * Validates if the provided credentials match the configured demo credentials.
 */
export function isConfiguredDemoAdmin(email, password) {
  if (!DEMO_CONFIG.enabled) return false;

  const normalizedInputEmail = String(email || '').trim().toLowerCase();
  const normalizedConfigEmail = String(DEMO_CONFIG.admin.email).trim().toLowerCase();

  return (
    normalizedInputEmail === normalizedConfigEmail &&
    password === DEMO_CONFIG.admin.password
  );
}

export default DEMO_CONFIG;
