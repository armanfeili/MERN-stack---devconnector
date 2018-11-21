import axios from 'axios';

import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE } from './types';

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

// Profile Loading
export const setProfileLoading = () => {
  // We don't need to send any payload or anything, it's just going to let the reducer know that it's loading.
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  // We don't need to send any payload or anything, it's just going to let the reducer know that it's loading.
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
