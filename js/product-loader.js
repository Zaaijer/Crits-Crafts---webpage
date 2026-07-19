// This file only runs on adventure.html (the one shared product-page
// template). Its job: figure out which adventure to show from the page's
// URL, fetch that adventure's data, and fill it into the page.
//
// The overall flow happens at the bottom, in initProductPage() — everything
// above it is just helper functions that initProductPage() calls.

// Fetches product data from the local JSON file. Swap this function's
// internals for a live API call later — nothing below it should need to change.
async function fetchProduct(id) {
  const res = await fetch('data/products.json');
  if (!res.ok) {
    throw new Error('Could not load product data');
  }
  const products = await res.json();
  return products[id] || null;
}

// Finds every element on the page tagged data-field="name" (there can be
// more than one — e.g. the price shows up both in the info bar and the
// sticky buy bar) and sets its visible text to "value".
function setField(name, value) {
  document.querySelectorAll(`[data-field="${name}"]`).forEach(el => {
    el.textContent = value;
  });
}

// Builds one "no real art yet" placeholder box: a colored gradient
// background (see the tone-* classes in the CSS) with a small text label.
function placeholderBlock(label, tone, extraClass) {
  const block = document.createElement('div');
  block.className = `placeholder-block tone-${tone}${extraClass ? ' ' + extraClass : ''}`;
  const caption = document.createElement('span');
  caption.className = 'placeholder-label';
  caption.textContent = label;
  block.appendChild(caption);
  return block;
}

// Builds one real-image box instead of a placeholder — used once actual
// art exists for a slot. "encodeURI" makes sure spaces/special characters
// in a file path (e.g. a folder named "Murder on the Aurora Dawn") don't
// break the URL.
function imageBlock(src, extraClass) {
  const block = document.createElement('div');
  block.className = `placeholder-block${extraClass ? ' ' + extraClass : ''}`;
  block.style.backgroundImage = `url("${encodeURI(src)}")`;
  block.style.backgroundSize = 'cover';
  block.style.backgroundPosition = 'center';
  return block;
}

// Fills a gallery-style container (the opening gallery, or the scene
// strip) with one box per item in "items". Each item either has a "src"
// (real art — show the actual image) or just a "label"/"tone" (no art
// yet — show a placeholder).
function renderPlaceholderGrid(fieldName, items) {
  const container = document.querySelector(`[data-field="${fieldName}"]`);
  items.forEach(item => {
    const block = item.src ? imageBlock(item.src) : placeholderBlock(item.label, item.tone);
    container.appendChild(block);
  });
}

// The breather band already exists as a section in the HTML (with the
// pull-quote inside it) — this just adds the right tone-* class so its
// background gradient matches this product's data.
function renderBreatherBand(image) {
  const band = document.querySelector('[data-field="breatherBand"]');
  band.classList.add(`tone-${image.tone}`);
}

// Builds the "What's Included" list: one <li> per item, each with a small
// checkmark icon (inline SVG) plus the item's text.
function renderIncluded(items) {
  const list = document.querySelector('[data-field="whatsIncluded"]');
  items.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `<svg class="included-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8.5L6.5 12L13 4" stroke="var(--gold)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
    const text = document.createElement('span');
    text.textContent = item; // set separately from the SVG above so the text is always safely escaped, even if it contains special characters
    li.appendChild(text);
    list.appendChild(li);
  });
}

// Builds the "Cast of Characters" grid: one circular portrait placeholder
// + name + role per cast member.
function renderCast(cast) {
  const grid = document.querySelector('[data-field="cast"]');
  cast.forEach(member => {
    const item = document.createElement('div');
    item.className = 'cast-item';

    const portrait = placeholderBlock('Portrait', member.tone, 'cast-portrait');

    const name = document.createElement('span');
    name.className = 'cast-name';
    name.textContent = member.name;

    const role = document.createElement('span');
    role.className = 'cast-role';
    role.textContent = member.role;

    item.appendChild(portrait);
    item.appendChild(name);
    item.appendChild(role);
    grid.appendChild(item);
  });
}

// Points both "Buy Now" buttons (info bar + sticky bar) at the product's
// real checkout link, if it has one. Products without a buyLink yet (like
// ones still using placeholder data) just keep the "#" placeholder so the
// button doesn't error out, it just won't go anywhere real.
function renderBuyLinks(buyLink) {
  const buttons = [
    document.getElementById('info-bar-buy'),
    document.getElementById('sticky-bar-buy')
  ];
  buttons.forEach(btn => {
    if (!btn || !buyLink) return;
    btn.href = buyLink;
    btn.target = '_blank';
    btn.rel = 'noopener';
  });
}

// Hides the real product content and shows the "Adventure not found"
// message instead — used when the URL's id doesn't match anything.
function showNotFound() {
  document.getElementById('product-content').hidden = true;
  document.getElementById('product-not-found').hidden = false;
}

// Desktop: reveal the sticky top bar once the user scrolls past the info
// bar's buy button. Mobile's bottom bar is always visible via CSS alone —
// this listener runs regardless, but only the desktop CSS acts on it.
function initStickyBuyBar() {
  const infoBarBuy = document.getElementById('info-bar-buy');
  const stickyBar = document.getElementById('sticky-buy-bar');
  if (!infoBarBuy || !stickyBar) return;

  window.addEventListener('scroll', () => {
    // getBoundingClientRect() tells us where an element currently is on
    // screen. Once the Buy button has scrolled above the top of the
    // viewport (rect.bottom < 0, meaning even its bottom edge is off the
    // top of the screen), we show the sticky bar as a replacement.
    const rect = infoBarBuy.getBoundingClientRect();
    stickyBar.classList.toggle('visible', rect.bottom < 0);
  });
}

// The main entry point — runs immediately when this script loads (see the
// initProductPage() call at the very bottom of this file).
async function initProductPage() {
  // Read "?id=..." from the current page's URL. Example: for
  // "adventure.html?id=murder-on-the-aurora-dawn", this gives us
  // "murder-on-the-aurora-dawn".
  const id = new URLSearchParams(window.location.search).get('id');
  if (!id) {
    showNotFound();
    return;
  }

  let product;
  try {
    product = await fetchProduct(id);
  } catch (err) {
    // fetch() fails entirely if, for example, the page was opened by
    // double-clicking the file instead of through Live Server.
    showNotFound();
    return;
  }

  if (!product) {
    // fetch succeeded, but no product in the JSON matched this id
    showNotFound();
    return;
  }

  // Found a matching product — fill every part of the page in with its data.
  document.title = `${product.title} — Crits & Crafts`;
  setField('title', product.title);
  setField('genre', product.genre);
  setField('price', `€${product.price}`);
  setField('hook', product.hook);
  setField('quote', `“${product.quote}”`);
  renderIncluded(product.whatsIncluded);
  renderPlaceholderGrid('gallery', product.images.gallery);
  renderPlaceholderGrid('sceneStrip', product.images.sceneStrip);
  renderBreatherBand(product.images.breatherBand);
  renderCast(product.images.cast);
  renderBuyLinks(product.buyLink);

  document.getElementById('product-content').hidden = false;
  initStickyBuyBar();
}

initProductPage();
