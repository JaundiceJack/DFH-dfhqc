const mongoose = require('mongoose');

const connect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    })
    console.log(`MongoDB connected! Hosted at ${conn.connection.host}.`)
  } catch (err) {
    console.log(`Error: ${err}`)
    process.exit(1)
  }
}

module.exports = connect;
