"use client";

import React, { useState } from "react";
import { usePosts } from "@/hooks/usePosts";

import { Post, Filter } from "@/types";
import MyHeader from "@/components/UI/header/MyHeader";
import MyContent from "@/components/MyContent";

import { v4 as uuidv4 } from "uuid";
import dynamic from "next/dynamic";

function PostHandlerNoSSR(allDocs: Post[]) {
  // Placeholder data for testing functionality
  const [posts, setPosts] = useState<Post[]>(allDocs);

  /**
   * Generates a specified number of mock posts and appends them to an existing list of posts.
   *
   * @function
   * @param {Post[]} existingPosts - The array of existing posts to which new posts will be appended.
   * @param {number} count - The number of new posts to generate.
   * @returns {Post[]} - A new array containing both the existing posts and the newly generated posts.
   *
   * @example
   * const existingPosts = [
   *   {
   *     id: 1,
   *     title: "Existing Post 1",
   *     description: "Description of existing post 1",
   *     date_created: { day: 1, month: 1, year: 2024, nanoseconds: 0.123 },
   *     date_modified: { day: 2, month: 1, year: 2024, nanoseconds: 0.456 },
   *     enabled: true,
   *     label: "Label-A",
   *     uuid: "uuid-1000",
   *     config: { theme: "dark", notifications: true },
   *     on_connect: "Connect message 1",
   *     topic: "sensor",
   *     unit: "FB20",
   *     driver: "Tinkerforge",
   *     pad: 5,
   *     sad: 3,
   *     port: 8,
   *   },
   * ];
   *
   * const newPosts = generatePosts(existingPosts, 2);
   * console.log(newPosts.length); // Output: 3 (1 existing + 2 generated)
   */
  function generatePosts(existingPosts: Post[], count: number): Post[] {
    const newPosts: Post[] = [];
    const startingId = existingPosts.length + 1;

    for (let i = 0; i < count; i++) {
      let date = new Date();

      const newPost: Post = {
        title: `Generated Title ${startingId + i}`,
        description: `Generated Description for Post ${startingId + i}`,
        date_created: {
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear(),
          nanoseconds: date.getMilliseconds(),
        },
        date_modified: {
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear(),
          nanoseconds: date.getMilliseconds(),
        },
        enabled: Math.random() > 0.5,
        label: `Label-${String.fromCharCode(65 + (i % 26))}`,
        uuid: `uuid-${uuidv4()}`,
        config: {
          theme: ["dark", "light", "blue", "red"][i % 4],
          notifications: Math.random() > 0.5,
        },
        on_connect: `Generated connect message ${startingId + i}`,
        topic: ["sensor", "laptop_sensor", "smartphone_sensor"][i % 3],
        unit: ["FB20", "FB8", "FB12"][i % 3],
        driver: "Tinkerforge",
        pad: Math.floor(Math.random() * 10),
        sad: Math.floor(Math.random() * 10),
        port: Math.floor(Math.random() * 20),
      };

      newPosts.push(newPost);
    }

    return [...existingPosts, ...newPosts];
  }

  /**
   * Handles the generation of 10,000 test posts and appends them to the current state.
   * This method is purely for testing purposes to evaluate optimization performance !!!
   * It should be removed once data from the database is successfully implemented.
   *
   * @function
   * @example
   * // Adds 10,000 new posts to the current list
   * <button onClick={handleGeneratePosts}>Generate 10,000 Posts</button>
   */
  const handleGeneratePosts = () => {
    const newPosts = generatePosts(posts, 10000);
    setPosts(newPosts);
  };

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
   * Removes a post from the list based on its `uuid`.
   *
   * @param {Post} post - The post to be removed.
   */
  const removePost = (post: Post) => {
    setPosts(posts.filter((p) => p.uuid != post.uuid));
  };

  const editPost = (updatedPost: Post) => {
    setPosts(posts.map((p) => (p.uuid === updatedPost.uuid ? updatedPost : p)));
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

      <div>
        <button onClick={handleGeneratePosts}>Generate 10,000 Posts</button>
        <p>Total Posts: {posts.length}</p>
      </div>
    </div>
  );
}

// export it with SSR disabled
const PostHandler = dynamic(() => Promise.resolve(PostHandlerNoSSR), {
  ssr: false,
});

export default PostHandler;
