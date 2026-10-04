import React from 'react';
import { SharedSettingsPage } from '@/pages/shared/SharedSettingsPage';

export function NgoSettingsPage() {
  return (
    <SharedSettingsPage
      role="ngo"
      userInfo={{
        name: 'Hope Community Kitchen',
        email: 'contact@hopekitchen.org',
        organizationName: 'Hope Community Kitchen',
        phone: '',
      }}
    />
  );
}

export default NgoSettingsPage;
