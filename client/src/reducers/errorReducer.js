// import { TEST_DISPATCH } from "../actions/types"
import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {}; // we don't want an initial state, we need just error object

export default function (state = initialState , action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return {};
    // this function always return state, so if we return an empty object,
    // it stands of state. so state will be an empty object
    default:
      return state;
  }
};

// import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types'

// const initialState = {}

// export default function (state = initialState , action) {
//   switch (action.type) {
//     case GET_ERRORS:
//       return action.payload
//     case CLEAR_ERRORS:
//       return {}
//     default:
//       return state
//   }
// }
