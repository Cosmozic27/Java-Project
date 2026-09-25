import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/forms/Input';
import { Select } from '@/components/forms/Select';
import { Button } from '@/components/common/Button';
import { Building2, Mail, Lock, ArrowRight } from 'lucide-react';

export function RegisterPage() {
  return (
    <div className="space-y-4">
      <div className="space-y-1 text-left">
        <h2 className="text-lg font-bold text-text-primary">Register Organization</h2>
        <p className="text-xs text-text-secondary">
          Join our verified network as a Food Donor or NGO partner.
        </p>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-3.5 pt-2">
        <Input
          label="Organization Name"
          placeholder="e.g. Hope Community Kitchen / Hotel Grand"
          leftIcon={<Building2 className="h-4 w-4" />}
          required
        />
        <Select
          label="Organization Type"
          required
          options={[
            { value: 'donor', label: 'Food Donor (Restaurant / Canteen / Hostel / Catering)' },
            { value: 'ngo', label: 'NGO / Charity / Food Bank' },
          ]}
        />
        <Input
          label="Official Email"
          type="email"
          placeholder="contact@org.org"
          leftIcon={<Mail className="h-4 w-4" />}
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="Minimum 8 characters"
          leftIcon={<Lock className="h-4 w-4" />}
          required
        />

        <Button
          type="submit"
          variant="primary"
          fullWidth
          rightIcon={<ArrowRight className="h-4 w-4" />}
          className="mt-2"
        >
          Create Organization Account
        </Button>
      </form>

      <div className="pt-3 text-center text-xs text-text-secondary border-t border-border/70">
        <span>Already registered? </span>
        <Link to="/auth/login" className="font-semibold text-primary hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default RegisterPage;
