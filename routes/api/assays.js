// Import Libraries
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const connection = require('../../mongo');
// Import route access protection
//const auth = require('../../middleware/auth');
// Import schemas and make models
const Raw = connection.model('raw', require('../../schemas/Raw'));
const Assay = connection.model('assay', require('../../schemas/Assay'));
const Identity = connection.model('id', require('../../schemas/Identity'));
const Lab = connection.model('lab', require('../../schemas/Lab'));

// GET -> api/assays/
// Get a list of all raw specification
router.get('/', (req, res) => {
  console.log("Sending Assays...");
  Assay.find().then(assays => { res.json(assays); });
});
// GET -> api/assays/:id
// Get the name/info of the requested assay
router.get('/:id', (req, res) => {
  console.log("Getting Assay Info...");
  Assay.findOne({ _id: req.params.id }).then(assay => {
    if (assay) { res.json(assay) }
    else { res.status(404).json({ msg: "Assay not found." })};
  });
});
// POST => api/assays/
// Create a new assay with the given name/info
router.post('/', (req, res) => {
  console.log("Saving new assay...");

})

module.exports = router;
