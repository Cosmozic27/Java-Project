import React, { useState } from 'react';
import { Bell, LockKeyhole, Settings2, RotateCcw } from 'lucide-react';
import { PageContent } from '@/components/common/PageContent';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/cards/Card';
import { Select } from '@/components/forms/Select';
import { useToast } from '@/components/feedback';
import { adminDemoAdapter } from '@/services/adminDemoAdapter';

function Toggle({ label, description, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-lg border border-border bg-surface-muted/40 p-4">
      <span>
        <span className="block text-sm font-semibold text-text-primary">{label}</span>
        <span className="mt-1 block text-xs leading-relaxed text-text-secondary">{description}</span>
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 h-4 w-4 accent-primary cursor-pointer"
      />
    </label>
  );
}

export default function AdminSettingsPage() {
  const toast = useToast();
  const [expiry, setExpiry] = useState('4 hours');
  const [compact, setCompact] = useState(false);
  const [notifications, setNotifications] = useState({
    ngo: true,
    donation: true,
    claim: true,
    status: false,
  });

  const isDemo = adminDemoAdapter.isDemoSession();

  const handleResetData = () => {
    adminDemoAdapter.resetDemoData();
    toast.success('Sample platform users, NGOs, donations, and claims restored to initial state.', 'Data Restored');
    setTimeout(() => window.location.reload(), 400);
  };

  const handleSavePreferences = () => {
    toast.success('Administrative preferences updated successfully.', 'Settings Saved');
  };

  return (
    <PageContent>
      <PageHeader
        title="Platform Settings"
        description="Configure operational defaults and preferences for the FoodBridge platform."
        badge={
          <span className="rounded-full border border-primary/20 bg-primary-light px-2.5 py-1 text-xs font-semibold text-primary-dark">
            Administrative Controls
          </span>
        }
      />
      <div className="grid gap-6 grid-cols-1 xl:grid-cols-2 w-full min-w-0">
        <Card padding="lg">
          <div className="flex items-center gap-3">
            <Settings2 className="h-5 w-5 text-primary" />
            <div>
              <h2 className="text-base font-bold text-text-primary">Platform preferences</h2>
              <p className="mt-1 text-xs text-text-secondary">
                Platform-wide operational settings and default thresholds.
              </p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <Select
              label="Default donation expiry"
              value={expiry}
              onChange={(event) => setExpiry(event.target.value)}
              options={['2 hours', '4 hours', '6 hours', 'End of day'].map((value) => ({
                value,
                label: value,
              }))}
            />
            <Toggle
              label="Compact table density"
              description="Use denser rows in administrative data tables."
              checked={compact}
              onChange={setCompact}
            />
          </div>
        </Card>

        <Card padding="lg">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-primary" />
            <div>
              <h2 className="text-base font-bold text-text-primary">Notification settings</h2>
              <p className="mt-1 text-xs text-text-secondary">
                Manage event alerts and administrative notifications.
              </p>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            <Toggle
              label="New NGO verification"
              description="Notify admins when an organization submits verification."
              checked={notifications.ngo}
              onChange={(value) => setNotifications((state) => ({ ...state, ngo: value }))}
            />
            <Toggle
              label="New donation"
              description="Notify admins when a donor posts surplus food."
              checked={notifications.donation}
              onChange={(value) => setNotifications((state) => ({ ...state, donation: value }))}
            />
            <Toggle
              label="New claim"
              description="Notify admins when an NGO requests a donation."
              checked={notifications.claim}
              onChange={(value) => setNotifications((state) => ({ ...state, claim: value }))}
            />
            <Toggle
              label="Status updates"
              description="Notify admins about collection and completion events."
              checked={notifications.status}
              onChange={(value) => setNotifications((state) => ({ ...state, status: value }))}
            />
          </div>
        </Card>

        <Card padding="lg">
          <div className="flex items-center gap-3">
            <LockKeyhole className="h-5 w-5 text-primary" />
            <div>
              <h2 className="text-base font-bold text-text-primary">Security</h2>
              <p className="mt-1 text-xs text-text-secondary">
                Administrative authentication and credential security policy.
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="mt-6"
            onClick={() =>
              toast.info('Credential rotations are managed via system administrator policy.', 'Security Policy')
            }
          >
            Credential Policy
          </Button>
        </Card>

        {isDemo && (
          <Card padding="lg">
            <div className="flex items-center gap-3">
              <RotateCcw className="h-5 w-5 text-primary" />
              <div>
                <h2 className="text-base font-bold text-text-primary">Restore baseline data</h2>
                <p className="mt-1 text-xs text-text-secondary">
                  Reset sample users, NGOs, donations, and claims back to baseline records.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="mt-6 text-primary border-primary/30 hover:bg-primary-light/40"
              leftIcon={<RotateCcw className="h-4 w-4" />}
              onClick={handleResetData}
            >
              Restore Baseline Records
            </Button>
          </Card>
        )}
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSavePreferences}>Save Preferences</Button>
      </div>
    </PageContent>
  );
}
