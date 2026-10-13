/* ============================================================
   YAAZH ORGANIC ELITE WELLNESS — MAIN JS
   Multi-view navigation · Hero carousel · Product grid
   Cart · Lightbox · Enquiry → WhatsApp · Reviews · Reveal
   ============================================================ */
'use strict';

/* ════════════════════════════════════════════════════════════════
   STATE
════════════════════════════════════════════════════════════════ */
const STATE = {
  cart: [],          // [{ product, qty }]
  currentView: 'home',
  currentCat: null,  // 'haircare' | 'skincare'
  currentLine: null, // 'shampoo' | 'hairoil' | 'soap' | 'serum'
  currentProduct: null,
  viewStack: [],     // for back navigation
  enquiryProduct: null,

  heroIdx: 0,
  heroTimer: null,

  revIdx: 0,
  revTimer: null,

  dcIdx: 0,         // detail carousel index
  lbPosters: [],
  lbIdx: 0,
};

/* ════════════════════════════════════════════════════════════════
   UTILITY
════════════════════════════════════════════════════════════════ */
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

function priceNum(str) {
  // "$10" → 10
  return parseFloat((str || '0').replace(/[^0-9.]/g, ''));
}

function waOpen(msg) {
  const url = 'https://wa.me/' + YAAZH_WA + '?text=' + encodeURIComponent(msg);
  window.open(url, '_blank', 'noopener');
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ════════════════════════════════════════════════════════════════
   NAVBAR — scroll shadow, hamburger
════════════════════════════════════════════════════════════════ */
(function initNav() {
  const nav = $('yzNav');
  const burger = $('yzHamburger');
  const menu = $('yzMobileMenu');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  });

  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    menu.setAttribute('aria-hidden', !open);
  });

  // Logo → home
  $('yzLogoHome').addEventListener('click', e => {
    e.preventDefault();
    if (STATE.currentView !== 'home') showView('home');
    else scrollToTop();
  });
  $('footerLogoHome').addEventListener('click', e => {
    e.preventDefault();
    showView('home'); scrollToTop();
  });

  // Nav link delegation
  document.addEventListener('click', e => {
    const catBtn = e.target.closest('[data-cat]');
    const scrollBtn = e.target.closest('[data-scroll]');
    const lineBtn = e.target.closest('[data-line]');

    if (lineBtn && lineBtn.dataset.cat && lineBtn.dataset.line) {
      e.preventDefault();
      const cat = lineBtn.dataset.cat;
      const line = lineBtn.dataset.line;
      showView('home');
      setTimeout(() => openListing(cat, line), 10);
      menu.classList.remove('open'); burger.classList.remove('open');
      return;
    }
    if (catBtn && !lineBtn) {
      e.preventDefault();
      openCategory(catBtn.dataset.cat);
      menu.classList.remove('open'); burger.classList.remove('open');
      return;
    }
    if (scrollBtn) {
      e.preventDefault();
      const sec = scrollBtn.dataset.scroll;
      if (STATE.currentView !== 'home') {
        showView('home');
        setTimeout(() => document.getElementById(sec)?.scrollIntoView({ behavior: 'smooth' }), 350);
      } else {
        document.getElementById(sec)?.scrollIntoView({ behavior: 'smooth' });
      }
      menu.classList.remove('open'); burger.classList.remove('open');
    }
  });
})();

/* ════════════════════════════════════════════════════════════════
   VIEW SYSTEM
════════════════════════════════════════════════════════════════ */
function showView(name) {
  $$('.yz-view').forEach(v => v.classList.remove('active'));
  const el = document.getElementById('view-' + name);
  if (el) el.classList.add('active');
  STATE.currentView = name;
  scrollToTop();
}

/* ════════════════════════════════════════════════════════════════
   HERO CAROUSEL
════════════════════════════════════════════════════════════════ */
function initHeroCarousel() {
  const carousel = $('heroCarousel');
  const dotsWrap = $('hcDots');
  const slides = YAAZH_HERO_SLIDES;

  // Build slides
  carousel.innerHTML = slides.map((s, i) =>
    `<div class="yz-hc-slide${i === 0 ? ' active' : ''}">
       <img src="${s.img}" alt="${s.label}" loading="${i === 0 ? 'eager' : 'lazy'}" />
     </div>`
  ).join('');

  // Build dots
  dotsWrap.innerHTML = slides.map((_, i) =>
    `<button class="yz-hc-dot${i === 0 ? ' active' : ''}" data-i="${i}" aria-label="Slide ${i+1}"></button>`
  ).join('');

  function goTo(idx) {
    const ss = carousel.querySelectorAll('.yz-hc-slide');
    const dd = dotsWrap.querySelectorAll('.yz-hc-dot');
    ss[STATE.heroIdx]?.classList.remove('active');
    dd[STATE.heroIdx]?.classList.remove('active');
    STATE.heroIdx = (idx + slides.length) % slides.length;
    ss[STATE.heroIdx]?.classList.add('active');
    dd[STATE.heroIdx]?.classList.add('active');
    resetHeroTimer();
  }

  function resetHeroTimer() {
    clearInterval(STATE.heroTimer);
    STATE.heroTimer = setInterval(() => goTo(STATE.heroIdx + 1), 4000);
  }

  $('hcPrev').addEventListener('click', () => goTo(STATE.heroIdx - 1));
  $('hcNext').addEventListener('click', () => goTo(STATE.heroIdx + 1));
  dotsWrap.addEventListener('click', e => {
    const btn = e.target.closest('.yz-hc-dot');
    if (btn) goTo(+btn.dataset.i);
  });

  // Touch swipe
  let tx = 0;
  carousel.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  carousel.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 40) goTo(STATE.heroIdx + (dx < 0 ? 1 : -1));
  });

  resetHeroTimer();
}

/* ════════════════════════════════════════════════════════════════
   CATEGORY VIEW
════════════════════════════════════════════════════════════════ */
const CAT_META = {
  haircare: {
    title: 'Hair Care',
    sub: 'Botanical formulas for strong, lustrous, healthy hair.',
    subs: [
      { line: 'shampoo', emoji: '🌸', label: 'Shampoos', desc: '14 unique botanical shampoo variants', count: 14 },
      { line: 'hairoil', emoji: '💧', label: 'Root Renewal Solution', desc: 'Strengthen roots & promote hair growth', count: 4 },
    ]
  },
  skincare: {
    title: 'Skin Care',
    sub: 'Natural formulations for radiant, nourished, glowing skin.',
    subs: [
      { line: 'soap', emoji: '🧼', label: 'Soaps', desc: '10 handcrafted organic soap bars', count: 10 },
      { line: 'serum', emoji: '✨', label: 'Amudham Serum', desc: 'Bio-active ambrosia serum for radiant skin', count: 6 },
    ]
  }
};

function openCategory(cat) {
  const meta = CAT_META[cat];
  if (!meta) return;
  STATE.currentCat = cat;

  $('catTitle').textContent = meta.title;
  $('catSub').textContent = meta.sub;
  $('catBreadcrumb').textContent = meta.title;

  const grid = $('subCatGrid');
  grid.innerHTML = meta.subs.map(s =>
    `<button class="yz-subcat-card" data-line="${s.line}" data-cat="${cat}">
       <div class="yz-sub-emoji">${s.emoji}</div>
       <h3>${s.label}</h3>
       <p>${s.desc}</p>
       <span class="yz-sub-cta">${s.count} products →</span>
     </button>`
  ).join('');

  $('catBackBtn').onclick = () => { showView('home'); };
  showView('category');
}

/* ════════════════════════════════════════════════════════════════
   PRODUCT LISTING VIEW
════════════════════════════════════════════════════════════════ */
const LINE_META = {
  shampoo: { label: 'Shampoos', sub: 'Botanical shampoos for every hair type.', products: () => YAAZH_SHAMPOOS, sizeKey: 'qty' },
  hairoil: { label: 'Root Renewal Solution', sub: 'Strengthen roots and restore hair vitality.', products: () => YAAZH_HAIROIL, sizeKey: 'size' },
  soap:    { label: 'Soaps', sub: 'Handcrafted organic soaps for radiant skin.', products: () => YAAZH_SOAPS, sizeKey: 'qty' },
  serum:   { label: 'Amudham – The Ambrosia Serum', sub: 'Divine botanical ambrosia for glowing skin.', products: () => YAAZH_SERUM, sizeKey: 'size' },
};

function openListing(cat, line) {
  const lm = LINE_META[line];
  if (!lm) return;
  STATE.currentCat = cat;
  STATE.currentLine = line;

  const catMeta = CAT_META[cat];
  $('listBreadcrumb').textContent = (catMeta?.title || cat) + ' → ' + lm.label;
  $('listTitle').textContent = lm.label;
  $('listSub').textContent = lm.sub;

  const prods = lm.products();
  const sizeKey = lm.sizeKey;

  $('productGrid').innerHTML = prods.map(p => {
    const imgSrc = getImg(p, 'p-1');
    const sizeLabel = p[sizeKey] || '';
    return `<div class="yz-prod-card" data-id="${p.id}">
      <div class="yz-prod-img-wrap">
        <img src="${imgSrc}" alt="${p.name}" loading="lazy" />
      </div>
      <div class="yz-prod-info">
        <div class="yz-prod-name">${p.name}</div>
        ${sizeLabel ? `<div class="yz-prod-size">${sizeLabel}</div>` : ''}
        <button class="yz-prod-add-btn" data-action="add" data-id="${p.id}">Add to Cart</button>
      </div>
    </div>`;
  }).join('');

  // Card clicks → detail view
  $('productGrid').addEventListener('click', e => {
    const addBtn = e.target.closest('[data-action="add"]');
    const card = e.target.closest('.yz-prod-card');
    if (addBtn) {
      e.stopPropagation();
      addToCart(addBtn.dataset.id);
      return;
    }
    if (card) openDetail(card.dataset.id);
  }, { once: true });

  $('listBackBtn').onclick = () => openCategory(cat);
  showView('listing');
}

/* ════════════════════════════════════════════════════════════════
   PRODUCT DETAIL VIEW
════════════════════════════════════════════════════════════════ */
function openDetail(id) {
  const p = findProduct(id);
  if (!p) return;
  STATE.currentProduct = p;

  const lm = LINE_META[p.line];
  const catMeta = CAT_META[p.category];
  const sizeKey = (p.line === 'hairoil' || p.line === 'serum') ? 'size' : 'qty';
  const sizeLabel = p[sizeKey] || '';

  $('detailBreadcrumb').textContent = (catMeta?.title || '') + ' → ' + (lm?.label || '') + ' → ' + p.name;
  $('detailTagline').textContent = p.tagline || '';
  $('detailName').textContent = p.name;
  $('detailSize').textContent = sizeLabel;
  $('detailBenefits').innerHTML = (p.benefits || '').split(' · ').map(b => `<div>✓ ${b}</div>`).join('');

  // Build 3-poster carousel
  const posters = ['p-1', 'p-2', 'p-3'];
  const posterPaths = posters.map(pp => getImg(p, pp));
  STATE.lbPosters = posterPaths;
  STATE.dcIdx = 0;

  const carousel = $('detailCarousel');
  carousel.innerHTML = posterPaths.map((src, i) =>
    `<div class="yz-dc-slide${i === 0 ? ' active' : ''}" data-i="${i}">
       <img src="${src}" alt="${p.name} poster ${i+1}" loading="${i===0?'eager':'lazy'}" />
     </div>`
  ).join('');

  // Thumbs
  $('dcThumbs').innerHTML = posterPaths.map((src, i) =>
    `<div class="yz-dc-thumb${i === 0 ? ' active' : ''}" data-i="${i}">
       <img src="${src}" alt="Poster ${i+1}" loading="lazy" />
     </div>`
  ).join('');

  // Click slide → lightbox
  carousel.querySelectorAll('.yz-dc-slide').forEach(slide => {
    slide.addEventListener('click', () => openLightbox(+slide.dataset.i));
  });

  // Thumb clicks
  $('dcThumbs').addEventListener('click', e => {
    const th = e.target.closest('.yz-dc-thumb');
    if (th) dcGoTo(+th.dataset.i);
  });

  $('dcPrev').onclick = () => dcGoTo(STATE.dcIdx - 1);
  $('dcNext').onclick = () => dcGoTo(STATE.dcIdx + 1);

  // Actions
  $('detailAddCart').onclick = () => addToCart(id);
  $('detailShopNow').onclick = () => openEnquiry(p);

  $('detailBackBtn').onclick = () => {
    if (STATE.currentLine) openListing(STATE.currentCat, STATE.currentLine);
    else if (STATE.currentCat) openCategory(STATE.currentCat);
    else showView('home');
  };

  showView('detail');
}

function dcGoTo(idx) {
  const slides = $('detailCarousel').querySelectorAll('.yz-dc-slide');
  const thumbs = $('dcThumbs').querySelectorAll('.yz-dc-thumb');
  slides[STATE.dcIdx]?.classList.remove('active');
  thumbs[STATE.dcIdx]?.classList.remove('active');
  STATE.dcIdx = ((idx % 3) + 3) % 3;
  slides[STATE.dcIdx]?.classList.add('active');
  thumbs[STATE.dcIdx]?.classList.add('active');
}

/* ════════════════════════════════════════════════════════════════
   LIGHTBOX
════════════════════════════════════════════════════════════════ */
function openLightbox(startIdx) {
  STATE.lbIdx = startIdx;
  const lb = $('lightbox');
  lb.classList.add('open');
  lb.setAttribute('aria-hidden', 'false');
  updateLightbox();
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  $('lightbox').classList.remove('open');
  $('lightbox').setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function updateLightbox() {
  const posters = STATE.lbPosters;
  const idx = STATE.lbIdx;
  $('lbImg').src = posters[idx] || '';
  $('lbImg').alt = 'Product poster ' + (idx + 1);
  $('lbCounter').textContent = (idx + 1) + ' / ' + posters.length;
}

$('lbClose').addEventListener('click', closeLightbox);
$('lbPrev').addEventListener('click', () => {
  STATE.lbIdx = ((STATE.lbIdx - 1) + STATE.lbPosters.length) % STATE.lbPosters.length;
  updateLightbox();
});
$('lbNext').addEventListener('click', () => {
  STATE.lbIdx = (STATE.lbIdx + 1) % STATE.lbPosters.length;
  updateLightbox();
});
$('lightbox').addEventListener('click', e => {
  if (e.target === $('lightbox')) closeLightbox();
});
// Keyboard
document.addEventListener('keydown', e => {
  if (!$('lightbox').classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') { STATE.lbIdx = ((STATE.lbIdx-1)+STATE.lbPosters.length)%STATE.lbPosters.length; updateLightbox(); }
  if (e.key === 'ArrowRight') { STATE.lbIdx = (STATE.lbIdx+1)%STATE.lbPosters.length; updateLightbox(); }
});
// Touch swipe on lightbox
let lbTx = 0;
$('lightbox').addEventListener('touchstart', e => { lbTx = e.touches[0].clientX; }, { passive: true });
$('lightbox').addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - lbTx;
  if (Math.abs(dx) > 40) {
    STATE.lbIdx = ((STATE.lbIdx + (dx < 0 ? 1 : -1)) + STATE.lbPosters.length) % STATE.lbPosters.length;
    updateLightbox();
  }
});

/* ════════════════════════════════════════════════════════════════
   CART
════════════════════════════════════════════════════════════════ */
function addToCart(id) {
  const p = findProduct(id);
  if (!p) return;
  const existing = STATE.cart.find(item => item.product.id === id);
  if (existing) existing.qty++;
  else STATE.cart.push({ product: p, qty: 1 });
  renderCart();
  openCart();
}

function removeFromCart(id) {
  STATE.cart = STATE.cart.filter(item => item.product.id !== id);
  renderCart();
}

function updateQty(id, delta) {
  const item = STATE.cart.find(i => i.product.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else renderCart();
}

function renderCart() {
  const count = STATE.cart.reduce((s, i) => s + i.qty, 0);
  const countEl = $('yzCartCount');
  countEl.textContent = count;
  countEl.dataset.count = count;

  const body = $('cartBody');
  const footer = $('cartFooter');

  if (STATE.cart.length === 0) {
    body.innerHTML = '<p class="yz-cart-empty">Your cart is empty.</p>';
    footer.style.display = 'none';
    return;
  }

  let total = 0;
  body.innerHTML = STATE.cart.map(item => {
    const p = item.product;
    const price = priceNum(p.price);
    total += price * item.qty;
    const sizeKey = (p.line === 'hairoil' || p.line === 'serum') ? 'size' : 'qty';
    return `<div class="yz-cart-item">
      <img class="yz-cart-item-img" src="${getImg(p,'p-1')}" alt="${p.name}" loading="lazy" />
      <div>
        <div class="yz-cart-item-name">${p.name}</div>
        <div class="yz-cart-item-size">${p[sizeKey] || ''} · ${p.price}</div>
        <div class="yz-cart-item-qty">
          <button class="yz-qty-btn" data-action="dec" data-id="${p.id}">−</button>
          <span class="yz-qty-num">${item.qty}</span>
          <button class="yz-qty-btn" data-action="inc" data-id="${p.id}">+</button>
        </div>
      </div>
      <button class="yz-cart-item-remove" data-action="del" data-id="${p.id}" aria-label="Remove">×</button>
    </div>`;
  }).join('');

  body.addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const id = btn.dataset.id;
    if (btn.dataset.action === 'inc') updateQty(id, 1);
    if (btn.dataset.action === 'dec') updateQty(id, -1);
    if (btn.dataset.action === 'del') removeFromCart(id);
  }, { once: true });

  $('cartTotal').textContent = '$' + total.toFixed(2);
  footer.style.display = 'block';
}

function openCart() {
  $('cartDrawer').classList.add('open');
  $('cartOverlay').classList.add('open');
  $('cartDrawer').setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  $('cartDrawer').classList.remove('open');
  $('cartOverlay').classList.remove('open');
  $('cartDrawer').setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

$('yzCartBtn').addEventListener('click', openCart);
$('cartClose').addEventListener('click', closeCart);
$('cartOverlay').addEventListener('click', closeCart);

// Cart checkout → WhatsApp
$('cartCheckout').addEventListener('click', () => {
  if (STATE.cart.length === 0) return;
  let msg = '🛒 *New Order from Yaazh Website*\n\n';
  STATE.cart.forEach(item => {
    const p = item.product;
    const sizeKey = (p.line === 'hairoil' || p.line === 'serum') ? 'size' : 'qty';
    msg += `• ${p.name} (${p[sizeKey] || ''}) × ${item.qty} — ${p.price}\n`;
  });
  const total = STATE.cart.reduce((s, i) => s + priceNum(i.product.price) * i.qty, 0);
  msg += `\n*Total: $${total.toFixed(2)}*\n\nPlease let me know the delivery details.`;
  closeCart();
  waOpen(msg);
});

/* ════════════════════════════════════════════════════════════════
   ENQUIRY MODAL (Shop Now)
════════════════════════════════════════════════════════════════ */
function openEnquiry(product) {
  STATE.enquiryProduct = product;
  const sizeKey = (product.line === 'hairoil' || product.line === 'serum') ? 'size' : 'qty';
  $('enquiryProductName').textContent = product.name + (product[sizeKey] ? ' — ' + product[sizeKey] : '');
  ['enqName','enqMobile','enqPincode','enqEmail','enqLocation','enqAddress'].forEach(id => { $(id).value = ''; });

  $('enquiryOverlay').classList.add('open');
  $('enquiryModal').classList.add('open');
  $('enquiryModal').setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeEnquiry() {
  $('enquiryOverlay').classList.remove('open');
  $('enquiryModal').classList.remove('open');
  $('enquiryModal').setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

$('enquiryClose').addEventListener('click', closeEnquiry);
$('enquiryOverlay').addEventListener('click', closeEnquiry);

$('enquiryForm').addEventListener('submit', e => {
  e.preventDefault();
  const name     = $('enqName').value.trim();
  const mobile   = $('enqMobile').value.trim();
  const pincode  = $('enqPincode').value.trim();
  const email    = $('enqEmail').value.trim();
  const location = $('enqLocation').value.trim();
  const address  = $('enqAddress').value.trim();

  if (!name || !mobile || !location || !address || !pincode) {
    alert('Please fill in all required fields.');
    return;
  }

  const p = STATE.enquiryProduct;
  const sizeKey = (p.line === 'hairoil' || p.line === 'serum') ? 'size' : 'qty';
  const msg = `🌿 *New Order — Yaazh Organic*\n\n` +
    `*Product:* ${p.name}${p[sizeKey] ? ' (' + p[sizeKey] + ')' : ''}\n` +
    `*Price:* ${p.price}\n\n` +
    `*Customer Details:*\n` +
    `• Name: ${name}\n` +
    `• Mobile: ${mobile}\n` +
    (email ? `• Email: ${email}\n` : '') +
    `• Location: ${location}\n` +
    `• Address: ${address}\n` +
    `• Pincode: ${pincode}\n\n` +
    `Please confirm availability and shipping details. Thank you! 🙏`;

  closeEnquiry();
  waOpen(msg);
});

/* ════════════════════════════════════════════════════════════════
   CONTACT FORM → WhatsApp
════════════════════════════════════════════════════════════════ */
$('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const name    = $('ctName').value.trim();
  const mobile  = $('ctMobile').value.trim();
  const email   = $('ctEmail').value.trim();
  const product = $('ctProduct').value;
  const message = $('ctMessage').value.trim();

  if (!name || !mobile) {
    alert('Please enter your name and mobile number.');
    return;
  }

  const msg = `💬 *Enquiry from Yaazh Website*\n\n` +
    `• Name: ${name}\n` +
    `• Mobile: ${mobile}\n` +
    (email ? `• Email: ${email}\n` : '') +
    (product ? `• Interested In: ${product}\n` : '') +
    (message ? `• Message: ${message}\n` : '') +
    `\nPlease get back to me. Thank you!`;

  waOpen(msg);
});

/* ════════════════════════════════════════════════════════════════
   REVIEWS CAROUSEL
════════════════════════════════════════════════════════════════ */
function initReviews() {
  if (typeof YAAZH_REVIEWS === 'undefined') return;
  const track = $('reviewsTrack');
  const dotsWrap = $('revDots');
  const reviews = YAAZH_REVIEWS;

  // Render cards — show 3 at a time (desktop), handle via CSS flex
  track.innerHTML = reviews.map(r => {
    const initials = r.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    const stars = '★'.repeat(r.rating || 5) + '☆'.repeat(5 - (r.rating || 5));
    return `<div class="yz-review-card">
      <div class="yz-rev-stars">${stars}</div>
      <p class="yz-rev-quote">"${r.text || r.review || ''}"</p>
      <div class="yz-rev-meta">
        <div class="yz-rev-avatar">${initials}</div>
        <div>
          <div class="yz-rev-name">${r.name}</div>
          <div class="yz-rev-loc">${r.location || ''}</div>
        </div>
      </div>
    </div>`;
  }).join('');

  // Determine cards per page
  function cardsPerPage() {
    return window.innerWidth >= 900 ? 3 : window.innerWidth >= 600 ? 2 : 1;
  }

  const pages = () => Math.ceil(reviews.length / cardsPerPage());

  function buildDots() {
    dotsWrap.innerHTML = Array.from({ length: pages() }, (_, i) =>
      `<button class="yz-rev-dot${i === 0 ? ' active' : ''}" data-i="${i}" aria-label="Page ${i+1}"></button>`
    ).join('');
  }

  function goRev(idx) {
    const pp = pages();
    STATE.revIdx = ((idx % pp) + pp) % pp;
    const cpp = cardsPerPage();
    const offset = STATE.revIdx * cpp;
    const cardW = track.querySelector('.yz-review-card')?.offsetWidth || 0;
    const gap = 16;
    track.style.transform = `translateX(-${offset * (cardW + gap)}px)`;

    dotsWrap.querySelectorAll('.yz-rev-dot').forEach((d, i) => d.classList.toggle('active', i === STATE.revIdx));
    clearInterval(STATE.revTimer);
    STATE.revTimer = setInterval(() => goRev(STATE.revIdx + 1), 5000);
  }

  buildDots();
  window.addEventListener('resize', () => { buildDots(); goRev(0); });

  $('revPrev').addEventListener('click', () => goRev(STATE.revIdx - 1));
  $('revNext').addEventListener('click', () => goRev(STATE.revIdx + 1));
  dotsWrap.addEventListener('click', e => {
    const btn = e.target.closest('.yz-rev-dot');
    if (btn) goRev(+btn.dataset.i);
  });

  // Touch swipe
  let rtx = 0;
  track.addEventListener('touchstart', e => { rtx = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - rtx;
    if (Math.abs(dx) > 40) goRev(STATE.revIdx + (dx < 0 ? 1 : -1));
  });

  STATE.revTimer = setInterval(() => goRev(STATE.revIdx + 1), 5000);
}

/* ════════════════════════════════════════════════════════════════
   HERO "Explore Products" BUTTON
════════════════════════════════════════════════════════════════ */
$('heroShopBtn').addEventListener('click', () => {
  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
});

/* ════════════════════════════════════════════════════════════════
   HOME CATEGORY CARD CLICKS
════════════════════════════════════════════════════════════════ */
document.addEventListener('click', e => {
  // Only handle .yz-cat-card inside view-home (not subcat cards)
  const catCard = e.target.closest('.yz-cat-card');
  if (catCard && catCard.dataset.cat && document.getElementById('view-home').classList.contains('active')) {
    openCategory(catCard.dataset.cat);
  }
  // Sub-category card clicks (inside view-category)
  const subcatCard = e.target.closest('.yz-subcat-card');
  if (subcatCard && subcatCard.dataset.line) {
    openListing(subcatCard.dataset.cat, subcatCard.dataset.line);
  }
});

/* ════════════════════════════════════════════════════════════════
   SCROLL REVEAL
════════════════════════════════════════════════════════════════ */
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  $$('.reveal').forEach(el => obs.observe(el));
}

/* ════════════════════════════════════════════════════════════════
   CART COUNT BADGE
════════════════════════════════════════════════════════════════ */
function updateCartBadge() {
  const count = STATE.cart.reduce((s, i) => s + i.qty, 0);
  $('yzCartCount').textContent = count;
  $('yzCartCount').dataset.count = count;
}

/* ── BEFORE/AFTER SLIDER ─────────────────────────────────── */
// const baState = {};
// function baSlide(trackId, dotsId, dir) {
//   if (!baState[trackId]) baState[trackId] = 0;
//   const track = document.getElementById(trackId);
//   const dots  = document.getElementById(dotsId);
//   const total = track.children.length;
//   baState[trackId] = (baState[trackId] + dir + total) % total;
//   track.style.transform = `translateX(-${baState[trackId] * 100}%)`;
//   dots.querySelectorAll('.yz-ba-dot').forEach((d, i) =>
//     d.classList.toggle('active', i === baState[trackId])
//   );
// }

/* ── BEFORE/AFTER DRAG REVEAL SLIDER ────────────────────── */
function initRevealSlider(wrapperId) {
  const wrap   = document.getElementById(wrapperId);
  if (!wrap) return;
  const after  = wrap.querySelector('.yz-reveal-after');
  const handle = wrap.querySelector('.yz-reveal-handle');
  let dragging = false;

  function setPos(x) {
    const rect = wrap.getBoundingClientRect();
    let pct = ((x - rect.left) / rect.width) * 100;
    pct = Math.min(Math.max(pct, 2), 98);
    after.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    handle.style.left = pct + '%';
  }

  handle.addEventListener('mousedown',  () => dragging = true);
  handle.addEventListener('touchstart', () => dragging = true, { passive: true });
  window.addEventListener('mouseup',    () => dragging = false);
  window.addEventListener('touchend',   () => dragging = false);
  window.addEventListener('mousemove',  e => { if (dragging) setPos(e.clientX); });
  window.addEventListener('touchmove',  e => { if (dragging) setPos(e.touches[0].clientX); }, { passive: true });

  setPos(wrap.getBoundingClientRect().left + wrap.getBoundingClientRect().width * 0.5);
}

document.addEventListener('DOMContentLoaded', () => {
  initRevealSlider('baReveal1');
  initRevealSlider('baReveal2');
});

/* ════════════════════════════════════════════════════════════════
   INIT
════════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initHeroCarousel();
  initReviews();
  initReveal();
  renderCart();
});
