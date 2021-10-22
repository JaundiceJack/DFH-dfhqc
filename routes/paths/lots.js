// Import Libraries
const express = require('express');
const router = express.Router();
// Import route access protection
const auth = require('../../middleware/auth');
// Import controller actions
const { getLots, createLot, editLot, removeLot,
  createRawSample, testRawSample, removeRawSample
} = require('../actions/lotController.js');

// GET: api/lots/ | Get lists of each type of lot | Private
router.route('/').get(getLots);
// POST: api/lots | Create a new lot | Private
router.post('/', createLot);
// POST: api/lots/sample_raw | Set/Create a result object | Private
router.post('/sample_raw', createRawSample);
// POST api/lots/test_raw | Add testing to the given sample | Private
router.post('/test_raw', testRawSample)
// DELETE: api/lots/unsample_raw | remove the selected sample | Private
router.delete('/:id/unsample_raw/:sampleType/:sampleNumber/:testId?', removeRawSample);
// POST: api/lots/lot_id | Edit the lot with the given ID | Private
router.post('/:id', editLot);
// DELETE: api/lots/type/id | Remove the lot with the given ID | Private
router.delete('/:type/:id', removeLot);

module.exports = router;
