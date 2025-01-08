import React, { useState } from "react";
import Image from "next/image";
import PostItem from "./PostItem";
import TableItem from "./TableItem";
import styles from "@/app/styles/PostList.module.css";

import { PostListProps } from "@/app/types";
import MyToggle from "./UI/toggle/MyToggle";
import MyTooltip from "./UI/tooltip/MyTooltip";

/**
 * Component for rendering a list of posts with the ability to toggle between table view and post view.
 *
 * @component
 * @param {Array} posts - Array of post objects to display.
 * @param {string} listTitle - Title of the list.
 * @param {(post: object) => void} remove - Callback function to handle removing a post.
 * @param {(post: Post) => void} edit - Callback function to edit a post.
 * 
 * @example 
 * 
 * const sortedAndSearchedPosts = usePosts(
     posts,
     filter.sort,
     filter.query,
     filter.searchField,
   );
 * const removePost = (post: Post) => {
     setPosts(posts.filter((p) => p.uuid != post.uuid));
   };
 * const handleEdit = (post: Post) => {
       setPostToEdit(post);
       setModal(true);
     };

 * <PostList
 *   posts={sortedAndSearchedPosts}
 *   listTitle="Sensor List"
 *   remove={removePost}
 *   edit={handleEdit}
 * />
 */
const PostList: React.FC<PostListProps> = ({
  posts,
  listTitle,
  remove,
  edit,
}) => {
  // Display a message when no posts are available
  if (!posts.length) {
    return <h1 style={{ textAlign: "center" }}>No sensors found</h1>;
  }

  // State to toggle between table view and post view
  const [isTableView, setIsTableView] = useState(false);

  const [selectedColumns, setSelectedColumns] = useState({
    id: true,
    title: false,
    description: true,
    date_created: true,
    date_modified: true,
    enabled: true,
    label: false,
    uuid: true,
    config: true,
    on_connect: false,
    topic: false,
    unit: false,
    port: false,
    pad: false,
    sad: false,
    driver: false,
    sensor_type: false,
  });

  return (
    <div>
      {/* Title for the list */}
      <h1 style={{ textAlign: "center" }}>{listTitle}</h1>

      {/* Buttons to toggle view mode */}
      <div className={styles["view-buttons"]}>
        <MyTooltip infoText="Table view of sensors" position="top">
          <button
            onClick={() => setIsTableView(true)}
            className={styles["list-button"]}
          >
            <Image
              src="/tableIcon.png"
              alt="Table View"
              className="icon-button"
              width={20}
              height={20}
            />
          </button>
        </MyTooltip>
        <MyTooltip infoText="Post view of sensors" position="top-right">
          <button
            onClick={() => setIsTableView(false)}
            className={styles["list-button"]}
          >
            <Image
              src="/blogIcon.png"
              alt="Posts View"
              className="icon-button"
              width={20}
              height={20}
            />
          </button>
        </MyTooltip>
      </div>

      {/* Conditional rendering for table view or post view */}
      {isTableView ? (
        <div>
          <div className={styles["toggle-container"]}>
            {Object.keys(selectedColumns).map((columnKey) => (
              <MyToggle
                key={columnKey} //key is used in the map call to give each element a unique identification. It is not passed on to MyToggle as a prop.
                label={columnKey}
                checked={
                  selectedColumns[columnKey as keyof typeof selectedColumns]
                }
                onChange={(e) =>
                  setSelectedColumns((prev) => ({
                    ...prev,
                    [columnKey]: e,
                  }))
                }
              />
            ))}
          </div>

          {/* Render posts in table format */}
          <div className={styles["table-container"]}>
            <table className={styles["sensor-table"]} border={0}>
              <thead>
                <tr>
                  {selectedColumns.id && <th>ID</th>}
                  {selectedColumns.title && <th>Title</th>}
                  {selectedColumns.description && <th>Description</th>}
                  {selectedColumns.date_created && <th>Date created</th>}
                  {selectedColumns.date_modified && <th>Date modified</th>}
                  {selectedColumns.enabled && <th>Enabled</th>}
                  {selectedColumns.label && <th>Label</th>}
                  {selectedColumns.uuid && <th>UUID</th>}
                  {selectedColumns.config && <th>Config</th>}
                  {selectedColumns.on_connect && <th>on_connect</th>}
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <TableItem
                    edit={edit}
                    remove={remove}
                    post={post}
                    selectedColumns={selectedColumns}
                    key={post.uuid}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        // Render posts in a card-like view
        posts.map((post, index) => (
          <PostItem
            edit={edit}
            remove={remove}
            number={index + 1}
            post={post}
            key={post.id}
          />
        ))
      )}
    </div>
  );
};

export default PostList;
