import React, { useCallback, useEffect, useRef, useState } from "react";
import InputRow from "./UI/InputRow";
import MyToggle from "./UI/toggle/MyToggle";
import { PostListProps } from "@/types";
import { VariableSizeList as Table } from "react-window";
import TableItem from "./TableItem";
import styles from "@/styles/PostList.module.css";

/**
 * Component for rendering a list of posts with the ability to toggle between table view and post view.
 *
 * This component provides:
 * - Virtualized Table Rendering: Uses `react-window` to efficiently render large datasets.
 * - Column Visibility Management: Users can toggle which columns are displayed.
 * - Dynamic Row Heights: Rows automatically adjust based on the complexity of their configuration fields.
 * - Inline Editing & Creation: New posts can be added and existing ones edited directly within the table.
 *
 *
 * @component
 * @param {tinkerforgeDTO[]} posts - The array of sensor posts to be displayed.
 * @param {string} listTitle - The title displayed above the post list.
 * @param {boolean} inputRow - Controls the visibility of the input row for adding/editing posts.
 * @param {(value: boolean) => void} setInputRow - Callback function to toggle the visibility of the input row.
 * @param {(post: tinkerforgeDTO) => void} createPost - Callback function for adding a new post.
 * @param {(post: tinkerforgeDTO) => void} editPost - Callback function for saving edits to an existing post.
 * @param {tinkerforgeDTO | null} postToEdit - The post currently being edited (if any).
 * @param {(post: tinkerforgeDTO) => void} remove - Callback function for deleting a post.
 * @param {(post: tinkerforgeDTO) => void} edit - Callback function for initiating the edit mode on a post.
 *
 *
 * @example
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
 *   createPost={createPost}
 *   inputRow={modal}
 *   setInputRow={setModal}
 *   editPost={editPost}
 *   postToEdit={postToEdit}
 * />
 *
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

  const [selectedColumns, setSelectedColumns] = useState({
    uuid: true,
    date_created: true,
    date_modified: true,
    enabled: true,
    label: true,
    description: true,
    uid: true,
    config: true,
    on_connect: true,
  });

  /**
   * Calculates the row height dynamically based on the presence of configuration fields.
   * Expands rows that contain large JSON objects for better readability.
   *
   * @param {number} index - The index of the row in the dataset.
   * @returns {number} The computed height of the row.
   */
  const getRowHeight = useCallback(
    (index: number) => {
      const post = posts[index];

      if (!post || !post.config) return 170; // Default row height if no config

      // Convert the config object to a JSON string
      const jsonString = JSON.stringify(post.config, null, 2);

      // Count the number of commas in the JSON string to estimate complexity
      const commaCount = (jsonString.match(/,/g) || []).length;

      // Adjust row height based on the number of fields in the config column
      return selectedColumns.config ? (commaCount + 1) * 40 + 50 : 170;
    },
    [selectedColumns],
  ); // Recalculate height when `selectedColumns` changes

  /**
   * Ensures the virtualized table recalculates row heights when `selectedColumns` changes.
   * This prevents layout glitches when toggling column visibility.
   */
  useEffect(() => {
    if (listRef.current) {
      listRef.current.resetAfterIndex(0, true); // Reset row heights
    }
  }, [selectedColumns]);

  // Check if at least one column is selected
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
            {selectedColumns.uuid && <div className={styles.cell}>UUID</div>}
            {selectedColumns.date_created && (
              <div className={styles.cell}>Date created</div>
            )}
            {selectedColumns.date_modified && (
              <div className={styles.cell}>Date modified</div>
            )}
            {selectedColumns.enabled && (
              <div className={styles.cell}>Enabled</div>
            )}
            {selectedColumns.label && <div className={styles.cell}>Label</div>}
            {selectedColumns.description && (
              <div className={styles.cell}>Description</div>
            )}
            {selectedColumns.uid && <div className={styles.cell}>UID</div>}
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
