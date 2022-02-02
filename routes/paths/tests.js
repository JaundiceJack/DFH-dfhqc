// Import Libraries
const express = require('express');
const router = express.Router();
// Import route access protection
const auth = require('../../middleware/auth');
// Import actions
const { getTests, getTest, createTest, editTest, removeSample } =
  require('../actions/testController.js');

// ROUTE: api/tests/lotId
// GET:  Get a list of the given lot's samples | Private
// POST: Create a new sample for the given lot | Private
// PUT: Update the given lot with new information | Private
router.route('/:lotId').get(getTests).post(createTest).put(editTest);;

// GET: api/samples/lotId | Get a list of the given lot's tests | Private
router.route('/:lotId/:type').get(getTest);

// DELETE: Remove the given sample from the test
router.route('/:lotId/:testId/:sampleNumber').delete(removeSample);

module.exports = router;
