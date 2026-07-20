# Task: Remove the "Cart (0)" link from the site nav

## Goal
Remove the `Cart (0)` link that currently appears in `.nav-right`, on every page (`index.html`, `adventure.html`, and any other page sharing the same header markup, e.g. the new `adventures.html` if it's already been built).

## Why
The site uses Lemon Squeezy for checkout, and Lemon Squeezy does not support a multi-product cart — each "Buy Now" click is a standalone checkout for a single product, there's no basket/cart step in the actual purchase flow. The nav's cart link is a leftover from an earlier draft and doesn't correspond to any real functionality — it should be removed rather than left as a non-functional element that could confuse a visitor into thinking cart/multi-item functionality exists.

## What to change
Find and remove this line (or its equivalent) from the nav on every page:
```html
<a href="#" class="cart-link">Cart (0)</a>
```

## Constraints
- Just remove the element — don't try to repurpose the space it leaves behind unless removing it creates an obvious layout gap (e.g. lopsided spacing in `.nav-right`). If the surrounding flex/gap layout already handles the missing element gracefully, no other changes are needed.
- Leave the rest of `.nav-right` (the "Browse Adventures" button, the mobile burger menu button) untouched.
- If `.cart-link` styles in `css/style.css` are now completely unused anywhere else on the site, they can be removed too — but double check they're not reused by anything else first.
