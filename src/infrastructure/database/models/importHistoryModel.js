const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImportHistorySchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  file: String,
  status: {
    type: String,
    enum: ['success', 'failure'],
    default: 'success',
  },
});

module.exports = mongoose.model('ImportHistory', ImportHistorySchema);
