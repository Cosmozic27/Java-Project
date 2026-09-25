import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthCard } from '@/components/auth';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/forms/Input';
import { ArrowRight, Building2, HeartHandshake, Lock, Mail } from 'lucide-react';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ROLE_OPTIONS = [
  {
    value: 'donor',
    label: 'Food Donor',
    description: 'Share surplus food from your organization.',
    icon: Building2,
  },
  {
    value: 'ngo',
    label: 'NGO / Organization',
    description: 'Discover and collect available surplus food.',
    icon: HeartHandshake,
  },
];

export function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      organizationName: '',
      organizationType: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleRegister = () => {
    // Frontend-only validation foundation. Account creation comes in a later phase.
  };

  return (
    <AuthCard
      title="Create your FoodBridge account"
      description="Join the FoodBridge network as a donor or NGO / organization partner."
      footer={
        <>
          <span>Already have an account? </span>
          <Link
            to="/auth/login"
            className="font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          >
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(handleRegister)} className="space-y-4" noValidate>
        <Input
          id="register-organization-name"
          label="Organization Name"
          placeholder="e.g. Hope Community Kitchen"
          leftIcon={<Building2 className="h-4 w-4" aria-hidden="true" />}
          autoComplete="organization"
          error={errors.organizationName?.message}
          {...register('organizationName', {
            required: 'Organization name is required.',
          })}
        />

        <fieldset
          className="space-y-2"
          aria-describedby={errors.organizationType ? 'organization-type-error' : undefined}
        >
          <legend className="text-xs font-semibold text-text-primary">
            Organization Type<span className="ml-0.5 text-danger" aria-hidden="true">*</span>
          </legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {ROLE_OPTIONS.map(({ value, label, description, icon: Icon }) => (
              <label key={value} className="group relative cursor-pointer">
                <input
                  type="radio"
                  value={value}
                  className="peer sr-only"
                  aria-invalid={Boolean(errors.organizationType)}
                  {...register('organizationType', {
                    required: 'Select an organization type.',
                  })}
                />
                <span className="flex min-h-[104px] flex-col gap-2 rounded-xl border border-border bg-surface p-3 transition-colors hover:border-border-strong peer-checked:border-primary peer-checked:bg-primary/5 peer-focus-visible:ring-2 peer-focus-visible:ring-primary/30">
                  <span className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                    <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                    {label}
                  </span>
                  <span className="text-xs leading-relaxed text-text-secondary">{description}</span>
                </span>
              </label>
            ))}
          </div>
          {errors.organizationType && (
            <p id="organization-type-error" role="alert" className="text-xs font-medium text-danger">
              {errors.organizationType.message}
            </p>
          )}
        </fieldset>

        <Input
          id="register-email"
          label="Official Organization Email"
          type="email"
          placeholder="contact@organization.org"
          leftIcon={<Mail className="h-4 w-4" aria-hidden="true" />}
          autoComplete="email"
          error={errors.email?.message}
          {...register('email', {
            required: 'Organization email is required.',
            pattern: {
              value: EMAIL_PATTERN,
              message: 'Enter a valid organization email.',
            },
          })}
        />

        <Input
          id="register-password"
          label="Password"
          type="password"
          placeholder="At least 8 characters"
          leftIcon={<Lock className="h-4 w-4" aria-hidden="true" />}
          autoComplete="new-password"
          helperText="Use at least 8 characters for your password."
          error={errors.password?.message}
          {...register('password', {
            required: 'Password is required.',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters.',
            },
          })}
        />

        <Input
          id="register-confirm-password"
          label="Confirm Password"
          type="password"
          placeholder="Re-enter your password"
          leftIcon={<Lock className="h-4 w-4" aria-hidden="true" />}
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: 'Please confirm your password.',
            validate: (value, formValues) =>
              value === formValues.password || 'Passwords do not match.',
          })}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={isSubmitting}
          rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
          className="mt-1"
        >
          Create Account
        </Button>
      </form>
    </AuthCard>
  );
}

export default RegisterPage;
