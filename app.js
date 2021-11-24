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
app.use('/api/raws',   require('./routes/paths/raws'));
app.use('/api/blends', require('./routes/paths/blends'));
app.use('/api/bulks',  require('./routes/paths/bulks'));
app.use('/api/fgs',    require('./routes/paths/fgs'));
app.use('/api/lots',   require('./routes/paths/lots'));
app.use('/api/assays', require('./routes/paths/assays'));
app.use('/api/lots',   require('./routes/paths/lots'));
app.use('/api/tests', require('./routes/paths/tests'));
app.use('/api/labs',   require('./routes/paths/labs'));
app.use('/api/auth',   require('./routes/paths/auth'));
app.use('/api/users',  require('./routes/paths/users'));
app.use('/api/methods',  require('./routes/paths/methods'));
app.use('/api/units',  require('./routes/paths/units'));
app.use('/api/textures',  require('./routes/paths/textures'));
app.use('/api/identities', require('./routes/paths/identities'));
app.use('/api/vendors', require('./routes/paths/vendors'));
app.use('/api/manufacturers', require('./routes/paths/manufacturers'));
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
