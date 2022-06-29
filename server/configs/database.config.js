const mongoose    = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const db_uri = process.env.DB_URI;

  mongoose
  .connect(db_uri, {
      // Mongoose new versions doesn't require this parameters 
      // useCreateIndex: true,
      // useNewUrlParser: true,
      // useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo - Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to Mongo', err.message));
  