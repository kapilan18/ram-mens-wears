const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

async function getOrCreateCart(userId) {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }
  return cart;
}

// GET /api/cart
router.get('/', async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user._id);
    res.json(cart.items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cart', error: error.message });
  }
});

// POST /api/cart  { productId, qty, size, color }
router.post('/', async (req, res) => {
  try {
    const { productId, qty = 1, size = '', color = '' } = req.body;
    const product = await Product.findOne({ id: Number(productId) });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const cart = await getOrCreateCart(req.user._id);
    const chosenSize = size || (product.sizes && product.sizes[0]) || '';
    const chosenColor = color || (product.colors && product.colors[0]) || '';

    const existing = cart.items.find(
      (item) =>
        item.productId === product.id &&
        item.size === chosenSize &&
        item.color === chosenColor
    );

    if (existing) {
      existing.qty += Number(qty);
    } else {
      cart.items.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        oldPrice: product.oldPrice,
        image: product.image,
        qty: Number(qty),
        size: chosenSize,
        color: chosenColor
      });
    }

    await cart.save();
    res.status(201).json(cart.items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add to cart', error: error.message });
  }
});

// PUT /api/cart/:itemId  { qty }  -- itemId is the cart sub-document _id
router.put('/:itemId', async (req, res) => {
  try {
    const { qty, change } = req.body;
    const cart = await getOrCreateCart(req.user._id);
    const item = cart.items.id(req.params.itemId);

    if (!item) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    if (typeof change === 'number') {
      item.qty = Math.max(1, item.qty + Number(change));
    } else if (typeof qty === 'number') {
      item.qty = Math.max(1, Number(qty));
    }

    await cart.save();
    res.json(cart.items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update cart item', error: error.message });
  }
});

// DELETE /api/cart/:itemId
router.delete('/:itemId', async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user._id);
    cart.items = cart.items.filter((item) => String(item._id) !== req.params.itemId);
    await cart.save();
    res.json(cart.items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove cart item', error: error.message });
  }
});

// DELETE /api/cart  -- clear entire cart (used after placing an order)
router.delete('/', async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user._id);
    cart.items = [];
    await cart.save();
    res.json(cart.items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to clear cart', error: error.message });
  }
});

module.exports = router;
