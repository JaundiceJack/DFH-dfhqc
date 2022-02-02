// Import Libraries
const trycatch = require('express-async-handler');
// Import schemas and make models
const FinishedGood = require('../../models/FinishedGood');
const Blend = require('../../models/Blend');
const Bulk  = require('../../models/Bulk');
const Raw   = require('../../models/Raw');
const Unit  = require('../../models/Unit');

// GET: api/fgs/ | Get a list of all fg specifications | Private
const getFgs = trycatch( async (req, res) => {
  const fgs = await FinishedGood.find();
  if (fgs) res.json(fgs.sort((a, b) => {
    return a.number < b.number ? -1 : a.number > b.number ? 1 : 0
  }))
  else { res.status(404); throw new Error("Unable to locate finished goods."); };
});

// GET: api/fgs/id | Get a single finished good by it's id | Private
const getFg = trycatch( async (req, res) => {
  // Find the fg and populate it's testing history
  const fg = await FinishedGood.findById(req.params.id).exec();
  if (fg) res.status(200).json(fg);
  else { res.status(404); throw new Error("Unable to find the requested finished good.") };
});

// POST: api/fgs/ | Create a new fg material | Private
const createFg = trycatch( async (req, res) => {
  const entries = await formatEntries(req.body);
  const newFinishedGood = new FinishedGood(entries);
  const savedFg = await newFinishedGood.save();
  if (savedFg) { res.status(201).json(savedFg) }
  else { res.status(401); throw new Error("Failed to save new finished good.")}
});

// POST: api/fgs/fg_id | Edit the fg with the given ID | Private
const editFg = trycatch( async (req, res) => {
  const current = await FinishedGood.findOne({ _id: req.params.id });
  if (current) {
    const entries = await formatEntries(req.body);
    Object.assign(current, entries);
    const savedFg = await current.save();
    if (savedFg) { res.status(200).json(savedFg) }
    else { res.status(401); throw new Error("Unable to edit the selected finished good.")};
  }
  else { res.status(404); throw new Error("Could not locate selected fg item.") };
});

// DELETE: api/fgs/ | Remove the fg with the given ID from the database | Private
const removeFg = trycatch( async (req, res) => {
  const fg = await FinishedGood.findById(req.params.id);
  if (fg) { fg.remove().then(() => res.status(200).json(req.params.id)) }
  else { res.status(404); throw new Error("Could not find the finished good to delete.")}
});

// Validate entries and convert them to the required format
const formatEntries = async body => {
  return {
    name:   body.name.toLowerCase(),
    number: Number(body.number),
  }
}

module.exports = {getFgs, getFg, createFg, editFg, removeFg};
