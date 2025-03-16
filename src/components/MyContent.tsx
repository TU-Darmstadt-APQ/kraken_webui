import { MyContentProps } from "@/types";
import PostList from "./PostList";
import React from "react";
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
  return (
    <div className={styles["Content"]}>
      {/* Left Sidebar */}
      <div className={styles["Sidebar"]}>
        {/* Add any additional buttons or functionality here if needed */}
      </div>

      {/* Right Main Content */}
      <div className={styles["MainContent"]}>
        <div>
          {/* Component responsible for displaying the list of sensors.*/}
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
        </div>
      </div>
    </div>
  );
};

export default MyContent;
