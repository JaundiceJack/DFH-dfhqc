// Import Libraries
const express = require('express');
const router = express.Router();
// Import route access protection
const auth = require('../../middleware/auth');
// Import schemas and make models
const {getVendors, getVendor, createVendor, editVendor, removeVendor} = require('../actions/vendorController.js');

// GET: api/vendors/ | Get a list of all vendors | Private
// POST: api/vendors/ Create a new vendor with the given info | Private
router.route('/').get(getVendors).post(createVendor);

// PUT api/vendors/vendor_id | Edit the vendor with the given ID | Private
// DELETE: api/vendors/ | Remove the vendor with the given ID from the database | Private
router.route('/:id').get(getVendor).put(editVendor).delete(removeVendor);

module.exports = router;
