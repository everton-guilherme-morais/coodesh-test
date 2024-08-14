const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  code: { type: String, unique: true },
  status: { type: String, enum: ['draft', 'trash', 'published'], default: 'draft' },
  imported_t: { type: Date, default: Date.now },
  url: String,
  creator: String,
  created_t: Date,
  last_modified_t: Date,
  product_name: String,
  quantity: String,
  brands: [String],
  categories: [String],
  labels: [String],
  cities: [String],
  purchase_places: [String],
  stores: [String],
  ingredients_text: String,
  traces: String,
  serving_size: String,
  serving_quantity: Number,
  nutriscore_score: Number,
  nutriscore_grade: String,
  main_category: String,
  image_url: String
});

module.exports = mongoose.model('Product', ProductSchema);
