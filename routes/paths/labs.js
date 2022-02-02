// Import Libraries
const express = require('express');
const router = express.Router();
// Import route access protection
const auth = require('../../middleware/auth');
// Import Actions
const {getLabs, getLab, createLab, editLab, removeLab} =
  require('../actions/labsController.js');

// GET: api/labs/ | Get a list of all labs | Private
// POST: api/labs/ Create a new lab with the given info | Private
router.route('/').get(getLabs).post(createLab);

// PUT api/labs/lab_id | Edit the lab with the given ID | Private
// DELETE: api/labs/ | Remove the lab with the given ID from the database | Private
router.route('/:id').get(getLab).put(editLab).delete(removeLab);

module.exports = router;
