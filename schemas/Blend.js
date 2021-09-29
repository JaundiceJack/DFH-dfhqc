const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlendSchema = new Schema({
  number:        { type: Number, required: true, unique: true },
  name:          { type: String, required: true },
  batch_size:    { type: Number },
  units_per_serving: { type: Number },
  customer:      { type: String },
  ingredients: [
    {
      raw_id:          { type: Schema.Types.ObjectId, ref: 'raws' },
      raw_name:        { type: String },
      raw_number:      { type: Number },
      claim:           { type: Number },
      claim_units:     { type: String },
      potency:         { type: Number },
      overage:         { type: Number },
      ingredient_type: { type: String }
    }
  ],
});

module.exports = BlendSchema;
