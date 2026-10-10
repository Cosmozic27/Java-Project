import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/common/Button';

export function FinalCTASection() {
  return (
    <section
      id="get-started"
      aria-labelledby="get-started-heading"
      className="relative bg-surface py-16 sm:py-20 lg:py-24 border-t border-border-subtle"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Call to Action Container */}
        <div className="relative rounded-3xl bg-[#0B1F17] text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-md">
          
          {/* Subtle Background Accent Pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-15 [radial-gradient(#16A34A_1px,transparent_1px)] [background-size:20px_20px]"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-accent-light text-xs font-semibold tracking-wider uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
              <span>Ready to Make a Difference?</span>
            </div>

            {/* Main Heading */}
            <h2
              id="get-started-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight"
            >
              Turn surplus food into{' '}
              <span className="text-accent">meaningful impact.</span>
            </h2>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
              Whether you have food to share or communities to support, FoodBridge helps connect surplus with organizations ready to redistribute it responsibly.
            </p>

            {/* Role Selection Clarification */}
            <p className="text-xs sm:text-sm text-slate-400">
              Select your organization role—<strong className="text-slate-200">Food Donor</strong> or{' '}
              <strong className="text-slate-200">NGO Partner</strong>—during free account registration.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 pt-2">
              <Button
                asChild
                variant="primary"
                size="lg"
                className="shadow-sm font-semibold hover:bg-primary-dark"
              >
                <Link to="/auth/register" className="flex items-center justify-center">
                  <span>Donate Surplus Food</span>
                  <ArrowRight className="h-4 w-4 ml-2 shrink-0" aria-hidden="true" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-transparent border-slate-700 text-white hover:bg-white/10 hover:border-slate-500 font-medium"
              >
                <Link to="/auth/register" className="flex items-center justify-center">
                  <span>Find Surplus Food</span>
                </Link>
              </Button>
            </div>

            {/* Product Characteristics Footnote */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-400">
              <div className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-accent shrink-0" aria-hidden="true" />
                <span>Clear donation information</span>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-accent shrink-0" aria-hidden="true" />
                <span>Responsible pickup coordination</span>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-accent shrink-0" aria-hidden="true" />
                <span>Purpose-built for food redistribution</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default FinalCTASection;
