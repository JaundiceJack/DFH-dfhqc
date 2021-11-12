// Import Libraries
const express = require('express');
const router = express.Router();
// Import route access protection
const auth = require('../../middleware/auth.js');
// Import actions
const {register} = require('../actions/usersController.js');

// POST api/users | register a new user | Public
router.route('/').post(register);

module.exports = router;
