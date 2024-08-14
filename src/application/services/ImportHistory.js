const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImportHistorySchema = new Schema({
  date: { type: Date, default: Date.now },
  importedFiles: [String],
  productCount: Number,
  status: { type: String, enum: ['success', 'failure'], default: 'success' },
  error: String,
});

module.exports = mongoose.model('ImportHistory', ImportHistorySchema);
