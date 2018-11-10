const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post = require('../../models/Post');
// Validation
const validatePostInput = require('../../validation/post');

router.get('/test', (req, res) => {
  res.json({ msg: 'Posts works' });
});

// @route   POST api/post
// @desc    create post
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const {errors, isValid} = validatePostInput(req.body); // we pass all the req.body into validation file
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar, // avatar will come from react application.
    id: req.user.id
  });

  newPost.save().then((post) => res.json(post));
});

module.exports = router;
