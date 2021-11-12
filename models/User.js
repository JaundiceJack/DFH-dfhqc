const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const UserSchema = new Schema({
  email:       { type: String, required: true, unique: true },
  password:    { type: String, required: true },
  sign_up_date:  { type: Date,   default: Date.now },
  access_level: { type: Number, default: 0 },
  facility_location: { type: String, default: 'MT' },
  passwordResetToken: String,
  passwordResetExpire: Date
});

const User = mongoose.model('users', UserSchema);

module.exports = User;
