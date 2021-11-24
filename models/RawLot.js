const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RawLotSchema = new Schema({
  lot:          { type: String, required: true },
  item:         { type: Schema.Types.ObjectId, ref: 'raws', required: true},
  item_type:    { type: String, default: 'raw' },
  date_created: { type: Date,   default: Date.now },
  department:   { type: String, default: 'Quality Control'},
  inventory: {
    amount:     { type: Number },
    units:      { type: String },
    status:     { type: String },
    expiration: { type: Date },
  },
  receiving: {
    facility:         { type: String, required: true },
    location:         { type: String },
    purchase_order:   { type: Number },
    manufacturer:     { type: Schema.Types.ObjectId, ref: 'manufacturers' },
    manufacturer_lot: { type: String },
    vendor:           { type: Schema.Types.ObjectId, ref: 'vendors' },
  }
});

const RawLot = mongoose.model('rawlots', RawLotSchema);

module.exports = RawLot;
