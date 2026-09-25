import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';
import { ShieldCheck, ArrowLeft, HeartHandshake } from 'lucide-react';

export function AuthLayout({
  children,
  title = 'Welcome to FoodBridge',
  subtitle = 'Sign in or register your organization to join the surplus food redistribution network.',
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-between font-sans selection:bg-primary/20 selection:text-primary-dark">
      {/* Top Header with Back Link & Logo */}
      <header className="w-full px-4 sm:px-8 py-5 flex items-center justify-between">
        <Logo size="md" />

        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded p-1"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Main Centered Content Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-auto">
        <div className="w-full max-w-md space-y-6">
          {/* Header titles */}
          <div className="text-center space-y-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs sm:text-sm text-text-secondary max-w-sm mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {/* Form Card Slot */}
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-xs">
            {children || <Outlet />}
          </div>

          {/* Trust Banner */}
          <div className="flex items-center justify-center gap-4 text-xs text-text-secondary pt-2">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>Verified Non-Profits</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <HeartHandshake className="h-4 w-4 text-primary" />
              <span>Safe Food Redistribution</span>
            </div>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="w-full px-4 py-4 text-center text-xs text-text-secondary border-t border-border/40">
        <p>© {new Date().getFullYear()} FoodBridge Network. Protected under national food safety redistribution acts.</p>
      </footer>
    </div>
  );
}

export default AuthLayout;
