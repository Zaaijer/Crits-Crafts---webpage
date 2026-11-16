# Brief: writing content for a new Crits & Crafts adventure page

## Context

Crits & Crafts is a D&D 5E one-shot publisher. Adventure pages on the
site don't each have their own HTML file — there's one shared template,
`adventure.html`, which pulls its content from a single JSON file,
`data/products.json`, keyed by a URL slug (e.g. `?id=murder-on-the-aurora-dawn`
loads the `murder-on-the-aurora-dawn` entry).

**Your job:** write the content for a new entry in that file, for the
adventure you already know everything about. **Don't worry about images**
— those are handled separately and added afterward. Also skip `price` and
`buyLink` — that's store setup, not content.

**Output:** a single JSON object, in the exact shape below, ready to be
pasted in as a new top-level entry. Use a URL-safe slug (lowercase,
hyphens, no spaces) as the key — base it on the adventure's title.

## Voice

Short, punchy, present tense. Sell the premise as a hook, not a
synopsis — the reader should feel the ticking clock, not get a plot
summary. Moody and evocative where the genre calls for it, but never
purple or overwritten. Every short description (location/map/NPC) should
end on a beat of intrigue, not just describe what's there.

## Fields

### `title` (string)
The adventure's full title, exactly as it should display. 2–6 words.
Example: `"Murder on the Aurora Dawn"`.

### `genre` (string)
One word (or very short phrase), shown as a small pill/tag above the
title. Examples so far: `"Mystery"`, `"Horror"`. Pick whatever single
word best categorizes this adventure — doesn't have to match an existing
one.

### `tagline` (string)
One sentence, shown right under the title. Sells the whole adventure in
a single breath. 8–15 words.
Example: `"A steampunk murder mystery adventure for 5th Edition"`.

### `levelRange` (string)
Character level range, formatted exactly like the examples (en dash,
no spaces around it): `"3–5"`, `"1–4"`.

### `partySize` (string)
Format: `"4–6 players"`.

### `sessionLength` (string)
Format: `"3–4hr session"`.

### `hook` (array of strings)
This fills "The Setup" section — the main pitch. **Usually just one
paragraph**, ~60–90 words: set the scene, introduce the inciting
incident, end on the stakes or the clock. Only split into two paragraphs
if the adventure genuinely needs the extra space (this also affects the
page's visual balance against the box art next to it, so default to one
unless there's a real reason for two).
Example: `"When the airship Aurora Dawn is three days from port, one of
its wealthiest passengers turns up dead in a locked stateroom — and the
killer is still aboard. Your party has until the ship docks to sort
suspects from scapegoats, unravel motives tangled in old debts and
older grudges, and catch a murderer before they slip away into the
crowd at landing."`

### `whatsIncluded` (array of strings)
The physical/digital deliverables checklist. **This is usually the
same boilerplate list every time** — only change it if this adventure's
package genuinely differs (e.g. no VTT maps, extra handouts, a
soundtrack that doesn't exist yet). Default list used so far:
```
"Full adventure PDF"
"VTT-ready battle maps (Roll20 & Foundry)"
"Character token sheet"
"Print-ready version"
"Atmospheric music playlist"
"Theater-of-the-Mind location backdrops"
```
If you're not sure whether something differs for this adventure, just
reuse the list above as-is — I'll adjust it if needed.

### `pacing` (array of strings)
The story-beat timeline shown as a row of connected dots. Always 4
short beats (2–4 words each), title case, in order — think "opening →
inciting incident → complication → climax/resolution."
Examples: `["Boarding", "The Body", "The Alibis Stop Adding Up",
"Landfall"]` and `["Arrival", "The Games Begin", "A Child Vanishes",
"Behind the Tents"]`.

### `profile` (object of 5 numbers, 0–100 each)
Five sliders shown as bar-chart rows, describing how the session plays
at the table — not absolute scores, just relative weight. Estimate
these from how the adventure is actually structured:
- `investigation` — how much of play is clue-following/deduction
- `social` — how much is roleplay/negotiation/persuasion
- `combat` — how much is fights/physical danger
- `tension` — how dreadful/high-stakes the mood is, moment to moment
- `prepRequired` — how much work the GM needs to put in beforehand
  (lower = more plug-and-play, higher = more prep-heavy)
These don't need to sum to anything — they're independent sliders.
Example: `{"investigation": 85, "social": 70, "combat": 35, "tension": 60, "prepRequired": 20}`.

### `locationsSpotlight` (object)
One standout location, featured full-width on its own section.
- `name` — short location title, e.g. `"The Grand Dining Hall"`
- `description` — **one line**, 8–15 words, ends on intrigue, e.g.
  `"Where the body is found — and where alibis start to crack."`
- `moreCount` — a number: how many *other* distinct locations exist in
  the full adventure (not counting this spotlighted one). You'll know
  this from the adventure's actual content.
- `tone` — skip this, I'll set it once I know what art exists
- `image` — skip, handled separately

### `mapsSpotlight` (object)
Same shape as above, but for a standout battle map.
- `name` — e.g. `"Full Deck Battle Map"`
- `description` — one line, e.g. `"VTT-ready and print-ready, gridded
  for combat and roleplay alike."`
- `moreCount` — how many *other* maps exist in the full adventure
- `tone` / `image` — skip

### `npcSpotlight` (object)
One standout, memorable NPC.
- `name` — character's name, e.g. `"Mr. Aldous Renner"`
- `description` — **one line**, voice-y and a little unsettling/intriguing,
  implying there's more going on with this character than meets the eye.
  Example: `"He swears he never left the smoking room — but the porter
  remembers seeing him near the stateroom, coat still damp from the
  deck."`
- `moreCount` — how many *other* notable NPCs exist in the adventure
- `tone` / `image` — skip

## Target shape (fill this in)

```json
{
  "SLUG-GOES-HERE": {
    "title": "",
    "genre": "",
    "tagline": "",
    "levelRange": "",
    "partySize": "",
    "sessionLength": "",
    "hook": [""],
    "whatsIncluded": [
      "Full adventure PDF",
      "VTT-ready battle maps (Roll20 & Foundry)",
      "Character token sheet",
      "Print-ready version",
      "Atmospheric music playlist",
      "Theater-of-the-Mind location backdrops"
    ],
    "pacing": ["", "", "", ""],
    "profile": {
      "investigation": 0,
      "social": 0,
      "combat": 0,
      "tension": 0,
      "prepRequired": 0
    },
    "locationsSpotlight": {
      "name": "",
      "description": "",
      "moreCount": 0
    },
    "mapsSpotlight": {
      "name": "",
      "description": "",
      "moreCount": 0
    },
    "npcSpotlight": {
      "name": "",
      "description": "",
      "moreCount": 0
    }
  }
}
```

## Reference: both existing adventures, in full

```json
{
  "murder-on-the-aurora-dawn": {
    "title": "Murder on the Aurora Dawn",
    "genre": "Mystery",
    "tagline": "A steampunk murder mystery adventure for 5th Edition",
    "levelRange": "3–5",
    "partySize": "4–6 players",
    "sessionLength": "3–4hr session",
    "hook": [
      "When the airship Aurora Dawn is three days from port, one of its wealthiest passengers turns up dead in a locked stateroom — and the killer is still aboard. Your party has until the ship docks to sort suspects from scapegoats, unravel motives tangled in old debts and older grudges, and catch a murderer before they slip away into the crowd at landing."
    ],
    "whatsIncluded": [
      "Full adventure PDF",
      "VTT-ready battle maps (Roll20 & Foundry)",
      "Character token sheet",
      "Print-ready version",
      "Atmospheric music playlist",
      "Theater-of-the-Mind location backdrops"
    ],
    "pacing": ["Boarding", "The Body", "The Alibis Stop Adding Up", "Landfall"],
    "profile": {
      "investigation": 85,
      "social": 70,
      "combat": 35,
      "tension": 60,
      "prepRequired": 20
    },
    "locationsSpotlight": {
      "name": "The Grand Dining Hall",
      "description": "Where the body is found — and where alibis start to crack.",
      "moreCount": 5
    },
    "mapsSpotlight": {
      "name": "Full Deck Battle Map",
      "description": "VTT-ready and print-ready, gridded for combat and roleplay alike.",
      "moreCount": 2
    },
    "npcSpotlight": {
      "name": "Mr. Aldous Renner",
      "description": "He swears he never left the smoking room — but the porter remembers seeing him near the stateroom, coat still damp from the deck.",
      "moreCount": 3
    }
  },
  "the-carnival-of-forgotten-smiles": {
    "title": "The Carnival of Forgotten Smiles",
    "genre": "Horror",
    "tagline": "Uncover the dark secrets behind a mysterious carnival in this thrilling one-shot for 5E.",
    "levelRange": "1–4",
    "partySize": "4–6 players",
    "sessionLength": "3–4hr session",
    "hook": [
      "A traveling carnival rolls into town overnight, its tents lit and its performers smiling — but the smiles never seem to move, and nobody in town remembers inviting it. When a local child goes missing after the opening show, your party has one night to find out what the carnival really is before it packs up and vanishes for good."
    ],
    "whatsIncluded": [
      "Full adventure PDF",
      "VTT-ready battle maps (Roll20 & Foundry)",
      "Character token sheet",
      "Print-ready version",
      "Atmospheric music playlist",
      "Theater-of-the-Mind location backdrops"
    ],
    "pacing": ["Arrival", "The Games Begin", "A Child Vanishes", "Behind the Tents"],
    "profile": {
      "investigation": 60,
      "social": 55,
      "combat": 30,
      "tension": 85,
      "prepRequired": 25
    },
    "locationsSpotlight": {
      "name": "The Hall of Mirrors",
      "description": "Step inside, and every reflection smiles back a little too wide.",
      "moreCount": 4
    },
    "mapsSpotlight": {
      "name": "Carnival Grounds Map",
      "description": "VTT-ready and print-ready, laid out tent by tent for easy exploration.",
      "moreCount": 1
    },
    "npcSpotlight": {
      "name": "The Ringmaster",
      "description": "He remembers every visitor's name — even the ones who never told him.",
      "moreCount": 3
    }
  }
}
```
