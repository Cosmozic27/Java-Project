import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Clock3, MoreHorizontal, Search, ShieldCheck, XCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/cards/Card';
import { Button } from '@/components/common/Button';
import { SearchBar } from '@/components/forms/SearchBar';
import { Select } from '@/components/forms/Select';
import { StatusBadge } from '@/components/data-display/StatusBadge';
import { Modal } from '@/components/feedback/Modal';
import { cn } from '@/utils/cn';
import { adminStatusLabel } from '@/utils/admin';

export function AdminTableToolbar({ search, onSearchChange, filters = [], onReset, resultCount }) {
  return (
    <div className="space-y-3 rounded-xl border border-border bg-surface p-3 sm:p-4 w-full max-w-full min-w-0">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <SearchBar
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          onClear={() => onSearchChange('')}
          placeholder="Search records..."
          containerClassName="w-full lg:max-w-sm"
        />
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          {filters.map((filter) => (
            <Select
              key={filter.label}
              aria-label={filter.label}
              value={filter.value}
              onChange={(event) => filter.onChange(event.target.value)}
              options={filter.options}
              placeholder={filter.label}
              className="w-full sm:w-auto sm:min-w-36 flex-1 sm:flex-initial"
            />
          ))}
          {onReset && (
            <Button variant="ghost" size="sm" onClick={onReset} className="shrink-0">
              Reset
            </Button>
          )}
        </div>
      </div>
      {resultCount !== undefined && (
        <p className="text-xs text-text-secondary">
          Showing <span className="font-semibold text-text-primary">{resultCount}</span> records in the current view.
        </p>
      )}
    </div>
  );
}

export function AdminDataTable({ columns, rows, getRowKey, mobileCard, empty = 'No records match the current filters.' }) {
  return (
    <>
      {rows.length ? (
        <>
          <div className="hidden overflow-x-auto rounded-xl border border-border bg-surface md:block w-full max-w-full">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b border-border bg-surface-muted text-[11px] uppercase tracking-wider text-text-secondary">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className={cn(
                        'whitespace-nowrap px-4 py-3 font-semibold',
                        column.align === 'right' && 'text-right'
                      )}
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/70">
                {rows.map((row) => (
                  <tr
                    key={getRowKey(row)}
                    className="align-top transition-colors hover:bg-background-subtle/60"
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={cn('px-4 py-3.5', column.align === 'right' && 'text-right')}
                      >
                        {column.render ? column.render(row) : row[column.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid gap-3 md:hidden w-full min-w-0">
            {rows.map((row) => (
              <div key={getRowKey(row)} className="w-full min-w-0">
                {mobileCard ? (
                  mobileCard(row)
                ) : (
                  <div className="rounded-xl border border-border bg-surface p-4 space-y-2">
                    {columns.map((col) => (
                      <div key={col.key} className="flex justify-between items-center text-xs">
                        <span className="text-text-muted">{col.label}</span>
                        <span className="font-medium text-text-primary">{col.render ? col.render(row) : row[col.key]}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-xl border border-dashed border-border bg-surface-muted/50 px-5 py-12 text-center w-full">
          <Search className="mx-auto h-6 w-6 text-text-muted" />
          <p className="mt-3 text-sm font-semibold text-text-primary">{empty}</p>
          <p className="mt-1 text-xs text-text-secondary">Try adjusting the search or filters.</p>
        </div>
      )}
    </>
  );
}

export function AdminDetailSection({ title, description, children, action, className = '' }) {
  return (
    <Card padding="md" className={cn('w-full min-w-0 max-w-full', className)}>
      <CardHeader className="flex-row items-start justify-between gap-4 min-w-0">
        <div className="min-w-0 flex-1">
          <CardTitle className="break-words">{title}</CardTitle>
          {description && <CardDescription className="break-words">{description}</CardDescription>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </CardHeader>
      <CardContent className="w-full min-w-0">{children}</CardContent>
    </Card>
  );
}

export function AdminStatus({ status }) { return <StatusBadge status={adminStatusLabel(status)} showIcon size="sm" />; }

export function AdminActivityList({ items }) {
  const tones = {
    primary: 'bg-primary-light text-primary',
    info: 'bg-blue-50 text-info',
    warning: 'bg-amber-50 text-warning',
    success: 'bg-emerald-50 text-success'
  };
  return (
    <ol className="divide-y divide-border/70 w-full min-w-0">
      {items.map((item) => (
        <li key={`${item.label}-${item.time}`} className="flex gap-3 py-3 first:pt-0 last:pb-0 min-w-0">
          <span className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg', tones[item.tone] || tones.primary)}>
            <Clock3 className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-text-primary break-words">{item.label}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-text-secondary break-words">{item.detail}</p>
            <p className="mt-1 text-[11px] text-text-muted">{item.time}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function AdminChartCard({ title, description, children, action, className = '' }) {
  return (
    <Card padding="md" className={cn('w-full min-w-0 max-w-full overflow-hidden', className)}>
      <CardHeader className="flex-row items-start justify-between gap-4 min-w-0">
        <div className="min-w-0 flex-1">
          <CardTitle className="break-words">{title}</CardTitle>
          {description && <CardDescription className="break-words">{description}</CardDescription>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </CardHeader>
      <CardContent className="w-full min-w-0 overflow-hidden">{children}</CardContent>
    </Card>
  );
}

export function AdminConfirmationModal({ isOpen, onClose, onConfirm, title = 'Confirm action', description, confirmLabel = 'Confirm', danger = false }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description || 'Please confirm that you want to proceed with this action.'}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant={danger ? 'danger' : 'primary'} onClick={onConfirm}>{confirmLabel}</Button>
        </>
      }
    >
      <p className="text-sm leading-relaxed text-text-secondary">Are you sure you want to proceed with this platform action?</p>
    </Modal>
  );
}

export function AdminPagination({ page = 1, total = 1, onChange }) {
  return (
    <div className="flex items-center justify-between border-t border-border/70 pt-4 text-xs text-text-secondary w-full">
      <span>Page {page} of {total}</span>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" disabled={page <= 1} onClick={() => onChange(page - 1)}>Previous</Button>
        <Button size="sm" variant="outline" disabled={page >= total} onClick={() => onChange(page + 1)}>Next</Button>
      </div>
    </div>
  );
}

export function DetailValue({ label, value }) {
  return (
    <div className="rounded-lg border border-border bg-surface-muted/50 p-3 sm:p-3.5 min-w-0 overflow-hidden">
      <dt className="text-[11px] font-semibold uppercase tracking-wider text-text-muted truncate">{label}</dt>
      <dd className="mt-1.5 text-sm font-semibold text-text-primary break-words">{value || '—'}</dd>
    </div>
  );
}
export function BackLink({ to, children = 'Back' }) { return <Link to={to} className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30">← {children}</Link>; }
export { CheckCircle2, MoreHorizontal, ShieldCheck, XCircle };
