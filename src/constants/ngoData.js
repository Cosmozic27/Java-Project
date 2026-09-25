export const NGO_FOOD_STATUSES = ['AVAILABLE', 'CLAIMED', 'PICKUP_PENDING', 'COLLECTED', 'COMPLETED', 'EXPIRED'];

export const NGO_FOOD_STATUS_LABELS = {
  AVAILABLE: 'Available',
  CLAIMED: 'Claimed',
  PICKUP_PENDING: 'Pickup Pending',
  COLLECTED: 'Collected',
  COMPLETED: 'Completed',
  EXPIRED: 'Expired',
};

export const NGO_CLAIM_STATUSES = [
  'REQUESTED',
  'CONFIRMED',
  'PICKUP_PENDING',
  'COLLECTED',
  'COMPLETED',
  'CANCELLED',
  'EXPIRED',
];

export const NGO_CLAIM_STATUS_LABELS = {
  REQUESTED: 'Request Submitted',
  CONFIRMED: 'Claim Confirmed',
  PICKUP_PENDING: 'Pickup Pending',
  COLLECTED: 'Collected',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  EXPIRED: 'Expired',
};

export const NGO_CATEGORIES = ['Cooked Meals', 'Bakery & Snacks', 'Fresh Produce', 'Packaged Food', 'Beverages'];
export const NGO_AREAS = ['Central Campus', 'North Gate', 'South Campus', 'Riverside District'];

export const NGO_PROFILE = {
  name: 'Hope Community Kitchen',
  type: 'Community Kitchen & Food Relief',
  email: 'hello@hopekitchen.org',
  phone: '+91 98765 11223',
  serviceArea: 'Central Campus, North Gate, and Riverside District',
  address: '18 Community Lane, Riverside District',
  pickupNotes: 'Volunteer collection point is at the rear service entrance. Please call the kitchen desk on arrival.',
  description: 'A community kitchen coordinating dignified meal distribution for families, youth shelters, and neighborhood support groups.',
  joined: 'August 2026',
  contactPerson: 'Meera Shah',
};

export const NGO_STATS = [
  { title: 'Active Claims', value: '4', description: 'illustrative value' },
  { title: 'Meals Received', value: '612', description: 'illustrative value' },
  { title: 'Successful Pickups', value: '28', description: 'illustrative value' },
  { title: 'Food Collected', value: '184 kg', description: 'illustrative value' },
];

export const NGO_AVAILABLE_FOOD = [
  {
    id: 'FD001', name: 'Vegetable biryani & dal', donor: 'Central Hostel & Canteen', quantity: '45 meal portions', category: 'Cooked Meals', dietary: 'Vegetarian', status: 'AVAILABLE', area: 'Central Campus', distance: '1.8 km',
    preparedAt: 'Today, 11:30 AM', consumeBefore: 'Today, 5:30 PM', pickupDate: 'Today', pickupStart: '2:00 PM', pickupEnd: '3:00 PM', pickupWindow: '2:00 PM – 3:00 PM', location: 'Central Hostel Dining Hall', pickupNotes: 'Use the north service entrance and check in with the dining desk.', storage: 'Hot-held above 60°C until collection', allergens: 'Contains dairy', description: 'Freshly prepared lunch portions packed for safe handover.', impact: '45 meals available for redistribution', donorType: 'Hostel & Canteen',
  },
  {
    id: 'FD002', name: 'Assorted sandwich boxes', donor: 'Campus Events Pantry', quantity: '28 boxes', category: 'Packaged Food', dietary: 'Vegetarian & Non-Vegetarian', status: 'AVAILABLE', area: 'Central Campus', distance: '2.4 km',
    preparedAt: 'Today, 9:15 AM', consumeBefore: 'Today, 7:00 PM', pickupDate: 'Today', pickupStart: '4:00 PM', pickupEnd: '5:00 PM', pickupWindow: '4:00 PM – 5:00 PM', location: 'Campus Events Pantry', pickupNotes: 'Boxes are labeled by filling; collect from the pantry counter.', storage: 'Refrigerated at 4°C', allergens: 'Contains wheat, dairy; assorted fillings', description: 'Individually packed sandwiches from a cancelled campus event.', impact: '28 boxes available for redistribution', donorType: 'Campus Events',
  },
  {
    id: 'FD003', name: 'Bananas and seasonal fruit', donor: 'North Gate Stores', quantity: '18 kg', category: 'Fresh Produce', dietary: 'Vegetarian', status: 'CLAIMED', area: 'North Gate', distance: '3.1 km',
    preparedAt: 'Yesterday, 4:00 PM', consumeBefore: 'Tomorrow, 12:00 PM', pickupDate: 'Today', pickupStart: '1:00 PM', pickupEnd: '2:00 PM', pickupWindow: '1:00 PM – 2:00 PM', location: 'North Gate Stores', pickupNotes: 'Produce is packed in reusable crates at the side loading area.', storage: 'Cool, dry produce storage', allergens: 'None declared', description: 'Ripe seasonal fruit ready for same-day distribution.', impact: '18 kg of produce redirected', donorType: 'Retail Partner',
  },
  {
    id: 'FD008', name: 'Dal, rice & chapati trays', donor: 'Riverside Conference Centre', quantity: '70 meal portions', category: 'Cooked Meals', dietary: 'Vegetarian', status: 'AVAILABLE', area: 'Riverside District', distance: '4.6 km',
    preparedAt: 'Today, 12:15 PM', consumeBefore: 'Today, 6:00 PM', pickupDate: 'Today', pickupStart: '3:30 PM', pickupEnd: '4:30 PM', pickupWindow: '3:30 PM – 4:30 PM', location: 'Riverside Conference Centre', pickupNotes: 'Bring insulated carriers; the collection desk is beside loading bay B.', storage: 'Hot-held until collection', allergens: 'Contains gluten', description: 'Sealed meal trays remaining from a community conference lunch.', impact: '70 meals available for redistribution', donorType: 'Events & Hospitality',
  },
  {
    id: 'FD009', name: 'Fresh bakery assortment', donor: 'The Green Room Café', quantity: '42 pieces', category: 'Bakery & Snacks', dietary: 'Vegetarian', status: 'AVAILABLE', area: 'North Gate', distance: '2.9 km',
    preparedAt: 'Today, 8:00 AM', consumeBefore: 'Tomorrow, 9:00 AM', pickupDate: 'Today', pickupStart: '5:00 PM', pickupEnd: '6:00 PM', pickupWindow: '5:00 PM – 6:00 PM', location: 'Green Room Café Kitchen', pickupNotes: 'Ask for the closing supervisor at the café counter.', storage: 'Covered bakery storage', allergens: 'Contains wheat, eggs, dairy', description: 'Fresh pastries and rolls packed for end-of-day community distribution.', impact: '42 bakery items available', donorType: 'Café Partner',
  },
];

export const NGO_CLAIMS = [
  { id: 'CL001', foodId: 'FD001', foodName: 'Vegetable biryani & dal', category: 'Cooked Meals', quantity: '45 meal portions', donor: 'Central Hostel & Canteen', location: 'Central Hostel Dining Hall', pickupDate: 'Today', pickupWindow: '2:00 PM – 3:00 PM', status: 'PICKUP_PENDING', createdAt: 'Today, 12:18 PM', updatedAt: 'Today, 12:30 PM', consumeBefore: 'Today, 5:30 PM', storage: 'Hot-held above 60°C until collection', allergens: 'Contains dairy', pickupNotes: 'Use the north service entrance and check in with the dining desk.', impact: 'Pickup coordinator assigned',
  },
  { id: 'CL002', foodId: 'FD003', foodName: 'Bananas and seasonal fruit', category: 'Fresh Produce', quantity: '18 kg', donor: 'North Gate Stores', location: 'North Gate Stores', pickupDate: 'Today', pickupWindow: '1:00 PM – 2:00 PM', status: 'CONFIRMED', createdAt: 'Yesterday, 4:35 PM', updatedAt: 'Today, 9:10 AM', consumeBefore: 'Tomorrow, 12:00 PM', storage: 'Cool, dry produce storage', allergens: 'None declared', pickupNotes: 'Produce is packed in reusable crates at the side loading area.', impact: 'Pickup window reserved',
  },
  { id: 'CL003', foodId: 'FD004', foodName: 'Dinner rolls and pastries', category: 'Bakery & Snacks', quantity: '64 pieces', donor: 'Central Hostel & Canteen', location: 'Central Hostel Dining Hall', pickupDate: '19 Sep 2026', pickupWindow: '10:00 AM – 11:00 AM', status: 'COMPLETED', createdAt: '18 Sep 2026, 4:20 PM', updatedAt: '19 Sep 2026, 11:20 AM', consumeBefore: '19 Sep 2026, 12:00 PM', storage: 'Covered bakery storage', allergens: 'Contains wheat, eggs, dairy', pickupNotes: 'Collection point was beside the north service entrance.', impact: '64 bakery items redistributed',
  },
  { id: 'CL004', foodId: 'FD005', foodName: 'Lentil soup containers', category: 'Cooked Meals', quantity: '22 containers', donor: 'South Campus Kitchen', location: 'South Campus Kitchen', pickupDate: '16 Sep 2026', pickupWindow: '7:00 PM – 8:00 PM', status: 'COLLECTED', createdAt: '16 Sep 2026, 5:45 PM', updatedAt: '16 Sep 2026, 8:15 PM', consumeBefore: '16 Sep 2026, 10:00 PM', storage: 'Hot-held until collection', allergens: 'None declared', pickupNotes: 'Volunteer team checked in at the kitchen dispatch area.', impact: '22 servings received by the kitchen',
  },
  { id: 'CL005', foodId: 'FD007', foodName: 'Rice and vegetable curry', category: 'Cooked Meals', quantity: '30 meal portions', donor: 'Central Hostel & Canteen', location: 'Central Hostel Dining Hall', pickupDate: '10 Sep 2026', pickupWindow: '1:30 PM – 2:30 PM', status: 'CANCELLED', createdAt: '10 Sep 2026, 11:30 AM', updatedAt: '10 Sep 2026, 12:10 PM', consumeBefore: '10 Sep 2026, 4:00 PM', storage: 'Hot-held until handover', allergens: 'Contains dairy', pickupNotes: 'Request cancelled after donor adjusted quantities.', impact: 'Request cancelled before pickup',
  },
];

export const NGO_ACTIVITY = [
  { label: 'Pickup pending', detail: 'Vegetable biryani & dal · 45 portions', time: 'Today, 12:30 PM', tone: 'warning' },
  { label: 'Claim confirmed', detail: 'Bananas and seasonal fruit · North Gate Stores', time: 'Today, 9:10 AM', tone: 'info' },
  { label: 'Food collected', detail: 'Lentil soup containers · 22 servings', time: '16 Sep 2026, 8:15 PM', tone: 'success' },
  { label: 'Donation completed', detail: 'Dinner rolls and pastries · 64 pieces', time: '19 Sep 2026', tone: 'primary' },
];

export const NGO_HISTORY = NGO_CLAIMS.filter((claim) => ['COLLECTED', 'COMPLETED', 'CANCELLED', 'EXPIRED'].includes(claim.status));

export function getNgoFoodById(id) {
  return NGO_AVAILABLE_FOOD.find((food) => food.id === id) || NGO_AVAILABLE_FOOD[0];
}

export function getClaimById(id) {
  return NGO_CLAIMS.find((claim) => claim.id === id) || NGO_CLAIMS[0];
}

export function getClaimForFood(foodId) {
  return NGO_CLAIMS.find((claim) => claim.foodId === foodId);
}
