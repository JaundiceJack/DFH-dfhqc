// Import Libraries
const express = require('express');
const router = express.Router();
// Import route access protection
const auth = require('../../middleware/auth');
// Import actions
const {getBlends, getBlend, createBlend, editBlend, removeBlend} = require('../actions/blendController.js');

// GET: api/blends/ | Get a list of all blend specifications | Private
// POST: api/blends/ | Create a new blend | Private
router.route('/').get(getBlends).post(createBlend);

// PUT: api/blends/blend_id | Edit the blend with the given ID | Private
// DELETE: api/blends/blend_id | Remove the blend with the given ID | Private
router.route('/:id').get(getBlend).put(editBlend).delete(removeBlend);

module.exports = router;
