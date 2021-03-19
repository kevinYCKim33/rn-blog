import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Context } from "../context/BlogContext";
import { EvilIcons } from "@expo/vector-icons";

const ShowScreen = ({ navigation }) => {
  // {route}
  // route.params.id in V5
  const { state } = useContext(Context);

  // in yelp we did useEffect
  // but we already have everything in the store at this time...
  // so just pluck out a blogPost using the navigation param
  const blogPost = state.find(
    (blogPost) => blogPost.id === navigation.getParam("id")
  );

  return (
    <View>
      <Text>{blogPost.title}</Text>
      <Text>{blogPost.content}</Text>
    </View>
  );
};

ShowScreen.navigationOptions = ({ navigation }) => {
  // deprecated: https://www.udemy.com/course/the-complete-react-native-and-redux-course/learn/lecture/20351723#questions
  // return {
  //   headerRight: (
  //     <TouchableOpacity
  //       onPress={() =>
  //         navigation.navigate('Edit', { id: navigation.getParam('id') })
  //       }
  //     >
  //       <EvilIcons name="pencil" size={35} />
  //     </TouchableOpacity>
  //   )
  // };
  // V5 way of doing it: navigation.setOptions instead of Static.navigationOptions
  // https://reactnavigation.org/blog/2020/02/06/react-navigation-5.0/#update-options-from-component
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Edit", { id: navigation.getParam("id") })
        }
      >
        <EvilIcons name="pencil" size={35} />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({});

export default ShowScreen;
