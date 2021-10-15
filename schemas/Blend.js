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
      raw:             { type: Schema.Types.ObjectId, ref: 'raws' },
      units:           { type: String, default: 'mg/serving' },
      claim:           { type: Number },
      potency:         { type: Number },
      overage:         { type: Number },
      type:            { type: String }
    }
  ],
});

module.exports = BlendSchema;
