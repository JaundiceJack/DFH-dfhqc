const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssayMethodSchema = new Schema({
  name: { type: String, required: true, unique: true }
});

module.exports = AssayMethodSchema;
