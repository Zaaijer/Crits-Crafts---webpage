// This file is shared by every page on the site (loaded via <script src="js/main.js">).
// It has two jobs: (1) toggle the nav bar's background as you scroll, and
// (2) run the homepage's image carousel, if that page has one.

// --- Nav bar background on scroll ---
// The nav starts see-through (see header{background:transparent} in the CSS)
// so it can sit over the hero image. Once you've scrolled down more than
// 40 pixels, we add a "scrolled" class, which is what actually turns on the
// solid dark background + blur (that part is all done in CSS, not here).
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// --- Homepage image carousel ---
// querySelector/querySelectorAll return null / an empty list if the page
// doesn't have these elements (like the product page, which has no
// carousel) — the "if" check further down means this code just quietly
// does nothing on pages without one, instead of throwing an error.
const showcaseTrack = document.querySelector('.showcase-track');
const showcaseDots = document.querySelectorAll('.showcase-dot');
let showcaseIndex = 0;

// Moves the carousel to a given slide (0, 1, or 2) by sliding the whole
// track sideways with a CSS transform, and updates which dot looks "active".
function goToShowcaseSlide(index) {
  showcaseIndex = index;
  showcaseTrack.style.transform = `translateX(-${index * 100}%)`;
  showcaseDots.forEach(dot => dot.classList.remove('active'));
  showcaseDots[index].classList.add('active');
}

if (showcaseTrack && showcaseDots.length) {
  // Clicking a dot jumps straight to that slide
  showcaseDots.forEach(dot => {
    dot.addEventListener('click', () => goToShowcaseSlide(Number(dot.dataset.index)));
  });

  // Auto-advance to the next slide every 6 seconds, looping back to the
  // start after the last one (the % is the "remainder"/modulo operator —
  // it wraps the count back to 0 once it would go past the last slide).
  setInterval(() => {
    goToShowcaseSlide((showcaseIndex + 1) % showcaseDots.length);
  }, 6000);
}
