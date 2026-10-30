import { useCallback, useState } from 'react';
import { DEFAULT_FILTERS, serializeFilters, type CustomerFilters } from '../data/filters';

export function useCustomerFilters() {
  const [filters, setFilters] = useState<CustomerFilters>(DEFAULT_FILTERS);

  const updateFilters = useCallback((patch: Partial<CustomerFilters>) => {
    const next = { ...filters, ...patch };
    const newUrl = `${window.location.pathname}${serializeFilters(next)}${window.location.hash}`;
    window.history.pushState({ filters: next }, '', newUrl);
    setFilters(next);
  }, [filters]);

  const clearFilters = useCallback(() => {
    updateFilters({ status: 'all', region: 'all' });
  }, [updateFilters]);

  return { filters, updateFilters, clearFilters };
}
