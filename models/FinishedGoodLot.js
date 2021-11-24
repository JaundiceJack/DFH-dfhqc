const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FinishedGoodLotSchema = new Schema({
  lot:          { type: String, required: true },
  item:         { type: Schema.Types.ObjectId, ref: 'finishedgoods', required: true },
  item_type:    { type: String, default: 'fg' },
  date_created: { type: Date,   default: Date.now },
  department:   { type: String, default: 'Quality Control'},
  inventory: {
    amount: { type: Number },
    units:  { type: String },
  },
  receiving: {
    facility: { type: String },
    location: { type: String },
  }
});

const FinishedGoodLot = mongoose.model('finishedgoodlots', FinishedGoodLotSchema)

module.exports = FinishedGoodLot;
