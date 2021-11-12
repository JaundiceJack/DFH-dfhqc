const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MethodSchema = new Schema({
  name: { type: String, required: true, unique: true }
});

const Method = mongoose.model('methods', MethodSchema);

module.exports = Method;
