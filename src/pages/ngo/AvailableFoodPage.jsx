import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, RotateCcw, ShieldCheck } from 'lucide-react';
import { PageContent } from '@/components/common/PageContent';
import { PageHeader } from '@/components/common/PageHeader';
import { PageSection } from '@/components/common/PageSection';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/cards/Card';
import { EmptyState } from '@/components/feedback/EmptyState';
import { Select } from '@/components/forms/Select';
import { FoodDonationCard } from '@/components/ngo';
import { NGO_CATEGORIES } from '@/constants/ngoData';
import { SearchBar } from '@/components/forms/SearchBar';
import apiClient from '@/services/api';

const normalizeDonation = (item) => ({
  ...item,
  id: item.donationId ?? item.id,
  name: item.foodName ?? item.name ?? 'Food donation',
  foodName: item.foodName ?? item.name ?? 'Food donation',
  location: item.pickupLocation ?? item.location ?? 'Location not provided',
  pickupLocation: item.pickupLocation ?? item.location ?? '',
  quantity: item.quantity ?? 0,
  unit: item.unit ?? 'portions',
  category: item.category ?? 'Other',
  dietary: item.dietary ?? '',
  status: item.status ?? 'AVAILABLE',
  donorId: item.donorId,
});

export function AvailableFoodPage() {
  const navigate = useNavigate();

  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [dietary, setDietary] = useState('');
  const [area, setArea] = useState('');

  useEffect(() => {
    let active = true;

    const fetchDonations = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await apiClient.get('/food/available');
        const records = Array.isArray(response.data)
          ? response.data
          : response.data?.content ?? [];

        if (active) {
          setDonations(records.map(normalizeDonation));
        }
      } catch (err) {
        if (active) {
          setError(
            err.response?.data?.message ||
              err.response?.data?.error ||
              'Unable to load food donations. Please try again.'
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchDonations();

    return () => {
      active = false;
    };
  }, []);

  const areas = useMemo(
    () => [
      ...new Set(
        donations
          .map((food) => food.location)
          .filter((location) => location && location !== 'Location not provided')
      ),
    ],
    [donations]
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return donations.filter((food) => {
      const matchesSearch =
        !query ||
        [
          food.name,
          food.foodName,
          food.location,
          food.category,
          String(food.donorId ?? ''),
        ].some((value) => String(value ?? '').toLowerCase().includes(query));

      const matchesCategory =
        !category || food.category === category;

      const matchesDietary =
        !dietary ||
        food.dietary === dietary ||
        (dietary === 'Vegetarian & Non-Vegetarian' &&
          ['Vegetarian', 'Non-Vegetarian'].includes(food.dietary));

      const matchesArea =
        !area || food.location === area;

      return (
        String(food.status).toUpperCase() === 'AVAILABLE' &&
        matchesSearch &&
        matchesCategory &&
        matchesDietary &&
        matchesArea
      );
    });
  }, [donations, search, category, dietary, area]);

  const hasFilters = Boolean(search || category || dietary || area);

  const reset = () => {
    setSearch('');
    setCategory('');
    setDietary('');
    setArea('');
  };

  return (
    <PageContent>
      <PageHeader
        title="Available Food"
        description="Browse surplus food from local donors and request suitable donations for your community."
        badge={
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary-light px-2.5 py-0.5 text-xs font-semibold text-primary-dark">
            Live donations
          </span>
        }
      />

      <Card
        variant="subtle"
        padding="sm"
        className="flex items-start gap-3 border-info/20"
      >
        <Info
          className="mt-0.5 h-4 w-4 shrink-0 text-info"
          aria-hidden="true"
        />
        <p className="text-xs leading-relaxed text-text-secondary">
          Listings show donor-provided details. Review preparation time,
          consume-before window, storage, allergens, and your own capacity
          before requesting a donation.
        </p>
      </Card>

      <PageSection
        title="Food listings"
        description={
          loading
            ? 'Loading available donations...'
            : `${filtered.length} available listing${filtered.length === 1 ? '' : 's'} match the current view.`
        }
      >
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_170px_170px_170px]">
          <SearchBar
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onClear={() => setSearch('')}
            placeholder="Search food, donor ID, or location..."
          />

          <Select
            aria-label="Filter by food category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            options={[
              { value: '', label: 'All categories' },
              ...NGO_CATEGORIES.map((value) => ({
                value,
                label: value,
              })),
            ]}
            placeholder=""
          />

          <Select
            aria-label="Filter by dietary profile"
            value={dietary}
            onChange={(event) => setDietary(event.target.value)}
            options={[
              { value: '', label: 'All dietary profiles' },
              { value: 'Vegetarian', label: 'Vegetarian' },
              {
                value: 'Non-Vegetarian',
                label: 'Non-Vegetarian',
              },
              {
                value: 'Vegetarian & Non-Vegetarian',
                label: 'Mixed dietary',
              },
            ]}
            placeholder=""
          />

          <Select
            aria-label="Filter by pickup location"
            value={area}
            onChange={(event) => setArea(event.target.value)}
            options={[
              { value: '', label: 'All locations' },
              ...areas.map((value) => ({
                value,
                label: value,
              })),
            ]}
            placeholder=""
          />
        </div>
      </PageSection>

      {loading ? (
        <Card variant="subtle" padding="md">
          <p className="text-sm text-text-secondary">
            Loading food donations from FoodBridge...
          </p>
        </Card>
      ) : error ? (
        <Card variant="subtle" padding="md">
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
          <Button
            variant="outline"
            className="mt-3"
            onClick={() => window.location.reload()}
          >
            Try again
          </Button>
        </Card>
      ) : filtered.length ? (
        <div className="grid gap-5 lg:grid-cols-2">
          {filtered.map((food) => (
            <FoodDonationCard
              key={food.id}
              donation={food}
              onClaim={() => navigate(`/ngo/food/${food.id}`)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={ShieldCheck}
          title={hasFilters ? 'No matching donations' : 'No available food'}
          description={
            hasFilters
              ? 'Try a broader search or reset the filters.'
              : 'No donations are currently available from donors.'
          }
          action={
            hasFilters ? (
              <Button
                variant="outline"
                leftIcon={
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                }
                onClick={reset}
              >
                Reset filters
              </Button>
            ) : undefined
          }
        />
      )}

      <Card
        variant="subtle"
        padding="md"
        className="flex items-start gap-3"
      >
        <ShieldCheck
          className="mt-0.5 h-4 w-4 shrink-0 text-primary"
          aria-hidden="true"
        />
        <p className="text-xs leading-relaxed text-text-secondary">
          Food safety information is provided by the donor. FoodBridge does
          not certify or guarantee food safety; organizations should assess
          suitability before accepting or distributing food.
        </p>
      </Card>
    </PageContent>
  );
}

export default AvailableFoodPage;