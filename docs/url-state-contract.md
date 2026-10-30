# Aster Customer Directory — URL-state contract v1.0

## Purpose
The URL is a shareable representation of the customer-list view. A pasted, refreshed, or navigated URL must reproduce the same filter controls, API request parameters and customer rows.

## Accepted query parameters
| Parameter | Accepted values | Default |
|---|---|---|
| `status` | `active`, `inactive` | `all` (omitted) |
| `region` | `north`, `south`, `west` | `all` (omitted) |
| `q` | free-text search of name/email | empty (omitted) |

Unknown status and region values default to `all`; unknown query parameters are ignored. No real records or sensitive values are used.

## Core requirements
1. **Direct link:** On first render from `?status=active&region=north`, controls show Active/North, request uses those two filters, and table shows exactly Avery Stone, Noah Patel and Hana Lee (3 rows).
2. **Refresh:** Reloading the filtered link preserves the same controls, request and rows.
3. **Browser Back:** Each explicit filter selection creates a navigable history state. Browser Back restores the previous query parameters, filter controls, request and result rows. Forward works symmetrically.
4. **Clear filters:** Clear resets status to All, region to All and search to empty; removes `status`, `region`, and `q` query parameters; request returns all 10 synthetic customers.
5. **Synchronization:** Browser URL, filter controls, synthetic API request query, and displayed records must agree after any of the above actions. No route or public API contract may change.

## Out of scope
Production data; server-side persistence; authentication; distribution; query debouncing or performance tuning; unrelated UI redesign.

## Verification
Baseline tests cover fixtures and query serialization only. Regression coverage must be created for direct-link loading, refresh, Back and clearing all filters. Verify behavior manually in Brave and via functional tests, then run TypeScript checks.
