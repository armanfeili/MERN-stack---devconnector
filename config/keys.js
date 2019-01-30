if (process.env.NODE_ENV === 'production') {
  module.exports = require('./keys_prod');
// if we deploy to heroku, process.env.NODE_ENV will be production, so ./keys_prod will export
}else {
  module.exports = require('./keys_dev');
// if we're in dev like local machine, it should load /keys_dev
}

// we don't want to push './keys_dev' so we add it in .gitignore
// as /congig/keys_dev.js

// mongoURI is the complete mongoDB database string which has our username and password
// we also have a secret for the JsonWebToken
// we don't want to push this data
// so we create 2 more files: keys_dev.js & keys_prod.js
