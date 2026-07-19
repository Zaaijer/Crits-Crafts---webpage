# Crits & Crafts — Project Brief

## What this is
A landing page to sell digital D&D one-shot adventures (PDFs) to fellow Dungeon Masters. Single-page site so far, hand-coded HTML/CSS/JS (no framework, no build step) — one self-contained `.html` file with embedded `<style>` and `<script>`.

## Who's building it
Solo project by someone with UX design experience but new to coding. Not aiming to become a professional developer — prefers understanding *what* code does over memorizing syntax, and likes changes explained in plain terms (e.g. "this is CSS not JavaScript," "here's why this line goes at the bottom of the file"). Please default to that teaching style rather than terse dev-to-dev shorthand, unless told otherwise.

## Design direction
- **Brand name:** Crits & Crafts
- **Aesthetic:** cinematic and bold (think a AAA game launch page / prestige TV site), with fantasy warmth added — not a "generic tavern/parchment" fantasy look, and not sterile SaaS-clean either. Reference points: a Webflow gaming template called "Player X" (browsed for structural inspiration, not copied — it's a licensed template, not free-to-reuse code) and general Arcane/League of Legends visual language (clean modern layout + one ornate gold flourish).
- **Palette:** near-black background (`--ink: #0C0C0D`), warm off-white text (`--paper: #F2EFE9`), one gold/amber accent (`--gold: #D9A441`) used deliberately (CTA buttons, hover states, dividers) rather than everywhere.
- **Type:** Bebas Neue for headlines/logo (condensed, bold), Inter for body text.
- **UI restraint:** minimal chrome — clean nav, no heavy borders/decoration on cards or buttons. Fantasy character comes through in art direction and one signature ornamental element, not through decorative UI everywhere.

## Structure built so far (single HTML file)
- Sticky nav — transparent over hero art, fades to a solid blurred bar on scroll (vanilla JS `scroll` listener toggling a `.scrolled` class)
- Hero section with background image (real hero art has been added by the user)
- About section (eyebrow label → heading → paragraph → CTA — a pattern pulled from the reference template)
- Three-item feature grid
- Featured adventures product grid (currently placeholder titles/copy/art — real adventure content not yet added)
- Closing CTA band
- Footer
- **Ornamental divider** between every major section: a thin horizontal gold line (split into two segments with a gap, NOT a single continuous line) with a small custom-drawn SVG "rapier" icon centered in the gap — a blade line stopping cleanly at a hollow ring (the guard), a grip line, and a small filled pommel dot below. This was iterated on a lot — keep it minimal, don't add back decorative elements (diamonds, dome arcs, etc.) that were deliberately removed for being "too busy."

## Known technical gotchas already solved (don't reintroduce)
1. **SVG gradients on horizontal lines**: a perfectly horizontal `<line>` has a zero-height bounding box, which can make `objectBoundingBox`-relative gradients fail to render in some browsers. Fix used throughout: `gradientUnits="userSpaceOnUse"` with real coordinate values instead of the default 0–1 range.
2. **Full-width SVG elements and mobile distortion**: any full-width decorative SVG uses CSS `aspect-ratio` (not a fixed `height`) so it scales proportionally at all screen widths instead of stretching unevenly and warping circular/diamond shapes on narrow screens.

## Not yet built / open decisions
- Real adventure product content (titles, descriptions, prices, art) — currently placeholders
- Checkout/commerce: leaning toward Shopify (headless via Storefront API + a digital-downloads app) as the long-term choice, since physical products (e.g. printed adventure books) are a possible future addition; decided against Lemon Squeezy/Gumroad-only for that reason. Not being implemented yet — revisit once real product pages exist.

## Workflow context
- Project is tracked in Git, pushed to GitHub, using a normal add/commit/push loop
- Uses VS Code + Live Server extension for local preview
