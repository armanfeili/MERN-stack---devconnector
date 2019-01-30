const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const mongoose = require('mongoose');
const user = mongoose.model('users');

const keys = require('./keys'); // we required keys because that has our secret,we send along 'secretOrKey' with request. so we need it

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); // with this option,we can extract token from request
opts.secretOrKey = keys.secretOrKey; // we need secretOrKey to send with request
// we can add other optoins too, based on what we want to authenticate from a request

module.exports = passport => { // in server.js we passed passport right here

  // we pass in our strategy with options and what we get back in callback is our payload(that include user data) and done.
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    // jwt_payload should include user stuff, so we should have a route (/current) and send user info to passprt.js as jwt_payload
    console.log(jwt_payload); // returns user payload
    user.findById(jwt_payload.id) // here we find user so we can have the permission to access this user data.
      .then((user) => {
        if (user) {
          return done(null, user); // first argument of done is err, so we put null, and second is actual user
        }
        return done(null, false); // if user not found , so we don't return any user
      })
      .catch(err => console.log(err));
  }));
};
