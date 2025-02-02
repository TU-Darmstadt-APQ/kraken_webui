import React, { useRef } from "react";
import MyToggle from "./UI/toggle/MyToggle";
import { PostListProps } from "@/types";
import { VariableSizeList as Table } from "react-window";
import TableItem from "./TableItem";
import styles from "@/styles/PostList.module.css";

/**
 * Component for rendering a list of posts in table view.
 */
const PostList: React.FC<PostListProps> = ({
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

  // State for managing column visibility
  const [selectedColumns, setSelectedColumns] = React.useState({
    title: true,
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

  // Display a message when no posts are available
  if (!posts.length) {
    return <h1 style={{ textAlign: "center" }}>No sensors found</h1>;
  }

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
            {selectedColumns.title && <div className={styles.cell}>Title</div>}
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
            {selectedColumns.label && <div className={styles.cell}>Label</div>}
            {selectedColumns.uuid && <div className={styles.cell}>UUID</div>}
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
            {({ index, style }) => (
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
