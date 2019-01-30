import axios from 'axios';

import { SET_CURRENT_USER, GET_PROFILE, GET_PROFILES, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS } from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading()); // this will set the loading state before it actually does the request
  axios.get('/api/profile')
    .then(res => dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  )
    .catch(err => dispatch({ // we don't want to get errors here, because you maybe registered and don't have a profile yet.
      type: GET_PROFILE,
      payload: {} // so we return a profile as empty object, so we can create a button to say: create a profile
    })
  );
};

// Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/profile/all')
    .then(res => dispatch({
      type: GET_PROFILES,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_PROFILES,
      payload: null // we want to keep profiles stay at null in reducer if there was an error
    }));
};

// Get profile by handle
export const getProfileByHandle = (handle) => dispatch => {
  dispatch(setProfileLoading);
  axios.get(`/api/profile/handle/${handle}`)
    .then(res => dispatch({
      type: GET_PROFILE,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_PROFILE,
      payload: null
    }));
};

// Create a profile
export const createProfile = (profileData, history) => dispatch => { // we need profileData for creating a profile, we also need history tp redirect th page, we used dispatch to use redux-thunk
  axios.post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

// Add experience
export const addExperience = (expData, history) => dispatch => {
  axios
    .post('/api/profile/experience', expData)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

// Add education
export const addEducation = (eduData, history) => dispatch => {
  axios.post('/api/profile/education', eduData)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

// Delete Experience
export const deleteExperience = (id) => dispatch => {
  axios.delete(`/api/profile/experience/${id}`)
    .then(res => dispatch({ // we could use history.push('/dashboard'),
      // but we prefered to catch current profile data again.
      type: GET_PROFILE,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

// Delete Education
export const deleteEducation = (id) => dispatch => {
  axios.delete(`/api/profile/education/${id}`)
    .then(res => dispatch({ // we could use history.push('/dashboard'),
      // but we prefered to catch current profile data again.
      type: GET_PROFILE,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

// Delete Account and Profile
export const deleteAccount = () => dispatch => { // we use dispatch whenever we wanna use axios request
  if (window.confirm(`Are you sure? This can NOT be undone!`)) {
    axios.delete('/api/profile')
      .then(res => dispatch({
        type: SET_CURRENT_USER, // it will go to authReducer and set the user as empty object and isAuthenticated will set to false.
        payload: {}
      }))
      .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }));
  }
};

// Profile Loading
export const setProfileLoading = () => {
  // We don't need to send any payload or anything, it's just going to let the reducer know that it's loading.
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  // We don't need to send any payload or anything, it's just going to let the reducer know that there is no profile.
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
