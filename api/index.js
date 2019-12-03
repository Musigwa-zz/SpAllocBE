const express = require("express");
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('../config/database');
const debug = require('debug')('app:startup');

const routes = require('./routes');

const app = express();
const { PORT = 3000 } = process.env;
const NODE_ENV = app.get('env');

app.set('view engine', 'pug');
app.set('views', './views');

if (NODE_ENV === 'development') app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json(), helmet(), express.static('public'));
app.use('/api', routes);

app.listen(PORT, () => debug(`Listening on port ${PORT}`));
