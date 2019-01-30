import {
  ADD_POST,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST
} from "../actions/types";

const initialState = {
  posts: [],
  post: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_LOADING:
      return { ...state, loading: true };
    case ADD_POST:
      return { ...state, posts: [action.payload, ...state.posts] };

    case GET_POSTS:
      return { ...state, posts: action.payload, loading: false }; // all posts
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        // the initial state
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    // we want to delete the post with that id comming from payload, so we deleted the post in postAction.js
    // here we just need to delete it from the UI (or component state)
    // if the post id and the id comming from payload was match, it returns false
    // so with filter(), we have an array like: [true,true,true,false,true]
    // at the end of the day we have an array with all tures. like: [true,true,true,true]
    default:
      return state;
  }
}
