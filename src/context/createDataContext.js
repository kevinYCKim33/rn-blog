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

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    // the state will just be an array of blog posts
    // Typescript really would've helped out here...

    // the only thing I'm kind of confused by...
    // actions === { addBlogPost: (dispatch) => { return () => {} } }
    const boundActions = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
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
