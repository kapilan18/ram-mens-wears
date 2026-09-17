const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  name: String,
  price: Number,
  oldPrice: Number,
  image: String,
  qty: { type: Number, default: 1, min: 1 },
  size: { type: String, default: '' },
  color: { type: String, default: '' }
});

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: { type: [cartItemSchema], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);
