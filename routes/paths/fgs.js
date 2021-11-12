// Import Libraries
const express = require('express');
const router = express.Router();
// Import route access protection
const auth = require('../../middleware/auth');
// Import actions
const {getFgs, createFg, editFg, removeFg} = require('../actions/fgController.js');

// GET: api/fgs/ | Get a list of all fg specifications | Private
// POST: api/fgs/ | Create a new fg material | Private
router.route('/').get(getFgs).post(createFg);

// POST: api/fgs/fg_id | Edit the fg with the given ID | Private
// DELETE: api/fgs/ | Remove the fg with the given ID from the database | Private
router.route('/:id').post(editFg).delete(removeFg);

module.exports = router;
