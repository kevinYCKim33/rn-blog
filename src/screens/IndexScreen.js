import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { Context } from "../context/BlogContext";
import { Feather } from "@expo/vector-icons"; // i.e. like FontAwesome

// First screen that shows up
// no need for withNavigation (v4) since it's a direct child from App.js
// again this doesn't matter in v5
const IndexScreen = ({ navigation }) => {
  // get all the actions with this Context; which is the simple part...
  // you will need to know all the arrays of blog posts
  // be able to delete a post
  // be able to get all the posts
  const { state, deleteBlogPost, getBlogPosts } = useContext(Context);

  useEffect(() => {
    getBlogPosts(); // hits jsonServer's /blogposts
    // basically, get a json of arrays of blog posts
    // [{title: 'asdf', content: 'fda', id: 3}, {}, {}]

    // this is still a curious one...
    // addListener on the navigation prop??
    // didFocus??

    // ANSWER:
    // even when we nagivate away from the Index page
    // the Index page is still mounted
    // I guess the better question is, can't we set something
    // in the [] array to re-fire useEffect when there's a new/edited post?
    // Alternatively, we could have also just refetched index after create/edit
    // but this seems cuter

    // didFocus: when this screen is the main focus
    const listener = navigation.addListener("didFocus", () => {
      getBlogPosts();
    });

    // componentDidUnmount
    // had to use once for Uppy
    // a cleanup function, but don't think this will ever fire in this App example
    return () => {
      listener.remove();
    };
  }, []); // [] ==> when this mounts, do this exactly once

  return (
    <View>
      <FlatList
        data={state}
        keyExtractor={(blogPost) => blogPost.title} // why not blogPost.id?
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Show", { id: item.id })}
            >
              <View style={styles.row}>
                <Text style={styles.title}>
                  {item.title} - {item.id}
                </Text>
                {/* hmmm overlapping Touchable Opacity... seems very not a11y friendly?? */}
                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                  <Feather style={styles.icon} name="trash" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

// this is insanely awesome and would've been super helpful for arthur coding challenge
// V5 way of doing it: navigation.setOptions instead of Static.navigationOptions
// https://reactnavigation.org/blog/2020/02/06/react-navigation-5.0/#update-options-from-component
IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("Create")}>
        <Feather name="plus" size={30} />
      </TouchableOpacity>
    ),
  };
  // deprecated!
  // return {
  //   headerRight: (
  //     <TouchableOpacity onPress={() => navigation.navigate('Create')}>
  //       <Feather name="plus" size={30} />
  //     </TouchableOpacity>
  //   )
  // };
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between", // what separates the trash can with blog title - id
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: "gray",
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24,
  },
});

export default IndexScreen;
