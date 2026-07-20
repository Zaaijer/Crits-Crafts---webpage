# Task: Add a temporary password gate to the live site

## Goal
Add `js/site-gate.js` (already written, provided separately — copy it into the project's `js/` folder as-is, don't rewrite it) to every public HTML page, so casual visitors and search engines can't see the site while it's still under construction. This is a temporary, low-security measure — not real authentication — meant to be removed once the site is ready to launch for real.

## What to do
On every page that should be gated (currently: `index.html` and `adventure.html`), add this single line as the **very first thing inside `<body>`**, before any other content (before the `<header>`, before anything):

```html
<script src="js/site-gate.js"></script>
```

Placement matters: it must be the first child of `<body>` so it can hide the page before any real content has a chance to render/flash on screen.

## Password
The default password in the file is the placeholder `"changeme"` — change the `PASSWORD` variable near the top of `site-gate.js` to something real before this goes live on the actual domain.

## Important constraints
- **Don't modify the internal logic of `site-gate.js`** — it's a complete, tested, self-contained file. Only the `PASSWORD` value should be edited.
- **This is explicitly NOT secure** — the password is visible in plain text to anyone who views page source. Don't present this as real protection anywhere in code comments or communication; it's a "keep casual browsers out" measure only.
- This is meant to be **temporary**. When the site is ready to launch publicly, the plan is to remove the `<script src="js/site-gate.js"></script>` line from every page (or delete the file entirely) — flag this as a to-do when that time comes, don't do it now.
