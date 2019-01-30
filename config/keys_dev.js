module.exports = {
  mongoURI: 'mongodb://armandomlab:arbamlab756@ds147213.mlab.com:47213/devconnector',
  secretOrKey: 'someSecret'
};

// mongoURI is our complete mongoDB database string which has our username and password
// we also have a secret for the JsonWebToken
// we don't want to push this data
// so we add them to ./gitignore 
