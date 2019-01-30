import axios from 'axios';

import { ADD_POST, CLEAR_ERRORS, DELETE_POST, GET_POST, GET_POSTS, GET_ERRORS, POST_LOADING } from './types';

// Add Post
// it get postData ,and we use dispatch to make a asyncronous request
export const addPost = postData => dispatch => {
  dispatch(clearErrors()); // before we do anything, we want to dispatch clearErrors()
  axios
    .post('/api/posts', postData)
    .then(res => dispatch({
      type: ADD_POST,
      payload: res.data // the actual post
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

// Get Posts - it's not getting any data
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get('/api/posts')
    .then(res => dispatch({
      type: GET_POSTS,
      payload: res.data // the actual post
    }))
    .catch(err => dispatch({
      type: GET_POSTS, // we don't use GET_ERRORS here,because we don't have any form to get errors for
      payload: null
    }));
};

// Get Post
export const getPost = (id) => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${id}`)
    .then(res => dispatch({
      type: GET_POST,
      payload: res.data // the single post
    }))
    .catch(err => dispatch({
      type: GET_POSTS, // we don't use GET_ERRORS here,because we don't have any form to get errors for
      payload: null
    }));
};

// Delete Post
export const deletePost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res => dispatch({
      type: DELETE_POST,
      payload: id // in our reducer, we want to delete a post, locally
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

// Add Like
export const addLike = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`) // it means adds the user to the likes array
    .then(res => dispatch(getPosts())) // here we just want to dispatch all posts, so we need to get all posts
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

// Remove Like
export const removeLike = id => dispatch => {
  axios
    .post(`/api/posts/unlike/${id}`) // it means adds the user to the likes array
    .then(res => dispatch(getPosts())) // here we just want to dispatch all posts, so we need to get all posts
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

// Add Comment
// it get postId and commentData ,and we use dispatch to make a asyncronous request
export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearErrors()); // before we do anything, we want to dispatch clearErrors()
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(res => dispatch({
      type: GET_POST, // we pass the post again
      payload: res.data // the actual post
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

// Delete Comment
// it get postId and commentData ,and we use dispatch to make a asyncronous request
export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res => dispatch({
      type: GET_POST, // we pass the post again
      payload: res.data // the actual post
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS // this is not going to postReducer,instead, it goes to errorReducer.js
  };
};
