import React from 'react';
import { Check, Circle } from 'lucide-react';
import { DONATION_STATUS_LABELS } from '@/constants/donorData';

const FLOW_STAGES = [
'AVAILABLE',
'CLAIMED',
'PICKUP_PENDING',
'COLLECTED',
'COMPLETED',
];

function normalizeStatus(status) {
const value = String(status || 'AVAILABLE')
.trim()
.toUpperCase()
.replace(/[\s-]+/g, '_');

const aliases = {
ACTIVE: 'AVAILABLE',
REQUESTED: 'CLAIMED',
CLAIM_REQUESTED: 'CLAIMED',
PICKUP_IN_PROGRESS: 'PICKUP_PENDING',
PICKED_UP: 'COLLECTED',
DELIVERED: 'COLLECTED',
DONE: 'COMPLETED',
};

return aliases[value] || value;
}

export function DonationStatusTimeline({ status }) {
const normalizedStatus = normalizeStatus(status);

if (['EXPIRED', 'CANCELLED'].includes(normalizedStatus)) {
return ( <div className="rounded-xl border border-border bg-surface-muted p-4"> <p className="text-sm font-semibold text-text-primary">
{DONATION_STATUS_LABELS[normalizedStatus] || normalizedStatus} </p> <p className="mt-1 text-xs leading-relaxed text-text-secondary">
This donation did not continue through the standard redistribution flow. </p> </div>
);
}

const currentIndex = FLOW_STAGES.indexOf(normalizedStatus);

if (currentIndex === -1) {
return ( <div className="rounded-xl border border-border bg-surface-muted p-4"> <p className="text-sm font-semibold text-text-primary">
Donation status: {String(status || 'Unknown')} </p> <p className="mt-1 text-xs text-text-secondary">
This status is not mapped to a timeline step yet. </p> </div>
);
}

return ( <ol className="space-y-0">
{FLOW_STAGES.map((stage, index) => {
const complete = index < currentIndex;
const current = index === currentIndex;


    return (
      <li key={stage} className="relative flex gap-3 pb-5 last:pb-0">
        {index < FLOW_STAGES.length - 1 && (
          <span
            className={`absolute left-[11px] top-6 h-full w-px ${
              complete ? 'bg-primary' : 'bg-border'
            }`}
            aria-hidden="true"
          />
        )}

        <span
          className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
            complete || current
              ? 'border-primary bg-primary text-white'
              : 'border-border bg-surface text-text-muted'
          }`}
        >
          {complete ? (
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
          ) : current ? (
            <span className="h-2 w-2 rounded-full bg-white" aria-hidden="true" />
          ) : (
            <Circle className="h-3 w-3" aria-hidden="true" />
          )}
        </span>

        <div className="pt-0.5">
          <p
            className={`text-sm ${
              current
                ? 'font-bold text-text-primary'
                : 'font-medium text-text-secondary'
            }`}
          >
            {DONATION_STATUS_LABELS[stage] || stage}
            {current && (
              <span className="ml-2 text-xs font-medium text-primary">
                Current
              </span>
            )}
          </p>
        </div>
      </li>
    );
  })}
</ol>


);
}

export default DonationStatusTimeline;
