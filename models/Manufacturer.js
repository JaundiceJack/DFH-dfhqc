const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ManufacturerSchema = new Schema({
  name: { type: String, required: true }
});

const Manufacturer = mongoose.model('manufacturers', ManufacturerSchema);

module.exports = Manufacturer;
