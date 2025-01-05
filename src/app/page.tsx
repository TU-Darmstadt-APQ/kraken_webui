"use client";

import React, { useState } from "react";
import { usePosts } from "./hooks/usePosts";

import { Post, Filter } from "./types";
import MyHeader from "./components/UI/header/MyHeader";
import MyContent from "./components/MyContent";

function Page() {
  // Placeholder data for testing functionality
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: "Lorem ispum",
      description: "Description",
      date_created: {
        day: 21,
        month: 11,
        year: 2024,
        nanoseconds: 123456789.0,
      },
      date_modified: {
        day: 22,
        month: 11,
        year: 2024,
        nanoseconds: 0.0,
      },
      enabled: true,
      label: "XXX",
      uuid: "82fcb871-3614-4d4f-bc8b-f54d61dbe872",
      config: {
        theme: "dark",
        notifications: true,
      },
      on_connect: "etwas anderes",
      topic: "sensor",
      unit: "FB20",
      driver: "Tinkerforge",
      pad: 2,
      sad: 2,
      port: 8,
    },
    {
      id: 2,
      title: "A_Thinkpad",
      description: "Laptop-sensor",
      date_created: {
        day: 22,
        month: 12,
        year: 2023,
        nanoseconds: 223456789.0,
      },
      date_modified: {
        day: 22,
        month: 12,
        year: 2024,
        nanoseconds: 0.0,
      },
      enabled: false,
      label: "YYY",
      uuid: "df726eeb-1115-4a03-84d1-23f5e1ae37d7",
      config: {
        theme: "light",
        notifications: false,
      },
      on_connect: "etwas anderes",
      topic: "laptop_sensor",
      unit: "FB20",
      driver: "Tinkerforge",
      pad: 2,
      sad: 2,
      port: 8,
    },
    {
      id: 3,
      title: "Xiaomi",
      description: "none",
      date_created: {
        day: 1,
        month: 1,
        year: 2022,
        nanoseconds: 3456789.0,
      },
      date_modified: {
        day: 2,
        month: 1,
        year: 2025,
        nanoseconds: 0.0,
      },
      enabled: true,
      label: "ZZZ",
      uuid: "2919b938-b972-49f4-97f7-65e966a39293",
      config: {
        theme: "blue",
        notifications: true,
      },
      on_connect: "etwas anderes",
      topic: "smartphone_sensor",
      unit: "FB8",
      driver: "Tinkerforge",
      pad: 3,
      sad: 3,
      port: 9,
    },
  ]);

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
   * @property {keyof Post | ''} sort - Specifies the field to sort the posts by (e.g., 'title', 'id').
   * @property {string} query - Text for searching/filtering posts.
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

  const [postToEdit, setPostToEdit] = useState<Post | null>(null);

  /**
   * Adds a new post to the list.
   * Also closes the modal window after the post is created.
   *
   * @param {Post} newPost - The new post to add to the list.
   */
  const createPost = (newPost: Post) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  /**
   * Removes a post from the list based on its `id`.
   *
   * @param {Post} post - The post to be removed.
   */
  const removePost = (post: Post) => {
    setPosts(posts.filter((p) => p.id != post.id));
  };

  const editPost = (updatedPost: Post) => {
    setPosts(posts.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
    setModal(false);
    setPostToEdit(null);
  };
  const handleEdit = (post: Post) => {
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
        modal={modal}
        setModal={setModal}
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

export default Page;
