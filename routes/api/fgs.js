// Import Libraries
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const connection = require('../../mongo');
// Import route access protection
//const auth = require('../../middleware/auth');
// Import schemas and make models
const FinishedGood = connection.model('finishedgoods',    require('../../schemas/FinishedGood'));
const Blend = connection.model('blends', require('../../schemas/Blend'));
const Bulk  = connection.model('bulks',  require('../../schemas/Bulk'));
const Raw   = connection.model('raws',   require('../../schemas/Raw'));
const Unit  = connection.model('units',  require('../../schemas/Unit'));

// GET -> api/fgs/
// Get a list of all fg specification
router.get('/',  (req, res) => {
  FinishedGood.find().then( fgs => {
    res.json(fgs.sort((a, b) => {
      return a.number < b.number ? -1 : a.number > b.number ? 1 : 0 }));
  });
});

// POST -> api/fgs/
// Create a new fg material with the given specifications
router.post('/', async (req, res) => {
  console.log("Saving new fg...");
  // Validate entries
  const entries = await formatEntries(req.body);
  // Create a new fg
  const newFinishedGood = new FinishedGood(entries);
  newFinishedGood.save()
  .then(fg => {
    console.log("New FinishedGood:", fg);
    if (fg) res.status(201).json(newFinishedGood);
    else res.status(401).json({error: "Failed to save new fg."});
  })
  .catch(err => {
    console.log(err);
    res.status(401).json({error: "Failed to save new fg"});
  });
});

// POST -> api/fgs/fg_id
// Edit the fg with the given ID
router.post('/:id', async (req, res) => {
  console.log("Editing selected fg...");
  // Get the fg by it's id
  const current = await FinishedGood.findOne({ _id: req.params.id });
  if (current) {
    // Format the new entries
    const entries = await formatEntries(req.body);
    // Set the current fg's new properties
    current.name = entries.name;
    // Save the modified fg
    current.save()
    .then(fg => res.json(fg))
    .catch(err => res.status(400).json({error: "Unable to edit the selected fg."}));
  }
  else res.status(401).json({error: "Could not locate selected fg item."});
});

// DELETE -> api/fgs/
// Remove the fg with the given ID from the database
router.delete('/:id', (req, res) => {
  FinishedGood
  .findById(req.params.id)
  .then(fg => fg.remove().then(() => res.json({success: true})))
  .catch(err => res.status(404).json({success: false}));
})



// Validate entries and convert them to the required format
const formatEntries = async body => {
  return {
    name:   body.name.toLowerCase(),
    number: Number(body.number),
  }
}

module.exports = router;
