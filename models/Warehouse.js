const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WarehouseSchema = new Schema({
  state: { type: String },
  slots: [ { slot: { type: String } } ]
});

const Warehouse = mongoose.model('warehouses', WarehouseSchema);

module.exports = Warehouse;
