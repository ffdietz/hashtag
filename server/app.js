require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const cors         = require('cors');

const app_name     = require('./package.json').name;
const debug        = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

//Config Mongo connection
require('./configs/database.config');

// Middleware Setup
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup
app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, 'public')));

// default value local title
app.locals.title = '#GlaciarGrey * Ultima Esperanza';

//CLOUDINARY ROUTES
const cloudinaryRouter = require('./routes/cloudinaryRouter');
app.use('/cloudinary', cloudinaryRouter);

//MONGODB COMPASS ROUTES
const compassDbRouter = require('./routes/compassDbRouter');
app.use('/local-db', compassDbRouter);

//REMOTE DB ROUTES
const index = require('./routes/index');
app.use('/', index);

const { mainModule } = require('process');

module.exports = app;
