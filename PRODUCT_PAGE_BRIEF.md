# Task: Build a single reusable adventure product page, driven by a data file

## Goal
Instead of one HTML file per adventure, build ONE template page (`adventure.html`) that reads product data from a JSON file and renders it dynamically. Adding a new adventure later should mean adding a new entry to the JSON — not creating a new HTML file or duplicating markup.

## Files to create

1. **`data/products.json`** — one object per adventure, keyed by a URL-safe slug. Seed it with this real first entry (some fields are marked PLACEHOLDER — real Kickstarter campaign copy wasn't available to pull automatically, so these need the actual text/numbers filled in by hand later, not invented):

```json
{
  "murder-on-the-aurora-dawn": {
    "title": "Murder on the Aurora Dawn",
    "genre": "Mystery",
    "tagline": "A steampunk murder mystery adventure for 5th Edition",
    "price": 14,
    "levelRange": "PLACEHOLDER — e.g. 3–5",
    "partySize": "PLACEHOLDER — e.g. 4–6 players",
    "sessionLength": "PLACEHOLDER — e.g. 4hr session",
    "hook": "PLACEHOLDER — 2-3 sentence synopsis of the murder mystery setup aboard the airship Aurora Dawn.",
    "whatsIncluded": [
      "PLACEHOLDER — e.g. Full adventure PDF",
      "PLACEHOLDER — e.g. VTT-ready battle maps (Roll20/Foundry)",
      "PLACEHOLDER — e.g. Character token sheet",
      "PLACEHOLDER — e.g. Print-ready version"
    ],
    "images": [
      "images/maps-battlemap.jpg",
      "images/prep-tokens.jpg"
    ]
  }
}
```

2. **`adventure.html`** — the template page. Structure/sections needed:
   - Nav + footer (same as homepage — copy as-is for now)
   - Hero: adventure title, genre tag (reuse the same monochrome gold pill style from the homepage cards), tagline/hook, price, prominent "Buy" button
   - Image gallery: loop through the `images` array and render each
   - "What's included" section: render the `whatsIncluded` array as a list
   - Practical details row: levelRange, partySize, sessionLength (this is where session length belongs — see note below)
   - A second "Buy" button/CTA near the bottom

3. **`js/product-loader.js`** — small script that:
   - Reads an `id` from the URL query string (e.g. `adventure.html?id=murder-on-the-aurora-dawn`)
   - Fetches `data/products.json`
   - Looks up that id, and writes the matching fields into the page's placeholder elements (by `id` or `data-field` attributes — pick whichever pattern is cleaner given the existing code style)
   - If the id doesn't match anything in the JSON, show a simple "adventure not found" fallback rather than a blank/broken page

## Design tokens to reuse
Same as the rest of the site — `--ink`, `--ink-raised`, `--paper`, `--paper-dim`, `--gold`, `--line`, Bebas Neue for headings, Inter for body. Don't introduce new colors or fonts.

## Important context/decisions already made (carry these over, don't relitigate)
- **Genre tag styling**: monochrome gold pill, NOT color-coded per genre — matches the homepage card decision.
- **Duration belongs here, not on the homepage card.** It was deliberately dropped from the browsing card (low-variance, doesn't drive the click decision) but belongs on this page, since someone here has already decided they're interested and wants to confirm practical fit.
- **This system is intentionally the "headless commerce" pattern discussed earlier** — right now `products.json` is a hand-edited file, but the plan is to eventually swap it for a live Lemon Squeezy (or similar) API call instead, keeping this same template. Structure the data-fetching logic so that swap is plausible later (i.e. don't hardcode JSON-specific assumptions any deeper into the template than necessary) — but don't build any actual API integration now, that's a future step.

## Testing note
Once built, this needs a local server to test properly (not just double-clicking the HTML file) because `fetch()` for local JSON files is blocked under the `file://` protocol in most browsers. Use the existing Live Server VS Code extension already set up for this project — that serves files over `http://`, which resolves the issue.
