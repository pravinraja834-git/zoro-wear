// Sync products from localStorage if available
if (typeof products !== 'undefined') {
  try {
    const localProducts = localStorage.getItem('zw_products');
    if (localProducts) {
      const parsed = JSON.parse(localProducts);
      if (Array.isArray(parsed) && parsed.length > 0) {
        products.length = 0;
        products.push(...parsed);
      }
    }
  } catch (e) {
    console.error("Error loading products from localStorage:", e);
  }
}

const Store = {
  get(key) {
    try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; }
  },
  set(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
  },
  // CART
  getCart() { return this.get('zw_cart'); },
  setCart(c) { this.set('zw_cart', c); syncCartBadge(); },
  addToCart(product, size, qty = 1) {
    const cart = this.getCart();
    const idx = cart.findIndex(i => i.id === product.id && i.size === size);
    if (idx > -1) {
      cart[idx].qty += qty;
    } else {
      cart.push({ id: product.id, name: product.name, price: product.price,
        image: product.image, size, qty });
    }
    this.setCart(cart);
    showToast(`"${product.name}" added to cart 🛒`);
    addRecentlyViewed(product.id);
  },
  // WISHLIST
  getWishlist() { return this.get('zw_wish'); },
  setWishlist(w) { this.set('zw_wish', w); syncWishBadge(); },
  toggleWishlist(product) {
    const list = this.getWishlist();
    const idx = list.findIndex(i => i.id === product.id);
    if (idx > -1) {
      list.splice(idx, 1);
      showToast(`Removed from wishlist ♡`);
    } else {
      list.push({ id: product.id, name: product.name, price: product.price, image: product.image });
      showToast(`Added to wishlist ♥`);
    }
    this.setWishlist(list);
    return idx === -1;
  },
  inWishlist(id) { return this.getWishlist().some(i => i.id === id); },
  // RECENTLY VIEWED
  getRecent() { return this.get('zw_recent'); },
  addRecent(id) {
    let r = this.getRecent().filter(i => i !== id);
    r.unshift(id);
    this.set('zw_recent', r.slice(0, 10));
  },
  // DARK MODE
  getDark() { return localStorage.getItem('zw_dark') === '1'; },
  setDark(v) { localStorage.setItem('zw_dark', v ? '1' : '0'); }
};

function addRecentlyViewed(id) { Store.addRecent(id); }

/* =====================================================
   2. BADGE SYNC
   ===================================================== */
function syncCartBadge() {
  const badges = document.querySelectorAll('.cart-badge');
  const total = Store.getCart().reduce((a, i) => a + i.qty, 0);
  badges.forEach(b => { b.textContent = total; b.style.display = total ? 'flex' : 'none'; });
}
function syncWishBadge() {
  const badges = document.querySelectorAll('.wish-badge');
  const total = Store.getWishlist().length;
  badges.forEach(b => { b.textContent = total; b.style.display = total ? 'flex' : 'none'; });
}

/* =====================================================
   3. TOAST NOTIFICATIONS
   ===================================================== */
function showToast(msg, duration = 3000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    Object.assign(container.style, {
      position: 'fixed', bottom: '90px', left: '50%',
      transform: 'translateX(-50%)', zIndex: '9999',
      display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center'
    });
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.textContent = msg;
  Object.assign(toast.style, {
    background: '#0F0F0F', color: '#fff', padding: '14px 28px',
    borderRadius: '50px', fontSize: '0.85rem', fontFamily: 'Outfit, sans-serif',
    fontWeight: '500', boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    borderLeft: '3px solid #D4AF37', whiteSpace: 'nowrap',
    opacity: '0', transform: 'translateY(20px)',
    transition: 'opacity 0.3s ease, transform 0.3s ease'
  });
  container.appendChild(toast);
  requestAnimationFrame(() => { toast.style.opacity = '1'; toast.style.transform = 'translateY(0)'; });
  setTimeout(() => {
    toast.style.opacity = '0'; toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/* =====================================================
   4. PRELOADER
   ===================================================== */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  const fill = preloader.querySelector('.preloader-progress-fill');
  const pct  = preloader.querySelector('.preloader-percentage');
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 20;
    if (progress >= 100) { progress = 100; clearInterval(interval); }
    if (fill) fill.style.width = progress + '%';
    if (pct)  pct.textContent  = Math.floor(progress) + '%';
    if (progress === 100) {
      setTimeout(() => { preloader.classList.add('loaded'); }, 400);
    }
  }, 120);
}

/* =====================================================
   5. CUSTOM CURSOR
   ===================================================== */
function initCursor() {
  if (window.innerWidth <= 1024) return;
  const dot = document.createElement('div');
  dot.className = 'custom-cursor';
  const ring = document.createElement('div');
  ring.className = 'custom-cursor-follower';
  document.body.appendChild(dot); document.body.appendChild(ring);

  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
  document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

  (function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    dot.style.left  = mouseX + 'px'; dot.style.top = mouseY + 'px';
    ring.style.left = ringX  + 'px'; ring.style.top = ringY  + 'px';
    requestAnimationFrame(animateRing);
  })();

  document.querySelectorAll('a, button, [data-cursor-hover]').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('custom-cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('custom-cursor-hover'));
  });
}

/* =====================================================
   6. NAVBAR SCROLL EFFECT
   ===================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar-container');
  if (!navbar) return;
  const onScroll = () => {
    if (window.scrollY > 80) { navbar.classList.add('scrolled'); navbar.classList.remove('transparent'); }
    else { navbar.classList.remove('scrolled'); }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile hamburger
  const hamburger = document.querySelector('.hamburger-menu');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      hamburger.classList.remove('open'); mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }));
  }
}

/* =====================================================
   7. SCROLL PROGRESS BAR
   ===================================================== */
function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress-bar');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
  }, { passive: true });
}

/* =====================================================
   8. SCROLL REVEAL ANIMATIONS
   ===================================================== */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('active'), (entry.target.dataset.delay || 0));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => observer.observe(el));
}

/* =====================================================
   9. STATS COUNTER ANIMATION
   ===================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.stat-value[data-target]');
  if (!counters.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.target;
      const duration = 2000;
      let start = null;
      const step = timestamp => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        el.textContent = Math.floor(progress * target).toLocaleString();
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString();
      };
      requestAnimationFrame(step);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => obs.observe(c));
}

/* =====================================================
   10. COUNTDOWN TIMER
   ===================================================== */
function initCountdown() {
  const el = document.getElementById('countdown-timer');
  if (!el) return;
  const target = new Date();
  target.setDate(target.getDate() + 3);
  target.setHours(23, 59, 59, 0);

  function update() {
    const diff = target - Date.now();
    if (diff <= 0) { el.innerHTML = '<span>Drop ended</span>'; return; }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    el.querySelector('[data-unit="days"]').textContent    = String(d).padStart(2,'0');
    el.querySelector('[data-unit="hours"]').textContent   = String(h).padStart(2,'0');
    el.querySelector('[data-unit="minutes"]').textContent = String(m).padStart(2,'0');
    el.querySelector('[data-unit="seconds"]').textContent = String(s).padStart(2,'0');
  }
  update();
  setInterval(update, 1000);
}

/* =====================================================
   11. TYPING EFFECT
   ===================================================== */
function initTypingEffect() {
  const el = document.querySelector('[data-typing]');
  if (!el) return;
  const words = (el.dataset.typing || '').split('|');
  let wi = 0, ci = 0, deleting = false;
  const cursor = document.createElement('span');
  cursor.style.cssText = 'display:inline-block;width:2px;height:1em;background:#D4AF37;margin-left:2px;vertical-align:middle;animation:blink 1s step-end infinite;';
  el.after(cursor);

  const style = document.createElement('style');
  style.textContent = '@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}';
  document.head.appendChild(style);

  function type() {
    const word = words[wi % words.length];
    el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ++ci);
    if (!deleting && ci === word.length) { deleting = true; setTimeout(type, 1600); return; }
    if (deleting && ci === 0) { deleting = false; wi++; setTimeout(type, 400); return; }
    setTimeout(type, deleting ? 55 : 100);
  }
  type();
}

/* =====================================================
   12. REVIEWS SLIDER
   ===================================================== */
function initReviewsSlider() {
  const track = document.querySelector('.reviews-track');
  if (!track) return;
  const cards   = track.querySelectorAll('.review-card');
  const prevBtn = document.getElementById('rev-prev');
  const nextBtn = document.getElementById('rev-next');
  let idx = 0;
  const visible = () => window.innerWidth < 768 ? 1 : window.innerWidth < 1200 ? 2 : 3;

  function go(dir) {
    idx = Math.max(0, Math.min(idx + dir, cards.length - visible()));
    const cardW = cards[0].getBoundingClientRect().width + 30;
    track.style.transform = `translateX(-${idx * cardW}px)`;
  }
  prevBtn && prevBtn.addEventListener('click', () => go(-1));
  nextBtn && nextBtn.addEventListener('click', () => go(1));

  // Auto-slide every 5s
  let auto = setInterval(() => {
    if (idx >= cards.length - visible()) idx = -1;
    go(1);
  }, 5000);

  track.addEventListener('mouseenter', () => clearInterval(auto));
  track.addEventListener('mouseleave', () => {
    auto = setInterval(() => { if (idx >= cards.length - visible()) idx = -1; go(1); }, 5000);
  });

  // Touch swipe
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  });
}

/* =====================================================
   13. LOGO MARQUEE (brand logos scroll)
   ===================================================== */
function initLogoMarquee() { /* CSS animation handles this */ }

/* =====================================================
   14. CART DRAWER
   ===================================================== */
function openCartDrawer() {
  renderCartDrawer();
  document.getElementById('cart-drawer').classList.add('open');
  document.getElementById('drawer-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCartDrawer() {
  document.getElementById('cart-drawer').classList.remove('open');
  document.getElementById('drawer-overlay').classList.remove('open');
  document.body.style.overflow = '';
}
function renderCartDrawer() {
  const body = document.getElementById('cart-drawer-body');
  const footer = document.getElementById('cart-drawer-footer');
  if (!body) return;
  const cart = Store.getCart();
  if (!cart.length) {
    body.innerHTML = `<div class="drawer-empty">
      <svg viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 6h14M9 19a1 1 0 11-2 0 1 1 0 012 0zm10 0a1 1 0 11-2 0 1 1 0 012 0z"/></svg>
      <h3>Your cart is empty</h3><p>Add some premium pieces to your cart.</p>
      <a href="shop.html" class="btn btn-dark" onclick="closeCartDrawer()">Shop Now</a></div>`;
    if (footer) footer.style.display = 'none';
    return;
  }
  body.innerHTML = cart.map((item, i) => `
    <div class="drawer-item">
      <img src="${item.image}" alt="${item.name}" class="drawer-item-img" loading="lazy">
      <div class="drawer-item-info">
        <div class="drawer-item-title">${item.name}</div>
        <div class="drawer-item-meta">Size: ${item.size}</div>
        <div class="drawer-item-controls">
          <div class="quantity-control">
            <button class="qty-btn" onclick="cartQty(${i},-1)">−</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" onclick="cartQty(${i},1)">+</button>
          </div>
          <span class="drawer-item-price">₹${(item.price * item.qty).toLocaleString()}</span>
          <span class="remove-drawer-item" onclick="removeCartItem(${i})" title="Remove">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </span>
        </div>
      </div>
    </div>`).join('');
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  if (footer) {
    footer.style.display = 'block';
    footer.innerHTML = `
      <div class="drawer-total-row">
        <span class="drawer-total-label">Total</span>
        <span class="drawer-total-price">₹${total.toLocaleString()}</span>
      </div>
      <button class="btn btn-dark" style="width:100%;justify-content:center;" onclick="openCheckoutModal()">
        Checkout via WhatsApp
      </button>`;
  }
}
function cartQty(idx, delta) {
  const cart = Store.getCart();
  cart[idx].qty = Math.max(1, cart[idx].qty + delta);
  Store.setCart(cart);
  renderCartDrawer();
}
function removeCartItem(idx) {
  const cart = Store.getCart();
  cart.splice(idx, 1);
  Store.setCart(cart);
  renderCartDrawer();
}

/* =====================================================
   15. WISHLIST DRAWER
   ===================================================== */
function openWishDrawer() {
  renderWishDrawer();
  document.getElementById('wish-drawer').classList.add('open');
  document.getElementById('drawer-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeWishDrawer() {
  document.getElementById('wish-drawer').classList.remove('open');
  document.getElementById('drawer-overlay').classList.remove('open');
  document.body.style.overflow = '';
}
function renderWishDrawer() {
  const body = document.getElementById('wish-drawer-body');
  if (!body) return;
  const list = Store.getWishlist();
  if (!list.length) {
    body.innerHTML = `<div class="drawer-empty">
      <svg viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke="currentColor"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
      <h3>Wishlist is empty</h3><p>Heart the pieces you love.</p></div>`;
    return;
  }
  body.innerHTML = list.map((item, i) => `
    <div class="drawer-item">
      <img src="${item.image}" alt="${item.name}" class="drawer-item-img" loading="lazy">
      <div class="drawer-item-info">
        <div class="drawer-item-title">${item.name}</div>
        <div class="drawer-item-price" style="margin-top:6px;">₹${item.price.toLocaleString()}</div>
        <div class="drawer-item-controls" style="margin-top:auto;">
          <button class="btn btn-dark" style="padding:10px 18px;font-size:0.75rem;" onclick="moveToCart('${item.id}')">Add to Cart</button>
          <span class="remove-drawer-item" onclick="removeWishItem(${i})" title="Remove">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </span>
        </div>
      </div>
    </div>`).join('');
}
function removeWishItem(idx) {
  const list = Store.getWishlist();
  list.splice(idx, 1); Store.setWishlist(list); renderWishDrawer();
}
function moveToCart(id) {
  const p = typeof products !== 'undefined' ? products.find(x => x.id === id) : null;
  if (p) { Store.addToCart(p, p.sizes[0]); }
  removeWishItem(Store.getWishlist().findIndex(x => x.id === id));
}

/* =====================================================
   16. PRODUCT QUICK VIEW MODAL
   ===================================================== */
let qvSelectedSize = '', qvSelectedQty = 1;

function openQuickView(productId) {
  const p = typeof products !== 'undefined' ? products.find(x => x.id === productId) : null;
  if (!p) return;
  addRecentlyViewed(p.id);
  qvSelectedSize = p.sizes[0] || '';
  qvSelectedQty  = 1;

  const stars = buildStars(p.rating);
  const thumbs = p.images.map((src, i) =>
    `<div class="quickview-thumb ${i===0?'active':''}" onclick="qvThumb(this,'${src}')">
       <img src="${src}" alt="thumb ${i+1}" loading="lazy"></div>`).join('');

  const sizes = p.sizes.map(s =>
    `<button class="quickview-size-btn ${s===qvSelectedSize?'selected':''}" onclick="qvSize(this,'${s}')">${s}</button>`).join('');

  const features = (p.features || []).map(f =>
    `<li><svg viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>${f}</li>`).join('');

  const stockLbl = p.inStock
    ? `<span class="in">${p.stockCount <= 5 ? 'Only ' + p.stockCount + ' left!' : 'In Stock'}</span>`
    : `<span class="low">Out of Stock</span>`;

  document.getElementById('quickview-content').innerHTML = `
    <div class="quickview-layout">
      <div class="quickview-gallery">
        <div class="quickview-main-img-wrapper">
          <img id="qv-main-img" src="${p.images[0]}" alt="${p.name}">
        </div>
        <div class="quickview-thumbs-row">${thumbs}</div>
      </div>
      <div class="quickview-details">
        <span class="quickview-tag">${p.tag}</span>
        <h2 class="quickview-title">${p.name}</h2>
        <div class="quickview-price-rating">
          <div style="display:flex;flex-direction:column;gap:3px;">
            <span class="quickview-price-val">₹${p.price.toLocaleString()}</span>
            ${p.originalPrice && p.originalPrice > p.price ? `<span style="font-size:0.85rem;color:#777;text-decoration:line-through;">₹${p.originalPrice.toLocaleString()} <span style="color:var(--gold);font-size:0.8rem;text-decoration:none;font-weight:600;">${Math.round((p.originalPrice - p.price) / p.originalPrice * 100)}% OFF</span></span>` : ''}
          </div>
          <div class="product-rating">${stars}<span class="rating-number">(${p.rating})</span></div>
        </div>
        <p class="quickview-desc">${p.description}</p>
        <ul class="quickview-features-list">${features}</ul>
        <div class="quickview-size-selector-wrap">
          <div class="quickview-size-header">
            <span class="quickview-size-lbl">Select Size</span>
          </div>
          <div class="quickview-sizes-grid">${sizes}</div>
        </div>
        <div class="quickview-actions-row">
          <div class="quantity-control" style="padding:5px;">
            <button class="qty-btn" onclick="qvQty(-1)">−</button>
            <span class="qty-val" id="qv-qty">1</span>
            <button class="qty-btn" onclick="qvQty(1)">+</button>
          </div>
          ${p.inStock
            ? `<button class="btn btn-dark" onclick="qvAddCart('${p.id}')">Add to Cart</button>
               <button class="btn btn-primary" onclick="qvBuyNow('${p.id}')" style="color:#0F0F0F;">Buy Now</button>`
            : `<button class="btn" style="background:#ccc;color:#666;cursor:not-allowed;flex-grow:1;" disabled>Out of Stock</button>`}
        </div>
        <div class="quickview-stock-lbl">Stock Status: ${stockLbl}</div>
      </div>
    </div>`;

  document.getElementById('quickview-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function qvThumb(el, src) {
  document.querySelectorAll('.quickview-thumb').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('qv-main-img').src = src;
}
function qvSize(el, size) {
  document.querySelectorAll('.quickview-size-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  qvSelectedSize = size;
}
function qvQty(delta) {
  qvSelectedQty = Math.max(1, qvSelectedQty + delta);
  document.getElementById('qv-qty').textContent = qvSelectedQty;
}
function qvAddCart(id) {
  const p = typeof products !== 'undefined' ? products.find(x => x.id === id) : null;
  if (!p) return;
  if (!qvSelectedSize) { showToast('Please select a size'); return; }
  Store.addToCart(p, qvSelectedSize, qvSelectedQty);
}
function qvBuyNow(id) {
  const p = typeof products !== 'undefined' ? products.find(x => x.id === id) : null;
  if (!p) return;
  if (!qvSelectedSize) { showToast('Please select a size'); return; }
  openOrderModal(p, qvSelectedSize, qvSelectedQty);
}
function closeQuickView() {
  document.getElementById('quickview-modal').classList.remove('open');
  document.body.style.overflow = '';
}

/* =====================================================
   17. ORDER / CHECKOUT MODAL (WhatsApp)
   ===================================================== */
let orderProduct = null, orderSize = '', orderQty = 1;

function openOrderModal(product, size, qty) {
  orderProduct = product;
  orderSize = size;
  orderQty = qty;
  const m = document.getElementById('order-modal');
  if (!m) return;
  const total = product.price * qty;
  document.getElementById('order-modal-content').innerHTML = `
    <div class="checkout-modal-layout">
      <h2>Complete Your Order</h2>
      <p class="subtitle">We'll send your order details directly to our WhatsApp. Fast & easy.</p>
      <div class="checkout-summary-box">
        <div class="checkout-summary-title">Order Summary</div>
        <div class="checkout-summary-item"><span class="lbl">Product</span><span class="val">${product.name}</span></div>
        <div class="checkout-summary-item"><span class="lbl">Size</span><span class="val">${size}</span></div>
        <div class="checkout-summary-item"><span class="lbl">Quantity</span><span class="val">${qty}</span></div>
        <div class="checkout-summary-item"><span class="lbl">Unit Price</span><span class="val">₹${product.price.toLocaleString()}</span></div>
        <div class="checkout-summary-total"><span>Total</span><span>₹${total.toLocaleString()}</span></div>
      </div>
      <form id="order-form" onsubmit="submitOrder(event)">
        <div class="checkout-form-grid">
          <div class="form-group">
            <label for="order-name">Full Name *</label>
            <input id="order-name" class="form-input" type="text" placeholder="Your name" required>
          </div>
          <div class="form-group">
            <label for="order-phone">Phone Number *</label>
            <input id="order-phone" class="form-input" type="tel" placeholder="+91 XXXXX XXXXX" required>
          </div>
          <div class="form-group full-width">
            <label for="order-address">Delivery Address *</label>
            <textarea id="order-address" class="form-input" rows="3" placeholder="Full delivery address with PIN code" required></textarea>
          </div>
        </div>
        <div class="checkout-actions-row">
          <button type="submit" class="btn btn-dark" style="gap:10px;padding:18px 40px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.025.507 3.934 1.399 5.61L0 24l6.554-1.376A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.805 9.805 0 01-5.032-1.387l-.36-.214-3.889.816.825-3.773-.235-.375A9.81 9.81 0 012.182 12c0-5.423 4.414-9.818 9.818-9.818 5.423 0 9.818 4.395 9.818 9.818 0 5.424-4.395 9.818-9.818 9.818z"/></svg>
            Confirm via WhatsApp
          </button>
        </div>
      </form>
    </div>`;
  closeQuickView();
  m.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function openCartCheckout() {
  const cart = Store.getCart();
  if (!cart.length) { showToast('Your cart is empty'); return; }
  const lines = cart.map(i => `  • ${i.name} (Size: ${i.size}) x${i.qty} = ₹${(i.price*i.qty).toLocaleString()}`).join('%0A');
  const total = cart.reduce((s,i) => s + i.price*i.qty, 0);
  const m = document.getElementById('order-modal');
  if (!m) return;
  document.getElementById('order-modal-content').innerHTML = `
    <div class="checkout-modal-layout">
      <h2>Complete Your Order</h2>
      <p class="subtitle">Fill in your details and we'll confirm via WhatsApp.</p>
      <form id="order-form" onsubmit="submitCartOrder(event,'${encodeURIComponent(lines)}','${total}')">
        <div class="checkout-form-grid">
          <div class="form-group">
            <label for="order-name2">Full Name *</label>
            <input id="order-name2" class="form-input" type="text" placeholder="Your name" required>
          </div>
          <div class="form-group">
            <label for="order-phone2">Phone Number *</label>
            <input id="order-phone2" class="form-input" type="tel" placeholder="+91 XXXXX XXXXX" required>
          </div>
          <div class="form-group full-width">
            <label for="order-address2">Delivery Address *</label>
            <textarea id="order-address2" class="form-input" rows="3" placeholder="Full delivery address with PIN code" required></textarea>
          </div>
        </div>
        <div class="checkout-actions-row">
          <button type="submit" class="btn btn-dark" style="gap:10px;padding:18px 40px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.025.507 3.934 1.399 5.61L0 24l6.554-1.376A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.805 9.805 0 01-5.032-1.387l-.36-.214-3.889.816.825-3.773-.235-.375A9.81 9.81 0 012.182 12c0-5.423 4.414-9.818 9.818-9.818 5.423 0 9.818 4.395 9.818 9.818 0 5.424-4.395 9.818-9.818 9.818z"/></svg>
            Confirm via WhatsApp
          </button>
        </div>
      </form>
    </div>`;
  closeCartDrawer();
  m.classList.add('open');
  document.body.style.overflow = 'hidden';
}
window.openCheckoutModal = openCartCheckout;

function submitOrder(e) {
  e.preventDefault();
  const name    = document.getElementById('order-name').value.trim();
  const phone   = document.getElementById('order-phone').value.trim();
  const address = document.getElementById('order-address').value.trim();
  if (!name || !phone || !address) { showToast('Please fill all fields'); return; }

  const msg = `Hello ZORO Wear,%0A%0AI want to order:%0A%0A` +
    `Product: ${encodeURIComponent(orderProduct.name)}%0A` +
    `Size: ${orderSize}%0A` +
    `Quantity: ${orderQty}%0A` +
    `Price: ₹${(orderProduct.price * orderQty).toLocaleString()}%0A%0A` +
    `Name: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0A` +
    `Address: ${encodeURIComponent(address)}%0A%0APlease confirm my order.`;

  window.open(`https://wa.me/916379956323?text=${msg}`, '_blank');
  closeOrderModal();
}

function submitCartOrder(e, lines, total) {
  e.preventDefault();
  const name    = document.getElementById('order-name2').value.trim();
  const phone   = document.getElementById('order-phone2').value.trim();
  const address = document.getElementById('order-address2').value.trim();

  const msg = `Hello ZORO Wear,%0A%0AI want to order:%0A%0A${lines}%0A%0A` +
    `Total: ₹${(+total).toLocaleString()}%0A%0A` +
    `Name: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0A` +
    `Address: ${encodeURIComponent(address)}%0A%0APlease confirm my order.`;

  window.open(`https://wa.me/916379956323?text=${msg}`, '_blank');
  closeOrderModal();
}

function closeOrderModal() {
  document.getElementById('order-modal').classList.remove('open');
  document.body.style.overflow = '';
}

/* =====================================================
   18. FLOATING ACTIONS
   ===================================================== */
function initFloatingActions() {
  const backTop = document.getElementById('back-top-btn');
  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
}

/* =====================================================
   19. DARK MODE
   ===================================================== */
function initDarkMode() {
  const isDark = Store.getDark();
  if (isDark) document.body.classList.add('dark-mode');
  document.querySelectorAll('.dark-mode-toggle').forEach(btn => {
    updateDarkIcon(btn, isDark);
    btn.addEventListener('click', () => {
      const nowDark = document.body.classList.toggle('dark-mode');
      Store.setDark(nowDark);
      document.querySelectorAll('.dark-mode-toggle').forEach(b => updateDarkIcon(b, nowDark));
    });
  });
}
function updateDarkIcon(btn, isDark) {
  btn.innerHTML = isDark
    ? `<svg viewBox="0 0 24 24" width="20" height="20"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
    : `<svg viewBox="0 0 24 24" width="20" height="20"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`;
  btn.querySelector('svg').style.cssText = 'fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;';
}

/* =====================================================
   20. RIPPLE BUTTON EFFECT
   ===================================================== */
function initRipple() {
  document.querySelectorAll('.btn-ripple, .btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        position:absolute;width:${size}px;height:${size}px;
        border-radius:50%;background:rgba(255,255,255,0.25);
        left:${e.clientX - rect.left - size/2}px;
        top:${e.clientY - rect.top - size/2}px;
        transform:scale(0);animation:rippleAnim 0.6s linear;pointer-events:none;`;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });
  const style = document.createElement('style');
  style.textContent = '@keyframes rippleAnim{to{transform:scale(4);opacity:0}}';
  document.head.appendChild(style);
}

/* =====================================================
   21. GLOW MOUSE TRACKING on cards
   ===================================================== */
function initGlowCards() {
  document.querySelectorAll('.glow-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
      card.style.setProperty('--mouse-y', (e.clientY - rect.top)  + 'px');
    });
  });
}

/* =====================================================
   22. PRODUCT GRID RENDERING (for shop/home pages)
   ===================================================== */
function buildStars(rating) {
  return `<div class="stars-list">${[1,2,3,4,5].map(i =>
    `<svg viewBox="0 0 24 24" class="${i<=Math.round(rating)?'filled':''}"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
  ).join('')}</div>`;
}

function buildProductCard(p) {
  const inWish = Store.inWishlist(p.id);
  return `
    <div class="product-card ${!p.inStock ? 'out-of-stock' : ''} glow-card reveal reveal-fade-up" data-id="${p.id}">
      <div class="product-img-wrapper" onclick="openQuickView('${p.id}')">
        <img src="${p.image}"      alt="${p.name}" class="product-card-img main-img"  loading="lazy">
        <img src="${p.hoverImage}" alt="${p.name}" class="product-card-img hover-img" loading="lazy">
        <div class="product-badge ${['BEST SELLER','NEW DROP','LIMITED EDITION'].includes(p.tag)?'gold':''}">${p.tag}</div>
        <div class="wishlist-heart ${inWish?'active':''}" onclick="event.stopPropagation();toggleWish(this,'${p.id}')">
          <svg viewBox="0 0 24 24" width="16" height="16"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
        </div>
        <div class="product-quick-view-overlay">
          <button class="quick-view-btn" onclick="event.stopPropagation();openQuickView('${p.id}')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            Quick View
          </button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-category-text">${p.category}</div>
        <div class="product-name-title">${p.name}</div>
        <div class="product-rating">${buildStars(p.rating)}<span class="rating-number">${p.rating}</span></div>
        <div class="product-sizes-badges">${p.sizes.slice(0,4).map(s=>`<span class="size-badge">${s}</span>`).join('')}</div>
        <div class="product-price-row">
          <div style="display:flex;flex-direction:column;gap:2px;">
            <span class="product-price-val">₹${p.price.toLocaleString()}</span>
            ${p.originalPrice && p.originalPrice > p.price ? `<span style="font-size:0.75rem;color:#777;text-decoration:line-through;">₹${p.originalPrice.toLocaleString()}</span>` : ''}
          </div>
          <button class="add-cart-btn-icon" ${!p.inStock?'disabled':''} onclick="${p.inStock?`Store.addToCart(products.find(x=>x.id==='${p.id}'),'${p.sizes[0]}')`:''}" title="Add to Cart">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          </button>
        </div>
      </div>
    </div>`;
}

function toggleWish(el, id) {
  const p = typeof products !== 'undefined' ? products.find(x => x.id === id) : null;
  if (!p) return;
  const added = Store.toggleWishlist(p);
  el.classList.toggle('active', added);
}

/* =====================================================
   23. NEWSLETTER FORM
   ===================================================== */
function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = form.querySelector('input');
    if (!input.value.trim()) { showToast('Please enter your email'); return; }
    showToast('🎉 You\'re subscribed! Exclusive drops coming your way.');
    input.value = '';
  });
}

/* =====================================================
   24. CONTACT FORM
   ===================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    showToast('✅ Message sent! We\'ll respond within 24 hours.');
    form.reset();
  });
}

/* =====================================================
   25. SHOP PAGE — FILTERS, SEARCH, SORT
   ===================================================== */
function initShopPage() {
  if (!document.getElementById('shop-grid')) return;
  const grid = document.getElementById('shop-grid');
  const resultsCount = document.getElementById('results-count');
  let activeCategories = [];
  let activeSortOrder  = 'featured';
  let searchQuery      = '';
  let priceMax         = 5000;

  // Read URL param for pre-filtered category
  const urlCat = new URLSearchParams(window.location.search).get('category');
  if (urlCat) {
    activeCategories = [urlCat];
    // Pre-check sidebar checkbox
    setTimeout(() => {
      document.querySelectorAll('.filter-cat-cb').forEach(cb => {
        if (cb.value === urlCat) cb.checked = true;
      });
    }, 100);
  }

  function renderGrid() {
    if (typeof products === 'undefined') return;
    let filtered = products.filter(p => {
      const catOk  = !activeCategories.length || activeCategories.includes(p.category);
      const priceOk = p.price <= priceMax;
      const searchOk = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase())
                        || p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return catOk && priceOk && searchOk;
    });
    if (activeSortOrder === 'price-asc')  filtered.sort((a,b) => a.price - b.price);
    if (activeSortOrder === 'price-desc') filtered.sort((a,b) => b.price - a.price);
    if (activeSortOrder === 'rating')     filtered.sort((a,b) => b.rating - a.rating);
    if (resultsCount) resultsCount.textContent = filtered.length + ' products';
    grid.innerHTML = filtered.length
      ? filtered.map(buildProductCard).join('')
      : `<div class="empty-shop-state" style="grid-column:1/-1">
           <svg viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke="currentColor"><path d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
           <h3>No products found</h3>
           <p>Try adjusting your filters or search term.</p>
           <button class="btn btn-dark" onclick="resetFilters()">Clear Filters</button>
         </div>`;
    initScrollReveal();
    initGlowCards();
  }

  // Category filter checkboxes
  document.querySelectorAll('.filter-cat-cb').forEach(cb => {
    cb.addEventListener('change', () => {
      activeCategories = [...document.querySelectorAll('.filter-cat-cb:checked')].map(c => c.value);
      renderGrid();
    });
  });

  // Sorting
  const sortSel = document.getElementById('sort-select');
  if (sortSel) sortSel.addEventListener('change', e => { activeSortOrder = e.target.value; renderGrid(); });

  // Search
  const searchInput = document.getElementById('shop-search');
  if (searchInput) {
    searchInput.addEventListener('input', e => { searchQuery = e.target.value; renderGrid(); });
  }

  // Price slider
  const priceSlider = document.getElementById('price-slider');
  if (priceSlider) {
    priceSlider.addEventListener('input', e => {
      priceMax = +e.target.value;
      const label = document.getElementById('price-max-label');
      if (label) label.textContent = '₹' + priceMax.toLocaleString();
      renderGrid();
    });
  }

  window.resetFilters = function() {
    activeCategories = []; activeSortOrder = 'featured'; searchQuery = ''; priceMax = 5000;
    if (sortSel)    sortSel.value = 'featured';
    if (searchInput) searchInput.value = '';
    if (priceSlider) priceSlider.value = 5000;
    document.querySelectorAll('.filter-cat-cb').forEach(cb => cb.checked = false);
    renderGrid();
  };

  renderGrid();
}

/* =====================================================
   26. HOME PAGE RENDERS
   ===================================================== */
function initHomePage() {
  // Best sellers (top 4 by rating)
  const bsGrid = document.getElementById('best-sellers-grid');
  if (bsGrid && typeof products !== 'undefined') {
    const top = [...products].sort((a,b) => b.rating - a.rating).slice(0,4);
    bsGrid.innerHTML = top.map(buildProductCard).join('');
  }

  // New arrivals grid
  const naGrid = document.getElementById('new-arrivals-grid');
  if (naGrid && typeof products !== 'undefined') {
    const newOnes = products.filter(p => p.tag === 'NEW DROP').slice(0,4);
    naGrid.innerHTML = newOnes.map(buildProductCard).join('');
  }

  // Trending
  const trendGrid = document.getElementById('trending-grid');
  if (trendGrid && typeof products !== 'undefined') {
    trendGrid.innerHTML = products.slice(0,4).map(buildProductCard).join('');
  }
}

/* =====================================================
   27. GLOBAL INIT
   ===================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initCursor();
  initNavbar();
  initScrollProgress();
  initScrollReveal();
  initCounters();
  initCountdown();
  initTypingEffect();
  initReviewsSlider();
  initFloatingActions();
  initDarkMode();
  initRipple();
  initGlowCards();
  initNewsletter();
  initContactForm();
  initShopPage();
  initHomePage();
  syncCartBadge();
  syncWishBadge();

  // Close drawers/modals on overlay click
  const overlay = document.getElementById('drawer-overlay');
  if (overlay) overlay.addEventListener('click', () => {
    closeCartDrawer(); closeWishDrawer();
  });
  const qvModal = document.getElementById('quickview-modal');
  if (qvModal) qvModal.addEventListener('click', e => { if (e.target === qvModal) closeQuickView(); });
  const orderModal = document.getElementById('order-modal');
  if (orderModal) orderModal.addEventListener('click', e => { if (e.target === orderModal) closeOrderModal(); });

  // Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeQuickView(); closeOrderModal(); closeCartDrawer(); closeWishDrawer(); }
  });
});
