const mongoose = require('mongoose');

const connectionString = 
  `mongodb+srv://
    ${process.env.DB_USER}:
    ${process.env.DB_PASS}
    @cluster0.z7jt8.mongodb.net/
    ${process.env.DB_NAME}`

mongoose
  .connect(connectionString, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo - DB name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to Mongo', err));

