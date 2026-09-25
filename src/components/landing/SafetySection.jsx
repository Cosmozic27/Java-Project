import React from 'react';
import {
  Clock3,
  CalendarClock,
  Thermometer,
  Info,
  ShieldCheck,
} from 'lucide-react';
import { Card } from '@/components/cards/Card';
import { Reveal, RevealGroup } from '@/components/motion';

const SAFETY_ITEMS = [
  {
    id: 'prepared-time',
    title: 'Prepared Time',
    subtitle: 'Preparation Timestamp',
    description:
      'Donors record precisely when surplus meals were cooked or packaged, providing timeline visibility from commercial kitchen to collection.',
    icon: Clock3,
  },
  {
    id: 'consume-before',
    title: 'Consume Before',
    subtitle: 'Use-By Window',
    description:
      'Donors specify the intended consume-before or use-by timeframe where applicable, helping receiving partners prioritize prompt distribution.',
    icon: CalendarClock,
  },
  {
    id: 'storage-conditions',
    title: 'Storage Conditions',
    subtitle: 'Handling Guidance',
    description:
      'Donors communicate relevant storage parameters—such as hot holding, cold refrigeration, or ambient shelf storage—during transit.',
    icon: Thermometer,
  },
  {
    id: 'allergen-info',
    title: 'Allergen Information',
    subtitle: 'Ingredient Transparency',
    description:
      'Donors disclose known ingredient and allergen details so receiving community organizations can make informed, safe distribution decisions.',
    icon: Info,
  },
];

function SafetyItem({ item }) {
  const IconComponent = item.icon;

  return (
    <Card
      variant="default"
      padding="none"
      className="flex flex-col h-full rounded-2xl border border-border bg-surface p-6 shadow-xs hover:border-primary/40 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-primary-light text-primary-dark">
          <IconComponent className="h-5 w-5" aria-hidden="true" />
        </div>
        <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
          {item.subtitle}
        </span>
      </div>

      <h3 className="text-lg font-bold text-text-primary mt-4 tracking-tight">
        {item.title}
      </h3>
      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mt-2">
        {item.description}
      </p>
    </Card>
  );
}

export function SafetySection() {
  return (
    <section
      id="safety"
      aria-labelledby="safety-heading"
      className="relative bg-background-subtle py-16 sm:py-20 lg:py-24 border-t border-border"
    >
      <Reveal as="div" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light/70 border border-primary/20 text-primary-dark text-xs font-semibold tracking-wider uppercase mb-3">
            <span>Trust & Food Safety</span>
          </div>

          <h2
            id="safety-heading"
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary leading-tight"
          >
            Better information leads to safer food redistribution.
          </h2>

          <p className="mt-3.5 text-base text-text-secondary leading-relaxed">
            FoodBridge is designed to make important food and pickup information visible to the organizations coordinating collection, helping them make informed decisions.
          </p>
        </div>

        {/* 4 Information Items Grid */}
        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 sm:mt-16 items-stretch">
          {SAFETY_ITEMS.map((item) => (
            <SafetyItem key={item.id} item={item} />
          ))}
        </RevealGroup>

        {/* Responsibility Notice */}
        <div className="mt-10 sm:mt-12 rounded-xl border border-border bg-surface p-5 sm:p-6 text-center max-w-3xl mx-auto shadow-xs">
          <div className="flex items-start sm:items-center justify-center gap-3">
            <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed text-left sm:text-center">
              <span className="font-semibold text-text-primary">Shared Responsibility Framework:</span>{' '}
              FoodBridge provides the information framework; donors and receiving organizations remain responsible for safe handling, storage, transport, and compliance with applicable requirements.
            </p>
          </div>
        </div>

      </Reveal>
    </section>
  );
}

export default SafetySection;
