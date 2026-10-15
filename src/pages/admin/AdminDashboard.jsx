import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, CheckCircle2, ClipboardList, Package, ShieldCheck, Users, ArrowRight } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { PageContent } from '@/components/common/PageContent';
import { PageHeader } from '@/components/common/PageHeader';
import { PageSection } from '@/components/common/PageSection';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/cards/Card';
import { StatCard } from '@/components/cards/StatCard';
import { AdminActivityList, AdminChartCard, AdminStatus } from '@/components/admin';
import { DONATION_STATUS_BREAKDOWN, DONATION_TREND } from '@/constants/adminData';
import { adminDemoAdapter } from '@/services/adminDemoAdapter';
import { COLORS } from '@/constants/tokens';

const statCardConfigsByTitle = {
  'Total Users': { icon: Users, variant: 'sage' },
  'Active Donors': { icon: Users, variant: 'sage-strong' },
  'Verified NGOs': { icon: ShieldCheck, variant: 'gold' },
  'Active Donations': { icon: Package, variant: 'sage-pale' },
  'Completed Donations': { icon: CheckCircle2, variant: 'sage' },
  'Active Claims': { icon: ClipboardList, variant: 'gold' },
  'Food Redistributed': { icon: BarChart3, variant: 'forest-solid' },
  'Meals Saved': { icon: CheckCircle2, variant: 'gold' },
};

const defaultStatCardConfigs = [
  { icon: Users, variant: 'sage' },
  { icon: Users, variant: 'sage-strong' },
  { icon: ShieldCheck, variant: 'gold' },
  { icon: Package, variant: 'sage-pale' },
  { icon: CheckCircle2, variant: 'sage' },
  { icon: ClipboardList, variant: 'gold' },
  { icon: BarChart3, variant: 'forest-solid' },
  { icon: CheckCircle2, variant: 'gold' },
];

export default function AdminDashboard() {
  const stats = useMemo(() => adminDemoAdapter.getStats(), []);
  const activity = useMemo(() => adminDemoAdapter.getActivity(), []);
  const donations = useMemo(() => adminDemoAdapter.getDonations(), []);

  return (
    <PageContent spacing="loose">
      <PageHeader
        title="Admin Dashboard"
        description="Monitor FoodBridge network activity, users, food donations, and redistribution impact."
        badge={
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary-light px-2.5 py-0.5 text-xs font-semibold text-primary-dark">
            <ShieldCheck className="h-3.5 w-3.5" />
            Platform Governance
          </span>
        }
        actions={
          <Button asChild variant="outline" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
            <Link to="/admin/reports">View reports</Link>
          </Button>
        }
      />

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 w-full min-w-0">
        {stats.map((stat, index) => {
          const config =
            statCardConfigsByTitle[stat.title] ||
            defaultStatCardConfigs[index] || {
              icon: Users,
              variant: 'sage',
            };

          return (
            <StatCard
              key={stat.title}
              {...stat}
              icon={config.icon}
              variant={config.variant}
            />
          );
        })}
      </div>

      <div className="grid gap-6 grid-cols-1 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)] w-full min-w-0">
        <AdminChartCard title="Donation activity" description="Monthly food donation volume and completions across the network.">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DONATION_TREND} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(18,55,42,0.10)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: COLORS.text.secondary }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: COLORS.text.secondary }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="donations" name="Posted" fill={COLORS.primary.DEFAULT} radius={[4, 4, 0, 0]} />
                <Bar dataKey="completed" name="Completed" fill={COLORS.accent.DEFAULT} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </AdminChartCard>

        <AdminChartCard title="Donation status" description="Current distribution across all active and completed listings.">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DONATION_STATUS_BREAKDOWN}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={58}
                  outerRadius={88}
                  paddingAngle={2}
                >
                  {DONATION_STATUS_BREAKDOWN.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" align="right" verticalAlign="middle" iconType="circle" wrapperStyle={{ fontSize: 10 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </AdminChartCard>
      </div>

      <div className="grid gap-6 grid-cols-1 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] w-full min-w-0">
        <Card padding="lg">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h2 className="text-base font-bold text-text-primary">Recent activity</h2>
              <p className="mt-1 text-xs text-text-secondary">Latest operational events across donors and NGOs.</p>
            </div>
            <Link to="/admin/reports" className="text-xs font-semibold text-primary hover:underline">
              Analytics
            </Link>
          </div>
          <AdminActivityList items={activity} />
        </Card>

        <PageSection
          title="Recent donations"
          description="Operational view of recently posted surplus food."
          action={
            <Button asChild variant="outline" size="sm">
              <Link to="/admin/donations">View all</Link>
            </Button>
          }
        >
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-border w-full max-w-full">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="border-b border-border bg-surface-muted text-[11px] uppercase tracking-wider text-text-secondary">
                <tr>
                  <th className="px-4 py-3">Food</th>
                  <th className="px-4 py-3">Donor</th>
                  <th className="px-4 py-3">Quantity</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/70">
                {donations.slice(0, 4).map((donation) => (
                  <tr key={donation.id}>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-text-primary">{donation.name}</p>
                      <p className="text-xs text-text-muted">{donation.location}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-text-secondary">{donation.donor}</td>
                    <td className="px-4 py-3 text-xs text-text-secondary">{donation.quantity}</td>
                    <td className="px-4 py-3">
                      <AdminStatus status={donation.status} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link to={`/admin/donations/${donation.id}`} className="text-xs font-semibold text-primary hover:underline">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card / List View */}
          <div className="md:hidden divide-y divide-border rounded-xl border border-border bg-surface overflow-hidden w-full">
            {donations.slice(0, 4).map((donation) => (
              <div key={donation.id} className="p-3.5 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-text-primary text-sm truncate">{donation.name}</p>
                    <p className="text-xs text-text-muted truncate">{donation.location}</p>
                  </div>
                  <AdminStatus status={donation.status} />
                </div>
                <div className="flex items-center justify-between text-xs text-text-secondary pt-1">
                  <div className="truncate mr-2">
                    <span className="text-text-muted">Donor: </span>
                    <span className="font-medium text-text-primary">{donation.donor}</span>
                  </div>
                  <div className="font-semibold text-text-primary shrink-0">{donation.quantity}</div>
                </div>
                <div className="pt-2 flex justify-end border-t border-border/50">
                  <Link to={`/admin/donations/${donation.id}`} className="text-xs font-semibold text-primary hover:underline">
                    View details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </PageSection>
      </div>
    </PageContent>
  );
}
