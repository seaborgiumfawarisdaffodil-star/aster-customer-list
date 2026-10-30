import { describe, expect, it } from 'vitest';
import { CUSTOMERS } from '../src/data/customers';
import { DEFAULT_FILTERS, filterCustomers, parseFilters, serializeFilters } from '../src/data/filters';

describe('customer fixtures and request utilities', () => {
  it('contains ten unique synthetic customers', () => {
    expect(CUSTOMERS).toHaveLength(10);
    expect(new Set(CUSTOMERS.map(row => row.id)).size).toBe(10);
  });

  it('filters active customers in the north', () => {
    const rows = filterCustomers(CUSTOMERS, { status: 'active', region: 'north', search: '' });
    expect(rows.map(row => row.name)).toEqual(['Avery Stone', 'Noah Patel', 'Hana Lee']);
  });

  it('serializes filters using the documented parameter names', () => {
    const query = serializeFilters({ status: 'active', region: 'north', search: 'Avery' });
    expect(query).toBe('?status=active&region=north&q=Avery');
  });

  it('parses absent and unknown filter values safely', () => {
    expect(parseFilters('')).toEqual(DEFAULT_FILTERS);
    expect(parseFilters('?status=unknown&region=moon&q=Noah')).toEqual({ ...DEFAULT_FILTERS, search: 'Noah' });
  });
});
