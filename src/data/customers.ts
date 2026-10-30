export type CustomerStatus = 'active' | 'inactive';
export type CustomerRegion = 'north' | 'south' | 'west';

export interface Customer {
  id: string;
  name: string;
  email: string;
  status: CustomerStatus;
  region: CustomerRegion;
}

// Synthetic, fictional records only. No customer or production data.
export const CUSTOMERS: readonly Customer[] = [
  { id: 'C-1001', name: 'Avery Stone', email: 'avery.stone@example.test', status: 'active', region: 'north' },
  { id: 'C-1002', name: 'Mina Shah', email: 'mina.shah@example.test', status: 'inactive', region: 'west' },
  { id: 'C-1003', name: 'Noah Patel', email: 'noah.patel@example.test', status: 'active', region: 'north' },
  { id: 'C-1004', name: 'Zoë García', email: 'zoe.garcia@example.test', status: 'active', region: 'south' },
  { id: 'C-1005', name: 'Leo Brooks', email: 'leo.brooks@example.test', status: 'inactive', region: 'north' },
  { id: 'C-1006', name: 'Arjun Mehta', email: 'arjun.mehta@example.test', status: 'active', region: 'west' },
  { id: 'C-1007', name: 'Priya Nair', email: 'priya.nair@example.test', status: 'inactive', region: 'south' },
  { id: 'C-1008', name: 'Hana Lee', email: 'hana.lee@example.test', status: 'active', region: 'north' },
  { id: 'C-1009', name: 'Omar Khan', email: 'omar.khan@example.test', status: 'inactive', region: 'west' },
  { id: 'C-1010', name: 'Elena Cruz', email: 'elena.cruz@example.test', status: 'active', region: 'south' },
];
