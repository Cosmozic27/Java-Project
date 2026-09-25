import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import AppShell from '@/pages/AppShell';

/**
 * Primary routing configuration for FoodBridge.
 * Future routes (auth, donor, ngo, admin) will be plugged in modularly.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <AppShell />,
      },
    ],
  },
]);

export default router;
