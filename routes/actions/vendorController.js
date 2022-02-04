// Import Libraries
const trycatch = require('express-async-handler');

// Import schemas and make models
const Vendor = require('../../models/Vendor');

// GET: api/vendors/ | Get a list of all vendors | Private
const getVendors = trycatch( async (req, res) => {
  const vendors = await Vendor.find();
  if (vendors) res.status(200).json(vendors);
  else { res.status(404); throw new Error("Vendors not found."); };
});

// GET: api/vendors/id | Get a single vendor by it's id  | Private
const getVendor = trycatch( async (req, res) => {
  // Find the vendor and populate it's testing history
  const vendor = await Vendor.findById(req.params.id).exec();
  if (vendor) res.status(200).json(vendor);
  else { res.status(404); throw new Error("Unable to find the requested vendor.") };
});

// POST: api/vendors/ Create a new vendor with the given info | Private
const createVendor = trycatch( async (req, res) => {
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
});

// POST api/vendors/vendor_id | Edit the vendor with the given ID | Private
const editVendor = trycatch( async (req, res) => {
  const current = await Vendor.findById(req.params.id);
  if (current) {
    const entries = await formatEntries(req.body);
    Object.assign(current, entries);
    const savedEdits = await current.save();
    if (savedEdits) {
      res.status(200).json(savedEdits);
    }
    else { res.status(401); throw new Error("Unable to edit the selected vendor."); };
  }
  else { res.status(401); throw new Error("Could not locate selected vendor."); };
});

// DELETE: api/vendors/ | Remove the vendor with the given ID from the database | Private
const removeVendor = trycatch( async (req, res) => {
  const vendor = await Vendor.findById(req.params.id);
  if (vendor) vendor.remove().then(() => res.status(200).json({success: true})).catch(e => { return new Error(e) });
  else { res.status(404); throw new Error("Unable to locate the vendor to delete."); };
});

// Validate entries and convert them to the required format
const formatEntries = async body => {
  return { name: body.name.toLowerCase() };
};

module.exports = {getVendors, getVendor, createVendor, editVendor, removeVendor};
