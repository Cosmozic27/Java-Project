import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthCard } from '@/components/auth';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/forms/Input';
import { ArrowRight, Lock, Mail } from 'lucide-react';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const handleLogin = () => {
    // Frontend-only validation foundation. Authentication comes in a later phase.
  };

  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to continue coordinating surplus food with your FoodBridge network."
      footer={
        <>
          <span>Don't have an account? </span>
          <Link
            to="/auth/register"
            className="font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          >
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-4" noValidate>
        <Input
          id="login-email"
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

        <Input
          id="login-password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          leftIcon={<Lock className="h-4 w-4" aria-hidden="true" />}
          error={errors.password?.message}
          {...register('password', {
            required: 'Password is required.',
          })}
        />

        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 pt-1 text-xs">
          <label className="inline-flex min-h-8 cursor-pointer select-none items-center gap-2 text-text-secondary">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-border text-primary accent-primary focus:ring-2 focus:ring-primary/20"
              {...register('rememberMe')}
            />
            <span>Remember me</span>
          </label>

          <Link
            to="/auth/forgot-password"
            className="inline-flex min-h-8 items-center font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={isSubmitting}
          rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
          className="mt-1"
        >
          Sign In
        </Button>
      </form>
    </AuthCard>
  );
}

export default LoginPage;
