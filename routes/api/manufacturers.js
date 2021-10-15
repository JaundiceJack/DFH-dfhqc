// Import Libraries
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const trycatch = require('express-async-handler');
// Import route access protection
const auth = require('../../middleware/auth');
// Import schemas and make models
const Manufacturer = mongoose.connection.model('manufacturers', require('../../schemas/Manufacturer'));

// GET: api/manufacturers/ | Get a list of all manufacturers | Private
router.get('/', trycatch( async (req, res) => {
  const manufacturers = await Manufacturer.find();
  if (manufacturers) res.status(201).json(manufacturers);
  else { res.status(404); throw new Error("Manufacturers not found."); };
}));

// POST: api/manufacturers/ Create a new manufacturer with the given info | Private
router.post('/', trycatch( async (req, res) => {
  const entries = await formatEntries(req.body);
  const existing = await Manufacturer.findOne({ name: entries.name });
  if (!existing) {
    const newManufacturer = new Manufacturer(entries);
    const manufacturer = await newManufacturer.save();
    if (manufacturer) {
      res.status(201).json(manufacturer);
    }
    else { res.status(401); throw new Error("Failed to save new manufacturer."); };
  }
  else { res.status(401); throw new Error("This manufacturer already exists."); };
}));

// POST api/manufacturers/manufacturer_id | Edit the manufacturer with the given ID | Private
router.post('/:id', trycatch( async (req, res) => {
  const current = await Manufacturer.findById(req.params.id);
  if (current) {
    const entries = await formatEntries(req.body);
    Object.assign(current, entries);
    const savedEdits = await current.save();
    if (savedEdits) {
      res.status(201).json(savedEdits);
    }
    else { res.status(401); throw new Error("Unable to edit the selected manufacturer."); };
  }
  else { res.status(401); throw new Error("Could not locate selected manufacturer."); };
}));

// DELETE: api/manufacturers/ | Remove the manufacturer with the given ID from the database | Private
router.delete('/:id', trycatch( async (req, res) => {
  const manufacturer = await Manufacturer.findById(req.params.id);
  if (manufacturer) manufacturer.remove().then(() => res.json({success: true})).catch(e => { return new Error(e) });
  else { res.status(404); throw new Error("Unable to locate the manufacturer to delete."); };
}));

// Validate entries and convert them to the required format
const formatEntries = async body => {
  return { name: body.name.toLowerCase() };
};

module.exports = router;
