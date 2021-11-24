const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RawTestSchema = new Schema({
  type:     { type: String, required: true },
  lot:      { type: Schema.Types.ObjectId, ref: 'rawlots', required: true },
  assay:    { type: Schema.Types.ObjectId, ref: 'assays' },
  identity: { type: Schema.Types.ObjectId, ref: 'ids' },
  samples: [{
    lab: { type: Schema.Types.ObjectId, ref: 'labs' },
    number: { type: Number },
    amount: { type: Number },
    units:  { type: String },
    results: Object,
    date_sampled:   { type: Date },
    date_sent:      { type: Date },
    date_of_result: { type: Date }
  }]
});

const RawTest = mongoose.model("rawtests", RawTestSchema);

module.exports = RawTest;
