// @ts-check
import { test, expect } from '@playwright/test';

const apiBase = process.env.API_BASE_URL || 'http://localhost:5000/api';
const uniqueEmail = `playwright-${Date.now()}@example.invalid`;
const password = 'Playwright-Test-Password-123!';

let testUser;

test.beforeAll(async ({ request }) => {
  const response = await request.post(`${apiBase}/auth/signup`, {
    data: { name: 'Playwright Customer', email: uniqueEmail, password }
  });
  expect(response.status()).toBe(201);
  const body = await response.json();
  testUser = body.user;
});

test('customer can log in and browse products', async ({ page }) => {
  await page.goto('/login.html');
  await page.getByRole('textbox', { name: 'Email Address' }).first().fill(uniqueEmail);
  await page.getByRole('textbox', { name: 'Password' }).first().fill(password);
  await page.getByRole('button', { name: 'Sign In to Account' }).click();
  await expect(page).toHaveURL(/(index\.html|\/$)/);
  await page.goto('/products.html');
  await expect(page.locator('#productGrid .product-card-modern').first()).toBeVisible();
});

test('customer can add a backend product to the cart', async ({ page }) => {
  await page.goto('/login.html');
  await page.getByRole('textbox', { name: 'Email Address' }).first().fill(uniqueEmail);
  await page.getByRole('textbox', { name: 'Password' }).first().fill(password);
  await page.getByRole('button', { name: 'Sign In to Account' }).click();
  await page.goto('/products.html');
  await page.locator('.add-to-cart-btn').first().click();
  await expect(page.locator('#toastContainer')).toContainText('added to cart');
  await page.goto('/cart.html');
  await expect(page.locator('#cartItemsContainer .cart-item-card').first()).toBeVisible();
});

test('customer can create an account through the frontend', async ({ page }) => {
  const email = `signup-${Date.now()}@example.invalid`;
  await page.goto('/login.html');
  await page.getByRole('textbox', { name: 'Full Name' }).fill('Signup Customer');
  await page.getByRole('textbox', { name: 'Email Address' }).nth(1).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).nth(1).fill(password);
  await page.getByRole('button', { name: 'Create Account' }).click();
  await expect(page).toHaveURL(/(index\.html|\/$)/);
});

test('admin can open the backend-backed admin dashboard when test credentials are supplied', async ({ page }) => {
  test.skip(!process.env.TEST_ADMIN_EMAIL || !process.env.TEST_ADMIN_PASSWORD, 'Set TEST_ADMIN_EMAIL and TEST_ADMIN_PASSWORD for the admin E2E flow');
  await page.goto('/login.html');
  await page.getByRole('textbox', { name: 'Email Address' }).first().fill(process.env.TEST_ADMIN_EMAIL);
  await page.getByRole('textbox', { name: 'Password' }).first().fill(process.env.TEST_ADMIN_PASSWORD);
  await page.getByRole('button', { name: 'Sign In to Account' }).click();
  await expect(page).toHaveURL(/admin\.html/);
  await expect(page.locator('#productsTableBody')).toBeVisible();
});
