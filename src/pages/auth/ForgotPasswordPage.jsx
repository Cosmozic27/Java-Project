import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthCard } from '@/components/auth';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/forms/Input';
import { ArrowLeft, ArrowRight, Mail } from 'lucide-react';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onTouched',
    defaultValues: { email: '' },
  });

  const handleResetRequest = () => {
    setSubmitted(true);
  };

  return (
    <AuthCard
      title="Forgot your password?"
      description="Enter your organization email to continue with the password reset process."
      footer={
        <>
          <span>Remembered your password? </span>
          <Link
            to="/auth/login"
            className="font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          >
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(handleResetRequest)} className="space-y-4" noValidate>
        <Input
          id="forgot-password-email"
          label="Organization Email"
          type="email"
          placeholder="name@organization.org"
          autoComplete="email"
          leftIcon={<Mail className="h-4 w-4" aria-hidden="true" />}
          error={errors.email?.message}
          {...register('email', {
            required: 'Organization email is required.',
            pattern: {
              value: EMAIL_PATTERN,
              message: 'Enter a valid organization email.',
            },
          })}
        />

        {submitted && (
          <p className="rounded-lg border border-border bg-background-subtle px-3 py-2 text-xs leading-relaxed text-text-secondary">
            This is a frontend-only prototype. No reset email was sent.
          </p>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={isSubmitting}
          rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
        >
          Send Reset Link
        </Button>
      </form>

      <Link
        to="/auth/login"
        className="mt-4 inline-flex min-h-8 items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        Back to sign in
      </Link>
    </AuthCard>
  );
}

export default ForgotPasswordPage;
