import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Navbar } from '@/components/navigation/Navbar';
import { Logo } from '@/components/common/Logo';
import { PUBLIC_FOOTER_NAV } from '@/constants/navigation';
import { Heart, Globe } from 'lucide-react';

export function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col font-sans">
      {/* Sticky Top Navbar */}
      <Navbar sticky />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {children || <Outlet />}
      </main>

      {/* Professional Footer Structure */}
      <footer className="border-t border-border bg-surface mt-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Column */}
            <div className="md:col-span-2 space-y-3">
              <Logo size="md" showTagline />
              <p className="text-xs text-text-secondary max-w-md leading-relaxed">
                FoodBridge connects verified food donors—canteens, hostels, restaurants, and event organizers—with local NGOs and charities to eliminate food waste and fight hunger.
              </p>
              <div className="flex items-center gap-2 text-xs text-primary font-medium">
                <Globe className="h-3.5 w-3.5" />
                <span>Zero Waste Protocol • Verified Redistribution</span>
              </div>
            </div>

            {/* Portal Quick Links */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider">
                Portal Access
              </h3>
              <ul className="space-y-2 text-xs text-text-secondary">
                <li>
                  <Link to="/donor" className="hover:text-primary transition-colors">
                    Donor Portal
                  </Link>
                </li>
                <li>
                  <Link to="/ngo" className="hover:text-primary transition-colors">
                    NGO Hub
                  </Link>
                </li>
                <li>
                  <Link to="/admin" className="hover:text-primary transition-colors">
                    Admin Governance
                  </Link>
                </li>
                <li>
                  <Link to="/auth/login" className="hover:text-primary transition-colors">
                    Sign In
                  </Link>
                </li>
              </ul>
            </div>

            {/* Platform & Impact */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider">
                Platform
              </h3>
              <ul className="space-y-2 text-xs text-text-secondary">
                {PUBLIC_FOOTER_NAV.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <span className="text-text-muted">Security & Compliance</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-border/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-secondary">
            <p>© {new Date().getFullYear()} FoodBridge Platform. All rights reserved.</p>
            <div className="flex items-center gap-1 text-text-secondary">
              <span>Built with care for a sustainable future</span>
              <Heart className="h-3.5 w-3.5 text-danger inline ml-1 fill-danger/20" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PublicLayout;
