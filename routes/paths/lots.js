// Import Libraries
const express = require('express');
const router = express.Router();
// Import route access protection
const auth = require('../../middleware/auth');
// Import controller actions
const { getLots, getLot, createLot, editLot, removeLot } = require('../actions/lotController.js');

// GET: api/lots/ | Get lists of each type of lot | Private
// POST: api/lots | Create a new lot | Private
router.route('/').get(getLots).post(createLot);

// GET:  api/lots/ | Get the selected lot | Private
// POST: api/lots/lot_id | Edit the lot with the given ID | Private
// DELETE: api/lots/id | Remove the lot with the given ID | Private
router.route('/:id').get(getLot).post(editLot).delete(removeLot);

module.exports = router;
