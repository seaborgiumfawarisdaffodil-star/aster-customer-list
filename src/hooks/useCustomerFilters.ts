import { useCallback, useState, useEffect } from "react";
import {
  DEFAULT_FILTERS,
  parseFilters,
  serializeFilters,
  type CustomerFilters,
} from "../data/filters";

export function useCustomerFilters() {
  const [filters, setFilters] = useState<CustomerFilters>(() =>
    parseFilters(window.location.search),
  );

  useEffect(() => {
    const sync = () => setFilters(parseFilters(window.location.search));
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const updateFilters = useCallback(
    (patch: Partial<CustomerFilters>) => {
      const next = { ...filters, ...patch };
      const newUrl = `${window.location.pathname}${serializeFilters(next)}${window.location.hash}`;
      window.history.pushState({ filters: next }, "", newUrl);
      setFilters(next);
    },
    [filters],
  );

  const clearFilters = useCallback(() => {
    updateFilters(DEFAULT_FILTERS);
  }, [updateFilters]);

  return { filters, updateFilters, clearFilters };
}
