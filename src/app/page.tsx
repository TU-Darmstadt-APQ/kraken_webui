"use client";

import React, { useState } from "react";
import { usePosts } from "./hooks/usePosts";

import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import ModalWindow from "./components/UI/ModalWindow/ModalWindow";
import MyButton from "./components/UI/button/MyButton";

import { Post } from "./types";


function Page() {

  // Placeholder data for testing functionality
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: 'Lorem ispum',
      description: 'Description',
      date_created: '2012',
      date_modified: '2012',
      enabled: 'true',
      label: 'XXX',
      uid: '125633',
      config: 'etwas',
      on_connect: 'etwas anderes'
    },
    { id: 2, title: 'Sensor', description: 'Description' },
    { id: 3, title: 'Sensor 2', description: 'Description' }
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
  const [filter, setFilter] = useState<{ sort: keyof Post | ''; query: string }>({sort: '', query: ''});


  /**
   * State to manage the visibility of the modal window.
   * @param modal - `true` means the modal is visible, `false` means it is hidden.
   */
  const [modal, setModal]  = useState(false)


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
  }

  /**
   * Removes a post from the list based on its `id`.
   *
   * @param {Post} post - The post to be removed.
   */
  const removePost = (post: Post) => {
    setPosts(posts.filter(p => p.id != post.id));
  }

  return (
    <div className="App">
      
      {/* Button to open the modal for adding a new sensor */}
      <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
        Sensor Einfügen
      </MyButton>

      {/* Modal window for adding a new sensor */}
      <ModalWindow visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/> 
        {/**
         * The `create` prop is passed to the child component (`PostForm`) 
         * as a callback function. It allows the child to send data (the new post)
         * back to the parent (`Page`). 
         * This unidirectional data flow follows React's tree structure: 
         * Parents can pass props to children, but children cannot directly modify parent data (!)
         */}
      </ModalWindow>
      
      <hr style={{margin: '15px 0'}}></hr>
       {/* Component responsible for managing the filter inputs */}
      <PostFilter filter={filter} setFilter={setFilter}/>

      {/* Component responsible for displaying the list of sensors.
          It supports two views: table view and post view. */}
      <PostList remove={removePost} posts={sortedAndSearchedPosts} listTitle={"Die Liste aller Sensoren"}></PostList> 
      
    </div>
  );
}

export default Page;
