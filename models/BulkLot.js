const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BulkLotSchema = new Schema({
  lot:          { type: String, required: true },
  item:         { type: Schema.Types.ObjectId, ref: 'bulks', required: true },
  item_type:    { type: String, default: 'bulk' },
  date_created: { type: Date, default: Date.now },
  department:   { type: String, default: 'Quality Control'},
  inventory: {
    amount: { type: Number },
    units:  { type: String },
  },
  receiving: {
    facility: { type: String },
    location: { type: String },
  }
});

const BulkLot = mongoose.model('bulklots', BulkLotSchema);

module.exports = BulkLot;
