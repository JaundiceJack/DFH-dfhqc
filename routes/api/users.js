// Import Libraries
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const trycatch = require('express-async-handler');
const mongoose = require('mongoose');
// Import route access protection
const auth = require('../../middleware/auth.js');
// Import the User Model
const User = mongoose.connection.model('users', require('../../schemas/User'));

// Grab the json web token key
const jwtk = process.env.JWT_SECRET;

// POST api/users | register a new user | Public
router.post('/', trycatch( async (req, res) => {
  // Get the user entries from the request body
  const { email, password, startingBalance } = req.body;
  // Validate the entries
  if (!email || !password )
    return res.status(400).json(
      { msg: "Please enter all fields." });
  // Check for a user with the entered email to prevent duplicates
  const user = await User.findOne({ email });
  if (user)
    return res.status(401).json(
      { msg: "An account with the entered email address already exists."});
  // If no other user was found, encrypt the password and make the new user
  else {
    const newUser = new User({ email, password });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
      });
    });
    // Attempt to save the user and respond with the tokenized user
    const savedUser = await newUser.save();
    if (savedUser) {
      jwt.sign(
        { id: savedUser._id },
        jwtk,
        { expiresIn: 3600 },
        (err, token) => { if (err) throw err;
          return res.json({
            user: {
              _id: savedUser._id,
              email: savedUser.email,
              access_level: savedUser.access_level
            },
            token: token
          });
        }
      )
    }
    else return res.status(401).json(
      { msg: "Failed to save the new user."});
  }
}));

module.exports = router;
