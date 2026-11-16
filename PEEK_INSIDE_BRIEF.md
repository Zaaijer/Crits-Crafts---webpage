# Task: Add a "Peek Inside" flipbook preview section to the adventure page

## Goal
Let visitors read a few real pages of the module on the product page, so they can judge the layout and writing quality before buying. The preview is a hosted flipbook (Heyzine) shown through an embed (iframe). The section is data-driven like the rest of `adventure.html`: it appears only for adventures that have a preview URL in `data/products.json`.

## What the user is doing separately (not part of this task)
The user exports a short preview PDF (only the pages meant to be public), uploads it to Heyzine, turns off download/print options in Heyzine's settings, and gives you the embed URL. Do not try to create the flipbook or the PDF. If the URL is not available yet, build the section so it simply stays hidden.

## Data: new fields in `data/products.json`
Add to each adventure object. Leave empty or omit for adventures without a preview.

```json
"previewEmbedUrl": "",
"previewNote": ""
```

- `previewEmbedUrl`: the URL Heyzine provides for the iframe `src`. Empty or missing means the whole section is not rendered.
- `previewNote` (optional): a short muted line shown under the embed, e.g. "+ 24 more pages in the full module". Skip the line if empty.

Wire both into `js/product-loader.js` the same way the other spotlight fields work. This is additive to the existing pattern, not a new system.

## Placement
Directly after the "Colorful NPCs" spotlight section and before the footer. Reasoning: the spotlights tease the content, and the preview is the strongest proof of quality, so it works best as the closing section once interest is highest. The sticky buy bar is still present at that point. This placement is easy to move later, so keep the section self-contained.

## Section design
Follow the site's established pattern: **one small gold eyebrow, one true bold heading, never two competing headings.**

1. Eyebrow (static text, same on every adventure): "Peek Inside"
2. Bold heading (static text, draft copy, the user may edit): "Read the First Pages"
3. One line of subtitle (static, draft copy): "See the layout, the read-aloud text, and the maps before you buy."
4. The small divider ornament used in the spotlight sections (two short gold line segments with a gap, a short stem, a small filled dot). Reuse the existing markup, do not redraw it.
5. The embed, contained within the standard `.wrap` max-width (not full-bleed; the opening gallery was deliberately reverted from full-bleed to contained, and this should match).
6. The optional `previewNote` below the embed, small and muted, same style as the "+ N more" lines in the spotlight sections.

Centered text for items 1 to 4, matching the Locations and Maps spotlights.

## The embed itself
- Use an `<iframe>` with the Heyzine URL as `src`, `allowfullscreen`, a descriptive `title` attribute (e.g. "Preview pages of [adventure title]") for accessibility, and `loading="lazy"` so it does not slow the initial page load.
- Wrap it in a responsive container with `aspect-ratio` (not a fixed pixel height), rounded corners and a 1px `--line` border, matching the card treatment used elsewhere.
- Starting values: about `16 / 10` on desktop (a two-page spread). On mobile (below 860px) use a taller ratio such as `3 / 4`, because flipbooks usually show a single page on narrow screens. These are starting points; check them against the real flipbook and adjust.
- Background behind the iframe: `--ink-raised`, so there is no white flash while it loads.
- The section and its divider must not render at all when `previewEmbedUrl` is empty (no empty gap, no orphan heading).

## Constraints
- Reuse existing design tokens (`--ink`, `--ink-raised`, `--paper`, `--paper-dim`, `--paper-dimmer`, `--gold`, `--line`) and Barlow. No new colors or fonts.
- Do not touch any other section, the sticky buy bar, or the nav.
- Do not add any analytics or tracking code.
- Cookies and consent: the site gates its tracking behind cookie consent. Heyzine's embed may set its own cookies. Do not decide this silently. After building, check what the embed loads (browser dev tools, Network and Application tabs) and report what you find, so the user can decide whether the embed needs to wait for consent.
- Keep it testable through Live Server (`fetch()` for the JSON does not work on `file://`).

## Testing checklist
- Section appears for an adventure with a `previewEmbedUrl`, and is fully absent for one without.
- Looks right at desktop width and below 860px.
- The iframe is lazy-loaded (not requested until near the viewport).
- The sticky buy bar still behaves as before.
- Report anything about the embed that needs a user decision (cookies, sizing, branding visible in the viewer).
