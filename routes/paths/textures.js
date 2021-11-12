// Import Libraries
const express = require('express');
const router = express.Router();
// Import route access protection
const auth = require('../../middleware/auth');
// Import actions
const {getTextures, createTexture, editTexture, removeTexture} = require('../actions/textureController.js');

// GET: api/textures/ | Get a list of all textures | Private
// POST: api/textures/ | Create a new texture | Private
router.route('/').get(getTextures).post(createTexture);

// POST: api/textures/texture_id | Edit the texture with the given ID | Private
// DELETE: api/textures/ Remove the texture with the given ID from the database | Private
router.route('/:id').post(editTexture).delete(removeTexture);

module.exports = router;
