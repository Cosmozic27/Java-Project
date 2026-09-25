import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Archive, ArrowRight } from 'lucide-react';
import { PageContent } from '@/components/common/PageContent';
import { PageHeader } from '@/components/common/PageHeader';
import { PageSection } from '@/components/common/PageSection';
import { StatusBadge } from '@/components/data-display/StatusBadge';
import { EmptyState } from '@/components/feedback/EmptyState';
import { DonationCard, DonationFilters } from '@/components/donor';
import { DONATION_STATUS_LABELS, MOCK_DONATIONS } from '@/constants/donorData';
import { filterDonations } from '@/utils/donor';

const HISTORY_STATUSES = new Set(['COLLECTED', 'COMPLETED', 'EXPIRED', 'CANCELLED']);

export function HistoryPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');

  const history = useMemo(
    () => filterDonations(MOCK_DONATIONS.filter((donation) => HISTORY_STATUSES.has(donation.status)), { search, status, category }),
    [search, status, category]
  );

  return (
    <PageContent>
      <PageHeader
        title="Donation History"
        description="Review completed, collected, expired, and cancelled surplus-food listings from the donor workspace."
      />

      <PageSection title="Historical record" description={`${history.length} historical listing${history.length === 1 ? '' : 's'} in the current view.`}>
        <div className="space-y-5">
          <DonationFilters
            search={search}
            onSearchChange={setSearch}
            status={status}
            onStatusChange={setStatus}
            category={category}
            onCategoryChange={setCategory}
            searchPlaceholder="Search donation history..."
          />

          {history.length > 0 ? (
            <>
              <div className="hidden overflow-hidden rounded-xl border border-border bg-surface md:block">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">Donor donation history</caption>
                  <thead className="border-b border-border bg-surface-muted text-xs uppercase tracking-wider text-text-secondary">
                    <tr>
                      <th scope="col" className="px-5 py-3 font-semibold">Donation</th>
                      <th scope="col" className="px-5 py-3 font-semibold">Date & pickup</th>
                      <th scope="col" className="px-5 py-3 font-semibold">Outcome</th>
                      <th scope="col" className="px-5 py-3 text-right font-semibold">View</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/70">
                    {history.map((donation) => (
                      <tr key={donation.id} className="align-top">
                        <td className="px-5 py-4">
                          <p className="font-semibold text-text-primary">{donation.name}</p>
                          <p className="mt-1 text-xs text-text-secondary">{donation.quantity} · {donation.category}</p>
                        </td>
                        <td className="px-5 py-4 text-xs text-text-secondary">
                          <p>{donation.pickupDate}</p>
                          <p className="mt-1">{donation.pickupWindow}</p>
                        </td>
                        <td className="px-5 py-4">
                          <StatusBadge status={DONATION_STATUS_LABELS[donation.status]} size="sm" showIcon />
                          <p className="mt-2 text-xs text-text-secondary">{donation.impact}</p>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <Link
                            to={`/donor/donations/${donation.id}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                          >
                            Details <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid gap-4 md:hidden">
                {history.map((donation) => (
                  <DonationCard key={donation.id} donation={donation} compact />
                ))}
              </div>
            </>
          ) : (
            <EmptyState
              icon={Archive}
              title="No history matches"
              description="Try a different status, category, or search term to review other prototype records."
            />
          )}
        </div>
      </PageSection>
    </PageContent>
  );
}

export default HistoryPage;
