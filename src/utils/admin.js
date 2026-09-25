import { STATUS_LABELS } from '@/constants/adminData';

export function adminStatusLabel(status) {
  return STATUS_LABELS[status] || status || 'Unknown';
}

export function filterAdminRecords(records, { search = '', status = '', category = '', role = '', area = '', ngo = '' } = {}) {
  const query = search.trim().toLowerCase();
  return records.filter((record) => {
    const values = Object.values(record).filter((value) => typeof value === 'string').join(' ').toLowerCase();
    return (!query || values.includes(query))
      && (!status || record.status === status)
      && (!category || record.category === category)
      && (!role || record.role === role)
      && (!area || record.area === area || record.serviceArea?.includes(area))
      && (!ngo || record.ngo === ngo);
  });
}

export function sortRecords(records, key, direction = 'asc') {
  return [...records].sort((a, b) => String(a[key] || '').localeCompare(String(b[key] || '')) * (direction === 'desc' ? -1 : 1));
}

export const formatNumber = (value) => new Intl.NumberFormat('en-IN').format(value);
