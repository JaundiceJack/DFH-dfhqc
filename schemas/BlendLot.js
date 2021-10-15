const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssayResultSchema = new Schema({
  assay: { type: Schema.Types.ObjectId, ref: 'assays' },
  result: { type: Number },
  sent_to: { type: Schema.Types.ObjectId, ref: 'labs' },
  sample_date: { type: Date },
  sent_date: { type: Date },
  result_date: { type: Date },
});
const IdentityResultSchema = new Schema({
  identity: { type: Schema.Types.ObjectId, ref: 'ids' },
  result: { type: Boolean },
  sent_to: { type: Schema.Types.ObjectId, ref: 'labs' },
  sample_date: { type: Date },
  sent_date: { type: Date },
  result_date: { type: Date },
});
const HmResultSchema = new Schema({
  arsenic: { type: Number },
  cadmium: { type: Number },
  lead:    { type: Number },
  mercury: { type: Number },
  nickel:  { type: Number },
  sent_to: { type: Schema.Types.ObjectId, ref: 'labs' },
  sample_date: { type: Date },
  sent_date: { type: Date },
  result_date: { type: Date },
});
const MicroResultSchema = new Schema({
  tpc: { type: Number },
  ym: { type: Number },
  entero: { type: Number },
  salmonella: { type: Boolean },
  ecoli:      { type: Boolean },
  staph:      { type: Boolean },
  paeru:      { type: Boolean },
  sent_to: { type: Schema.Types.ObjectId, ref: 'labs' },
  sample_date: { type: Date },
  sent_date: { type: Date },
  result_date: { type: Date },
});
const PesticideResultSchema = new Schema({
  result: { type: Boolean },
  sent_to: { type: Schema.Types.ObjectId, ref: 'labs' },
  sample_date: { type: Date },
  sent_date: { type: Date },
  result_date: { type: Date },
});
const MoistureResultSchema = new Schema({
  result: { type: Number },
  sent_to: { type: Schema.Types.ObjectId, ref: 'labs' },
  sample_date: { type: Date },
  sent_date: { type: Date },
  result_date: { type: Date },
});
const DensityResultSchema = new Schema({
  result: { type: Number },
  sent_to: { type: Schema.Types.ObjectId, ref: 'labs' },
  sample_date: { type: Date },
  sent_date: { type: Date },
  result_date: { type: Date },
});
const SolventResultSchema = new Schema({
  result: { type: Boolean },
  sent_to: { type: Schema.Types.ObjectId, ref: 'labs' },
  sample_date: { type: Date },
  sent_date: { type: Date },
  result_date: { type: Date },
});
const AllergenResultSchema = new Schema({
  allergen: { type: String },
  sent_to: { type: Schema.Types.ObjectId, ref: 'labs' },
  sample_date: { type: Date },
  sent_date: { type: Date },
  result_date: { type: Date },
});
const RancidityResultSchema = new Schema({
  peroxide: { type: Number },
  anisidine: { type: Number },
  sent_to: { type: Schema.Types.ObjectId, ref: 'labs' },
  sample_date: { type: Date },
  sent_date: { type: Date },
  result_date: { type: Date },
});

const BlendLotSchema = new Schema({
  lot:          { type: String, required: true },
  item:         { type: Schema.Types.ObjectId, ref: 'blends', required: true},
  item_type:    { type: String, default: 'blend' },
  date_created: { type: Date, default: Date.now },
  department:   { type: String, default: 'Quality Control'},
  inventory: {
    amount: { type: Number },
    units:  { type: String },
  },
  receiving: {
    facility: { type: String },
    location: { type: String },
  },
  testing: {
    assay:      [AssayResultSchema],
    identity:   [IdentityResultSchema],
    hm:         [HmResultSchema],
    micro:      [MicroResultSchema],
    pesticide:  [PesticideResultSchema],
    moisture:   [MoistureResultSchema],
    density:    [DensityResultSchema],
    solvent:    [SolventResultSchema],
    allergen:   [AllergenResultSchema],
    rancidity:  [RancidityResultSchema],
    passes_all_testing: { type: Boolean }
  },
});

module.exports = BlendLotSchema;
