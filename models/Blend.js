const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlendSchema = new Schema({
  number:        { type: Number, required: true, unique: true },
  name:          { type: String, required: true },
  lots: [{ type: Schema.Types.ObjectId, ref: 'lots' }],
  batch_size:    { type: Number },
  units_per_serving: { type: Number },
  customer:      { type: String },
  ingredients: [
    {
      raw:     { type: Schema.Types.ObjectId, ref: 'raws' },
      units:   { type: String, default: 'mg/serving' },
      claim:   { type: Number },
      potency: { type: Number },
      overage: { type: Number },
      type:    { type: String }
    }
  ],
  hm: {
    arsenic: { type: Number },
    cadmium: { type: Number },
    lead:    { type: Number },
    mercury: { type: Number },
    nickel:  { type: Number },
    nickel_tested: { type: Boolean },
    units:   { type: String },
    lots_passing: [{ lot: { type: Schema.Types.ObjectId, ref: 'lots' }, date: { type: Date } }],
    lots_failing: [{ lot: { type: Schema.Types.ObjectId, ref: 'lots' }, date: { type: Date } }]
  },
  micro: {
    tpc: { type: Number },
    tpc_units: { type: String, default: "CFU/g" },
    ym:  { type: Number },
    ym_units: { type: String, default: "CFU/g" },
    entero: { type: Number },
    entero_units: { type: String, default: "MPN/g" },
    salmonella: { type: String, default: "Negative" },
    staph: { type: String, default: "Negative" },
    ecoli: { type: String, default: "Negative" },
    paeru: { type: String, default: "Negative" },
    paeru_tested: { type: Boolean },
    lots_passing: [{ lot: { type: Schema.Types.ObjectId, ref: 'lots' }, date: { type: Date } }],
    lots_failing: [{ lot: { type: Schema.Types.ObjectId, ref: 'lots' }, date: { type: Date } }]
  },
  moisture: {
    min: { type: Number, min: 0, max: 100 },
    max: { type: Number, min: 0, max: 100 }
  },
  density: {
    min: { type: Number },
    max: { type: Number }
  },
  average_weight: {
    min: { type: Number },
    max: { type: Number }
  },
});

const Blend = mongoose.model('blends', BlendSchema);

module.exports = Blend;
