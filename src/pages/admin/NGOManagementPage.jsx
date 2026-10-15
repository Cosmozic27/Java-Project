import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { PageContent } from '@/components/common/PageContent';
import { PageHeader } from '@/components/common/PageHeader';
import { PageSection } from '@/components/common/PageSection';
import { AdminDataTable, AdminStatus, AdminTableToolbar } from '@/components/admin';
import { adminDemoAdapter } from '@/services/adminDemoAdapter';
import { filterAdminRecords } from '@/utils/admin';

export default function NGOManagementPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [area, setArea] = useState('');

  const allNgos = useMemo(() => adminDemoAdapter.getNgos(), []);
  const rows = useMemo(
    () => filterAdminRecords(allNgos, { search, status, area }),
    [allNgos, search, status, area]
  );

  const pendingCount = useMemo(
    () => allNgos.filter((item) => item.status === 'Pending Review').length,
    [allNgos]
  );

  const columns = [
    {
      key: 'name',
      label: 'Organization',
      render: (row) => (
        <div>
          <p className="font-semibold text-text-primary">{row.name}</p>
          <p className="mt-0.5 text-xs text-text-secondary">{row.contactPerson}</p>
        </div>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      render: (row) => <span className="text-xs text-text-secondary">{row.email}</span>,
    },
    { key: 'serviceArea', label: 'Service area' },
    { key: 'type', label: 'Type' },
    { key: 'submittedDate', label: 'Submitted' },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <AdminStatus
          status={
            row.status === 'Pending Review'
              ? 'PENDING'
              : row.status === 'Needs Information'
              ? 'NEEDS_INFORMATION'
              : row.status.toUpperCase()
          }
        />
      ),
    },
    {
      key: 'action',
      label: 'Action',
      align: 'right',
      render: (row) => (
        <Link
          to={`/admin/ngos/${row.id}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
        >
          <Eye className="h-3.5 w-3.5" />
          Review
        </Link>
      ),
    },
  ];

  return (
    <PageContent>
      <PageHeader
        title="NGO Verification"
        description="Review organization applications and verify partner credentials across the network."
        badge={
          <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
            {pendingCount} pending review
          </span>
        }
      />
      <PageSection
        title="Verification requests"
        description="Review submitted organization registration and contact verification details."
      >
        <AdminTableToolbar
          search={search}
          onSearchChange={setSearch}
          onReset={() => {
            setSearch('');
            setStatus('');
            setArea('');
          }}
          resultCount={rows.length}
          filters={[
            {
              label: 'All statuses',
              value: status,
              onChange: setStatus,
              options: [
                { value: '', label: 'All statuses' },
                { value: 'Pending Review', label: 'Pending Review' },
                { value: 'Verified', label: 'Verified' },
                { value: 'Rejected', label: 'Rejected' },
                { value: 'Needs Information', label: 'Needs Information' },
              ],
            },
            {
              label: 'All areas',
              value: area,
              onChange: setArea,
              options: [
                { value: '', label: 'All areas' },
                { value: 'Central Campus', label: 'Central Campus' },
                { value: 'North Gate', label: 'North Gate' },
                { value: 'Riverside District', label: 'Riverside District' },
              ],
            },
          ]}
        />
        <div className="mt-5">
          <AdminDataTable
            columns={columns}
            rows={rows}
            getRowKey={(row) => row.id}
            mobileCard={(row) => (
              <Link
                to={`/admin/ngos/${row.id}`}
                className="block rounded-xl border border-border bg-surface p-4 hover:border-primary/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-text-primary">{row.name}</p>
                    <p className="mt-1 text-xs text-text-secondary">
                      {row.contactPerson} · {row.type}
                    </p>
                  </div>
                  <AdminStatus
                    status={row.status === 'Pending Review' ? 'PENDING' : row.status.toUpperCase()}
                  />
                </div>
                <p className="mt-3 text-xs text-text-secondary">{row.serviceArea}</p>
                <p className="mt-3 text-xs font-semibold text-primary">Review organization →</p>
              </Link>
            )}
          />
        </div>
      </PageSection>
    </PageContent>
  );
}
