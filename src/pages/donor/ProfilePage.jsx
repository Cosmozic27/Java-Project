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
} from 'lucide-react';

import { PageContent } from '@/components/common/PageContent';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/cards/Card';
import { Avatar } from '@/components/data-display/Avatar';
import apiClient from '@/services/api';

export function ProfilePage() {
  const toast = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Saved profile information
  const [profile, setProfile] = useState({
    name: '',
    contactPerson: '',
    organizationType: 'Food Donor',
    email: '',
    phone: '',
    address: '',
  });

  // Editable profile information
  const [form, setForm] = useState({
    name: '',
    contactPerson: '',
    organizationType: 'Food Donor',
    phone: '',
    address: '',
  });

  useEffect(() => {
    loadProfile();
  }, []);

  // Load the logged-in user's profile from the backend
  async function loadProfile() {
    try {
      setLoading(true);

      const response = await apiClient.get('/auth/profile');
      const user = response.data;

      const details = {
        name: user.name || '',
        contactPerson: user.contactPerson || '',
        organizationType: user.organizationType || 'Food Donor',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
      };

      setProfile(details);

      setForm({
        name: details.name,
        contactPerson: details.contactPerson,
        organizationType: details.organizationType,
        phone: details.phone,
        address: details.address,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          'Could not load your profile. Please log in again.'
      );
    } finally {
      setLoading(false);
    }
  }

  // Handle changes to editable fields
  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  // Save profile changes to the backend
  async function handleSave(event) {
    event.preventDefault();

    try {
      setSaving(true);

      const response = await apiClient.put('/auth/profile', form);
      const user = response.data;

      const updatedProfile = {
        name: user.name || '',
        contactPerson: user.contactPerson || '',
        organizationType: user.organizationType || 'Food Donor',
        email: user.email || profile.email,
        phone: user.phone || '',
        address: user.address || '',
      };

      setProfile(updatedProfile);

      setForm({
        name: updatedProfile.name,
        contactPerson: updatedProfile.contactPerson,
        organizationType: updatedProfile.organizationType,
        phone: updatedProfile.phone,
        address: updatedProfile.address,
      });

      setIsEditing(false);

      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          'Could not update your profile. Please try again.'
      );
    } finally {
      setSaving(false);
    }
  }

  // Cancel editing and restore the saved profile values
  function handleCancel() {
    setForm({
      name: profile.name,
      contactPerson: profile.contactPerson,
      organizationType: profile.organizationType,
      phone: profile.phone,
      address: profile.address,
    });

    setIsEditing(false);
  }

  if (loading) {
    return (
      <PageContent>
        <p className="p-6 text-text-secondary">
          Loading your profile...
        </p>
      </PageContent>
    );
  }

  return (
    <PageContent>
      <PageHeader
        title="Organization Profile"
        description="Manage your organization and contact details."
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
        {/* Organization summary */}
        <Card padding="lg">
          <div className="flex flex-col items-center text-center">
            <Avatar
              name={profile.name || 'Organization'}
              size="xl"
              status="online"
            />

            <h2 className="mt-4 text-xl font-bold text-text-primary">
              {profile.name || 'Organization'}
            </h2>

            <p className="mt-1 text-sm text-text-secondary">
              {profile.organizationType}
            </p>

            <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary-light px-2.5 py-1 text-xs font-semibold text-primary-dark">
              <ShieldCheck
                className="h-3.5 w-3.5"
                aria-hidden="true"
              />
              Donor workspace
            </span>
          </div>

          <div className="mt-6 border-t border-border/70 pt-5 text-center text-xs text-text-secondary">
            Your organization profile
          </div>
        </Card>

        {/* Profile details */}
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

              {/* Organization name */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Organization name
                </label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-border bg-surface p-3 text-sm"
                  placeholder="Enter organization name"
                />
              </div>

              {/* Contact person */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Contact person
                </label>

                <input
                  name="contactPerson"
                  value={form.contactPerson}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-border bg-surface p-3 text-sm"
                  placeholder="Enter contact person"
                />
              </div>

              {/* Organization type */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Organization type
                </label>

                <select
                  name="organizationType"
                  value={form.organizationType}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-border bg-surface p-3 text-sm"
                >
                  <option value="Food Donor">Food Donor</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Canteen">Canteen</option>
                  <option value="NGO">NGO</option>
                  <option value="Volunteer">Volunteer</option>
                </select>
              </div>

              {/* Email */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Email
                </label>

                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full rounded-lg border border-border bg-surface-muted p-3 text-sm"
                />

                <p className="mt-1 text-xs text-text-secondary">
                  Email cannot be changed here.
                </p>
              </div>

              {/* Phone */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Phone
                </label>

                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-border bg-surface p-3 text-sm"
                  placeholder="Enter phone number"
                />
              </div>

              {/* Pickup location */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Pickup Location / Address
                </label>

                <input
                  name="address"
                  type="text"
                  value={form.address}
                  onChange={handleChange}
                  maxLength={255}
                  className="w-full rounded-lg border border-border bg-surface p-3 text-sm"
                  placeholder="Enter your pickup address"
                />

                <p className="mt-1 text-xs text-text-secondary">
                  Enter the address where food donations can be picked up.
                </p>
              </div>

              {/* Save button */}
              <Button
                type="submit"
                leftIcon={<Save className="h-4 w-4" />}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save changes'}
              </Button>
            </form>
          ) : (
            <div className="space-y-5">
              <div>
                <h2 className="text-base font-bold text-text-primary">
                  Organization details
                </h2>

                <p className="mt-1 text-xs text-text-secondary">
                  Your saved profile information.
                </p>
              </div>

              <dl className="grid gap-4 sm:grid-cols-2">
                {/* Contact person */}
                <div className="rounded-xl border border-border bg-surface-muted/60 p-4">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Contact person
                  </dt>

                  <dd className="mt-2 text-sm font-semibold text-text-primary">
                    {profile.contactPerson || 'Not provided'}
                  </dd>
                </div>

                {/* Organization type */}
                <div className="rounded-xl border border-border bg-surface-muted/60 p-4">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Organization type
                  </dt>

                  <dd className="mt-2 text-sm font-semibold text-text-primary">
                    {profile.organizationType || 'Not provided'}
                  </dd>
                </div>

                {/* Email */}
                <div className="rounded-xl border border-border bg-surface-muted/60 p-4">
                  <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                    <Mail className="h-3.5 w-3.5" />
                    Email
                  </dt>

                  <dd className="mt-2 break-all text-sm font-semibold text-text-primary">
                    {profile.email || 'Not provided'}
                  </dd>
                </div>

                {/* Phone */}
                <div className="rounded-xl border border-border bg-surface-muted/60 p-4">
                  <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                    <Phone className="h-3.5 w-3.5" />
                    Phone
                  </dt>

                  <dd className="mt-2 text-sm font-semibold text-text-primary">
                    {profile.phone || 'Not provided'}
                  </dd>
                </div>
              </dl>

              {/* Saved pickup location */}
              <div className="rounded-xl border border-border bg-surface-muted/60 p-4">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                  <MapPin className="h-3.5 w-3.5" />
                  Pickup location
                </p>

                <p className="mt-2 break-words text-sm text-text-secondary">
                  {profile.address || 'No pickup location added yet.'}
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