import { serializeFilters, type CustomerFilters } from '../data/filters';
import type { Customer } from '../data/customers';

export type CustomerResponse = { records: Customer[]; appliedFilters: CustomerFilters; total: number };

export async function requestCustomers(filters: CustomerFilters, signal?: AbortSignal) {
  const url = `/api/customers${serializeFilters(filters)}`;
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`Customer request failed: ${response.status}`);
  const body = await response.json() as CustomerResponse;
  return { url, ...body };
}
