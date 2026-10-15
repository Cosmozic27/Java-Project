import React, { useState } from 'react';
import { Bell, Mail, ShieldCheck } from 'lucide-react';
import { PageContent } from '@/components/common/PageContent';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/cards/Card';
import { Avatar } from '@/components/data-display/Avatar';
import { Input } from '@/components/forms/Input';
import { useToast } from '@/components/feedback';
import { DEMO_CONFIG } from '@/config/demoConfig';
import { adminDemoAdapter } from '@/services/adminDemoAdapter';

export default function AdminProfilePage() {
  const toast = useToast();
  const isDemo = adminDemoAdapter.isDemoSession();

  let initialUser = null;
  try {
    const raw = sessionStorage.getItem('foodbridgeUser');
    if (raw) initialUser = JSON.parse(raw);
  } catch {
    initialUser = null;
  }

  const [name, setName] = useState(
    initialUser?.name || (isDemo ? DEMO_CONFIG.admin.name : 'System Governance')
  );
  const [email, setEmail] = useState(
    initialUser?.email || (isDemo ? DEMO_CONFIG.admin.email : 'admin@foodbridge.org')
  );

  const handleSave = () => {
    if (isDemo) {
      try {
        const updatedUser = { ...(initialUser || {}), name, email };
        sessionStorage.setItem('foodbridgeUser', JSON.stringify(updatedUser));
      } catch {
        // ignore
      }
    }
    toast.success('Admin profile updated successfully.', 'Profile Saved');
  };

  return (
    <PageContent>
      <PageHeader
        title="Admin Profile"
        description="Manage the administrative profile used to operate the FoodBridge platform."
        badge={
          <span className="rounded-full border border-primary/20 bg-primary-light px-2.5 py-1 text-xs font-semibold text-primary-dark">
            Platform Governance
          </span>
        }
      />
      <div className="grid gap-6 grid-cols-1 xl:grid-cols-[0.65fr_1.35fr] w-full min-w-0">
        <Card padding="lg" className="text-center">
          <Avatar name={name} size="xl" status="online" />
          <h2 className="mt-4 text-xl font-bold text-text-primary">{name}</h2>
          <p className="mt-1 text-sm text-text-secondary">
            Platform Administrator
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary-light px-2.5 py-1 text-xs font-semibold text-primary-dark">
            <ShieldCheck className="h-3.5 w-3.5" />
            Governance access
          </span>
          <p className="mt-6 border-t border-border/70 pt-4 text-xs text-text-secondary">
            Session: Active Governance Session
          </p>
        </Card>
        <Card padding="lg">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-base font-bold text-text-primary">Account information</h2>
              <p className="mt-1 text-xs text-text-secondary">
                Administrative contact details and governance profile.
              </p>
            </div>
            <Bell className="h-5 w-5 text-primary" />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Input
              label="Admin name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              leftIcon={<ShieldCheck className="h-4 w-4" />}
            />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              leftIcon={<Mail className="h-4 w-4" />}
            />
          </div>
          <div className="mt-6 flex justify-end">
            <Button onClick={handleSave}>Save Profile</Button>
          </div>
        </Card>
      </div>
    </PageContent>
  );
}
