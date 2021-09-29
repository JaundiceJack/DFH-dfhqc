const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connection = mongoose.createConnection(
  process.env.MONGO_URI,
  { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true }
);

module.exports = connection;
