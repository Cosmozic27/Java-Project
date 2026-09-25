import React from 'react';
import { SearchBar } from '@/components/forms/SearchBar';
import { Select } from '@/components/forms/Select';
import { NGO_CATEGORIES, NGO_CLAIM_STATUS_LABELS, NGO_CLAIM_STATUSES } from '@/constants/ngoData';

export function ClaimFilters({ search, onSearchChange, status, onStatusChange, category, onCategoryChange, searchPlaceholder = 'Search claims, food, donor, or location...' }) {
  const statusOptions = [{ value: '', label: 'All statuses' }, ...NGO_CLAIM_STATUSES.map((value) => ({ value, label: NGO_CLAIM_STATUS_LABELS[value] }))];
  const categoryOptions = [{ value: '', label: 'All categories' }, ...NGO_CATEGORIES.map((value) => ({ value, label: value }))];
  return (
    <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_190px_190px]">
      <SearchBar value={search} onChange={(event) => onSearchChange(event.target.value)} onClear={() => onSearchChange('')} placeholder={searchPlaceholder} />
      <Select aria-label="Filter claims by status" value={status} onChange={(event) => onStatusChange(event.target.value)} options={statusOptions} placeholder="" />
      <Select aria-label="Filter claims by category" value={category} onChange={(event) => onCategoryChange(event.target.value)} options={categoryOptions} placeholder="" />
    </div>
  );
}
export default ClaimFilters;
