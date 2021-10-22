const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RawSchema = mongoose.connection.model('raw', require('./Raw.js'));

const AssaySampleSchema = new Schema({
  assay: { type: Schema.Types.ObjectId, ref: 'assays' },
  samples: [{
    sample_number: { type: Number },
    amount: { type: Number },
    units: { type: String },
    result: { type: Number },
    sent_to: { type: Schema.Types.ObjectId, ref: 'labs' },
    sample_date: { type: Date },
    sent_date: { type: Date },
    result_date: { type: Date }
  }]
});
const IdentitySampleSchema = new Schema({
  identity: { type: Schema.Types.ObjectId, ref: 'ids' },
  samples: [{
    sample_number: { type: Number },
    amount: { type: Number },
    units: { type: String },
    result: { type: Boolean },
    sent_to: { type: Schema.Types.ObjectId, ref: 'labs' },
    sample_date: { type: Date },
    sent_date: { type: Date },
    result_date: { type: Date },
  }]
});
const HmSampleSchema = new Schema({
  sample_number: { type: Number },
  amount: { type: Number },
  units:  { type: String },
  arsenic: { type: Number },
  cadmium: { type: Number },
  lead:    { type: Number },
  mercury: { type: Number },
  nickel:  { type: Number },
  sent_to: { type: Schema.Types.ObjectId, ref: 'labs' },
  sample_date: { type: Date },
  sent_date:   { type: Date },
  result_date: { type: Date },
});
const MicroSampleSchema = new Schema({
  sample_number: { type: Number },
  amount: { type: Number },
  units:  { type: String },
  tpc: { type: Number },
  ym:  { type: Number },
  entero: { type: Number },
  salmonella: { type: String },
  ecoli:      { type: String },
  staph:      { type: String },
  paeru:      { type: String },
  sent_to: { type: Schema.Types.ObjectId, ref: 'labs' },
  sample_date: { type: Date },
  sent_date: { type: Date },
  result_date: { type: Date },
});
const PesticideSampleSchema = new Schema({
  sample_number: { type: Number },
  amount: { type: Number },
  units:  { type: String },
  result: { type: Boolean },
  sent_to: { type: Schema.Types.ObjectId, ref: 'labs' },
  sample_date: { type: Date },
  sent_date: { type: Date },
  result_date: { type: Date },
});
const MoistureSampleSchema = new Schema({
  sample_number: { type: Number },
  amount: { type: Number },
  units:  { type: String },
  result: { type: Number },
  sent_to: { type: Schema.Types.ObjectId, ref: 'labs' },
  sample_date: { type: Date },
  sent_date: { type: Date },
  result_date: { type: Date },
});
const DensitySampleSchema = new Schema({
  sample_number: { type: Number },
  amount: { type: Number },
  units:  { type: String },
  result: { type: Number },
  sent_to: { type: Schema.Types.ObjectId, ref: 'labs' },
  sample_date: { type: Date },
  sent_date: { type: Date },
  result_date: { type: Date },
});
const SolventSampleSchema = new Schema({
  sample_number: { type: Number },
  amount: { type: Number },
  units:  { type: String },
  result: { type: Boolean },
  sent_to: { type: Schema.Types.ObjectId, ref: 'labs' },
  sample_date: { type: Date },
  sent_date: { type: Date },
  result_date: { type: Date },
});
const AllergenSampleSchema = new Schema({
  sample_number: { type: Number },
  amount: { type: Number },
  units:  { type: String },
  allergen: { type: String },
  sent_to: { type: Schema.Types.ObjectId, ref: 'labs' },
  sample_date: { type: Date },
  sent_date: { type: Date },
  result_date: { type: Date },
});
const RanciditySampleSchema = new Schema({
  sample_number: { type: Number },
  amount: { type: Number },
  units:  { type: String },
  peroxide: { type: Number },
  anisidine: { type: Number },
  sent_to: { type: Schema.Types.ObjectId, ref: 'labs' },
  sample_date: { type: Date },
  sent_date: { type: Date },
  result_date: { type: Date },
});

const RawLotSchema = new Schema({
  lot:          { type: String, required: true },
  item:         { type: Schema.Types.ObjectId, ref: 'raws', required: true},
  item_type:    { type: String, default: 'raw' },
  date_created: { type: Date,   default: Date.now },
  department:   { type: String, default: 'Quality Control'},
  inventory: {
    amount:     { type: Number },
    units:      { type: String },
    status:     { type: String },
    expiration: { type: Date },
  },
  receiving: {
    facility:         { type: String, required: true },
    location:         { type: String },
    purchase_order:   { type: Number },
    manufacturer:     { type: Schema.Types.ObjectId, ref: 'manufacturers' },
    manufacturer_lot: { type: String },
    vendor:           { type: Schema.Types.ObjectId, ref: 'vendors' },
  },
  testing: {
    assay:      [AssaySampleSchema],
    identity:   [IdentitySampleSchema],
    hm:         [HmSampleSchema],
    micro:      [MicroSampleSchema],
    pesticide:  [PesticideSampleSchema],
    moisture:   [MoistureSampleSchema],
    density:    [DensitySampleSchema],
    solvent:    [SolventSampleSchema],
    allergen:   [AllergenSampleSchema],
    rancidity:  [RanciditySampleSchema],
    passes_all_testing: { type: Boolean }
  },
});

module.exports = RawLotSchema;
