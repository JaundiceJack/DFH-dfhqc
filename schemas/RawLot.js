const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RawLotSchema = new Schema({
  lot:                { type: String, required: true },
  item_id:            { type: Schema.Types.ObjectId, ref: 'raws'},
  item_name:          { type: String },
  facility_location:  { type: String },
  warehouse_location: { type: String },
  purchase_order:     { type: Number },
  amount:             { type: Number },
  amount_units:       { type: String },
  manufacturer_id:    { type: Schema.Types.ObjectId, ref: 'manufacturers' },
  manufacturer_name:  { type: String },
  vendor_id:          { type: Schema.Types.ObjectId, ref: 'vendors' },
  vendor_name:        { type: String },
  maker_lot:          { type: String }
});

module.exports = RawLotSchema;
