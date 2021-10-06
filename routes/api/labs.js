// Import Libraries
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const connection = require('../../mongo');
const trycatch = require('express-async-handler');
// Import route access protection
//const auth = require('../../middleware/auth');
// Import schemas and make models
const Lab = connection.model('labs', require('../../schemas/Lab'));

// GET -> api/labs/
// Get a list of all lab specification
router.get('/', trycatch( async (req, res) => {
  const labs = await Lab.find()
  if (labs) res.status(201).json(labs)
  else {
    res.status(404);
    throw new Error("Labs not found.");
  };
}));

// POST -> api/labs/
// Create a new lab with the given info
router.post('/', trycatch( async (req, res) => {
  console.log("Saving new lab...");
  // Validate entries
  const entries = await formatEntries(req.body);
  // Check for a lab with the entered name to prevent duplicates
  const existing = await Lab.findOne({ name: entries.name });
  // If no lab was found, create a new one
  if (!existing) {
    const newLab = new Lab(entries);
    const lab = await newLab.save();
    if (lab) res.status(201).json(newLab)
    else {
      res.status(401);
      throw new Error("Failed to save new lab.");
    }
  }
  else {
    res.status(401);
    throw new Error("This lab already exists.");
  }
}));

// POST -> api/labs/lab_id
// Edit the lab with the given ID
router.post('/:id', trycatch( async (req, res) => {
  console.log("Editing selected lab...");
  // Get the lab by it's id
  const current = await Lab.findById(req.params.id);
  if (current) {
    // Format the new entries, set the current lab's properties, and save
    const entries = await formatEntries(req.body);
    current.name = entries.name;
    current.save()
    .then(lab => res.status(201).json(lab))
    .catch(err => {
      res.status(400);
      throw new Error("Unable to edit the selected lab.")
    });
  }
  else {
    res.status(401);
    throw new Error("Could not locate selected lab item.");
  }
}));

// DELETE -> api/labs/
// Remove the lab with the given ID from the database
router.delete('/:id', (req, res) => {
  Lab
  .findById(req.params.id)
  .then(lab => lab.remove().then(() => res.json({success: true})))
  .catch(err => {
    res.status(404);
    throw new Error("Unable to delete selected lab.");
  })
});

// Validate entries and convert them to the required format
const formatEntries = async body => {
  return {
    name: body.name.toLowerCase()
  };
};

module.exports = router;
