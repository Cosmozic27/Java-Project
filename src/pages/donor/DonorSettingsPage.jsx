import React from 'react';
import { SharedSettingsPage } from '@/pages/shared/SharedSettingsPage';

export function DonorSettingsPage() {
  return (
    <SharedSettingsPage
      role="donor"
      userInfo={{
        name: 'Central Hostel & Canteen',
        email: 'canteen@campus.edu',
        organizationName: 'Central Hostel & Canteen',
        phone: '',
      }}
    />
  );
}

export default DonorSettingsPage;
