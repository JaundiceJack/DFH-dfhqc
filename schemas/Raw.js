const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RawSchema = new Schema({
  number: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
//Organoleptics
  color: { type: String },
  odor: { type: String },
  taste: { type: String },
  texture: { type: String },
//Heavy Metals
  arsenic_max: { type: Number },
  cadmium_max: { type: Number },
  lead_max: { type: Number },
  mercury_max: { type: Number },
  nickel_max: { type: Number },
  nickel_tested: { type: Boolean },
  hm_units: { type: String },
//Moisture
  moisture_max: { type: Number, min: 0, max: 100 },
  moisture_min: { type: Number, min: 0, max: 100 },
//Density
  density_max: { type: Number },
  density_min: { type: Number },
//Micros
  tpc_max: { type: Number },
  tpc_units: { type: String, default: "CFU/g" },
  ym_max: { type: Number },
  ym_units: { type: String, default: "CFU/g" },
  entero_max: { type: Number, default: 100 },
  entero_units: { type: String, default: "MPN/g" },
  salmonella: { type: String, default: "Negative" },
  staph: { type: String, default: "Negative" },
  ecoli: { type: String, default: "Negative" },
  paeru: { type: String, default: "Negative" },
  paeru_tested: { type: Boolean },
//Assays
  assays: [{
    assay_id: {type: Schema.Types.ObjectId, ref: 'assays'},
    assay_name: {type: String},
    assay_min: {type: Number},
    assay_max: {type: Number},
    assay_units: {type: String},
    assay_method: {type: String}
  }],
//IDs
  ids: [{
    identity_id: {type: Schema.Types.ObjectId, ref: 'identity'},
    identity_name: {type: String},
    identity_method: {type: String},
    identity_posneg: {type: String},
    identity_is_botanical: {type: Boolean},
    identity_genus: {type: String},
    identity_species: {type: String},
    identity_part: {type: String},
    identity_solvent: {type: String},
    identity_ratio: {type: String}
  }],
//Pesticides
  pesticide_tested: { type: Boolean },
  pesticide_standard: { type: String },
  pesticide_last_tested: { type: Date },
// Solvents
  solvent_tested: { type: Boolean },
  solvent_standard: { type: String },
  solvent_last_tested: { type: Date },
// Rancidity
  rancidity_tested: { type: Boolean },
  rancidity_last_tested: { type: Date },
  peroxide_max: { type: Number },
  p_anisidine_max: { type: Number },
  totox_max: { type: Number },
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
//

});

module.exports = RawSchema;
