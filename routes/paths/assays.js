// Import Libraries
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const trycatch = require('express-async-handler');
// Import route access protection
const auth = require('../../middleware/auth');
// Import schemas and make models
const Assay = mongoose.connection.model('assays', require('../../schemas/Assay'));


// GET: api/assays/ | Get a list of all assays | Private
router.get('/', trycatch( async (req, res) => {
  const assays = await Assay.find();
  if (assays) res.status(201).json(assays);
  else { res.status(404); throw new Error("Could not locate assays."); };
}));

// POST: api/assays/ | Create a new assay | Private
router.post('/', trycatch( async (req, res) => {
  const entries = await formatEntries(req.body);
  const newAssay = new Assay(entries);
  const savedAssay = await newAssay.save();
  if (savedAssay) res.status(201).json(savedAssay);
  else { res.status(401); throw new Error("Unable to save the new assay."); };
}));

// POST: api/assays/assay_id | Edit the assay with the given ID | Private
router.post('/:id', trycatch( async (req, res) => {
  const current = await Assay.findById(req.params.id);
  if (current) {
    const entries = await formatEntries(req.body);
    Object.assign(current, entries);
    const savedEdits = await current.save();
    if (savedEdits) res.status(201).json(savedEdits);
    else { res.status(401); throw new Error("Unable to edit the selected assay."); };
  }
  else { res.status(401); throw new Error("Could not locate the selected assay to edit."); };
}));

// DELETE: api/assays/ Remove the assay with the given ID from the database | Private
router.delete('/:id', trycatch( async (req, res) => {
  const assay = await Assay.findById(req.params.id);
  if (assay) assay.remove().then(() => res.json({success: true}));
  else { res.status(404); throw new Error("Unable to locate the assay to delete."); };
}));

// Validate entries and convert them to the required format
const formatEntries = async body => {
  return { name: body.name.toLowerCase() };
};

module.exports = router;
