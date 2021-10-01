const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RawSchema = mongoose.connection.model('raw', require('./Raw.js'));

const AssayResultSchema = new Schema({
  assay: { type: Schema.Types.ObjectId, ref: 'assays' },
  result: { type: Number },
  sent_to: { type: Schema.Types.ObjectId, ref: 'labs' },
  sent_date: { type: Date },
  result_date: { type: Date },
});
const IdentityResultSchema = new Schema({
  identity: { type: Schema.Types.ObjectId, ref: 'ids' },
  result: { type: Boolean },
  sent_to: { type: Schema.Types.ObjectId, ref: 'labs' },
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
  sent_date: { type: Date },
  result_date: { type: Date },
});
const PesticideResultSchema = new Schema({
  result: { type: Boolean },
  sent_to: { type: Schema.Types.ObjectId, ref: 'labs' },
  sent_date: { type: Date },
  result_date: { type: Date },
});
const MoistureResultSchema = new Schema({
  result: { type: Number },
  sent_to: { type: Schema.Types.ObjectId, ref: 'labs' },
  sent_date: { type: Date },
  result_date: { type: Date },
});
const DensityResultSchema = new Schema({
  result: { type: Number },
  sent_to: { type: Schema.Types.ObjectId, ref: 'labs' },
  sent_date: { type: Date },
  result_date: { type: Date },
});
const SolventResultSchema = new Schema({
  result: { type: Boolean },
  sent_to: { type: Schema.Types.ObjectId, ref: 'labs' },
  sent_date: { type: Date },
  result_date: { type: Date },
});
const AllergenResultSchema = new Schema({
  allergen: { type: String },
  sent_to: { type: Schema.Types.ObjectId, ref: 'labs' },
  sent_date: { type: Date },
  result_date: { type: Date },
});
const RancidityResultSchema = new Schema({
  peroxide: { type: Number },
  p_anisidine: { type: Number },
  sent_to: { type: Schema.Types.ObjectId, ref: 'labs' },
  sent_date: { type: Date },
  result_date: { type: Date },
});

const RawLotSchema = new Schema({
  lot:                { type: String, required: true },
  item:               { type: Schema.Types.ObjectId, ref: 'raws', required: true},
  item_type:          { type: String, default: 'raw' },
  facility_location:  { type: String, required: true },
  warehouse_location: { type: String },
  purchase_order:     { type: Number },
  amount:             { type: Number },
  amount_units:       { type: String },
  manufacturer_id:    { type: Schema.Types.ObjectId, ref: 'manufacturers' },
  vendor_id:          { type: Schema.Types.ObjectId, ref: 'vendors' },
  maker_lot:          { type: String },
  date_created:       { type: Date, default: Date.now },
  assay_results:      [AssayResultSchema],
  identity_results:   [IdentityResultSchema],
  hm_results:         [HmResultSchema],
  micro_results:      [MicroResultSchema],
  pesticide_results:  [PesticideResultSchema],
  moisture_results:   [MoistureResultSchema],
  density_results:    [DensityResultSchema],
  solvent_results:    [SolventResultSchema],
  allergen_results:   [AllergenResultSchema],
  rancidity_results:  [RancidityResultSchema],
  passes_all_testing: { type: Boolean }
});

module.exports = RawLotSchema;
