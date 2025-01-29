import React, { useState } from "react";

import { MyContentProps } from "@/types";
import styles from "@/styles/MyContent.module.css";

import PostList from "./PostList";
import PostForm from "./PostForm";
import ModalWindow from "./UI/ModalWindow/ModalWindow";
import { Button } from "@nextui-org/react";
import MyTooltip from "./UI/tooltip/MyTooltip";

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
          <Button onClick={showList}>
            <img
              src="/listIcon.png"
              alt="List View"
              className="icon-button"
              width={25}
              height={25}
            />
          </Button>
        </MyTooltip>
        <hr />
        <MyTooltip infoText="Tree view of sensors" position="right">
          <Button onClick={showTree}>
            <img
              src="/diagrammIcon.png"
              alt="Tree View"
              className="icon-button"
              width={25}
              height={25}
            />
          </Button>
        </MyTooltip>
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
            {/**
             * The `create` prop is passed to the child component (`PostForm`)
             * as a callback function. It allows the child to send data (the new post)
             * back to the parent (`Page`).
             * This unidirectional data flow follows React's tree structure:
             * Parents can pass props to children, but children cannot directly modify parent data (!)
             */}
          </ModalWindow>

          {/* Conditional Content Rendering */}

          {/* Component responsible for displaying the list of sensors.
          It supports two views: table view and post view. */}
          {activeContent === "sensorList" && (
            <PostList
              remove={removePost}
              posts={sortedAndSearchedPosts}
              listTitle={listTitle}
              edit={handleEdit}
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
