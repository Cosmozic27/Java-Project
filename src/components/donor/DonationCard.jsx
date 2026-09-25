import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Clock3, MapPin, Package, Users } from 'lucide-react';
import { Card } from '@/components/cards/Card';
import { StatusBadge } from '@/components/data-display/StatusBadge';
import { DONATION_STATUS_LABELS } from '@/constants/donorData';

export function DonationCard({ donation, actions, compact = false }) {
  const statusLabel = DONATION_STATUS_LABELS[donation.status] || donation.status;

  return (
    <Card padding={compact ? 'sm' : 'md'} className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
            {donation.category}
          </p>
          <h3 className="truncate text-base font-bold text-text-primary">{donation.name}</h3>
          <p className="text-sm font-medium text-text-secondary">{donation.quantity}</p>
        </div>
        <StatusBadge status={statusLabel} size="sm" showIcon />
      </div>

      <div className="mt-4 grid gap-2 text-xs text-text-secondary sm:grid-cols-2">
        <span className="inline-flex items-center gap-1.5">
          <Clock3 className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          {donation.pickupWindow}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          <span className="truncate">{donation.location}</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          Prepared {donation.preparedAt}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Package className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          Consume before {donation.consumeBefore}
        </span>
      </div>

      {donation.claimant && (
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-primary/15 bg-primary-light/40 px-3 py-2 text-xs text-text-secondary">
          <Users className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
          <span>
            <strong className="font-semibold text-text-primary">{donation.claimant}</strong>{' '}
            · {donation.claimantNote}
          </span>
        </div>
      )}

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-4">
        <span className="text-xs text-text-secondary">{donation.impact}</span>
        <div className="flex flex-wrap items-center gap-2">
          {actions}
          <Link
            to={`/donor/donations/${donation.id}`}
            className="inline-flex min-h-8 items-center rounded-lg px-2.5 text-xs font-semibold text-primary hover:bg-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          >
            View details
          </Link>
        </div>
      </div>
    </Card>
  );
}

export default DonationCard;
