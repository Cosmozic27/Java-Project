import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';
import { AuthBackground } from '@/components/auth/AuthBackground';
import { SwitchMode } from '@/components/switch-mode';
import { ShieldCheck, ArrowLeft, HeartHandshake } from 'lucide-react';
import { cn } from '@/utils/cn';

const AUTH_THEME_STORAGE_KEY = 'foodbridge.public.theme';

export function AuthLayout({ children }) {
  const { pathname } = useLocation();
  const showBackground = pathname.startsWith('/auth');

  const [theme, setTheme] = useState(() => {
    try {
      return window.localStorage.getItem(AUTH_THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(AUTH_THEME_STORAGE_KEY, theme);
    } catch {
      // Keep in-memory if storage is restricted
    }

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }

    return () => {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      document.documentElement.style.colorScheme = '';
    };
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div
      className={cn(
        'auth-theme relative isolate min-h-screen overflow-x-hidden bg-background flex flex-col justify-between font-sans selection:bg-primary/20 selection:text-primary-dark transition-colors duration-200',
        theme === 'dark' && 'dark'
      )}
    >
      {/* Topographic Contour Animated Background */}
      {showBackground && <AuthBackground theme={theme} />}

      <div className="auth-background-wash" aria-hidden="true" />

      {/* Top Header with Back Link, Logo & Top-Right Dark Mode Toggle */}
      <header className="relative z-10 w-full px-4 py-4 sm:px-8 sm:py-5">
        <div className="mx-auto flex w-full items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-6">
            <Link
              to="/"
              className="btn-glass-secondary inline-flex items-center gap-1.5 rounded-lg border border-border/70 px-3 py-1.5 text-xs font-semibold text-text-secondary transition-all hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-xs"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Back to Home</span>
            </Link>

            <Logo size="md" />
          </div>

          {/* Clearly visible theme toggle in the top-right corner */}
          <div className="flex items-center">
            <SwitchMode theme={theme} onToggle={handleToggleTheme} />
          </div>
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
