# Task: Build the "showcase" feature section (Emberfall landing page)

## Goal
Replace the existing 3-column text-only feature grid (numbered 01/02/03 cards) with an alternating image + text showcase section, using real product images instead of plain text cards.

## Images
Three images, already saved in `images/` alongside the HTML file:
- `images/story-greenhouse.jpg` — dramatic character action scene (a rogue climbing through a glass greenhouse)
- `images/maps-battlemap.jpg` — top-down VTT battle map of an airship interior
- `images/prep-tokens.jpg` — a set of illustrated NPC character token portraits

Each image maps to one of the three existing feature copy blocks:
1. Greenhouse image → "A story worth telling"
2. Battlemap image → "Maps ready to drop in"
3. Character tokens image → "Prep in one sitting"

## Layout
Three full-width rows stacked vertically (NOT a 3-column grid). Each row is a 2-column layout: one large image, one text block (eyebrow number + heading + paragraph). Rows alternate which side the image is on:
- Row 1: image left, text right
- Row 2: text left, image right (reversed)
- Row 3: image left, text right (back to normal)

On mobile (below ~860px), collapse to a single column — image on top, text below — for every row, regardless of which way it was reversed on desktop.

## Image treatment
- Each image sits in a fixed-height container (420px desktop, 260px mobile), using `object-fit: cover` so differently-shaped source images (wide cinematic, tall portrait map, wide character grid) all render at a consistent height without pre-cropping the source files.
- Rounded corners (10px) and a thin 1px border matching the site's existing `--line` color token, consistent with other card-style elements on the page.
- **Open decision, needs a look before finalizing:** the battlemap image is tall/detailed and `object-fit: cover` at a fixed height crops into it significantly. Try different `object-position` values (`top`, `center 30%`, `center`, `bottom`) and pick whichever keeps the most important part of the map visible — center (the default) currently loses both the bow and the aft sections. This is a one-line tweak once decided (add `object-position` to that specific `<img>`, or a dedicated class), not a structural change.

## Design tokens to reuse (already defined in the file's `:root`)
`--ink`, `--ink-raised`, `--paper`, `--paper-dim`, `--gold`, `--line` — don't introduce new colors, reuse these.

## Existing copy (keep as-is, just restyled/repositioned)
1. **01 — A story worth telling**: "Every adventure opens with a hook strong enough to pull your party in during session zero, and builds to a finale players will bring up months later."
2. **02 — Maps ready to drop in**: "Battle maps and location art sized for VTTs like Roll20 and Foundry, plus print-ready versions for tables that still roll physical dice."
3. **03 — Prep in one sitting**: "A clear running guide, key NPCs, and stat blocks laid out so you can read it once over coffee and run it with confidence that night."

## Why this layout (context, not instructions)
The site's overall direction is "clean and modern with restraint, fantasy warmth added through art rather than decoration." A uniform 3-column grid with cropped thumbnails was considered and rejected — it would force three very differently-shaped images into identical small boxes, weakening exactly the images (especially the battlemap) that are meant to demonstrate product quality. The alternating full-width rows let each image show at a size and shape closer to its natural proportions.
