import React, { lazy, Suspense } from 'react';
import { motion, useReducedMotion as useFramerReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDownRight, ArrowRight, Building2, HeartHandshake, PackageCheck, Sparkles } from 'lucide-react';
import { Reveal } from '@/components/motion';

const FoodBridgeScene = lazy(() => import('./FoodBridgeScene'));

export function HeroSection() {
  const reducedMotion = useFramerReducedMotion();

  return (
    <section className="fb-hero" aria-labelledby="fb-hero-heading">
      <div className="fb-hero-inner">
        <Reveal className="fb-hero-copy" y={12} scale={1}>
          <div className="fb-eyebrow"><span className="fb-eyebrow-pulse" aria-hidden="true" /><Sparkles size={14} aria-hidden="true" /> Food rescue, connected</div>
          <h1 id="fb-hero-heading">Turn surplus food <span>into <em>impact.</em></span></h1>
          <p className="fb-hero-description">
            FoodBridge links surplus from local businesses with community organizations ready to collect and share it.
          </p>
          <div className="fb-hero-actions">
            <Link className="fb-cta-primary" to="/auth/register">Donate Surplus Food <ArrowRight size={17} aria-hidden="true" /></Link>
            <Link className="fb-cta-secondary" to="/auth/register">Find Food <ArrowDownRight size={16} aria-hidden="true" /></Link>
          </div>
          <div className="fb-hero-proof" aria-label="FoodBridge network highlights">
            <span><Building2 size={16} aria-hidden="true" /> Restaurants & hostels</span>
            <i aria-hidden="true" />
            <span><HeartHandshake size={16} aria-hidden="true" /> Community partners</span>
          </div>
          <a className="fb-scroll-cue" href="#how-it-works"><span>See how the connection works</span><span aria-hidden="true">↓</span></a>
        </Reveal>

        <motion.figure
          className="fb-scene-stage"
          initial={reducedMotion ? false : { opacity: 0, y: 16, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="fb-scene-wash" aria-hidden="true" />
          <div className="fb-scene-canvas">
            <Suspense fallback={<div className="fb-scene-loading" aria-hidden="true"><i /><i /><i /><span /></div>}>
              <FoodBridgeScene reducedMotion={Boolean(reducedMotion)} />
            </Suspense>
          </div>
          <div className="fb-scene-caption"><span className="fb-caption-dot" aria-hidden="true" /> THE FOODBRIDGE NETWORK <span>Illustrative ecosystem</span></div>

          <div className="fb-impact-float fb-impact-meals">
            <span className="fb-float-icon"><PackageCheck size={17} aria-hidden="true" /></span>
            <span><strong>24 meals</strong><small>available for collection</small></span>
            <span className="fb-float-spark" aria-hidden="true">↗</span>
          </div>
          <div className="fb-impact-float fb-impact-partners">
            <span className="fb-partner-dots" aria-hidden="true"><i /><i /><i /></span>
            <span><strong>3 NGO partners</strong><small>connected to a community hub</small></span>
          </div>
          <div className="fb-pickup-pill"><span className="fb-pickup-pulse" aria-hidden="true" /> Pickup in progress <span className="fb-pickup-arrow" aria-hidden="true">→</span></div>
          <figcaption className="sr-only">A low-poly miniature neighborhood shows restaurant and hostel donations moving as food parcels along connected routes through a FoodBridge relay to a community hub in collection vans.</figcaption>
        </motion.figure>
      </div>
    </section>
  );
}

export default HeroSection;
