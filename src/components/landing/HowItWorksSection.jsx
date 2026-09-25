import React from 'react';
import {
  PackagePlus,
  Network,
  HeartHandshake,
  CheckCircle2,
} from 'lucide-react';
import { Card } from '@/components/cards/Card';

const STEPS = [
  {
    number: '01',
    title: 'Donate',
    subtitle: 'Post Surplus in Minutes',
    description:
      'Donors post available surplus food with important information such as quantity, food type, pickup details, and timing.',
    icon: PackagePlus,
    highlights: [
      'Quick donation listing',
      'Flexible packaging options',
      'Accurate expiry & pickup windows',
    ],
  },
  {
    number: '02',
    title: 'Connect',
    subtitle: 'Automated Partner Matching',
    description:
      'FoodBridge connects the available surplus with suitable nearby NGO and organization partners in real time.',
    icon: Network,
    highlights: [
      'Proximity-based routing',
      'Structured for community organizations',
      'Partner notification workflow',
    ],
  },
  {
    number: '03',
    title: 'Redistribute',
    subtitle: 'Dignified Community Reach',
    description:
      'The NGO or organization claims the donation, coordinates pickup, and the food reaches the intended community.',
    icon: HeartHandshake,
    highlights: [
      'Tracked pickup coordination',
      'Donation status visibility',
      'Transparent redistribution ledger',
    ],
  },
];

function StepCard({ step }) {
  const IconComponent = step.icon;

  return (
    <Card
      variant="default"
      padding="none"
      className="relative z-10 flex flex-col h-full rounded-2xl border border-border bg-surface p-6 sm:p-7 shadow-xs hover:shadow-sm hover:border-primary/40 transition-all duration-200"
    >
      {/* Top Meta: Icon & Step Number */}
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary-light text-primary-dark">
          <IconComponent className="h-6 w-6" aria-hidden="true" />
        </div>
        <span className="font-mono text-xs font-bold text-text-secondary tracking-widest px-2.5 py-1 rounded-md bg-background-subtle border border-border">
          STEP {step.number}
        </span>
      </div>

      {/* Title & Subtitle */}
      <div className="mt-5">
        <h3 className="text-xl font-bold tracking-tight text-text-primary">
          {step.title}
        </h3>
        <p className="text-xs font-semibold text-primary uppercase tracking-wider mt-0.5">
          {step.subtitle}
        </p>
      </div>

      {/* Description */}
      <p className="mt-3 text-sm text-text-secondary leading-relaxed">
        {step.description}
      </p>

      {/* Key Highlights */}
      <ul className="mt-6 pt-5 border-t border-border-subtle space-y-2 text-xs text-text-secondary">
        {step.highlights.map((item, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="relative bg-surface py-16 sm:py-20 lg:py-24 border-t border-border-subtle"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light/60 border border-primary/20 text-primary-dark text-xs font-semibold tracking-wider uppercase mb-3">
            <span>How FoodBridge Works</span>
          </div>

          <h2
            id="how-it-works-heading"
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary leading-tight"
          >
            From surplus to shared impact.
          </h2>

          <p className="mt-3.5 text-base text-text-secondary leading-relaxed">
            FoodBridge simplifies the journey from excess food to community redistribution, removing logistical hurdles between businesses and local non-profits.
          </p>
        </div>

        {/* Steps Grid with Desktop Connector */}
        <div className="relative mt-12 sm:mt-16">
          
          {/* Subtle Desktop Connecting Line between cards */}
          <div
            className="hidden md:block absolute top-[52px] left-[15%] right-[15%] h-px border-t border-dashed border-border-strong/70 z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {STEPS.map((step) => (
              <StepCard key={step.number} step={step} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default HowItWorksSection;
