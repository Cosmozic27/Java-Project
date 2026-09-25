import React, { useMemo, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { PageContent } from '@/components/common/PageContent';
import { PageHeader } from '@/components/common/PageHeader';
import { PageSection } from '@/components/common/PageSection';
import { Button } from '@/components/common/Button';
import { EmptyState } from '@/components/feedback/EmptyState';
import { ClaimCard, ClaimFilters } from '@/components/ngo';
import { NGO_CLAIMS } from '@/constants/ngoData';
import { filterNgoClaims } from '@/utils/ngo';

export function MyClaimsPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const filtered = useMemo(() => filterNgoClaims(NGO_CLAIMS, { search, status, category }), [search, status, category]);
  const reset = () => { setSearch(''); setStatus(''); setCategory(''); };
  return <PageContent><PageHeader title="My Claims" description="Manage requested donations, pickup windows, and completed community collections." badge={<span className="inline-flex items-center rounded-full border border-primary/20 bg-primary-light px-2.5 py-0.5 text-xs font-semibold text-primary-dark">NGO claims</span>} /><PageSection title="Claim workspace" description={`${filtered.length} of ${NGO_CLAIMS.length} illustrative claims shown.`}><ClaimFilters search={search} onSearchChange={setSearch} status={status} onStatusChange={setStatus} category={category} onCategoryChange={setCategory} /></PageSection>{filtered.length ? <div className="grid gap-5 lg:grid-cols-2">{filtered.map((claim) => <ClaimCard key={claim.id} claim={claim} />)}</div> : <EmptyState title="No claims match" description="Try a broader search or reset the filters to review your claim history." action={<Button variant="outline" leftIcon={<RotateCcw className="h-4 w-4" aria-hidden="true" />} onClick={reset}>Reset filters</Button>} />}</PageContent>;
}
export default MyClaimsPage;
