const express = require('express'),
      parser = require('body-parser'),
      cors = require('cors'),
      morgan = require('morgan'),
      mongoose = require('mongoose'),
      dotenv = require('dotenv');
// Global app object
const app = express();
dotenv.config();

const PORT = process.env.NODE_PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI);


// Logging
app.use(morgan('dev'));

// Parsing
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use(cors());

// Routes
app.use('/', require('./routes'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));