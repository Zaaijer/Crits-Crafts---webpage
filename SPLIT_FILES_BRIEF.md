# Task: Split inline CSS/JS out of index.html into separate files

## Goal
Right now all CSS lives in a `<style>` block in the `<head>`, and all JS lives in a `<script>` block near `</body>`, inside the single HTML file. Split these into their own files.

## What to do
1. Create `css/style.css` and move everything currently inside `<style>...</style>` into it (just the CSS rules, not the `<style>` tags themselves).
2. Create `js/main.js` and move everything currently inside `<script>...</script>` into it (just the JS, not the `<script>` tags themselves).
3. In the HTML `<head>`, replace the removed `<style>` block with:
   ```html
   <link rel="stylesheet" href="css/style.css">
   ```
4. Where the removed `<script>` block was (just before `</body>`), replace it with:
   ```html
   <script src="js/main.js"></script>
   ```

## Constraints
- **Don't change any actual CSS rules, selectors, or JS logic** — this is a pure move/refactor, not a redesign. The page should look and behave identically before and after.
- **Don't change any image paths** (e.g. `images/hero-art.jpg`) — the HTML file is staying in the same root folder, so relative paths to images are unaffected by this change. Only the CSS and JS are moving.
- If there are multiple HTML files in the project (not just one), only touch the one specified when this task is run — don't assume every HTML file needs the same treatment yet.

## Why (context, not instructions)
The file has grown large enough that scrolling past hundreds of lines of CSS to find HTML structure is becoming a real friction point. Splitting also means any future second page can link to the same shared `style.css` instead of duplicating the whole stylesheet.
