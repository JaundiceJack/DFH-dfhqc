const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BulkSchema = new Schema({
  number:       { type: Number, required: true, unique: true },
  name:         { type: String, required: true },
  blend:        {
    blend_id: { type: Schema.Types.ObjectId, ref: 'blends' },
    blend_name: { type: String },
    blend_number: { type: Number }
  },
  dosage_type:  { type: String },
  cap_size:     {
    cap_id:     { type: Schema.Types.ObjectId, ref: 'raws' },
    cap_name:   { type: String },
    cap_number: { type: Number }
  },
  serving_units:    { type: String },
  batch_size:       { type: Number },
  fill_weight:      { type: Number },
  capsule_weight:   { type: Number },
  net_weight:       { type: Number },
  caps_per_batch:   { type: Number },
  caps_per_serving: { type: Number },
  caps_per_bottle:  { type: Number },
});

module.exports = BulkSchema;
