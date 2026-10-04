import React from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, Home } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { Button } from '@/components/common/Button';
import { getPrototypeAuth } from '@/constants/authData';

export function NotFoundPage() {
  const navigate = useNavigate();
  const error = useRouteError();
  const auth = getPrototypeAuth();

  const is404 =
    !error ||
    error?.status === 404 ||
    (typeof error?.message === 'string' && error.message.toLowerCase().includes('not found'));

  const dashboardPath = auth?.role ? `/${auth.role}` : '/auth/login';

  return (
    <div className="relative isolate min-h-screen flex flex-col items-center justify-center bg-background font-sans px-4 py-16 text-center overflow-hidden">
      {/* Soft decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute left-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full bg-accent/30 blur-3xl" />
      </div>

      {/* Logo */}
      <div className="mb-10">
        <Logo size="md" to={auth ? null : '/'} />
      </div>

      {/* Error Illustration */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-light border border-primary/20">
        <AlertTriangle className="h-10 w-10 text-primary-dark" />
      </div>

      {/* Copy */}
      <h1 className="text-5xl font-extrabold tracking-tight text-text-primary mb-2">
        {is404 ? '404' : 'Error'}
      </h1>
      <p className="text-xl font-semibold text-text-primary mb-3">
        {is404 ? 'Page not found' : 'Something went wrong'}
      </p>
      <p className="max-w-md text-sm text-text-secondary leading-relaxed mb-10">
        {is404
          ? "The FoodBridge page you're looking for doesn't exist or may have been moved."
          : 'An unexpected error occurred. Please try again or return to your dashboard.'}
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="outline"
          leftIcon={<ArrowLeft className="h-4 w-4" />}
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
        {auth ? (
          <Button
            variant="primary"
            leftIcon={<Home className="h-4 w-4" />}
            onClick={() => navigate(dashboardPath)}
          >
            Back to Dashboard
          </Button>
        ) : (
          <Button
            variant="primary"
            leftIcon={<Home className="h-4 w-4" />}
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        )}
      </div>
    </div>
  );
}

export default NotFoundPage;
