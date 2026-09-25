import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, HeartHandshake, History, MapPin, PackageCheck, ShieldCheck, Truck } from 'lucide-react';
import { PageContent } from '@/components/common/PageContent';
import { PageHeader } from '@/components/common/PageHeader';
import { PageSection } from '@/components/common/PageSection';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/cards/Card';
import { StatCard } from '@/components/cards/StatCard';
import { StatusBadge } from '@/components/data-display/StatusBadge';
import { ClaimCard, FoodDonationCard } from '@/components/ngo';
import { NGO_ACTIVITY, NGO_AVAILABLE_FOOD, NGO_CLAIMS, NGO_PROFILE, NGO_STATS, NGO_CLAIM_STATUS_LABELS } from '@/constants/ngoData';

const activityTones = { primary: 'bg-primary', info: 'bg-info', warning: 'bg-warning', success: 'bg-success' };

export function NGODashboard() {
  return (
    <PageContent>
      <PageHeader
        title={`Welcome back, ${NGO_PROFILE.name}`}
        description="Find surplus food available for your community and manage your active pickups."
        badge={<span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary-light px-2.5 py-0.5 text-xs font-semibold text-primary-dark">NGO workspace</span>}
        actions={<div className="flex flex-wrap gap-2"><Button asChild variant="primary" rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}><Link to="/ngo/available-food">Browse Available Food</Link></Button><Button asChild variant="outline"><Link to="/ngo/claims">View My Claims</Link></Button></div>}
      />
      <Card variant="subtle" padding="sm" className="flex items-start gap-3 border-primary/15"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" /><p className="text-xs leading-relaxed text-text-secondary">Illustrative NGO workspace data for this frontend prototype. Food safety information is provided by donors; your team should review suitability before accepting or distributing food.</p></Card>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {NGO_STATS.map((stat, index) => <StatCard key={stat.title} {...stat} icon={[PackageCheck, HeartHandshake, Truck, MapPin][index]} variant={index === 1 ? 'accent' : index === 2 ? 'primary' : index === 3 ? 'info' : 'default'} />)}
      </div>
      <PageSection title="Active claims" description="Keep upcoming collections visible and ready for your volunteer team." action={<Button asChild variant="outline" size="sm" leftIcon={<History className="h-3.5 w-3.5" aria-hidden="true" />}><Link to="/ngo/claims">View all claims</Link></Button>}>
        <div className="grid gap-5 lg:grid-cols-2">{NGO_CLAIMS.filter((claim) => ['REQUESTED', 'CONFIRMED', 'PICKUP_PENDING'].includes(claim.status)).slice(0, 3).map((claim) => <ClaimCard key={claim.id} claim={claim} compact />)}</div>
      </PageSection>
      <PageSection title="Nearby recommended food" description="Availability and distance are illustrative; no browser location is requested." action={<span className="text-xs font-medium text-text-muted">{NGO_AVAILABLE_FOOD.filter((food) => food.status === 'AVAILABLE').length} available listings</span>}>
        <div className="grid gap-5 lg:grid-cols-2">{NGO_AVAILABLE_FOOD.filter((food) => food.status === 'AVAILABLE').slice(0, 2).map((food) => <FoodDonationCard key={food.id} donation={food} />)}</div>
      </PageSection>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)]">
        <PageSection title="Recent activity" description="A concise view of local prototype events."><Card padding="md"><ol className="divide-y divide-border/70">{NGO_ACTIVITY.map((activity) => <li key={`${activity.label}-${activity.time}`} className="flex gap-3 py-3 first:pt-0 last:pb-0"><span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${activityTones[activity.tone] || 'bg-primary'}`} aria-hidden="true" /><div className="min-w-0"><p className="text-sm font-semibold text-text-primary">{activity.label}</p><p className="text-xs text-text-secondary">{activity.detail}</p><p className="mt-1 text-[11px] text-text-muted">{activity.time}</p></div></li>)}</ol></Card></PageSection>
        <Card variant="subtle" padding="lg" className="self-start"><HeartHandshake className="h-6 w-6 text-primary" aria-hidden="true" /><h2 className="mt-4 text-base font-bold text-text-primary">Make every pickup count.</h2><p className="mt-2 text-sm leading-relaxed text-text-secondary">Review handling details, coordinate a realistic collection window, and help redirect safe surplus food to people in your service area.</p><div className="mt-5 flex items-center gap-2"><StatusBadge status={NGO_CLAIM_STATUS_LABELS.PICKUP_PENDING} size="sm" showIcon /><span className="text-xs text-text-secondary">{NGO_CLAIMS.filter((claim) => claim.status === 'PICKUP_PENDING').length} pickup pending</span></div></Card>
      </div>
    </PageContent>
  );
}
export default NGODashboard;
