const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UnitSchema = new Schema({
  name: { type: String, required: true, unique: true }
});

module.exports = UnitSchema;
