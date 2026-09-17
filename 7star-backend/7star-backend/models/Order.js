const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: Number,
  name: String,
  price: Number,
  image: String,
  qty: Number,
  size: String,
  color: String
});

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: { type: [orderItemSchema], default: [] },
    address: {
      name: String,
      phone: String,
      address: String,
      city: String,
      pincode: String
    },
    paymentMethod: { type: String, default: 'COD' },
    subtotal: Number,
    delivery: Number,
    discount: Number,
    total: Number,
    status: { type: String, default: 'Placed' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
