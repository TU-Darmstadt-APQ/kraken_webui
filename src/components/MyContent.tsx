import ModalWindow from "./UI/ModalWindow/ModalWindow";
import { MyContentProps } from "@/types";
import PostForm from "./PostForm";
import PostList from "./PostList";
import React from "react";
import styles from "@/styles/MyContent.module.css";

const MyContent: React.FC<MyContentProps> = ({
  modal,
  setModal,
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
          {/* Modal window for adding a new sensor */}
          <ModalWindow visible={modal} setVisible={setModal}>
            <PostForm
              create={createPost}
              edit={editPost}
              postToEdit={postToEdit}
            />
          </ModalWindow>

          {/* Always render the table view */}
          <PostList
            posts={sortedAndSearchedPosts}
            listTitle={listTitle}
            remove={removePost}
            edit={handleEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default MyContent;
