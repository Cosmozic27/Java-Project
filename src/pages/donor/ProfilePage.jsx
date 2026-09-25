import React from 'react';
import { useToast } from '@/components/feedback';
import { Mail, MapPin, Pencil, Phone, ShieldCheck } from 'lucide-react';
import { PageContent } from '@/components/common/PageContent';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/cards/Card';
import { Avatar } from '@/components/data-display/Avatar';
import { DONOR_PROFILE } from '@/constants/donorData';

export function ProfilePage() {
  const toast = useToast();

  return (
    <PageContent>
      <PageHeader
        title="Organization Profile"
        description="Keep the donor details that receiving organizations will use to understand your pickup setup."
        actions={
          <Button
            variant="outline"
            leftIcon={<Pencil className="h-4 w-4" />}
            onClick={() => toast.info('Profile editing will be connected in a later phase.', 'Prototype action')}
          >
            Edit profile
          </Button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <Card padding="lg">
          <div className="flex flex-col items-center text-center">
            <Avatar name={DONOR_PROFILE.name} size="xl" status="online" />
            <h2 className="mt-4 text-xl font-bold text-text-primary">{DONOR_PROFILE.name}</h2>
            <p className="mt-1 text-sm text-text-secondary">{DONOR_PROFILE.type}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary-light px-2.5 py-1 text-xs font-semibold text-primary-dark">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Donor workspace
            </span>
          </div>
          <div className="mt-6 border-t border-border/70 pt-5 text-center text-xs text-text-secondary">
            Member since {DONOR_PROFILE.joined}
          </div>
        </Card>

        <Card padding="lg">
          <div className="space-y-5">
            <div>
              <h2 className="text-base font-bold text-text-primary">Organization details</h2>
              <p className="mt-1 text-xs text-text-secondary">Illustrative profile information for this prototype workspace.</p>
            </div>
            <dl className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-surface-muted/60 p-4">
                <dt className="text-xs font-semibold uppercase tracking-wider text-text-muted">Contact person</dt>
                <dd className="mt-2 text-sm font-semibold text-text-primary">{DONOR_PROFILE.contactPerson}</dd>
              </div>
              <div className="rounded-xl border border-border bg-surface-muted/60 p-4">
                <dt className="text-xs font-semibold uppercase tracking-wider text-text-muted">Organization type</dt>
                <dd className="mt-2 text-sm font-semibold text-text-primary">{DONOR_PROFILE.type}</dd>
              </div>
              <div className="rounded-xl border border-border bg-surface-muted/60 p-4">
                <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-muted"><Mail className="h-3.5 w-3.5" aria-hidden="true" />Email</dt>
                <dd className="mt-2 break-all text-sm font-semibold text-text-primary">{DONOR_PROFILE.email}</dd>
              </div>
              <div className="rounded-xl border border-border bg-surface-muted/60 p-4">
                <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-muted"><Phone className="h-3.5 w-3.5" aria-hidden="true" />Phone</dt>
                <dd className="mt-2 text-sm font-semibold text-text-primary">{DONOR_PROFILE.phone}</dd>
              </div>
            </dl>
            <div className="rounded-xl border border-border bg-surface-muted/60 p-4">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-muted"><MapPin className="h-3.5 w-3.5" aria-hidden="true" />Pickup location</p>
              <p className="mt-2 text-sm font-semibold text-text-primary">{DONOR_PROFILE.address}</p>
              <p className="mt-1 text-xs leading-relaxed text-text-secondary">{DONOR_PROFILE.pickupNotes}</p>
            </div>
          </div>
        </Card>
      </div>
    </PageContent>
  );
}

export default ProfilePage;
