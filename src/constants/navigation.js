import React from 'react';
import {
  LayoutDashboard,
  UtensilsCrossed,
  HeartHandshake,
  History,
  User,
  ShoppingBag,
  PackageCheck,
  Truck,
  Users,
  Building2,
  BarChart3,
  Settings,
  HelpCircle,
} from 'lucide-react';

/**
 * Public navigation links
 */
export const PUBLIC_NAV = [
  { label: 'Available Surplus', to: '/surplus' },
  { label: 'For Donors', to: '/donors' },
  { label: 'For NGOs', to: '/ngos' },
  { label: 'Platform Impact', to: '/impact' },
];

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
        label: 'Donation History',
        to: '/donor/history',
        icon: History,
      },
    ],
  },
  {
    group: 'Account',
    items: [
      {
        label: 'Organization Profile',
        to: '/donor/profile',
        icon: User,
      },
      {
        label: 'Support & FAQs',
        to: '/donor/support',
        icon: HelpCircle,
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
        label: 'Claimed Food',
        to: '/ngo/claimed',
        icon: PackageCheck,
      },
      {
        label: 'Pickup Tracking',
        to: '/ngo/pickups',
        icon: Truck,
        badge: '2 Live',
      },
      {
        label: 'Distribution History',
        to: '/ngo/history',
        icon: History,
      },
    ],
  },
  {
    group: 'Account',
    items: [
      {
        label: 'NGO Profile',
        to: '/ngo/profile',
        icon: Building2,
      },
      {
        label: 'Support',
        to: '/ngo/support',
        icon: HelpCircle,
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
  switch (role.toLowerCase()) {
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
  DONOR_NAV,
  NGO_NAV,
  ADMIN_NAV,
  getNavigationForRole,
};
