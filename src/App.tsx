import { useEffect, useState } from 'react';
import { useCustomerFilters } from './hooks/useCustomerFilters';
import { requestCustomers, type CustomerResponse } from './api/customers';
import type { Customer } from './data/customers';
import './style.css';

export default function App() {
  const { filters, updateFilters, clearFilters } = useCustomerFilters();
  const [records, setRecords] = useState<Customer[]>([]);
  const [requestUrl, setRequestUrl] = useState('/api/customers');
  const [appliedFilters, setAppliedFilters] = useState<CustomerResponse['appliedFilters'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');
    requestCustomers(filters, controller.signal)
      .then(result => {
        setRecords(result.records);
        setRequestUrl(result.url);
        setAppliedFilters(result.appliedFilters);
      })
      .catch(cause => {
        if (!controller.signal.aborted) setError(String(cause));
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [filters]);

  return (
    <main className="shell">
      <header className="hero">
        <div><span className="eyebrow">ASTER / SYNTHETIC QA</span><h1>Customer directory</h1><p>Filter customers, share a link, and compare the actual request with the URL.</p></div>
        <div className="hero-pill">LOCAL TEST DATA ONLY</div>
      </header>
      <section className="panel" aria-label="Customer filters">
        <div className="panel-heading"><h2>Customer filters</h2><span>View controls</span></div>
        <div className="filter-row">
          <label>Status<select aria-label="Status" value={filters.status} onChange={e => updateFilters({ status: e.target.value as typeof filters.status })}><option value="all">All statuses</option><option value="active">Active</option><option value="inactive">Inactive</option></select></label>
          <label>Region<select aria-label="Region" value={filters.region} onChange={e => updateFilters({ region: e.target.value as typeof filters.region })}><option value="all">All regions</option><option value="north">North</option><option value="south">South</option><option value="west">West</option></select></label>
          <label>Search<input aria-label="Search customers" value={filters.search} placeholder="Search name or email" onChange={e => updateFilters({ search: e.target.value })}/></label>
          <button type="button" onClick={clearFilters}>Clear filters</button>
        </div>
        <p className="hint">Tip: apply filters, copy the address-bar URL, and open it in a fresh tab.</p>
      </section>
      <section className="panel diagnostics" aria-label="Request inspector">
        <div className="panel-heading"><h2>Request inspector</h2><span>Shows parameters sent to the synthetic API</span></div>
        <div className="diagnostic-grid"><div><span>Last request</span><code data-testid="request-url">{requestUrl}</code></div><div><span>Applied API filters</span><code data-testid="applied-filters">{appliedFilters ? JSON.stringify(appliedFilters) : 'Loading...'}</code></div></div>
      </section>
      <section className="panel table-panel" aria-label="Customer results">
        <div className="panel-heading"><h2>Customer results</h2><span data-testid="record-count">{loading ? 'Loading...' : `${records.length} records`}</span></div>
        {error && <p role="alert">{error}</p>}
        <table><thead><tr><th>Customer ID</th><th>Name</th><th>Email</th><th>Status</th><th>Region</th></tr></thead><tbody>{records.map(record => <tr key={record.id}><td>{record.id}</td><td>{record.name}</td><td>{record.email}</td><td><span className={`status ${record.status}`}>{record.status}</span></td><td>{record.region}</td></tr>)}</tbody></table>
        {!loading && records.length === 0 && !error && <p className="empty">No matching customers</p>}
      </section>
    </main>
  );
}
