// Import Libraries
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const trycatch = require('express-async-handler');
// Import route access protection
const auth = require('../../middleware/auth');
// Import schemas and make models
const Identity = mongoose.connection.model('identities', require('../../schemas/Identity'));


// GET: api/identities/ | Get a list of all identities | Private
router.get('/', trycatch( async (req, res) => {
  const identities = await Identity.find();
  if (identities) res.status(201).json(identities);
  else { res.status(404); throw new Error("Could not locate identities."); };
}));

// POST: api/identities/ | Create a new identity | Private
router.post('/', trycatch( async (req, res) => {
  const entries = await formatEntries(req.body);
  const newIdentity = new Identity(entries);
  const savedIdentity = await newIdentity.save();
  if (savedIdentity) res.status(201).json(savedIdentity);
  else { res.status(401); throw new Error("Unable to save the new identity."); };
}));

// POST: api/identities/identity_id | Edit the identity with the given ID | Private
router.post('/:id', trycatch( async (req, res) => {
  const current = await Identity.findById(req.params.id);
  if (current) {
    const entries = await formatEntries(req.body);
    Object.assign(current, entries);
    const savedEdits = await current.save();
    if (savedEdits) res.status(201).json(savedEdits);
    else { res.status(401); throw new Error("Unable to edit the selected identity."); };
  }
  else { res.status(401); throw new Error("Could not locate the selected identity to edit."); };
}));

// DELETE: api/identities/ Remove the identity with the given ID from the database | Private
router.delete('/:id', trycatch( async (req, res) => {
  const identity = await Identity.findById(req.params.id);
  if (identity) identity.remove().then(() => res.json({success: true}));
  else { res.status(404); throw new Error("Unable to locate the identity to delete."); };
}));

// Validate entries and convert them to the required format
const formatEntries = async body => {
  return {
    name: body.name.toLowerCase(),
    is_botanical: body.isBotanical,
    genus:        body.genus.toLowerCase(),
    species:      body.species.toLowerCase(),
    part:         body.part.toLowerCase(),
    solvent:      body.solvent.toLowerCase(),
    ratio:        body.ratio,
  };
};

module.exports = router;
