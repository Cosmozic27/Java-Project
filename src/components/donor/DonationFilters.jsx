import React from 'react';
import { SearchBar } from '@/components/forms/SearchBar';
import { Select } from '@/components/forms/Select';
import { DONATION_STATUS_LABELS, DONATION_CATEGORIES, DONATION_STATUSES } from '@/constants/donorData';

export function DonationFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  category,
  onCategoryChange,
  showCategory = true,
  searchPlaceholder = 'Search food, category, or location...',
}) {
  const statusOptions = [
    { value: '', label: 'All statuses' },
    ...DONATION_STATUSES.map((value) => ({ value, label: DONATION_STATUS_LABELS[value] })),
  ];
  const categoryOptions = [
    { value: '', label: 'All categories' },
    ...DONATION_CATEGORIES.map((value) => ({ value, label: value })),
  ];

  return (
    <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_190px_190px]">
      <SearchBar
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        onClear={() => onSearchChange('')}
        placeholder={searchPlaceholder}
      />
      <Select
        aria-label="Filter by donation status"
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
        options={statusOptions}
        placeholder=""
      />
      {showCategory ? (
        <Select
          aria-label="Filter by food category"
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          options={categoryOptions}
          placeholder=""
        />
      ) : (
        <div className="hidden md:block" aria-hidden="true" />
      )}
    </div>
  );
}

export default DonationFilters;
