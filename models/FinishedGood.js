const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FinishedGoodSchema = new Schema({
  number: { type: Number, required: true, unique: true },
  name:   { type: String, required: true },
  lots:   [{ type: Schema.Types.ObjectId, ref: 'lots' }],
  bulk:   { type: Schema.Types.ObjectId, ref: 'bulks' },
  label:  { type: String }
});

const FinishedGood = mongoose.model('finishedgoods', FinishedGoodSchema);

module.exports = FinishedGood;
