import React, { useReducer, createContext } from "react";

// imported as createDataContext
/*
export const { Context, Provider } = createDataContext(
  blogReducer,
  // C, D, U, G, no show?
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  [] // and also this random blank array?
);
*/

// three passes and I still don't fully get it.
export default (reducer, actions, initialState) => {
  const Context = createContext(); // surprised there's nothing in here...
  // very confusing what the proper createContext syntax is...

  // why not just declare this
  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    debugger;
    // the only way to update the state is to dispatch an action to the reducer
    // the state will just be an array of blog posts
    // Typescript really would've helped out here...

    // the only thing I'm kind of confused by...
    // actions === { addBlogPost: (dispatch) => { return () => {} } }

    // sighhh he is explaining this part...
    // https://www.udemy.com/course/the-complete-react-native-and-redux-course/learn/lecture/15707494#questions
    const boundActions = {};
    // loop through the actions
    // call it a dispatch
    // still don't fully get it...
    for (let key in actions) {
      // bind each action to dispatch
      // before: getBlogPosts: ƒ getBlogPosts(dispatch)
      boundActions[key] = actions[key](dispatch);
      // after: getBlogPosts: function that once executed; will fire dispatch that is bound to the useReducer function
      // YES!! IT MAKES SENSE NOW!
    }

    // all I know is that do this..., and now you have all Crud actions
    // i.e. getBlogPosts
    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
