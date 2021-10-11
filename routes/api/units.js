// Import Libraries
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const trycatch = require('express-async-handler');
// Import route access protection
const auth = require('../../middleware/auth');
// Import schemas and make models
const Unit = mongoose.connection.model('units', require('../../schemas/Unit'));


// GET: api/units/ | Get a list of all units | Private
router.get('/', trycatch( async (req, res) => {
  const units = await Unit.find();
  if (units) res.status(201).json(units);
  else { res.status(404); throw new Error("Could not locate units."); };
}));

// POST: api/units/ | Create a new unit | Private
router.post('/', trycatch( async (req, res) => {
  const entries = await formatEntries(req.body);
  const newUnit = new Unit(entries);
  const savedUnit = await newUnit.save();
  if (savedUnit) res.status(201).json(savedUnit);
  else { res.status(401); throw new Error("Unable to save the new unit."); };
}));

// POST: api/units/unit_id | Edit the unit with the given ID | Private
router.post('/:id', trycatch( async (req, res) => {
  const current = await Unit.findById(req.params.id);
  if (current) {
    const entries = await formatEntries(req.body);
    current.name = entries.name;
    const savedEdits = await current.save();
    if (savedEdits) res.status(201).json(savedEdits);
    else { res.status(401); throw new Error("Unable to edit the selected unit."); };
  }
  else { res.status(401); throw new Error("Could not locate the selected unit to edit."); };
}));

// DELETE: api/units/ Remove the unit with the given ID from the database | Private
router.delete('/:id', trycatch( async (req, res) => {
  const unit = await Unit.findById(req.params.id);
  if (unit) unit.remove().then(() => res.json({success: true}));
  else { res.status(404); throw new Error("Unable to locate the unit to delete."); };
}));

// Validate entries and convert them to the required format
const formatEntries = async body => { return { name: body.name.toLowerCase() }; };

module.exports = router;
