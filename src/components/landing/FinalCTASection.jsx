import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/common/Button';

export function FinalCTASection() {
  return (
    <section
      id="get-started"
      aria-labelledby="get-started-heading"
      className="relative bg-surface py-16 sm:py-20 lg:py-24 border-t border-border-subtle"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="fb-final-cta-panel relative rounded-3xl bg-[#0B1F17] text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-md">
          <div
            className="pointer-events-none absolute inset-0 opacity-15 [radial-gradient(#16A34A_1px,transparent_1px)] [background-size:20px_20px]"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-accent-light text-xs font-semibold tracking-wider uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
              <span>Ready to make surplus count?</span>
            </div>

            <h2
              id="get-started-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight"
            >
              Turn excess food into <span className="text-accent">meaningful community impact.</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
              Turn excess food into meaningful community impact with FoodBridge.
            </p>

            <p className="text-xs sm:text-sm text-slate-400">
              Select your organization role—<strong className="text-slate-200">Food Donor</strong> or{' '}
              <strong className="text-slate-200">NGO Partner</strong>—during free account registration.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 pt-2">
              <Button asChild variant="primary" size="lg" className="shadow-sm font-semibold hover:bg-primary-dark">
                <Link to="/auth/register" className="flex items-center justify-center">
                  <span>Get Started</span>
                  <ArrowRight className="h-4 w-4 ml-2 shrink-0" aria-hidden="true" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-transparent border-slate-700 text-white hover:bg-white/10 hover:border-slate-500 font-medium"
              >
                <Link to="/auth/login" className="flex items-center justify-center">
                  <span>Login</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FinalCTASection;
