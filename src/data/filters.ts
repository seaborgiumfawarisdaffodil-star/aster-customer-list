import type { Customer } from './customers';

export type StatusFilter = 'all' | 'active' | 'inactive';
export type RegionFilter = 'all' | 'north' | 'south' | 'west';
export type CustomerFilters = { status: StatusFilter; region: RegionFilter; search: string };

export const DEFAULT_FILTERS: CustomerFilters = {
  status: 'all',
  region: 'all',
  search: '',
};

export function parseFilters(search: string): CustomerFilters {
  const params = new URLSearchParams(search);
  const rawStatus = params.get('status');
  const rawRegion = params.get('region');
  return {
    status: rawStatus === 'active' || rawStatus === 'inactive' ? rawStatus : 'all',
    region: rawRegion === 'north' || rawRegion === 'south' || rawRegion === 'west' ? rawRegion : 'all',
    search: params.get('q') ?? '',
  };
}

export function serializeFilters(filters: CustomerFilters): string {
  const params = new URLSearchParams();
  if (filters.status !== 'all') params.set('status', filters.status);
  if (filters.region !== 'all') params.set('region', filters.region);
  if (filters.search.trim()) params.set('q', filters.search.trim());
  const value = params.toString();
  return value ? `?${value}` : '';
}

export function filterCustomers(customers: readonly Customer[], filters: CustomerFilters): Customer[] {
  const needle = filters.search.trim().toLowerCase();
  return customers.filter(customer =>
    (filters.status === 'all' || customer.status === filters.status) &&
    (filters.region === 'all' || customer.region === filters.region) &&
    (!needle || customer.name.toLowerCase().includes(needle) || customer.email.toLowerCase().includes(needle))
  );
}
