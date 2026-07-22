# Task: Restructure the Setup/Included section + introduce two new components (Adventure Profile, Pacing Bar)

## Context
This changes the section of `adventure.html` currently marked `<!-- Two-column: The Setup (synopsis) on the left, What's Included (bullet list) on the right -->` (the `.details-row` section, sitting between the info bar and the "Striking Locations" spotlight section). Two new components are being introduced here for the first time — full specs for both are below, since neither exists in the codebase yet.

## New structure (replaces the current `.details-row`)

**Row 1 — two columns:**
- **Left column**: "The Setup" (unchanged — heading + synopsis, same as now) with the new **Pacing Bar** component directly beneath it, stacked in the same column.
- **Right column**: the new **Adventure Profile** card, alone — nothing else in this column.

**Row 2 — full width, beneath both columns above:**
- "What's Included" (unchanged content — heading + checklist), but now spanning the full width of the page instead of sitting in the narrow right column.

## Important: composition and alignment matter here — read this before implementing
This section previously worked fine because both columns held similar, single, self-contained blocks of roughly matching height. That's no longer true: the left column now holds **two stacked elements** (Setup + Pacing Bar) while the right column holds **one** (the Profile card), and their total heights will very likely NOT match. This is a real composition risk — if the shorter column just sits at the top with a large gap of empty space beneath it, or if the two columns' content don't align cleanly at the top edge, the whole section will read as lopsided and unplanned rather than deliberate. Specifically:
- Set the row's `align-items` so both columns start at the same vertical position at the top (don't let one column's content sit vertically centered against the other by default — that's usually the wrong choice here and looks accidental).
- After building it, actually check the rendered result: if the Profile card ends up noticeably shorter than the Setup+Pacing column and leaves a large empty gap beneath it, consider vertically centering the Profile card within the row's full height instead of top-aligning it — use judgment based on how it actually looks once built, not just what the code implies it should do.
- Keep spacing between the Setup text and the Pacing Bar beneath it, and between the row and "What's Included" below it, consistent with existing spacing conventions already used elsewhere on this page (e.g. the gap already used between `.details-row` and the sections around it) — don't introduce new one-off spacing values.

## Component 1: Adventure Profile (new — full spec)

**Purpose**: A small stat-bar card giving a DM a quick sense of what kind of session this adventure will be — how combat-heavy vs. investigation-heavy vs. social it is, roughly how tense/dark the tone is, and how much prep it demands. Inspired by the "adventure profile" cards some published TTRPG modules include, adapted for a DM choosing a group one-shot rather than a solo player.

**Visual structure, top to bottom:**
1. Small eyebrow label, centered, uppercase, gold, letter-spaced: "Adventure Profile" (static text — same on every adventure page, not pulled from product data)
2. A small divider ornament directly beneath the label, centered: two short thin gold horizontal line segments with a gap between them, a short vertical stem dropping from the center of that gap, ending in a small filled dot. (This is the same small divider ornament already used elsewhere on this page — reuse it, don't rebuild it differently.)
3. Five stat rows, each with a text label above a thin horizontal bar:
   - **Investigation**
   - **Social**
   - **Combat**
   - **Tension**
   - **Prep Required**

   Each bar: a full-width track in a muted/dark tone, with a gold fill representing the value, filled from the left. No numeric label needed — the bar length communicates the value. No adventure title/name appears anywhere in this card — it sits directly below the info bar's `<h1>`, which already shows the title, so repeating it here would be redundant.

**Container**: a card with the same background/border treatment as other card-style elements already on the site (`--ink-raised` background, `--line` border, rounded corners) — a single plain border, not a decorated/framed one. (A more heavily decorated version was explored and deliberately rejected as too busy for this element — keep it simple.)

**Data needed in `products.json`** — add a `profile` object per adventure, values 0–100 representing bar fill percentage:
```json
"profile": {
  "investigation": 85,
  "social": 70,
  "combat": 35,
  "tension": 60,
  "prepRequired": 20
}
```
These are per-adventure judgment calls (like writing the synopsis) — for "Murder on the Aurora Dawn," the values above are reasonable placeholders reflecting a mystery-forward, low-combat adventure, but should be reviewed/adjusted for accuracy rather than copied blindly to every future adventure.

## Component 2: Pacing Bar (new — full spec)

**Purpose**: Gives a DM a sense of the adventure's structure and pacing without spoiling the plot — shows the shape of the session, not the outcome.

**Visual structure**: a horizontal row of 4 evenly-spaced beats, connected by a thin horizontal line running behind them. Each beat: a small circular dot (gold outline, dark fill) sitting on the connecting line, with a short label beneath it.

**Content for "Murder on the Aurora Dawn"** (four beats, left to right) — written with some intrigue rather than flat/clinical labels:
1. "Boarding"
2. "The Body"
3. "The Alibis Stop Adding Up" *(revised from the earlier flatter draft "Suspects Narrow" — keep the more voice-driven phrasing, consistent with the site's tone elsewhere, e.g. the NPC spotlight's intrigue-driven subtitle)*
4. "Landfall"

**Data needed in `products.json`** — add a `pacing` array per adventure:
```json
"pacing": ["Boarding", "The Body", "The Alibis Stop Adding Up", "Landfall"]
```
Number of beats may vary per adventure (not always exactly 4) — build this to handle any array length, not hardcoded to 4.

## What's explicitly NOT part of this task
- The Device Mockup (the framed cover-image treatment discussed earlier) is intentionally NOT part of this section. It was considered for this same area but removed in favor of giving the Adventure Profile its own uncrowded column — the Mockup may be used elsewhere on the page later (e.g. the hero/opening area), but that's a separate, not-yet-scoped task. Don't add it here.
- Don't touch anything outside this one section — nav, opening gallery, info bar, Striking Locations/Maps/NPCs sections, and footer are all unchanged.

## Design tokens
Reuse existing tokens (`--ink`, `--ink-raised`, `--paper`, `--paper-dim`, `--gold`, `--line`) and Barlow. No new colors or fonts.
