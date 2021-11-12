// Import Libraries
const express = require('express');
const router = express.Router();

// Import route access protection
const auth = require('../../middleware/auth');
// Import Actions
const {getMethods, createMethod, editMethod, removeMethod} = require('../actions/methodController.js');

// GET: api/methods/ | Get a list of all methods | Private
// POST: api/methods/ | Create a new method | Private
router.route('/').get(getMethods).post(createMethod);

// POST: api/methods/method_id | Edit the method with the given ID | Private
// DELETE: api/methods/ Remove the method with the given ID from the database | Private
router.route('/:id').post(editMethod).delete(removeMethod);

module.exports = router;
