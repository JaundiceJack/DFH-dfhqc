const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: The annual testing (pesticides, rancidity, solvents) can be turned into
// an array of annual test references to an annualTesting schema
// then I'd be able to add any test for annual checking

const RawSchema = new Schema({
  number: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  lots: [{ type: Schema.Types.ObjectId, ref: 'lots' }],
  color: { type: String },
  odor: { type: String },
  taste: { type: String },
  texture: { type: Schema.Types.ObjectId, ref: 'textures' },
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
  },
  assays: [{
    assay:  { type: Schema.Types.ObjectId, ref: 'assays' },
    units:  { type: Schema.Types.ObjectId, ref: 'units' },
    method: { type: Schema.Types.ObjectId, ref: 'methods' },
    min:  { type: Number },
    max:  { type: Number },
  }],
  ids: [{
    identity: { type: Schema.Types.ObjectId, ref: 'ids' },
    method:   { type: Schema.Types.ObjectId, ref: 'methods' },
    posneg:   { type: String },
  }],
  pesticide: {
    tested: { type: Boolean },
    standard: { type: String },
    lots_passing: [{ lot: { type: Schema.Types.ObjectId, ref: 'lots' }, date: { type: Date } }],
    lots_failing: [{ lot: { type: Schema.Types.ObjectId, ref: 'lots' }, date: { type: Date } }]
  },
  solvent: {
    tested: { type: Boolean },
    standard: { type: String },
    lots_passing: [{ lot: { type: Schema.Types.ObjectId, ref: 'lots' }, date: { type: Date } }],
    lots_failing: [{ lot: { type: Schema.Types.ObjectId, ref: 'lots' }, date: { type: Date } }]
  },
  rancidity: {
    tested: { type: Boolean },
    peroxide: { type: Number },
    anisidine: { type: Number },
    totox: { type: Number },
    lots_passing: [{ lot: { type: Schema.Types.ObjectId, ref: 'lots' }, date: { type: Date } }],
    lots_failing: [{ lot: { type: Schema.Types.ObjectId, ref: 'lots' }, date: { type: Date } }]
  },
  allergens: {
    soy: {type: Boolean},
    egg: {type: Boolean},
    milk: {type: Boolean},
    fish: {type: Boolean},
    wheat: {type: Boolean},
    peanut: {type: Boolean},
    tree_nut: {type: Boolean},
    shellfish: {type: Boolean},
  }
});

const Raw = mongoose.model('raws', RawSchema);

module.exports = Raw;
