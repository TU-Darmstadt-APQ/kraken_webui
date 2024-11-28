import React from 'react';

import { MyContentProps } from '@/app/types';

import PostList from "./PostList";
import PostForm from "./PostForm";
import PostFilter from "./PostFilter";
import ModalWindow from "./UI/ModalWindow/ModalWindow";
import MyButton from "./UI/button/MyButton";


const MyContent: React.FC<MyContentProps> = (
    {
        modal,
        setModal,
        filter,
        setFilter,
        sortedAndSearchedPosts,
        createPost,
        removePost,
        editPost,
        handleEdit,
        postToEdit,
        listTitle,
      }
) => {
  return (
    <div className="Content">

        {/* Left Sidebar */}
        <div className="Sidebar">
          <MyButton>Option 1</MyButton>
          <MyButton>Option 2</MyButton>
          <MyButton>Option 3</MyButton>
          <MyButton>Option 4</MyButton>
          <MyButton>Option 5</MyButton>
        </div>

        {/* Right Main Content */}
        <div className="MainContent">
          <div>

      {/* Modal window for adding a new sensor */}
      <ModalWindow visible={modal} setVisible={setModal}>
        <PostForm create={createPost} edit={editPost} postToEdit={postToEdit}/> 
        {/**
         * The `create` prop is passed to the child component (`PostForm`) 
         * as a callback function. It allows the child to send data (the new post)
         * back to the parent (`Page`). 
         * This unidirectional data flow follows React's tree structure: 
         * Parents can pass props to children, but children cannot directly modify parent data (!)
         */}
      </ModalWindow>

       {/* Component responsible for managing the filter inputs */}
      <PostFilter filter={filter} setFilter={setFilter}/>
      

      {/* Component responsible for displaying the list of sensors.
          It supports two views: table view and post view. */}
      <PostList remove={removePost} posts={sortedAndSearchedPosts} listTitle={listTitle} edit={handleEdit}></PostList> 
      </div>
      </div>
    </div>
  );
};

export default MyContent;