import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { PageSection } from '@/components/common/PageSection';
import { PageContent } from '@/components/common/PageContent';
import { Card, CardHeader, CardTitle, CardDescription, CardContent as CardBody } from '@/components/cards/Card';
import { StatCard } from '@/components/cards/StatCard';
import { Button } from '@/components/common/Button';
import { StatusBadge } from '@/components/data-display/StatusBadge';
import { Avatar } from '@/components/data-display/Avatar';
import {
  Users,
  Building2,
  HeartHandshake,
  BarChart3,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

export function AdminDashboardPlaceholder() {
  return (
    <PageContent>
      <PageHeader
        title="Platform Governance"
        description="Monitor platform-wide activity, verify NGO credentials, and manage donor accounts and redistribution compliance."
        badge={
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <ShieldCheck className="h-3 w-3" />
            Admin Governance
          </span>
        }
        actions={
          <Button variant="primary" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
            View Platform Reports
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Registered Donors"
          value="142"
          icon={Building2}
          trend={{ value: '+6 this week', isPositive: true }}
        />
        <StatCard
          title="Verified NGOs"
          value="38"
          icon={Users}
          variant="accent"
          trend={{ value: '4 Pending Review', isPositive: false }}
        />
        <StatCard
          title="Total Donations"
          value="1,280"
          icon={HeartHandshake}
          variant="primary"
          trend={{ value: '+18.2%', isPositive: true, label: 'this month' }}
        />
        <StatCard
          title="Platform Impact"
          value="28,500 meals"
          icon={BarChart3}
          variant="warning"
          trend={{ value: '+24%', isPositive: true, label: 'all time' }}
        />
      </div>

      <PageSection
        title="Pending NGO Verifications"
        description="Review and approve new NGO partner applications."
        action={
          <Button variant="outline" size="sm">
            View All Applications
          </Button>
        }
      >
        <Card variant="default">
          <CardHeader>
            <CardTitle>4 NGOs Awaiting Verification</CardTitle>
            <CardDescription>
              New partner applications require document review before activation.
            </CardDescription>
          </CardHeader>
          <CardBody className="space-y-3">
            {['City Food Bank', 'Hope Kitchen Trust', 'Green Relief NGO', 'Community Nutrition Hub'].map((name) => (
              <div key={name} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <div className="flex items-center gap-3">
                  <Avatar name={name} size="sm" />
                  <span className="text-sm font-medium text-text-primary">{name}</span>
                </div>
                <StatusBadge status="Claimed" size="sm" />
              </div>
            ))}
            <p className="text-xs text-text-secondary pt-1">
              Layout and navigation placeholder verified for Admin Portal.
            </p>
          </CardBody>
        </Card>
      </PageSection>
    </PageContent>
  );
}

export default AdminDashboardPlaceholder;
