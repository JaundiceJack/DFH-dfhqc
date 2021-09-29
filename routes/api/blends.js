// Import Libraries
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const connection = require('../../mongo');
// Import route access protection
//const auth = require('../../middleware/auth');
// Import schemas and make models
const Blend = connection.model('blend', require('../../schemas/Blend'));
const Raw   = connection.model('raw',   require('../../schemas/Raw'));
const Unit  = connection.model('unit',  require('../../schemas/Unit'));


// GET -> api/blends/
// Get a list of all blend specification
router.get('/',  (req, res) => {
  Blend.find().then( blends => {
    res.json(blends.sort((a, b) => {
      return a.number < b.number ? -1 : a.number > b.number ? 1 : 0 }));
  });
});

// POST -> api/blends/
// Create a new blend material with the given specifications
router.post('/', async (req, res) => {
  console.log("Saving new blend...");
  // Validate entries
  const entries = await formatEntries(req.body);
  // Create a new blend
  const newBlend = new Blend(entries);
  newBlend.save()
  .then(blend => {
    console.log("New Blend:", blend);
    if (blend) res.status(201).json(newBlend);
    else res.status(401).json({error: "Failed to save new blend."});
  })
  .catch(err => {
    console.log(err);
    res.status(401).json({error: "Failed to save new blend"});
  });
});

// POST -> api/blends/blend_id
// Edit the blend with the given ID
router.post('/:id', async (req, res) => {
  console.log("Editing selected blend...");
  // Get the blend by it's id
  const current = await Blend.findOne({ _id: req.params.id });
  if (current) {
    // Format the new entries
    const entries = await formatEntries(req.body);
    // Set the current blend's new properties
    current.name =             entries.name,
    current.batch_size =       entries.batch_size,
    current.units_per_serving = entries.units_per_serving,
    current.customer =         entries.customer,
    current.ingredients =      entries.ingredients
    // Save the modified blend
    current.save()
    .then(blend => res.json(blend))
    .catch(err => res.status(400).json({error: "Unable to edit the selected blend."}));
  }
  else res.status(401).json({error: "Could not locate selected blend item."});
});

// DELETE -> api/blends/
// Remove the blend with the given ID from the database
router.delete('/:id', (req, res) => {
  Blend
  .findById(req.params.id)
  .then(blend => blend.remove().then(() => res.json({success: true})))
  .catch(err => res.status(404).json({success: false}));
})

// Return an array of objects with the id references and specs from the given info
const makeIngredients = ingredients => {
  return Promise.all(ingredients.map(ingredient => {
    return new Promise(async (resolve, reject) => {
      // Check the new ingredient for an existing entry in the database
      const current = await Raw.findOne({ _id: ingredient.rawId });
      const unitName = ingredient.claimUnits === "New Units" ? ingredient.newUnits : ingredient.claimUnits;
      const unit = await Unit.findOne({ name: unitName });
      // If there's an existing entry, set the id to it
      if (current) {
        let formatted = {
          raw_id:             current._id,
          raw_name:           current.name,
          raw_number:         current.number,
          claim:              ingredient.claim,
          claim_units:        unitName,
          potency:            ingredient.potency,
          overage:            ingredient.overage == 0 ? null : ingredient.overage,
          ingredient_type:    ingredient.ingredientType.toLowerCase(),
        };
        // Save the unit type if it was new
        if(!unit) {
          const newUnit = new Unit({ name: unitName });
          newUnit.save().catch(err => reject(err));
        }
        resolve(formatted);
      }
      else {reject("Selected raw material not found.")}
    });
  }));
};

// Validate entries and convert them to the required format
const formatEntries = async body => {
  return {
    number:      Number(body.number),
    name:        body.name.toLowerCase(),
    batch_size:  Number(body.batchSize),
    units_per_serving: Number(body.unitsPerServing),
    customer:    body.customer.toLowerCase(),
    ingredients: await makeIngredients(body.ingredients),
  }
}

module.exports = router;
