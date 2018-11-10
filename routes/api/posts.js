const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post');

router.get('/test', (req, res) => {
  res.json({ msg: 'Posts works' });
});

// @route   POST api/post
// @desc    create post
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.name,
    id: req.user.id
  });

  newPost.save().then((post) => res.json(post));
});

module.exports = router;
