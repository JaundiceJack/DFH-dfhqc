// Import Libraries
const express = require('express');
const router = express.Router();
// Import route access protection
const auth = require('../../middleware/auth');
// Import actions
const {getRaws, createRaw, editRaw, removeRaw} = require('../actions/rawController.js');

// GET: api/raws/ | Get a list of all raw specifications | Private
// POST: api/raws/ | Create a new raw material | Private
router.route('/').get(getRaws).post(createRaw);

// POST: api/raws/raw_id | Edit the raw with the given ID | Private
// DELETE: api/raws/ | Remove the raw with the given ID from the database | Private
router.route('/:id').post(editRaw).delete(removeRaw);

module.exports = router;
