import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Clock3, MapPin, Package, ShieldCheck, Users } from 'lucide-react';
import { Card } from '@/components/cards/Card';
import { Button } from '@/components/common/Button';
import { StatusBadge } from '@/components/data-display/StatusBadge';
import { NGO_FOOD_STATUS_LABELS } from '@/constants/ngoData';

export function FoodDonationCard({ donation, onClaim }) {
  const isAvailable = donation.status === 'AVAILABLE';
  return (
    <Card padding="md" className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">{donation.category}</p>
          <h3 className="text-base font-bold text-text-primary">{donation.name}</h3>
          <p className="text-sm font-medium text-text-secondary">{donation.quantity} · {donation.dietary}</p>
        </div>
        <StatusBadge status={NGO_FOOD_STATUS_LABELS[donation.status]} size="sm" showIcon />
      </div>
      <p className="mt-3 text-xs text-text-secondary"><strong className="font-semibold text-text-primary">{donation.donor}</strong> · {donation.donorType}</p>
      <div className="mt-4 grid gap-2 text-xs text-text-secondary sm:grid-cols-2">
        <span className="inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5 text-primary" aria-hidden="true" />{donation.pickupWindow}</span>
        <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />{donation.area} · {donation.distance}</span>
        <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5 text-primary" aria-hidden="true" />Prepared {donation.preparedAt}</span>
        <span className="inline-flex items-center gap-1.5"><Package className="h-3.5 w-3.5 text-primary" aria-hidden="true" />Consume before {donation.consumeBefore}</span>
      </div>
      <div className="mt-4 flex items-start gap-2 rounded-lg border border-border/80 bg-surface-muted/60 px-3 py-2 text-xs text-text-secondary">
        <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
        <span>Storage: {donation.storage}. Allergens: {donation.allergens}.</span>
      </div>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-4">
        <span className="inline-flex items-center gap-1.5 text-xs text-text-secondary"><Users className="h-3.5 w-3.5 text-primary" aria-hidden="true" />{donation.impact}</span>
        <div className="flex flex-wrap items-center gap-2">
          <Link to={`/ngo/food/${donation.id}`} className="inline-flex min-h-8 items-center rounded-lg px-2.5 text-xs font-semibold text-primary hover:bg-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30">View details</Link>
          {isAvailable && <Button type="button" variant="primary" size="sm" onClick={() => onClaim?.(donation)}>Claim donation</Button>}
        </div>
      </div>
    </Card>
  );
}
export default FoodDonationCard;
