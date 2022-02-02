const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LotSchema = new Schema({
  lot:          { type: String, required: true },
  raw:          { type: Schema.Types.ObjectId, ref: 'raws' },
  blend:        { type: Schema.Types.ObjectId, ref: 'blends' },
  bulk:         { type: Schema.Types.ObjectId, ref: 'bulks' },
  fg:           { type: Schema.Types.ObjectId, ref: 'finishedgoods' },
  type:         { type: String, default: 'raw' },
  date_created: { type: Date,   default: Date.now },
  department:   { type: String, default: 'Quality Control'},
  prior_lot:    { type: Schema.Types.ObjectId, ref: 'lots', default: null },
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
  },
  raw_lots_used: [{ type: Schema.Types.ObjectId, ref: 'rawlots' }],
  tests: [{ type: Schema.Types.ObjectId, ref: 'tests' }]
});

const Lot = mongoose.model('lots', LotSchema);

module.exports = Lot;
