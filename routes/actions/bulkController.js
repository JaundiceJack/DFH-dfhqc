// Import Libraries
const trycatch = require('express-async-handler');

// Import schemas and make models
const Blend = require('../../models/Blend');
const Bulk  = require('../../models/Bulk');
const Raw   = require('../../models/Raw');
const Unit  = require('../../models/Unit');

// GET: api/bulks/ | Get a list of all bulks | Private
const getBulks = trycatch( async (req, res) => {
  const bulks = await Bulk.find();
  if (bulks) res.status(200).json(bulks.sort((a, b) => {
    return a.number < b.number ? -1 : a.number > b.number ? 1 : 0 }
  ))
  else { res.status(404); throw new Error("Unable to locate bulks materials.")};
});

// POST: api/bulks/ | Create a new bulk material | Private
const createBulk = trycatch( async (req, res) => {
  // Validate entries
  const entries = await formatEntries(req.body);
  // Create a new bulk
  const newBulk = new Bulk(entries);
  const savedBulk = await newBulk.save();
  if (savedBulk) res.status(201).json(savedBulk)
  else { res.status(401); throw new Error("Failed to save new bulk.")};
});

// POST: api/bulks/bulk_id | Edit the bulk with the given ID | Private
const editBulk = trycatch( async (req, res) => {
  // Get the bulk by it's id
  const current = await Bulk.findOne({ _id: req.params.id });
  if (current) {
    const entries = await formatEntries(req.body);
    Object.assign(current, entries);
    const savedBulk = await current.save();
    if (savedBulk) { res.status(200).json(savedBulk) }
    else { res.status(401); throw new Error("Unable to edit the selected bulk.")};
  }
  else { res.status(404); throw new Error("Could not locate selected bulk item."); };
});


// DELETE: api/bulks/bulk_id | Remove the bulk with the given ID | Private
const removeBulk = trycatch( async (req, res) => {
  const bulk = await Bulk.findById(req.params.id);
  if (bulk) bulk.remove().then(() => res.status(200).json({success: true})).catch(e => { throw new Error(e) })
  else { res.status(404); throw new Error("Could not find the bulk to delete."); };
});

// Return an array of objects with the id references and specs from the given info
const makeBlend = (id) => {
  return new Promise(async (resolve, reject) => {
    // Check the blend for an existing entry in the database
    const current = await Blend.findOne({ _id: id });
    // If there's an existing entry, set the id to it
    if (current) {
      let formatted = {
        blend_id:             current._id,
        blend_name:           current.name,
        blend_number:         current.number,
      };
      resolve(formatted);
    }
    else {reject("Selected blend not found.")}
  });
};

// Find the capsule info and return an object with it
const makeCaps = (id) => {
  return new Promise(async (resolve, reject) => {
    const selectedCap = await Raw.findOne({ _id: id });
    if (selectedCap) {
      let formatted = {
        cap_id: selectedCap._id,
        cap_name: selectedCap.name,
        cap_number: selectedCap.number
      }
      resolve(formatted);
    }
    else {reject("Selected capsule not found.")}
  })
}

// Validate entries and convert them to the required format
const formatEntries = async body => {
  return {
    name:          body.name.toLowerCase(),
    dosage_type:   body.dosageType.toLowerCase(),
    serving_units: body.servingUnits,
    blend:       await makeBlend(body.blendId),
    cap_size:    await makeCaps(body.capId),
    number:           Number(body.number),
    batch_size:       Number(body.batchSize),
    fill_weight:      Number(body.fillWeight),
    capsule_weight:   Number(body.capsuleWeight),
    net_weight:       Number(body.netWeight),
    caps_per_batch:   Number(body.capsPerBatch),
    caps_per_serving: Number(body.capsPerServing),
    caps_per_bottle:  Number(body.capsPerBottle)
  }
}

module.exports = {getBulks, createBulk, editBulk, removeBulk};
