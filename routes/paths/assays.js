// Import Libraries
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const trycatch = require('express-async-handler');
// Import route access protection
const auth = require('../../middleware/auth');

const { getAssays, createAssay, editAssay, deleteAssay } = require('../actions/assaysController.js');

// GET: api/assays/ | Get a list of all assays | Private
// POST: api/assays/ | Create a new assay | Private
router.route('/').get(getAssays).post(createAssay);

// PUT: api/assays/assay_id | Edit the assay with the given ID | Private
// DELETE: api/assays/assay_id Remove the assay with the given ID from the database | Private
router.route('/:id').put(editAssay).delete(deleteAssay);

module.exports = router;
