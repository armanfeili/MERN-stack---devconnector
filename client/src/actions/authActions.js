// import { TEST_DISPATCH } from './types'
import axios from 'axios';
import { GET_ERRORS } from './types';

// Register user
export const registerUser = (userData, history) => dispatch => {
  //     return { // we're sending this action to all reducers. userdata here is actualy the data coming from axios or http request
  //     type: TEST_DISPATCH,
  //     payload: userdata
  //   }
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login')) // if axios.post worked successfully we ridirect /register route to /login
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};
