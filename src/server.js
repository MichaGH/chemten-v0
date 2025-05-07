const app = require('./app.js')

//! .env file config
const dotenv = require('dotenv');
dotenv.config()
const DB_URI = process.env.DB_URI;
const PORT = process.env.PORT || 3000;

//! Load db config file
const connectDB = require('./config/db.js')

//! Connect to DB, then start the server
console.time('Connected to DB in:');

connectDB().then(() => {

    console.timeEnd('Connected to DB in:');
    console.time('Started App In');

    app.listen(PORT, () => {

      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.timeEnd('Started App In');

    });
  });