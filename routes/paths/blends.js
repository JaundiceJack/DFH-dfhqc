// Import Libraries
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const trycatch = require('express-async-handler');
// Import route access protection
const auth = require('../../middleware/auth');
// Import schemas and make models
const Blend = mongoose.connection.model('blends', require('../../schemas/Blend'));
const Raw   = mongoose.connection.model('raws',   require('../../schemas/Raw'));
const Unit  = mongoose.connection.model('units',  require('../../schemas/Unit'));

// GET: api/blends/ | Get a list of all blend specifications | Private
router.get('/', auth, trycatch( async (req, res) => {
  const blends = await Blend.find().populate('ingredients.raw').exec();
  if (blends) res.status(201).json(blends);
  else { res.status(404); throw new Error("Unable to find blends.") };
}));

// POST: api/blends/ | Create a new blend | Private
router.post('/', auth, trycatch( async (req, res) => {
  const entries = await formatEntries(req.body);
  const newBlend = new Blend(entries);
  const savedBlend = await newBlend.save();
  if (savedBlend) {
    await savedBlend.populate('ingredients.raw').execPopulate();
    res.status(201).json(savedBlend);
  }
  else { res.status(401); throw new Error("Failed to save the new blend."); };
}));

// POST: api/blends/blend_id | Edit the blend with the given ID | Private
router.post('/:id', auth, trycatch( async (req, res) => {
  const current = await Blend.findById(req.params.id);
  if (current) {
    const entries = await formatEntries(req.body);
    Object.assign(current, entries);
    const savedBlend = await current.save();
    if (savedBlend) {
      await savedBlend.populate('ingredients.raw').execPopulate();
      res.status(201).json(savedBlend);
    }
    else { res.status(401); throw new Error("Unable to edit the selected blend."); };
  }
  else { res.status(401); throw new Error("Could not locate selected blend."); };
}));

// DELETE: api/blends/blend_id | Remove the blend with the given ID | Private
router.delete('/:id', auth, trycatch(async (req, res) => {
  const blend = await Blend.findById(req.params.id);
  if (blend) blend.remove().then(() => res.json({success: true})).catch(e => { return new Error(e) })
  else { res.status(404); throw new Error("Could not find the blend to delete."); };
}));

// Return an array of objects with the id references and specs from the given info
const makeIngredients = ingredients => {
  return Promise.all(ingredients.map(ingredient => {
    return new Promise(async (resolve, reject) => {
      // Format the entries to have proper data-types
      let formatted = {
        claim:   Number(ingredient.claim),
        units:   ingredient.units,
        potency: Number(ingredient.potency),
        overage: Number(ingredient.overage),
        type:    ingredient.type.toLowerCase(),
      };

      // Save the raw's id to the ingredient
      if (ingredient.raw) {
        const currentRaw = await Raw.findById(ingredient.raw);
        if (currentRaw) formatted.raw = currentRaw._id;
        else reject("Unable to locate selected raw.");
      } else reject("No raw selected.");

      // Return one of the completed ingredients and go to the next Promise
      resolve(formatted);
    });
  }));
};

// Validate entries and convert them to the required format
const formatEntries = async body => {
  return {
    number:      Number(body.number),
    name:        body.name.toLowerCase(),
    batch_size:  Number(body.batch_size),
    units_per_serving: Number(body.units_per_serving),
    customer:    body.customer.toLowerCase(),
    ingredients: await makeIngredients(body.ingredients),
  }
}

module.exports = router;
