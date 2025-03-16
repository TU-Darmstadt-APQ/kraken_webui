import React, { useState } from "react";
import MyButton from "./UI/button/MyButton";
import { MyContentProps } from "@/types";
import PostList from "./PostList";
import TreeComponent from "./TreeComponent";
import styles from "@/styles/MyContent.module.css";

const MyContent: React.FC<MyContentProps> = ({
  inputRow,
  setInputRow,
  sortedAndSearchedPosts,
  createPost,
  removePost,
  editPost,
  handleEdit,
  postToEdit,
  listTitle,
}) => {
  const [showPostList, setShowPostList] = useState(true);

  return (
    <div className={styles["Content"]}>
      {/* Left Sidebar */}
      <div className={styles["Sidebar"]}>
        {/* Add any additional buttons or functionality here if needed */}
        <MyButton onClick={() => setShowPostList(true)}>
          Show Post List
        </MyButton>
        <MyButton onClick={() => setShowPostList(false)}>Show Tree</MyButton>
      </div>

      {/* Right Main Content */}
      <div className={styles["MainContent"]}>
        <div>
          {/* Component responsible for displaying the list of sensors.*/}
          {showPostList ? (
            <PostList
              createPost={createPost}
              inputRow={inputRow}
              setInputRow={setInputRow}
              remove={removePost}
              posts={sortedAndSearchedPosts}
              listTitle={listTitle}
              edit={handleEdit}
              editPost={editPost}
              postToEdit={postToEdit}
            ></PostList>
          ) : (
            <TreeComponent sensors={sortedAndSearchedPosts} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyContent;
