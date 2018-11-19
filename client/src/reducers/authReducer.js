// import { TEST_DISPATCH } from "../actions/types"

const initialState = {
  isAuthenticated: false,
  user: {}
};

// any reducer export a finction that contains a state and an action
// state here is current state that reducer is responsible for, not whole application state
export default function(state = initialState , action) {
  // any action should have a type, it can also have payload with data
  // with a switch case statement, we specify which action should be implement
  switch (action.type) {
    // case TEST_DISPATCH: // if action was this, so we return state with additional info
    //   return {
    //     ...state, // we also need all basic previous state
    //     user: action.payload // we added action.payload as userdata to user coming form initialState
    //   }
    // by default we return the actual state
    default:
      return state;
  }
};
