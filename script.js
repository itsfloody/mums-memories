// Photo data — embedded so the album works both hosted (Netlify)
// and opened locally straight from a folder/zip.
const PHOTOS = [{"file": "045.jpg", "year": 2014}, {"file": "001.jpg", "year": 2000}, {"file": "002.jpg", "year": 2000}, {"file": "098.jpg", "year": 2003}, {"file": "099.jpg", "year": 2003}, {"file": "100.jpg", "year": 2003}, {"file": "101.jpg", "year": 2003}, {"file": "102.jpg", "year": 2003}, {"file": "103.jpg", "year": 2003}, {"file": "104.jpg", "year": 2003}, {"file": "003.jpg", "year": 2005}, {"file": "004.jpg", "year": 2007}, {"file": "005.jpg", "year": 2007}, {"file": "006.jpg", "year": 2007}, {"file": "007.jpg", "year": 2007}, {"file": "008.jpg", "year": 2007}, {"file": "009.jpg", "year": 2007}, {"file": "010.jpg", "year": 2007}, {"file": "011.jpg", "year": 2007}, {"file": "012.jpg", "year": 2007}, {"file": "013.jpg", "year": 2008}, {"file": "014.jpg", "year": 2008}, {"file": "015.jpg", "year": 2008}, {"file": "016.jpg", "year": 2008}, {"file": "017.jpg", "year": 2008}, {"file": "018.jpg", "year": 2008}, {"file": "019.jpg", "year": 2008}, {"file": "020.jpg", "year": 2009}, {"file": "021.jpg", "year": 2009}, {"file": "022.jpg", "year": 2010}, {"file": "023.jpg", "year": 2010}, {"file": "024.jpg", "year": 2010}, {"file": "025.jpg", "year": 2010}, {"file": "026.jpg", "year": 2010}, {"file": "027.jpg", "year": 2010}, {"file": "028.jpg", "year": 2010}, {"file": "029.jpg", "year": 2010}, {"file": "030.jpg", "year": 2010}, {"file": "031.jpg", "year": 2010}, {"file": "032.jpg", "year": 2010}, {"file": "033.jpg", "year": 2010}, {"file": "105.jpg", "year": 2010}, {"file": "034.jpg", "year": 2011}, {"file": "035.jpg", "year": 2011}, {"file": "036.jpg", "year": 2012}, {"file": "107.jpg", "year": 2013}, {"file": "108.jpg", "year": 2013}, {"file": "110.jpg", "year": 2013}, {"file": "037.jpg", "year": 2014}, {"file": "038.jpg", "year": 2014}, {"file": "039.jpg", "year": 2014}, {"file": "040.jpg", "year": 2014}, {"file": "041.jpg", "year": 2014}, {"file": "042.jpg", "year": 2014}, {"file": "043.jpg", "year": 2014}, {"file": "044.jpg", "year": 2014}, {"file": "046.jpg", "year": 2014}, {"file": "047.jpg", "year": 2014}, {"file": "048.jpg", "year": 2014}, {"file": "049.jpg", "year": 2014}, {"file": "050.jpg", "year": 2014}, {"file": "051.jpg", "year": 2014}, {"file": "053.jpg", "year": 2014}, {"file": "054.jpg", "year": 2014}, {"file": "055.jpg", "year": 2014}, {"file": "056.jpg", "year": 2014}, {"file": "057.jpg", "year": 2014}, {"file": "058.jpg", "year": 2014}, {"file": "059.jpg", "year": 2014}, {"file": "060.jpg", "year": 2014}, {"file": "061.jpg", "year": 2014}, {"file": "062.jpg", "year": 2014}, {"file": "063.jpg", "year": 2014}, {"file": "064.jpg", "year": 2014}, {"file": "109.jpg", "year": 2014}, {"file": "111.jpg", "year": 2014}, {"file": "112.jpg", "year": 2014}, {"file": "065.jpg", "year": 2015}, {"file": "066.jpg", "year": 2015}, {"file": "067.jpg", "year": 2015}, {"file": "068.jpg", "year": 2015}, {"file": "069.jpg", "year": 2015}, {"file": "070.jpg", "year": 2015}, {"file": "071.jpg", "year": 2015}, {"file": "072.jpg", "year": 2015}, {"file": "074.jpg", "year": 2015}, {"file": "075.jpg", "year": 2015}, {"file": "076.jpg", "year": 2015}, {"file": "077.jpg", "year": 2015}, {"file": "079.jpg", "year": 2015}, {"file": "080.jpg", "year": 2015}, {"file": "081.jpg", "year": 2015}, {"file": "113.jpg", "year": 2015}, {"file": "114.jpg", "year": 2015}, {"file": "115.jpg", "year": 2015}, {"file": "116.jpg", "year": 2015}, {"file": "117.jpg", "year": 2015}, {"file": "119.jpg", "year": 2015}, {"file": "120.jpg", "year": 2015}, {"file": "121.jpg", "year": 2015}, {"file": "122.jpg", "year": 2015}, {"file": "082.jpg", "year": 2018}, {"file": "083.jpg", "year": 2018}, {"file": "084.jpg", "year": 2020}, {"file": "085.jpg", "year": 2020}, {"file": "086.jpg", "year": null}, {"file": "088.jpg", "year": null}, {"file": "089.jpg", "year": null}, {"file": "090.jpg", "year": null}, {"file": "091.jpg", "year": null}, {"file": "092.jpg", "year": null}, {"file": "093.jpg", "year": null}, {"file": "094.jpg", "year": null}, {"file": "095.jpg", "year": null}, {"file": "096.jpg", "year": null}, {"file": "123.jpg", "year": null}, {"file": "124.jpg", "year": null}, {"file": "125.jpg", "year": null}];

const cover = document.getElementById('cover');
const backCover = document.getElementById('backCover');
const pagesEl = document.getElementById('pagesEl');
const leaf = document.getElementById('leaf');
const pageImg = document.getElementById('pageImg');
const pageImgNext = document.getElementById('pageImgNext');
const pageCaption = document.getElementById('pageCaption');
const folio = document.getElementById('folio');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const openBtn = document.getElementById('openBtn');
const closeBtn = document.getElementById('closeBtn');
const restartBtn = document.getElementById('restartBtn');
const hint = document.getElementById('hint');
const gotoInput = document.getElementById('gotoInput');
const gotoBtn = document.getElementById('gotoBtn');
const autoplayBtn = document.getElementById('autoplayBtn');
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');

let musicOn = true;
let fadeTimer = null;
const MUSIC_TARGET_VOLUME = 0.6;

function clearFade() {
  if (fadeTimer) {
    clearInterval(fadeTimer);
    fadeTimer = null;
  }
}

function fadeMusicIn() {
  if (!musicOn) return;
  clearFade();
  bgMusic.volume = 0;
  bgMusic.play().catch(() => { /* autoplay may be blocked; ignore */ });
  const steps = 20;
  let i = 0;
  fadeTimer = setInterval(() => {
    i += 1;
    bgMusic.volume = Math.min(MUSIC_TARGET_VOLUME, (MUSIC_TARGET_VOLUME * i) / steps);
    if (i >= steps) clearFade();
  }, 60);
}

function fadeMusicOut(thenPause) {
  clearFade();
  const startVol = bgMusic.volume;
  const steps = 12;
  let i = 0;
  fadeTimer = setInterval(() => {
    i += 1;
    bgMusic.volume = Math.max(0, startVol * (1 - i / steps));
    if (i >= steps) {
      clearFade();
      if (thenPause) {
        bgMusic.pause();
        bgMusic.currentTime = 0;
      }
    }
  }, 40);
}

function toggleMusic() {
  musicOn = !musicOn;
  musicBtn.setAttribute('aria-pressed', String(musicOn));
  if (musicOn) {
    fadeMusicIn();
  } else {
    fadeMusicOut(false);
  }
}

musicBtn.addEventListener('click', toggleMusic);

let index = 0;
let isAnimating = false;
let autoplayTimer = null;
const AUTOPLAY_INTERVAL_MS = 3500;
const FADE_MS = 700;       // matches .photo-mount img transition duration
const OPEN_FADE_MS = 900;  // matches .cover.opening / .pages.visible transition duration

// Ping-pong buffer: frontImg is always the currently-visible layer.
// backImg is always the hidden one we're free to load the next photo into.
// We NEVER touch frontImg's src while it's visible.
let frontImg = pageImg;
let backImg = pageImgNext;

// Bumped every time a new crossfade starts. Each crossfade's callback
// captures the token value at call time; if it ever fires after a NEWER
// crossfade has already started (a stale/late 'load' event), the token
// won't match the current one and the callback is ignored. This is what
// actually caused the "stuck" bug: an old onload handler was left
// attached to an <img> element, and browsers can still fire 'load' on it
// again later even when .complete was already true — so the stale
// handler fired long after the fact and overwrote `index` with an old
// value. Clearing onload/onerror up front (below) fixes the common case;
// this token is a second layer of protection against any leftover firing.
let transitionToken = 0;

function pathFor(i) {
  return 'images/' + PHOTOS[i].file;
}

function captionFor(photo) {
  return photo.year ? String(photo.year) : '';
}

function updateChrome() {
  folio.textContent = (index + 1) + ' / ' + PHOTOS.length;
  prevBtn.disabled = index === 0;
  nextBtn.disabled = false;
}

// Show a page instantly, no crossfade — used when first opening the album.
function renderInstant(i) {
  frontImg.onload = null;
  frontImg.onerror = null;
  frontImg.src = pathFor(i);
  frontImg.alt = 'A photo from ' + (PHOTOS[i].year || 'the family album');
  frontImg.classList.add('active');
  backImg.classList.remove('active');
  pageCaption.textContent = captionFor(PHOTOS[i]);
  pageCaption.classList.remove('fading');
  updateChrome();
}

// Crossfade from the currently-shown photo to photo i.
// Only ever sets .src on the hidden (back) layer, then waits for it to
// finish loading before revealing it.
function crossfadeTo(i, done) {
  pageCaption.classList.add('fading');

  const targetSrc = pathFor(i);
  const targetAlt = 'A photo from ' + (PHOTOS[i].year || 'the family album');

  transitionToken += 1;
  const myToken = transitionToken;

  // Always clear any handler left over from a previous cycle where this
  // same element was last used as the back buffer — otherwise a late/stale
  // 'load' event can invoke old code with old data.
  backImg.onload = null;
  backImg.onerror = null;

  function reveal() {
    if (myToken !== transitionToken) return; // a newer transition has since started — ignore this stale callback

    requestAnimationFrame(() => {
      if (myToken !== transitionToken) return;
      backImg.classList.add('active');
      frontImg.classList.remove('active');
    });

    setTimeout(() => {
      if (myToken !== transitionToken) return;

      const tmp = frontImg;
      frontImg = backImg;
      backImg = tmp;

      pageCaption.textContent = captionFor(PHOTOS[i]);
      pageCaption.classList.remove('fading');

      index = i;
      updateChrome();
      if (done) done();
    }, FADE_MS);
  }

  backImg.src = targetSrc;
  backImg.alt = targetAlt;
  if (backImg.complete && backImg.naturalWidth !== 0) {
    reveal();
  } else {
    backImg.onload = reveal;
    backImg.onerror = reveal;
  }
}

function preload(i) {
  if (i >= 0 && i < PHOTOS.length) {
    const img = new Image();
    img.src = pathFor(i);
  }
}

function openAlbum() {
  pagesEl.removeAttribute('hidden');
  renderInstant(0);
  requestAnimationFrame(() => {
    cover.classList.add('opening');
    pagesEl.classList.add('visible');
  });
  fadeMusicIn();
  setTimeout(() => {
    cover.setAttribute('hidden', '');
    preload(1);
  }, OPEN_FADE_MS + 50);
}

function goNext() {
  if (isAnimating) return;
  if (index >= PHOTOS.length - 1) {
    stopAutoplay();
    closeAlbum();
    return;
  }
  isAnimating = true;
  crossfadeTo(index + 1, () => {
    isAnimating = false;
    preload(index + 1);
  });
}

function goPrev() {
  if (isAnimating || index === 0) return;
  stopAutoplay();
  isAnimating = true;
  crossfadeTo(index - 1, () => {
    isAnimating = false;
    preload(index - 1);
  });
}

function showBackCover() {
  pagesEl.classList.remove('visible');
  setTimeout(() => {
    pagesEl.setAttribute('hidden', '');
    backCover.removeAttribute('hidden');
  }, 300);
}

function restart() {
  index = 0;
  backCover.setAttribute('hidden', '');
  cover.classList.remove('opening');
  cover.removeAttribute('hidden');
}

function closeAlbum() {
  stopAutoplay();
  fadeMusicOut(true);
  pagesEl.classList.remove('visible');
  setTimeout(() => {
    pagesEl.setAttribute('hidden', '');
    restart();
  }, 300);
}

function jumpTo(pageNumber) {
  if (isAnimating) return;
  stopAutoplay();
  const target = Math.min(Math.max(pageNumber, 1), PHOTOS.length) - 1;
  if (target === index) return;
  isAnimating = true;
  crossfadeTo(target, () => {
    isAnimating = false;
    preload(index + 1);
    preload(index - 1);
  });
}

function startAutoplay() {
  autoplayBtn.textContent = 'Pause';
  autoplayBtn.setAttribute('aria-pressed', 'true');
  autoplayTimer = setInterval(() => {
    if (index >= PHOTOS.length - 1) {
      stopAutoplay();
      return;
    }
    goNext();
  }, AUTOPLAY_INTERVAL_MS);
}

function stopAutoplay() {
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
  autoplayBtn.textContent = 'Play';
  autoplayBtn.setAttribute('aria-pressed', 'false');
}

function toggleAutoplay() {
  if (autoplayTimer) {
    stopAutoplay();
  } else {
    startAutoplay();
  }
}

openBtn.addEventListener('click', openAlbum);
nextBtn.addEventListener('click', () => { stopAutoplay(); goNext(); });
prevBtn.addEventListener('click', goPrev);
closeBtn.addEventListener('click', closeAlbum);
restartBtn.addEventListener('click', restart);
autoplayBtn.addEventListener('click', toggleAutoplay);

gotoBtn.addEventListener('click', () => {
  const val = parseInt(gotoInput.value, 10);
  if (!isNaN(val)) jumpTo(val);
  gotoInput.value = '';
  gotoInput.blur();
});
gotoInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') gotoBtn.click();
});

document.addEventListener('keydown', (e) => {
  if (cover.hasAttribute('hidden') === false) return;
  if (e.key === 'ArrowRight') { stopAutoplay(); goNext(); }
  if (e.key === 'ArrowLeft') goPrev();
});

// basic swipe support
let touchStartX = null;
pagesEl.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; });
pagesEl.addEventListener('touchend', (e) => {
  if (touchStartX === null) return;
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 40) {
    if (dx < 0) { stopAutoplay(); goNext(); } else { goPrev(); }
  }
  touchStartX = null;
});
