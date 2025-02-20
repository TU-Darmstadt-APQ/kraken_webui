import React, { useRef, useState } from "react";
import InputRow from "./UI/InputRow";
import MyToggle from "./UI/toggle/MyToggle";
import { PostListProps } from "@/types";
import { VariableSizeList as Table } from "react-window";
import TableItem from "./TableItem";
import styles from "@/styles/PostList.module.css";

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
 *   posts,
 *   filter.sort,
 *   filter.query,
 *   filter.searchField,
 * );
 * const removePost = (post: Post) => {
 *   setPosts(posts.filter((p) => p.uuid != post.uuid));
 * };
 * const handleEdit = (post: Post) => {
 *   setPostToEdit(post);
 *   setModal(true);
 * };
 * <PostList
 *   posts={sortedAndSearchedPosts}
 *   listTitle="Sensor List"
 *   remove={removePost}
 *   edit={handleEdit}
 * />
 */
const PostList: React.FC<PostListProps> = ({
  createPost,
  inputRow,
  setInputRow,
  editPost,
  postToEdit,
  posts,
  listTitle,
  remove,
  edit,
}) => {
  // Reference for storing row heights in VariableSizeList
  const listRef = useRef<Table>(null);

  // Determining the height of a line
  const getRowHeight = (index: number) => {
    const post = posts[index];
    return post.description && post.description.length > 100 ? 170 : 170; // Adjust row height dynamically later
  };

  const [selectedColumns, setSelectedColumns] = useState({
    uid: true,
    uuid: true,
    label: false,
    enabled: true,
    topic: false,
    driver: false,
    config: true,
    on_connect: false,
  });

  const isAnyColumnSelected = Object.values(selectedColumns).some(
    (value) => value,
  );

  return (
    <div>
      {/* Title for the list */}
      <h1 style={{ textAlign: "center" }}>{listTitle}</h1>

      {/* Column Visibility Toggles */}
      <div className={styles["toggle-container"]}>
        {Object.keys(selectedColumns).map((columnKey) => (
          <MyToggle
            key={columnKey}
            label={columnKey}
            checked={selectedColumns[columnKey as keyof typeof selectedColumns]}
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
            {selectedColumns.uid && <div className={styles.cell}>UID</div>}
            {selectedColumns.uuid && <div className={styles.cell}>UUID</div>}
            {selectedColumns.label && <div className={styles.cell}>Label</div>}
            {selectedColumns.enabled && (
              <div className={styles.cell}>Enabled</div>
            )}
            {selectedColumns.topic && <div className={styles.cell}>Topic</div>}
            {selectedColumns.driver && (
              <div className={styles.cell}>Driver</div>
            )}
            {selectedColumns.config && (
              <div className={styles.cell}>Config</div>
            )}
            {selectedColumns.on_connect && (
              <div className={styles.cell}>On Connect</div>
            )}
            {isAnyColumnSelected && <div className={styles.cell}>Actions</div>}
          </div>

          {/* New Row for editing and adding a new data */}
          {inputRow && (
            <InputRow
              visible={inputRow}
              setVisible={setInputRow}
              createPost={createPost}
              edit={editPost}
              postToEdit={postToEdit}
              selectedColumns={selectedColumns}
            />
          )}
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
  );
};

export default PostList;
