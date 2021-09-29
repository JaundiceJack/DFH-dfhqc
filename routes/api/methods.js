// Import Libraries
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const connection = require('../../mongo');
// Import route access protection
//const auth = require('../../middleware/auth');
// Import schemas and make models
const Method = connection.model('method', require('../../schemas/Method'));

// GET -> api/methods/
// Get a list of all methods
router.get('/', (req, res) => {
  console.log("Sending Methods...");
  Method.find().then(methods => { res.json(methods); });
});
// GET -> api/methods/:id
// Get the name/info of the requested method
router.get('/:id', (req, res) => {
  console.log("Getting Method Info...");
  Method.findOne({ _id: req.params.id }).then(method => {
    if (method) { res.json(method) }
    else { res.status(404).json({ msg: "Method not found." })};
  });
});
// POST => api/methods/
// Create a new method with the given name/info
router.post('/', (req, res) => {
  console.log("Saving new method...");

})

module.exports = router;
