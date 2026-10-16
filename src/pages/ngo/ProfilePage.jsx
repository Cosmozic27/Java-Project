import React, { useEffect, useState } from 'react';
import { useToast } from '@/components/feedback';
import {
  Mail,
  MapPin,
  Pencil,
  Phone,
  ShieldCheck,
  X,
  Save,
  LoaderCircle,
} from 'lucide-react';

import { PageContent } from '@/components/common/PageContent';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/cards/Card';
import { Avatar } from '@/components/data-display/Avatar';
import apiClient from '@/services/api';
import { formatApiError, safeRenderString } from '@/utils/apiError';

export function ProfilePage() {
  const toast = useToast();

  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    organizationType: '',
    phone: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  // Fetch the logged-in user's profile from the backend.
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        setError('');

        const response = await apiClient.get('/auth/profile');
        const user = response.data;

        setProfile(user);

        setFormData({
          name: user.name || '',
          contactPerson: user.contactPerson || '',
          organizationType: user.organizationType || '',
          phone: user.phone || '',
        });
      } catch (err) {
        const message = formatApiError(
          err,
          'Unable to load your profile. Please log in again if your session has expired.'
        );

        setError(message);
        toast.error(message, 'Profile unavailable');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setFormData({
      name: profile?.name || '',
      contactPerson: profile?.contactPerson || '',
      organizationType: profile?.organizationType || '',
      phone: profile?.phone || '',
    });

    setIsEditing(false);
  };

  // Save changes to MySQL through the backend.
  const handleSave = async (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Organization name is required.', 'Validation error');
      return;
    }

    setIsSaving(true);

    try {
      const response = await apiClient.put('/auth/profile', {
        name: formData.name.trim(),
        contactPerson: formData.contactPerson.trim(),
        organizationType: formData.organizationType.trim(),
        phone: formData.phone.trim(),
      });

      const updatedUser = response.data;

      setProfile(updatedUser);

      setFormData({
        name: updatedUser.name || '',
        contactPerson: updatedUser.contactPerson || '',
        organizationType: updatedUser.organizationType || '',
        phone: updatedUser.phone || '',
      });

      // Keep the displayed session user in sync with the database.
      const savedSessionUser = sessionStorage.getItem('foodbridgeUser');

      if (savedSessionUser) {
        try {
          const sessionUser = JSON.parse(savedSessionUser);

          sessionStorage.setItem(
            'foodbridgeUser',
            JSON.stringify({
              ...sessionUser,
              ...updatedUser,
            })
          );
        } catch {
          // The profile was saved successfully even if old session data
          // cannot be parsed.
        }
      }

      setIsEditing(false);
      toast.success('Your profile has been saved.', 'Profile updated');
    } catch (err) {
      const message = formatApiError(
        err,
        'Could not save your profile. Please try again.'
      );

      toast.error(message, 'Update failed');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <PageContent>
        <PageHeader
          title="Organization Profile"
          description="View and manage your organization details."
        />

        <Card padding="lg">
          <div className="flex items-center justify-center gap-2 py-10 text-text-secondary">
            <LoaderCircle className="h-5 w-5 animate-spin" />
            Loading your profile...
          </div>
        </Card>
      </PageContent>
    );
  }

  if (!profile) {
    return (
      <PageContent>
        <PageHeader
          title="Organization Profile"
          description="View and manage your organization details."
        />

        <Card padding="lg">
          <p className="text-sm text-text-secondary">
            {safeRenderString(error, 'Your profile could not be loaded.')}
          </p>
          <p className="mt-2 text-sm text-text-secondary">
            Check that you are logged in and that the backend is running.
          </p>
        </Card>
      </PageContent>
    );
  }

  return (
    <PageContent>
      <PageHeader
        title="Organization Profile"
        description="Manage the details your organization shares with food recipients."
        actions={
          !isEditing ? (
            <Button
              variant="outline"
              leftIcon={<Pencil className="h-4 w-4" />}
              onClick={() => setIsEditing(true)}
            >
              Edit profile
            </Button>
          ) : (
            <Button
              variant="outline"
              leftIcon={<X className="h-4 w-4" />}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          )
        }
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <Card padding="lg">
          <div className="flex flex-col items-center text-center">
            <Avatar name={profile.name || 'Organization'} size="xl" />

            <h2 className="mt-4 text-xl font-bold text-text-primary">
              {profile.name}
            </h2>

            <p className="mt-1 text-sm text-text-secondary">
              {profile.organizationType || 'Organization type not specified'}
            </p>

            <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary-light px-2.5 py-1 text-xs font-semibold text-primary-dark">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              {profile.role || 'FoodBridge member'}
            </span>
          </div>

          <div className="mt-6 border-t border-border/70 pt-5 text-center text-xs text-text-secondary">
            {profile.createdAt
              ? `Member since ${new Date(profile.createdAt).toLocaleDateString()}`
              : 'FoodBridge member'}
          </div>
        </Card>

        <Card padding="lg">
          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-5">
              <div>
                <h2 className="text-base font-bold text-text-primary">
                  Edit organization details
                </h2>

                <p className="mt-1 text-xs text-text-secondary">
                  Update your details and save your changes.
                </p>
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-medium text-text-primary"
                >
                  Organization name *
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  maxLength={150}
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="contactPerson"
                  className="mb-1.5 block text-sm font-medium text-text-primary"
                >
                  Contact person
                </label>

                <input
                  id="contactPerson"
                  name="contactPerson"
                  type="text"
                  maxLength={100}
                  value={formData.contactPerson}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="organizationType"
                  className="mb-1.5 block text-sm font-medium text-text-primary"
                >
                  Organization type
                </label>

                <input
                  id="organizationType"
                  name="organizationType"
                  type="text"
                  maxLength={100}
                  value={formData.organizationType}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-1.5 block text-sm font-medium text-text-primary"
                >
                  Phone number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  maxLength={20}
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-text-primary">
                  Email
                </label>

                <input
                  type="email"
                  value={profile.email || ''}
                  readOnly
                  className="w-full cursor-not-allowed rounded-lg border border-border bg-surface-muted px-3 py-2 text-sm text-text-secondary"
                />

                <p className="mt-1 text-xs text-text-secondary">
                  Email cannot be changed through this form.
                </p>
              </div>

              <Button
                type="submit"
                disabled={isSaving}
                leftIcon={
                  isSaving ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )
                }
              >
                {isSaving ? 'Saving...' : 'Save changes'}
              </Button>
            </form>
          ) : (
            <div className="space-y-5">
              <div>
                <h2 className="text-base font-bold text-text-primary">
                  Organization details
                </h2>

                <p className="mt-1 text-xs text-text-secondary">
                  Your current profile information.
                </p>
              </div>

              <dl className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-surface-muted/60 p-4">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Contact person
                  </dt>

                  <dd className="mt-2 text-sm font-semibold text-text-primary">
                    {profile.contactPerson || 'Not provided'}
                  </dd>
                </div>

                <div className="rounded-xl border border-border bg-surface-muted/60 p-4">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Organization type
                  </dt>

                  <dd className="mt-2 text-sm font-semibold text-text-primary">
                    {profile.organizationType || 'Not provided'}
                  </dd>
                </div>

                <div className="rounded-xl border border-border bg-surface-muted/60 p-4">
                  <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                    <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                    Email
                  </dt>

                  <dd className="mt-2 break-all text-sm font-semibold text-text-primary">
                    {profile.email}
                  </dd>
                </div>

                <div className="rounded-xl border border-border bg-surface-muted/60 p-4">
                  <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                    <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                    Phone
                  </dt>

                  <dd className="mt-2 text-sm font-semibold text-text-primary">
                    {profile.phone || 'Not provided'}
                  </dd>
                </div>
              </dl>

              <div className="rounded-xl border border-border bg-surface-muted/60 p-4">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  Pickup location
                </p>

                <p className="mt-2 text-sm font-semibold text-text-primary">
                  Not configured
                </p>

                <p className="mt-1 text-xs leading-relaxed text-text-secondary">
                  Pickup location is not currently stored in your user database
                  record. We can add this feature separately.
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </PageContent>
  );
}

export default ProfilePage;