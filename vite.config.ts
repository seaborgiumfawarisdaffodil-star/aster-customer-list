import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { parseFilters, filterCustomers } from './src/data/filters';
import { CUSTOMERS } from './src/data/customers';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'aster-synthetic-customer-api',
      configureServer(server) {
        server.middlewares.use('/api/customers', (req, res) => {
          const url = new URL(req.url ?? '/', 'http://127.0.0.1');
          const filters = parseFilters(url.search);
          const records = filterCustomers(CUSTOMERS, filters);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.setHeader('Cache-Control', 'no-store');
          res.end(JSON.stringify({ records, appliedFilters: filters, total: records.length }));
        });
      },
    },
  ],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    clearMocks: true,
  },
});
