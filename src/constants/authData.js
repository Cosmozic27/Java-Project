export const PROTOTYPE_AUTH_STORAGE_KEY = 'foodbridge.prototype.auth';

export const DEMO_ACCOUNTS = [
  {
    email: 'canteen@campus.edu',
    password: 'demo123',
    role: 'donor',
    label: 'Food Donor',
    redirectTo: '/donor',
  },
  {
    email: 'contact@hopekitchen.org',
    password: 'demo123',
    role: 'ngo',
    label: 'NGO / Organization',
    redirectTo: '/ngo',
  },
  {
    email: 'admin@foodbridge.org',
    password: 'demo123',
    role: 'admin',
    label: 'Admin',
    redirectTo: '/admin',
  },
];

export function findDemoAccount(email, password) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  return DEMO_ACCOUNTS.find(
    (account) => account.email === normalizedEmail && account.password === password
  );
}

export function getPrototypeAuth() {
  if (typeof window === 'undefined') return null;

  try {
    const stored = window.localStorage.getItem(PROTOTYPE_AUTH_STORAGE_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored);
    return parsed?.role ? parsed : null;
  } catch {
    return null;
  }
}

export function setPrototypeAuth(account) {
  if (typeof window === 'undefined') return;

  window.localStorage.setItem(
    PROTOTYPE_AUTH_STORAGE_KEY,
    JSON.stringify({
      email: account.email,
      role: account.role,
      label: account.label,
    })
  );
}

export function clearPrototypeAuth() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(PROTOTYPE_AUTH_STORAGE_KEY);
}
