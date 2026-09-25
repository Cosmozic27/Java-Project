import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * Main application layout wrapper
 */
export function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col font-sans">
      <main className="flex-1 flex flex-col">
        {children || <Outlet />}
      </main>
    </div>
  );
}

export default MainLayout;
