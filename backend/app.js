const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

const app = express();

// DB address
let mongoDB;
if (app.settings.env === 'development') {
  mongoDB = process.env.DB_LOCAL;
} else {
  mongoDB = process.env.DB_PROD;
}

// Connect to DB
const options = {useNewUrlParser: true, useUnifiedTopology: true};
mongoose.connect(mongoDB, options);
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error: '));
mongoose.connection.once('open', () => {
  console.log('Connected to database!');
});

module.exports = app;
