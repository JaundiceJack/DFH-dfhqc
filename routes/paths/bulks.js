// Import Libraries
const express = require('express');
const router = express.Router();
// Import route access protection
const auth = require('../../middleware/auth');
// Import actions
const {getBulks, createBulk, editBulk, removeBulk} = require('../actions/bulkController.js');

// GET: api/bulks/ | Get a list of all bulks | Private
// POST: api/bulks/ | Create a new bulk material | Private
router.route('/').get(getBulks).post(createBulk);

// POST: api/bulks/bulk_id | Edit the bulk with the given ID | Private
// DELETE: api/bulks/bulk_id | Remove the bulk with the given ID | Private
router.route('/:id').post(editBulk).delete(removeBulk);

module.exports = router;
