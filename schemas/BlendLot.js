const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlendLotSchema = new Schema({
  lot:                { type: String, required: true },
  item_id:            { type: Schema.Types.ObjectId, ref: 'blends'},
  item_name:          { type: String },
  facility_location:  { type: String },
  warehouse_location: { type: String },
  purchase_order:     { type: Number },
  amount:             { type: Number },
  amount_units:       { type: String },
});

module.exports = BlendLotSchema;
