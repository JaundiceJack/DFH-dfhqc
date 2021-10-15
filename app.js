const express = require('express');
const { notFound, errorFound } = require('./middleware/error.js');
const connect = require('./mongo');
const dotenv = require('dotenv');
dotenv.config();

// Instance the app server
const app = express();
app.use(express.json());
connect();

// Define Routes //
app.use('/api/raws',   require('./routes/api/raws'));
app.use('/api/blends', require('./routes/api/blends'));
app.use('/api/bulks',  require('./routes/api/bulks'));
app.use('/api/fgs',    require('./routes/api/fgs'));
app.use('/api/lots',   require('./routes/api/lots'));
app.use('/api/assays', require('./routes/api/assays'));
app.use('/api/lots',   require('./routes/api/lots'));
app.use('/api/labs',   require('./routes/api/labs'));
app.use('/api/auth',   require('./routes/api/auth'));
app.use('/api/users',  require('./routes/api/users'));
app.use('/api/methods',  require('./routes/api/methods'));
app.use('/api/units',  require('./routes/api/units'));
app.use('/api/textures',  require('./routes/api/textures'));
app.use('/api/identities', require('./routes/api/identities'));
app.use('/api/vendors', require('./routes/api/vendors'));
app.use('/api/manufacturers', require('./routes/api/manufacturers'));
app.get('/ping', (req, res) => { return res.send('pong'); });

app.use(notFound);
app.use(errorFound);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('public/build'));
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'build', 'index.html'));
  })
}

// Start the server on port 5000 or the webserver's port
const port = process.env.PORT || 5000;
app.listen(port, () => { console.log(`DFH App started on port ${port}.`); });
