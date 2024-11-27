"use client";

import React, { useState } from "react";
import { usePosts } from "./hooks/usePosts";

import { Post } from "./types";
import MyHeader from "./components/UI/header/MyHeader";
import MyContent from "./components/MyContent";


function Page() {
  // Placeholder data for testing functionality
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: 'Lorem ispum',
      description: 'Description',
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
      label: 'XXX',
      uid: '125633',
      config: {
        theme: "dark",
        notifications: true,
      },
      on_connect: 'etwas anderes'
    }
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
  const [filter, setFilter] = useState<{
    sort: keyof Post | "";
    query: string;
  }>({ sort: "", query: "" });

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
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

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

  return (
    <div className="App">
      <MyHeader addingNewSensor={() => setModal(true)} />

      <MyContent 
        modal={modal}
        setModal={setModal}
        filter={filter}
        setFilter={setFilter}
        sortedAndSearchedPosts={sortedAndSearchedPosts}
        createPost={createPost}
        removePost={removePost}
        listTitle={"The list of all sensors"} 
      />
    </div>
  );
}

export default Page;
