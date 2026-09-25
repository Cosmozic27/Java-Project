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
  return <div className="space-y-3 rounded-xl border border-border bg-surface p-3 sm:p-4"><div className="flex flex-col gap-3 lg:flex-row lg:items-center"><SearchBar value={search} onChange={(event) => onSearchChange(event.target.value)} onClear={() => onSearchChange('')} placeholder="Search records..." containerClassName="lg:max-w-sm" /> <div className="flex flex-wrap gap-2">{filters.map((filter) => <Select key={filter.label} aria-label={filter.label} value={filter.value} onChange={(event) => filter.onChange(event.target.value)} options={filter.options} placeholder={filter.label} className="min-w-36" />)}{onReset && <Button variant="ghost" size="sm" onClick={onReset}>Reset</Button>}</div></div>{resultCount !== undefined && <p className="text-xs text-text-secondary">Showing <span className="font-semibold text-text-primary">{resultCount}</span> records in the current view.</p>}</div>;
}

export function AdminDataTable({ columns, rows, getRowKey, mobileCard, empty = 'No records match the current filters.' }) {
  return <>{rows.length ? <><div className="hidden overflow-x-auto rounded-xl border border-border bg-surface md:block"><table className="w-full min-w-[760px] text-left text-sm"><thead className="border-b border-border bg-surface-muted text-[11px] uppercase tracking-wider text-text-secondary"><tr>{columns.map((column) => <th key={column.key} className={cn('whitespace-nowrap px-4 py-3 font-semibold', column.align === 'right' && 'text-right')}>{column.label}</th>)}</tr></thead><tbody className="divide-y divide-border/70">{rows.map((row) => <tr key={getRowKey(row)} className="align-top transition-colors hover:bg-background-subtle/60">{columns.map((column) => <td key={column.key} className={cn('px-4 py-3.5', column.align === 'right' && 'text-right')}>{column.render ? column.render(row) : row[column.key]}</td>)}</tr>)}</tbody></table></div><div className="grid gap-3 md:hidden">{rows.map((row) => <div key={getRowKey(row)}>{mobileCard(row)}</div>)}</div></> : <div className="rounded-xl border border-dashed border-border bg-surface-muted/50 px-5 py-12 text-center"><Search className="mx-auto h-6 w-6 text-text-muted" /><p className="mt-3 text-sm font-semibold text-text-primary">{empty}</p><p className="mt-1 text-xs text-text-secondary">Try adjusting the search or filters.</p></div>}</>;
}

export function AdminDetailSection({ title, description, children, action }) { return <Card padding="lg"><CardHeader className="flex-row items-start justify-between gap-4"><div><CardTitle>{title}</CardTitle>{description && <CardDescription>{description}</CardDescription>}</div>{action}</CardHeader><CardContent>{children}</CardContent></Card>; }

export function AdminStatus({ status }) { return <StatusBadge status={adminStatusLabel(status)} showIcon size="sm" />; }

export function AdminActivityList({ items }) { const tones = { primary: 'bg-primary-light text-primary', info: 'bg-blue-50 text-info', warning: 'bg-amber-50 text-warning', success: 'bg-emerald-50 text-success' }; return <ol className="divide-y divide-border/70">{items.map((item) => <li key={`${item.label}-${item.time}`} className="flex gap-3 py-3 first:pt-0 last:pb-0"><span className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg', tones[item.tone] || tones.primary)}><Clock3 className="h-4 w-4" aria-hidden="true" /></span><div className="min-w-0 flex-1"><p className="text-sm font-semibold text-text-primary">{item.label}</p><p className="mt-0.5 text-xs leading-relaxed text-text-secondary">{item.detail}</p><p className="mt-1 text-[11px] text-text-muted">{item.time}</p></div></li>)}</ol>; }

export function AdminChartCard({ title, description, children, action }) { return <Card padding="lg"><CardHeader className="flex-row items-start justify-between gap-4"><div><CardTitle>{title}</CardTitle>{description && <CardDescription>{description}</CardDescription>}</div>{action}</CardHeader><CardContent>{children}</CardContent></Card>; }

export function AdminConfirmationModal({ isOpen, onClose, onConfirm, title = 'Confirm prototype action', description, confirmLabel = 'Confirm', danger = false }) { return <Modal isOpen={isOpen} onClose={onClose} title={title} description={description || 'This action updates local prototype state only. No backend record will be changed.'} footer={<><Button variant="outline" onClick={onClose}>Cancel</Button><Button variant={danger ? 'danger' : 'primary'} onClick={onConfirm}>{confirmLabel}</Button></>}><p className="text-sm leading-relaxed text-text-secondary">This frontend interaction is for demonstration purposes. It does not persist changes to the FoodBridge backend.</p></Modal>; }

export function AdminPagination({ page = 1, total = 1, onChange }) { return <div className="flex items-center justify-between border-t border-border/70 pt-4 text-xs text-text-secondary"><span>Page {page} of {total}</span><div className="flex gap-2"><Button size="sm" variant="outline" disabled={page <= 1} onClick={() => onChange(page - 1)}>Previous</Button><Button size="sm" variant="outline" disabled={page >= total} onClick={() => onChange(page + 1)}>Next</Button></div></div>; }

export function DetailValue({ label, value }) { return <div className="rounded-lg border border-border bg-surface-muted/50 p-3.5"><dt className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">{label}</dt><dd className="mt-1.5 text-sm font-semibold text-text-primary">{value || '—'}</dd></div>; }
export function BackLink({ to, children = 'Back' }) { return <Link to={to} className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30">← {children}</Link>; }
export { CheckCircle2, MoreHorizontal, ShieldCheck, XCircle };
