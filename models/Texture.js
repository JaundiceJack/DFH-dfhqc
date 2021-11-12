const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TextureSchema = new Schema({
  name: { type: String, required: true, unique: true }
});

const Texture = mongoose.model('textures', TextureSchema);

module.exports = Texture;
