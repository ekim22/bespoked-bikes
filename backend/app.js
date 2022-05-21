const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./routes/routes');

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/products', routes.productRoutes);
app.use('/api/salespeople', routes.salespeopleRoutes);
app.use('/api/customers', routes.customerRoutes);
app.use('/api/sales', routes.salesRoutes);
app.use('/api/discounts', routes.discountRoutes);

module.exports = app;
