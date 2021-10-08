const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MethodSchema = new Schema({
  name: { type: String, required: true, unique: true }
});

module.exports = MethodSchema;
