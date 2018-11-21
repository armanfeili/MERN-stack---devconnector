import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common['Authorization'] = token;
  // when this function get called, a header will add to http request with key of Authorization and value of token
  }else {
    // Delete auth header <- if the token wasn't there.
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
