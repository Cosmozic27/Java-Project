import React from 'react';
import {
  LayoutDashboard,
  UtensilsCrossed,
  HeartHandshake,
  History,
  User,
  ShoppingBag,
  Users,
  Building2,
  BarChart3,
  Settings,
} from 'lucide-react';

/**
 * Public chrome links.
 *
 * Until Phase 4 introduces dedicated public routes, these point at in-page
 * section hashes on `/` so Navbar/Footer do not 404. Phase 4 can promote
 * each `hash` to a real path (e.g. `/surplus`) without changing consumers.
 */
export const PUBLIC_NAV = [
  { label: 'How It Works', to: { pathname: '/', hash: 'how-it-works' } },
  { label: 'Our Impact', to: { pathname: '/', hash: 'impact' } },
  { label: 'Who We Serve', to: { pathname: '/', hash: 'audiences' } },
  { label: 'Food Safety', to: { pathname: '/', hash: 'safety' } },
];

export const PUBLIC_FOOTER_NAV = [
  { label: 'How It Works', to: { pathname: '/', hash: 'how-it-works' } },
  { label: 'Platform Impact', to: { pathname: '/', hash: 'impact' } },
  { label: 'Who We Serve', to: { pathname: '/', hash: 'audiences' } },
  { label: 'Food Safety Protocol', to: { pathname: '/', hash: 'safety' } },
];

export const PORTAL_ROLES = ['donor', 'ngo', 'admin'];

export function resolvePortalId(value, fallback = 'donor') {
  const normalized = String(value || '').toLowerCase();
  return PORTAL_ROLES.includes(normalized) ? normalized : fallback;
}

/**
 * Donor Portal Navigation
 */
export const DONOR_NAV = [
  {
    group: 'Overview',
    items: [
      {
        label: 'Dashboard',
        to: '/donor',
        icon: LayoutDashboard,
      },
      {
        label: 'Available Food',
        to: '/donor/available-food',
        icon: ShoppingBag,
      },
      {
        label: 'My Donations',
        to: '/donor/donations',
        icon: UtensilsCrossed,
        badge: '3 Active',
      },
      {
        label: 'History',
        to: '/donor/history',
        icon: History,
      },
    ],
  },
  {
    group: 'Account',
    items: [
      {
        label: 'Profile',
        to: '/donor/profile',
        icon: User,
      },
    ],
  },
];

/**
 * NGO Portal Navigation
 */
export const NGO_NAV = [
  {
    group: 'Redistribution',
    items: [
      {
        label: 'Dashboard',
        to: '/ngo',
        icon: LayoutDashboard,
      },
      {
        label: 'Available Food',
        to: '/ngo/available-food',
        icon: ShoppingBag,
        badge: 'New',
      },
      {
        label: 'My Claims',
        to: '/ngo/claims',
        icon: HeartHandshake,
      },
      {
        label: 'History',
        to: '/ngo/history',
        icon: History,
      },
    ],
  },
  {
    group: 'Account',
    items: [
      {
        label: 'Profile',
        to: '/ngo/profile',
        icon: Building2,
      },
    ],
  },
];

/**
 * Admin Portal Navigation
 */
export const ADMIN_NAV = [
  {
    group: 'Platform Governance',
    items: [
      {
        label: 'Dashboard',
        to: '/admin',
        icon: LayoutDashboard,
      },
      {
        label: 'Users & Roles',
        to: '/admin/users',
        icon: Users,
      },
      {
        label: 'NGO Verification',
        to: '/admin/ngos',
        icon: Building2,
        badge: '4 Pending',
      },
      {
        label: 'All Donations',
        to: '/admin/donations',
        icon: HeartHandshake,
      },
      {
        label: 'Reports & Analytics',
        to: '/admin/reports',
        icon: BarChart3,
      },
    ],
  },
  {
    group: 'System',
    items: [
      {
        label: 'Platform Settings',
        to: '/admin/settings',
        icon: Settings,
      },
    ],
  },
];

/**
 * Helper to fetch navigation configuration by role
 */
export function getNavigationForRole(role = 'donor') {
  switch (resolvePortalId(role)) {
    case 'admin':
      return ADMIN_NAV;
    case 'ngo':
      return NGO_NAV;
    case 'donor':
    default:
      return DONOR_NAV;
  }
}

export default {
  PUBLIC_NAV,
  PUBLIC_FOOTER_NAV,
  PORTAL_ROLES,
  DONOR_NAV,
  NGO_NAV,
  ADMIN_NAV,
  getNavigationForRole,
  resolvePortalId,
};
