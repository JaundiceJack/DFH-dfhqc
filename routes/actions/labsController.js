// Import Libraries
const trycatch = require('express-async-handler');
// Import models
const Lab = require('../../models/Lab');
const Assay = require('../../models/Assay');
const Method = require('../../models/Method');

// GET: api/labs/ | Get a list of all labs | Private
const getLabs = trycatch( async (req, res) => {
  const labs = await Lab.find().populate('assays.assay').populate('assays.method').exec();
  if (labs) res.status(201).json(labs);
  else { res.status(404); throw new Error("Labs not found."); };
});

// POST: api/labs/ Create a new lab with the given info | Private
const createLab = trycatch( async (req, res) => {
  const entries = await formatEntries(req.body);
  const existing = await Lab.findOne({ name: entries.name });
  if (!existing) {
    const newLab = new Lab(entries);
    const lab = await newLab.save();
    if (lab) {
      await lab.populate('assays.assay').populate('assays.method').execPopulate();
      res.status(201).json(lab);
    }
    else { res.status(401); throw new Error("Failed to save new lab."); };
  }
  else { res.status(401); throw new Error("This lab already exists."); };
});

// POST api/labs/:id/add_assays | Add assay(s) to the lab's capabilities | Private
const addLabAssays = trycatch( async (req, res) => {
  const lab = await Lab.findById(req.body.labId);
  // Find the assays & methods to add
  req.body.assays.forEach(async (test, index) => {
    const assay = await Assay.findById(test.assayId);
    const method = await Method.findById(test.methodId);
    if (!assay) { res.status(404); throw new Error("Unable to locate one or more assays"); }
    else if (!method) { res.status(404); throw new Error("Unable to locate one or more methods"); }
    else {
      lab.assays.push({ assay: assay._id, method: method._id, price: test.price });
    }
  })
  // Save the lab's new capabilities
  const savedLab = await lab.save();
  if (savedLab) res.status(201).json(savedLab);
  else { res.status(401); throw new Error("Unable to add assays to the selected lab"); };
});


// PUT api/labs/lab_id | Edit the lab with the given ID | Private
const editLab = trycatch( async (req, res) => {
  const current = await Lab.findById(req.params.id);
  if (current) {
    const entries = await formatEntries(req.body);
    Object.assign(current, entries);
    const savedEdits = await current.save();
    if (savedEdits) {
      await savedEdits.populate('assays.assay').populate('assays.method').execPopulate();
      res.status(201).json(savedEdits);
    }
    else { res.status(401); throw new Error("Unable to edit the selected lab."); };
  }
  else { res.status(401); throw new Error("Could not locate selected lab."); };
});

// DELETE: api/labs/ | Remove the lab with the given ID from the database | Private
const removeLab = trycatch( async (req, res) => {
  const lab = await Lab.findById(req.params.id);
  if (lab) lab.remove().then(() => res.json({success: true})).catch(e => { return new Error(e) });
  else { res.status(404); throw new Error("Unable to locate the lab to delete."); };
});

// Validate entries and convert them to the required format
const formatEntries = async body => {
  return {
    name: body.name.toLowerCase(),
    shipping: {
      address: body.shipping.address.toLowerCase(),
      city: body.shipping.city.toLowerCase(),
      zip: body.shipping.zip
    },
    billing: {
      address: body.billing.address.toLowerCase(),
      city: body.billing.city.toLowerCase(),
      zip: body.billing.zip
    }
  };
};

module.exports = {getLabs, createLab, addLabAssays, editLab, removeLab};
