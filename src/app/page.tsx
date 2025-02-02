"use client";
import { Filter, Post } from "@/types";
import React, { useState } from "react";
import MyContent from "@/components/MyContent";
import MyHeader from "@/components/UI/header/MyHeader";
import { usePosts } from "@/hooks/usePosts";

function Page() {
  // Placeholder data for testing functionality
  const [posts, setPosts] = useState<Post[]>([
    {
      title: "Lorem Ipsum",
      description: "A placeholder sensor for testing purposes.",
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
      label: "Placeholder Sensor",
      uuid: "82fcb871-3614-4d4f-bc8b-f54d61dbe872",
      config: {
        theme: "dark",
        notifications: true,
      },
      on_connect: "Connect message for Lorem Ipsum",
      topic: "sensor_placeholder",
      unit: "FB20",
      driver: "Tinkerforge",
      pad: 2,
      sad: 2,
      port: 8,
    },
    {
      title: "Xiaomi",
      description: "A smartphone sensor from Xiaomi.",
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
      label: "Smartphone Sensor",
      uuid: "2919b938-b972-49f4-97f7-65e966a39293",
      config: {
        theme: "blue",
        notifications: true,
      },
      on_connect: "Connect message for Xiaomi",
      topic: "smartphone_sensor",
      unit: "FB8",
      driver: "Tinkerforge",
      pad: 3,
      sad: 3,
      port: 9,
    },
    {
      title: "ThinkPad",
      description: "A laptop sensor from Lenovo ThinkPad.",
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
      label: "Laptop Sensor",
      uuid: "df726eeb-1115-4a03-84d1-23f5e1ae37d7",
      config: {
        theme: "light",
        notifications: false,
      },
      on_connect: "Connect message for ThinkPad",
      topic: "laptop_sensor",
      unit: "FB20",
      driver: "Tinkerforge",
      pad: 2,
      sad: 2,
      port: 8,
    },
  ]);

  // Filter state
  const [filter, setFilter] = useState<Filter>({
    sort: "",
    query: "",
    searchField: "all",
  });

  // Modal state
  const [modal, setModal] = useState(false);

  // Sorted and filtered posts
  const sortedAndSearchedPosts = usePosts(
    posts,
    filter.sort,
    filter.query,
    filter.searchField,
  );

  // Post editing state
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);

  // CRUD operations
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
    setPosts(posts.filter((p) => p.uuid !== post.uuid));
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
      {/* Header with filtering and adding functionality */}
      <MyHeader
        addingNewSensor={() => {
          setModal(true);
          setPostToEdit(null);
        }}
        filter={filter}
        setFilter={setFilter}
      />

      {/* Main content with table view */}
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
