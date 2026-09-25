import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/forms/Input';
import { Button } from '@/components/common/Button';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export function LoginPage() {
  return (
    <div className="space-y-4">
      <div className="space-y-1 text-left">
        <h2 className="text-lg font-bold text-text-primary">Sign In</h2>
        <p className="text-xs text-text-secondary">
          Enter your organization credentials to access your FoodBridge portal.
        </p>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-3.5 pt-2">
        <Input
          label="Email Address"
          type="email"
          placeholder="name@organization.org"
          leftIcon={<Mail className="h-4 w-4" />}
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          leftIcon={<Lock className="h-4 w-4" />}
          required
        />

        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-1.5 cursor-pointer text-text-secondary select-none">
            <input type="checkbox" className="rounded border-border text-primary focus:ring-primary/20" />
            <span>Remember me</span>
          </label>
          <button
            type="button"
            className="text-primary hover:underline cursor-pointer bg-transparent border-0 p-0 font-inherit"
          >
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          rightIcon={<ArrowRight className="h-4 w-4" />}
          className="mt-2"
        >
          Sign In
        </Button>
      </form>

      <div className="pt-3 text-center text-xs text-text-secondary border-t border-border/70">
        <span>Don't have an account yet? </span>
        <Link to="/auth/register" className="font-semibold text-primary hover:underline">
          Register Organization
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
