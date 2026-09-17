// ============================================================
// RAM MENS WEAR frontend client.
// Set window.RAM_API_BASE before this script when the API is hosted separately.
// ============================================================

const STORAGE_KEYS = {
  CURRENT_USER: 'seven_current_user',
  TOKEN: 'ram_auth_token'
};

const API_BASE = window.RAM_API_BASE || (window.location.protocol === 'file:'
  ? 'http://localhost:5000/api'
  : `${window.location.protocol}//${window.location.hostname}:5000/api`);

// Seed catalogue used the very first time the site runs.
// ============================================================
// RAM MENS WEAR - 350 PRODUCT CATALOGUE
// 50 Shirts + 50 Jeans + 50 T-Shirts + 50 Shoes
// + 50 Accessories + 50 Caps + 50 Bags
// ============================================================

const IMAGE_POOLS = {

  Shirts: [
    'https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?auto=format&fit=crop&w=700&q=80'
  ],

  Jeans: [
    'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1475178626620-a4d074967452?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=700&q=80'
  ],

  'T-Shirts': [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1583743814966-8936f37f4678?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=700&q=80'
  ],

  Shoes: [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=700&q=80'
  ],

  Accessories: [
    'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1585858229735-cd08d8cb989e?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&w=700&q=80'
  ],

  Caps: [
    'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?auto=format&fit=crop&w=700&q=80'
  ],

  Bags: [
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1556306535-38febf6782e7?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=700&q=80'
  ]
};


// ------------------------------------------------------------
// PRODUCT NAME LISTS - 50 EACH
// ------------------------------------------------------------

const PRODUCT_NAMES = {

  Shirts: [
    'Classic Oxford Shirt',
    'Premium Cotton Shirt',
    'Slim Fit Formal Shirt',
    'Urban Casual Shirt',
    'Premium Linen Shirt',
    'Classic Checked Shirt',
    'Modern Striped Shirt',
    'Executive Formal Shirt',
    'Royal Blue Shirt',
    'Black Premium Shirt',
    'White Classic Shirt',
    'Sky Blue Cotton Shirt',
    'Navy Casual Shirt',
    'Maroon Slim Shirt',
    'Olive Green Shirt',
    'Beige Linen Shirt',
    'Denim Casual Shirt',
    'Printed Casual Shirt',
    'Luxury Cotton Shirt',
    'Regular Fit Shirt',
    'Premium Party Shirt',
    'Smart Casual Shirt',
    'Business Formal Shirt',
    'Classic Half Sleeve Shirt',
    'Premium Full Sleeve Shirt',
    'Summer Cotton Shirt',
    'Designer Casual Shirt',
    'Comfort Fit Shirt',
    'Elegant White Shirt',
    'Premium Black Shirt',
    'Royal Check Shirt',
    'Street Style Shirt',
    'Vintage Cotton Shirt',
    'Soft Linen Shirt',
    'Daily Wear Shirt',
    'Premium Office Shirt',
    'Classic Pattern Shirt',
    'Fashion Fit Shirt',
    'Premium Printed Shirt',
    'Weekend Casual Shirt',
    'Modern Fit Shirt',
    'Luxury Formal Shirt',
    'Classic Blue shirt',
    'Premium Grey Shirt',
'Stylish Maroon Shirt',
'Comfort Cotton Shirt',
'Urban Check Shirt',
'Premium Navy Shirt',
'Signature Formal Shirt',
'Premium Oxford Casual Shirt'
],


  Jeans: [
    'Classic Blue Jeans',
    'Slim Fit Denim Jeans',
    'Regular Fit Jeans',
    'Premium Black Jeans',
    'Dark Blue Denim',
    'Light Wash Jeans',
    'Stretch Denim Jeans',
    'Comfort Fit Jeans',
    'Urban Slim Jeans',
    'Classic Straight Jeans',
    'Ripped Style Jeans',
    'Premium Stretch Jeans',
    'Vintage Wash Jeans',
    'Stone Wash Jeans',
    'Mid Blue Jeans',
    'Deep Indigo Jeans',
    'Black Stretch Jeans',
    'Fashion Denim Jeans',
    'Casual Fit Jeans',
    'Street Style Jeans',
    'Premium Denim Pants',
    'Modern Slim Jeans',
    'Relaxed Fit Jeans',
    'Classic Denim Pants',
    'Urban Blue Jeans',
    'Dark Wash Jeans',
    'Light Blue Jeans',
    'Premium Ripped Jeans',
    'Comfort Denim Jeans',
    'Everyday Blue Jeans',
    'Signature Denim Jeans',
    'Modern Straight Jeans',
    'Classic Black Denim',
    'Premium Indigo Jeans',
    'Stylish Slim Denim',
    'Weekend Denim Jeans',
    'Luxury Stretch Jeans',
    'Classic Fit Denim',
    'Urban Ripped Jeans',
    'Premium Casual Jeans',
    'Designer Denim Jeans',
    'Modern Blue Denim',
    'Classic Dark Jeans',
    'Premium Wash Jeans',
    'Smart Casual Jeans',
    'Fashion Slim Jeans',
    'Everyday Denim Jeans',
    'Premium Straight Jeans',
    'Signature Blue Denim',
    'Elite Denim Jeans'
  ],

  'T-Shirts': [
    'Premium Cotton T-Shirt',
    'Classic Round Neck T-Shirt',
    'Oversized Black T-Shirt',
    'Premium White T-Shirt',
    'Urban Graphic T-Shirt',
    'Classic Polo T-Shirt',
    'Slim Fit T-Shirt',
    'Heavy Cotton T-Shirt',
    'Streetwear T-Shirt',
    'Premium Printed T-Shirt',
    'Minimal Black T-Shirt',
    'Essential White T-Shirt',
    'Navy Blue T-Shirt',
    'Maroon Cotton T-Shirt',
    'Olive Green T-Shirt',
    'Grey Premium T-Shirt',
    'Oversized Graphic Tee',
    'Luxury Cotton Tee',
    'Casual Polo T-Shirt',
    'Summer Cotton Tee',
    'Premium Sports T-Shirt',
    'Daily Wear T-Shirt',
    'Comfort Fit T-Shirt',
    'Modern Graphic Tee',
    'Signature Polo T-Shirt',
    'Classic Black Tee',
    'Premium Navy Tee',
    'Urban Printed Tee',
    'Fashion Oversized Tee',
    'Soft Cotton T-Shirt',
    'Premium Striped T-Shirt',
    'Casual Round Neck Tee',
    'Street Fashion Tee',
    'Classic Logo T-Shirt',
    'Premium Half Sleeve Tee',
    'Modern Fit T-Shirt',
    'Weekend Casual Tee',
    'Luxury Polo Tee',
    'Premium V-Neck T-Shirt',
    'Classic V-Neck Tee',
    'Urban Cotton Tee',
    'Essential Grey T-Shirt',
    'Premium Maroon Tee',
    'Designer Graphic Tee',
    'Comfort Cotton Tee',
    'Classic Blue T-Shirt',
    'Premium Green Tee',
    'Stylish Black Tee',
    'Signature Cotton T-Shirt',
    'Elite Oversized T-Shirt'
  ],

  Shoes: [
    'Premium Sports Shoes',
    'Classic Running Shoes',
    'Urban Sneakers',
    'Premium White Sneakers',
    'Black Street Sneakers',
    'Comfort Walking Shoes',
    'Performance Running Shoes',
    'Classic Casual Sneakers',
    'Modern Training Shoes',
    'Luxury Lifestyle Sneakers',
    'Premium Leather Sneakers',
    'Everyday Sports Shoes',
    'Lightweight Running Shoes',
    'Urban Fitness Shoes',
    'Classic Black Sneakers',
    'Premium Blue Sneakers',
    'Streetwear Sneakers',
    'Comfort Sports Shoes',
    'Designer Sneakers',
    'Premium Training Shoes',
    'Classic Canvas Shoes',
    'Modern Casual Shoes',
    'Premium Walking Shoes',
    'Signature Sneakers',
    'Elite Running Shoes',
    'Fashion Sports Shoes',
    'Daily Comfort Sneakers',
    'Premium Gym Shoes',
    'Urban Running Shoes',
    'Classic White Shoes',
    'Black Premium Sneakers',
    'Luxury Sports Sneakers',
    'Modern Street Shoes',
    'Comfort Trainer Shoes',
    'Premium Lifestyle Shoes',
    'Signature Running Shoes',
    'Elite Training Sneakers',
    'Classic Court Shoes',
    'Urban Casual Sneakers',
    'Premium Active Shoes',
    'Performance Sneakers',
    'Modern Fitness Shoes',
    'Classic Sport Sneakers',
    'Premium Flex Shoes',
    'Stylish Running Shoes',
    'Everyday Sneakers',
    'Luxury Casual Shoes',
    'Premium Street Sneakers',
    'Signature Sports Shoes',
    'Elite Urban Sneakers'
  ],

  Accessories: [
    'Classic Leather Belt',
    'Premium Leather Wallet',
    'Luxury Analog Watch',
    'Leather Smart Watch',
    'Premium Sunglasses',
    'Classic Metal Watch',
    'Urban Wallet',
    'Premium Card Holder',
    'Classic Tie',
    'Premium Cufflinks',
    'Leather Bracelet',
    'Minimalist Watch',
    'Fashion Sunglasses',
    'Premium Key Holder',
    'Classic Money Clip',
    'Executive Wallet',
    'Urban Wrist Watch',
    'Premium Leather Bracelet',
    'Designer Sunglasses',
    'Classic Formal Tie',
    'Luxury Wallet',
    'Premium Watch',
    'Classic Belt',
    'Smart Casual Watch',
    'Urban Metal Bracelet',
    'Premium Tie Set',
    'Executive Card Holder',
    'Classic Sunglasses',
    'Leather Key Chain',
    'Premium Accessories Set',
    'Modern Wrist Watch',
    'Classic Wallet',
    'Luxury Leather Belt',
    'Fashion Bracelet',
    'Premium Metal Watch',
    'Urban Sunglasses',
    'Signature Leather Wallet',
    'Classic Cufflinks Set',
    'Premium Key Case',
    'Executive Tie',
    'Modern Leather Belt',
    'Designer Wallet',
    'Premium Bracelet',
    'Classic Watch',
    'Luxury Sunglasses',
    'Urban Leather Wallet',
    'Premium Money Clip',
    'Signature Watch',
    'Elite Leather Belt',
    'Elite Accessories Set'
  ],

  Caps: [
    'Classic Black Cap',
    'Premium Baseball Cap',
    'Urban Snapback Cap',
    'Classic Navy Cap',
    'Premium Cotton Cap',
    'Street Style Cap',
    'Logo Baseball Cap',
    'Fashion Snapback',
    'Classic White Cap',
    'Premium Sports Cap',
    'Urban Black Cap',
    'Minimal Cotton Cap',
    'Classic Grey Cap',
    'Premium Trucker Cap',
    'Designer Snapback',
    'Casual Baseball Cap',
    'Premium Embroidered Cap',
    'Classic Green Cap',
    'Streetwear Cap',
    'Urban Logo Cap',
    'Luxury Sports Cap',
    'Modern Black Cap',
    'Premium Denim Cap',
    'Classic Red Cap',
    'Signature Baseball Cap',
    'Elite Snapback Cap',
    'Premium Navy Snapback',
    'Fashion Cotton Cap',
    'Classic Brown Cap',
    'Urban Sports Cap',
    'Premium White Snapback',
    'Modern Trucker Cap',
    'Classic Blue Cap',
    'Designer Baseball Cap',
    'Premium Black Snapback',
    'Casual Cotton Cap',
    'Street Fashion Cap',
    'Signature Sports Cap',
    'Luxury Cotton Cap',
    'Classic Olive Cap',
    'Premium Logo Cap',
    'Urban Trucker Cap',
    'Fashion Baseball Cap',
    'Classic Maroon Cap',
    'Premium Street Cap',
    'Modern Snapback Cap',
    'Elite Sports Cap',
    'Signature Black Cap',
    'Premium Urban Cap',
    'Elite Fashion Cap'
  ],

  Bags: [
    'Urban Backpack',
    'Premium Laptop Bag',
    'Classic Travel Backpack',
    'Leather Office Bag',
    'Premium Sling Bag',
    'Urban Crossbody Bag',
    'Classic Messenger Bag',
    'Premium Duffel Bag',
    'Luxury Leather Bag',
    'Daily Travel Backpack',
    'Modern Laptop Backpack',
    'Premium Casual Backpack',
    'Classic Black Backpack',
    'Urban Grey Backpack',
    'Premium Gym Bag',
    'Executive Office Bag',
    'Fashion Sling Bag',
    'Classic Leather Backpack',
    'Premium Shoulder Bag',
    'Urban Travel Bag',
    'Modern Messenger Bag',
    'Luxury Laptop Bag',
    'Premium Weekender Bag',
    'Classic Canvas Backpack',
    'Signature Travel Backpack',
    'Elite Leather Bag',
    'Premium Black Sling',
    'Urban Business Bag',
    'Classic Work Backpack',
    'Premium Waterproof Backpack',
    'Modern Crossbody Bag',
    'Luxury Travel Backpack',
    'Premium Office Backpack',
    'Classic Brown Bag',
    'Urban Laptop Bag',
    'Fashion Travel Bag',
    'Premium Casual Sling',
    'Executive Leather Backpack',
    'Classic Messenger Backpack',
    'Modern Gym Bag',
    'Premium Weekend Bag',
    'Signature Office Bag',
    'Elite Travel Bag',
    'Urban Fashion Backpack',
    'Classic Shoulder Bag',
    'Premium Leather Backpack',
    'Modern Laptop Bag',
    'Luxury Duffel Bag',
    'Signature Backpack',
    'Elite Urban Bag'
  ]
};


// ------------------------------------------------------------
// GENERATE 350 PRODUCTS AUTOMATICALLY
// ------------------------------------------------------------

function generateProducts() {

  const products = [];
  let id = 1;

  const categories = [
    'Shirts',
    'Jeans',
    'T-Shirts',
    'Shoes',
    'Accessories',
    'Caps',
    'Bags'
  ];

  categories.forEach((category) => {

    PRODUCT_NAMES[category].forEach((name, index) => {

      let price;

      if (category === 'Shirts') {
        price = 799 + (index % 10) * 100;
      }

      if (category === 'Jeans') {
        price = 1199 + (index % 10) * 150;
      }

      if (category === 'T-Shirts') {
        price = 499 + (index % 10) * 80;
      }

      if (category === 'Shoes') {
        price = 1299 + (index % 10) * 200;
      }

      if (category === 'Accessories') {
        price = 399 + (index % 10) * 150;
      }

      if (category === 'Caps') {
        price = 349 + (index % 10) * 70;
      }

      if (category === 'Bags') {
        price = 899 + (index % 10) * 180;
      }

      const discount = 10 + (index % 5) * 5;
      const oldPrice = Math.round(price / (1 - discount / 100));

      const images = IMAGE_POOLS[category];

      let sizes = ['S', 'M', 'L', 'XL'];
      let colors = ['Black', 'White', 'Navy'];

      if (category === 'Jeans') {
        sizes = ['28', '30', '32', '34', '36'];
        colors = ['Blue', 'Black', 'Grey'];
      }

      if (category === 'Shoes') {
        sizes = ['6', '7', '8', '9', '10'];
        colors = ['Black', 'White', 'Blue'];
      }

      if (
        category === 'Accessories' ||
        category === 'Caps' ||
        category === 'Bags'
      ) {
        sizes = ['One Size'];
        colors = ['Black', 'Brown', 'Navy'];
      }

      products.push({
        id: id++,
        name: name,
        category: category,
        image: images[index % images.length],
        price: price,
        oldPrice: oldPrice,
        discountPercent: discount,
        rating: Number((4.1 + (index % 9) / 10).toFixed(1)),
        sizes: sizes,
        colors: colors,
        isAvailable: true
      });

    });

  });

  return products;
}


// IMPORTANT:
// This creates exactly 350 products.
const DEFAULT_PRODUCTS = generateProducts();

console.log('RAM MENS WEAR products loaded:', DEFAULT_PRODUCTS.length);
let PRODUCTS = [];
let cartItems = [];
let wishlistIds = [];

// ---------------- helpers & utilities ----------------

function escapeHtml(value) {
  return String(value || '').replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[char]));
}

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

async function apiRequest(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 401) clearSession();
    throw new Error(body.message || `Request failed (${response.status})`);
  }
  return body;
}

// ---------------- session / auth ----------------

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER) || 'null');
  } catch (error) {
    return null;
  }
}

function getToken() {
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
}

function setSession(user, token) {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
}

function clearSession() {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
}

function requireLogin(message = 'Please login to continue') {
  if (!getToken()) {
    showToast(message, 'warning');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 900);
    return false;
  }
  return true;
}

function showToast(message, type = 'success') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container-custom';
    document.body.appendChild(container);
  }

  const toastEl = document.createElement('div');
  toastEl.className = 'toast-custom';
  
  let iconHtml = '<i class="bi bi-check-circle-fill text-success fs-5"></i>';
  if (type === 'warning') {
    iconHtml = '<i class="bi bi-exclamation-circle-fill text-warning fs-5"></i>';
  } else if (type === 'danger') {
    iconHtml = '<i class="bi bi-x-circle-fill text-danger fs-5"></i>';
  } else if (type === 'info') {
    iconHtml = '<i class="bi bi-info-circle-fill text-info fs-5"></i>';
  }

  toastEl.innerHTML = `
    ${iconHtml}
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toastEl);
  setTimeout(() => {
    toastEl.style.opacity = '0';
    toastEl.style.transform = 'translateY(8px)';
    toastEl.style.transition = 'all 0.3s ease';
    setTimeout(() => toastEl.remove(), 300);
  }, 2400);
}

// ---------------- products ----------------

async function loadProducts() {
  PRODUCTS = await apiRequest('/products');
}

function getProductById(productId) {
  return PRODUCTS.find((product) => Number(product.id) === Number(productId));
}

// ---------------- cart (per logged-in user) ----------------

async function loadCart() {
  cartItems = getToken() ? await apiRequest('/cart') : [];
}

async function addToCart(productId, qty = 1, size = '', color = '') {
  if (!requireLogin('Please login to add items to your cart')) {
    return;
  }

  const product = getProductById(productId);
  if (!product) return;
  cartItems = await apiRequest('/cart', {
    method: 'POST',
    body: JSON.stringify({ productId, qty, size, color })
  });
  renderCartBadge();
  renderMiniCart(product);
  showToast(`${product.name} added to cart`, 'success');
}

async function removeFromCart(itemId) {
  cartItems = await apiRequest(`/cart/${encodeURIComponent(itemId)}`, { method: 'DELETE' });
  renderCartBadge();
  showToast('Item removed from cart', 'info');
}

async function updateQuantity(itemId, change) {
  cartItems = await apiRequest(`/cart/${encodeURIComponent(itemId)}`, {
    method: 'PUT',
    body: JSON.stringify({ change })
  });
  renderCartBadge();
}

function calculateCartTotal() {
  const subtotal = cartItems.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 1), 0);
  const storeSettings = readJSON('ram_store_settings', { freeDeliveryAbove: 3000 });
  const freeDeliveryAbove = Number(storeSettings.freeDeliveryAbove) || 3000;
  const delivery = subtotal > 0 ? (subtotal >= freeDeliveryAbove ? 0 : 99) : 0;
  
  const coupon = localStorage.getItem('ram_coupon') || '';
  let discount = 0;
  if (subtotal > 0) {
    discount = Math.round(subtotal * 0.08);
  }

  const total = Math.max(subtotal + delivery - discount, 0);
  const freeShippingRemaining = Math.max(0, freeDeliveryAbove - subtotal);
  const freeShippingPercent = Math.min(100, Math.round((subtotal / freeDeliveryAbove) * 100));

  return {
    subtotal,
    delivery,
    discount,
    total,
    freeDeliveryAbove,
    freeShippingRemaining,
    freeShippingPercent,
    coupon
  };
}

function renderCartBadge() {
  const badge = document.getElementById('cartBadge');
  if (!badge) return;
  const count = cartItems.reduce((sum, item) => sum + Number(item.qty || 0), 0);
  badge.textContent = count;
  badge.classList.toggle('d-none', count === 0);
}

function renderMiniCart(product) {
  let drawer = document.getElementById('miniCartDrawer');
  if (!drawer) {
    drawer = document.createElement('aside');
    drawer.id = 'miniCartDrawer';
    drawer.className = 'mini-cart-drawer';
    document.body.appendChild(drawer);
  }
  const totals = calculateCartTotal();
  drawer.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div><span class="eyebrow-label">JUST ADDED</span><h2 class="h6 fw-bold mb-0">Your bag <span class="text-muted fw-normal">(${cartItems.length})</span></h2></div>
      <button class="mini-cart-close" aria-label="Close bag preview"><i class="bi bi-x-lg"></i></button>
    </div>
    <div class="mini-cart-product">
      <img src="${product.image}" alt="${escapeHtml(product.name)}">
      <div class="min-width-0"><div class="fw-bold small text-truncate">${escapeHtml(product.name)}</div><div class="text-muted small">1 &times; ₹${Number(product.price).toLocaleString('en-IN')}</div></div>
      <i class="bi bi-check-circle-fill text-success ms-auto"></i>
    </div>
    <div class="d-flex justify-content-between small mt-3 mb-3"><span class="text-muted">Bag total</span><strong>₹${totals.total.toLocaleString('en-IN')}</strong></div>
    <a class="btn btn-brand w-100 btn-sm" href="cart.html">View bag & checkout <i class="bi bi-arrow-right"></i></a>
  `;
  requestAnimationFrame(() => drawer.classList.add('is-open'));
  drawer.querySelector('.mini-cart-close').addEventListener('click', () => drawer.classList.remove('is-open'));
  clearTimeout(window.miniCartTimer);
  window.miniCartTimer = setTimeout(() => drawer.classList.remove('is-open'), 5000);
}

// ---------------- wishlist ----------------

async function loadWishlist() {
  wishlistIds = getToken() ? await apiRequest('/wishlist') : [];
}

function isInWishlist(productId) {
  return wishlistIds.includes(Number(productId));
}

async function toggleWishlist(productId) {
  if (!requireLogin('Please login to use your wishlist')) {
    return null;
  }
  const id = Number(productId);
  wishlistIds = await apiRequest('/wishlist', {
    method: 'POST',
    body: JSON.stringify({ productId: Number(productId) })
  });
  return isInWishlist(id);
}

async function removeFromWishlist(productId) {
  wishlistIds = await apiRequest(`/wishlist/${Number(productId)}`, { method: 'DELETE' });
  showToast('Removed from wishlist', 'info');
}

// ---------------- auth / user state ----------------

function renderUserState() {
  const authNav = document.getElementById('authNavItem');
  if (!authNav) return;

  const currentUser = getCurrentUser();

  if (currentUser && currentUser.name) {
    authNav.innerHTML = `
      <div class="dropdown">
        <button class="user-dropdown-btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="bi bi-person-fill text-primary"></i>
          <span>${escapeHtml(currentUser.name.split(' ')[0])}</span>
        </button>
        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-custom">
          <li>
            <div class="px-3 py-2 border-bottom mb-1">
              <div class="fw-bold text-dark small">${escapeHtml(currentUser.name)}</div>
              <div class="text-muted small" style="font-size:0.75rem;">${escapeHtml(currentUser.email)}</div>
            </div>
          </li>
          <li><a class="dropdown-item" href="orders.html"><i class="bi bi-bag-check text-primary"></i> My Orders</a></li>
          <li><a class="dropdown-item" href="wishlist.html"><i class="bi bi-heart text-danger"></i> My Wishlist</a></li>
          ${currentUser.role === 'admin' ? '<li><a class="dropdown-item" href="admin.html"><i class="bi bi-speedometer2 text-info"></i> Admin Center</a></li>' : ''}
          <li><hr class="dropdown-divider my-1"></li>
          <li><a class="dropdown-item text-danger" href="#" id="logoutBtn"><i class="bi bi-box-arrow-right"></i> Sign Out</a></li>
        </ul>
      </div>
    `;

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (event) => {
        event.preventDefault();
        clearSession();
        showToast('Signed out successfully');
        setTimeout(() => { window.location.href = 'index.html'; }, 400);
      });
    }
  } else {
    authNav.innerHTML = `
      <a class="nav-link-custom" href="login.html" data-auth-link>
        <i class="bi bi-person"></i>
        <span>Sign In</span>
      </a>
    `;
  }
}

function setupLoginForms() {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const loginTab = document.getElementById('loginTab');
  const signupTab = null;

  if (loginTab && signupTab) {
    loginTab.addEventListener('click', () => {
      signupTab.classList.remove('active');
      loginTab.classList.add('active');
      document.getElementById('loginPane').classList.add('show', 'active');
      document.getElementById('signupPane').classList.remove('show', 'active');
    });

    signupTab.addEventListener('click', () => {
      loginTab.classList.remove('active');
      signupTab.classList.add('active');
      document.getElementById('signupPane').classList.add('show', 'active');
      document.getElementById('loginPane').classList.remove('show', 'active');
    });
  }

  // Password Visibility Toggle
  const togglePassBtns = document.querySelectorAll('.password-toggle-btn');
  togglePassBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const input = document.getElementById(targetId);
      if (input) {
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        btn.innerHTML = isPassword ? '<i class="bi bi-eye-slash"></i>' : '<i class="bi bi-eye"></i>';
      }
    });
  });

  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const email = document.getElementById('loginEmail').value.trim().toLowerCase();
      const password = document.getElementById('loginPassword').value.trim();

      if (!email || !password) {
        showToast('Please enter both email and password', 'warning');
        return;
      }

      const submitButton = loginForm.querySelector('button[type="submit"]');
      if (submitButton) submitButton.disabled = true;
      try {
        const result = await apiRequest('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password })
        });
        setSession(result.user, result.token);
        showToast(`Welcome back, ${result.user.name}!`, 'success');
        setTimeout(() => { window.location.href = result.user.role === 'admin' ? 'admin.html' : 'index.html'; }, 500);
      } catch (error) {
        showToast(error.message || 'Invalid email or password', 'danger');
      } finally {
        if (submitButton) submitButton.disabled = false;
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const name = document.getElementById('signupName').value.trim();
      const email = document.getElementById('signupEmail').value.trim().toLowerCase();
      const password = document.getElementById('signupPassword').value.trim();

      if (!name || !email || !password) {
        showToast('Please fill in all fields', 'warning');
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showToast('Please enter a valid email address', 'warning');
        return;
      }

      if (password.length < 6) {
        showToast('Password must be at least 6 characters', 'warning');
        return;
      }

      const submitButton = signupForm.querySelector('button[type="submit"]');
      if (submitButton) submitButton.disabled = true;
      try {
        const result = await apiRequest('/auth/signup', {
          method: 'POST',
          body: JSON.stringify({ name, email, password })
        });
        setSession(result.user, result.token);
        showToast('Account created successfully!', 'success');
        setTimeout(() => { window.location.href = 'index.html'; }, 500);
      } catch (error) {
        showToast(error.message || 'Could not create account', 'danger');
      } finally {
        if (submitButton) submitButton.disabled = false;
      }
    });
  }
}

// ---------------- product rendering ----------------

function renderStars(rating) {
  const score = Math.round(Number(rating) || 4);
  return '★'.repeat(Math.min(5, Math.max(1, score))) + '☆'.repeat(Math.max(0, 5 - score));
}

function renderProductCard(product) {
  const inWishlist = isInWishlist(product.id);
  const heartClass = inWishlist ? 'bi-heart-fill text-danger' : 'bi-heart';
  const ratingScore = Number(product.rating || 4.5).toFixed(1);
  const reviewCount = product.reviewCount || (120 + (Number(product.id) * 17) % 840);
  const scarcity = Number(product.id) % 4 === 0 ? 'Selling Fast' : (Number(product.id) % 3 === 0 ? 'Only 3 left' : '');
  const colorDots = ['#1c2430', '#c9a96e', '#d8d1c6'].slice(0, Number(product.id) % 3 + 1);

  return `
    <div class="col-6 col-md-4 col-xl-3">
      <div class="product-card-modern">
        <div class="product-media-box">
          ${product.discountPercent ? `<span class="badge-discount-modern">${product.discountPercent}% OFF</span>` : '<span class="badge-discount-modern">20% OFF</span>'}
          ${scarcity ? `<span class="badge-scarcity-modern">${scarcity}</span>` : ''}
          <button class="btn-wishlist-float wishlist-btn" data-id="${product.id}" aria-label="Add to Wishlist" title="Wishlist">
            <i class="bi ${heartClass}"></i>
          </button>
          <a class="btn-quick-view" href="product.html?product=${product.id}" aria-label="Quick view ${escapeHtml(product.name)}" title="Quick view"><i class="bi bi-eye"></i></a>
          <img src="${product.image}" alt="${escapeHtml(product.name)}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80'">
        </div>
        <div class="product-info-box">
          <span class="product-category-label">${escapeHtml(product.category || 'Menswear')}</span>
          <h3 class="product-name-modern" title="${escapeHtml(product.name)}">${escapeHtml(product.name)}</h3>
          <div class="product-rating-row">
            <span class="product-rating-stars">${renderStars(product.rating)}</span>
            <span class="product-rating-score">${ratingScore} <span class="product-review-count">(${reviewCount})</span></span>
          </div>
          <div class="product-pricing-row">
            <span class="price-current">₹${Number(product.price).toLocaleString('en-IN')}</span>
            ${product.oldPrice ? `<span class="price-original">₹${Number(product.oldPrice).toLocaleString('en-IN')}</span>` : ''}
          </div>
          <div class="product-swatches" aria-label="Available colours">${colorDots.map((color) => `<span style="background:${color}"></span>`).join('')}</div>
          <div class="product-card-actions">
            <button class="btn btn-add-bag-luxury w-100 add-to-cart-btn" data-id="${product.id}">
              <i class="bi bi-bag-plus me-1"></i> Add to Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderTrendingProducts() {
  const container = document.getElementById('trendingProducts');
  if (!container) return;
  const items = PRODUCTS.slice(0, 5);
  container.innerHTML = items.map(renderProductCard).join('');
  bindProductActions();
}

function renderProductGrid() {
  const container = document.getElementById('productGrid');
  if (!container) return;

  // Active category
  let category = 'All';
  const activeFilter = document.querySelector('[data-category-filter].active');
  if (activeFilter) {
    category = activeFilter.dataset.categoryFilter;
  }

  // Search query
  const productSearchInput = document.getElementById('productSearch');
  const globalSearchInput = document.getElementById('globalSearchInput');
  const urlParams = new URLSearchParams(window.location.search);
  const urlQuery = urlParams.get('search') || '';

  let searchValue = urlQuery.trim();
  if (!searchValue) {
    searchValue = (productSearchInput && productSearchInput.value.trim()) ||
                  (globalSearchInput && globalSearchInput.value.trim()) || '';
  }

  const query = searchValue.toLowerCase();

  // Filter products
  let filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = category === 'All' || product.category === category;
    const searchableText = `${product.name || ''} ${product.category || ''} ${product.description || ''}`.toLowerCase();
    const matchesSearch = !query || searchableText.includes(query);
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortSelect = document.getElementById('sortSelect');
  const sortOrder = sortSelect ? sortSelect.value : 'featured';

  if (sortOrder === 'price-asc') {
    filteredProducts.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (sortOrder === 'price-desc') {
    filteredProducts.sort((a, b) => Number(b.price) - Number(a.price));
  } else if (sortOrder === 'rating') {
    filteredProducts.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
  } else if (sortOrder === 'name') {
    filteredProducts.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  }

  // Result count
  const resultCount = document.getElementById('productResultCount');
  if (resultCount) {
    const categoryLabel = category === 'All' ? 'all categories' : category;
    resultCount.innerHTML = `<span class="fw-bold text-dark">${filteredProducts.length}</span> items in <span class="badge bg-light text-dark border">${categoryLabel}</span>`;
  }

  // No results
  if (filteredProducts.length === 0) {
    container.innerHTML = `
      <div class="col-12 py-5 text-center">
        <div class="p-5 bg-white rounded-4 border">
          <i class="bi bi-search text-muted" style="font-size: 2.5rem;"></i>
          <h4 class="fw-bold mt-3">No matching products found</h4>
          <p class="text-muted mb-4">Try searching with different keywords or clear the active filter.</p>
          <button class="btn btn-brand" onclick="window.location.href='products.html'">View All Products</button>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = filteredProducts.map(renderProductCard).join('');
  bindProductActions();
}

function bindProductActions() {
  document.querySelectorAll('.add-to-cart-btn').forEach((button) => {
    button.addEventListener('click', async () => {
      await addToCart(Number(button.dataset.id), 1);
    });
  });

  document.querySelectorAll('.wishlist-btn').forEach((button) => {
    button.addEventListener('click', async () => {
      const id = Number(button.dataset.id);
      const icon = button.querySelector('i');
      const nowInWishlist = await toggleWishlist(id);
      if (nowInWishlist === null) return;
      icon.className = nowInWishlist ? 'bi bi-heart-fill text-danger' : 'bi bi-heart';
      if (nowInWishlist) {
        showToast('Saved to wishlist', 'success');
      }
    });
  });

  document.querySelectorAll('.btn-quick-view').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const productId = new URL(button.href).searchParams.get('product');
      const product = getProductById(productId);
      if (!product) return;
      let modal = document.getElementById('quickViewModal');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'quickViewModal';
        modal.className = 'quick-view-modal';
        document.body.appendChild(modal);
      }
      modal.innerHTML = `
        <div class="quick-view-backdrop"></div>
        <div class="quick-view-panel" role="dialog" aria-modal="true" aria-label="Quick view">
          <button class="quick-view-close" aria-label="Close quick view"><i class="bi bi-x-lg"></i></button>
          <img src="${product.image}" alt="${escapeHtml(product.name)}">
          <div class="quick-view-copy"><span class="product-category-label">${escapeHtml(product.category || 'Menswear')}</span><h2>${escapeHtml(product.name)}</h2><div class="product-rating-row"><span class="product-rating-stars">${renderStars(product.rating)}</span> <span>${Number(product.rating || 4.5).toFixed(1)} rated</span></div><strong>₹${Number(product.price).toLocaleString('en-IN')}</strong><button class="btn btn-brand w-100 mt-3 quick-view-add" data-id="${product.id}">Add to Bag <i class="bi bi-bag-plus"></i></button></div>
        </div>`;
      requestAnimationFrame(() => modal.classList.add('is-open'));
      const close = () => modal.classList.remove('is-open');
      modal.querySelector('.quick-view-close').addEventListener('click', close);
      modal.querySelector('.quick-view-backdrop').addEventListener('click', close);
      modal.querySelector('.quick-view-add').addEventListener('click', async () => { await addToCart(product.id); close(); });
    });
  });
}

function updateWishlistButtons() {
  document.querySelectorAll('.wishlist-btn').forEach((button) => {
    const id = Number(button.dataset.id);
    const icon = button.querySelector('i');
    if (icon) {
      icon.className = isInWishlist(id) ? 'bi bi-heart-fill text-danger' : 'bi bi-heart';
    }
  });
}

// ---------------- cart page ----------------

async function renderCartPage() {
  const cartContainer = document.getElementById('cartItemsContainer');
  const summaryContainer = document.getElementById('cartSummary');

  if (!cartContainer || !summaryContainer) return;

  if (!getToken()) {
    cartContainer.innerHTML = `
      <div class="card border-0 shadow-sm p-5 text-center bg-white rounded-4">
        <i class="bi bi-person-lock text-primary" style="font-size: 3rem;"></i>
        <h3 class="fw-bold mt-3">Please sign in to view your bag</h3>
        <p class="text-muted mb-4">Sign in to retrieve your saved items and enjoy seamless checkout.</p>
        <div>
          <a href="login.html" class="btn btn-brand px-4">Sign In to Your Account</a>
        </div>
      </div>
    `;
    summaryContainer.innerHTML = '';
    return;
  }

  if (!cartItems.length) {
    cartContainer.innerHTML = `
      <div class="card border-0 shadow-sm p-5 text-center bg-white rounded-4">
        <i class="bi bi-bag-x text-muted" style="font-size: 3.5rem;"></i>
        <h3 class="fw-bold mt-3">Your shopping bag is empty</h3>
        <p class="text-muted mb-4">Looks like you haven't added any premium menswear to your bag yet.</p>
        <div>
          <a href="products.html" class="btn btn-brand px-4">Explore Collection</a>
        </div>
      </div>
    `;
    summaryContainer.innerHTML = '';
    return;
  }

  const totals = calculateCartTotal();

  cartContainer.innerHTML = cartItems.map((item) => `
    <div class="cart-item-card">
      <img src="${item.image}" alt="${escapeHtml(item.name)}" class="cart-item-thumb">
      <div class="flex-grow-1 min-width-0">
        <div class="d-flex justify-content-between align-items-start mb-1">
          <h4 class="h6 fw-bold mb-0 text-truncate">${escapeHtml(item.name)}</h4>
          <button class="btn btn-link text-danger p-0 ms-2 remove-cart-btn" data-item-id="${item._id}" title="Remove item">
            <i class="bi bi-trash3"></i>
          </button>
        </div>
        <div class="text-muted small mb-2">
          <span>Size: <strong>${item.size || 'M'}</strong></span> &bull; 
          <span>Color: <strong>${item.color || 'Standard'}</strong></span>
        </div>
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div class="quantity-stepper">
            <button class="stepper-btn quantity-btn" data-item-id="${item._id}" data-change="-1">-</button>
            <span class="stepper-value">${item.qty}</span>
            <button class="stepper-btn quantity-btn" data-item-id="${item._id}" data-change="1">+</button>
          </div>
          <div class="fw-bold fs-6 text-dark">₹${Number(item.price * item.qty).toLocaleString('en-IN')}</div>
        </div>
      </div>
    </div>
  `).join('');

  summaryContainer.innerHTML = `
    <div class="order-summary-card">
      <h3 class="h5 fw-bold mb-3">Order Summary</h3>
      
      <!-- Free Shipping Tracker -->
      <div class="shipping-progress-box">
        ${totals.freeShippingRemaining === 0 
          ? '<div class="d-flex align-items-center gap-2 text-success fw-bold small"><i class="bi bi-check-circle-fill"></i> You unlocked FREE Delivery!</div>'
          : `<div class="small fw-semibold text-dark">Add <strong>₹${totals.freeShippingRemaining}</strong> more for <strong>FREE Delivery</strong></div>`
        }
        <div class="shipping-progress-bar">
          <div class="shipping-progress-fill" style="width: ${totals.freeShippingPercent}%"></div>
        </div>
      </div>

      <!-- Coupon Form -->
      <div class="mb-3">
        <label class="form-label small fw-bold text-muted">Promo Code</label>
        <div class="input-group">
          <input type="text" id="couponInput" class="form-control form-control-sm" placeholder="e.g. STAR20" value="${escapeHtml(totals.coupon)}">
          <button class="btn btn-outline-dark btn-sm fw-bold" id="applyCouponBtn">
            ${totals.coupon ? 'Remove' : 'Apply'}
          </button>
        </div>
        ${totals.coupon ? '<small class="text-success fw-semibold mt-1 d-block"><i class="bi bi-tag-fill me-1"></i> Coupon ' + totals.coupon.toUpperCase() + ' applied (20% OFF)</small>' : ''}
      </div>

      <!-- Cost Breakdown -->
      <div class="d-flex justify-content-between mb-2 small text-muted">
        <span>Subtotal</span>
        <span class="fw-semibold text-dark">₹${totals.subtotal.toLocaleString('en-IN')}</span>
      </div>
      <div class="d-flex justify-content-between mb-2 small text-muted">
        <span>Estimated Delivery</span>
        <span class="fw-semibold ${totals.delivery === 0 ? 'text-success' : 'text-dark'}">
          ${totals.delivery === 0 ? 'FREE' : '₹' + totals.delivery}
        </span>
      </div>
      <div class="d-flex justify-content-between mb-2 small text-muted">
        <span>Savings & Discount</span>
        <span class="fw-semibold text-success">-₹${totals.discount.toLocaleString('en-IN')}</span>
      </div>
      <hr class="my-3">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <span class="fw-bold">Total Amount</span>
        <span class="fs-4 fw-bold text-primary">₹${totals.total.toLocaleString('en-IN')}</span>
      </div>

      <a href="checkout.html" class="btn btn-brand w-100 py-3 mb-3">
        Proceed to Checkout <i class="bi bi-arrow-right ms-1"></i>
      </a>

      <div class="text-center small text-muted">
        <i class="bi bi-shield-lock-fill text-success me-1"></i> 256-Bit SSL Encrypted Checkout
      </div>
    </div>
  `;

  // Quantity Stepper Events
  document.querySelectorAll('.quantity-btn').forEach((button) => {
    button.addEventListener('click', async () => {
      await updateQuantity(button.dataset.itemId, Number(button.dataset.change));
      await renderCartPage();
    });
  });

  // Remove Item Events
  document.querySelectorAll('.remove-cart-btn').forEach((button) => {
    button.addEventListener('click', async () => {
      await removeFromCart(button.dataset.itemId);
      await renderCartPage();
    });
  });

  // Apply Coupon Event
  const applyCouponBtn = document.getElementById('applyCouponBtn');
  if (applyCouponBtn) {
    applyCouponBtn.addEventListener('click', () => {
      const couponInput = document.getElementById('couponInput');
      const existing = localStorage.getItem('ram_coupon');
      if (existing) {
        localStorage.removeItem('ram_coupon');
        showToast('Coupon removed', 'info');
      } else {
        const val = (couponInput.value || '').trim().toUpperCase();
        if (val === 'STAR20' || val === 'RAM20') {
          localStorage.setItem('ram_coupon', val);
          showToast('Coupon applied! 20% discount added.', 'success');
        } else if (val) {
          showToast('Invalid coupon code. Try STAR20', 'warning');
        }
      }
      renderCartPage();
    });
  }
}

// ---------------- wishlist page ----------------

async function renderWishlistPage() {
  const container = document.getElementById('wishlistContainer');
  if (!container) return;

  if (!getToken()) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="card border-0 shadow-sm p-5 bg-white rounded-4">
          <i class="bi bi-person-lock text-primary" style="font-size: 3rem;"></i>
          <h3 class="fw-bold mt-3">Sign in to view your wishlist</h3>
          <p class="text-muted mb-4">Keep track of your favorite styles and buy them anytime.</p>
          <div>
            <a href="login.html" class="btn btn-brand px-4">Sign In</a>
          </div>
        </div>
      </div>
    `;
    return;
  }

  if (!wishlistIds.length) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="card border-0 shadow-sm p-5 bg-white rounded-4">
          <i class="bi bi-heart text-muted" style="font-size: 3rem;"></i>
          <h3 class="fw-bold mt-3">Your wishlist is empty</h3>
          <p class="text-muted mb-4">Browse our menswear catalog and click the heart icon on pieces you love.</p>
          <div>
            <a href="products.html" class="btn btn-brand px-4">Browse Products</a>
          </div>
        </div>
      </div>
    `;
    return;
  }

  const items = PRODUCTS.filter((product) => wishlistIds.includes(Number(product.id)));
  container.innerHTML = items.map((product) => `
    <div class="col-12 col-sm-6 col-lg-4">
      <div class="product-card-modern">
        <div class="product-media-box">
          ${product.discountPercent ? `<span class="badge-discount-modern">${product.discountPercent}% OFF</span>` : ''}
          <button class="btn-wishlist-float wishlist-btn" data-id="${product.id}" aria-label="Remove from Wishlist" title="Remove">
            <i class="bi bi-heart-fill text-danger"></i>
          </button>
          <img src="${product.image}" alt="${escapeHtml(product.name)}" loading="lazy">
        </div>
        <div class="product-info-box">
          <span class="product-category-label">${escapeHtml(product.category || 'Menswear')}</span>
          <h3 class="product-name-modern">${escapeHtml(product.name)}</h3>
          <div class="product-pricing-row">
            <span class="price-current">₹${Number(product.price).toLocaleString('en-IN')}</span>
            ${product.oldPrice ? `<span class="price-original">₹${Number(product.oldPrice).toLocaleString('en-IN')}</span>` : ''}
          </div>
          <div class="product-card-actions d-flex flex-column gap-2">
            <button class="btn btn-add-bag-luxury w-100 add-to-cart-btn" data-id="${product.id}">
              <i class="bi bi-bag-plus me-1"></i> Move to Bag
            </button>
            <button class="btn btn-secondary-modern btn-sm w-100 remove-wishlist-btn" data-id="${product.id}">
              <i class="bi bi-trash3 me-1"></i> Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.add-to-cart-btn').forEach((button) => {
    button.addEventListener('click', async () => {
      await addToCart(Number(button.dataset.id), 1);
      await removeFromWishlist(Number(button.dataset.id));
      await renderWishlistPage();
    });
  });

  document.querySelectorAll('.remove-wishlist-btn, .wishlist-btn').forEach((button) => {
    button.addEventListener('click', async () => {
      await removeFromWishlist(Number(button.dataset.id));
      await renderWishlistPage();
    });
  });
}

// ---------------- checkout page ----------------

async function setupCheckoutPage() {
  const form = document.getElementById('checkoutForm');
  const summary = document.getElementById('checkoutSummary');

  if (!form || !summary) return;

  if (!getToken()) {
    summary.innerHTML = `
      <div class="card border-0 shadow-sm p-4 text-center">
        <i class="bi bi-person-lock text-primary fs-1 mb-2"></i>
        <h5 class="fw-bold">Sign in required</h5>
        <p class="text-muted small">Please login to complete your purchase.</p>
        <a href="login.html" class="btn btn-brand">Sign In</a>
      </div>
    `;
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;
    return;
  }

  if (!cartItems.length) {
    summary.innerHTML = `
      <div class="card border-0 shadow-sm p-4 text-center">
        <i class="bi bi-cart-x text-muted fs-1 mb-2"></i>
        <h5 class="fw-bold">Your bag is empty</h5>
        <a href="products.html" class="btn btn-brand mt-2">Explore Products</a>
      </div>
    `;
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;
    return;
  }

  const totals = calculateCartTotal();
  summary.innerHTML = `
    <div class="order-summary-card">
      <h3 class="h5 fw-bold mb-3">Order Overview</h3>
      <div class="mb-3" style="max-height: 220px; overflow-y: auto;">
        ${cartItems.map((item) => `
          <div class="d-flex align-items-center gap-2 py-2 border-bottom">
            <img src="${item.image}" alt="${escapeHtml(item.name)}" style="width: 42px; height: 50px; object-fit: cover; border-radius: 6px;">
            <div class="flex-grow-1 min-width-0">
              <div class="fw-bold text-dark small text-truncate">${escapeHtml(item.name)}</div>
              <div class="text-muted small">${item.qty} &times; ₹${Number(item.price).toLocaleString('en-IN')}</div>
            </div>
            <div class="fw-bold small">₹${Number(item.qty * item.price).toLocaleString('en-IN')}</div>
          </div>
        `).join('')}
      </div>

      <div class="d-flex justify-content-between mb-2 small text-muted">
        <span>Subtotal</span>
        <span class="text-dark fw-semibold">₹${totals.subtotal.toLocaleString('en-IN')}</span>
      </div>
      <div class="d-flex justify-content-between mb-2 small text-muted">
        <span>Delivery</span>
        <span class="${totals.delivery === 0 ? 'text-success' : 'text-dark'} fw-semibold">
          ${totals.delivery === 0 ? 'FREE' : '₹' + totals.delivery}
        </span>
      </div>
      <div class="d-flex justify-content-between mb-2 small text-muted">
        <span>Discount</span>
        <span class="text-success fw-semibold">-₹${totals.discount.toLocaleString('en-IN')}</span>
      </div>
      <hr class="my-3">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <span class="fw-bold">Total Pay</span>
        <span class="fs-4 fw-bold text-primary">₹${totals.total.toLocaleString('en-IN')}</span>
      </div>
      <div class="p-2 bg-light rounded text-center small text-muted">
        <i class="bi bi-shield-check text-success"></i> Safe & Secure Payments Guaranteed
      </div>
    </div>
  `;

  // Payment Method Tiles
  const paymentTiles = document.querySelectorAll('.payment-tile-card');
  const paymentInput = document.getElementById('paymentMethodInput');
  paymentTiles.forEach((tile) => {
    tile.addEventListener('click', () => {
      paymentTiles.forEach((t) => t.classList.remove('selected'));
      tile.classList.add('selected');
      if (paymentInput) {
        paymentInput.value = tile.dataset.method;
      }
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Placing Order...';
    }

    const paymentMethod = paymentInput ? paymentInput.value : (formData.get('payment') || 'UPI');
    try {
      const order = await apiRequest('/orders', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.get('name'),
          phone: formData.get('phone'),
          address: formData.get('address'),
          city: formData.get('city'),
          pincode: formData.get('pincode'),
          payment: paymentMethod
        })
      });
      cartItems = [];
      renderCartBadge();
      window.location.href = `order-confirmation.html?orderId=${encodeURIComponent(order.orderId)}`;
    } catch (error) {
      showToast(error.message || 'Could not place the order', 'danger');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Confirm & Place Order</span> <i class="bi bi-shield-check ms-1"></i>';
      }
    }
  });
}

// ---------------- orders pages ----------------

async function renderOrdersPage() {
  const container = document.getElementById('ordersContainer');
  if (!container) return;

  if (!getToken()) {
    container.innerHTML = `
      <div class="card border-0 shadow-sm p-5 text-center bg-white rounded-4">
        <i class="bi bi-person-lock text-primary" style="font-size: 3rem;"></i>
        <h3 class="fw-bold mt-3">Sign in to view orders</h3>
        <p class="text-muted mb-4">Please log in to track existing purchases and view receipts.</p>
        <div><a href="login.html" class="btn btn-brand px-4">Sign In</a></div>
      </div>
    `;
    return;
  }

  const orders = await apiRequest('/orders');

  if (!orders.length) {
    container.innerHTML = `
      <div class="card border-0 shadow-sm p-5 text-center bg-white rounded-4">
        <i class="bi bi-receipt text-muted" style="font-size: 3rem;"></i>
        <h3 class="fw-bold mt-3">No orders found</h3>
        <p class="text-muted mb-4">You haven't placed any orders yet. Discover our new arrivals!</p>
        <div><a href="products.html" class="btn btn-brand px-4">Start Shopping</a></div>
      </div>
    `;
    return;
  }

  const stepsOrder = ['Placed', 'Packed', 'Shipped', 'Delivered'];

  container.innerHTML = orders.slice().reverse().map((order) => {
    const currentStepIndex = stepsOrder.indexOf(order.status || 'Placed');

    return `
      <div class="order-card-modern">
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 pb-3 border-bottom">
          <div>
            <span class="badge bg-dark me-2">#${escapeHtml(order.orderId)}</span>
            <span class="text-muted small">${new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div>
            <span class="badge bg-success-subtle text-success fw-bold px-3 py-2 rounded-pill">
              ${escapeHtml(order.status || 'Placed')}
            </span>
          </div>
        </div>

        <!-- Timeline Stepper -->
        <div class="order-timeline-track">
          ${stepsOrder.map((stepName, idx) => {
            let stepClass = '';
            if (idx < currentStepIndex) stepClass = 'completed';
            else if (idx === currentStepIndex) stepClass = 'active';

            return `
              <div class="timeline-step ${stepClass}">
                <div class="timeline-dot">
                  ${idx < currentStepIndex ? '<i class="bi bi-check"></i>' : (idx + 1)}
                </div>
                <div class="timeline-label">${stepName}</div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Items Overview -->
        <div class="p-3 bg-light rounded-3 my-3">
          <div class="row g-2">
            ${order.items.map((item) => `
              <div class="col-12 col-md-6 d-flex align-items-center gap-3">
                <img src="${item.image || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80'}" style="width: 44px; height: 52px; object-fit: cover; border-radius: 6px;" alt="">
                <div class="small">
                  <div class="fw-bold text-dark">${escapeHtml(item.name)}</div>
                  <div class="text-muted">${item.qty} pcs &bull; ₹${Number(item.price).toLocaleString('en-IN')}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="d-flex justify-content-between align-items-center pt-2">
          <div class="small text-muted">
            Payment: <strong>${escapeHtml(order.paymentMethod || 'COD')}</strong> &bull; Deliver to: <strong>${escapeHtml(order.address?.city || '')} (${escapeHtml(order.address?.pincode || '')})</strong>
          </div>
          <div class="fs-5 fw-bold text-primary">
            ₹${Number(order.total || 0).toLocaleString('en-IN')}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

async function renderOrderConfirmation() {
  const container = document.getElementById('confirmationDetails');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const orderId = params.get('orderId');

  if (!orderId) {
    container.innerHTML = '<div class="alert alert-warning">No order details found.</div>';
    return;
  }

  let order;
  try {
    order = await apiRequest(`/orders/${encodeURIComponent(orderId)}`);
  } catch (error) {
    container.innerHTML = `<div class="alert alert-warning">${escapeHtml(error.message || 'Order not found.')}</div>`;
    return;
  }

  if (!order) {
    container.innerHTML = '<div class="alert alert-warning">Order not found.</div>';
    return;
  }

  container.innerHTML = `
    <div class="card border-0 shadow-lg p-4 p-md-5 text-center bg-white rounded-4 mx-auto" style="max-width: 650px;">
      <div class="mb-3">
        <div class="d-inline-flex align-items-center justify-content-center bg-success-subtle text-success rounded-circle" style="width: 76px; height: 76px;">
          <i class="bi bi-patch-check-fill fs-1"></i>
        </div>
      </div>
      <h2 class="h3 fw-bold mb-2">Order Confirmed!</h2>
      <p class="text-muted mb-4">Thank you for your purchase. We have received your order and are preparing it for shipment.</p>
      
      <div class="p-3 bg-light rounded-3 mb-4 text-start">
        <div class="d-flex justify-content-between mb-2">
          <span class="text-muted small">Order ID</span>
          <span class="fw-bold font-monospace text-dark">#${escapeHtml(order.orderId)}</span>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <span class="text-muted small">Estimated Delivery</span>
          <span class="fw-semibold text-dark">Within 3-5 Business Days</span>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <span class="text-muted small">Payment Method</span>
          <span class="fw-semibold text-dark">${escapeHtml(order.paymentMethod || 'COD')}</span>
        </div>
        <div class="d-flex justify-content-between pt-2 border-top">
          <span class="fw-bold text-dark">Total Amount</span>
          <span class="fw-bold fs-5 text-primary">₹${Number(order.total).toLocaleString('en-IN')}</span>
        </div>
      </div>

      <div class="d-flex gap-2 justify-content-center flex-wrap">
        <a href="orders.html" class="btn btn-brand px-4"><i class="bi bi-bag-check me-1"></i> View My Orders</a>
        <a href="products.html" class="btn btn-secondary-modern px-4">Continue Shopping</a>
      </div>
    </div>
  `;
}

function setupProductDetail() {
  const container = document.getElementById('productDetail');
  if (!container) return;
  const product = getProductById(new URLSearchParams(window.location.search).get('product')) || PRODUCTS[0];
  const gallery = [product.image, product.image, product.image];
  container.innerHTML = `
    <div class="product-detail-layout">
      <div class="product-detail-gallery">
        <div class="product-detail-thumbs">${gallery.map((image, index) => `<button class="product-thumb ${index === 0 ? 'active' : ''}" data-image="${image}"><img src="${image}" alt="${escapeHtml(product.name)} view ${index + 1}"></button>`).join('')}</div>
        <div class="product-detail-main-image"><img id="detailMainImage" src="${product.image}" alt="${escapeHtml(product.name)}"></div>
      </div>
      <section class="product-detail-info">
        <span class="product-category-label">${escapeHtml(product.category || 'Menswear')}</span>
        <h1>${escapeHtml(product.name)}</h1>
        <div class="product-rating-row mb-2"><span class="product-rating-stars">${renderStars(product.rating)}</span><strong>${Number(product.rating || 4.5).toFixed(1)}</strong><span class="text-muted">(${product.reviewCount || 248} reviews)</span></div>
        <div class="product-detail-price">₹${Number(product.price).toLocaleString('en-IN')} ${product.oldPrice ? `<del>₹${Number(product.oldPrice).toLocaleString('en-IN')}</del>` : ''}</div>
        <p class="text-muted small mb-3">A refined everyday essential cut from premium fabric, with an easy silhouette designed for modern wardrobes.</p>
        <div class="detail-choice"><div class="d-flex justify-content-between"><label class="small fw-bold">Colour</label><span class="small text-muted">Midnight Navy</span></div><div class="detail-swatches"><button class="active"></button><button></button><button></button></div></div>
        <div class="detail-choice"><label class="small fw-bold d-block mb-2">Select size</label><div class="detail-sizes">${['S', 'M', 'L', 'XL'].map((size, index) => `<button class="${index === 1 ? 'active' : ''}">${size}</button>`).join('')}</div></div>
        <button class="btn btn-brand detail-add-btn" data-id="${product.id}">Add to Bag <i class="bi bi-bag-plus"></i></button>
        <div class="detail-assurance"><span><i class="bi bi-truck"></i> Free shipping</span><span><i class="bi bi-arrow-repeat"></i> 30-day returns</span><span><i class="bi bi-shield-check"></i> Secure payment</span></div>
      </section>
    </div>`;
  container.querySelectorAll('.product-thumb').forEach((thumb) => thumb.addEventListener('click', () => { container.querySelectorAll('.product-thumb').forEach((item) => item.classList.remove('active')); thumb.classList.add('active'); document.getElementById('detailMainImage').src = thumb.dataset.image; }));
  container.querySelectorAll('.detail-sizes button, .detail-swatches button').forEach((button) => button.addEventListener('click', () => { button.parentElement.querySelectorAll('button').forEach((item) => item.classList.remove('active')); button.classList.add('active'); }));
  container.querySelector('.detail-add-btn').addEventListener('click', () => addToCart(product.id, 1));
}

// ---------------- product filters ----------------

function setupProductFilters() {
  const filterContainer = document.getElementById('categoryFilters');
  if (filterContainer) {
    const categories = [...new Set(PRODUCTS.map((product) => product.category).filter(Boolean))].sort();
    filterContainer.className = 'category-rail-wrapper';
    filterContainer.innerHTML = [
      `<button class="category-chip-modern active" data-category-filter="All"><i class="bi bi-grid-fill chip-icon"></i><span>All Collections</span><span class="chip-badge">${PRODUCTS.length}</span></button>`,
      ...categories.map((category) => {
        let icon = 'bi-tag';
        if (category === 'Shirts') icon = 'bi-person';
        else if (category === 'Jeans') icon = 'bi-columns';
        else if (category === 'T-Shirts') icon = 'bi-emoji-smile';
        else if (category === 'Shoes') icon = 'bi-lightning';
        else if (category === 'Bags') icon = 'bi-bag';
        else if (category === 'Accessories') icon = 'bi-watch';
        else if (category === 'Caps') icon = 'bi-star';

        const count = PRODUCTS.filter((p) => p.category === category).length;
        return `
          <button class="category-chip-modern" data-category-filter="${category}">
            <i class="bi ${icon} chip-icon"></i>
            <span>${category}</span>
            <span class="chip-badge">${count}</span>
          </button>
        `;
      })
    ].join('');
  }

  const categoryQuery = new URLSearchParams(window.location.search).get('category');
  const filterButtons = document.querySelectorAll('[data-category-filter]');
  if (categoryQuery) {
    const matchingButton = [...filterButtons].find(
      (button) => button.dataset.categoryFilter.toLowerCase() === categoryQuery.toLowerCase()
    );
    if (matchingButton) {
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      matchingButton.classList.add('active');
    }
  }

  if (filterButtons.length) {
    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        filterButtons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');
        renderProductGrid();
      });
    });
  }

  // Sort Dropdown
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      renderProductGrid();
    });
  }
}

// ---------------- global search ----------------

function setupGlobalSearch() {
  const input = document.getElementById('productSearch') || document.getElementById('globalSearchInput');
  if (!input) return;

  const form = document.getElementById('globalSearchForm') || input.closest('form');
  const params = new URLSearchParams(window.location.search);
  const currentSearch = params.get('search') || '';

  if (currentSearch) {
    input.value = currentSearch;
  }

  input.addEventListener('input', function () {
    if (document.body.dataset.page === 'products') {
      const url = new URL(window.location.href);
      const query = input.value.trim();
      if (query) {
        url.searchParams.set('search', query);
      } else {
        url.searchParams.delete('search');
      }
      window.history.replaceState({}, '', url);
      renderProductGrid();
    }
  });

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const query = input.value.trim();
      if (document.body.dataset.page === 'products') {
        const url = new URL(window.location.href);
        if (query) url.searchParams.set('search', query);
        else url.searchParams.delete('search');
        window.history.replaceState({}, '', url);
        renderProductGrid();
      } else {
        if (query) {
          window.location.href = `products.html?search=${encodeURIComponent(query)}`;
        } else {
          window.location.href = 'products.html';
        }
      }
    });
  }
}

// ---------------- boot ----------------

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await loadProducts();
    await loadCart();
    await loadWishlist();
  } catch (error) {
    showToast(error.message || 'Could not connect to the store API', 'danger');
    const productGrid = document.getElementById('productGrid');
    if (productGrid) productGrid.innerHTML = '<div class="col-12 alert alert-danger">The store API is unavailable. Please try again shortly.</div>';
  }
  renderCartBadge();
  renderUserState();
  setupGlobalSearch();
  const page = document.body.dataset.page;

  if (page === 'home') {
    renderTrendingProducts();
  }

  if (page === 'products') {
    setupProductFilters();
    renderProductGrid();
  }

  if (page === 'product') {
    setupProductDetail();
  }

  if (page === 'cart') {
    renderCartPage();
  }

  if (page === 'wishlist') {
    renderWishlistPage();
  }

  if (page === 'login') {
    setupLoginForms();
  }

  if (page === 'checkout') {
    setupCheckoutPage();
  }

  if (page === 'orders') {
    renderOrdersPage();
  }

  if (page === 'order-confirmation') {
    renderOrderConfirmation();
  }

  updateWishlistButtons();
});
