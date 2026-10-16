import React, { useEffect, useMemo, useState } from 'react';
import { Info, ShoppingBag } from 'lucide-react';
import { PageContent } from '@/components/common/PageContent';
import { PageHeader } from '@/components/common/PageHeader';
import { PageSection } from '@/components/common/PageSection';
import { Card } from '@/components/cards/Card';
import { EmptyState } from '@/components/feedback/EmptyState';
import { DonationCard, DonationFilters } from '@/components/donor';
import { filterDonations } from '@/utils/donor';
import apiClient from '@/services/api';
import { formatApiError, safeRenderString } from '@/utils/apiError';

export function AvailableFoodPage() {
  const [donations, setDonations] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('AVAILABLE');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await apiClient.get('/food/available');

        const data = Array.isArray(response.data) ? response.data : [];

        const mappedDonations = data.map((item) => ({
          ...item,
          id: item.donationId ?? item.id,
          foodName: item.foodName ?? item.food_name ?? 'Food donation',
          name: item.foodName ?? item.food_name ?? 'Food donation',
          quantity: item.quantity ?? 0,
          status: item.status ?? 'AVAILABLE',
          category: item.category ?? item.foodType ?? item.food_type ?? '',
          description: item.description ?? '',
          location:
            item.pickupAddress ??
            item.pickup_address ??
            item.location ??
            'Pickup location not provided',
          pickupAddress:
            item.pickupAddress ??
            item.pickup_address ??
            item.location ??
            'Pickup location not provided',
          expiryTime: item.expiryTime ?? item.expiry_time ?? '',
        }));

        setDonations(mappedDonations);
      } catch (err) {
        console.error('Failed to load available food:', err);
        setError(
          formatApiError(
            err,
            'Unable to load available food. Check that the backend is running.'
          )
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const availableDonations = useMemo(
    () => filterDonations(donations, { search, status, category }),
    [donations, search, status, category]
  );

  return (
    <PageContent>
      <PageHeader
        title="Available Food"
        description="Browse real food donations currently available for collection."
        badge={
          <span className="inline-flex rounded-full border border-border bg-surface-muted px-2.5 py-0.5 text-xs font-semibold text-text-secondary">
            Live listings
          </span>
        }
      />

      <Card variant="subtle" padding="sm" className="flex items-start gap-3">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
        <p className="text-xs leading-relaxed text-text-secondary">
          These listings are loaded from the FoodBridge backend. Only donations
          marked AVAILABLE are shown.
        </p>
      </Card>

      <PageSection
        title="Food listings"
        description={
          loading
            ? 'Loading donations...'
            : `${availableDonations.length} listing${availableDonations.length === 1 ? '' : 's'} match the current view.`
        }
      >
        <div className="space-y-5">
          <DonationFilters
            search={search}
            onSearchChange={setSearch}
            status={status}
            onStatusChange={setStatus}
            category={category}
            onCategoryChange={setCategory}
            searchPlaceholder="Search available food..."
          />

          {loading ? (
            <p className="py-8 text-center text-text-secondary">
              Loading available food...
            </p>
          ) : error ? (
            <div className="rounded-xl border border-red-200 p-5 text-center">
              <p className="text-sm text-red-600">{safeRenderString(error)}</p>
              <button
                type="button"
                className="mt-3 rounded-lg border px-4 py-2 text-sm"
                onClick={() => window.location.reload()}
              >
                Try again
              </button>
            </div>
          ) : availableDonations.length > 0 ? (
            <div className="grid gap-4 xl:grid-cols-2">
              {availableDonations.map((donation) => (
                <DonationCard
                  key={donation.id}
                  donation={donation}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={ShoppingBag}
              title="No available food matches"
              description="Try another search or check that your donations are marked AVAILABLE in the database."
            />
          )}
        </div>
      </PageSection>
    </PageContent>
  );
}

export default AvailableFoodPage;