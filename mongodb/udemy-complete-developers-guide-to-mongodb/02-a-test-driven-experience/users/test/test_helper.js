// initialisation code - connect to the mongodb database

// require mongoose module
const mongoose = require('mongoose');

// connect to the local mongodb instance
// we have to tell mongoose exactly where our database is 'mongodb://localhost/'
// and which database to use							  'users_test'
mongoose.connect('mongodb://localhost/users_test');
mongoose.connection
  // do this once i.e. once the connection is open
  .once('open', () => {
    console.log('Connection made. Good to go!')
  })
  // do this each time - when mongoose emits an error
  .on('error', (e) => {
    console.warn('Error: ', e);
  });

