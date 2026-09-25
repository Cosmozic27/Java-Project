import React from 'react';
import { Link } from 'react-router-dom';
import {
  UtensilsCrossed,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/cards/Card';
import { Reveal, RevealGroup } from '@/components/motion';

const AUDIENCES = [
  {
    id: 'donors',
    badge: 'Food Providers & Businesses',
    title: 'For Food Donors',
    description:
      'Turn edible surplus into meaningful community impact instead of letting safe, nutritious food go to waste.',
    audiences: [
      'Restaurants',
      'Hotels',
      'College Canteens',
      'Hostels',
      'Caterers & Events',
      'Food Businesses',
    ],
    benefits: [
      'Post surplus food quickly with guided quantity and category inputs',
      'Provide packaging, temperature, and safe pickup timing details',
      'Reach registered nearby community organizations on the platform',
      'Track donation status and redistribution completion',
    ],
    workflow: [
      { step: '1', label: 'Post' },
      { step: '2', label: 'Match' },
      { step: '3', label: 'Pickup' },
    ],
    ctaText: 'Donate Surplus Food',
    ctaLink: '/auth/register',
    ctaVariant: 'primary',
    icon: UtensilsCrossed,
    headerAccentClass: 'bg-primary-light text-primary-dark',
  },
  {
    id: 'ngos',
    badge: 'Non-Profits & Charities',
    title: 'For NGOs & Community Organizations',
    description:
      'Discover fresh surplus food from local businesses, claim donations with a single click, and coordinate safe collection.',
    audiences: [
      'Registered NGOs',
      'Community Kitchens',
      'Youth & Family Shelters',
      'Food Pantries',
      'Local Relief Charities',
    ],
    benefits: [
      'Discover available surplus nearby from registered food businesses',
      'Review food items, packaging, dietary flags, and pickup windows',
      'Claim suitable donations matching your capacity without delays',
      'Coordinate volunteer pickup and verify direct community delivery',
    ],
    workflow: [
      { step: '1', label: 'Discover' },
      { step: '2', label: 'Claim' },
      { step: '3', label: 'Collect' },
    ],
    ctaText: 'Find Surplus Food',
    ctaLink: '/auth/register',
    ctaVariant: 'outline',
    icon: HeartHandshake,
    headerAccentClass: 'bg-emerald-100 text-emerald-800',
  },
];

function AudiencePanel({ panel }) {
  const IconComponent = panel.icon;

  return (
    <Card
      variant="default"
      padding="none"
      className="flex flex-col h-full rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-xs hover:shadow-sm hover:border-primary/40 transition-all duration-200"
    >
      {/* Top Header: Icon & Badge */}
      <div className="flex items-center justify-between gap-3">
        <div
          className={`flex items-center justify-center h-12 w-12 rounded-xl shrink-0 ${panel.headerAccentClass}`}
        >
          <IconComponent className="h-6 w-6" aria-hidden="true" />
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-background-subtle border border-border text-text-secondary tracking-wide">
          {panel.badge}
        </span>
      </div>

      {/* Title & Description */}
      <div className="mt-5">
        <h3 className="text-2xl font-bold tracking-tight text-text-primary">
          {panel.title}
        </h3>
        <p className="mt-2 text-sm text-text-secondary leading-relaxed">
          {panel.description}
        </p>
      </div>

      {/* Target Audience Tags */}
      <div className="mt-4 pt-4 border-t border-border-subtle">
        <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted mb-2">
          Who This Serves
        </p>
        <div className="flex flex-wrap gap-1.5">
          {panel.audiences.map((item) => (
            <span
              key={item}
              className="inline-flex items-center px-2 py-0.5 rounded-md bg-background-subtle border border-border/80 text-[11px] font-medium text-text-secondary"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Workflow Process Strip */}
      <div className="rounded-xl bg-background-subtle border border-border p-3.5 my-5">
        <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">
          Redistribution Journey
        </p>
        <div className="flex items-center justify-between gap-1.5 sm:gap-2">
          {panel.workflow.map((item, idx) => (
            <React.Fragment key={item.label}>
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="flex items-center justify-center h-5 w-5 rounded-full bg-primary text-white text-[10px] font-bold shrink-0">
                  {item.step}
                </span>
                <span className="text-xs font-semibold text-text-primary truncate">
                  {item.label}
                </span>
              </div>
              {idx < panel.workflow.length - 1 && (
                <ArrowRight className="h-3 w-3 text-text-muted shrink-0" aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Key Benefits */}
      <ul className="space-y-2.5 my-2 text-sm text-text-secondary">
        {panel.benefits.map((benefit, idx) => (
          <li key={idx} className="flex items-start gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
            <span className="leading-snug">{benefit}</span>
          </li>
        ))}
      </ul>

      {/* CTA Footer */}
      <div className="mt-auto pt-6 border-t border-border-subtle">
        <Button asChild variant={panel.ctaVariant} size="lg" fullWidth>
          <Link to={panel.ctaLink} className="flex items-center justify-center">
            <span>{panel.ctaText}</span>
            <ArrowRight className="h-4 w-4 ml-2 shrink-0" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}

export function AudienceSection() {
  return (
    <section
      id="audiences"
      aria-labelledby="audiences-heading"
      className="relative bg-surface py-16 sm:py-20 lg:py-24 border-t border-border-subtle"
    >
      <Reveal as="div" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light/60 border border-primary/20 text-primary-dark text-xs font-semibold tracking-wider uppercase mb-3">
            <span>Built for Both Sides</span>
          </div>

          <h2
            id="audiences-heading"
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary leading-tight"
          >
            One platform. Two ways to create impact.
          </h2>

          <p className="mt-3.5 text-base text-text-secondary leading-relaxed">
            FoodBridge connects organizations with surplus food to community organizations that can help redistribute it responsibly.
          </p>
        </div>

        {/* Two Complementary Audience Panels */}
        <RevealGroup className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 sm:mt-16 items-stretch">
          {AUDIENCES.map((panel) => (
            <AudiencePanel key={panel.id} panel={panel} />
          ))}
        </RevealGroup>

      </Reveal>
    </section>
  );
}

export default AudienceSection;
