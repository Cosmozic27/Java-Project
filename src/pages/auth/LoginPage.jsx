import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthCard } from '@/components/auth';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/forms/Input';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import { apiClient } from '@/services/api';
import { findDemoAccount } from '@/constants/authData';
import {
  authenticateDemoAdmin,
  startDemoAdminSession,
  isDemoModeAvailable,
} from '@/services/demoAuthService';

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
    },
  });

  const onSubmit = async ({ email, password }) => {
    const normalizedEmail = email.trim();

    // 1. Attempt normal real backend authentication first
    try {
      const response = await apiClient.post('/auth/login', {
        email: normalizedEmail,
        password,
      });

      const user = response.data?.user;
      const token = response.data?.token;

      if (!user || !token) {
        setError('root', {
          type: 'server',
          message: 'Unable to authenticate. Please check the backend service.',
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

      // Preserve existing JWT/session handling for real accounts
      sessionStorage.setItem('foodbridgeToken', token);
      sessionStorage.removeItem('foodbridgeIsDemoAdmin');
      sessionStorage.setItem('foodbridgeUser', JSON.stringify(user));
      sessionStorage.setItem('foodbridgeLoggedIn', 'true');

      // Route automatically based on user's actual role from the backend response
      if (role === 'ADMIN') {
        navigate('/admin', { replace: true });
      } else if (role === 'NGO') {
        navigate('/ngo', { replace: true });
      } else {
        navigate('/donor', { replace: true });
      }
      return;
    } catch (error) {
      // 2. If backend authentication fails, check isolated demo Admin credentials only when demo mode is enabled
      if (isDemoModeAvailable()) {
        const demoResult = authenticateDemoAdmin(normalizedEmail, password);
        if (demoResult.success) {
          startDemoAdminSession(demoResult.user);
          navigate('/admin', { replace: true });
          return;
        }
      }

      // 3. Fallback for offline prototype accounts (when backend is unavailable)
      const demoAccount = findDemoAccount(normalizedEmail, password);
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

      // 4. Reject invalid credentials with a clear, user-friendly error
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        'Unable to sign in. Please verify your email and password.';

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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
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
          label="Email"
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
          leftIcon={<Mail className="h-4 w-4" aria-hidden="true" />}
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required.',
            pattern: {
              value: EMAIL_PATTERN,
              message: 'Enter a valid email address.',
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

        <Button
          type="submit"
          id="btn-login-submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={isSubmitting}
          rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
          className="mt-2 btn-glass-primary"
        >
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
    </AuthCard>
  );
}

export default LoginPage;
