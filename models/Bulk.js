const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BulkSchema = new Schema({
  number:      { type: Number, required: true, unique: true },
  name:        { type: String, required: true },
  blend:       { type: Schema.Types.ObjectId, ref: 'blends' },
  dosage_type: { type: String },
  capsule:     { type: Schema.Types.ObjectId, ref: 'raws' },
  serving_units:    { type: String },
  batch_size:       { type: Number },
  fill_weight:      { type: Number },
  capsule_weight:   { type: Number },
  net_weight:       { type: Number },
  caps_per_batch:   { type: Number },
  caps_per_serving: { type: Number },
  caps_per_bottle:  { type: Number },
});

const Bulk = mongoose.model('bulks', BulkSchema);

module.exports = Bulk;
