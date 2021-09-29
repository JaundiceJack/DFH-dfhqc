const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VendorSchema = new Schema({
  name: { type: String, required: true }
});

module.exports = VendorSchema;
