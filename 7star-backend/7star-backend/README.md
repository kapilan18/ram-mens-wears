# 7STAR Backend (Express + MongoDB)

This is the backend API for your 7STAR shopping site. It replaces the old
`localStorage`-based cart / wishlist / login / orders with a real
Express.js server backed by MongoDB.

## 1. Install prerequisites

- Node.js (v18+) — https://nodejs.org
- MongoDB — either:
  - **Local**: install MongoDB Community Server and run it (`mongod`), OR
  - **Cloud (easiest)**: create a free cluster at https://www.mongodb.com/cloud/atlas
    and copy its connection string.

## 2. Install dependencies

```bash
cd 7star-backend
npm install
```

## 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env`:
- `MONGO_URI` — your local (`mongodb://127.0.0.1:27017/sevenstar`) or Atlas connection string
- `JWT_SECRET` — any long random string (used to sign login tokens)
- `CLIENT_ORIGIN` — the URL(s) your frontend runs on (e.g. Live Server's `http://127.0.0.1:5500`)

## 4. Seed the database with your products

This loads the same 15 products from your old `products.js` into MongoDB:

```bash
npm run seed
```

## 5. Start the server

```bash
npm run dev     # with nodemon (auto-restarts on changes)
# or
npm start
```

You should see:
```
MongoDB connected: ...
7STAR backend running on http://localhost:5000
```

## 6. Enable the admin product page

Create an account from the frontend first, then promote that account once:

```bash
npm run make-admin -- your-email@example.com
```

Sign out and sign in again so the frontend receives the updated admin role. Then open `admin.html` from the frontend folder. Admins can add, edit, and delete products; normal users can only view products.

## 7. Run the frontend

Open the frontend files (`index.html`, `products.html`, etc.) with a local
server such as VS Code's "Live Server" extension — don't just double-click
the HTML file, since `fetch()` calls need it served over `http://`.

In `app.js`, `API_BASE` is set to `http://localhost:5000/api`. Change it if
your backend runs somewhere else.

## API Endpoints

| Method | Endpoint                | Auth? | Description                        |
|--------|--------------------------|-------|-------------------------------------|
| POST   | /api/auth/signup         | No    | Create account                      |
| POST   | /api/auth/login          | No    | Login, returns JWT                  |
| GET    | /api/auth/me             | Yes   | Get current logged-in user          |
| GET    | /api/products            | No    | List all products                   |
| GET    | /api/products/:id        | No    | Get one product                     |
| GET    | /api/cart                | Yes   | Get logged-in user's cart           |
| POST   | /api/cart                | Yes   | Add item to cart                    |
| PUT    | /api/cart/:itemId        | Yes   | Update qty of a cart item           |
| DELETE | /api/cart/:itemId        | Yes   | Remove one cart item                |
| DELETE | /api/cart                | Yes   | Clear the whole cart                |
| GET    | /api/wishlist            | Yes   | Get wishlist product ids            |
| POST   | /api/wishlist            | Yes   | Toggle a product in/out of wishlist |
| DELETE | /api/wishlist/:productId | Yes   | Remove a product from wishlist      |
| POST   | /api/orders              | Yes   | Place an order from the cart        |
| GET    | /api/orders              | Yes   | List logged-in user's orders        |
| GET    | /api/orders/:orderId     | Yes   | Get one order                       |

Authenticated requests need a header:
```
Authorization: Bearer <token>
```
(`app.js` on the frontend already does this automatically once a user logs in.)

## Folder structure

```
7star-backend/
  config/db.js         MongoDB connection
  models/               Mongoose schemas (User, Product, Cart, Wishlist, Order)
  middleware/auth.js    JWT auth guard
  routes/                auth.js, products.js, cart.js, wishlist.js, orders.js
  server.js             App entry point
  seed.js / seedData.js  One-time product import script
```
