import React, { useState, useRef } from "react";
import Image from "next/image";
import PostItem from "./PostItem";
import TableItem from "./TableItem";
import styles from "@/styles/PostList.module.css";

import { PostListProps } from "@/types";
import MyToggle from "./UI/toggle/MyToggle";
import MyTooltip from "./UI/tooltip/MyTooltip";

import { FixedSizeList as List, VariableSizeList as Table } from "react-window";

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

  // Reference for storing row heights in VariableSizeList
  const listRef = useRef<Table>(null);

  // Determining the height of a line
  const getRowHeight = (index: number) => {
    const post = posts[index];
    return post.description && post.description.length > 100 ? 170 : 170; // later do it better (i want to achieve variable high for every row)
  };

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
            <div className={styles["table"]}>
              {/* Header */}
              <div className={`${styles.heading}`}>
                {selectedColumns.id && <div className={styles.cell}>ID</div>}
                {selectedColumns.title && (
                  <div className={styles.cell}>Title</div>
                )}
                {selectedColumns.description && (
                  <div className={styles.cell}>Description</div>
                )}
                {selectedColumns.date_created && (
                  <div className={styles.cell}>Date Created</div>
                )}
                {selectedColumns.date_modified && (
                  <div className={styles.cell}>Date Modified</div>
                )}
                {selectedColumns.enabled && (
                  <div className={styles.cell}>Enabled</div>
                )}
                {selectedColumns.label && (
                  <div className={styles.cell}>Label</div>
                )}
                {selectedColumns.uuid && (
                  <div className={styles.cell}>UUID</div>
                )}
                {selectedColumns.config && (
                  <div className={styles.cell}>Config</div>
                )}
                {selectedColumns.on_connect && (
                  <div className={styles.cell}>On Connect</div>
                )}
                <div className={`${styles.cell} ${styles["no-borders"]}`}></div>
              </div>
              {/* Virtualized rows */}
              <Table
                height={600} // Height of the visible area of the list
                itemCount={posts.length} // Number of rows
                itemSize={getRowHeight} // Function for row height
                width="100%" // Table width
                ref={listRef} // Reference for the list
              >
                {({
                  index,
                  style,
                }: {
                  index: number;
                  style: React.CSSProperties;
                }) => (
                  <div style={style}>
                    <TableItem
                      post={posts[index]}
                      edit={edit}
                      remove={remove}
                      selectedColumns={selectedColumns}
                    />
                  </div>
                )}
              </Table>
            </div>
          </div>
        </div>
      ) : (
        // Render posts in a card-like view
        <List height={600} itemCount={posts.length} itemSize={90} width="100%">
          {({ index, style }) => (
            <div style={style}>
              <PostItem
                edit={edit}
                remove={remove}
                number={index + 1}
                post={posts[index]}
                key={posts[index].id}
              />
            </div>
          )}
        </List>
      )}
    </div>
  );
};

export default PostList;
