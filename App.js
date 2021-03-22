import React from "react";
// import { createStackNavigator, createAppContainer } from 'react-navigation';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import IndexScreen from "./src/screens/IndexScreen";
import { Provider } from "./src/context/BlogContext"; // his syntax is a bit quirky but it's really no more different than my Context.Provider
import ShowScreen from "./src/screens/ShowScreen";
import CreateScreen from "./src/screens/CreateScreen";
import EditScreen from "./src/screens/EditScreen";

// again very v4 like
// there isn't anything here that's that egrigious...
const navigator = createStackNavigator(
  {
    Index: IndexScreen,
    Show: ShowScreen,
    Create: CreateScreen,
    Edit: EditScreen,
  },
  {
    initialRouteName: "Index",
    defaultNavigationOptions: {
      title: "Blogs",
    },
  }
);

const App = createAppContainer(navigator);

// he uses Provider a bit more interestingly...
// v4 really makes things not look reacty for Context stuff
export default () => {
  return (
    <Provider>
      <App />
    </Provider>
  );
};
