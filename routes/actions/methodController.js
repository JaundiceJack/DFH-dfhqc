// Import Libraries
const trycatch = require('express-async-handler');

// Import schemas and make models
const Method = require('../../models/Method');

// GET: api/methods/ | Get a list of all methods | Private
const getMethods = trycatch( async (req, res) => {
  const methods = await Method.find();
  if (methods) res.status(200).json(methods);
  else { res.status(404); throw new Error("Could not locate methods."); };
});

// POST: api/methods/ | Create a new method | Private
const createMethod = trycatch( async (req, res) => {
  const entries = await formatEntries(req.body);
  const newMethod = new Method(entries);
  const savedMethod = await newMethod.save();
  if (savedMethod) res.status(201).json(savedMethod);
  else { res.status(401); throw new Error("Unable to save the new method."); };
});

// POST: api/methods/method_id | Edit the method with the given ID | Private
const editMethod = trycatch( async (req, res) => {
  const current = await Method.findById(req.params.id);
  if (current) {
    const entries = await formatEntries(req.body);
    Object.assign(current, entries);
    const savedEdits = await current.save();
    if (savedEdits) res.status(200).json(savedEdits);
    else { res.status(401); throw new Error("Unable to edit the selected method."); };
  }
  else { res.status(401); throw new Error("Could not locate the selected method to edit."); };
});

// DELETE: api/methods/ Remove the method with the given ID from the database | Private
const removeMethod = trycatch( async (req, res) => {
  const method = await Method.findById(req.params.id);
  if (method) method.remove().then(() => res.json({success: true}));
  else { res.status(404); throw new Error("Unable to locate the method to delete."); };
});

// Validate entries and convert them to the required format
const formatEntries = async body => { return { name: body.name.toLowerCase() }; };

module.exports = {getMethods, createMethod, editMethod, removeMethod};
