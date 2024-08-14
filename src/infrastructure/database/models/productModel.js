const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  code: { type: String, unique: true },
  name: String,
  imported_t: { type: Date, default: Date.now },
  status: { type: String, enum: ['draft', 'trash', 'published'], default: 'draft' },
});

module.exports = mongoose.model('Product', ProductSchema);
