const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// load input validation
const validateRegisterInput = require('./../../validation/register');
const validateLoginInput = require('./../../validation/login');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => {
  res.json({ msg: 'Users works' });
});

// @route   POST api/users/register
// @desc    register user
// @access  Public

// before using req.body , we should make sure that we required the 'body-parser' library into server.js
// that help us to use all input requests from UI by req.body
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body); // req.body contains name,email,password . so with ES6 technic of destruction,
  // we sent the coming return-value from validateRegisterInput() to variables of 'errors' and 'isValid' 

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // a post to /register route
  User.findOne({ email: req.body.email }).then(user => {
    // find the document with email which entered by UI or postman "req.body.email"
    if (user) {
      // check if email already exist
      errors.email = 'Email already exist';
      return res.status(400).json(errors);
    } else {
      // if not, create an avatar based on that email
      const avatar = gravatar.url(req.body.email, {
        // options:
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
      });
      const newUser = new User({
        // creat an instance from User model and import name,email,pass
        name: req.body.name,
        email: req.body.email,
        avatar, // avatar will get the avatar of above
        password: req.body.password
      });
      // generate a salt with 10 character
      bcrypt.genSalt(10, (err, salt) => {
        // hash the pass, we should create a salt first,here with 10 length
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          // then hash the actual pass and add the salt
          if (err) throw err; // if error, log it
          newUser.password = hash; // put the hashed password into plain-text password
          newUser
            .save() // save the newUser to db, and send the user as json respone
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST api/users/login
// @desc    login User / returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body); // req.body contains name,email,password . so with ES6 technic of destruction,
  // we sent the coming return-value from validateLoginInput() to variables of 'errors' and 'isValid' 
  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // gather email and password from UI
  const email = req.body.email;
  const password = req.body.password;

  // find user by email
  User.findOne({ email}).then(user => {
    // check for user
    if (!user) {
      errors.email = 'user not found';
      return res.status(404).json(errors); // if not exist
    }

    // check for password
    bcrypt.compare(password, user.password).then(isMatch => {
      //  check the plain-text password with hashed password
      if (isMatch) {
        // here because passwords are matched, so we can generate token
        // user matched

        // jwt.sign() is for creating token, so this token act as a key for accessing website for certain time
        // jwt.sign(), takes some info named "payload" that it's what we want to include in token,
        // Now what we want to include is some user information so we can see what user it is
        // we also need to send secret (or key), and 'expiresIn' property to set an expiration time of being loged in.
        // expiresIn is based on seconds and we set 3600s that implies as 1 hour.

        const payload = { id: user.id, name: user.name, avator: user.avatar }; // create JWT payload

        // anytime we create a user or an object with a model (like here) ,
        // it automatically creates an objectID as _id for this particular object.
        // so we can (need to) add this id to our payload anytime we wanted to access a user and jwt it.

        // Sign token
        jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600}, (err, token) => { // jwt.sign(payload,privateKey,expirationTime,callback)
          res.json({
            success: true, // in these json codes that we sent, we can pass any data we want,here like success
            token: 'Bearer ' + token // we added 'Bearer' word before token to show it contains some information
          }); // this token will send to server and server will validate the user, so we can get the user info and use them within express server
        });
      } else {
        // if password was incorrect and not match
        errors.password = 'Password incorrect';
        res.status(400).json(errors); // these massages are gonna be shown in UI to users
      }
    });
  });
});

// @route   Get api/users/Current
// @desc    Return current user
// @access  Private

// Three pieces need to be configured to use Passport for authentication:
// Authentication strategies
// Application middleware
// Sessions(optional)
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  // passport .autenticate() is a function that accept strategy and in some cases we should disable the session
  // when we send GET request with header of token, these lines of code run, and passport.authenticate() gets call. 
  // because we called users.js as route in server.js , and also we have passport.initialize() and passport config in server.js
  // so passport.js file will run and catch the passport with token and token has payload. and with passport.use() , payload will sit in place of jwt_payload
  // so we can log jwt_payload and get the payload. payload contains id,name,avatar

  // we should send token by Headers with key=Authorization,value=token so the word of Authorization is really important.
  //  here we should send payload to go and sit in place of jwt_payload
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  // now that we send token to passport.authenticate(), and we found the user based on that token, we have access to user by req here.
  }); // now we have a protected route
});

module.exports = router;
