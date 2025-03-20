import React, { useState } from "react";
import MyButton from "./UI/button/MyButton";
import { MyContentProps } from "@/types";
import PostList from "./PostList";
import TreeComponent from "./TreeComponent";
import styles from "@/styles/MyContent.module.css";

/**
 * `MyContent` is the main container component that manages and displays content.
 *
 * The layout consists of two main sections (currently):
 * - Left Sidebar: Contains buttons to switch between the list and tree view.
 * - Main Content Area: Displays either the `PostList` (sensor list) or `TreeComponent` (sensor hierarchy).
 *
 * @param {MyContentProps} props - The props include:
 *   - `inputRow` (boolean) - Controls the visibility of the input row for data entry (`InputRow.tsx`).
 *   - `setInputRow` (callback-function) - Callback function that updates the visibility state of the modal.
 *   - `sortedAndSearchedPosts` (tinkerforgeDTO[]) - The filtered and sorted list of sensors.
 *   - `createPost` (callback-function) - Callback function that adds a new post (specifically, adds a new item to the beginning of the list).
 *   - `removePost` (callback-function) - Callback function that handles post deletion.
 *   - `editPost` (callback-function) - Callback function that handles post editing.
 *   - `handleEdit` (callback-function) - Callback function that triggers the editing state.
 *   - `postToEdit` (tinkerforgeDTO | null) - Holds the post being edited (or `null` if no post is currently being edited).
 *   - `listTitle` (string) - The title of the post list.
 *
 * @returns {JSX.Element} - The main content section of the application.
 */

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
  // State to toggle between list and tree view
  const [showPostList, setShowPostList] = useState(true);

  return (
    <div className={styles["Content"]}>
      {/* Left Sidebar */}
      <div className={styles["Sidebar"]}>
        {/* Add any additional buttons or functionality here if needed */}
        {/* Button to show the list of posts */}
        <MyButton onClick={() => setShowPostList(true)}>
          <img
            src="tableIcon.png"
            alt="Show Post List"
            className="icon-button"
            width={25}
            height={25}
          />
          <hr />
        </MyButton>
        {/* Button to show the hierarchical tree view */}
        <MyButton onClick={() => setShowPostList(false)}>
          <img
            src="tree-structure.png"
            alt="Show Tree"
            className="icon-button"
            width={25}
            height={25}
          />
        </MyButton>
      </div>

      {/* Right, Main Content */}
      <div className={styles["MainContent"]}>
        <div>
          {/* Conditionally render either the sensor list or the tree view */}
          {showPostList ? (
            // Component responsible for displaying the list of sensors.
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
