const express = require('express');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const { protect, requireAdmin } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

function calculateTotals(items) {
  const subtotal = items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 1), 0);
  const delivery = subtotal > 0 ? (subtotal >= 3000 ? 0 : 99) : 0;
  const discount = subtotal > 0 ? Math.round(subtotal * 0.08) : 0;
  const total = Math.max(subtotal + delivery - discount, 0);
  return { subtotal, delivery, discount, total };
}

// POST /api/orders  { name, phone, address, city, pincode, payment }
router.post('/', async (req, res) => {
  try {
    const { name, phone, address, city, pincode, payment } = req.body;

    if (!name || !phone || !address || !city || !pincode) {
      return res.status(400).json({ message: 'All delivery details are required' });
    }

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart || !cart.items.length) {
      return res.status(400).json({ message: 'Your cart is empty' });
    }

    const totals = calculateTotals(cart.items);
    const orderId = `7STAR-${Date.now().toString().slice(-6)}`;

    const order = await Order.create({
      orderId,
      user: req.user._id,
      items: cart.items.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        image: item.image,
        qty: item.qty,
        size: item.size,
        color: item.color
      })),
      address: { name, phone, address, city, pincode },
      paymentMethod: payment || 'COD',
      ...totals
    });

    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to place order', error: error.message });
  }
});

// GET /api/orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
});

// GET /api/orders/admin/all
router.get('/admin/all', requireAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch customer orders', error: error.message });
  }
});

// GET /api/orders/:orderId
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId, user: req.user._id });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch order', error: error.message });
  }
});

module.exports = router;
