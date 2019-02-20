// import { TEST_DISPATCH } from './types'
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register user
export const registerUser = (userData, history) => dispatch => {
  //     return { // we're sending this action to all reducers. userdata here is actualy the data coming from axios or http request
  //     type: TEST_DISPATCH,
  //     payload: userdata
  //   }
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login')) // if axios.post worked successfully we ridirect /register route to /login
    .catch(err => dispatch({ // calling dispatch , help us to send an action
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

// Login user - Get user token
export const loginUser = (userData) => dispatch => {
  axios.post('/api/users/login', userData)
    .then(res => {
      // save to localStorage
      const { token } = res.data;
      // token is comming from users.js

      // set token to localStorage

      // The localStorage and sessionStorage properties allow to save key/value pairs in a web browser
      // The localStorage object stores data with no expiration date. The data will not be deleted when the browser is closed, and will be available the next day, week, or year.
      // The localStorage property is read - only.
      // data stored in either localStorage or sessionStorage is specific to the protocol of the page.

      // Syntax for SAVING data to localStorage:
      // localStorage.setItem("key", "value")

      localStorage.setItem('jwtToken', token);
      // if we go to browser>inspect>Application>Local Storage , we can see our token 

      // set token to Auth header
      setAuthToken(token);
      // this is a function we need to create by ourselves and comming from utils
      // this will go to be used in any private routes

      // Decode token to get userData
      // token here contains all info about user like: name,id,avatar, 
      // in order to decode this, we need to add a module jwt-decode , then we can extract user from that
      const decoded = jwt_decode(token); // decoded has userdata and expirationTime of the token

      // Set current user
      dispatch(setCurrentUser(decoded)); // setCurrentUser is a function for dispatching (sending) an action, which defined below.
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove the token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove the auth header for future request
  setAuthToken(false); // in setAuthToken() if there was no token, it will delete the auth header
  // Set current user to empty object and isAuthenticated to false
  dispatch(setCurrentUser({}));
// with this, setCurrentUser() will send an empty object as payload, so user will be like {}, 
// and isAuthenticated: !isEmpty(action.payload), so because payload is an empty object, isAuthenticated will be false
};

export const setCurrentUser = decoded => { // this will get the decoded token and return an action 
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
