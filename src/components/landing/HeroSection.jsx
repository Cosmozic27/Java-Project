import React from 'react';
import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HeroSection({ chapter }) {
  return (
    <div className="fb-story-overlay" aria-live="polite" aria-atomic="true">
      <div key={chapter.id} className={`fb-story-copy${chapter.final ? ' is-final' : ''}`}>
        <div className="fb-story-eyebrow"><span aria-hidden="true" />{chapter.eyebrow}</div>
        <h1>{chapter.title}</h1>
        <p>{chapter.description}</p>
        {chapter.final && (
          <div className="fb-story-actions">
            <Link className="fb-cinematic-cta" to="/auth/register">Get Started <ArrowRight size={17} aria-hidden="true" /></Link>
            <Link className="fb-cinematic-link" to="/#how-it-works">See How It Works <ArrowDownRight size={16} aria-hidden="true" /></Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeroSection;
