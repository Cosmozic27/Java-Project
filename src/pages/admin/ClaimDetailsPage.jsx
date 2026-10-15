import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle2, PackageCheck, Truck, XCircle } from 'lucide-react';
import { PageContent } from '@/components/common/PageContent';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/cards/Card';
import { useToast } from '@/components/feedback';
import {
  AdminConfirmationModal,
  AdminDetailSection,
  AdminStatus,
  BackLink,
  DetailValue,
} from '@/components/admin';
import { adminDemoAdapter } from '@/services/adminDemoAdapter';

export default function ClaimDetailsPage() {
  const { claimId } = useParams();
  const toast = useToast();
  const claim = adminDemoAdapter.getClaimById(claimId);
  const [status, setStatus] = useState(claim?.status || 'REQUEST_SUBMITTED');
  const [next, setNext] = useState(null);

  const labels = {
    REQUEST_SUBMITTED: 'Request Submitted',
    CLAIM_CONFIRMED: 'Claim Confirmed',
    PICKUP_PENDING: 'Pickup Pending',
    COLLECTED: 'Collected',
    COMPLETED: 'Completed',
    CANCELLED: 'Cancelled',
  };

  const transitions = [
    { value: 'CLAIM_CONFIRMED', label: 'Confirm', icon: CheckCircle2 },
    { value: 'PICKUP_PENDING', label: 'Mark pickup pending', icon: Truck },
    { value: 'COLLECTED', label: 'Mark collected', icon: PackageCheck },
    { value: 'COMPLETED', label: 'Mark completed', icon: CheckCircle2 },
    { value: 'CANCELLED', label: 'Cancel', icon: XCircle },
  ];

  const confirm = () => {
    if (next?.value && claim?.id) {
      adminDemoAdapter.updateClaim(claim.id, {
        status: next.value,
        pickupStatus: labels[next.value] || next.value,
      });
      setStatus(next.value);
      toast.success(`Claim status updated to ${labels[next.value] || next.value}.`);
    }
    setNext(null);
  };

  if (!claim) {
    return (
      <PageContent>
        <PageHeader
          breadcrumbs={<BackLink to="/admin/claims">Back to Claims</BackLink>}
          title="Claim Not Found"
          description="The requested claim record could not be found."
        />
      </PageContent>
    );
  }

  return (
    <PageContent>
      <PageHeader
        breadcrumbs={<BackLink to="/admin/claims">Back to Claims</BackLink>}
        title={`Claim ${claim.id}`}
        description={`${claim.food} · ${claim.ngo}`}
        badge={<AdminStatus status={status} />}
        actions={
          <div className="flex flex-wrap gap-2">
            {transitions.map((item) => (
              <Button
                key={item.value}
                size="sm"
                variant={item.value === 'CANCELLED' ? 'subtle-danger' : 'outline'}
                leftIcon={<item.icon className="h-3.5 w-3.5" />}
                onClick={() => setNext(item)}
              >
                {item.label}
              </Button>
            ))}
          </div>
        }
      />
      <div className="grid gap-6 grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] w-full min-w-0">
        <div className="space-y-6">
          <AdminDetailSection title="Claim information">
            <dl className="grid gap-3 grid-cols-1 sm:grid-cols-2 w-full min-w-0">
              <DetailValue label="Claim ID" value={claim.id} />
              <DetailValue label="Food" value={claim.food} />
              <DetailValue label="Quantity" value={claim.quantity} />
              <DetailValue label="Claim date" value={claim.claimDate} />
              <DetailValue label="Current status" value={labels[status] || status} />
              <DetailValue label="Last updated" value={claim.lastUpdated} />
            </dl>
          </AdminDetailSection>
          <AdminDetailSection title="NGO and donor information">
            <dl className="grid gap-3 grid-cols-1 sm:grid-cols-2 w-full min-w-0">
              <DetailValue label="NGO" value={claim.ngo} />
              <DetailValue label="NGO reference" value={claim.ngoId} />
              <DetailValue label="Donor" value={claim.donor} />
              <DetailValue label="Donation reference" value={claim.donationId} />
            </dl>
          </AdminDetailSection>
          <AdminDetailSection title="Pickup information">
            <dl className="grid gap-3 grid-cols-1 sm:grid-cols-2 w-full min-w-0">
              <DetailValue label="Pickup location" value={claim.pickupLocation} />
              <DetailValue label="Pickup window" value={claim.pickupWindow} />
              <DetailValue label="Pickup status" value={claim.pickupStatus} />
            </dl>
          </AdminDetailSection>
        </div>
        <Card padding="lg">
          <h2 className="text-base font-bold text-text-primary">Claim timeline</h2>
          <div className="mt-6 space-y-5">
            {[
              'Request Submitted',
              'Claim Confirmed',
              'Pickup Pending',
              'Collected',
              'Completed',
            ].map((step, index) => {
              const current = [
                'REQUEST_SUBMITTED',
                'CLAIM_CONFIRMED',
                'PICKUP_PENDING',
                'COLLECTED',
                'COMPLETED',
              ].indexOf(status);
              return (
                <div key={step} className="flex gap-3">
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                      index <= current
                        ? 'bg-primary text-white'
                        : 'border border-border bg-surface-muted text-text-muted'
                    }`}
                  >
                    <span className="text-xs font-bold">{index + 1}</span>
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{step}</p>
                    <p className="mt-0.5 text-xs text-text-secondary">{index <= current ? claim.lastUpdated : 'Awaiting transition'}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-6 rounded-lg border border-border bg-surface-muted/50 p-3 text-xs leading-relaxed text-text-secondary">
            Operational transitions reflect current pickup coordination and handover steps.
          </p>
        </Card>
      </div>
      <AdminConfirmationModal
        isOpen={Boolean(next)}
        onClose={() => setNext(null)}
        onConfirm={confirm}
        title={`${next?.label}?`}
        description="Are you sure you want to transition this claim to the selected status?"
        confirmLabel="Update Status"
        danger={next?.value === 'CANCELLED'}
      />
    </PageContent>
  );
}
