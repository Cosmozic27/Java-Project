import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  Package,
  ShieldCheck,
  Users,
} from 'lucide-react';

import { PageContent } from '@/components/common/PageContent';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/cards/Card';
import { StatusBadge } from '@/components/data-display/StatusBadge';
import { apiClient } from '@/services/api';

function formatDateTime(value) {
  if (!value) return 'Not provided';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString();
}

function formatTime(value) {
  if (!value) return 'Not provided';

  const match = value.match(/^(\d{2}):(\d{2})/);
  if (!match) return value;

  const date = new Date();
  date.setHours(Number(match[1]), Number(match[2]), 0, 0);

  return date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function FoodDetailsPage() {
  const { donationId } = useParams();

  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadDonation() {
      setLoading(true);
      setError('');
      setDonation(null);

      try {
        // Fetch available donations from the same API used by the NGO listing.
        const response = await apiClient.get('/food/available');

        const records = Array.isArray(response.data)
          ? response.data
          : response.data?.content ?? [];

        const selected = records.find(
          (item) => String(item.donationId ?? item.id) === String(donationId)
        );

        if (!selected) {
          if (active) {
            setError(
              'This donation was not found among currently available donations.'
            );
          }
          return;
        }

        if (active) setDonation(selected);
      } catch (err) {
        if (active) {
          setError(
            err.response?.data?.message ||
              err.response?.data?.error ||
              'Unable to load donation details. Please try again.'
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadDonation();

    return () => {
      active = false;
    };
  }, [donationId]);

  if (loading) {
    return (
      <PageContent>
        <PageHeader title="Donation details" />
        <Card padding="lg">
          <p className="text-sm text-text-secondary">
            Loading donation details...
          </p>
        </Card>
      </PageContent>
    );
  }

  if (error || !donation) {
    return (
      <PageContent>
        <PageHeader
          title="Donation not found"
          description={error || 'The requested donation could not be loaded.'}
          breadcrumbs={
            <Link
              to="/ngo/available-food"
              className="inline-flex items-center gap-1.5 hover:text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Available Food
            </Link>
          }
        />
        <Card padding="lg">
          <p role="alert" className="text-sm text-text-secondary">
            {error || 'The requested donation could not be loaded.'}
          </p>
          <Button
            className="mt-4"
            variant="outline"
            onClick={() => window.location.reload()}
          >
            Try again
          </Button>
        </Card>
      </PageContent>
    );
  }

  const name = donation.foodName ?? donation.name ?? 'Food donation';
  const id = donation.donationId ?? donation.id;
  const location = donation.pickupLocation ?? donation.location ?? 'Not provided';
  const status = String(donation.status ?? 'AVAILABLE').toUpperCase();
  const isAvailable = status === 'AVAILABLE';

  const pickupWindow = [
    donation.pickupStartTime,
    donation.pickupEndTime,
  ]
    .filter(Boolean)
    .map(formatTime)
    .join(' – ');

  return (
    <PageContent>
      <PageHeader
        breadcrumbs={
          <Link
            to="/ngo/available-food"
            className="inline-flex items-center gap-1.5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Back to Available Food
          </Link>
        }
        title={name}
        description={`${donation.quantity ?? 0} ${donation.unit ?? 'portions'} · ${donation.category ?? 'Food'} · Donation #${id}`}
        badge={<StatusBadge status={status} showIcon />}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
        <div className="space-y-6">
          <Card padding="lg">
            <div className="grid gap-6 md:grid-cols-[180px_minmax(0,1fr)]">
              <div className="flex min-h-44 items-center justify-center rounded-xl border border-dashed border-border bg-surface-muted text-center">
                <div className="px-4">
                  <Package
                    className="mx-auto h-8 w-8 text-text-muted"
                    aria-hidden="true"
                  />
                  <p className="mt-3 text-xs font-semibold text-text-secondary">
                    No photo attached
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-text-muted">
                    Donor image placeholder
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Donation overview
                </p>
                <h2 className="mt-2 text-xl font-bold text-text-primary">
                  {name}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {donation.description || 'No additional description provided.'}
                </p>

                <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs text-text-muted">Donor ID</dt>
                    <dd className="mt-1 text-sm font-semibold text-text-primary">
                      {donation.donorId ?? 'Not provided'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-text-muted">Quantity</dt>
                    <dd className="mt-1 text-sm font-semibold text-text-primary">
                      {donation.quantity} {donation.unit ?? 'portions'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-text-muted">Dietary profile</dt>
                    <dd className="mt-1 text-sm font-semibold text-text-primary">
                      {donation.dietary || 'Not provided'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-text-muted">Category</dt>
                    <dd className="mt-1 text-sm font-semibold text-text-primary">
                      {donation.category || 'Not provided'}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </Card>

          <Card padding="lg">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
              <h2 className="text-base font-bold text-text-primary">
                Food safety information
              </h2>
            </div>

            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs text-text-muted">Prepared time</dt>
                <dd className="mt-1 text-sm font-semibold text-text-primary">
                  {formatDateTime(donation.preparedAt)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-text-muted">Consume before</dt>
                <dd className="mt-1 text-sm font-semibold text-text-primary">
                  {formatDateTime(donation.consumeBefore)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-text-muted">Storage condition</dt>
                <dd className="mt-1 text-sm font-semibold text-text-primary">
                  {donation.storageConditions || 'Not provided'}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-text-muted">Allergen information</dt>
                <dd className="mt-1 text-sm font-semibold text-text-primary">
                  {donation.allergenInformation || 'Not provided'}
                </dd>
              </div>
            </dl>

            <p className="mt-5 rounded-lg border border-border bg-surface-muted px-3 py-2 text-xs leading-relaxed text-text-secondary">
              Food safety information is provided by the donor. Your organization
              should assess suitability before accepting or distributing food.
            </p>
          </Card>

          <Card padding="lg">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
              <h2 className="text-base font-bold text-text-primary">
                Pickup information
              </h2>
            </div>

            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs text-text-muted">Pickup location</dt>
                <dd className="mt-1 text-sm font-semibold text-text-primary">
                  {location}
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-1.5 text-xs text-text-muted">
                  <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                  Pickup date
                </dt>
                <dd className="mt-1 text-sm font-semibold text-text-primary">
                  {donation.pickupDate || 'Not provided'}
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-1.5 text-xs text-text-muted">
                  <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                  Pickup window
                </dt>
                <dd className="mt-1 text-sm font-semibold text-text-primary">
                  {pickupWindow || 'Not provided'}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-text-muted">Pickup notes</dt>
                <dd className="mt-1 text-sm font-semibold text-text-primary">
                  {donation.description || 'No notes provided'}
                </dd>
              </div>
            </dl>
          </Card>
        </div>

        <div className="space-y-6">
          <Card padding="lg">
            <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Donor information
            </p>
            <div className="mt-4 flex items-start gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-sm font-bold text-primary-dark">
                D
              </span>
              <div>
                <h2 className="text-base font-bold text-text-primary">
                  Donor #{donation.donorId ?? 'Unknown'}
                </h2>
                <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-text-secondary">
                  <Users className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                  FoodBridge participant
                </p>
              </div>
            </div>
          </Card>

          <Card variant="subtle" padding="lg">
            <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Claim status
            </p>
            <h2 className="mt-2 text-lg font-bold text-text-primary">
              {isAvailable ? 'Available to request' : status}
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-text-secondary">
              {isAvailable
                ? 'This donation is currently available.'
                : 'This donation is not currently available for a new claim.'}
            </p>

            {isAvailable && (
              <p className="mt-4 text-xs leading-relaxed text-text-secondary">
                Claim processing will be available when the backend claim flow
                is connected.
              </p>
            )}
          </Card>
        </div>
      </div>
    </PageContent>
  );
}

export default FoodDetailsPage;