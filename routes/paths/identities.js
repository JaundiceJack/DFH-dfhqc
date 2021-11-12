// Import Libraries
const express = require('express');
const router = express.Router();
// Import route access protection
const auth = require('../../middleware/auth');
// Import actions
const {getIds, createId, editId, removeId} = require('../actions/identityController.js');

// GET: api/identities/ | Get a list of all identities | Private
// POST: api/identities/ | Create a new identity | Private
router.route('/').get(getIds).post(createId);

// POST: api/identities/identity_id | Edit the identity with the given ID | Private
// DELETE: api/identities/identity_id Remove the identity with the given ID from the database | Private
router.route('/:id').post(editId).delete(removeId);

module.exports = router;
