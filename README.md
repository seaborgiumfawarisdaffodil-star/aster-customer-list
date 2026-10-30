# Aster Customer Directory — Synthetic URL-state Regression

This is a deliberately unresolved React/TypeScript starter for a **recorded investigation**. It contains ten fictional customers and a local Vite middleware API (`/api/customers`) with no real customer data or external services.

## Setup (before recording)
```sh
npm install
npm test
npm run typecheck
npm run dev
```
Open `http://127.0.0.1:4173/` in Brave. `npm test` should start with **four passing baseline tests**. If package installation is not possible, resolve it before the recording.

## Files
- `docs/url-state-contract.md`: expected behavior.
- `github/issue-draft.md`: issue content to use when preparing GitHub off-record.
- `src/hooks/useCustomerFilters.ts`: relevant synchronization implementation.
- `src/data/filters.ts`: pure URL parameter parser/serializer and filtering.
- `src/api/customers.ts`: actual `/api/customers` request.
- `vite.config.ts`: local synthetic API middleware; no external dependencies beyond dev tooling.
- `tests/customer-query.test.ts`: baseline coverage only.

## Warning
The URL-state regression is intentional and **must remain unresolved until recorded**. Do not add the four regression tests or change `useCustomerFilters` while preparing the fixture. Off-record dry runs should be conducted in a disposable clone, not in the exact recording copy.

## Safety
Everything here is fictional, including customer names, `example.test` emails and customer IDs. No credentials, environment secrets or production systems are used.
