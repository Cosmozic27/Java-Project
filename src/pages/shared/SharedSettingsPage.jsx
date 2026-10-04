import React, { useState } from 'react';
import {
  User,
  Bell,
  LockKeyhole,
  Palette,
  Building2,
  Phone,
  Mail,
  Shield,
  Sun,
  Moon,
  Monitor,
} from 'lucide-react';
import { PageContent } from '@/components/common/PageContent';
import { PageHeader } from '@/components/common/PageHeader';
import { Card } from '@/components/cards/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/forms/Input';
import { Select } from '@/components/forms/Select';
import { useToast } from '@/components/feedback';
import { cn } from '@/utils/cn';

// ─── Toggle Component ─────────────────────────────────────────────────────────

function SettingsToggle({ label, description, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-border bg-surface-muted/40 p-4 hover:border-border-strong transition-colors">
      <span>
        <span className="block text-sm font-semibold text-text-primary">{label}</span>
        <span className="mt-0.5 block text-xs leading-relaxed text-text-secondary">{description}</span>
      </span>
      <div className="relative mt-0.5 shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div
          onClick={() => onChange(!checked)}
          className={cn(
            'w-10 h-5 rounded-full border-2 transition-all duration-200 cursor-pointer relative',
            checked
              ? 'bg-primary border-primary'
              : 'bg-surface border-border'
          )}
        >
          <span
            className={cn(
              'absolute top-0.5 left-0.5 h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform duration-200',
              checked ? 'translate-x-5' : 'translate-x-0'
            )}
          />
        </div>
      </div>
    </label>
  );
}

// ─── Section Card ─────────────────────────────────────────────────────────────

function SettingsSection({ icon: Icon, title, description, children, badge }) {
  return (
    <Card padding="lg">
      <div className="flex items-start gap-3 mb-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-light">
          <Icon className="h-4.5 w-4.5 text-primary-dark" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-text-primary">{title}</h2>
            {badge}
          </div>
          {description && (
            <p className="mt-0.5 text-xs text-text-secondary leading-relaxed">{description}</p>
          )}
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </Card>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

/**
 * SharedSettingsPage — reusable settings page for Donor, NGO, and Admin portals.
 * Props:
 *   role  — 'donor' | 'ngo' | 'admin'
 *   userInfo — { name, email, organizationName, phone }
 */
export function SharedSettingsPage({ role = 'donor', userInfo = {} }) {
  const toast = useToast();

  const [account, setAccount] = useState({
    name: userInfo.name || '',
    email: userInfo.email || '',
    organizationName: userInfo.organizationName || '',
    phone: userInfo.phone || '',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pickupUpdates: true,
    newListings: role === 'ngo',
    claimAlerts: role === 'admin' || role === 'ngo',
    systemAlerts: role === 'admin',
    weeklyDigest: false,
  });

  const [appearance, setAppearance] = useState('system');

  const roleLabel = {
    donor: 'Food Donor',
    ngo: 'NGO / Organization',
    admin: 'Platform Administrator',
  }[role] || 'User';

  const orgFieldLabel = {
    donor: 'Establishment / Restaurant Name',
    ngo: 'Organization Name',
    admin: 'Department / Division',
  }[role] || 'Organization Name';

  const prototypeBadge = (
    <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
      Not persisted
    </span>
  );

  return (
    <PageContent>
      <PageHeader
        title="Settings"
        description={`Manage your ${roleLabel} account preferences and notifications.`}
      />

      <div className="grid gap-6 xl:grid-cols-2">
        {/* Account Settings */}
        <SettingsSection
          icon={User}
          title="Account"
          description="Update your personal information and contact details."
          badge={prototypeBadge}
        >
          <Input
            label="Full Name"
            value={account.name}
            onChange={(e) => setAccount((s) => ({ ...s, name: e.target.value }))}
            placeholder="Your full name"
            leftIcon={<User className="h-4 w-4" />}
          />
          <Input
            label="Email Address"
            type="email"
            value={account.email}
            onChange={(e) => setAccount((s) => ({ ...s, email: e.target.value }))}
            placeholder="you@example.org"
            leftIcon={<Mail className="h-4 w-4" />}
          />
          <Input
            label={orgFieldLabel}
            value={account.organizationName}
            onChange={(e) => setAccount((s) => ({ ...s, organizationName: e.target.value }))}
            placeholder="Organization or establishment name"
            leftIcon={<Building2 className="h-4 w-4" />}
          />
          <Input
            label="Phone Number"
            type="tel"
            value={account.phone}
            onChange={(e) => setAccount((s) => ({ ...s, phone: e.target.value }))}
            placeholder="+91 00000 00000"
            leftIcon={<Phone className="h-4 w-4" />}
          />
        </SettingsSection>

        {/* Notification Settings */}
        <SettingsSection
          icon={Bell}
          title="Notifications"
          description="Control which events trigger email or in-app notifications."
          badge={prototypeBadge}
        >
          <SettingsToggle
            label="Email Notifications"
            description="Receive important updates and alerts via email."
            checked={notifications.emailNotifications}
            onChange={(v) => setNotifications((s) => ({ ...s, emailNotifications: v }))}
          />
          <SettingsToggle
            label="Pickup & Status Updates"
            description="Get notified when donation status changes (claimed, collected, completed)."
            checked={notifications.pickupUpdates}
            onChange={(v) => setNotifications((s) => ({ ...s, pickupUpdates: v }))}
          />
          {role === 'ngo' && (
            <SettingsToggle
              label="New Available Listings"
              description="Get notified when new surplus food is posted in your area."
              checked={notifications.newListings}
              onChange={(v) => setNotifications((s) => ({ ...s, newListings: v }))}
            />
          )}
          {(role === 'admin' || role === 'ngo') && (
            <SettingsToggle
              label="Claim Alerts"
              description="Notifications when NGOs claim donations."
              checked={notifications.claimAlerts}
              onChange={(v) => setNotifications((s) => ({ ...s, claimAlerts: v }))}
            />
          )}
          {role === 'admin' && (
            <SettingsToggle
              label="System Alerts"
              description="Critical platform governance and maintenance notifications."
              checked={notifications.systemAlerts}
              onChange={(v) => setNotifications((s) => ({ ...s, systemAlerts: v }))}
            />
          )}
          <SettingsToggle
            label="Weekly Digest"
            description="A weekly summary of platform activity delivered to your inbox."
            checked={notifications.weeklyDigest}
            onChange={(v) => setNotifications((s) => ({ ...s, weeklyDigest: v }))}
          />
        </SettingsSection>

        {/* Security Settings */}
        <SettingsSection
          icon={LockKeyhole}
          title="Security"
          description="Manage your password and session security settings."
        >
          <div className="rounded-xl border border-border bg-surface-muted/40 p-4 space-y-1">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-text-primary">Session Active</span>
            </div>
            <p className="text-xs text-text-secondary">
              You are currently signed in as <span className="font-semibold">{account.email || 'your account'}</span>.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() =>
              toast.info(
                'Password change will be connected to the authentication backend in a future release.',
                'Prototype action'
              )
            }
          >
            Change Password
          </Button>
          <p className="text-xs text-text-muted">
            Password management requires backend authentication integration.
          </p>
        </SettingsSection>

        {/* Appearance */}
        <SettingsSection
          icon={Palette}
          title="Appearance"
          description="Customize how FoodBridge looks for you."
          badge={prototypeBadge}
        >
          <div>
            <p className="text-xs font-semibold text-text-secondary mb-3 uppercase tracking-wide">Theme Preference</p>
            <div className="flex gap-3">
              {[
                { id: 'light', label: 'Light', Icon: Sun },
                { id: 'dark', label: 'Dark', Icon: Moon },
                { id: 'system', label: 'System', Icon: Monitor },
              ].map(({ id, label, Icon: ThemeIcon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setAppearance(id);
                    toast.info(`Theme set to "${label}" (frontend prototype only).`, 'Appearance');
                  }}
                  className={cn(
                    'flex-1 flex flex-col items-center gap-2 p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all',
                    appearance === id
                      ? 'bg-primary-light border-primary text-primary-dark shadow-sm'
                      : 'bg-surface border-border text-text-secondary hover:border-border-strong hover:text-text-primary'
                  )}
                >
                  <ThemeIcon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>
          <p className="text-xs text-text-muted">
            Theme switching is a frontend prototype preference. Full theming support is planned for a future release.
          </p>
        </SettingsSection>
      </div>

      {/* Save Action */}
      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={() => toast.info('Changes discarded.', 'Settings')}
        >
          Discard
        </Button>
        <Button
          onClick={() =>
            toast.success(
              'Preferences are active for this page session only and are not saved to your account.',
              'Settings Saved'
            )
          }
        >
          Save Preferences
        </Button>
      </div>
    </PageContent>
  );
}

export default SharedSettingsPage;
