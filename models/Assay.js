const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
so, when a lab's capability is updated, i should , in the map for caps, feed the assay id and lab id to an async function
and search the assay's labs for the given lab id,
if missing, add it, otherwise continue
but how would i remove labs from the list,
when removed from the capabilities?

*/

const AssaySchema = new Schema({
  name: { type: String, required: true, unique: true },
  labs: [{ type: Schema.Types.ObjectId, ref: 'labs' }]
});

const Assay = mongoose.model('assays', AssaySchema);

module.exports = Assay;
