import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

// Layouts
import { PublicLayout } from '@/layouts/PublicLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';

// Route guards
import { ProtectedRoute } from '@/routes/ProtectedRoute';

// Public pages
import { LandingPage } from '@/pages/public';
import AppShell from '@/pages/AppShell';

// Auth pages
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage';

// Portal placeholder pages
import { DonorDashboardPlaceholder } from '@/pages/donor/DonorDashboardPlaceholder';
import { NgoDashboardPlaceholder } from '@/pages/ngo/NgoDashboardPlaceholder';
import { AdminDashboardPlaceholder } from '@/pages/admin/AdminDashboardPlaceholder';

/**
 * FoodBridge — centralized router configuration.
 *
 * Route structure:
 *   /                   → PublicLayout  → LandingPage (Hero & public landing shell)
 *   /showcase           → PublicLayout  → AppShell (Phase 2 component showcase)
 *   /auth/login         → AuthLayout    → LoginPage
 *   /auth/register      → AuthLayout    → RegisterPage
 *   /donor/*            → DashboardLayout (role=donor) → Donor portal
 *   /ngo/*              → DashboardLayout (role=ngo)   → NGO portal
 *   /admin/*            → DashboardLayout (role=admin) → Admin portal
 *
 * ProtectedRoute is a structural pass-through;
 * real auth guards will be wired in a future phase.
 *
 * Public marketing paths (/surplus, /donors, /ngos, /impact, /about)
 * are not registered yet. Navbar/footer use in-page hashes on `/`
 * until Phase 4 promotes them to routes.
 */
export const router = createBrowserRouter([
  // ── PUBLIC ROUTES ────────────────────────────────────────────────
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'showcase', element: <AppShell /> },
      // Phase 4: promote PUBLIC_NAV hashes to dedicated public routes.
    ],
  },

  // ── AUTH ROUTES ──────────────────────────────────────────────────
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
    ],
  },

  // ── DONOR PORTAL ─────────────────────────────────────────────────
  {
    path: '/donor',
    element: (
      <ProtectedRoute allowedRoles={['donor']}>
        <DashboardLayout role="donor" />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DonorDashboardPlaceholder /> },
      // Phase 5 will expand: /donor/donations, /donor/available-food, /donor/history, /donor/profile
    ],
  },

  // ── NGO PORTAL ───────────────────────────────────────────────────
  {
    path: '/ngo',
    element: (
      <ProtectedRoute allowedRoles={['ngo']}>
        <DashboardLayout role="ngo" />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <NgoDashboardPlaceholder /> },
      // Phase 6 will expand: /ngo/available-food, /ngo/claimed, /ngo/pickups, /ngo/history, /ngo/profile
    ],
  },

  // ── ADMIN PORTAL ─────────────────────────────────────────────────
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <DashboardLayout role="admin" />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboardPlaceholder /> },
      // Phase 7 will expand: /admin/users, /admin/ngos, /admin/donations, /admin/reports, /admin/settings
    ],
  },
]);

export default router;
