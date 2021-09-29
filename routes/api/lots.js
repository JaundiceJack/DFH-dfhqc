// Import Libraries
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const connection = require('../../mongo');
// Import route access protection
//const auth = require('../../middleware/auth');
// Import schemas and make models
const Unit     = connection.model('unit',     require('../../schemas/Unit'));
const Raw      = connection.model('raw',      require('../../schemas/Raw'));
const RawLot   = connection.model('rawlot',   require('../../schemas/RawLot'));
const Blend    = connection.model('blend',    require('../../schemas/Blend'));
const BlendLot = connection.model('blendlot', require('../../schemas/BlendLot'));
const Bulk     = connection.model('bulk',     require('../../schemas/Bulk'));
const BulkLot  = connection.model('bulklot',  require('../../schemas/BulkLot'));
const FinishedGood = connection.model('finishedgood', require('../../schemas/FinishedGood'));
const FinishedGoodLot = connection.model('finishedgoodlot', require('../../schemas/FinishedGoodLot'));

// GET -> api/lots/
// Get a list of all lot specification
router.get('/',  (req, res) => {
  RawLot.find()
  .then( lots => {
    res.json(lots.sort((a, b) => { return a.number < b.number ? -1 : a.number > b.number ? 1 : 0 }));
  });
});

// POST -> api/lots/
// Create a new lot material with the given specifications
router.post('/', async (req, res) => {
  console.log("Saving new lot...");
  // Validate entries
  const entries = await formatEntries(req.body);
  // Create a new lot
  const newLot = new Lot(entries);
  newLot.save()
  .then(lot => {
    console.log("New Lot:", lot);
    if (lot) res.status(201).json(newLot);
    else res.status(401).json({error: "Failed to save new lot."});
  })
  .catch(err => {
    console.log(err);
    res.status(401).json({error: "Failed to save new lot"});
  });
});

// POST -> api/lots/lot_id
// Edit the lot with the given ID
router.post('/:id', async (req, res) => {
  console.log("Editing selected lot...");
  // Get the lot by it's id
  const current = await Lot.findOne({ _id: req.params.id });
  if (current) {
    // Format the new entries
    const entries = await formatEntries(req.body);
    // Set the current lot's new properties
    current.item = entries.item;
    current.purchase_order = entries.purchase_order;
    // Save the modified lot
    current.save()
    .then(lot => res.json(lot))
    .catch(err => res.status(400).json({error: "Unable to edit the selected lot."}));
  }
  else res.status(401).json({error: "Could not locate selected lot item."});
});

// DELETE -> api/lots/
// Remove the lot with the given ID from the database
router.delete('/:id', (req, res) => {
  Lot
  .findById(req.params.id)
  .then(lot => lot.remove().then(() => res.json({success: true})))
  .catch(err => res.status(404).json({success: false}));
});

// Validate entries and convert them to the required format
const formatEntries = async body => {
  return {
    purchase_order: Number(body.purchaseOrder),   // Number
    item: {
      item_id: body.itemId,
      item_number: Number(body.itemNumber),
      item_name: body.itemName.toLowerCase()
    }
  }
}

module.exports = router;
