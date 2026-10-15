import React from 'react';
import {
  CheckCircle2,
  Clock,
  Truck,
  PackageCheck,
  AlertCircle,
  XCircle,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/utils/cn';

const statusConfig = {
  Available: { label: 'Available', classes: 'bg-success/10 text-success border-success/30', dotClass: 'bg-success', icon: CheckCircle2 },
  Claimed: { label: 'Claimed', classes: 'bg-info/10 text-info border-info/30', dotClass: 'bg-info', icon: Clock },
  'Request Submitted': { label: 'Request Submitted', classes: 'bg-surface-muted text-text-secondary border-border', dotClass: 'bg-text-muted', icon: Clock },
  'Claim Confirmed': { label: 'Claim Confirmed', classes: 'bg-info/10 text-info border-info/30', dotClass: 'bg-info', icon: CheckCircle2 },
  'Pickup Pending': { label: 'Pickup Pending', classes: 'bg-warning/10 text-warning border-warning/30', dotClass: 'bg-warning', icon: Truck },
  Collected: { label: 'Collected', classes: 'bg-success/10 text-success border-success/30', dotClass: 'bg-success', icon: PackageCheck },
  Completed: { label: 'Completed', classes: 'bg-primary-light text-primary-dark border-primary/30', dotClass: 'bg-primary', icon: CheckCircle2 },
  Expired: { label: 'Expired', classes: 'bg-surface-muted text-text-secondary border-border', dotClass: 'bg-text-muted', icon: AlertCircle },
  Cancelled: { label: 'Cancelled', classes: 'bg-danger/10 text-danger border-danger/30', dotClass: 'bg-danger', icon: XCircle },
  Active: { label: 'Active', classes: 'bg-success/10 text-success border-success/30', dotClass: 'bg-success', icon: CheckCircle2 },
  Pending: { label: 'Pending', classes: 'bg-warning/10 text-warning border-warning/30', dotClass: 'bg-warning', icon: Clock },
  Inactive: { label: 'Inactive', classes: 'bg-surface-muted text-text-secondary border-border', dotClass: 'bg-text-muted', icon: Clock },
  Suspended: { label: 'Suspended', classes: 'bg-danger/10 text-danger border-danger/30', dotClass: 'bg-danger', icon: XCircle },
  'Pending Review': { label: 'Pending Review', classes: 'bg-warning/10 text-warning border-warning/30', dotClass: 'bg-warning', icon: Clock },
  Verified: { label: 'Verified', classes: 'bg-primary-light text-primary-dark border-primary/30', dotClass: 'bg-primary', icon: CheckCircle2 },
  Rejected: { label: 'Rejected', classes: 'bg-danger/10 text-danger border-danger/30', dotClass: 'bg-danger', icon: XCircle },
  'Needs Information': { label: 'Needs Information', classes: 'bg-info/10 text-info border-info/30', dotClass: 'bg-info', icon: HelpCircle },
};

const sizes = {
  sm: 'text-[11px] px-2 py-0.5 gap-1.5 font-medium',
  md: 'text-xs px-2.5 py-1 gap-1.5 font-semibold',
  lg: 'text-sm px-3 py-1.5 gap-2 font-semibold',
};

export function StatusBadge({
  status = 'Available',
  label,
  size = 'md',
  showDot = true,
  showIcon = false,
  className = '',
}) {
  const normalizedKey =
    Object.keys(statusConfig).find(
      (key) => key.toLowerCase() === String(status).trim().toLowerCase()
    ) || 'Available';
  const config = statusConfig[normalizedKey] || {
    label: status,
    classes: 'bg-surface-muted text-text-secondary border-border',
    dotClass: 'bg-text-muted',
    icon: HelpCircle,
  };
  const IconComponent = config.icon;
  const displayLabel = label || config.label;

  return (
    <span className={cn('inline-flex items-center rounded-full border select-none transition-colors duration-150', config.classes, sizes[size] || sizes.md, className)}>
      {showDot && (
        <span className={cn('h-1.5 w-1.5 rounded-full shrink-0', config.dotClass, normalizedKey === 'Available' && 'animate-pulse')} aria-hidden="true" />
      )}
      {showIcon && IconComponent && <IconComponent className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
      <span className="truncate">{displayLabel}</span>
    </span>
  );
}

export default StatusBadge;
