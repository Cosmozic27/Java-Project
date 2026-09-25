import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { PageSection } from '@/components/common/PageSection';
import { PageContent } from '@/components/common/PageContent';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/cards/Card';
import { StatCard } from '@/components/cards/StatCard';
import { Button } from '@/components/common/Button';
import { Plus, UtensilsCrossed, Package, HeartHandshake, CheckCircle2 } from 'lucide-react';

export function DonorDashboardPlaceholder() {
  return (
    <PageContent>
      <PageHeader
        title="Donor Portal Overview"
        description="Manage surplus food donations, log new cooked or packaged batches, and track NGO pickup requests."
        badge={
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-light text-primary-dark border border-primary/20">
            Donor Dashboard
          </span>
        }
        actions={
          <Button variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
            Post Surplus Food
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Active Listings"
          value="3 Batches"
          icon={Package}
          trend={{ value: '+1 today', isPositive: true, label: 'ready for pickup' }}
        />
        <StatCard
          title="Food Donated"
          value="1,840 kg"
          icon={UtensilsCrossed}
          trend={{ value: '+15.2%', isPositive: true, label: 'vs last month' }}
        />
        <StatCard
          title="NGO Partners Connected"
          value="14 NGOs"
          icon={HeartHandshake}
          variant="accent"
        />
      </div>

      <PageSection
        title="Active Redistribution Queue"
        description="Real-time pickup coordination with verified NGOs."
      >
        <Card variant="default">
          <CardHeader>
            <CardTitle>Surplus Batch #4092 — Cooked Meals</CardTitle>
            <CardDescription>Prepared by Central Hostel Dining • Ready for pickup</CardDescription>
          </CardHeader>
          <CardContent className="text-xs text-text-secondary space-y-2">
            <div className="flex items-center gap-2 text-primary font-medium">
              <CheckCircle2 className="h-4 w-4" />
              <span>Assigned to "Hope Community Kitchen" — Driver ETA 25 mins</span>
            </div>
            <p>Layout and navigation placeholder verified for Donor Portal.</p>
          </CardContent>
        </Card>
      </PageSection>
    </PageContent>
  );
}

export default DonorDashboardPlaceholder;
