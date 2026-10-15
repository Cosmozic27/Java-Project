import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  BarChart3,
  CheckCircle2,
  HeartHandshake,
  Package,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { PageContent } from '@/components/common/PageContent';
import { PageHeader } from '@/components/common/PageHeader';
import { StatCard } from '@/components/cards/StatCard';
import { AdminChartCard } from '@/components/admin';
import {
  AREA_SUMMARY,
  CATEGORY_BREAKDOWN,
  DONATION_TREND,
  DONATION_STATUS_BREAKDOWN,
} from '@/constants/adminData';
import { COLORS } from '@/constants/tokens';

export default function ReportsPage() {
  const statItems = [
    { title: 'Meals saved', value: '28,500', icon: HeartHandshake, description: 'Platform total' },
    { title: 'Food redistributed', value: '8,420 kg', icon: Package, variant: 'primary', description: 'Platform total' },
    { title: 'Successful donations', value: '1,128', icon: CheckCircle2, description: 'Platform total' },
    { title: 'Completed claims', value: '942', icon: ShieldCheck, variant: 'accent', description: 'Platform total' },
    { title: 'Active donors', value: '142', icon: Users, description: 'Registered donors' },
    { title: 'Verified NGOs', value: '38', icon: BarChart3, variant: 'info', description: 'Active partners' },
  ];

  return (
    <PageContent spacing="loose">
      <PageHeader
        title="Reports & Analytics"
        description="Operational summaries for FoodBridge impact, community activity, and service areas."
        badge={
          <span className="rounded-full border border-primary/20 bg-primary-light px-2.5 py-1 text-xs font-semibold text-primary-dark">
            Platform Impact
          </span>
        }
      />

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 w-full min-w-0">
        {statItems.map((item) => (
          <StatCard key={item.title} {...item} />
        ))}
      </div>

      <div className="grid gap-6 grid-cols-1 xl:grid-cols-2 w-full min-w-0">
        <AdminChartCard
          title="Donation trends"
          description="Posted and completed donation activity by month."
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={DONATION_TREND}
                margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(18,55,42,0.10)"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line
                  type="monotone"
                  dataKey="donations"
                  name="Posted"
                  stroke={COLORS.primary.DEFAULT}
                  strokeWidth={2.5}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="completed"
                  name="Completed"
                  stroke={COLORS.primary.dark}
                  strokeWidth={2.5}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </AdminChartCard>

        <AdminChartCard
          title="Donation outcomes"
          description="Distribution across the donation lifecycle."
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DONATION_STATUS_BREAKDOWN.filter((item) =>
                    ['Completed', 'Claimed', 'Expired', 'Cancelled'].includes(item.name)
                  )}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={56}
                  outerRadius={88}
                  paddingAngle={3}
                >
                  {DONATION_STATUS_BREAKDOWN.filter((item) =>
                    ['Completed', 'Claimed', 'Expired', 'Cancelled'].includes(item.name)
                  ).map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </AdminChartCard>
      </div>

      <div className="grid gap-6 grid-cols-1 xl:grid-cols-2 w-full min-w-0">
        <AdminChartCard
          title="Donation category breakdown"
          description="Food volume distributed across categories."
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={CATEGORY_BREAKDOWN}
                layout="vertical"
                margin={{ top: 0, right: 8, left: 20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(18,55,42,0.10)"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  tick={{ fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={100}
                  tick={{ fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip />
                <Bar
                  dataKey="value"
                  name="Donations"
                  fill={COLORS.primary.DEFAULT}
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </AdminChartCard>

        <AdminChartCard
          title="Partner activity"
          description="Top-level organization and donor participation summary."
        >
          <div className="space-y-4">
            {[
              {
                name: 'Central Hostel & Canteen',
                detail: '24 donations · 1,248 meals rescued',
                value: 'High activity',
              },
              {
                name: 'Hope Community Kitchen',
                detail: '16 claims · 12 completed collections',
                value: 'Verified partner',
              },
              {
                name: 'Neighbourhood Food Collective',
                detail: '21 claims · 15 completed collections',
                value: 'Verified partner',
              },
              {
                name: 'Riverside Conference Centre',
                detail: '3 donations · 70 meal portions',
                value: 'New donor',
              },
            ].map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between gap-4 border-b border-border/70 pb-3 last:border-0 last:pb-0"
              >
                <div>
                  <p className="text-sm font-semibold text-text-primary">{item.name}</p>
                  <p className="mt-1 text-xs text-text-secondary">{item.detail}</p>
                </div>
                <span className="text-right text-xs font-semibold text-primary">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </AdminChartCard>
      </div>

      <AdminChartCard
        title="Geographic and service-area summary"
        description="Operational coverage by service area."
      >
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto w-full max-w-full">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="border-b border-border bg-surface-muted text-[11px] uppercase tracking-wider text-text-secondary">
              <tr>
                <th className="px-4 py-3">Area</th>
                <th className="px-4 py-3">Donors</th>
                <th className="px-4 py-3">NGOs</th>
                <th className="px-4 py-3">Donations</th>
                <th className="px-4 py-3">Food redistributed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/70">
              {AREA_SUMMARY.map((row) => (
                <tr key={row.area}>
                  <td className="px-4 py-3 font-semibold text-text-primary">{row.area}</td>
                  <td className="px-4 py-3 text-text-secondary">{row.donors}</td>
                  <td className="px-4 py-3 text-text-secondary">{row.ngos}</td>
                  <td className="px-4 py-3 text-text-secondary">{row.donations}</td>
                  <td className="px-4 py-3 font-semibold text-primary">{row.food}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card List View */}
        <div className="md:hidden divide-y divide-border rounded-xl border border-border bg-surface overflow-hidden w-full">
          {AREA_SUMMARY.map((row) => (
            <div key={row.area} className="p-3.5 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-text-primary text-sm">{row.area}</p>
                <span className="font-semibold text-primary text-xs">{row.food}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1 text-xs">
                <div>
                  <span className="text-text-muted block text-[11px]">Donors</span>
                  <span className="font-medium text-text-primary">{row.donors}</span>
                </div>
                <div>
                  <span className="text-text-muted block text-[11px]">NGOs</span>
                  <span className="font-medium text-text-primary">{row.ngos}</span>
                </div>
                <div>
                  <span className="text-text-muted block text-[11px]">Donations</span>
                  <span className="font-medium text-text-primary">{row.donations}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AdminChartCard>
    </PageContent>
  );
}
