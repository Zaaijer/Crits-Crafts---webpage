# Task: Restructure adventure.html — remove old sections, add Locations/Maps/NPCs

## Goal
Significantly simplify and refocus the product page. Keep the top of the page as-is, replace everything below "What's Included" with three new spotlight sections, and remove everything else except the footer.

## New page structure, top to bottom
1. Nav (unchanged)
2. Back link ("← All Adventures") (unchanged)
3. Opening gallery (unchanged)
4. Info bar — genre pill, title, price, Buy Now button (unchanged)
5. Details row — "The Setup" (synopsis) + "What's Included" (bullet list) (unchanged)
6. **NEW — Striking Locations** (see spec below)
7. **NEW — Maps Worth Exploring** (see spec below)
8. **NEW — Colorful NPCs** (see spec below)
9. Footer (unchanged)

## Remove entirely
- "Scenes From the Story" (the 4-image strip)
- The cinematic breather band + pull-quote
- The full "Cast of Characters" grid
These are being replaced by the three new spotlight sections, which do a more effective, more curated version of the same job (proof of quality + intrigue) with far less scroll for far more impact.

## Keep as-is, not part of this change
- The persistent sticky buy bar (bottom on mobile, top-on-scroll on desktop) — this is functional UI tied to the Buy Now button, not decorative content, so it isn't part of the "remove everything else" instruction. Flag to the user if this assumption is wrong.
- The dark background stays dark for the ENTIRE page, including these new sections — no light/cream section anywhere on this page. (This was a deliberate decision: the cream "About" section on the homepage works because it's a genuine tonal break — brand philosophy, not adventure content. The product page has no equivalent break; every section here is in service of selling this one adventure, so staying immersive in the dark theme throughout serves that goal better than introducing contrast for its own sake.)

---

## New section 1: Striking Locations

Full-width image, single centered composition (not a grid — one featured location only, not all of them).

- Background: the location's image, with a radial vignette overlay (darker toward the edges, lighter toward center) so text stays legible without needing a hard top/bottom gradient — text sits centered in the middle of the frame, not anchored to an edge.
- Centered content, all wrapped as one visually cohesive group (title + subtitle + divider), vertically and horizontally centered as a unit within the frame:
  1. Small eyebrow label, uppercase, gold, letter-spaced: "Striking Locations" (static text, same on every adventure page — NOT pulled from product data)
  2. Bold heading (this one IS pulled from product data): the specific location's name, e.g. "The Grand Dining Hall"
  3. One-line subtitle/description below that, e.g. "Where the body is found — and where alibis start to crack."
  4. A small divider ornament directly below the subtitle, snug (minimal gap) — NOT the full rapier divider used elsewhere on the site. This is a smaller, simpler ornament: two short thin gold horizontal line segments with a gap between them, a short vertical stem dropping from the gap's center, ending in a small filled dot. Purely decorative, sits close beneath the text like a graphic underline.
- Below the image frame (outside it, small and muted): a "+N more locations inside" line, e.g. "+ 5 more locations inside" — the number should come from product data (count of total locations minus the one featured).

## New section 2: Maps Worth Exploring

Structurally identical to Striking Locations above — same centered composition, same eyebrow-label-then-heading-then-subtitle-then-divider pattern, same "+N more" line beneath. Only the content differs:
- Eyebrow label (static): "Maps Worth Exploring"
- Heading (from product data): the featured map's name, e.g. "Full Deck Battle Map"
- Subtitle (from product data): e.g. "VTT-ready and print-ready, gridded for combat and roleplay alike."
- "+N more maps included" line beneath.

## New section 3: Colorful NPCs

Different layout from the two above — two-column, not full-width/centered.

- **Left column**: the character's portrait "breaking out of" a frame — a smaller rounded rectangle panel sits behind/around the character art, and the character image itself extends slightly above and past the top edge of that panel, creating a layered, dimensional effect rather than the character being cropped flush inside a box. This requires the character art to have a transparent background around the figure (a proper cutout), not a plain rectangular photo — otherwise there's no edge for it to visually "break."
- **Right column**: text centered within its own column (not left-aligned against the image) — same eyebrow/heading/subtitle/divider pattern as the other two sections:
  1. Eyebrow label (static): "Colorful NPCs"
  2. Bold heading (from product data): the character's name, e.g. "Countess Vaerith"
  3. Subtitle (from product data): an intriguing one-liner, NOT a plain description — e.g. "Everyone at dinner saw her leave the room. Only one saw her come back." Should hint at drama/stakes without giving anything away.
  4. Same small divider ornament as the other two sections, directly beneath the subtitle.
- Below the two-column block: a "+N more suspects to meet" line, centered, in the same small/muted style as the other two sections' "+N more" lines.

---

## New products.json fields needed
Each adventure needs three new objects added (exact key names below, adjust only if they conflict with existing naming conventions already in the file):

```json
"locationsSpotlight": {
  "name": "The Grand Dining Hall",
  "description": "Where the body is found — and where alibis start to crack.",
  "image": "images/...",
  "moreCount": 5
},
"mapsSpotlight": {
  "name": "Full Deck Battle Map",
  "description": "VTT-ready and print-ready, gridded for combat and roleplay alike.",
  "image": "images/...",
  "moreCount": 3
},
"npcSpotlight": {
  "name": "Countess Vaerith",
  "description": "Everyone at dinner saw her leave the room. Only one saw her come back.",
  "image": "images/...",
  "moreCount": 6
}
```

Wire these into `js/product-loader.js` the same way the rest of the page's data-driven content already works — this is additive to the existing pattern, not a new system.

## Design tokens / fonts
Reuse existing tokens (`--ink`, `--paper`, `--gold`, `--line`, etc.) and Barlow. No new colors or fonts.
