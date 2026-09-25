import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ArrowLeft, ImagePlus, Info, MapPin, PackagePlus } from 'lucide-react';
import { PageContent } from '@/components/common/PageContent';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/cards/Card';
import { Input } from '@/components/forms/Input';
import { Select } from '@/components/forms/Select';
import { DONATION_CATEGORIES } from '@/constants/donorData';

const dietaryOptions = [
  { value: 'Vegetarian', label: 'Vegetarian' },
  { value: 'Non-Vegetarian', label: 'Non-Vegetarian' },
  { value: 'Vegetarian & Non-Vegetarian', label: 'Vegetarian & Non-Vegetarian' },
];

function FormSection({ title, description, children }) {
  return (
    <section className="space-y-4 border-b border-border/70 pb-6 last:border-0 last:pb-0">
      <div>
        <h2 className="text-base font-bold text-text-primary">{title}</h2>
        {description && <p className="mt-1 text-xs leading-relaxed text-text-secondary">{description}</p>}
      </div>
      {children}
    </section>
  );
}

export function CreateDonationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [photoPreview, setPhotoPreview] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      foodName: '',
      quantity: '',
      category: '',
      dietary: '',
      preparedAt: '',
      consumeBefore: '',
      storage: '',
      allergens: '',
      pickupLocation: '',
      pickupDate: '',
      pickupStartTime: '',
      pickupEndTime: '',
      description: '',
      photo: undefined,
      responsibility: false,
    },
  });

  useEffect(() => () => {
    if (photoPreview) URL.revokeObjectURL(photoPreview);
  }, [photoPreview]);

  const photoField = register('photo');

  const handlePhotoChange = (event) => {
    photoField.onChange(event);
    const file = event.target.files?.[0];
    setPhotoPreview(file ? URL.createObjectURL(file) : '');
  };

  const handleCreate = () => {
    setSubmitted(true);
  };

  return (
    <PageContent>
      <PageHeader
        breadcrumbs={
          <Link to="/donor/donations" className="inline-flex items-center gap-1.5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30">
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Back to My Donations
          </Link>
        }
        title="Post surplus food"
        description="Share clear food-safety and pickup details so receiving organizations can make informed plans."
        badge={<span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary-light px-2.5 py-0.5 text-xs font-semibold text-primary-dark"><PackagePlus className="h-3.5 w-3.5" aria-hidden="true" />Donor form</span>}
      />

      {submitted && (
        <Card variant="subtle" padding="sm" className="flex items-start gap-3 border-primary/20">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-xs leading-relaxed text-text-secondary">
            Prototype only: your form passed local validation, but no donation was published to a FoodBridge backend.
          </p>
        </Card>
      )}

      <form onSubmit={handleSubmit(handleCreate)} noValidate className="space-y-6">
        <Card padding="lg" className="space-y-6">
          <FormSection title="Basic information" description="Start with the details a receiving organization needs to understand the food listing.">
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                id="donation-food-name"
                label="Food Name"
                placeholder="e.g. Vegetable biryani and dal"
                error={errors.foodName?.message}
                {...register('foodName', { required: 'Food name is required.' })}
              />
              <Input
                id="donation-quantity"
                label="Quantity"
                placeholder="e.g. 45 meal portions"
                error={errors.quantity?.message}
                {...register('quantity', { required: 'Quantity is required.' })}
              />
              <Select
                id="donation-category"
                label="Food Category"
                placeholder="Select a category"
                options={DONATION_CATEGORIES.map((value) => ({ value, label: value }))}
                error={errors.category?.message}
                required
                {...register('category', { required: 'Food category is required.' })}
              />
              <Select
                id="donation-dietary"
                label="Dietary Profile"
                placeholder="Select a dietary profile"
                options={dietaryOptions}
                error={errors.dietary?.message}
                required
                {...register('dietary', { required: 'Dietary profile is required.' })}
              />
            </div>
          </FormSection>

          <FormSection title="Food safety information" description="Provide practical handling information without making assumptions about receiving organizations.">
            <div className="grid gap-4 md:grid-cols-2">
              <Input id="donation-prepared-at" label="Prepared Time" type="datetime-local" error={errors.preparedAt?.message} {...register('preparedAt', { required: 'Prepared time is required.' })} />
              <Input id="donation-consume-before" label="Consume Before" type="datetime-local" error={errors.consumeBefore?.message} {...register('consumeBefore', { required: 'Consume-before time is required.' })} />
              <Input id="donation-storage" label="Storage Conditions" placeholder="e.g. Refrigerated at 4°C" error={errors.storage?.message} {...register('storage', { required: 'Storage conditions are required.' })} />
              <Input id="donation-allergens" label="Allergen Information" placeholder="e.g. Contains dairy; none declared" helperText="Use ‘None declared’ when appropriate." error={errors.allergens?.message} {...register('allergens', { required: 'Allergen information is required.' })} />
            </div>
          </FormSection>

          <FormSection title="Pickup information" description="Set the place and window that your organization can support for collection.">
            <div className="grid gap-4 md:grid-cols-2">
              <Input id="donation-location" label="Pickup Location" placeholder="e.g. North service entrance" leftIcon={<MapPin className="h-4 w-4" aria-hidden="true" />} error={errors.pickupLocation?.message} {...register('pickupLocation', { required: 'Pickup location is required.' })} />
              <Input id="donation-date" label="Pickup Date" type="date" error={errors.pickupDate?.message} {...register('pickupDate', { required: 'Pickup date is required.' })} />
              <Input id="donation-start-time" label="Pickup Start Time" type="time" error={errors.pickupStartTime?.message} {...register('pickupStartTime', { required: 'Pickup start time is required.' })} />
              <Input id="donation-end-time" label="Pickup End Time" type="time" error={errors.pickupEndTime?.message} {...register('pickupEndTime', { required: 'Pickup end time is required.' })} />
            </div>
          </FormSection>

          <FormSection title="Photo and notes" description="A clear local photo can help organizations understand the listing. It is not uploaded in this frontend phase.">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
              <div>
                <label htmlFor="donation-photo" className="text-xs font-semibold text-text-primary">Food photo <span className="font-normal text-text-muted">(optional)</span></label>
                <div className="mt-1.5 overflow-hidden rounded-xl border border-dashed border-border bg-surface-muted">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Selected food preview" className="h-40 w-full object-cover" />
                  ) : (
                    <div className="flex h-40 flex-col items-center justify-center px-4 text-center">
                      <ImagePlus className="h-7 w-7 text-text-muted" aria-hidden="true" />
                      <p className="mt-2 text-xs font-semibold text-text-secondary">Choose a local image</p>
                      <p className="mt-1 text-[11px] text-text-muted">Preview only; nothing is uploaded.</p>
                    </div>
                  )}
                  <div className="border-t border-border bg-surface px-3 py-2">
                    <input id="donation-photo" type="file" accept="image/*" className="block w-full text-xs text-text-secondary file:mr-3 file:rounded-md file:border-0 file:bg-primary-light file:px-2.5 file:py-1.5 file:text-xs file:font-semibold file:text-primary-dark" {...photoField} onChange={handlePhotoChange} />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="donation-description" className="text-xs font-semibold text-text-primary">Additional notes <span className="font-normal text-text-muted">(optional)</span></label>
                <textarea id="donation-description" rows="7" placeholder="Add useful notes about packing, portioning, or handover context." className="mt-1.5 block w-full resize-y rounded-lg border border-border bg-surface px-3.5 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" {...register('description')} />
              </div>
            </div>
          </FormSection>

          <FormSection title="Donor responsibility" description="Please acknowledge the shared responsibility involved in safe redistribution.">
            <label className="flex items-start gap-3 rounded-xl border border-border bg-surface-muted/60 p-4">
              <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-border text-primary accent-primary focus:ring-2 focus:ring-primary/20" aria-invalid={Boolean(errors.responsibility)} {...register('responsibility', { required: 'Please acknowledge the shared responsibility notice.' })} />
              <span className="text-xs leading-relaxed text-text-secondary">
                <strong className="font-semibold text-text-primary">I understand that safe handling is shared.</strong>{' '}
                FoodBridge provides an information framework; donors and receiving organizations remain responsible for safe handling, storage, transport, and compliance with applicable requirements.
              </span>
            </label>
            {errors.responsibility && <p role="alert" className="text-xs font-medium text-danger">{errors.responsibility.message}</p>}
          </FormSection>
        </Card>

        <div className="flex flex-wrap items-center justify-end gap-3">
          <Button asChild variant="outline">
            <Link to="/donor/donations">Cancel</Link>
          </Button>
          <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} rightIcon={<PackagePlus className="h-4 w-4" aria-hidden="true" />}>
            Create Donation
          </Button>
        </div>
      </form>
    </PageContent>
  );
}

export default CreateDonationPage;
