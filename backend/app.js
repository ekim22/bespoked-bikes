const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./routes/routes');

const app = express();

app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTION, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  res.header('Access-Control-Allow-Credentials', 'false');
  next();
});

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/products', (req, res, next) => setTimeout(next, 300), routes.productRoutes);
app.use('/api/salespeople', (req, res, next) => setTimeout(next, 300), routes.salespeopleRoutes);
app.use('/api/customers', (req, res, next) => setTimeout(next, 300), routes.customerRoutes);
app.use('/api/sales', (req, res, next) => setTimeout(next, 300), routes.salesRoutes);
app.use('/api/discounts', (req, res, next) => setTimeout(next, 300), routes.discountRoutes);

module.exports = app;
