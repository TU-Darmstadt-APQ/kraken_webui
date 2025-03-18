"use client";

import React, { useState } from "react";
import { Filter } from "@/types";
import MyContent from "@/components/MyContent";
import MyHeader from "@/components/UI/header/MyHeader";
import { tinkerforgeDTO } from "@/models/zTinkerforgeSensor.schema";
import { usePosts } from "@/hooks/usePosts";

function PostHandler({ sensors }: { sensors: tinkerforgeDTO[] }) {
  // Placeholder data for testing functionality
  const [posts, setPosts] = useState(sensors);

  /**
   * In React, there are two main approaches to interact with DOM elements:
   * 1. Controlled components - State is fully managed by React.
   * 2. Uncontrolled components - State is managed by the DOM itself.
   * Here, we use the "controlled component" approach.
   */

  /*
  we define individual states for different components such as: [current state, function for changing the state]
  by manipulating these states, the page is redisplayed (or individual parts of the website)
  */

  /**
   * This state manages the filter settings.
   * When the state is updated, it triggers a re-render of the relevant components.
   *
   * @param filter - Object containing the current state (filter configuration)
   * @property {keyof tinkerforgeDTO | ''} sort - Specifies the field to sort the posts by (e.g., 'title', 'id').
   * @property {string} query - Text for searching/filtering posts.
   * @property {string} searchField - Specifies the field to search within (e.g., 'title', 'description', or 'all').
   *
   * @example
   * // Updating the filter to sort by ID and search only in titles
   * setFilter((prev) => ({
   *   ...prev,
   *   sort: "id",            // Sort posts by their ID
   *   searchField: "title",  // Search only in the 'title' field
   * }));
   */
  const [filter, setFilter] = useState<Filter>({
    sort: "",
    query: "",
    searchField: "all",
  });

  /**
   * State to manage the visibility of the modal window.
   * @param modal - `true` means the modal is visible, `false` means it is hidden.
   */
  const [modal, setModal] = useState(false);

  /**
   * A sorted and filtered version of the posts.
   * `usePosts` returns a copy (!) of the posts array based on the filter criteria,
   * without modifying the original state.
   */
  const sortedAndSearchedPosts = usePosts(
    posts,
    filter.sort,
    filter.query,
    filter.searchField,
  );

  /**
   * State that holds the post currently being edited.
   * If `null`, no post is being edited.
   */
  const [postToEdit, setPostToEdit] = useState<tinkerforgeDTO | null>(null);

  /**
   * Adds a new post to the list.
   * Also closes the modal window after the post is created.
   *
   * @param {Post} newPost - The new post to add to the list.
   */
  const createPost = (newPost: tinkerforgeDTO) => {
    setPosts([newPost, ...posts]);
    setModal(false);
  };

  /**
   * Removes a post from the list based on its `uuid`.
   *
   * @param {Post} post - The post to be removed.
   */
  const removePost = (post: tinkerforgeDTO) => {
    setPosts(posts.filter((p) => p.id != post.id));
  };

  /**
   * Updates an existing post in the list.
   * Also closes the modal and resets the editing state.
   *
   * @param {tinkerforgeDTO} updatedPost - The modified post data.
   */
  const editPost = (updatedPost: tinkerforgeDTO) => {
    setPosts(posts.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
    setModal(false);
    setPostToEdit(null);
  };

  /**
   * Prepares a post for editing.
   * Opens the modal and sets the selected post as `postToEdit`.
   *
   * @param {tinkerforgeDTO} post - The post to be edited.
   */
  const handleEdit = (post: tinkerforgeDTO) => {
    setPostToEdit(post);
    setModal(true);
  };

  return (
    <div className="App">
      <MyHeader
        addingNewSensor={() => {
          setModal(true);
          setPostToEdit(null);
        }}
        filter={filter}
        setFilter={setFilter}
      />

      <MyContent
        inputRow={modal}
        setInputRow={setModal}
        sortedAndSearchedPosts={sortedAndSearchedPosts}
        createPost={createPost}
        removePost={removePost}
        editPost={editPost}
        handleEdit={handleEdit}
        postToEdit={postToEdit}
        listTitle={"The list of all sensors"}
      />
    </div>
  );
}

export default PostHandler;
