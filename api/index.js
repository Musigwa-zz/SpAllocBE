const express = require("express");
const helmet = require('helmet');
const morgan = require('morgan');

const routes = require('./routes');
const Helpers = require('./helpers');
const constants = require('./helpers/constants');

const app = express();
const { NODE_ENV = 'development' } = process.env;

app.set('view engine', 'pug');
app.set('views', './views');

if (NODE_ENV === 'development') app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json(), helmet(), express.static('public'));
app.use('/api', routes);

app.listen(constants.PORT, Helpers.dbConnect);

