# Task: Build a dedicated "All Adventures" page with search + genre filtering

## Goal
A new page, `adventures.html`, that lists every adventure from `data/products.json` (not just the 2-3 featured on the homepage), with a search box and genre filter so visitors can narrow down the list. This is a browsing/catalog page — the homepage's existing "Featured Adventures" section stays as-is, this is additive.

## Data source
Read `data/products.json` the same way `adventure.html` already does (same `fetch()` pattern as `js/product-loader.js`) — but instead of looking up a single `id` from the URL, loop over **every** entry in the file and render one card per adventure.

## Reuse existing markup/styling — don't invent a new card design
Each adventure should render using the **exact same card structure and CSS classes already used** on the homepage's Featured Adventures grid: `.adventure-card`, `.adventure-thumb`, `.genre-tag`, `.adventure-body`, `.adventure-row`, `.adventure-level` (with the level-range icon SVG). Generate this markup dynamically in JS from the JSON data, using the same field names `adventure.html` already reads (title, genre, price, levelRange, image/thumbnail, short description). Do not create a second, different-looking card style — the whole point is visual consistency with what's already on the homepage.

## New UI: search + filter bar
Add this above the results grid:

1. **Search input** — filters live as the user types (no submit button/page reload). Match against adventure title (and description, if easy to include) case-insensitively.
2. **Genre filter pills** — a row of buttons: "All" plus one pill per *unique* genre value found across all entries in `products.json` (don't hardcode a genre list — derive it from the actual data, so it stays correct as new adventures/genres get added later). Single-select: clicking a pill filters the grid to just that genre and visually marks it active; clicking "All" clears the genre filter. Style: reuse the same monochrome gold pill styling as `.genre-tag` already uses elsewhere (border + text in `--gold`, not filled solid) — active/selected state can invert to a filled gold background, similar to how `.btn-cta` looks elsewhere on the site.
3. Search and genre filter should combine (both apply at once, not one-or-the-other).

## Empty state
If the combined filters produce zero results, show a simple message in place of the grid (e.g. "No adventures match your search — try a different genre or search term.") instead of just leaving a blank space.

## Result count (nice-to-have, not required)
A small line like "Showing 4 of 6 adventures" above the grid, updating live as filters change. Skip this if it adds meaningful complexity — the search/filter/empty-state above are the actual requirements.

## Page structure
Same nav + footer as the rest of the site (copy from `index.html` or `adventure.html` as-is). Below the nav: a simple page header (e.g. "All Adventures" heading, one line of supporting text), then the search/filter bar, then the results grid.

## Nav update
On every page (`index.html`, `adventure.html`, and the new `adventures.html`), update the nav's "Adventures" link from `href="#adventures"` to `href="adventures.html"`, so it now points to this new dedicated page instead of scrolling to the homepage's featured section. Leave the homepage's Featured Adventures section itself untouched — just repoint where the nav link sends people.

## Design tokens
Reuse the site's existing CSS custom properties (`--ink`, `--ink-raised`, `--paper`, `--paper-dim`, `--gold`, `--line`, etc.) and whatever font is currently loaded (Barlow) — don't introduce new colors or fonts for this page.

## Out of scope for this task
Level-range filtering, sorting (by price/newest/etc.), and pagination are NOT required for this pass — genre + search covers the current small catalog size. Flag these as sensible future additions if the catalog grows, but don't build them now.
