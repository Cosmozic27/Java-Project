import {
  ADMIN_USERS,
  ADMIN_NGOS,
  ADMIN_DONATIONS,
  ADMIN_CLAIMS,
  ADMIN_STATS,
  ADMIN_ACTIVITY,
  DONATION_TREND,
  DONATION_STATUS_BREAKDOWN,
  CATEGORY_BREAKDOWN,
  AREA_SUMMARY,
} from '../constants/adminData.js';
import { DEMO_CONFIG } from '../config/demoConfig.js';

const STORAGE_KEY = DEMO_CONFIG.sessionKeys.demoData;

/**
 * Creates default demo initial state
 */
function getDefaultDemoState() {
  return {
    users: JSON.parse(JSON.stringify(ADMIN_USERS)),
    ngos: JSON.parse(JSON.stringify(ADMIN_NGOS)),
    donations: JSON.parse(JSON.stringify(ADMIN_DONATIONS)),
    claims: JSON.parse(JSON.stringify(ADMIN_CLAIMS)),
    activity: JSON.parse(JSON.stringify(ADMIN_ACTIVITY)),
  };
}

/**
 * In-memory fallback if sessionStorage is inaccessible
 */
let inMemoryStore = null;

function loadStore() {
  if (typeof window === 'undefined') {
    if (!inMemoryStore) inMemoryStore = getDefaultDemoState();
    return inMemoryStore;
  }

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = getDefaultDemoState();
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    if (!inMemoryStore) inMemoryStore = getDefaultDemoState();
    return inMemoryStore;
  }
}

function saveStore(data) {
  inMemoryStore = data;
  if (typeof window === 'undefined') return;

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Keep in-memory
  }
}

export const adminDemoAdapter = {
  isDemoSession() {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(DEMO_CONFIG.sessionKeys.isDemo) === 'true';
  },

  // ── USERS ────────────────────────────────────────────────────────
  getUsers() {
    const store = loadStore();
    return [...store.users];
  },

  getUserById(id) {
    const store = loadStore();
    return store.users.find((u) => u.id === id) || store.users[0] || null;
  },

  updateUser(id, updates) {
    const store = loadStore();
    const index = store.users.findIndex((u) => u.id === id);
    if (index === -1) {
      return { success: false, isDemo: true, error: `User ${id} not found in demo data` };
    }

    store.users[index] = { ...store.users[index], ...updates };

    // Record activity in demo feed
    const userName = store.users[index].name;
    if (updates.status) {
      store.activity.unshift({
        label: `User status changed to ${updates.status}`,
        detail: `${userName} account status updated`,
        time: 'Just now',
        tone: updates.status === 'Active' ? 'success' : 'warning',
      });
    }

    saveStore(store);

    return {
      success: true,
      isDemo: true,
      updatedRecord: store.users[index],
      message: `User '${userName}' updated in Demo Mode (Local demo simulation; database unaffected).`,
    };
  },

  // ── NGOS ─────────────────────────────────────────────────────────
  getNgos() {
    const store = loadStore();
    return [...store.ngos];
  },

  getNgoById(id) {
    const store = loadStore();
    return store.ngos.find((n) => n.id === id) || store.ngos[0] || null;
  },

  updateNgo(id, updates) {
    const store = loadStore();
    const index = store.ngos.findIndex((n) => n.id === id);
    if (index === -1) {
      return { success: false, isDemo: true, error: `NGO ${id} not found in demo data` };
    }

    store.ngos[index] = { ...store.ngos[index], ...updates };

    const ngoName = store.ngos[index].name;
    if (updates.status) {
      store.activity.unshift({
        label: `NGO status set to ${updates.status}`,
        detail: `${ngoName} verification updated`,
        time: 'Just now',
        tone: updates.status === 'Verified' ? 'primary' : updates.status === 'Rejected' ? 'danger' : 'warning',
      });
    }

    saveStore(store);

    return {
      success: true,
      isDemo: true,
      updatedRecord: store.ngos[index],
      message: `NGO '${ngoName}' updated in Demo Mode (Local demo simulation; database unaffected).`,
    };
  },

  // ── DONATIONS ────────────────────────────────────────────────────
  getDonations() {
    const store = loadStore();
    return [...store.donations];
  },

  getDonationById(id) {
    const store = loadStore();
    return store.donations.find((d) => d.id === id) || store.donations[0] || null;
  },

  updateDonation(id, updates) {
    const store = loadStore();
    const index = store.donations.findIndex((d) => d.id === id);
    if (index === -1) {
      return { success: false, isDemo: true, error: `Donation ${id} not found in demo data` };
    }

    store.donations[index] = {
      ...store.donations[index],
      ...updates,
      lastUpdated: 'Just now',
    };

    saveStore(store);

    return {
      success: true,
      isDemo: true,
      updatedRecord: store.donations[index],
      message: `Donation '${store.donations[index].name}' updated in Demo Mode (Local demo simulation; database unaffected).`,
    };
  },

  // ── CLAIMS ───────────────────────────────────────────────────────
  getClaims() {
    const store = loadStore();
    return [...store.claims];
  },

  getClaimById(id) {
    const store = loadStore();
    return store.claims.find((c) => c.id === id) || store.claims[0] || null;
  },

  updateClaim(id, updates) {
    const store = loadStore();
    const index = store.claims.findIndex((c) => c.id === id);
    if (index === -1) {
      return { success: false, isDemo: true, error: `Claim ${id} not found in demo data` };
    }

    store.claims[index] = {
      ...store.claims[index],
      ...updates,
      lastUpdated: 'Just now',
    };

    const claim = store.claims[index];
    if (updates.status) {
      store.activity.unshift({
        label: `Claim status changed to ${updates.status.replace(/_/g, ' ')}`,
        detail: `${claim.food} (${claim.ngo})`,
        time: 'Just now',
        tone: updates.status === 'COMPLETED' ? 'success' : 'info',
      });
    }

    saveStore(store);

    return {
      success: true,
      isDemo: true,
      updatedRecord: store.claims[index],
      message: `Claim '${claim.id}' updated to ${updates.status} in Demo Mode (Local demo simulation; database unaffected).`,
    };
  },

  // ── STATS & FEED ─────────────────────────────────────────────────
  getStats() {
    const store = loadStore();
    const verifiedNgos = store.ngos.filter((n) => n.status === 'Verified').length;
    const activeDonations = store.donations.filter((d) => d.status === 'AVAILABLE').length;
    const activeClaims = store.claims.filter((c) => ['REQUEST_SUBMITTED', 'CLAIM_CONFIRMED', 'PICKUP_PENDING'].includes(c.status)).length;

    return ADMIN_STATS.map((stat) => {
      if (stat.title === 'Total Users') {
        return { ...stat, value: String(store.users.length) };
      }
      if (stat.title === 'Verified NGOs') {
        return { ...stat, value: String(verifiedNgos) };
      }
      if (stat.title === 'Active Donations') {
        return { ...stat, value: String(activeDonations) };
      }
      if (stat.title === 'Active Claims') {
        return { ...stat, value: String(activeClaims) };
      }
      return stat;
    });
  },

  getActivity() {
    const store = loadStore();
    return [...store.activity];
  },

  getCharts() {
    return {
      donationTrend: DONATION_TREND,
      donationStatus: DONATION_STATUS_BREAKDOWN,
      categoryBreakdown: CATEGORY_BREAKDOWN,
      areaSummary: AREA_SUMMARY,
    };
  },

  resetDemoData() {
    const fresh = getDefaultDemoState();
    saveStore(fresh);
    return {
      success: true,
      isDemo: true,
      message: 'Demo dataset has been reset to initial baseline values.',
    };
  },
};

export default adminDemoAdapter;
