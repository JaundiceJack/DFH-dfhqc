// Import Libraries
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const trycatch = require('express-async-handler');
// Import route access protection
const auth = require('../../middleware/auth');
// Import schemas and make models
const Vendor = mongoose.connection.model('vendors', require('../../schemas/Vendor'));

// GET: api/vendors/ | Get a list of all vendors | Private
router.get('/', trycatch( async (req, res) => {
  const vendors = await Vendor.find();
  if (vendors) res.status(201).json(vendors);
  else { res.status(404); throw new Error("Vendors not found."); };
}));

// POST: api/vendors/ Create a new vendor with the given info | Private
router.post('/', trycatch( async (req, res) => {
  const entries = await formatEntries(req.body);
  const existing = await Vendor.findOne({ name: entries.name });
  if (!existing) {
    const newVendor = new Vendor(entries);
    const vendor = await newVendor.save();
    if (vendor) {
      res.status(201).json(vendor);
    }
    else { res.status(401); throw new Error("Failed to save new vendor."); };
  }
  else { res.status(401); throw new Error("This vendor already exists."); };
}));

// POST api/vendors/vendor_id | Edit the vendor with the given ID | Private
router.post('/:id', trycatch( async (req, res) => {
  const current = await Vendor.findById(req.params.id);
  if (current) {
    const entries = await formatEntries(req.body);
    Object.assign(current, entries);
    const savedEdits = await current.save();
    if (savedEdits) {
      res.status(201).json(savedEdits);
    }
    else { res.status(401); throw new Error("Unable to edit the selected vendor."); };
  }
  else { res.status(401); throw new Error("Could not locate selected vendor."); };
}));

// DELETE: api/vendors/ | Remove the vendor with the given ID from the database | Private
router.delete('/:id', trycatch( async (req, res) => {
  const vendor = await Vendor.findById(req.params.id);
  if (vendor) vendor.remove().then(() => res.json({success: true})).catch(e => { return new Error(e) });
  else { res.status(404); throw new Error("Unable to locate the vendor to delete."); };
}));

// Validate entries and convert them to the required format
const formatEntries = async body => {
  return { name: body.name.toLowerCase() };
};

module.exports = router;
