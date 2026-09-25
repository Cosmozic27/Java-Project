import React, { useMemo, useState } from 'react';
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
import { NGO_AREAS, NGO_AVAILABLE_FOOD, NGO_CATEGORIES } from '@/constants/ngoData';
import { filterNgoFood } from '@/utils/ngo';
import { SearchBar } from '@/components/forms/SearchBar';

export function AvailableFoodPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [dietary, setDietary] = useState('');
  const [area, setArea] = useState('');
  const filtered = useMemo(() => filterNgoFood(NGO_AVAILABLE_FOOD, { search, category, dietary, area, status: 'AVAILABLE' }), [search, category, dietary, area]);
  const hasFilters = Boolean(search || category || dietary || area);
  const reset = () => { setSearch(''); setCategory(''); setDietary(''); setArea(''); };
  return (
    <PageContent>
      <PageHeader title="Available Food" description="Browse surplus food from local donors and request suitable donations for your community." badge={<span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary-light px-2.5 py-0.5 text-xs font-semibold text-primary-dark">NGO discovery</span>} />
      <Card variant="subtle" padding="sm" className="flex items-start gap-3 border-info/20"><Info className="mt-0.5 h-4 w-4 shrink-0 text-info" aria-hidden="true" /><p className="text-xs leading-relaxed text-text-secondary">Listings show donor-provided details. Review preparation time, consume-before window, storage, allergens, and your own capacity before requesting a donation.</p></Card>
      <PageSection title="Food listings" description={`${filtered.length} available listing${filtered.length === 1 ? '' : 's'} match the current view.`}>
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_170px_170px_170px]">
          <SearchBar value={search} onChange={(event) => setSearch(event.target.value)} onClear={() => setSearch('')} placeholder="Search food, donor, or location..." />
          <Select aria-label="Filter by food category" value={category} onChange={(event) => setCategory(event.target.value)} options={[{ value: '', label: 'All categories' }, ...NGO_CATEGORIES.map((value) => ({ value, label: value }))]} placeholder="" />
          <Select aria-label="Filter by dietary profile" value={dietary} onChange={(event) => setDietary(event.target.value)} options={[{ value: '', label: 'All dietary profiles' }, { value: 'Vegetarian', label: 'Vegetarian' }, { value: 'Vegetarian & Non-Vegetarian', label: 'Mixed dietary' }]} placeholder="" />
          <Select aria-label="Filter by area" value={area} onChange={(event) => setArea(event.target.value)} options={[{ value: '', label: 'All areas' }, ...NGO_AREAS.map((value) => ({ value, label: value }))]} placeholder="" />
        </div>
      </PageSection>
      {filtered.length ? <div className="grid gap-5 lg:grid-cols-2">{filtered.map((food) => <FoodDonationCard key={food.id} donation={food} onClaim={() => navigate(`/ngo/food/${food.id}`)} />)}</div> : <EmptyState icon={ShieldCheck} title="No available food matches" description="Try a broader search or reset the filters to review all current listings." action={hasFilters ? <Button variant="outline" leftIcon={<RotateCcw className="h-4 w-4" aria-hidden="true" />} onClick={reset}>Reset filters</Button> : undefined} />}
      <Card variant="subtle" padding="md" className="flex items-start gap-3"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" /><p className="text-xs leading-relaxed text-text-secondary">Food safety information is provided by the donor. FoodBridge does not certify or guarantee food safety; organizations should assess suitability before accepting or distributing food.</p></Card>
    </PageContent>
  );
}
export default AvailableFoodPage;
