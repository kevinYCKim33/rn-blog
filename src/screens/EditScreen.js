import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Context } from "../context/BlogContext";
import BlogPostForm from "../components/BlogPostForm";

// Edit and Create share the same BlogPostForm
// very rails form_for like

// Get here by clicking on the pencil icon from IndexScreen
const EditScreen = ({ navigation }) => {
  // {route}
  // route.params.id in V5
  const id = navigation.getParam("id");
  const { state, editBlogPost } = useContext(Context);

  // need state to pluck out the blog post
  const blogPost = state.find((blogPost) => blogPost.id === id);

  return (
    <BlogPostForm
      initialValues={{ title: blogPost.title, content: blogPost.content }}
      onSubmit={(title, content) => {
        // this is almost currying...or is it??
        // reverse currying? or actual currying?
        editBlogPost(id, title, content, () => navigation.pop());
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default EditScreen;
