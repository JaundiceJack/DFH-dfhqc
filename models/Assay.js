const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssaySchema = new Schema({
  name: { type: String, required: true, unique: true }
});

const Assay = mongoose.model('assays', AssaySchema);

module.exports = Assay;
