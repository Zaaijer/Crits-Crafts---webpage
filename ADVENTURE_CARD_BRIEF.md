# Task: Update the "Featured Adventures" card design (Emberfall landing page)

## Goal
Replace the current placeholder adventure cards (flat gradient image, title, price, description, "Levels X–Y · Nhr session" text line) with a revised card design. This only affects the `.adventure-card` markup/styles in the `.adventures` section — no other section changes.

## What's changing on each card

1. **Add a genre/tone tag**, shown as a small pill sitting directly on the image (top-left), e.g. "Heist," "Horror," "Political Intrigue," "Mystery." This is meant to be the fastest-scanning piece of information on the card — genre/tone is what actually helps a DM decide if they're interested, more than level range or duration does.
   - Style: uppercase, small (~10.5px), gold text and border, semi-transparent dark background (`rgba(12,12,13,0.55)`) with a light blur, pill-shaped (`border-radius: 100px`).
   - **Keep it monochrome gold across all genres — do NOT color-code by genre.** The site uses one accent color deliberately; a different color per genre tag would break that and hasn't been decided as a direction.

2. **Drop session duration from the card entirely.** Reasoning: duration is low-variance (most one-shots cluster in a similar 3–5hr band) and doesn't help decide *whether* to click — it's confirming-fit info, not decision-driving info. It can live on the product detail page instead, not here.

3. **Keep level range** (e.g. "Levels 3–5") as a small secondary stat below the description, with a small line-icon next to it (a thin compass/star-shaped icon, matching the gold linework style used elsewhere on the page — e.g. the divider ornament). This is a real fit constraint, unlike duration, so it stays.

4. **Keep price visible on the card** (not hidden behind a click-through). Decided deliberately: at this price point ($12–16 range), hiding price adds friction without adding intrigue, and showing it pre-qualifies clicks. Standard pattern for this category of product (compare Steam/itch.io/Gumroad grids).

5. **Card interaction**: on hover, lift slightly (`translateY(-5px)`) with a soft shadow and the border tinting toward gold (`rgba(217,164,65,0.35)`) — consistent with hover treatment used on other cards across the site.

## Explicitly decided AGAINST (don't add these)
- **No taller/"featured" middle card** unless it's paired with an explicit label like "Staff Pick" or "New This Week." An unlabeled taller card implies a recommendation that isn't real, and since this is a rotating shelf, an arbitrary middle slot doesn't reliably map to anything worth highlighting. If a genuinely featured/staff-pick adventure exists later, that's a distinct, explicitly-labeled treatment — not a default layout rule.
- **No color-coded genre tags** — see above, stay monochrome gold.

## Design tokens to reuse (already defined in the file's `:root`)
`--ink`, `--ink-raised`, `--paper`, `--paper-dim`, `--paper-dimmer`, `--gold`, `--line` — don't introduce new colors.

## Open item (not yet decided, flag if relevant)
Whether the genre/tone tags come from a fixed, defined list (e.g. a set taxonomy: Heist, Horror, Mystery, Political Intrigue, Dungeon Crawl...) or are freeform per-adventure text. This matters if genre-based filtering/browsing is ever added later, but hasn't been decided yet — treat tags as freeform text for now unless told otherwise.
