import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, PackagePlus } from 'lucide-react';
import { PageContent } from '@/components/common/PageContent';
import { PageHeader } from '@/components/common/PageHeader';
import { PageSection } from '@/components/common/PageSection';
import { Button } from '@/components/common/Button';
import { EmptyState } from '@/components/feedback/EmptyState';
import { DonationCard, DonationFilters } from '@/components/donor';
import { MOCK_DONATIONS } from '@/constants/donorData';
import { filterDonations } from '@/utils/donor';

export function MyDonationsPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');

  const donations = useMemo(
    () => filterDonations(MOCK_DONATIONS, { search, status, category }),
    [search, status, category]
  );

  return (
    <PageContent>
      <PageHeader
        title="My Donations"
        description="Manage the food listings your organization has prepared, posted, and handed over."
        actions={
          <Button asChild variant="primary" leftIcon={<PackagePlus className="h-4 w-4" />}>
            <Link to="/donor/donations/new">Create donation</Link>
          </Button>
        }
      />

      <PageSection title="Donation workspace" description={`${donations.length} of ${MOCK_DONATIONS.length} illustrative donations shown.`}>
        <div className="space-y-5">
          <DonationFilters
            search={search}
            onSearchChange={setSearch}
            status={status}
            onStatusChange={setStatus}
            category={category}
            onCategoryChange={setCategory}
          />

          {donations.length > 0 ? (
            <div className="grid gap-4 xl:grid-cols-2">
              {donations.map((donation) => (
                <DonationCard key={donation.id} donation={donation} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={ClipboardList}
              title="No donations match"
              description="Try clearing a filter or create a new surplus listing for this prototype workspace."
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
