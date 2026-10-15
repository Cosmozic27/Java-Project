import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle2, FileText, Info, XCircle } from 'lucide-react';
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

export default function NGODetailsPage() {
  const { ngoId } = useParams();
  const toast = useToast();
  const ngo = adminDemoAdapter.getNgoById(ngoId);
  const [status, setStatus] = useState(ngo?.status || 'Pending Review');
  const [action, setAction] = useState(null);

  const confirm = () => {
    if (action?.status && ngo?.id) {
      adminDemoAdapter.updateNgo(ngo.id, { status: action.status });
      setStatus(action.status);
      toast.success(`NGO verification status updated to ${action.status}.`);
    }
    setAction(null);
  };

  if (!ngo) {
    return (
      <PageContent>
        <PageHeader
          breadcrumbs={<BackLink to="/admin/ngos">Back to NGO Verification</BackLink>}
          title="NGO Not Found"
          description="The requested NGO verification application does not exist."
        />
      </PageContent>
    );
  }

  const statusKey =
    status === 'Pending Review'
      ? 'PENDING'
      : status === 'Needs Information'
      ? 'NEEDS_INFORMATION'
      : status.toUpperCase();

  return (
    <PageContent>
      <PageHeader
        breadcrumbs={<BackLink to="/admin/ngos">Back to NGO Verification</BackLink>}
        title={ngo.name}
        description={`${ngo.id} · ${ngo.type}`}
        badge={<AdminStatus status={statusKey} />}
        actions={
          <div className="flex flex-wrap gap-2">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<CheckCircle2 className="h-3.5 w-3.5" />}
              onClick={() => setAction({ status: 'Verified', title: 'Approve NGO?' })}
            >
              Approve
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Info className="h-3.5 w-3.5" />}
              onClick={() => setAction({ status: 'Needs Information', title: 'Request information?' })}
            >
              Request information
            </Button>
            <Button
              variant="subtle-danger"
              size="sm"
              leftIcon={<XCircle className="h-3.5 w-3.5" />}
              onClick={() => setAction({ status: 'Rejected', title: 'Reject NGO application?' })}
            >
              Reject
            </Button>
          </div>
        }
      />
      <div className="grid gap-6 grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] w-full min-w-0">
        <AdminDetailSection
          title="Organization overview"
          description="Submitted information and verification records."
        >
          <dl className="grid gap-3 grid-cols-1 sm:grid-cols-2 w-full min-w-0">
            <DetailValue label="Organization type" value={ngo.type} />
            <DetailValue label="Reference number" value={ngo.reference} />
            <DetailValue label="Email" value={ngo.email} />
            <DetailValue label="Phone" value={ngo.phone} />
            <DetailValue label="Address" value={ngo.address} />
            <DetailValue label="Submitted date" value={ngo.submittedDate} />
          </dl>
        </AdminDetailSection>
        <Card padding="lg">
          <h2 className="text-base font-bold text-text-primary">Verification timeline</h2>
          <div className="mt-5 space-y-4">
            {[
              ['Submitted', ngo.submittedDate],
              ['Review status', status],
              ['Next step', status === 'Verified' ? 'Partner onboarding' : 'Administrative review'],
            ].map(([label, value], index) => (
              <div key={label} className="flex gap-3">
                <span
                  className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                    index === 1 ? 'bg-primary text-white' : 'bg-primary-light text-primary'
                  }`}
                >
                  <span className="text-[11px] font-bold">{index + 1}</span>
                </span>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{label}</p>
                  <p className="mt-0.5 text-xs text-text-secondary">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="grid gap-6 grid-cols-1 xl:grid-cols-2 w-full min-w-0">
        <AdminDetailSection title="Submitted information">
          <p className="text-sm leading-relaxed text-text-secondary">{ngo.description}</p>
          <dl className="mt-5 grid gap-3 grid-cols-1 sm:grid-cols-2 w-full min-w-0">
            <DetailValue label="Contact person" value={ngo.contactPerson} />
            <DetailValue label="Service area" value={ngo.serviceArea} />
          </dl>
        </AdminDetailSection>
        <AdminDetailSection
          title="Supporting documents"
          description="Submitted documentation for verification review."
        >
          <div className="space-y-3">
            {ngo.documents.map((document) => (
              <div
                key={document}
                className="flex items-center gap-3 rounded-lg border border-border bg-surface-muted/50 p-3"
              >
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-semibold text-text-primary">{document}</p>
                  <p className="text-xs text-text-muted">Verification document reference</p>
                </div>
              </div>
            ))}
          </div>
        </AdminDetailSection>
      </div>
      <AdminConfirmationModal
        isOpen={Boolean(action)}
        onClose={() => setAction(null)}
        onConfirm={confirm}
        title={action?.title}
        description="Are you sure you want to change this organization's verification status?"
        confirmLabel={action?.status === 'Rejected' ? 'Reject NGO' : 'Confirm'}
        danger={action?.status === 'Rejected'}
      />
    </PageContent>
  );
}
