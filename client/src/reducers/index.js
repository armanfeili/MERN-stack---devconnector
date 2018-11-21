// this is our root reducer where we combine all reducers
import { combineReducers } from 'redux';
import authReducer from './authReducer'; // just one of our reducers
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';

export default combineReducers({ // we combine all reducers with a name we've chosen for them and export them.
  auth: authReducer, // in our components, this reducer will be accessible with this.props.auth
  errors: errorReducer,
  profile: profileReducer
});
