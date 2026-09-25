import React from 'react';
import { Check, Circle } from 'lucide-react';
import { NGO_CLAIM_STATUS_LABELS } from '@/constants/ngoData';

const FLOW_STAGES = ['REQUESTED', 'CONFIRMED', 'PICKUP_PENDING', 'COLLECTED', 'COMPLETED'];

export function ClaimStatusTimeline({ status }) {
  if (status === 'CANCELLED' || status === 'EXPIRED') {
    return <div className="rounded-xl border border-border bg-surface-muted p-4"><p className="text-sm font-semibold text-text-primary">{NGO_CLAIM_STATUS_LABELS[status]}</p><p className="mt-1 text-xs leading-relaxed text-text-secondary">This claim did not continue through the standard pickup flow.</p></div>;
  }
  const currentIndex = FLOW_STAGES.indexOf(status);
  return (
    <ol className="space-y-0" aria-label="Claim status timeline">
      {FLOW_STAGES.map((stage, index) => {
        const complete = index < currentIndex;
        const current = index === currentIndex;
        return <li key={stage} className="relative flex gap-3 pb-5 last:pb-0">
          {index < FLOW_STAGES.length - 1 && <span className={`absolute left-[11px] top-6 h-full w-px ${complete ? 'bg-primary' : 'bg-border'}`} aria-hidden="true" />}
          <span className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${complete || current ? 'border-primary bg-primary text-white' : 'border-border bg-surface text-text-muted'}`}>
            {complete ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : current ? <span className="h-2 w-2 rounded-full bg-white" aria-hidden="true" /> : <Circle className="h-3 w-3" aria-hidden="true" />}
          </span>
          <p className={`pt-0.5 text-sm ${current ? 'font-bold text-text-primary' : 'font-medium text-text-secondary'}`}>{NGO_CLAIM_STATUS_LABELS[stage]}{current && <span className="ml-2 text-xs font-medium text-primary">Current</span>}</p>
        </li>;
      })}
    </ol>
  );
}
export default ClaimStatusTimeline;
