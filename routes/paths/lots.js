// Import Libraries
const express = require('express');
const router = express.Router();
// Import route access protection
const auth = require('../../middleware/auth');
// Import controller actions
const { getLots, createLot, editLot, removeLot } = require('../actions/lotController.js');

// GET: api/lots/ | Get lists of each type of lot | Private
// POST: api/lots | Create a new lot | Private
router.route('/').get(getLots).post(createLot);

// POST: api/lots/lot_id | Edit the lot with the given ID | Private
router.post('/:id', editLot);

// DELETE: api/lots/type/id | Remove the lot with the given ID | Private
router.delete('/:type/:id', removeLot);

module.exports = router;
