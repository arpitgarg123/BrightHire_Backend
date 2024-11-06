const mongoose = require('mongoose');

// Connect to MongoDB

mongoose.connect(process.env.MONGOURL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));


  module.exports = mongoose.connection