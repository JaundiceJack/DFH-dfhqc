// Import Libraries
const express = require('express');
const router = express.Router();

// Import route access protection
const auth = require('../../middleware/auth.js');

const {login, emailResetPassword, resetPassword, getUserData} = require('../actions/authController.js');

// POST api/auth | authenticate the user for logging in | Public
router.route('/').post(login);

// POST api/auth/reset_password | Dispatch an email with a link to reset the user's password | Public
router.route('/reset_password').post(emailResetPassword);

// GET api/auth/reset_password | Go to the reset password page | Public
router.route('/reset_password/:token').post(resetPassword);

// GET api/auth | Get user data | Private
router.route('/user').get(auth, getUserData);

module.exports = router;
