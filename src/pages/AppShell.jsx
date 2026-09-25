import React, { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp,
  Package,
  HeartHandshake,
  Users,
  Bell,
  Settings,
  LogOut,
  Mail,
  User,
  FolderOpen
} from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Logo } from '@/components/common/Logo';
import { Dropdown } from '@/components/common/Dropdown';
import { PageContainer } from '@/components/common/PageContainer';
import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/cards/Card';
import { StatCard } from '@/components/cards/StatCard';
import { Input } from '@/components/forms/Input';
import { Select } from '@/components/forms/Select';
import { SearchBar } from '@/components/forms/SearchBar';
import { StatusBadge } from '@/components/data-display/StatusBadge';
import { Avatar } from '@/components/data-display/Avatar';
import { Modal } from '@/components/feedback/Modal';
import { EmptyState } from '@/components/feedback/EmptyState';
import { LoadingState } from '@/components/feedback/LoadingState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { useToast } from '@/components/feedback';

export function AppShell() {
  const toast = useToast();

  // Component state demonstrations
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [showSkeletonDemo, setShowSkeletonDemo] = useState(false);
  const [errorRetrying, setErrorRetrying] = useState(false);

  const handleRetryDemo = () => {
    setErrorRetrying(true);
    setTimeout(() => {
      setErrorRetrying(false);
      toast.success('Connection restored to FoodBridge node', 'Retry Successful');
    }, 1200);
  };

  const dropdownItems = [
    { label: 'View Profile', icon: <User className="h-4 w-4" />, onClick: () => toast.info('Navigating to profile') },
    { label: 'Notifications', icon: <Bell className="h-4 w-4" />, badge: '3', onClick: () => toast.info('3 unread alerts') },
    { label: 'Settings', icon: <Settings className="h-4 w-4" />, onClick: () => toast.info('Opened settings') },
    { divider: true },
    { label: 'Sign Out', icon: <LogOut className="h-4 w-4" />, danger: true, onClick: () => toast.warning('Logged out safely') },
  ];

  return (
    <PageContainer maxWidth="7xl" className="space-y-10">
      {/* Page Header */}
      <PageHeader
        title="FoodBridge UI Component System"
        description="Comprehensive, production-ready modular design system built for food donors, NGOs, and platform administrators."
        divider
        badge={
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-light text-primary-dark border border-primary/20">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Phase 2 Design System Active
          </span>
        }
        actions={
          <div className="flex items-center gap-2.5">
            <Dropdown
              trigger={
                <Button variant="outline" size="sm" rightIcon={<Settings className="h-3.5 w-3.5" />}>
                  Quick Actions
                </Button>
              }
              items={dropdownItems}
            />
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Sparkles className="h-4 w-4" />}
              onClick={() => setIsModalOpen(true)}
            >
              Open Test Modal
            </Button>
          </div>
        }
      />

      {/* 1. Stat Cards Showcase */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-text-primary tracking-tight">
            1. Metric StatCards
          </h2>
          <span className="text-xs text-text-secondary">Modular dashboard cards</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Surplus Food Saved"
            value="14,250 kg"
            icon={Package}
            trend={{ value: '+18.4%', isPositive: true, label: 'this month' }}
            description="Across 42 partners"
          />
          <StatCard
            title="Active NGO Claims"
            value="86 Orders"
            icon={HeartHandshake}
            variant="accent"
            trend={{ value: '+12.1%', isPositive: true, label: 'vs last week' }}
            description="Verified collection"
          />
          <StatCard
            title="Meals Distributed"
            value="28,500"
            icon={TrendingUp}
            variant="primary"
            trend={{ value: '+24.0%', isPositive: true, label: 'all time' }}
            description="Direct community impact"
          />
          <StatCard
            title="Active Donors"
            value="142"
            icon={Users}
            variant="warning"
            trend={{ value: '-2.3%', isPositive: false, label: 'compliance check' }}
            description="Hostels & canteens"
          />
        </div>
      </section>

      {/* 2. Status Badges & Lifecycle */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-text-primary tracking-tight">
            2. Status Badges
          </h2>
          <span className="text-xs text-text-secondary">Real-time donation lifecycle status</span>
        </div>
        <Card variant="default">
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status="Available" showIcon />
              <StatusBadge status="Claimed" showIcon />
              <StatusBadge status="Pickup Pending" showIcon />
              <StatusBadge status="Collected" showIcon />
              <StatusBadge status="Completed" showIcon />
              <StatusBadge status="Expired" showIcon />
              <StatusBadge status="Cancelled" showIcon />
            </div>
            <div className="mt-4 pt-4 border-t border-border/60 flex flex-wrap items-center gap-3">
              <span className="text-xs text-text-secondary font-medium mr-2">Compact without icon:</span>
              <StatusBadge status="Available" size="sm" />
              <StatusBadge status="Claimed" size="sm" />
              <StatusBadge status="Pickup Pending" size="sm" />
              <StatusBadge status="Completed" size="sm" />
              <StatusBadge status="Expired" size="sm" />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 3. Form Controls: Input, Select, SearchBar */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-text-primary tracking-tight">
            3. Form Primitives
          </h2>
          <span className="text-xs text-text-secondary">Input, Select, and SearchBar</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="default">
            <CardHeader>
              <CardTitle>Form Inputs</CardTitle>
              <CardDescription>Label, icon, validation, and error states</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Donor Organization"
                placeholder="e.g. Central City Hostel"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                leftIcon={<User className="h-4 w-4" />}
                helperText="Official registered organization name"
                required
              />
              <Input
                label="Emergency Contact Email"
                placeholder="coordinator@ngo.org"
                leftIcon={<Mail className="h-4 w-4" />}
                error={inputValue.length > 0 && !inputValue.includes('@') ? 'Enter a valid organization email' : undefined}
                defaultValue="invalid-format"
              />
            </CardContent>
          </Card>

          <Card variant="default">
            <CardHeader>
              <CardTitle>Select Dropdown</CardTitle>
              <CardDescription>Styled select with chevron and options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select
                label="Food Category"
                placeholder="Choose category"
                value={selectValue}
                onChange={(e) => setSelectValue(e.target.value)}
                helperText="Helps NGOs prepare appropriate transport"
                required
                options={[
                  { value: 'cooked', label: 'Cooked Surplus Meals (Catering/Hostel)' },
                  { value: 'produce', label: 'Fresh Vegetables & Produce' },
                  { value: 'bakery', label: 'Packaged Bakery & Breads' },
                  { value: 'dry_rations', label: 'Grains & Non-Perishable Rations' },
                ]}
              />

              <Select
                label="Disabled Selection"
                disabled
                placeholder="Unavailable option"
                options={[{ value: 'none', label: 'Feature locked' }]}
              />
            </CardContent>
          </Card>

          <Card variant="default">
            <CardHeader>
              <CardTitle>SearchBar Component</CardTitle>
              <CardDescription>Controlled search with clear button & shortcut</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SearchBar
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClear={() => setSearchQuery('')}
                onSubmit={(val) => toast.info(`Searching for: ${val}`)}
                placeholder="Search food listings, NGOs..."
                shortcut="Ctrl+K"
              />
              <p className="text-xs text-text-secondary">
                Current query: <span className="font-semibold text-text-primary">{searchQuery || '(Empty)'}</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 4. Avatars & Brand Logo */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-text-primary tracking-tight">
            4. Avatars & Brand Elements
          </h2>
          <span className="text-xs text-text-secondary">Logo sizing and Avatar fallback handling</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="default">
            <CardHeader>
              <CardTitle>Avatar Component</CardTitle>
              <CardDescription>Multiple sizes, fallback initials, and status indicators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 flex-wrap">
                <Avatar size="xs" name="Shaurya Chavan" status="online" />
                <Avatar size="sm" name="Green Earth NGO" status="online" />
                <Avatar size="md" name="Central Hostel Canteen" status="busy" />
                <Avatar size="lg" name="FoodBridge Admin" status="verified" />
                <Avatar size="xl" name="City Food Bank" status="offline" />
              </div>
              <p className="text-xs text-text-secondary">
                Initials are calculated automatically when images are absent or fail to load.
              </p>
            </CardContent>
          </Card>

          <Card variant="default">
            <CardHeader>
              <CardTitle>Brand Logo Component</CardTitle>
              <CardDescription>Flexible sizes and link integration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-4">
                <Logo size="sm" showTagline />
                <Logo size="md" showTagline />
                <Logo size="lg" showTagline />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 5. Feedback System: Toasts, EmptyState, LoadingState, ErrorState */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-text-primary tracking-tight">
            5. Feedback & Notification System
          </h2>
          <span className="text-xs text-text-secondary">Toast alerts and application states</span>
        </div>

        {/* Toast triggers */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>Toast Notifications</CardTitle>
            <CardDescription>
              Dispatched imperatively via useToast hook with smooth Framer Motion animations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2.5">
              <Button
                variant="primary"
                size="sm"
                onClick={() => toast.success('Food donation listing published to NGO network.', 'Listing Created')}
              >
                Trigger Success Toast
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => toast.error('Unable to sync coordinates with distribution server.', 'Network Error')}
              >
                Trigger Error Toast
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast.warning('Surplus food expires in 90 minutes. Claim soon.', 'Expiry Warning')}
              >
                Trigger Warning Toast
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toast.info('NGO "Hope Kitchen" has accepted pickup task #1048.', 'Dispatch Update')}
              >
                Trigger Info Toast
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Empty, Loading & Error States */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Empty State */}
          <Card variant="default" className="flex flex-col">
            <CardHeader>
              <CardTitle>Empty State</CardTitle>
              <CardDescription>Polished placeholder when queries yield zero records</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center">
              <EmptyState
                icon={FolderOpen}
                title="No active donations"
                description="All surplus food in your area has been successfully distributed."
                action={
                  <Button variant="primary" size="sm">
                    Create Donation
                  </Button>
                }
                compact
              />
            </CardContent>
          </Card>

          {/* Loading Skeleton State */}
          <Card variant="default" className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Loading State</CardTitle>
                <CardDescription>Shimmer skeleton structure</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSkeletonDemo(!showSkeletonDemo)}
              >
                {showSkeletonDemo ? 'Show Skeleton' : 'Show Spinner'}
              </Button>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center">
              {showSkeletonDemo ? (
                <LoadingState variant="spinner" message="Fetching verified NGO listings..." />
              ) : (
                <LoadingState variant="skeleton" />
              )}
            </CardContent>
          </Card>

          {/* Error State */}
          <Card variant="default" className="flex flex-col">
            <CardHeader>
              <CardTitle>Error State</CardTitle>
              <CardDescription>Accessible error panel with retry action</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center">
              <ErrorState
                title="Redistribution sync failed"
                description="Failed to fetch real-time pickup status from regional hub."
                onRetry={handleRetryDemo}
                isRetrying={errorRetrying}
              />
            </CardContent>
          </Card>
        </div>

        {/* Inline Banner Error variant */}
        <ErrorState
          variant="banner"
          title="Scheduled System Maintenance:"
          description="Distribution routing service will undergo minor telemetry update tonight at 02:00 AM."
          retryLabel="Dismiss"
          onRetry={() => toast.info('Maintenance notice acknowledged')}
        />
      </section>

      {/* Modal Dialog Component Demo */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirm Food Donation Pickup"
        description="Verify collection details before marking this surplus batch as claimed."
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setIsModalOpen(false);
                toast.success('Food batch claimed! NGO coordinator notified.');
              }}
            >
              Confirm & Claim
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-surface-muted border border-border space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-text-secondary">Donor:</span>
              <span className="font-semibold text-text-primary">Apex Hostel Dining Hall</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Quantity:</span>
              <span className="font-semibold text-text-primary">45 Portions (Cooked Rice & Dal)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Best Before:</span>
              <span className="font-semibold text-danger">Within 3 hours</span>
            </div>
          </div>
          <p className="text-xs text-text-secondary">
            By confirming, your NGO agrees to inspect food hygiene and complete transport using insulated containers.
          </p>
        </div>
      </Modal>
    </PageContainer>
  );
}

export default AppShell;
