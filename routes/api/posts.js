const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post = require('../../models/Post');
const Profile = require('../../models/profile');
// Validation
const validatePostInput = require('../../validation/post');

router.get('/test', (req, res) => {
  res.json({ msg: 'Posts works' });
});

// @route   POST api/posts
// @desc    create post
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body); // we pass all the req.body into validation file
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar, // avatar will come from react application.
    user: req.user.id // so user actualy is the id
  });

  newPost.save().then((post) => res.json(post));
});

// @route   GET api/posts
// @desc    get all posts
// @access  Public
router.get('/', (req, res) => {
  Post.find()
    .sort({date: -1})
    .then((posts) => res.json(posts))
    .catch(err => res.status(404).json(err));
});

// @route   GET api/posts/:id
// @desc    get one post
// @access  Public
router.get('/:id', (req, res) => {
  // Post.findOne({user: req.params.id})  // it's not working!!! why?
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch(err => res.status(404).json({nopostfound: 'No post found by that id'}));
});

// @route   DELETE api/posts/:id
// @desc    delete a post
// @access  Private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOne({user: req.user.id}) // make sure it's the current user - the id is different from req.params.id and comming from payload
    .then(profile => { // here we just found that profile and we have nothing to do with that profile
      Post.findById(req.params.id).then(post => { // find that particular post
        // Check for post owner
        if (post.user.toString() !== req.user.id) { // post.user is an id and not string, so we used toString()
          // user is << user: req.user.id >> 
          return res.status(404).json({notauthorized: 'User not authorized'});
        }

        // Delete
        post.delete().then(() => res.json({success: true}));
      })
        .catch(err => res.status(404).json(err));
    });
});

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id }) // make sure it's the current user with payload (token)
    .then(profile => {
      Post.findById(req.params.id).then(post => { // find that post
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) { // check if likes array has the id of this user
          res.status(400).json(alreadyliked = 'User already liked this post');
        }

        // Add user id to likes array - likes array is an array of users (who liked the post).
        post.likes.unshift({user: req.user.id}); // each like has it's own _id and user(id)
        post.save().then(post => res.json(post));
      })
        .catch(err => res.status(404).json(err));
    });
});

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id }) // make sure it's the current user
    .then(profile => {
      Post.findById(req.params.id).then(post => { // find that post
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) { // check if likes array doesn't have the id of this user
          return res.status(400).json(alreadyliked = 'You have not yet liked this post.');
        }

        // Get remove index -> which post we want to unlike
        const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);
        // Splice out of array
        post.likes.splice(removeIndex, 1);
        // save to DB
        post.save().then(post => res.json(post));
      })
        .catch(err => res.status(404).json(err));
    });
});

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post('/comment/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  // we don't need to add a new validation file, and we can use the post.js validation file for validating the only text
  const { errors, isValid } = validatePostInput(req.body); // we pass all the req.body into validation file
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Post.findById(req.params.id).then(post => {
    const newComment = { // we also can add a seprate model for comments which not recomended.
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    };

    // add to comments array
    post.comments.unshift(newComment);

    // save to DB
    post.save().then(post => res.json(post));
  })
    .catch(err => res.json(404).json({postnotfound: 'Post not found'}));
});

// @route   DELETE api/posts/comment/:id/:comment
// @desc    Delete comment from a post
// @access  Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Post.findById(req.params.id).then(post => {
    // check if comment exists
    // if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
    //   return res.status(404).json({commentnotexists: 'Comment does not exist.'})
    // }
    if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
      return res.status(404).json({ commentnotexists: 'Comment does not exist' });
    }

    const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);

    post.comments.splice(removeIndex, 1);

    post.save().then(post => res.json(post));
  })
    .catch(err => res.json(404).json({ postnotfound: 'Post not found' }));
});

router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // Check to see if comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: 'Comment does not exist' });
        }

        // Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  }
);

module.exports = router;

// /////////////////////////////////////////////////////////////////////
