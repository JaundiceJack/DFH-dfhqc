const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RawSchema = mongoose.connection.model('raw', require('./Raw.js'));


// So, i'm trying to simplify the results interaction
// i was thinking instead of separate result objects for each one, modifying them would be simpler if there was just one
// but to do that i'd need to sequester the other info
// so, to have the lab and sent dates connected, i need them kind of how i'm doing it now, except the change for assay and id
// i'd like to change the interaction though
// to clicking a button at the top to show the sampling screen
// then for the basic ones, its just entering the date and sample amount,
// the amount should be subtracted from the lot's total amount,
// for the assay/id ones, it's selecting the one to sample first then date/amount

const AssaySampleSchema = new Schema({
  assay: { type: Schema.Types.ObjectId, ref: 'assays' },
  samples: [{
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
  amount: { type: Number },
  units:  { type: String },
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
const MicroSampleSchema = new Schema({
  amount: { type: Number },
  units:  { type: String },
  tpc: { type: Number },
  ym:  { type: Number },
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
const PesticideSampleSchema = new Schema({
  amount: { type: Number },
  units:  { type: String },
  result: { type: Boolean },
  sent_to: { type: Schema.Types.ObjectId, ref: 'labs' },
  sample_date: { type: Date },
  sent_date: { type: Date },
  result_date: { type: Date },
});
const MoistureSampleSchema = new Schema({
  amount: { type: Number },
  units:  { type: String },
  result: { type: Number },
  sent_to: { type: Schema.Types.ObjectId, ref: 'labs' },
  sample_date: { type: Date },
  sent_date: { type: Date },
  result_date: { type: Date },
});
const DensitySampleSchema = new Schema({
  amount: { type: Number },
  units:  { type: String },
  result: { type: Number },
  sent_to: { type: Schema.Types.ObjectId, ref: 'labs' },
  sample_date: { type: Date },
  sent_date: { type: Date },
  result_date: { type: Date },
});
const SolventSampleSchema = new Schema({
  amount: { type: Number },
  units:  { type: String },
  result: { type: Boolean },
  sent_to: { type: Schema.Types.ObjectId, ref: 'labs' },
  sample_date: { type: Date },
  sent_date: { type: Date },
  result_date: { type: Date },
});
const AllergenSampleSchema = new Schema({
  amount: { type: Number },
  units:  { type: String },
  allergen: { type: String },
  sent_to: { type: Schema.Types.ObjectId, ref: 'labs' },
  sample_date: { type: Date },
  sent_date: { type: Date },
  result_date: { type: Date },
});
const RanciditySampleSchema = new Schema({
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
