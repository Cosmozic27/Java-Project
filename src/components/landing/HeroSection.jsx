import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
  Utensils,
  HeartHandshake,
  ArrowDownUp,
  MapPin,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/cards/Card';

export function HeroSection() {
  return (
    <section
      aria-label="FoodBridge Hero"
      className="relative overflow-hidden bg-background pt-8 pb-16 sm:pt-14 sm:pb-20 lg:pt-20 lg:pb-24"
    >
      {/* Subtle Background Pattern Accent */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-35 [radial-gradient(#16A34A_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left / Content Column (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light/70 border border-primary/20 text-primary-dark text-xs font-semibold tracking-wider uppercase">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
              <span>Turn Surplus Into Impact</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.12]">
              Connecting surplus food to{' '}
              <span className="text-primary underline decoration-primary/25 decoration-wavy decoration-from-font underline-offset-4">
                communities in need.
              </span>
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl font-normal">
              FoodBridge connects restaurants, hostels, and event canteens directly with local NGOs in real time—stopping food waste before it happens and getting dignified, fresh meals to those who need them most.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <Button
                asChild
                variant="primary"
                size="lg"
                className="shadow-sm hover:shadow transition-all"
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
                className="hover:border-primary/40 transition-colors"
              >
                <Link to="/auth/register" className="flex items-center justify-center">
                  <span>Find Food</span>
                </Link>
              </Button>
            </div>

            {/* Trust & Product Indicators */}
            <div className="pt-4 border-t border-border-subtle flex flex-wrap items-center gap-y-2.5 gap-x-6 text-xs text-text-secondary">
              <div className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                <span className="font-medium text-text-primary">Structured for community non-profits</span>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                <span>Proximity-based coordination</span>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                <span>Purpose-built for food redistribution</span>
              </div>
            </div>
          </div>

          {/* Right / Visual Column: Food Donation → Connection → Community Impact (5 cols on lg) */}
          <div className="lg:col-span-5 w-full">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Framed Visual Container */}
              <div className="relative rounded-2xl border border-border bg-surface p-5 sm:p-6 shadow-sm">
                
                {/* Visual Header / Live Activity Tag */}
                <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                      Redistribution Flow
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-primary bg-primary-light/60 px-2 py-0.5 rounded-md border border-primary/20">
                    Live Protocol
                  </span>
                </div>

                {/* Flow Sequence */}
                <div className="space-y-3 pt-4">
                  
                  {/* Step 1: Donor Node (Source) */}
                  <Card
                    variant="default"
                    padding="sm"
                    className="border-border/80 hover:border-primary/40 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-lg bg-primary-light text-primary-dark shrink-0">
                        <Utensils className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-bold text-text-primary truncate">
                            1. Surplus Donation Logged
                          </p>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200 shrink-0">
                            Available
                          </span>
                        </div>
                        <p className="text-xs text-text-secondary mt-0.5">
                          Apex Grand Hotel & Banquet
                        </p>
                        <div className="flex items-center gap-3 mt-1.5 text-[11px] text-text-muted">
                          <span className="font-medium text-text-secondary">55 boxed meals</span>
                          <span>•</span>
                          <span>Cold-packed 18m ago</span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Flow Connector Line & Matching Indicator */}
                  <div className="relative flex items-center justify-center py-1">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-0.5 h-full bg-primary/25" />
                    </div>
                    <div className="relative z-10 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-primary/30 text-[11px] font-semibold text-primary shadow-xs">
                      <ArrowDownUp className="h-3 w-3 animate-bounce" aria-hidden="true" />
                      <span>Smart Matching • 1.8 km</span>
                    </div>
                  </div>

                  {/* Step 2: Impact / NGO Partner Node (Destination) */}
                  <Card
                    variant="default"
                    padding="sm"
                    className="border-border/80 hover:border-primary/40 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-lg bg-amber-50 text-amber-700 shrink-0">
                        <HeartHandshake className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-bold text-text-primary truncate">
                            2. Community Redistribution
                          </p>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 shrink-0">
                            Assigned
                          </span>
                        </div>
                        <p className="text-xs text-text-secondary mt-0.5">
                          CareBridge Youth & Family Shelter
                        </p>
                        <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-text-muted">
                          <MapPin className="h-3 w-3 text-text-secondary shrink-0" aria-hidden="true" />
                          <span className="truncate">Volunteer dispatch en route</span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Step 3: Verified Outcome Metric Bar */}
                  <div className="mt-4 pt-3.5 border-t border-border-subtle bg-surface-muted rounded-xl p-3 border border-border/60">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-text-primary">55 Meals</p>
                        <p className="text-[10px] text-text-secondary">Saved today</p>
                      </div>
                      <div className="space-y-0.5 border-x border-border">
                        <p className="text-xs font-bold text-primary">138 kg</p>
                        <p className="text-[10px] text-text-secondary">CO₂ averted</p>
                      </div>
                      <div className="space-y-0.5">
                        <div className="inline-flex items-center justify-center gap-1 text-xs font-bold text-emerald-700">
                          <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                          <span>Complete</span>
                        </div>
                        <p className="text-[10px] text-text-secondary">Handling details</p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Subtle Trust Stamp */}
                <div className="mt-3.5 flex items-center justify-between text-[11px] text-text-muted px-1">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                    <span>Real-time impact ledger</span>
                  </div>
                  <span>Zero-waste protocol</span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;
