import React, { useEffect } from 'react';
import {
  Utensils,
  PackageCheck,
  Building2,
  Scale,
  Info,
} from 'lucide-react';
import { useCountUp, useScrollReveal } from '@/hooks/useScrollReveal';
import { Reveal } from '@/components/motion';

const IMPACT_METRICS = [
  {
    numericValue: 12400,
    value: '12.4K+',
    label: 'Meals Rescued',
    description: 'Fresh, nutritious meals redirected to local families and shelters.',
    icon: Utensils,
  },
  {
    numericValue: 2800,
    value: '2.8K+',
    label: 'Food Donations',
    description: 'Completed surplus listings from registered food businesses.',
    icon: PackageCheck,
  },
  {
    numericValue: 180,
    value: '180+',
    label: 'Partner Organizations',
    description: 'Registered community kitchens, charities, and food pantries on the platform.',
    icon: Building2,
  },
  {
    numericValue: 8600,
    value: '8.6T+',
    label: 'Food Diverted',
    description: 'Tons of edible surplus prevented from reaching local landfills.',
    icon: Scale,
  },
];

function ImpactMetricCard({ metric, isLast }) {
  const IconComponent = metric.icon;
  const { ref, isVisible } = useScrollReveal();
  const { value: count, start } = useCountUp(metric.numericValue);

  useEffect(() => {
    if (isVisible) start();
  }, [isVisible, start]);

  const displayValue = count >= metric.numericValue
    ? metric.value
    : `${count.toLocaleString()}${metric.value.endsWith('+') ? '+' : ''}`;

  return (
    <div
      ref={ref}
      className={`group flex flex-col p-6 sm:p-8 lg:py-10 transition-colors ${
        !isLast ? 'lg:border-r lg:border-border' : ''
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-primary-light text-primary-dark transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          <IconComponent className="h-5 w-5" aria-hidden="true" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
          Platform Impact
        </span>
      </div>

      <div className="mt-6">
        <p className="text-4xl sm:text-5xl font-extrabold tracking-tight text-text-primary">
          {displayValue}
        </p>
        <h3 className="text-base font-bold text-text-primary mt-2">
          {metric.label}
        </h3>
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mt-1.5">
          {metric.description}
        </p>
      </div>
    </div>
  );
}

export function ImpactSection() {
  return (
    <section
      id="impact"
      aria-labelledby="impact-heading"
      className="relative bg-background-subtle py-16 sm:py-20 lg:py-24 border-t border-border"
    >
      <Reveal as="div" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light/70 border border-primary/20 text-primary-dark text-xs font-semibold tracking-wider uppercase mb-3">
            <span>Our Impact</span>
          </div>

          <h2
            id="impact-heading"
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary leading-tight"
          >
            Every rescued meal moves us closer to less food waste.
          </h2>

          <p className="mt-3.5 text-base text-text-secondary leading-relaxed">
            FoodBridge is designed to help redirect usable surplus food away from unnecessary waste and toward community organizations.
          </p>
        </div>

        {/* Impact Metrics Container */}
        <div className="mt-12 sm:mt-16 rounded-2xl border border-border bg-surface shadow-xs overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x sm:divide-y-reverse divide-border">
            {IMPACT_METRICS.map((metric, idx) => (
              <ImpactMetricCard
                key={metric.label}
                metric={metric}
                isLast={idx === IMPACT_METRICS.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Clear Illustrative Disclaimer */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-text-muted text-center">
          <Info className="h-3.5 w-3.5 shrink-0 text-text-muted" aria-hidden="true" />
          <span>
            Illustrative impact metrics representing platform capacity and redistribution network targets.
          </span>
        </div>

      </Reveal>
    </section>
  );
}

export default ImpactSection;
