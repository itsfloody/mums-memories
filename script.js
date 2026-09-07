// Photo data — embedded so the album works both hosted (Netlify)
// and opened locally straight from a folder/zip.
const PHOTOS = [{"file": "045.jpg", "year": 2014}, {"file": "001.jpg", "year": 2000}, {"file": "002.jpg", "year": 2000}, {"file": "098.jpg", "year": 2003}, {"file": "099.jpg", "year": 2003}, {"file": "100.jpg", "year": 2003}, {"file": "101.jpg", "year": 2003}, {"file": "102.jpg", "year": 2003}, {"file": "103.jpg", "year": 2003}, {"file": "104.jpg", "year": 2003}, {"file": "003.jpg", "year": 2005}, {"file": "004.jpg", "year": 2007}, {"file": "005.jpg", "year": 2007}, {"file": "006.jpg", "year": 2007}, {"file": "007.jpg", "year": 2007}, {"file": "008.jpg", "year": 2007}, {"file": "009.jpg", "year": 2007}, {"file": "010.jpg", "year": 2007}, {"file": "011.jpg", "year": 2007}, {"file": "012.jpg", "year": 2007}, {"file": "013.jpg", "year": 2008}, {"file": "014.jpg", "year": 2008}, {"file": "015.jpg", "year": 2008}, {"file": "016.jpg", "year": 2008}, {"file": "017.jpg", "year": 2008}, {"file": "018.jpg", "year": 2008}, {"file": "019.jpg", "year": 2008}, {"file": "020.jpg", "year": 2009}, {"file": "021.jpg", "year": 2009}, {"file": "022.jpg", "year": 2010}, {"file": "023.jpg", "year": 2010}, {"file": "024.jpg", "year": 2010}, {"file": "025.jpg", "year": 2010}, {"file": "026.jpg", "year": 2010}, {"file": "027.jpg", "year": 2010}, {"file": "028.jpg", "year": 2010}, {"file": "029.jpg", "year": 2010}, {"file": "030.jpg", "year": 2010}, {"file": "031.jpg", "year": 2010}, {"file": "032.jpg", "year": 2010}, {"file": "033.jpg", "year": 2010}, {"file": "105.jpg", "year": 2010}, {"file": "034.jpg", "year": 2011}, {"file": "035.jpg", "year": 2011}, {"file": "036.jpg", "year": 2012}, {"file": "106.jpg", "year": 2013}, {"file": "107.jpg", "year": 2013}, {"file": "108.jpg", "year": 2013}, {"file": "110.jpg", "year": 2013}, {"file": "037.jpg", "year": 2014}, {"file": "038.jpg", "year": 2014}, {"file": "039.jpg", "year": 2014}, {"file": "040.jpg", "year": 2014}, {"file": "041.jpg", "year": 2014}, {"file": "042.jpg", "year": 2014}, {"file": "043.jpg", "year": 2014}, {"file": "044.jpg", "year": 2014}, {"file": "046.jpg", "year": 2014}, {"file": "047.jpg", "year": 2014}, {"file": "048.jpg", "year": 2014}, {"file": "049.jpg", "year": 2014}, {"file": "050.jpg", "year": 2014}, {"file": "051.jpg", "year": 2014}, {"file": "053.jpg", "year": 2014}, {"file": "054.jpg", "year": 2014}, {"file": "055.jpg", "year": 2014}, {"file": "056.jpg", "year": 2014}, {"file": "057.jpg", "year": 2014}, {"file": "058.jpg", "year": 2014}, {"file": "059.jpg", "year": 2014}, {"file": "060.jpg", "year": 2014}, {"file": "061.jpg", "year": 2014}, {"file": "062.jpg", "year": 2014}, {"file": "063.jpg", "year": 2014}, {"file": "064.jpg", "year": 2014}, {"file": "109.jpg", "year": 2014}, {"file": "111.jpg", "year": 2014}, {"file": "112.jpg", "year": 2014}, {"file": "065.jpg", "year": 2015}, {"file": "066.jpg", "year": 2015}, {"file": "067.jpg", "year": 2015}, {"file": "068.jpg", "year": 2015}, {"file": "069.jpg", "year": 2015}, {"file": "070.jpg", "year": 2015}, {"file": "071.jpg", "year": 2015}, {"file": "072.jpg", "year": 2015}, {"file": "073.jpg", "year": 2015}, {"file": "074.jpg", "year": 2015}, {"file": "075.jpg", "year": 2015}, {"file": "076.jpg", "year": 2015}, {"file": "077.jpg", "year": 2015}, {"file": "078.jpg", "year": 2015}, {"file": "079.jpg", "year": 2015}, {"file": "080.jpg", "year": 2015}, {"file": "081.jpg", "year": 2015}, {"file": "113.jpg", "year": 2015}, {"file": "114.jpg", "year": 2015}, {"file": "115.jpg", "year": 2015}, {"file": "116.jpg", "year": 2015}, {"file": "117.jpg", "year": 2015}, {"file": "118.jpg", "year": 2015}, {"file": "119.jpg", "year": 2015}, {"file": "120.jpg", "year": 2015}, {"file": "121.jpg", "year": 2015}, {"file": "122.jpg", "year": 2015}, {"file": "082.jpg", "year": 2018}, {"file": "083.jpg", "year": 2018}, {"file": "084.jpg", "year": 2020}, {"file": "085.jpg", "year": 2020}, {"file": "086.jpg", "year": null}, {"file": "088.jpg", "year": null}, {"file": "089.jpg", "year": null}, {"file": "090.jpg", "year": null}, {"file": "091.jpg", "year": null}, {"file": "092.jpg", "year": null}, {"file": "093.jpg", "year": null}, {"file": "094.jpg", "year": null}, {"file": "095.jpg", "year": null}, {"file": "096.jpg", "year": null}, {"file": "123.jpg", "year": null}, {"file": "124.jpg", "year": null}, {"file": "125.jpg", "year": null}];

const cover = document.getElementById('cover');
const backCover = document.getElementById('backCover');
const pagesEl = document.getElementById('pagesEl');
const leaf = document.getElementById('leaf');
const pageImg = document.getElementById('pageImg');
const pageCaption = document.getElementById('pageCaption');
const folio = document.getElementById('folio');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const openBtn = document.getElementById('openBtn');
const closeBtn = document.getElementById('closeBtn');
const restartBtn = document.getElementById('restartBtn');
const hint = document.getElementById('hint');

let index = 0;
let isAnimating = false;

function captionFor(photo) {
  return photo.year ? String(photo.year) : '';
}

function render(instant) {
  pageImg.src = 'images/' + PHOTOS[index].file;
  pageImg.alt = 'A photo from ' + (PHOTOS[index].year || "the family album");
  pageCaption.textContent = captionFor(PHOTOS[index]);
  folio.textContent = (index + 1) + ' / ' + PHOTOS.length;
  prevBtn.disabled = index === 0;
  nextBtn.disabled = false;
}

function preload(i) {
  if (i >= 0 && i < PHOTOS.length) {
    const img = new Image();
    img.src = 'images/' + PHOTOS[i].file;
  }
}

function openAlbum() {
  cover.classList.add('opening');
  hint.textContent = 'Use the arrows, or swipe, to turn the pages';
  setTimeout(() => {
    cover.setAttribute('hidden', '');
    pagesEl.removeAttribute('hidden');
    requestAnimationFrame(() => pagesEl.classList.add('visible'));
    render(true);
    preload(1);
  }, 850);
}

function goNext() {
  if (isAnimating) return;
  if (index >= PHOTOS.length - 1) {
    showBackCover();
    return;
  }
  isAnimating = true;
  leaf.classList.add('turning-next');
  leaf.addEventListener('transitionend', function handler() {
    leaf.removeEventListener('transitionend', handler);
    index += 1;
    render();
    leaf.classList.remove('turning-next');
    isAnimating = false;
    preload(index + 1);
  }, { once: true });
}

function goPrev() {
  if (isAnimating || index === 0) return;
  isAnimating = true;
  leaf.classList.add('turning-prev');
  leaf.addEventListener('transitionend', function handler() {
    leaf.removeEventListener('transitionend', handler);
    index -= 1;
    render();
    leaf.classList.remove('turning-prev');
    isAnimating = false;
    preload(index - 1);
  }, { once: true });
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
  pagesEl.classList.remove('visible');
  setTimeout(() => {
    pagesEl.setAttribute('hidden', '');
    restart();
  }, 300);
}

openBtn.addEventListener('click', openAlbum);
nextBtn.addEventListener('click', goNext);
prevBtn.addEventListener('click', goPrev);
closeBtn.addEventListener('click', closeAlbum);
restartBtn.addEventListener('click', restart);

document.addEventListener('keydown', (e) => {
  if (cover.hasAttribute('hidden') === false) return;
  if (e.key === 'ArrowRight') goNext();
  if (e.key === 'ArrowLeft') goPrev();
});

// basic swipe support
let touchStartX = null;
pagesEl.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; });
pagesEl.addEventListener('touchend', (e) => {
  if (touchStartX === null) return;
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 40) { dx < 0 ? goNext() : goPrev(); }
  touchStartX = null;
});
