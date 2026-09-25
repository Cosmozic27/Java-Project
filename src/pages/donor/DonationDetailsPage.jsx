import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useToast } from '@/components/feedback';
import { ArrowLeft, CalendarDays, Clock3, Edit3, MapPin, Package, ShieldCheck, XCircle } from 'lucide-react';
import { PageContent } from '@/components/common/PageContent';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/cards/Card';
import { StatusBadge } from '@/components/data-display/StatusBadge';
import { DonationStatusTimeline } from '@/components/donor';
import { DONATION_STATUS_LABELS, getDonationById } from '@/constants/donorData';

const EDITABLE_STATUSES = new Set(['AVAILABLE']);
const PICKUP_STATUSES = new Set(['CLAIMED', 'PICKUP_PENDING', 'COLLECTED', 'COMPLETED']);

export function DonationDetailsPage() {
  const { donationId } = useParams();
  const toast = useToast();
  const donation = getDonationById(donationId);
  const statusLabel = DONATION_STATUS_LABELS[donation.status] || donation.status;

  return (
    <PageContent>
      <PageHeader
        breadcrumbs={
          <Link to="/donor/donations" className="inline-flex items-center gap-1.5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30">
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Back to My Donations
          </Link>
        }
        title={donation.name}
        description={`${donation.quantity} · ${donation.category} · ${donation.id}`}
        badge={<StatusBadge status={statusLabel} showIcon />}
        actions={
          <div className="flex flex-wrap gap-2">
            {EDITABLE_STATUSES.has(donation.status) && (
              <Button variant="outline" size="sm" leftIcon={<Edit3 className="h-3.5 w-3.5" />} onClick={() => toast.info('Editing is a prototype action and is not connected to a backend.', 'Prototype action')}>
                Edit donation
              </Button>
            )}
            {PICKUP_STATUSES.has(donation.status) && (
              <Button variant="outline" size="sm" leftIcon={<MapPin className="h-3.5 w-3.5" />} onClick={() => toast.info('Pickup details are illustrative in this frontend phase.', 'Prototype action')}>
                View pickup details
              </Button>
            )}
            {EDITABLE_STATUSES.has(donation.status) && (
              <Button variant="subtle-danger" size="sm" leftIcon={<XCircle className="h-3.5 w-3.5" />} onClick={() => toast.info('Cancellation is not connected to a backend yet.', 'Prototype action')}>
                Cancel donation
              </Button>
            )}
          </div>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(300px,0.75fr)]">
        <div className="space-y-6">
          <Card padding="lg">
            <div className="grid gap-6 md:grid-cols-[180px_minmax(0,1fr)]">
              <div className="flex min-h-44 items-center justify-center rounded-xl border border-dashed border-border bg-surface-muted text-center">
                <div className="px-4">
                  <Package className="mx-auto h-8 w-8 text-text-muted" aria-hidden="true" />
                  <p className="mt-3 text-xs font-semibold text-text-secondary">No photo attached</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-text-muted">A local preview can be added when creating a listing.</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">Donation overview</p>
                <h2 className="mt-2 text-xl font-bold text-text-primary">{donation.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{donation.description}</p>
                <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div><dt className="text-xs text-text-muted">Quantity</dt><dd className="mt-1 text-sm font-semibold text-text-primary">{donation.quantity}</dd></div>
                  <div><dt className="text-xs text-text-muted">Category</dt><dd className="mt-1 text-sm font-semibold text-text-primary">{donation.category}</dd></div>
                  <div><dt className="text-xs text-text-muted">Dietary profile</dt><dd className="mt-1 text-sm font-semibold text-text-primary">{donation.dietary}</dd></div>
                  <div><dt className="text-xs text-text-muted">Posted</dt><dd className="mt-1 text-sm font-semibold text-text-primary">{donation.postedAt}</dd></div>
                </dl>
              </div>
            </div>
          </Card>

          <Card padding="lg">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
              <h2 className="text-base font-bold text-text-primary">Food safety information</h2>
            </div>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <div><dt className="text-xs text-text-muted">Prepared time</dt><dd className="mt-1 text-sm font-semibold text-text-primary">{donation.preparedAt}</dd></div>
              <div><dt className="text-xs text-text-muted">Consume before</dt><dd className="mt-1 text-sm font-semibold text-text-primary">{donation.consumeBefore}</dd></div>
              <div><dt className="text-xs text-text-muted">Storage conditions</dt><dd className="mt-1 text-sm font-semibold text-text-primary">{donation.storage}</dd></div>
              <div><dt className="text-xs text-text-muted">Allergen information</dt><dd className="mt-1 text-sm font-semibold text-text-primary">{donation.allergens}</dd></div>
            </dl>
            <p className="mt-5 rounded-lg border border-border bg-surface-muted px-3 py-2 text-xs leading-relaxed text-text-secondary">
              Donors and receiving organizations remain responsible for safe handling, storage, transport, and compliance with applicable requirements.
            </p>
          </Card>

          <Card padding="lg">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
              <h2 className="text-base font-bold text-text-primary">Pickup information</h2>
            </div>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <div><dt className="text-xs text-text-muted">Pickup location</dt><dd className="mt-1 text-sm font-semibold text-text-primary">{donation.location}</dd></div>
              <div><dt className="text-xs text-text-muted">Pickup date</dt><dd className="mt-1 text-sm font-semibold text-text-primary">{donation.pickupDate}</dd></div>
              <div><dt className="flex items-center gap-1.5 text-xs text-text-muted"><CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />Window</dt><dd className="mt-1 text-sm font-semibold text-text-primary">{donation.pickupWindow}</dd></div>
              <div><dt className="flex items-center gap-1.5 text-xs text-text-muted"><Clock3 className="h-3.5 w-3.5" aria-hidden="true" />Claimant</dt><dd className="mt-1 text-sm font-semibold text-text-primary">{donation.claimant || 'Awaiting request'}</dd></div>
            </dl>
          </Card>
        </div>

        <div className="space-y-6">
          <Card padding="lg">
            <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">Current status</p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-text-primary">{statusLabel}</h2>
              <StatusBadge status={statusLabel} showIcon size="sm" />
            </div>
            <p className="mt-3 text-xs leading-relaxed text-text-secondary">{donation.claimantNote}</p>
          </Card>

          <Card padding="lg">
            <h2 className="text-base font-bold text-text-primary">Donation timeline</h2>
            <p className="mt-1 text-xs text-text-secondary">Progress shown for the current illustrative status.</p>
            <div className="mt-6">
              <DonationStatusTimeline status={donation.status} />
            </div>
          </Card>
        </div>
      </div>
    </PageContent>
  );
}

export default DonationDetailsPage;
