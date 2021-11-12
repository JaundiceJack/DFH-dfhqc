const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IdentitySchema = new Schema({
  name: { type: String, required: true },
  is_botanical: { type: Boolean, default: false },
  genus:   { type: String, default: null },
  species: { type: String, default: null },
  part:    { type: String, default: null },
  solvent: { type: String, default: null },
  ratio:   { type: String, default: null }
});

const Identity = mongoose.model('ids', IdentitySchema);

module.exports = Identity;
