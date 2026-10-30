# AST-118 — Shared customer-list URLs do not reproduce the original filtered view

## Observed problem
In the synthetic Aster customer directory, changing Status, Region, or Search updates the address-bar URL and the visible customer results. Opening that copied URL in a new tab can show unfiltered controls and a different API request/result set. A page refresh may also lose the view, Back does not restore filters, and Clear filters can leave the text search active.

## Reproduction
1. Run the local app and open `http://127.0.0.1:4173/`.
2. Set Status to Active and Region to North. Verify 3 rows and an API request with both query parameters.
3. Copy the resulting URL, open a new tab and paste it. Compare address bar, controls, request inspector and table.
4. Refresh, test browser Back after changing a filter, and test Clear filters after entering a search term.

## Acceptance criteria
- Direct shared links restore selected filters and matching request/result rows.
- Refresh preserves the active filter view.
- Back/Forward restores the previous filter view.
- Clear filters removes status, region and search from controls, URL and request.
- Public hook/API shape and existing filtering behavior stay unchanged.
- Add reproducible regression coverage for all four cases.

All data and identifiers are synthetic. No external services or production credentials.
