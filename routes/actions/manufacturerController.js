// Import Libraries
const trycatch = require('express-async-handler');

// Import schemas and make models
const Manufacturer = require('../../models/Manufacturer');

// GET: api/manufacturers/ | Get a list of all manufacturers | Private
const getManufacturers = trycatch( async (req, res) => {
  const manufacturers = await Manufacturer.find();
  if (manufacturers) res.status(200).json(manufacturers);
  else { res.status(404); throw new Error("Manufacturers not found."); };
});

// GET: api/vendors/id | Get a single vendor by it's id  | Private
const getManufacturer = trycatch( async (req, res) => {
  // Find the manufacturer and populate it's testing history
  const manufacturer = await Manufacturer.findById(req.params.id).exec();
  if (manufacturer) res.status(200).json(manufacturer);
  else { res.status(404); throw new Error("Unable to find the requested manufacturer.") };
});

// POST: api/manufacturers/ Create a new manufacturer with the given info | Private
const createManufacturer = trycatch( async (req, res) => {
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
});

// PUT api/manufacturers/manufacturer_id | Edit the manufacturer with the given ID | Private
const editManufacturer = trycatch( async (req, res) => {
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
});

// DELETE: api/manufacturers/ | Remove the manufacturer with the given ID from the database | Private
const removeManufacturer = trycatch( async (req, res) => {
  const manufacturer = await Manufacturer.findById(req.params.id);
  if (manufacturer) manufacturer.remove().then(() => res.json({success: true})).catch(e => { return new Error(e) });
  else { res.status(404); throw new Error("Unable to locate the manufacturer to delete."); };
});

// Validate entries and convert them to the required format
const formatEntries = async body => {
  return { name: body.name.toLowerCase() };
};

module.exports = { getManufacturers, getManufacturer, createManufacturer, editManufacturer, removeManufacturer };
