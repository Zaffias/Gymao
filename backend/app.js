const express = require('express'),
      parser = require('body-parser'),
      cors = require('cors'),
      morgan = require('morgan'),
      mongoose = require('mongoose'),
      dotenv = require('dotenv'),
      errorHandler = require('./utils/errorHandler');

// Global app object
const app = express();

dotenv.config();

// Environment variables
const PORT = process.env.NODE_PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
app.set('secretKey', process.env.SECRET_KEY);

// MongoDB connection
mongoose.connect(MONGODB_URI);

// Logging
app.use(morgan('dev'));

// Parsing
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use(cors());

// Routes
app.use('/', require('./routes'));

// Sends a 404 if the route is not defined
app.get('*', function(req, res){
    res.status(404).send({message: "Resource not found"});
  });


// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));