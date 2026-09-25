import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  History,
  PackagePlus,
  Utensils,
} from 'lucide-react';
import { PageContent } from '@/components/common/PageContent';
import { PageHeader } from '@/components/common/PageHeader';
import { PageSection } from '@/components/common/PageSection';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/cards/Card';
import { StatCard } from '@/components/cards/StatCard';
import { StatusBadge } from '@/components/data-display/StatusBadge';
import { DonationCard } from '@/components/donor';
import {
  DONATION_STATUS_LABELS,
  DONOR_ACTIVITY,
  DONOR_STATS,
  MOCK_DONATIONS,
} from '@/constants/donorData';

const ACTIVE_STATUSES = new Set(['AVAILABLE', 'CLAIMED', 'PICKUP_PENDING']);
const activityIcons = {
  primary: PackagePlus,
  info: ClipboardList,
  warning: CalendarClock,
  success: CheckCircle2,
};

export function DonorDashboard() {
  const activeDonations = MOCK_DONATIONS.filter((donation) => ACTIVE_STATUSES.has(donation.status));

  return (
    <PageContent spacing="loose">
      <PageHeader
        title="Good afternoon, Central Hostel"
        description="Keep your surplus food moving to local organizations that can put it to work."
        badge={
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary-light px-2.5 py-0.5 text-xs font-semibold text-primary-dark">
            Donor workspace
          </span>
        }
        actions={
          <Button asChild variant="primary" size="md" leftIcon={<PackagePlus className="h-4 w-4" />}>
            <Link to="/donor/donations/new">Post Surplus Food</Link>
          </Button>
        }
      >
        <p className="text-xs text-text-muted">Illustrative workspace data for the current prototype.</p>
      </PageHeader>

      <section aria-labelledby="donor-impact-heading" className="space-y-4">
        <div>
          <h2 id="donor-impact-heading" className="text-base font-bold text-text-primary">Your impact snapshot</h2>
          <p className="mt-1 text-xs text-text-secondary">Use these mock metrics to understand the future donor view.</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {DONOR_STATS.map((stat, index) => {
            const icons = [Utensils, ClipboardList, CheckCircle2, PackagePlus];
            return (
              <StatCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                description={stat.description}
                icon={icons[index]}
                variant={index === 3 ? 'accent' : index === 2 ? 'primary' : 'default'}
              />
            );
          })}
        </div>
      </section>

      <PageSection
        title="Active donation activity"
        description="A quick view of listings currently moving through the redistribution flow."
        action={
          <Button asChild variant="outline" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
            <Link to="/donor/donations">View all donations</Link>
          </Button>
        }
      >
        <div className="grid gap-4 xl:grid-cols-2">
          {activeDonations.map((donation) => (
            <DonationCard key={donation.id} donation={donation} />
          ))}
        </div>
      </PageSection>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <PageSection title="Quick actions" description="Common donor tasks, kept close at hand.">
          <div className="grid gap-3 sm:grid-cols-3">
            <Button asChild variant="primary" className="justify-start" leftIcon={<PackagePlus className="h-4 w-4" />}>
              <Link to="/donor/donations/new">Post surplus</Link>
            </Button>
            <Button asChild variant="outline" className="justify-start" leftIcon={<ClipboardList className="h-4 w-4" />}>
              <Link to="/donor/donations">Manage donations</Link>
            </Button>
            <Button asChild variant="outline" className="justify-start" leftIcon={<History className="h-4 w-4" />}>
              <Link to="/donor/history">View history</Link>
            </Button>
          </div>
        </PageSection>

        <PageSection title="Recent activity" description="A restrained view of recent local prototype events.">
          <Card padding="sm">
            <ol className="space-y-4">
              {DONOR_ACTIVITY.map((activity) => {
                const Icon = activityIcons[activity.tone] || ClipboardList;
                return (
                  <li key={`${activity.label}-${activity.time}`} className="flex gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-text-primary">{activity.label}</p>
                        <span className="text-[11px] text-text-muted">{activity.time}</span>
                      </div>
                      <p className="mt-0.5 text-xs leading-relaxed text-text-secondary">{activity.detail}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </Card>
        </PageSection>
      </div>

      <Card variant="subtle" padding="sm" className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-text-primary">Safe handling remains a shared responsibility.</p>
          <p className="mt-1 text-xs text-text-secondary">Review your storage and pickup details before posting each listing.</p>
        </div>
        <StatusBadge status={DONATION_STATUS_LABELS.PICKUP_PENDING} label="Pickup coordination" showIcon size="sm" />
      </Card>
    </PageContent>
  );
}

export default DonorDashboard;
