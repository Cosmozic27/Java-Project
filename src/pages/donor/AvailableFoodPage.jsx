import React, { useMemo, useState } from 'react';
import { Info, ShoppingBag } from 'lucide-react';
import { PageContent } from '@/components/common/PageContent';
import { PageHeader } from '@/components/common/PageHeader';
import { PageSection } from '@/components/common/PageSection';
import { Card } from '@/components/cards/Card';
import { EmptyState } from '@/components/feedback/EmptyState';
import { DonationCard, DonationFilters } from '@/components/donor';
import { MOCK_DONATIONS } from '@/constants/donorData';
import { filterDonations } from '@/utils/donor';

export function AvailableFoodPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('AVAILABLE');
  const [category, setCategory] = useState('');

  const availableDonations = useMemo(
    () => filterDonations(MOCK_DONATIONS, { search, status, category }),
    [search, status, category]
  );

  return (
    <PageContent>
      <PageHeader
        title="Available Food"
        description="Review food listings visible in the donor workspace. NGOs use the availability view to discover and request surplus; donors do not claim food here."
        badge={<span className="inline-flex rounded-full border border-border bg-surface-muted px-2.5 py-0.5 text-xs font-semibold text-text-secondary">Visibility view</span>}
      />

      <Card variant="subtle" padding="sm" className="flex items-start gap-3">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
        <p className="text-xs leading-relaxed text-text-secondary">
          This prototype view helps donors understand how listings appear across the network. Claim and pickup actions belong to NGO workflows planned for a later phase.
        </p>
      </Card>

      <PageSection title="Food listings" description={`${availableDonations.length} listing${availableDonations.length === 1 ? '' : 's'} match the current view.`}>
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

          {availableDonations.length > 0 ? (
            <div className="grid gap-4 xl:grid-cols-2">
              {availableDonations.map((donation) => (
                <DonationCard key={donation.id} donation={donation} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={ShoppingBag}
              title="No available food matches"
              description="Try a different search or clear one of the filters to review other prototype listings."
            />
          )}
        </div>
      </PageSection>
    </PageContent>
  );
}

export default AvailableFoodPage;
