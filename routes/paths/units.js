// Import Libraries
const express = require('express');
const router = express.Router();
// Import route access protection
const auth = require('../../middleware/auth');
// Import actions
const {getUnits, createUnit, editUnit, removeUnit} = require('../actions/unitController.js');

// GET: api/units/ | Get a list of all units | Private
// POST: api/units/ | Create a new unit | Private
router.route('/').get(getUnits).post(createUnit);

// POST: api/units/unit_id | Edit the unit with the given ID | Private
// DELETE: api/units/ Remove the unit with the given ID from the database | Private
router.route('/:id').post(editUnit).delete(removeUnit);

module.exports = router;
