import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Heart, Leaf } from 'lucide-react';
import { Logo } from '@/components/common/Logo';

const FOOTER_LINKS = [
  { label: 'How it works', to: '/#how-it-works' },
  { label: 'Impact', to: '/#impact' },
  { label: 'For donors', to: '/#donors' },
  { label: 'For NGOs', to: '/#ngos' },
];

export function LandingFooter() {
  return (
    <footer className="fb-footer">
      <div className="fb-footer-inner">
        <div className="fb-footer-main">
          <div className="fb-footer-brand">
            <Logo size="md" />
            <p>Good food deserves a second destination. We help local businesses and community organizations make that connection.</p>
            <span className="fb-footer-note"><Leaf size={15} aria-hidden="true" /> A kinder route for good food</span>
          </div>
          <div className="fb-footer-column">
            <h2>Explore</h2>
            {FOOTER_LINKS.map((item) => <Link key={item.label} to={item.to}>{item.label}</Link>)}
          </div>
          <div className="fb-footer-column">
            <h2>Join the network</h2>
            <Link to="/auth/register">Create an account <ArrowUpRight size={14} aria-hidden="true" /></Link>
            <Link to="/auth/login">Sign in <ArrowUpRight size={14} aria-hidden="true" /></Link>
          </div>
        </div>
        <div className="fb-footer-bottom">
          <span>© {new Date().getFullYear()} FoodBridge</span>
          <span>Built with care for communities and the planet <Heart size={13} aria-hidden="true" /></span>
        </div>
      </div>
    </footer>
  );
}

export default LandingFooter;
