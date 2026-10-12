import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthCard } from '@/components/auth';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/forms/Input';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import { apiClient } from '@/services/api';
import { findDemoAccount } from '@/constants/authData';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const handleLogin = async ({ email, password }) => {
    try {
      const response = await apiClient.post('/auth/login', {
        email: email.trim(),
        password,
      });

      const user = response.data?.user;
      const token = response.data?.token;

      if (!user) {
        setError('root', {
          type: 'server',
          message:
            'The server did not return user details. Please check the backend.',
        });
        return;
      }

      if (!token) {
        setError('root', {
          type: 'server',
          message:
            'The server did not return an authentication token. Please check the backend.',
        });
        return;
      }

      const role = String(user.role || '').toUpperCase();

      if (!['DONOR', 'NGO', 'ADMIN'].includes(role)) {
        setError('root', {
          type: 'role',
          message: 'Your account role is not recognized.',
        });
        return;
      }

      // Save the JWT token for authenticated API requests.
      sessionStorage.setItem('foodbridgeToken', token);

      // Preserve the existing login session information.
      sessionStorage.setItem('foodbridgeUser', JSON.stringify(user));
      sessionStorage.setItem('foodbridgeLoggedIn', 'true');

      if (role === 'ADMIN') {
        navigate('/admin', { replace: true });
      } else if (role === 'NGO') {
        navigate('/ngo', { replace: true });
      } else {
        navigate('/donor', { replace: true });
      }
    } catch (error) {
      const demoAccount = findDemoAccount(email, password);
      const backendUnavailable =
        !error.response || [404, 502, 503, 504].includes(error.response.status);

      if (backendUnavailable && demoAccount) {
        const prototypeUser = {
          email: demoAccount.email,
          role: demoAccount.role.toUpperCase(),
          label: demoAccount.label,
        };

        sessionStorage.setItem('foodbridgeToken', 'prototype-demo-token');
        sessionStorage.setItem('foodbridgeUser', JSON.stringify(prototypeUser));
        sessionStorage.setItem('foodbridgeLoggedIn', 'true');

        navigate(demoAccount.redirectTo, { replace: true });
        return;
      }

      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        'Unable to sign in. Check your email and password and ensure the backend is running.';

      setError('root', {
        type: 'server',
        message,
      });
    }
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
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-4"
        noValidate
      >
        {location.state?.registrationMessage && (
          <p
            role="status"
            className="rounded-lg border border-success/20 bg-success/10 px-3 py-2 text-sm font-medium text-success"
          >
            {location.state.registrationMessage} Please sign in to continue.
          </p>
        )}

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

        {errors.root?.message && (
          <p
            role="alert"
            className="rounded-lg border border-danger/20 bg-danger/5 px-3 py-2 text-xs font-medium text-danger"
          >
            {errors.root.message}
          </p>
        )}

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
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
    </AuthCard>
  );
}

export default LoginPage;
