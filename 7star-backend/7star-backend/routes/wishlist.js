const express = require('express');
const Wishlist = require('../models/Wishlist');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

async function getOrCreateWishlist(userId) {
  let wishlist = await Wishlist.findOne({ user: userId });
  if (!wishlist) {
    wishlist = await Wishlist.create({ user: userId, productIds: [] });
  }
  return wishlist;
}

// GET /api/wishlist
router.get('/', async (req, res) => {
  try {
    const wishlist = await getOrCreateWishlist(req.user._id);
    res.json(wishlist.productIds);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch wishlist', error: error.message });
  }
});

// POST /api/wishlist  { productId }  -- toggles the product in/out of the wishlist
router.post('/', async (req, res) => {
  try {
    const productId = Number(req.body.productId);
    const wishlist = await getOrCreateWishlist(req.user._id);

    const index = wishlist.productIds.indexOf(productId);
    if (index >= 0) {
      wishlist.productIds.splice(index, 1);
    } else {
      wishlist.productIds.push(productId);
    }

    await wishlist.save();
    res.json(wishlist.productIds);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update wishlist', error: error.message });
  }
});

// DELETE /api/wishlist/:productId
router.delete('/:productId', async (req, res) => {
  try {
    const productId = Number(req.params.productId);
    const wishlist = await getOrCreateWishlist(req.user._id);
    wishlist.productIds = wishlist.productIds.filter((id) => id !== productId);
    await wishlist.save();
    res.json(wishlist.productIds);
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove from wishlist', error: error.message });
  }
});

module.exports = router;
