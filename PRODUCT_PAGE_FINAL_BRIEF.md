# Task: Build the adventure product page (Emberfall)

This supersedes any earlier product-page brief — this is the finalized structure and design direction after several rounds of iteration and comparison. Build against this document.

## Goal
One reusable template page (`adventure.html`) driven by a data file, NOT one HTML file per adventure. Adding a new adventure later means adding an entry to `data/products.json` — no new page, no duplicated markup.

## Layout direction: "Gallery Forward"
Several full layout concepts were mocked up and compared (a cinematic full-bleed hero version, an editorial two-column e-commerce-style version, this gallery-forward version, and a compact spec-sheet version). **Gallery Forward was chosen deliberately** because the site's real differentiator is the quality of its art/maps, and this layout treats the visuals as the actual pitch rather than supporting material next to a wall of text — consistent with the site's overall "cinematic, atmospheric" positioning rather than a generic e-commerce look.

## Page structure, top to bottom

1. **Nav + footer** — same as homepage, copy as-is.

2. **Opening gallery** — an asymmetric image grid immediately at the top of the page (no big text hero above it): one large image, two smaller stacked beside it. This is the adventure's own key art/map, not generic brand imagery.

3. **Info bar** — sits directly below the gallery: genre tag (small monochrome gold pill — same style as the homepage adventure cards, NOT color-coded per genre) + title on the left, price + "Buy" button on the right.

4. **Two-column details row**: "The Setup" (synopsis/hook text) on the left, "What's Included" (bullet list — PDF, maps, tokens, print version, etc.) on the right.

5. **"Scenes From the Story"** — a full-width strip of 4 images in a row. Pure atmosphere-building, proof of production quality.

6. **Cinematic breather band** — one full-width image with a pull-quote overlaid in the center (e.g. an in-character line hinting at the plot). A pacing device between the reference content above and the cast section below — not meant to carry information, just mood.

7. **"Cast of Characters"** — a grid of circular character portraits (echoing the circular style of the existing character-token art elsewhere on the site) with name + role captions underneath each (e.g. "Suspect," "Victim," "Crew," "Detective").

## Persistent buy CTA (device-specific — this took a few iterations, build it exactly this way)
A single sticky "buy" bar existed first as a bottom-fixed bar everywhere, but that's a poor fit for desktop (a bar fixed to the bottom of a wide screen reads more like a cookie-consent banner than a helpful CTA — bottom-fixed bars are a mobile-native pattern, not a desktop one). The resolved behavior:

- **Mobile (≤860px):** a bar fixed to the **bottom** of the viewport, visible from page load, no scroll logic needed. Standard mobile-commerce pattern (thumb-reach).
- **Desktop (≥861px):** a bar fixed to the **top** of the viewport, hidden by default, that fades in (`transform: translateY` + `transition`) only once the user scrolls past the original buy button in the info bar. This reuses the exact same scroll-triggered reveal technique already built for the homepage nav (toggling a `.visible`/`.scrolled` class via a `scroll` event listener checking `getBoundingClientRect()`), so it's consistent with an existing pattern rather than a new one.
- Both bars share identical content (title, price, button) — pure CSS `@media` queries decide which one is actually visible at a given width. Don't build two different components; build one bar's content, styled two ways.
- Remember: on desktop, the fixed bottom bar must be `display: none` (and don't reserve padding for it), and vice versa on mobile for the top bar — otherwise both could theoretically render.

## Images: use placeholder gradients for now
Every image slot (opening gallery, scene strip, breather band, cast portraits) should be a labeled placeholder — a CSS gradient block with a small low-opacity gold caption label (e.g. "Cover image," "Scene," "Suspect") — NOT broken image icons or lorem-picsum-style stock photos. This makes the structure easy to evaluate now and easy to swap for real art later without guessing which block is which. A few different muted gradient tones (warm amber, cool blue-gray, moss green, plum) can be used across different placeholder slots just for visual variety while reviewing layout — not meaningful, swap freely.

## Data file: `data/products.json`
Keyed by URL-safe slug. First real entry (some fields marked PLACEHOLDER need real content filled in by hand — do not invent specifics like page count or exact level range):

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
    "quote": "PLACEHOLDER — an in-character pull-quote for the breather band, e.g. a suspicious line from a suspect.",
    "whatsIncluded": [
      "PLACEHOLDER — e.g. Full adventure PDF",
      "PLACEHOLDER — e.g. VTT-ready battle maps (Roll20/Foundry)",
      "PLACEHOLDER — e.g. Character token sheet",
      "PLACEHOLDER — e.g. Print-ready version"
    ],
    "images": {
      "gallery": ["images/maps-battlemap.jpg", "images/prep-tokens.jpg"],
      "sceneStrip": [],
      "breatherBand": "",
      "cast": []
    }
  }
}
```
Note: this product (Murder on the Aurora Dawn) was originally developed and crowdfunded via a Kickstarter campaign — that is background context only. **Nothing about Kickstarter, backers, or the campaign itself appears anywhere on the product page or in this data.** The page and JSON contain only product information (title, genre, synopsis, what's included, price, etc.), framed purely as something being sold on this site now.

## `adventure.html` + `js/product-loader.js`
Same approach as before: read an `id` from the URL query string (`adventure.html?id=murder-on-the-aurora-dawn`), fetch `products.json`, look up that id, and write the matching fields into the page. Show a simple "adventure not found" fallback if the id doesn't match anything.

## Design tokens to reuse (already defined in the homepage file's `:root`)
`--ink`, `--ink-raised`, `--ink-raised-2`, `--paper`, `--paper-dim`, `--paper-dimmer`, `--gold`, `--gold-bright`, `--line`. Bebas Neue for headings, Inter for body. Don't introduce new colors or fonts.

## Explicitly decided against (don't reintroduce)
- Color-coded genre tags per genre — stay monochrome gold, matching the homepage cards.
- A bottom-fixed buy bar on desktop — top bar with scroll-triggered reveal instead (see above).
- Treating this as a Kickstarter/crowdfunding page — it isn't; see note above.

## This is intentionally the "headless commerce" pattern
`products.json` is a deliberate stand-in for a future live API call (Lemon Squeezy or similar was the direction discussed) — structure the data-fetching logic so that swap stays plausible later, but don't build any actual payment/API integration now.

## Testing note
`fetch()` for local JSON is blocked under the `file://` protocol in most browsers — this needs to be tested through the Live Server VS Code extension (serves over `http://`), not by double-clicking the HTML file.
