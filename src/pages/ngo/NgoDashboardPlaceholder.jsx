import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { PageSection } from '@/components/common/PageSection';
import { PageContent } from '@/components/common/PageContent';
import { Card, CardHeader, CardTitle, CardDescription, CardContent as CardBody } from '@/components/cards/Card';
import { StatCard } from '@/components/cards/StatCard';
import { Button } from '@/components/common/Button';
import { StatusBadge } from '@/components/data-display/StatusBadge';
import {
  PackageCheck,
  Truck,
  History,
  HeartHandshake,
  ArrowRight,
} from 'lucide-react';

export function NgoDashboardPlaceholder() {
  return (
    <PageContent>
      <PageHeader
        title="NGO Hub Overview"
        description="Browse available surplus food, manage claims, and coordinate pickups in your redistribution area."
        badge={
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-light text-primary-dark border border-primary/20">
            NGO Partner Dashboard
          </span>
        }
        actions={
          <Button variant="primary" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
            Browse Available Food
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Active Claims"
          value="4 Batches"
          icon={PackageCheck}
          trend={{ value: '+2 today', isPositive: true, label: 'pending pickup' }}
        />
        <StatCard
          title="Live Pickups"
          value="2 In Transit"
          icon={Truck}
          variant="accent"
          trend={{ value: 'On schedule', isPositive: true }}
        />
        <StatCard
          title="Meals Distributed"
          value="6,840"
          icon={HeartHandshake}
          variant="primary"
          trend={{ value: '+11.4%', isPositive: true, label: 'this month' }}
        />
      </div>

      <PageSection
        title="Recent Redistribution Activity"
        description="Track your NGO's recent pickup completions and active claims."
        action={
          <Button variant="outline" size="sm" leftIcon={<History className="h-3.5 w-3.5" />}>
            View Full History
          </Button>
        }
      >
        <Card variant="default">
          <CardHeader>
            <CardTitle>Surplus Batch #4088 — Rice & Vegetable Curry</CardTitle>
            <CardDescription>
              Donated by Campus Hostel Block C · Claimed 35 minutes ago
            </CardDescription>
          </CardHeader>
          <CardBody className="flex items-center gap-3">
            <StatusBadge status="Pickup Pending" showIcon size="md" />
            <span className="text-xs text-text-secondary">
              Layout and navigation placeholder verified for NGO Portal.
            </span>
          </CardBody>
        </Card>
      </PageSection>
    </PageContent>
  );
}

export default NgoDashboardPlaceholder;
