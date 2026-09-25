import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Truck, 
  PackageCheck, 
  AlertCircle, 
  XCircle,
  HelpCircle 
} from 'lucide-react';
import { cn } from '@/utils/cn';

const statusConfig = {
  Available: {
    label: 'Available',
    classes: 'bg-green-50 text-green-700 border-green-200',
    dotClass: 'bg-green-500',
    icon: CheckCircle2,
  },
  Claimed: {
    label: 'Claimed',
    classes: 'bg-blue-50 text-blue-700 border-blue-200',
    dotClass: 'bg-blue-500',
    icon: Clock,
  },
  'Request Submitted': {
    label: 'Request Submitted',
    classes: 'bg-slate-50 text-slate-700 border-slate-200',
    dotClass: 'bg-slate-500',
    icon: Clock,
  },
  'Claim Confirmed': {
    label: 'Claim Confirmed',
    classes: 'bg-blue-50 text-blue-700 border-blue-200',
    dotClass: 'bg-blue-500',
    icon: CheckCircle2,
  },
  'Pickup Pending': {
    label: 'Pickup Pending',
    classes: 'bg-amber-50 text-amber-700 border-amber-200',
    dotClass: 'bg-amber-500',
    icon: Truck,
  },
  Collected: {
    label: 'Collected',
    classes: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    dotClass: 'bg-emerald-600',
    icon: PackageCheck,
  },
  Completed: {
    label: 'Completed',
    classes: 'bg-primary-light text-primary-dark border-primary/30',
    dotClass: 'bg-primary',
    icon: CheckCircle2,
  },
  Expired: {
    label: 'Expired',
    classes: 'bg-slate-100 text-slate-700 border-slate-200',
    dotClass: 'bg-slate-400',
    icon: AlertCircle,
  },
  Cancelled: {
    label: 'Cancelled',
    classes: 'bg-red-50 text-red-700 border-red-200',
    dotClass: 'bg-red-500',
    icon: XCircle,
  },
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
      (k) => k.toLowerCase() === String(status).trim().toLowerCase()
    ) || 'Available';

  const config = statusConfig[normalizedKey] || {
    label: status,
    classes: 'bg-slate-50 text-slate-700 border-slate-200',
    dotClass: 'bg-slate-400',
    icon: HelpCircle,
  };

  const IconComponent = config.icon;
  const displayLabel = label || config.label;

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border select-none transition-colors duration-150',
        config.classes,
        sizes[size] || sizes.md,
        className
      )}
    >
      {showDot && (
        <span
          className={cn(
            'h-1.5 w-1.5 rounded-full shrink-0',
            config.dotClass,
            normalizedKey === 'Available' && 'animate-pulse'
          )}
          aria-hidden="true"
        />
      )}

      {showIcon && IconComponent && (
        <IconComponent className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      )}

      <span className="truncate">{displayLabel}</span>
    </span>
  );
}

export default StatusBadge;
