import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Logo } from '@/components/common/Logo';

const NAV_ITEMS = [
  { label: 'How It Works', to: '/#how-it-works' },
  { label: 'Impact', to: '/#impact' },
  { label: 'For Donors', to: '/#donors' },
  { label: 'For NGOs', to: '/#ngos' },
];

export function LandingNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fb-navbar-wrap">
      <nav className="fb-navbar" aria-label="Main navigation">
        <div className="fb-navbar-inner">
          <Logo size="md" className="fb-navbar-logo" />
          <div className="fb-navbar-links">
            {NAV_ITEMS.map((item) => <Link key={item.label} to={item.to} onClick={() => setMenuOpen(false)}>{item.label}</Link>)}
          </div>
          <div className="fb-navbar-actions">
            <Link className="fb-login-link" to="/auth/login">Login</Link>
            <Link className="fb-get-started" to="/auth/register">Get Started <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
          <button
            className="fb-menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="fb-mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
          </button>
        </div>
        {menuOpen && (
          <div className="fb-mobile-menu" id="fb-mobile-menu">
            {NAV_ITEMS.map((item) => <Link key={item.label} to={item.to} onClick={() => setMenuOpen(false)}>{item.label}</Link>)}
            <div className="fb-mobile-menu-actions">
              <Link to="/auth/login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link className="fb-get-started" to="/auth/register" onClick={() => setMenuOpen(false)}>Get Started <ArrowRight size={15} aria-hidden="true" /></Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default LandingNavbar;
