// ============================================================
// RAM MENS WEAR — Admin panel (localStorage-backed, no server needed)
// ============================================================

const STORAGE_KEYS = {
  PRODUCTS: 'seven_products',
  USERS: 'seven_users',
  CURRENT_USER: 'seven_current_user',
  ORDERS: 'seven_orders'
};

let products = [];
let orders = [];
const productModal = new bootstrap.Modal(document.getElementById('productModal'));
let productQuery = '';

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

function getUser() {
  return readJSON(STORAGE_KEYS.CURRENT_USER, null);
}

function showAlert(message, type = 'danger') {
  const alert = document.getElementById('adminAlert');
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  alert.classList.remove('d-none');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function requireAdmin() {
  const user = getUser();
  if (!user || user.role !== 'admin') {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

function renderProducts() {
  const body = document.getElementById('productsTableBody');
  const emptyState = document.getElementById('emptyState');
  const visibleProducts = products.filter((product) => `${product.name} ${product.category}`.toLowerCase().includes(productQuery));
  document.getElementById('productCount').textContent = `${visibleProducts.length}/${products.length}`;
  emptyState.classList.toggle('d-none', visibleProducts.length > 0);
  body.innerHTML = visibleProducts.map((product) => `
    <tr>
      <td><div class="d-flex align-items-center gap-3"><img class="admin-product-thumb" src="${escapeHtml(product.image || '')}" alt="${escapeHtml(product.name)}"><div><div class="fw-semibold">${escapeHtml(product.name)}</div><small class="text-secondary">ID #${product.id}</small></div></div></td>
      <td>${escapeHtml(product.category)}</td>
      <td>₹${Number(product.price).toLocaleString('en-IN')}</td>
      <td>${Number(product.discountPercent || 0)}%</td>
      <td class="text-end text-nowrap"><button class="btn btn-sm btn-light me-1" data-edit-id="${product.id}" title="Edit product"><i class="bi bi-pencil"></i></button><button class="btn btn-sm btn-outline-danger" data-delete-id="${product.id}" title="Delete product"><i class="bi bi-trash"></i></button></td>
    </tr>
  `).join('');
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
}

function loadProducts() {
  products = readJSON(STORAGE_KEYS.PRODUCTS, []);
  renderProducts();
}

function saveProducts() {
  writeJSON(STORAGE_KEYS.PRODUCTS, products);
}

function loadOrders() {
  orders = readJSON(STORAGE_KEYS.ORDERS, []);
  renderOrders();
  renderDashboard();
}

function renderOrders() {
  const body = document.getElementById('ordersTableBody');
  const emptyState = document.getElementById('ordersEmptyState');
  document.getElementById('orderCount').textContent = orders.length;
  emptyState.classList.toggle('d-none', orders.length > 0);
  body.innerHTML = orders
    .slice()
    .reverse()
    .map((order) => {
      const itemCount = order.items.reduce((total, item) => total + Number(item.qty || 0), 0);
      const customer = order.user?.name || order.address?.name || 'Guest';
      const email = order.user?.email || '';
      const date = new Date(order.createdAt).toLocaleDateString('en-IN');
      const status = order.status || 'Placed';
      return `<tr><td><strong>${escapeHtml(order.orderId)}</strong><br><small class="text-secondary">${escapeHtml(order.address?.city || '')}</small></td><td>${escapeHtml(customer)}<br><small class="text-secondary">${escapeHtml(email)}</small></td><td>${itemCount}</td><td>₹${Number(order.total || 0).toLocaleString('en-IN')}</td><td>${escapeHtml(order.paymentMethod || 'COD')}</td><td><select class="form-select form-select-sm order-status" data-order-id="${escapeHtml(order.orderId)}"><option ${status === 'Placed' ? 'selected' : ''}>Placed</option><option ${status === 'Packed' ? 'selected' : ''}>Packed</option><option ${status === 'Shipped' ? 'selected' : ''}>Shipped</option><option ${status === 'Delivered' ? 'selected' : ''}>Delivered</option><option ${status === 'Cancelled' ? 'selected' : ''}>Cancelled</option></select></td><td>${date}</td></tr>`;
    })
    .join('');
}

function fillForm(product = {}) {
  document.getElementById('productId').value = product.id || '';
  document.getElementById('productName').value = product.name || '';
  document.getElementById('productCategory').value = product.category || '';
  document.getElementById('productPrice').value = product.price ?? '';
  document.getElementById('productOldPrice').value = product.oldPrice ?? '';
  document.getElementById('productDiscount').value = product.discountPercent ?? 0;
  document.getElementById('productImage').value = product.image || '';
  document.getElementById('productRating').value = product.rating ?? 4.5;
  document.getElementById('productSizes').value = (product.sizes || []).join(', ');
  document.getElementById('productColors').value = (product.colors || []).join(', ');
  updateImagePreview(product.image || '');
}

function updateImagePreview(source) {
  const preview = document.getElementById('imagePreview');
  if (!source) {
    preview.removeAttribute('src');
    preview.classList.add('d-none');
    return;
  }
  preview.src = source;
  preview.classList.remove('d-none');
  preview.onerror = () => preview.classList.add('d-none');
}

function formData() {
  return {
    name: document.getElementById('productName').value.trim(),
    category: document.getElementById('productCategory').value,
    price: Number(document.getElementById('productPrice').value),
    oldPrice: document.getElementById('productOldPrice').value ? Number(document.getElementById('productOldPrice').value) : undefined,
    discountPercent: Number(document.getElementById('productDiscount').value || 0),
    image: document.getElementById('productImage').value.trim(),
    rating: Number(document.getElementById('productRating').value || 4.5),
    sizes: document.getElementById('productSizes').value.split(',').map((value) => value.trim()).filter(Boolean),
    colors: document.getElementById('productColors').value.split(',').map((value) => value.trim()).filter(Boolean)
  };
}

function nextId(list) {
  return list.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
}

document.getElementById('addProductBtn').addEventListener('click', () => {
  document.getElementById('modalTitle').textContent = 'Add product';
  fillForm();
  productModal.show();
});

document.getElementById('refreshBtn').addEventListener('click', loadProducts);
document.getElementById('refreshOrdersBtn').addEventListener('click', loadOrders);
document.getElementById('adminProductSearch').addEventListener('input', (event) => {
  productQuery = event.target.value.trim().toLowerCase();
  renderProducts();
});
document.getElementById('ordersTableBody').addEventListener('change', (event) => {
  if (!event.target.matches('.order-status')) return;
  const order = orders.find((item) => item.orderId === event.target.dataset.orderId);
  if (!order) return;
  order.status = event.target.value;
  writeJSON(STORAGE_KEYS.ORDERS, orders);
  renderDashboard();
  showAlert('Order status updated.', 'success');
});
document.getElementById('saveSettingsBtn').addEventListener('click', () => {
  writeJSON('ram_store_settings', {
    name: document.getElementById('storeNameSetting').value.trim() || 'RAM MENS WEAR',
    freeDeliveryAbove: Number(document.getElementById('freeDeliverySetting').value) || 3000
  });
  showAlert('Store settings saved.', 'success');
});
document.getElementById('createCustomerForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('customerName').value.trim();
  const email = document.getElementById('customerEmail').value.trim().toLowerCase();
  const password = document.getElementById('customerPassword').value.trim();
  if (!name || !email || password.length < 6) {
    showAlert('Enter a name, valid email, and password with at least 6 characters.');
    return;
  }
  const users = readJSON(STORAGE_KEYS.USERS, []);
  if (users.some((user) => user.email.toLowerCase() === email)) {
    showAlert('An account with this email already exists.');
    return;
  }
  users.push({ id: nextId(users), name, email, password, role: 'customer' });
  writeJSON(STORAGE_KEYS.USERS, users);
  event.target.reset();
  renderDashboard();
  showAlert('Customer account created successfully.', 'success');
});
document.getElementById('productImage').addEventListener('input', (event) => updateImagePreview(event.target.value.trim()));
document.getElementById('productImageFile').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) {
    showAlert('Please choose an image smaller than 5 MB.');
    event.target.value = '';
    return;
  }
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    document.getElementById('productImage').value = reader.result;
    updateImagePreview(reader.result);
  });
  reader.readAsDataURL(file);
});
document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  window.location.href = 'login.html';
});

document.getElementById('productsTableBody').addEventListener('click', (event) => {
  const editButton = event.target.closest('[data-edit-id]');
  const deleteButton = event.target.closest('[data-delete-id]');
  if (editButton) {
    const product = products.find((item) => item.id === Number(editButton.dataset.editId));
    document.getElementById('modalTitle').textContent = 'Edit product';
    fillForm(product);
    productModal.show();
  }
  if (deleteButton) {
    const product = products.find((item) => item.id === Number(deleteButton.dataset.deleteId));
    if (!window.confirm(`Delete ${product.name}?`)) return;
    products = products.filter((item) => item.id !== product.id);
    saveProducts();
    showAlert('Product deleted.', 'success');
    renderProducts();
  }
});

document.getElementById('productForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const id = document.getElementById('productId').value;
  const button = document.getElementById('saveProductBtn');
  button.disabled = true;
  try {
    const data = formData();
    if (!data.name || !data.category || !data.price) {
      throw new Error('Please fill in the required fields.');
    }
    if (id) {
      products = products.map((item) => (item.id === Number(id) ? { ...item, ...data, id: item.id } : item));
      showAlert('Product updated.', 'success');
    } else {
      products.push({ ...data, id: nextId(products) });
      showAlert('Product added.', 'success');
    }
    saveProducts();
    productModal.hide();
    renderProducts();
  } catch (error) {
    showAlert(error.message);
  } finally {
    button.disabled = false;
  }
});

function renderDashboard() {
  const users = readJSON(STORAGE_KEYS.USERS, []);
  document.getElementById('statProducts').textContent = products.length.toLocaleString('en-IN');
  document.getElementById('statOrders').textContent = orders.length.toLocaleString('en-IN');
  document.getElementById('statRevenue').textContent = `₹${orders.reduce((total, order) => total + Number(order.total || 0), 0).toLocaleString('en-IN')}`;
  document.getElementById('statCustomers').textContent = users.filter((user) => user.role !== 'admin').length.toLocaleString('en-IN');
  document.getElementById('pendingOrderCount').textContent = `${orders.filter((order) => !['Delivered', 'Cancelled'].includes(order.status)).length} pending`;
  document.getElementById('customersTableBody').innerHTML = users.filter((user) => user.role !== 'admin').map((user) => {
    const count = orders.filter((order) => order.userId === user.id).length;
    return `<tr><td class="fw-semibold">${escapeHtml(user.name)}</td><td>${escapeHtml(user.email)}</td><td><span class="badge text-bg-light">${escapeHtml(user.role || 'customer')}</span></td><td>${count}</td></tr>`;
  }).join('');
}

function loadSettings() {
  const settings = readJSON('ram_store_settings', { name: 'RAM MENS WEAR', freeDeliveryAbove: 3000 });
  document.getElementById('storeNameSetting').value = settings.name || 'RAM MENS WEAR';
  document.getElementById('freeDeliverySetting').value = settings.freeDeliveryAbove || 3000;
}

if (requireAdmin()) {
  loadProducts();
  loadOrders();
  renderDashboard();
  loadSettings();
}
