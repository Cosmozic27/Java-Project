import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';
import { ShieldCheck, ArrowLeft, HeartHandshake } from 'lucide-react';

export function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-between font-sans selection:bg-primary/20 selection:text-primary-dark">
      {/* Top Header with Back Link & Logo */}
      <header className="w-full px-4 py-5 sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Logo size="md" />

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded p-1 text-xs font-semibold text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Centered Content Container */}
      <main className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 sm:py-10">
        <div className="w-full max-w-md">
          {children || <Outlet />}

          {/* Trust Banner */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-6 text-center text-xs text-text-secondary">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>Verified Non-Profits</span>
            </div>
            <span aria-hidden="true">•</span>
            <div className="flex items-center gap-1.5">
              <HeartHandshake className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>Safe Food Redistribution</span>
            </div>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="w-full border-t border-border/40 px-4 py-4 text-center text-xs text-text-secondary">
        <p>© {new Date().getFullYear()} FoodBridge Network. Protected under national food safety redistribution acts.</p>
      </footer>
    </div>
  );
}

export default AuthLayout;
