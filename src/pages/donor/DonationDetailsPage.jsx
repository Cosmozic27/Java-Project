import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  Package,
  ShieldCheck,
} from 'lucide-react';

import { PageContent } from '@/components/common/PageContent';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/cards/Card';
import { StatusBadge } from '@/components/data-display/StatusBadge';
import { DonationStatusTimeline } from '@/components/donor';
import { apiClient } from '@/services/api';

export function DonationDetailsPage() {
  const { donationId } = useParams();

  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadDonation() {
      try {
        setLoading(true);
        setError('');

        // Fetch the donor's real donations from the backend.
        const storedUser = sessionStorage.getItem('foodbridgeUser');

        if (!storedUser) {
          throw new Error('Please log in again.');
        }

        const user = JSON.parse(storedUser);

        if (!user.userId) {
          throw new Error('Your user ID was not found. Please log in again.');
        }

        const response = await apiClient.get(
          `/food/donor/${user.userId}`
        );

        const donations = Array.isArray(response.data)
          ? response.data
          : [];

        // Match the selected donation using its actual database ID.
        const selectedDonation = donations.find(
          (item) => String(item.donationId) === String(donationId)
        );

        if (!selectedDonation) {
          throw new Error(
            `Donation ID ${donationId} was not found in your account.`
          );
        }

        if (!cancelled) {
          setDonation(selectedDonation);
        }
      } catch (err) {
        console.error('Failed to load donation details:', err);

        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              err.message ||
              'Unable to load donation details.'
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadDonation();

    return () => {
      cancelled = true;
    };
  }, [donationId]);

  if (loading) {
    return (
      <PageContent>
        <p className="py-10 text-center">Loading donation details...</p>
      </PageContent>
    );
  }

  if (error || !donation) {
    return (
      <PageContent>
        <PageHeader title="Donation details" />
        <Card padding="lg">
          <p className="text-red-600">
            {error || 'Donation not found.'}
          </p>

          <Button asChild variant="primary" className="mt-4">
            <Link to="/donor/donations">Back to My Donations</Link>
          </Button>
        </Card>
      </PageContent>
    );
  }

  const status = donation.status || 'AVAILABLE';
  console.log('Donation ID:', donation.donationId);
console.log('Donation status from backend:', donation.status);
console.log('Full donation data:', donation);

  const formatDateTime = (value) => {
    if (!value) return 'Not provided';

    const date = new Date(value);

    return Number.isNaN(date.getTime())
      ? value
      : date.toLocaleString();
  };

  const formatDate = (value) => {
    if (!value) return 'Not provided';

    const date = new Date(`${value}T00:00:00`);

    return Number.isNaN(date.getTime())
      ? value
      : date.toLocaleDateString();
  };

  const formatTime = (value) => {
    if (!value) return 'Not provided';

    return String(value).slice(0, 5);
  };

  return (
    <PageContent>
      <PageHeader
        breadcrumbs={
          <Link
            to="/donor/donations"
            className="inline-flex items-center gap-1.5 hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to My Donations
          </Link>
        }
        title={donation.foodName}
        description={`Donation ID: ${donation.donationId}`}
        badge={<StatusBadge status={status} showIcon />}
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <Card padding="lg">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-primary" />
              <div>
                <h2 className="text-xl font-bold">
                  {donation.foodName}
                </h2>
                <p className="text-sm text-text-secondary">
                  {donation.quantity} {donation.unit}
                </p>
              </div>
            </div>

            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs text-text-muted">Category</dt>
                <dd className="mt-1 font-semibold">
                  {donation.category || 'Not provided'}
                </dd>
              </div>

              <div>
                <dt className="text-xs text-text-muted">Dietary profile</dt>
                <dd className="mt-1 font-semibold">
                  {donation.dietary || 'Not provided'}
                </dd>
              </div>

              <div>
                <dt className="text-xs text-text-muted">Created</dt>
                <dd className="mt-1 font-semibold">
                  {formatDateTime(donation.createdAt)}
                </dd>
              </div>

              <div>
                <dt className="text-xs text-text-muted">Status</dt>
                <dd className="mt-1 font-semibold">{status}</dd>
              </div>
            </dl>

            {donation.description && (
              <div className="mt-5">
                <h3 className="text-sm font-semibold">Description</h3>
                <p className="mt-1 text-sm">
                  {donation.description}
                </p>
              </div>
            )}
          </Card>

          <Card padding="lg">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <h2 className="text-base font-bold">
                Food safety information
              </h2>
            </div>

            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs text-text-muted">Prepared at</dt>
                <dd className="mt-1 font-semibold">
                  {formatDateTime(donation.preparedAt)}
                </dd>
              </div>

              <div>
                <dt className="text-xs text-text-muted">Consume before</dt>
                <dd className="mt-1 font-semibold">
                  {formatDateTime(donation.consumeBefore)}
                </dd>
              </div>

              <div>
                <dt className="text-xs text-text-muted">Storage conditions</dt>
                <dd className="mt-1 font-semibold">
                  {donation.storageConditions || 'Not provided'}
                </dd>
              </div>

              <div>
                <dt className="text-xs text-text-muted">
                  Allergen information
                </dt>
                <dd className="mt-1 font-semibold">
                  {donation.allergenInformation || 'Not provided'}
                </dd>
              </div>
            </dl>
          </Card>
        </div>

        <div className="space-y-6">
          <Card padding="lg">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <h2 className="text-base font-bold">Pickup information</h2>
            </div>

            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <dt className="text-xs text-text-muted">Pickup location</dt>
                <dd className="mt-1 font-semibold">
                  {donation.pickupLocation || 'Not provided'}
                </dd>
              </div>

              <div>
                <dt className="flex items-center gap-1.5 text-xs text-text-muted">
                  <CalendarDays className="h-3.5 w-3.5" />
                  Pickup date
                </dt>
                <dd className="mt-1 font-semibold">
                  {formatDate(donation.pickupDate)}
                </dd>
              </div>

              <div>
                <dt className="flex items-center gap-1.5 text-xs text-text-muted">
                  <Clock3 className="h-3.5 w-3.5" />
                  Pickup window
                </dt>
                <dd className="mt-1 font-semibold">
                  {formatTime(donation.pickupStartTime)} –{' '}
                  {formatTime(donation.pickupEndTime)}
                </dd>
              </div>
            </dl>
          </Card>

          <Card padding="lg">
            <h2 className="text-base font-bold">Donation timeline</h2>
            <p className="mt-1 text-xs text-text-secondary">
              Current donation status.
            </p>

            <div className="mt-6">
              <DonationStatusTimeline status={status} />
            </div>
          </Card>
        </div>
      </div>
    </PageContent>
  );
}

export default DonationDetailsPage;