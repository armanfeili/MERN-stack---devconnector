const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profile and User models
const Profile = require('../../models/profile');
const User = require('../../models/User');

// Load validation
const validateProfileInput = require('./../../validation/profile');

// @route   GET api/profile/all  ->
// @desc    get all profiles
// @access  Public  -> everyone should be able to see profiles (optional)
router.get('/all', (req, res) => {
  const errors = {};
  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles';
        return res.status(404).json(errors);
      }
      res.json(profiles);
    }).catch((err) => {
    res.status(400).json({profile: 'there are no profile'});
  });
});

// @route   GET api/profile/handle/:handle   -> it should be like: api/profile/handle/JohnDoe ,,, :handle is a placeholder
// @desc    get profile by handle
// @access  Public  -> everyone should be able to see profiles (optional)
router.get('/handle/:handle', (req, res) => { // we don't need passport middleware here, becasue it's a public route
  Profile.findOne({handle: req.params.handle}) // it's going to catch :handle from url and match that with handle in DB, so we find one.
    .populate('user', ['name', 'avatar']) // for getting user info like avatar and name, but not email
    .then(profile => {
      const errors = {};
      if (!profile) {
        errors.profile = 'There is no profile for this user';
        res.status(404).json(errors);
      }
      res.json(profile);
    }).catch((err) => {
    res.status(400).json(err);});
});

// @route   GET api/profile/user/:user_id   -> it should be like: api/profile/user/5 ,,, :user_id is a placeholder
// @desc    get profile by user_id
// @access  Public  -> everyone should be able to see profiles (optional)
router.get('/user/:user_id', (req, res) => { // we don't need passport middleware here, becasue it's a public route
  Profile.findOne({ user: req.params.user_id }) // it's going to catch :handle from url and match that with handle in DB, so we find one.
    .populate('user', ['name', 'avatar']) // for getting user info like avatar and name, but not email
    .then(profile => {
      const errors = {};
      if (!profile) {
        errors.profile = 'There is no profile for this user';
        res.status(404).json(errors);
      }
      res.json(profile);
    }).catch((err) => {
    res.status(400).json(err);
  });
});

// @route   GET api/profile  ->  here we don't use /profile/:id , because when we have protected routes, 
// we're getting a token that has a payload with user's information ,so we use that. it's more secure, because you have to be loged in to access this route

// @desc    Get current users profile
// @access  Private

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar']) // for getting user info like avatar and name, but not email -- 'user' refers to user in profile.js model
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/profile 
// @desc    craete or edit a user profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

  const {errors, isValid} = validateProfileInput(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Get Fields from long form.
  const profileFields = {};
  profileFields.user = req.user.id; // the id,name,avatar (payload) are not coming from the form

  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;
  // Skills -> we need to split it to an array
  // Skills - Spilt into array
  if (typeof req.body.skills !== 'undefined') {
    profileFields.skills = req.body.skills.split(',');
  }
  // Social
  profileFields.social = {}; // we created it because social has it's own object in profile model
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;

  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      // Update
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).then(profile => res.json(profile));
    } else {
      // Create

      // Check if handle exists
      Profile.findOne({ handle: profileFields.handle }).then(profile => {
        if (profile) {
          errors.handle = 'That handle already exists';
          res.status(400).json(errors);
        }

        // Save Profile
        new Profile(profileFields).save().then(profile => res.json(profile));
      });
    }
  });
});

module.exports = router;
