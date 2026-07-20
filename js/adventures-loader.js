// Powers the "All Adventures" catalog page (adventures.html): fetches every
// product from data/products.json, renders one card per adventure (reusing
// the exact same card markup/classes as the homepage's Featured Adventures
// grid), and wires up live search + genre-pill filtering.

let allProducts = {};
let activeGenre = 'All';
let searchTerm = '';

async function fetchAllProducts() {
  const res = await fetch('data/products.json');
  if (!res.ok) {
    throw new Error('Could not load product data');
  }
  return res.json();
}

// Builds one adventure card — same structure/classes as the homepage's
// Featured Adventures cards, so it's visually identical wherever it shows up.
function buildCard(slug, product) {
  const card = document.createElement('a');
  card.href = `adventure.html?id=${slug}`;
  card.className = 'adventure-card';

  const thumb = document.createElement('div');
  thumb.className = 'adventure-thumb';
  const cover = product.images && product.images.gallery && product.images.gallery[0];
  if (cover && cover.src) {
    // Real cover art exists — show it
    thumb.style.backgroundImage = `url("${encodeURI(cover.src)}")`;
  } else if (cover) {
    // No real art yet — fall back to the same gradient placeholder tones used on the product page
    thumb.classList.add(`tone-${cover.tone}`);
  }

  const genreTag = document.createElement('span');
  genreTag.className = 'genre-tag';
  genreTag.textContent = product.genre;
  thumb.appendChild(genreTag);

  const row = document.createElement('div');
  row.className = 'adventure-row';
  const title = document.createElement('h3');
  title.textContent = product.title;
  const price = document.createElement('span');
  price.className = 'adventure-price';
  price.textContent = `€${product.price}`;
  row.appendChild(title);
  row.appendChild(price);

  const desc = document.createElement('p');
  desc.textContent = product.tagline;

  const level = document.createElement('span');
  level.className = 'adventure-level';
  level.innerHTML = '<svg class="level-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
    '<path d="M8 1L9.5 6.5L15 8L9.5 9.5L8 15L6.5 9.5L1 8L6.5 6.5L8 1Z" stroke="var(--gold)" stroke-width="1" stroke-linejoin="round"/>' +
    '</svg>';
  level.append(`Levels ${product.levelRange}`);

  const body = document.createElement('div');
  body.className = 'adventure-body';
  body.appendChild(row);
  body.appendChild(desc);
  body.appendChild(level);

  card.appendChild(thumb);
  card.appendChild(body);
  return card;
}

// Whether a given product passes both the current genre filter AND the
// current search term — both apply together, not one-or-the-other.
function matchesFilters(product) {
  const genreMatches = activeGenre === 'All' || product.genre === activeGenre;

  const term = searchTerm.trim().toLowerCase();
  const searchMatches = !term ||
    product.title.toLowerCase().includes(term) ||
    (product.tagline && product.tagline.toLowerCase().includes(term));

  return genreMatches && searchMatches;
}

// Re-filters allProducts and redraws the grid, result count, and empty state.
// Called once on page load, then again every time the search box or a
// genre pill changes.
function renderGrid() {
  const grid = document.getElementById('adventures-grid');
  const empty = document.getElementById('adventures-empty');
  const countLabel = document.getElementById('results-count');

  const entries = Object.entries(allProducts);
  const matches = entries.filter(([, product]) => matchesFilters(product));

  grid.innerHTML = '';
  matches.forEach(([slug, product]) => {
    grid.appendChild(buildCard(slug, product));
  });

  grid.hidden = matches.length === 0;
  empty.hidden = matches.length !== 0;
  countLabel.textContent = `Showing ${matches.length} of ${entries.length} adventures`;
}

// Builds the "All" pill + one pill per unique genre found in products.json
// (not hardcoded, so a new genre added later shows up automatically).
function renderGenrePills() {
  const row = document.getElementById('genre-filter-row');
  const genres = [...new Set(Object.values(allProducts).map(p => p.genre))];

  const allPill = document.createElement('button');
  allPill.type = 'button';
  allPill.className = 'genre-filter-pill active';
  allPill.textContent = 'All';
  allPill.addEventListener('click', () => selectGenre('All', allPill));
  row.appendChild(allPill);

  genres.forEach(genre => {
    const pill = document.createElement('button');
    pill.type = 'button';
    pill.className = 'genre-filter-pill';
    pill.textContent = genre;
    pill.addEventListener('click', () => selectGenre(genre, pill));
    row.appendChild(pill);
  });
}

// Single-select: marks the clicked pill active, un-marks the rest.
function selectGenre(genre, clickedPill) {
  activeGenre = genre;
  document.querySelectorAll('.genre-filter-pill').forEach(pill => pill.classList.remove('active'));
  clickedPill.classList.add('active');
  renderGrid();
}

async function initAdventuresPage() {
  try {
    allProducts = await fetchAllProducts();
  } catch (err) {
    // Same "can't load data" situation adventure.html handles with its
    // not-found fallback — here we just show a message in the empty-state spot.
    const empty = document.getElementById('adventures-empty');
    empty.textContent = 'Could not load adventures right now — please try again later.';
    empty.hidden = false;
    return;
  }

  renderGenrePills();
  renderGrid();

  // Live search — no submit button, filters as you type
  document.getElementById('adventures-search').addEventListener('input', (e) => {
    searchTerm = e.target.value;
    renderGrid();
  });
}

initAdventuresPage();
