import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { Button } from '@/components/common/Button';
import { PUBLIC_NAV } from '@/constants/navigation';
import { cn } from '@/utils/cn';

function isHashDestination(to) {
  if (typeof to === 'string') return to.includes('#');
  return Boolean(to?.hash);
}

function hashValue(to) {
  if (typeof to === 'string') {
    const index = to.indexOf('#');
    return index >= 0 ? to.slice(index + 1) : '';
  }
  return String(to?.hash || '').replace(/^#/, '');
}

function PublicNavItem({ link, className, onClick }) {
  const location = useLocation();
  const usesHash = isHashDestination(link.to);
  const currentHash = location.hash.replace(/^#/, '');
  const isSectionActive =
    usesHash && location.pathname === '/' && currentHash === hashValue(link.to);

  const styles = (active) =>
    cn(
      className,
      active
        ? 'text-primary bg-primary-light/40 font-semibold'
        : 'text-text-secondary hover:text-text-primary hover:bg-background-subtle'
    );

  if (usesHash) {
    return (
      <Link to={link.to} onClick={onClick} className={styles(isSectionActive)}>
        {link.label}
      </Link>
    );
  }

  return (
    <NavLink
      to={link.to}
      onClick={onClick}
      className={({ isActive }) => styles(isActive)}
    >
      {link.label}
    </NavLink>
  );
}

export function Navbar({
  navLinks = PUBLIC_NAV,
  onLoginClick,
  onRegisterClick,
  user,
  userMenu,
  sticky = true,
  className = '',
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav
      className={cn(
        'w-full border-b border-border bg-surface/95 backdrop-blur-md transition-all duration-200',
        sticky && 'sticky top-0 z-40',
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <Logo size="md" />

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link, idx) => (
                <PublicNavItem
                  key={idx}
                  link={link}
                  className="px-3 py-2 text-sm font-medium rounded-lg transition-colors select-none"
                />
              ))}
            </div>
          </div>

          {/* Desktop Right Actions (Auth / User) */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              userMenu || (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-text-primary">
                    {user.name || 'Account'}
                  </span>
                </div>
              )
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLoginClick}
                  asChild
                >
                  <Link to="/auth/login">Sign In</Link>
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={onRegisterClick}
                  rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                  asChild
                >
                  <Link to="/auth/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4 text-text-primary" />
              ) : (
                <Menu className="h-4 w-4 text-text-primary" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-surface px-4 pt-3 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navLinks.map((link, idx) => (
              <PublicNavItem
                key={idx}
                link={link}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
              />
            ))}
          </div>

          <div className="pt-3 border-t border-border flex flex-col gap-2">
            <Link
              to="/auth/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-sm font-medium text-text-primary border border-border rounded-lg hover:bg-background-subtle"
            >
              Sign In
            </Link>
            <Link
              to="/auth/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-dark"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
