export const DUMMY_LEADS = [
  { id: '1', name: 'Rajesh Kumar', phone: '9876543210', email: 'rajesh@example.com', source: 'facebook', status: 'new', campaign: 'Spring Sale', adset: 'Young Adults', created_at: new Date().toISOString() },
  { id: '2', name: 'Anita Singh', phone: '9876543211', email: 'anita@example.com', source: 'website', status: 'contacted', campaign: 'Google Search', adset: 'Property Seekers', created_at: new Date().toISOString() },
  { id: '3', name: 'Suresh Raina', phone: '9876543212', email: 'suresh@example.com', source: 'manual', status: 'site_visit', campaign: 'Referral', adset: 'Direct', created_at: new Date().toISOString() }
];

export const DUMMY_PLOTS = [
  { id: '1', plot_number: 'A-101', size: '1200 sqft', price: 2500000, facing: 'East', status: 'available' },
  { id: '2', plot_number: 'A-102', size: '1500 sqft', price: 3200000, facing: 'West', status: 'available' },
  { id: '3', plot_number: 'B-201', size: '1200 sqft', price: 2450000, facing: 'North', status: 'booked' }
];

export const DUMMY_PAYMENTS = [
  { id: '1', customer_name: 'Vikram Seth', amount: 500000, payment_mode: 'Online', created_at: new Date().toISOString() },
  { id: '2', customer_name: 'Brijesh Yadav', amount: 250000, payment_mode: 'Check', created_at: new Date().toISOString() }
];

export const DUMMY_SITE_VISITS = [
  { id: '1', lead_name: 'Rajesh Kumar', plot_number: 'A-101', visit_date: new Date(Date.now() + 86400000).toISOString(), status: 'scheduled', notes: 'Interested in East facing.' },
  { id: '2', lead_name: 'Anita Singh', plot_number: 'A-102', visit_date: new Date(Date.now() - 86400000).toISOString(), status: 'completed', notes: 'Will discuss with family.' }
];

