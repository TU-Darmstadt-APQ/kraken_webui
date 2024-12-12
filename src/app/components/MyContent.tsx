import React from 'react';

import { MyContentProps } from '@/app/types';
import styles from './../styles/MyContent.module.css';

import PostList from "./PostList";
import PostForm from "./PostForm";
import ModalWindow from "./UI/ModalWindow/ModalWindow";
import MyButton from "./UI/button/MyButton";
import MyTooltip from './UI/tooltip/MyTooltip';


const MyContent: React.FC<MyContentProps> = (
    {
        modal,
        setModal,
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
    <div className={styles["Content"]}>

        {/* Left Sidebar */}
        <div className={styles["Sidebar"]}>
          <MyTooltip infoText="List of sensors" position="right">
            <MyButton>
              <img 
                src="/listIcon.png" 
                alt="Table View" 
                className="icon-button" 
                width={25} 
                height={25} 
              />
            </MyButton>
          </MyTooltip>
          <hr/>
          <MyTooltip infoText="Sensor data analysis" position="right">
            <MyButton>
              <img 
                src="/diagrammIcon.png" 
                alt="Table View" 
                className="icon-button" 
                width={25} 
                height={25} 
              />
            </MyButton>
          </MyTooltip>
          <hr/>
          <MyTooltip infoText="Sensor data share" position="right">
            <MyButton>
              <img 
                src="/shareIcon.png" 
                alt="Table View" 
                className="icon-button" 
                width={25} 
                height={25} 
              />
            </MyButton>
          </MyTooltip>
          
        </div>

        {/* Right Main Content */}
        <div className={styles["MainContent"]}>
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
      

      {/* Component responsible for displaying the list of sensors.
          It supports two views: table view and post view. */}
      <PostList remove={removePost} posts={sortedAndSearchedPosts} listTitle={listTitle} edit={handleEdit}></PostList> 
      </div>
      </div>
    </div>
  );
};

export default MyContent;