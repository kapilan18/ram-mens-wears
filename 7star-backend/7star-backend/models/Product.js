const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true }, // keeps the same numeric ids used by the old products.js
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    discountPercent: { type: Number, default: 0 },
    image: { type: String },
    rating: { type: Number, default: 4.5 },
    sizes: { type: [String], default: [] },
    colors: { type: [String], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
