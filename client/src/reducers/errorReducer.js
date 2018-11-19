// import { TEST_DISPATCH } from "../actions/types"
import { GET_ERRORS } from '../actions/types';

const initialState = {}; // we don't want an initial state, we need just error object

export default function (state = initialState , action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
};
