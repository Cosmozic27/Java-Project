import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, PackagePlus } from 'lucide-react';
import { PageContent } from '@/components/common/PageContent';
import { PageHeader } from '@/components/common/PageHeader';
import { PageSection } from '@/components/common/PageSection';
import { Button } from '@/components/common/Button';
import { EmptyState } from '@/components/feedback/EmptyState';
import { DonationCard, DonationFilters } from '@/components/donor';
import apiClient from '@/services/api';

export function MyDonationsPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadDonations() {
      try {
        setLoading(true);
        setError('');

        const storedUser = sessionStorage.getItem('foodbridgeUser');

        if (!storedUser) {
          throw new Error('Please log in again to view your donations.');
        }

        const user = JSON.parse(storedUser);

        if (!user.userId) {
          throw new Error('Your user ID was not found. Please log in again.');
        }

        const response = await apiClient.get(`/food/donor/${user.userId}`);

        if (!cancelled) {
          const data = response.data;
          setDonations(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Failed to load donations:', err);
          setError(
            err.response?.data?.message ||
              err.message ||
              'Unable to load donations. Please try again.'
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadDonations();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredDonations = useMemo(() => {
    const query = search.trim().toLowerCase();

    return donations.filter((donation) => {
      const matchesSearch =
        !query ||
        String(donation.foodName || '').toLowerCase().includes(query) ||
        String(donation.pickupLocation || '').toLowerCase().includes(query);

      const matchesStatus =
        !status ||
        String(donation.status || '').toLowerCase() === status.toLowerCase();

      const matchesCategory =
        !category ||
        String(donation.category || '').toLowerCase() ===
          category.toLowerCase();

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [donations, search, status, category]);

  // DonationCard may expect the prototype's "id" property.
  // Keep both id and donationId so existing components can use either.
  const cardDonations = filteredDonations.map((donation) => ({
    ...donation,
    id: donation.donationId ?? donation.id,
  }));

  return (
    <PageContent>
      <PageHeader
        title="My Donations"
        description="Manage the food listings your organization has prepared, posted, and handed over."
        actions={
          <Button
            asChild
            variant="primary"
            leftIcon={<PackagePlus className="h-4 w-4" />}
          >
            <Link to="/donor/donations/new">Create donation</Link>
          </Button>
        }
      />

      <PageSection
        title="Donation workspace"
        description={`${filteredDonations.length} of ${donations.length} donations shown.`}
      >
        <div className="space-y-5">
          <DonationFilters
            search={search}
            onSearchChange={setSearch}
            status={status}
            onStatusChange={setStatus}
            category={category}
            onCategoryChange={setCategory}
          />

          {loading ? (
            <p className="py-8 text-center">Loading your donations...</p>
          ) : error ? (
            <div className="rounded-lg border border-red-300 p-4 text-red-700">
              <p>{error}</p>
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => window.location.reload()}
                className="mt-3"
              >
                Try again
              </Button>
            </div>
          ) : cardDonations.length > 0 ? (
            <div className="grid gap-4 xl:grid-cols-2">
              {cardDonations.map((donation) => (
                <DonationCard
                  key={donation.id}
                  donation={donation}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={ClipboardList}
              title="No donations match"
              description={
                donations.length === 0
                  ? 'You have not created any donations yet.'
                  : 'Try clearing a filter to see your donations.'
              }
              action={
                <Button asChild variant="primary" size="sm">
                  <Link to="/donor/donations/new">Create donation</Link>
                </Button>
              }
            />
          )}
        </div>
      </PageSection>
    </PageContent>
  );
}

export default MyDonationsPage;