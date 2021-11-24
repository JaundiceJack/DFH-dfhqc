// Import Libraries
const express = require('express');
const router = express.Router();
// Import route access protection
const auth = require('../../middleware/auth');
// Import actions
const { getRawTests, createRawTest, editRawTest, removeRawSample } =
  require('../actions/testsController.js');

// ROUTE: api/tests/lotId
// GET:  Get a list of the given lot's samples | Private
// POST: Create a new sample for the given lot | Private
router.route('/:lotId').get(getRawTests).post(createRawTest).put(editRawTest);;

// DELETE: Remove the given sample from the test
router.route('/:lotId/:testId/:sampleNumber').delete(removeRawSample);

module.exports = router;
