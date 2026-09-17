const API_BASE = window.RAM_API_BASE || (window.location.protocol === 'file:'
  ? 'http://localhost:5000/api'
  : `${window.location.protocol}//${window.location.hostname}:5000/api`);
const TOKEN_KEY = 'ram_auth_token';
const USER_KEY = 'seven_current_user';

let products = [];
let orders = [];
let users = [];
let productQuery = '';

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function getUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || 'null');
  } catch (error) {
    return null;
  }
}

function escapeHtml(value) {
  return String(value || '').replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[character]));
}

async function apiRequest(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (getToken()) headers.Authorization = `Bearer ${getToken()}`;
  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.message || `Request failed (${response.status})`);
  return body;
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
  if (!getToken() || !user || user.role !== 'admin') {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

function renderProducts() {
  const visibleProducts = products.filter((product) => `${product.name} ${product.category}`.toLowerCase().includes(productQuery));
  document.getElementById('productCount').textContent = `${visibleProducts.length}/${products.length}`;
  document.getElementById('emptyState').classList.toggle('d-none', visibleProducts.length > 0);
  document.getElementById('productsTableBody').innerHTML = visibleProducts.map((product) => `
    <tr>
      <td><div class="d-flex align-items-center gap-3"><img class="admin-product-thumb" src="${escapeHtml(product.image || '')}" alt="${escapeHtml(product.name)}"><div><div class="fw-semibold">${escapeHtml(product.name)}</div><small class="text-secondary">ID #${product.id}</small></div></div></td>
      <td>${escapeHtml(product.category)}</td><td>₹${Number(product.price).toLocaleString('en-IN')}</td>
      <td>${Number(product.discountPercent || 0)}%</td>
      <td class="text-end text-nowrap"><button class="btn btn-sm btn-light me-1" data-edit-id="${product.id}" title="Edit product"><i class="bi bi-pencil"></i></button><button class="btn btn-sm btn-outline-danger" data-delete-id="${product.id}" title="Delete product"><i class="bi bi-trash"></i></button></td>
    </tr>
  `).join('');
}

function renderOrders() {
  document.getElementById('orderCount').textContent = orders.length;
  document.getElementById('pendingOrderCount').textContent = `${orders.filter((order) => !['Delivered', 'Cancelled'].includes(order.status)).length} pending`;
  document.getElementById('ordersEmptyState').classList.toggle('d-none', orders.length > 0);
  document.getElementById('ordersTableBody').innerHTML = orders.map((order) => {
    const itemCount = (order.items || []).reduce((total, item) => total + Number(item.qty || 0), 0);
    const customer = order.user?.name || order.address?.name || 'Customer';
    return `<tr><td><strong>${escapeHtml(order.orderId)}</strong><br><small>${escapeHtml(order.address?.city || '')}</small></td><td>${escapeHtml(customer)}<br><small>${escapeHtml(order.user?.email || '')}</small></td><td>${itemCount}</td><td>₹${Number(order.total || 0).toLocaleString('en-IN')}</td><td>${escapeHtml(order.paymentMethod || 'COD')}</td><td><select class="form-select form-select-sm order-status" data-order-id="${escapeHtml(order.orderId)}"><option ${order.status === 'Placed' ? 'selected' : ''}>Placed</option><option ${order.status === 'Packed' ? 'selected' : ''}>Packed</option><option ${order.status === 'Shipped' ? 'selected' : ''}>Shipped</option><option ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option><option ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option></select></td><td>${new Date(order.createdAt).toLocaleDateString('en-IN')}</td></tr>`;
  }).join('');
}

function renderCustomers() {
  const customers = users.filter((user) => user.role !== 'admin');
  document.getElementById('statCustomers').textContent = customers.length.toLocaleString('en-IN');
  document.getElementById('customersTableBody').innerHTML = customers.map((user) => `<tr><td class="fw-semibold">${escapeHtml(user.name)}</td><td>${escapeHtml(user.email)}</td><td><span class="badge text-bg-light">${escapeHtml(user.role || 'customer')}</span></td><td>${orders.filter((order) => order.user?._id === user.id || order.user?.id === user.id).length}</td></tr>`).join('');
}

function renderDashboard() {
  document.getElementById('statProducts').textContent = products.length.toLocaleString('en-IN');
  document.getElementById('statOrders').textContent = orders.length.toLocaleString('en-IN');
  document.getElementById('statRevenue').textContent = `₹${orders.reduce((total, order) => total + Number(order.total || 0), 0).toLocaleString('en-IN')}`;
  renderCustomers();
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
  preview.classList.toggle('d-none', !source);
  if (source) preview.src = source;
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

async function refreshAll() {
  [products, orders, users] = await Promise.all([
    apiRequest('/products'),
    apiRequest('/orders/admin/all'),
    apiRequest('/auth/admin/users')
  ]);
  renderProducts();
  renderOrders();
  renderDashboard();
}

document.addEventListener('DOMContentLoaded', async () => {
  if (!requireAdmin()) return;
  const productModal = new bootstrap.Modal(document.getElementById('productModal'));
  try {
    const session = await apiRequest('/auth/me');
    if (session.user.role !== 'admin') throw new Error('Admin access required');
    await refreshAll();
  } catch (error) {
    showAlert(error.message || 'Could not load admin data');
  }

  document.getElementById('refreshBtn').addEventListener('click', refreshAll);
  document.getElementById('refreshOrdersBtn').addEventListener('click', refreshAll);
  document.getElementById('adminProductSearch').addEventListener('input', (event) => { productQuery = event.target.value.trim().toLowerCase(); renderProducts(); });
  document.getElementById('addProductBtn').addEventListener('click', () => { document.getElementById('modalTitle').textContent = 'Add Product'; fillForm(); productModal.show(); });
  document.getElementById('logoutBtn').addEventListener('click', () => { localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(USER_KEY); window.location.href = 'login.html'; });
  document.getElementById('productImage').addEventListener('input', (event) => updateImagePreview(event.target.value.trim()));

  document.getElementById('productsTableBody').addEventListener('click', async (event) => {
    const editButton = event.target.closest('[data-edit-id]');
    const deleteButton = event.target.closest('[data-delete-id]');
    if (editButton) { const product = products.find((item) => item.id === Number(editButton.dataset.editId)); document.getElementById('modalTitle').textContent = 'Edit Product'; fillForm(product); productModal.show(); }
    if (deleteButton) {
      const product = products.find((item) => item.id === Number(deleteButton.dataset.deleteId));
      if (!product || !window.confirm(`Delete ${product.name}?`)) return;
      try { await apiRequest(`/products/${product.id}`, { method: 'DELETE' }); await refreshAll(); showAlert('Product deleted.', 'success'); } catch (error) { showAlert(error.message); }
    }
  });

  document.getElementById('productForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = document.getElementById('productId').value;
    const button = document.getElementById('saveProductBtn');
    button.disabled = true;
    try {
      const response = await apiRequest(id ? `/products/${id}` : '/products', { method: id ? 'PUT' : 'POST', body: JSON.stringify(formData()) });
      productModal.hide();
      await refreshAll();
      showAlert(id ? 'Product updated.' : `Product ${response.name} added.`, 'success');
    } catch (error) { showAlert(error.message); } finally { button.disabled = false; }
  });

  document.getElementById('ordersTableBody').addEventListener('change', async (event) => {
    if (!event.target.matches('.order-status')) return;
    try { await apiRequest(`/orders/${encodeURIComponent(event.target.dataset.orderId)}/status`, { method: 'PUT', body: JSON.stringify({ status: event.target.value }) }); await refreshAll(); showAlert('Order status updated.', 'success'); } catch (error) { showAlert(error.message); }
  });

  document.getElementById('createCustomerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
      await apiRequest('/auth/signup', { method: 'POST', body: JSON.stringify({ name: document.getElementById('customerName').value.trim(), email: document.getElementById('customerEmail').value.trim().toLowerCase(), password: document.getElementById('customerPassword').value }) });
      event.target.reset(); await refreshAll(); showAlert('Customer account created.', 'success');
    } catch (error) { showAlert(error.message); }
  });
});
