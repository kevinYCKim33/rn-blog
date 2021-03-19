import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer"; // super cool local server that can spit out json

// Big Picture...I get the big picture
// just shove into context these actions as well as state
// then just do useContext and pull from there state and/or actions

// looks super reducer-y
// just return me some updated object that's all reducers are
const blogReducer = (state, action) => {
  switch (action.type) {
    case "get_blogposts":
      return action.payload;
    case "edit_blogpost":
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
    case "delete_blogpost":
      return state.filter((blogPost) => blogPost.id !== action.payload);
    default:
      return state;
  }
};

const getBlogPosts = (dispatch) => {
  return async () => {
    // hit server
    const response = await jsonServer.get("/blogposts");

    // update UI
    dispatch({ type: "get_blogposts", payload: response.data });
  };
};

const addBlogPost = (dispatch) => {
  return async (title, content, callback) => {
    // hit server
    await jsonServer.post("/blogposts", { title, content });

    // update UI with a callback
    // i.e. navigate back
    if (callback) {
      callback();
    }
  };
};

const deleteBlogPost = (dispatch) => {
  // a thunk without a thunk??
  // hit server
  return async (id) => {
    await jsonServer.delete(`/blogposts/${id}`);

    // update ui
    dispatch({ type: "delete_blogpost", payload: id });
  };
};

const editBlogPost = (dispatch) => {
  return async (id, title, content, callback) => {
    // hit server
    await jsonServer.put(`/blogposts/${id}`, { title, content });

    // update ui
    dispatch({
      type: "edit_blogpost",
      payload: { id, title, content },
    });
    if (callback) {
      callback(); // return back
    }
  };
};

// also exporting destructured props...kinda elegant
// ? what is createDataContext
// Provider gets imported by App to wrap everything in
// Context gets imported by every component to access state and dispatch actions
export const { Context, Provider } = createDataContext(
  blogReducer,
  // C, D, U, G, no show?
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  [] // and also this random blank array?
);
