import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';
import MoltenMetal from '@/components/auth/MoltenMetal';
import { ShieldCheck, ArrowLeft, HeartHandshake } from 'lucide-react';

export function AuthLayout({ children }) {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-background flex flex-col justify-between font-sans selection:bg-primary/20 selection:text-primary-dark">
      <MoltenMetal
        color1="#DDE9DF"
        color2="#168A45"
        color3="#F7F6F1"
        backgroundColor="#EEEDE7"
        colorMode="frost"
        speed={0.16}
        scale={3.4}
        detail={2}
        glow={0.9}
        coreSize={0.055}
        swirl={0.55}
        fold={-0.12}
        blackPoint={0.12}
        brightness={0.72}
        grain={false}
        mouseInteraction={false}
        opacity={0.72}
        lightMode
        className="auth-molten-layer"
      />
      <div className="auth-background-wash" aria-hidden="true" />
      {/* Top Header with Back Link & Logo */}
      <header className="relative z-10 w-full px-4 py-5 sm:px-8">
        <div className="mx-auto flex w-full items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded p-1 text-xs font-semibold text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Back to Home</span>
          </Link>

          <Logo size="md" />
        </div>
      </header>

      {/* Main Centered Content Container */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-8 sm:px-6 sm:py-10">
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
      <footer className="relative z-10 w-full border-t border-border/40 px-4 py-4 text-center text-xs text-text-secondary">
        <p>© {new Date().getFullYear()} FoodBridge Network. Protected under national food safety redistribution acts.</p>
      </footer>
    </div>
  );
}

export default AuthLayout;
