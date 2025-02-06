"use client";

import React, { useState } from "react";
import { Filter } from "@/types";
import MyContent from "@/components/MyContent";
import MyHeader from "@/components/UI/header/MyHeader";
import { tinkerforgeDTO } from "@/models/zTinkerforgeSensor.schema";
import { useDTOs } from "@/hooks/usePosts";
import { v4 as uuidv4 } from "uuid";

function PostHandler({ sensors }: { sensors: tinkerforgeDTO[] }) {
  // Placeholder data for testing functionality
  const [posts, setPosts] = useState<tinkerforgeDTO[]>(sensors);

  /**
   * Generates a specified number of mock posts and appends them to an existing list of posts.
   *
   * @function
   * @param {tinkerforgeDTO[]} existingPosts - The array of existing posts to which new posts will be appended.
   * @param {number} count - The number of new posts to generate.
   * @returns {tinkerforgeDTO[]} - A new array containing both the existing posts and the newly generated posts.
   *
   * @example
   * const existingPosts = [
   *   {
   *     id: 1,
   *     description: "Description of existing post 1",
   *     date_created: { day: 1, month: 1, year: 2024, nanoseconds: 0.123 },
   *     date_modified: { day: 2, month: 1, year: 2024, nanoseconds: 0.456 },
   *     enabled: true,
   *     label: "Label-A",
   *     uid: "uuid-1000",
   *     config: { theme: "dark", notifications: true },
   *     on_connect: "Connect message 1",
   *   },
   * ];
   *
   * const newPosts = generatePosts(existingPosts, 2);
   * console.log(newPosts.length); // Output: 3 (1 existing + 2 generated)
   */
  function generatePosts(
    existingPosts: tinkerforgeDTO[],
    count: number,
  ): tinkerforgeDTO[] {
    const newPosts: tinkerforgeDTO[] = [];
    const startingId = existingPosts.length + 1;

    for (let i = 0; i < count; i++) {
      let date = new Date().toISOString();

      const newPost: tinkerforgeDTO = {
        id: uuidv4(),
        date_created: date,
        date_modified: date,
        enabled: Math.random() > 0.5,
        label: `Label-${String.fromCharCode(65 + (i % 26))}`,
        description: `Generated Description for DTO ${startingId + i}`,
        uid: startingId + i,
        config: {
          [`config-${startingId + i}`]: {
            // Key as string
            description: Math.random() > 0.5 ? `Config Description ${i}` : null,
            interval: Math.floor(Math.random() * 5000) + 1000, // numbers from 1000 to 6000
            trigger_only_on_change: Math.random() > 0.5,
            topic: ["sensor", "laptop_sensor", "smartphone_sensor"][i % 3],
            unit: ["FB20", "FB8", "FB12"][i % 3],
          },
        },

        on_connect: [
          {
            function: `initFunction${i}`,
            args: [`arg${i}`, i * 2],
            kwargs: { key1: `value${i}`, key2: i * 3 },
            timeout:
              Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
          },
        ],
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
  const sortedAndSearchedDTOs = useDTOs(
    posts,
    filter.sort,
    filter.query,
    filter.searchField,
  );

  const [postToEdit, setPostToEdit] = useState<tinkerforgeDTO | null>(null);

  /**
   * Adds a new post to the list.
   * Also closes the modal window after the post is created.
   *
   * @param {tinkerforgeDTO} newPost - The new post to add to the list.
   */
  const createPost = (newPost: tinkerforgeDTO) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  /**
   * Removes a post from the list based on its `id`.
   *
   * @param {tinkerforgeDTO} post - The post to be removed.
   */
  const removePost = (post: tinkerforgeDTO) => {
    setPosts(posts.filter((p) => p.id != post.id));
  };

  const editPost = (updatedPost: tinkerforgeDTO) => {
    setPosts(posts.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
    setModal(false);
    setPostToEdit(null);
  };
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
        modal={modal}
        setModal={setModal}
        sortedAndSearchedPosts={sortedAndSearchedDTOs}
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

export default PostHandler;
