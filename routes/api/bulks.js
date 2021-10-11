// Import Libraries
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// Import route access protection
const auth = require('../../middleware/auth');
// Import schemas and make models
const Blend = mongoose.connection.model('blends', require('../../schemas/Blend'));
const Bulk  = mongoose.connection.model('bulks',  require('../../schemas/Bulk'));
const Raw   = mongoose.connection.model('raws',   require('../../schemas/Raw'));
const Unit  = mongoose.connection.model('units',  require('../../schemas/Unit'));

// GET -> api/bulks/
// Get a list of all bulk specification
router.get('/',  (req, res) => {
  Bulk.find().then( bulks => {
    res.json(bulks.sort((a, b) => {
      return a.number < b.number ? -1 : a.number > b.number ? 1 : 0 }));
  });
});

// POST -> api/bulks/
// Create a new bulk material with the given specifications
router.post('/', async (req, res) => {
  console.log("Saving new bulk...");
  // Validate entries
  const entries = await formatEntries(req.body);
  // Create a new bulk
  const newBulk = new Bulk(entries);
  newBulk.save()
  .then(bulk => {
    console.log("New Bulk:", bulk);
    if (bulk) res.status(201).json(newBulk);
    else res.status(401).json({error: "Failed to save new bulk."});
  })
  .catch(err => {
    console.log(err);
    res.status(401).json({error: "Failed to save new bulk"});
  });
});

// POST -> api/bulks/bulk_id
// Edit the bulk with the given ID
router.post('/:id', async (req, res) => {
  console.log("Editing selected bulk...");
  // Get the bulk by it's id
  const current = await Bulk.findOne({ _id: req.params.id });
  if (current) {
    // Format the new entries
    const entries = await formatEntries(req.body);
    // Set the current bulk's new properties
    current.name             = entries.name;
    current.dosage_type      = entries.dosage_type;
    current.serving_units    = entries.serving_units;
    current.blend            = entries.blend;
    current.cap_size         = entries.cap_size;
    current.batch_size       = entries.batch_size;
    current.fill_weight      = entries.fill_weight;
    current.capsule_weight   = entries.capsule_weight;
    current.net_weight       = entries.net_weight;
    current.caps_per_batch   = entries.caps_per_batch;
    current.caps_per_serving = entries.caps_per_serving;
    current.caps_per_bottle  = entries.caps_per_bottle;
    // Save the modified bulk
    current.save()
    .then(bulk => res.json(bulk))
    .catch(err => res.status(400).json({error: "Unable to edit the selected bulk."}));
  }
  else res.status(401).json({error: "Could not locate selected bulk item."});
});

// DELETE -> api/bulks/
// Remove the bulk with the given ID from the database
router.delete('/:id', (req, res) => {
  Bulk
  .findById(req.params.id)
  .then(bulk => bulk.remove().then(() => res.json({success: true})))
  .catch(err => res.status(404).json({success: false}));
})

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

module.exports = router;
