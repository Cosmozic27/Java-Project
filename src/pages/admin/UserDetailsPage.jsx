import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Edit3, ShieldCheck, UserCheck, UserX } from 'lucide-react';
import { PageContent } from '@/components/common/PageContent';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/cards/Card';
import { StatCard } from '@/components/cards/StatCard';
import { Avatar } from '@/components/data-display/Avatar';
import { useToast } from '@/components/feedback';
import {
  AdminActivityList,
  AdminConfirmationModal,
  AdminDetailSection,
  AdminStatus,
  BackLink,
  DetailValue,
} from '@/components/admin';
import { ADMIN_ACTIVITY } from '@/constants/adminData';
import { adminDemoAdapter } from '@/services/adminDemoAdapter';

export default function UserDetailsPage() {
  const { userId } = useParams();
  const toast = useToast();
  const record = adminDemoAdapter.getUserById(userId);
  const [status, setStatus] = useState(record?.status || 'Active');
  const [confirm, setConfirm] = useState(null);

  const perform = () => {
    if (confirm?.action && record?.id) {
      adminDemoAdapter.updateUser(record.id, { status: confirm.action });
      setStatus(confirm.action);
      toast.success(`Account status updated to ${confirm.action}.`);
    }
    setConfirm(null);
  };

  if (!record) {
    return (
      <PageContent>
        <PageHeader
          breadcrumbs={<BackLink to="/admin/users">Back to Users</BackLink>}
          title="User Not Found"
          description="The requested user account does not exist."
        />
      </PageContent>
    );
  }

  return (
    <PageContent>
      <PageHeader
        breadcrumbs={<BackLink to="/admin/users">Back to Users</BackLink>}
        title={record.name}
        description={`${record.id} · ${record.role}`}
        badge={<AdminStatus status={status} />}
        actions={
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Edit3 className="h-3.5 w-3.5" />}
              onClick={() => toast.info('Account profile editing is read-only in this view.')}
            >
              Edit
            </Button>
            <Button
              variant={status === 'Suspended' ? 'primary' : 'subtle-danger'}
              size="sm"
              leftIcon={status === 'Suspended' ? <UserCheck className="h-3.5 w-3.5" /> : <UserX className="h-3.5 w-3.5" />}
              onClick={() =>
                setConfirm({
                  action: status === 'Suspended' ? 'Active' : 'Suspended',
                  title: status === 'Suspended' ? 'Activate account?' : 'Suspend account?',
                })
              }
            >
              {status === 'Suspended' ? 'Activate' : 'Suspend'}
            </Button>
          </div>
        }
      />
      <div className="grid gap-6 grid-cols-1 xl:grid-cols-[0.7fr_1.3fr] w-full min-w-0">
        <Card padding="lg" className="text-center">
          <Avatar name={record.name} size="xl" status={status === 'Active' ? 'online' : undefined} />
          <h2 className="mt-4 text-xl font-bold text-text-primary">{record.name}</h2>
          <p className="mt-1 text-sm text-text-secondary">{record.role}</p>
          <div className="mt-4">
            <AdminStatus status={status} />
          </div>
          <p className="mt-5 border-t border-border/70 pt-4 text-xs text-text-secondary">
            Joined {record.joined}
          </p>
        </Card>
        <AdminDetailSection
          title="Account information"
          description="Primary account information and verification status."
        >
          <dl className="grid gap-3 grid-cols-1 sm:grid-cols-2 w-full min-w-0">
            <DetailValue label="Organization type" value={record.type} />
            <DetailValue label="Email" value={record.email} />
            <DetailValue label="Phone" value={record.phone} />
            <DetailValue label="Location" value={record.location} />
            <DetailValue label="Last activity" value={record.lastActivity} />
            <DetailValue
              label="Verification"
              value={record.verified ? 'Verified network participant' : 'Verification pending'}
            />
          </dl>
        </AdminDetailSection>
      </div>
      <div className="grid gap-6 grid-cols-1 xl:grid-cols-2 w-full min-w-0">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 w-full min-w-0">
          <StatCard title="Donations" value={record.donations} icon={ShieldCheck} />
          <StatCard title="Claims" value={record.claims} icon={UserCheck} variant="accent" />
        </div>
        <AdminDetailSection title="Recent activity">
          <AdminActivityList items={ADMIN_ACTIVITY.slice(0, 3)} />
        </AdminDetailSection>
      </div>
      <AdminConfirmationModal
        isOpen={Boolean(confirm)}
        onClose={() => setConfirm(null)}
        onConfirm={perform}
        title={confirm?.title}
        description="Are you sure you want to change this account's operational status?"
        confirmLabel={confirm?.action === 'Suspended' ? 'Suspend Account' : 'Activate Account'}
        danger={confirm?.action === 'Suspended'}
      />
    </PageContent>
  );
}
