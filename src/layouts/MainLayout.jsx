import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/navigation/Navbar';

/**
 * Main application layout wrapper with responsive sticky Navbar.
 */
export function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col font-sans">
      <Navbar sticky />
      <main className="flex-1 flex flex-col">
        {children || <Outlet />}
      </main>
    </div>
  );
}

export default MainLayout;
