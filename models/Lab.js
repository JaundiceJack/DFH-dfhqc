const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LabSchema = new Schema({
  name: { type: String, required: true, unique: true },
  contact: {
    emails: [String],
    phones: [String]
  },
  capabilities: [{
    assay: { type: Schema.Types.ObjectId, ref: 'assays' },
    identity: { type: Schema.Types.ObjectId, ref: 'ids'},
    price: { type: Number },
    method: { type: Schema.Types.ObjectId, ref: 'methods' },
    tat: { type: Number }
  }],
  tat: {
    standard: { type: Number, default: 10 },
    rush: { type: Number, default: 5 },
    rush_upcharge: { type: Number, default: 0.5 },
    emergency: { type: Number, default: 3 },
    emergency_upcharge: { type: Number, default: 1 },
  },
  shipping: {
    address: { type: String },
    city: { type: String },
    zip: { type: String },
    state: { type: String }
  },
  billing: {
    address: { type: String },
    city: { type: String },
    zip: { type: String },
    state: { type: String }
  },
});

const Lab = mongoose.model('labs', LabSchema);

module.exports = Lab;
