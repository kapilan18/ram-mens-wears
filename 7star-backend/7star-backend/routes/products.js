const express = require('express');
const Product = require('../models/Product');
const { protect, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// GET /api/products?category=Men&search=shirt
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    const filter = {};

    if (category && category !== 'All') {
      filter.category = category;
    }
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    const products = await Product.find(filter).sort({ id: 1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ id: Number(req.params.id) });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch product', error: error.message });
  }
});

router.post('/', protect, requireAdmin, async (req, res) => {
  try {
    const productData = normalizeProduct(req.body);
    if (!productData.name || !productData.category || !Number.isFinite(productData.price)) {
      return res.status(400).json({ message: 'Name, category and price are required' });
    }

    if (!Number.isFinite(productData.id)) {
      const latest = await Product.findOne().sort({ id: -1 });
      productData.id = latest ? latest.id + 1 : 1;
    }

    const product = await Product.create(productData);
    res.status(201).json(product);
  } catch (error) {
    res.status(error.code === 11000 ? 409 : 400).json({ message: 'Failed to create product', error: error.message });
  }
});

router.put('/:id', protect, requireAdmin, async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { id: Number(req.params.id) },
      normalizeProduct(req.body),
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update product', error: error.message });
  }
});

router.delete('/:id', protect, requireAdmin, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ id: Number(req.params.id) });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error: error.message });
  }
});

function normalizeProduct(body = {}) {
  return {
    ...(body.id !== undefined && { id: Number(body.id) }),
    name: String(body.name || '').trim(),
    category: String(body.category || '').trim(),
    price: Number(body.price),
    oldPrice: body.oldPrice === '' || body.oldPrice === undefined ? undefined : Number(body.oldPrice),
    discountPercent: body.discountPercent === '' || body.discountPercent === undefined ? 0 : Number(body.discountPercent),
    image: String(body.image || '').trim(),
    rating: body.rating === '' || body.rating === undefined ? 4.5 : Number(body.rating),
    sizes: Array.isArray(body.sizes) ? body.sizes : String(body.sizes || '').split(',').map((value) => value.trim()).filter(Boolean),
    colors: Array.isArray(body.colors) ? body.colors : String(body.colors || '').split(',').map((value) => value.trim()).filter(Boolean)
  };
}

module.exports = router;
