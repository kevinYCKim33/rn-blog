import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Context } from "../context/BlogContext";
import BlogPostForm from "../components/BlogPostForm";

// get here by clicking on the top right button from Index Screen
// don't need any params
const CreateScreen = ({ navigation }) => {
  const { addBlogPost } = useContext(Context);

  return (
    <BlogPostForm
      onSubmit={(title, content) => {
        // addBlogPost takes in a callback
        // I would've done a promise instead and do a .then?
        // but oh well
        // anyways don't do navigation.navigate("Index") in newline
        addBlogPost(title, content, () => navigation.navigate("Index"));
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default CreateScreen;
