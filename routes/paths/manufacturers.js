// Import Libraries
const express = require('express');
const router = express.Router();
// Import route access protection
const auth = require('../../middleware/auth');
//Import Actions
const { getManufacturers, createManufacturer, editManufacturer, removeManufacturer } =
  require('../actions/manufacturerController.js');

// GET: api/manufacturers/ | Get a list of all manufacturers | Private
// POST: api/manufacturers/ Create a new manufacturer with the given info | Private
router.route('/').get(getManufacturers).post(createManufacturer);

// POST api/manufacturers/manufacturer_id | Edit the manufacturer with the given ID | Private
// DELETE: api/manufacturers/ | Remove the manufacturer with the given ID from the database | Private
router.route('/:id').post(editManufacturer).delete(removeManufacturer)

module.exports = router;
