export const ADMIN_STATS = [
  { title: 'Total Users', value: '186', description: 'demo platform accounts', tone: 'default' },
  { title: 'Active Donors', value: '142', description: 'demo organizations', tone: 'primary' },
  { title: 'Verified NGOs', value: '38', description: 'demo partners', tone: 'accent' },
  { title: 'Active Donations', value: '64', description: 'current listings', tone: 'info' },
  { title: 'Completed Donations', value: '1,128', description: 'all-time demo records', tone: 'default' },
  { title: 'Active Claims', value: '27', description: 'awaiting completion', tone: 'warning' },
  { title: 'Food Redistributed', value: '8,420 kg', description: 'demo impact total', tone: 'primary' },
  { title: 'Meals Saved', value: '28,500', description: 'estimated demo meals', tone: 'accent' },
];

export const ADMIN_USERS = [
  { id: 'USR001', name: 'Central Hostel & Canteen', role: 'Food Donor', email: 'canteen@campus.edu', location: 'Central Campus', type: 'Hostel & Canteen', status: 'Active', joined: '02 Sep 2026', lastActivity: 'Today, 12:05 PM', phone: '+91 98765 43210', verified: true, donations: 24, claims: 0 },
  { id: 'USR002', name: 'Hope Community Kitchen', role: 'NGO / Organization', email: 'hello@hopekitchen.org', location: 'Riverside District', type: 'Community Kitchen', status: 'Active', joined: '18 Aug 2026', lastActivity: 'Today, 12:30 PM', phone: '+91 98765 11223', verified: true, donations: 0, claims: 16 },
  { id: 'USR003', name: 'Riverside Conference Centre', role: 'Food Donor', email: 'events@riversidecc.in', location: 'Riverside District', type: 'Events & Hospitality', status: 'Pending', joined: '24 Sep 2026', lastActivity: 'Yesterday, 4:20 PM', phone: '+91 98765 22334', verified: false, donations: 3, claims: 0 },
  { id: 'USR004', name: 'Neighbourhood Food Collective', role: 'NGO / Organization', email: 'team@nfc.org', location: 'North Gate', type: 'Food Relief Collective', status: 'Active', joined: '07 Aug 2026', lastActivity: 'Yesterday, 4:35 PM', phone: '+91 98765 33445', verified: true, donations: 0, claims: 21 },
  { id: 'USR005', name: 'System Governance', role: 'Admin', email: 'admin@foodbridge.org', location: 'Platform', type: 'Platform Administration', status: 'Active', joined: '01 Aug 2026', lastActivity: 'Today, 1:10 PM', phone: '+91 98765 44556', verified: true, donations: 0, claims: 0 },
  { id: 'USR006', name: 'The Green Room Café', role: 'Food Donor', email: 'manager@greenroom.cafe', location: 'North Gate', type: 'Café Partner', status: 'Inactive', joined: '12 Aug 2026', lastActivity: '14 Sep 2026', phone: '+91 98765 55667', verified: true, donations: 8, claims: 0 },
];

export const ADMIN_NGOS = [
  { id: 'NGO001', name: 'Hope Community Kitchen', contactPerson: 'Meera Shah', email: 'hello@hopekitchen.org', phone: '+91 98765 11223', serviceArea: 'Central Campus, North Gate, Riverside District', type: 'Community Kitchen & Food Relief', submittedDate: '18 Aug 2026', status: 'Verified', description: 'A community kitchen coordinating dignified meal distribution for families, youth shelters, and neighborhood support groups.', reference: 'FB-NGO-2026-001', address: '18 Community Lane, Riverside District', documents: ['Registration certificate placeholder', 'Contact proof placeholder'], claims: 16, completed: 12 },
  { id: 'NGO002', name: 'City Food Bank', contactPerson: 'Arjun Mehta', email: 'contact@cityfoodbank.org', phone: '+91 98765 66778', serviceArea: 'Central Campus, South Campus', type: 'Food Bank', submittedDate: '23 Sep 2026', status: 'Pending Review', description: 'Local food bank seeking to coordinate same-day collections with verified donors.', reference: 'FB-NGO-2026-014', address: '4 Civic Square, South Campus', documents: ['Registration certificate placeholder', 'Address proof placeholder'], claims: 0, completed: 0 },
  { id: 'NGO003', name: 'Green Relief NGO', contactPerson: 'Sara Iyer', email: 'hello@greenrelief.org', phone: '+91 98765 77889', serviceArea: 'North Gate', type: 'Community Relief Organization', submittedDate: '20 Sep 2026', status: 'Needs Information', description: 'Volunteer-led relief organization supporting neighborhood meal programs.', reference: 'FB-NGO-2026-010', address: '22 Market Road, North Gate', documents: ['Registration certificate placeholder'], claims: 3, completed: 1 },
  { id: 'NGO004', name: 'Community Nutrition Hub', contactPerson: 'Dev Patel', email: 'team@nutritionhub.org', phone: '+91 98765 88990', serviceArea: 'Riverside District', type: 'Nutrition Support Center', submittedDate: '15 Sep 2026', status: 'Rejected', description: 'Prototype verification record requiring a future resubmission flow.', reference: 'FB-NGO-2026-006', address: '7 Riverside Road', documents: ['Submitted document placeholder'], claims: 0, completed: 0 },
];

export const ADMIN_DONATIONS = [
  { id: 'FD001', name: 'Vegetable biryani & dal', donor: 'Central Hostel & Canteen', donorId: 'USR001', quantity: '45 meal portions', category: 'Cooked Meals', dietary: 'Vegetarian', location: 'Central Campus', area: 'Central Campus', status: 'PICKUP_PENDING', posted: 'Today, 12:05 PM', preparedAt: 'Today, 11:30 AM', consumeBefore: 'Today, 5:30 PM', storage: 'Hot-held above 60°C until collection', allergens: 'Contains dairy', claimant: 'Hope Community Kitchen', pickupLocation: 'Central Hostel Dining Hall', pickupWindow: '2:00 PM – 3:00 PM', notes: 'Freshly prepared lunch portions packed for safe handover.', lastUpdated: 'Today, 12:30 PM' },
  { id: 'FD002', name: 'Assorted sandwich boxes', donor: 'Campus Events Pantry', donorId: 'USR003', quantity: '28 boxes', category: 'Packaged Food', dietary: 'Mixed dietary', location: 'Central Campus', area: 'Central Campus', status: 'AVAILABLE', posted: 'Today, 9:45 AM', preparedAt: 'Today, 9:15 AM', consumeBefore: 'Today, 7:00 PM', storage: 'Refrigerated at 4°C', allergens: 'Contains wheat and dairy', claimant: '—', pickupLocation: 'Campus Events Pantry', pickupWindow: '4:00 PM – 5:00 PM', notes: 'Individually packed sandwiches from a cancelled event.', lastUpdated: 'Today, 9:45 AM' },
  { id: 'FD003', name: 'Bananas and seasonal fruit', donor: 'North Gate Stores', donorId: 'USR004', quantity: '18 kg', category: 'Fresh Produce', dietary: 'Vegetarian', location: 'North Gate', area: 'North Gate', status: 'CLAIMED', posted: 'Yesterday, 4:20 PM', preparedAt: 'Yesterday, 4:00 PM', consumeBefore: 'Tomorrow, 12:00 PM', storage: 'Cool, dry produce storage', allergens: 'None declared', claimant: 'Neighbourhood Food Collective', pickupLocation: 'North Gate Stores', pickupWindow: '1:00 PM – 2:00 PM', notes: 'Ripe seasonal fruit ready for same-day distribution.', lastUpdated: 'Today, 9:10 AM' },
  { id: 'FD004', name: 'Dinner rolls and pastries', donor: 'Central Hostel & Canteen', donorId: 'USR001', quantity: '64 pieces', category: 'Bakery & Snacks', dietary: 'Vegetarian', location: 'Central Campus', area: 'Central Campus', status: 'COMPLETED', posted: '18 Sep 2026', preparedAt: '18 Sep 2026, 3:00 PM', consumeBefore: '19 Sep 2026, 12:00 PM', storage: 'Covered bakery storage', allergens: 'Contains wheat, eggs, dairy', claimant: 'Hope Community Kitchen', pickupLocation: 'Central Hostel Dining Hall', pickupWindow: '10:00 AM – 11:00 AM', notes: 'Bakery surplus collected following evening service.', lastUpdated: '19 Sep 2026, 11:20 AM' },
  { id: 'FD005', name: 'Lentil soup containers', donor: 'South Campus Kitchen', donorId: 'USR003', quantity: '22 containers', category: 'Cooked Meals', dietary: 'Vegetarian', location: 'South Campus', area: 'South Campus', status: 'COLLECTED', posted: '16 Sep 2026', preparedAt: '16 Sep 2026, 5:30 PM', consumeBefore: '16 Sep 2026, 10:00 PM', storage: 'Hot-held until collection', allergens: 'None declared', claimant: 'Neighbourhood Food Collective', pickupLocation: 'South Campus Kitchen', pickupWindow: '7:00 PM – 8:00 PM', notes: 'Portioned soup collected during the evening pickup window.', lastUpdated: '16 Sep 2026, 8:15 PM' },
  { id: 'FD006', name: 'Event fruit cups', donor: 'Campus Events Pantry', donorId: 'USR003', quantity: '36 cups', category: 'Fresh Produce', dietary: 'Vegetarian', location: 'Central Campus', area: 'Central Campus', status: 'EXPIRED', posted: '12 Sep 2026', preparedAt: '12 Sep 2026, 10:00 AM', consumeBefore: '12 Sep 2026, 3:00 PM', storage: 'Refrigerated at 4°C', allergens: 'None declared', claimant: '—', pickupLocation: 'Campus Events Pantry', pickupWindow: '1:00 PM – 2:00 PM', notes: 'Listing closed after the safety window elapsed.', lastUpdated: '12 Sep 2026, 3:05 PM' },
];

export const ADMIN_CLAIMS = [
  { id: 'CL001', donationId: 'FD001', food: 'Vegetable biryani & dal', ngo: 'Hope Community Kitchen', ngoId: 'NGO001', donor: 'Central Hostel & Canteen', quantity: '45 meal portions', claimDate: 'Today, 12:18 PM', status: 'PICKUP_PENDING', pickupStatus: 'Pickup Pending', pickupLocation: 'Central Hostel Dining Hall', pickupWindow: '2:00 PM – 3:00 PM', lastUpdated: 'Today, 12:30 PM' },
  { id: 'CL002', donationId: 'FD003', food: 'Bananas and seasonal fruit', ngo: 'Neighbourhood Food Collective', ngoId: 'NGO004', donor: 'North Gate Stores', quantity: '18 kg', claimDate: 'Yesterday, 4:35 PM', status: 'CLAIM_CONFIRMED', pickupStatus: 'Confirmed', pickupLocation: 'North Gate Stores', pickupWindow: '1:00 PM – 2:00 PM', lastUpdated: 'Today, 9:10 AM' },
  { id: 'CL003', donationId: 'FD004', food: 'Dinner rolls and pastries', ngo: 'Hope Community Kitchen', ngoId: 'NGO001', donor: 'Central Hostel & Canteen', quantity: '64 pieces', claimDate: '18 Sep 2026, 4:20 PM', status: 'COMPLETED', pickupStatus: 'Completed', pickupLocation: 'Central Hostel Dining Hall', pickupWindow: '10:00 AM – 11:00 AM', lastUpdated: '19 Sep 2026, 11:20 AM' },
  { id: 'CL004', donationId: 'FD005', food: 'Lentil soup containers', ngo: 'Neighbourhood Food Collective', ngoId: 'NGO004', donor: 'South Campus Kitchen', quantity: '22 containers', claimDate: '16 Sep 2026, 5:45 PM', status: 'COLLECTED', pickupStatus: 'Collected', pickupLocation: 'South Campus Kitchen', pickupWindow: '7:00 PM – 8:00 PM', lastUpdated: '16 Sep 2026, 8:15 PM' },
  { id: 'CL005', donationId: 'FD006', food: 'Event fruit cups', ngo: 'Green Relief NGO', ngoId: 'NGO003', donor: 'Campus Events Pantry', quantity: '36 cups', claimDate: '12 Sep 2026, 11:15 AM', status: 'CANCELLED', pickupStatus: 'Cancelled', pickupLocation: 'Campus Events Pantry', pickupWindow: '1:00 PM – 2:00 PM', lastUpdated: '12 Sep 2026, 11:40 AM' },
];

export const ADMIN_ACTIVITY = [
  { label: 'Donation posted', detail: 'Vegetable biryani & dal · Central Hostel & Canteen', time: 'Today, 12:05 PM', tone: 'primary' },
  { label: 'Claim submitted', detail: 'Hope Community Kitchen requested 45 portions', time: 'Today, 12:18 PM', tone: 'info' },
  { label: 'NGO verification submitted', detail: 'City Food Bank is awaiting review', time: 'Yesterday, 4:20 PM', tone: 'warning' },
  { label: 'Donation collected', detail: 'Lentil soup containers · South Campus Kitchen', time: '16 Sep 2026, 8:15 PM', tone: 'success' },
  { label: 'NGO verified', detail: 'Hope Community Kitchen joined the verified network', time: '18 Aug 2026', tone: 'primary' },
];

export const DONATION_TREND = [
  { month: 'Jan', donations: 92, completed: 64 }, { month: 'Feb', donations: 108, completed: 78 }, { month: 'Mar', donations: 124, completed: 91 }, { month: 'Apr', donations: 118, completed: 86 }, { month: 'May', donations: 146, completed: 109 }, { month: 'Jun', donations: 162, completed: 124 }, { month: 'Jul', donations: 184, completed: 151 },
];
export const DONATION_STATUS_BREAKDOWN = [
  { name: 'Available', value: 64, color: '#16A34A' }, { name: 'Claimed', value: 22, color: '#2563EB' }, { name: 'Pickup Pending', value: 27, color: '#F59E0B' }, { name: 'Collected', value: 19, color: '#059669' }, { name: 'Completed', value: 1128, color: '#15803D' }, { name: 'Expired', value: 42, color: '#94A3B8' }, { name: 'Cancelled', value: 18, color: '#EF4444' },
];
export const CATEGORY_BREAKDOWN = [
  { name: 'Prepared Meals', value: 420 }, { name: 'Bakery', value: 188 }, { name: 'Produce', value: 236 }, { name: 'Packaged Food', value: 164 }, { name: 'Beverages', value: 72 }, { name: 'Other', value: 48 },
];
export const AREA_SUMMARY = [
  { area: 'Central Campus', donors: 58, ngos: 14, donations: 486, food: '3,240 kg' },
  { area: 'North Gate', donors: 34, ngos: 9, donations: 274, food: '1,860 kg' },
  { area: 'South Campus', donors: 26, ngos: 7, donations: 198, food: '1,420 kg' },
  { area: 'Riverside District', donors: 24, ngos: 8, donations: 170, food: '1,900 kg' },
];

export const STATUS_LABELS = { AVAILABLE: 'Available', CLAIMED: 'Claimed', PICKUP_PENDING: 'Pickup Pending', COLLECTED: 'Collected', COMPLETED: 'Completed', EXPIRED: 'Expired', CANCELLED: 'Cancelled', REQUEST_SUBMITTED: 'Request Submitted', CLAIM_CONFIRMED: 'Claim Confirmed', PENDING: 'Pending Review', VERIFIED: 'Verified', REJECTED: 'Rejected', NEEDS_INFORMATION: 'Needs Information' };

export const getAdminUserById = (id) => ADMIN_USERS.find((item) => item.id === id) || ADMIN_USERS[0];
export const getAdminNgoById = (id) => ADMIN_NGOS.find((item) => item.id === id) || ADMIN_NGOS[0];
export const getAdminDonationById = (id) => ADMIN_DONATIONS.find((item) => item.id === id) || ADMIN_DONATIONS[0];
export const getAdminClaimById = (id) => ADMIN_CLAIMS.find((item) => item.id === id) || ADMIN_CLAIMS[0];
