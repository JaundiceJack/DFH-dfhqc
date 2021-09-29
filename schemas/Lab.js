const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LabSchema = new Schema({
  name: { type: String, required: true },
  tat_emergency: { type: Number },
  upcharge_emergency: { type: Number },
  tat_rush: { type: Number },
  upcharge_rush: { type: Number},
  tat_standard: { type: Number },
  address_testing: { type: String },
  address_billiing: { type: String },
  contact_emails: [String],
  contact_phones: [String]
});

module.exports = LabSchema;
