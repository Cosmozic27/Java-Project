import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Clock3, MapPin, Package } from 'lucide-react';
import { Card } from '@/components/cards/Card';
import { StatusBadge } from '@/components/data-display/StatusBadge';
import { NGO_CLAIM_STATUS_LABELS } from '@/constants/ngoData';

export function ClaimCard({ claim, compact = false }) {
  const label = NGO_CLAIM_STATUS_LABELS[claim.status] || claim.status;
  return (
    <Card padding={compact ? 'sm' : 'md'} className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">{claim.id}</p>
          <h3 className="mt-1 text-base font-bold text-text-primary">{claim.foodName}</h3>
          <p className="mt-1 text-sm text-text-secondary">{claim.quantity}</p>
        </div>
        <StatusBadge status={label} size="sm" showIcon />
      </div>
      <p className="mt-3 text-xs text-text-secondary"><strong className="font-semibold text-text-primary">{claim.donor}</strong></p>
      <div className="mt-4 grid gap-2 text-xs text-text-secondary sm:grid-cols-2">
        <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />{claim.location}</span>
        <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5 text-primary" aria-hidden="true" />{claim.pickupDate}</span>
        <span className="inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5 text-primary" aria-hidden="true" />{claim.pickupWindow}</span>
        <span className="inline-flex items-center gap-1.5"><Package className="h-3.5 w-3.5 text-primary" aria-hidden="true" />Updated {claim.updatedAt}</span>
      </div>
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/70 pt-4">
        <span className="text-xs text-text-secondary">{claim.impact}</span>
        <Link to={`/ngo/claims/${claim.id}`} className="inline-flex min-h-8 items-center rounded-lg px-2.5 text-xs font-semibold text-primary hover:bg-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30">View details</Link>
      </div>
    </Card>
  );
}
export default ClaimCard;
