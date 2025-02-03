import React, { useState } from "react";

import { MyContentProps } from "@/types";
import styles from "@/styles/MyContent.module.css";

import PostList from "./PostList";
//import PostForm from "./PostForm";
//import ModalWindow from "./UI/ModalWindow/ModalWindow";
import MyButton from "./UI/button/MyButton";
import MyTooltip from "./UI/tooltip/MyTooltip";

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
  // State for actual content in MyContent
  const [activeContent, setActiveContent] = useState<string>("sensorList");

  // Functions for switching the content
  const showList = () => setActiveContent("sensorList");
  const showTree = () => setActiveContent("treeView");

  return (
    <div className={styles["Content"]}>
      {/* Left Sidebar */}
      <div className={styles["Sidebar"]}>
        <MyTooltip infoText="List of sensors" position="right">
          <MyButton onClick={showList}>
            <img
              src="/listIcon.png"
              alt="List View"
              className="icon-button"
              width={25}
              height={25}
            />
          </MyButton>
        </MyTooltip>
        <hr />
        <MyTooltip infoText="Tree view of sensors" position="right">
          <MyButton onClick={showTree}>
            <img
              src="/diagrammIcon.png"
              alt="Tree View"
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
          {/* Component responsible for displaying the list of sensors.
          It supports two views: table view and post view. */}
          {activeContent === "sensorList" && (
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
          )}

          {activeContent === "treeView" && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2>Tree View of sensors</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyContent;
