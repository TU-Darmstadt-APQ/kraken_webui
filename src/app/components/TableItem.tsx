import React from "react";
import MyButton from "./UI/button/MyButton";
import styles from "./../styles/TableItem.module.css";

import { TableItemProps } from "@/app/types";

/**
 * A component representing a single table row with data and action buttons.
 *
 * @component
 * @param {Post} post - The data object for the table row.
 * @param {(post: Post) => void} props.remove - Callback to handle the removal of a row.
 * @param {(post: Post) => void} edit - Callback function to edit the post.
 * @param {Object} selectedColumns - An object where keys represent column names, and values are booleans indicating if the column is visible.
 *
 * @example
 * const post = {
 *   title: "Lorem Post",
 *   description: "This is a post.",
 *   date_created: { day: 8, month: 1, year: 2025 },
 *   date_modified: { day: 8, month: 1, year: 2025 },
 *   enabled: true,
 *   uuid: "1234-5678",
 *   config: { theme: "dark", notifications: true },
 *   on_connect: "Connect info",
 * };
 *
 * const selectedColumns = {
 *   id: true,
 *   title: true,
 *   description: true,
 *   date_created: false,
 *   date_modified: true,
 *   enabled: true,
 *   uuid: false,
 *   config: true,
 *   on_connect: false,
 * };
 *
 * <TableItem
 *   edit={edit}
 *   remove={remove}
 *   post={post}
 *   selectedColumns={selectedColumns}
 *   key={post.uuid}
 * />
 */
const TableItem: React.FC<TableItemProps> = ({
  post,
  remove,
  edit,
  selectedColumns,
}) => {
  const isRowVisible = Object.values(selectedColumns).some((value) => value);

  if (!isRowVisible) return null; // we check if minimum one is true

  return (
    <div className={`${styles.row}`}>
      {/* Displaying properties of the `post` object */}
      {selectedColumns.id && <div className={styles.cell}>{post.id}</div>}
      {selectedColumns.title && <div className={styles.cell}>{post.title}</div>}
      {selectedColumns.description && (
        <div className={styles.cell}>{post.description}</div>
      )}

      {selectedColumns.date_created && (
        <div className={styles.cell}>
          {post.date_created
            ? `${post.date_created.day}.${post.date_created.month}.${post.date_created.year}`
            : "Date not given"}
        </div>
      )}

      {selectedColumns.date_modified && (
        <div className={styles.cell}>
          {post.date_modified
            ? `${post.date_modified.day}.${post.date_modified.month}.${post.date_modified.year}`
            : "Date not given"}
        </div>
      )}

      {selectedColumns.enabled && (
        <div className={styles.cell}>
          {post.enabled == true ? (
            <div
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: "green",
                borderRadius: "50%",
              }}
            ></div>
          ) : post.enabled == false ? (
            <div
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: "red",
                borderRadius: "50%",
              }}
            ></div>
          ) : null}
        </div>
      )}

      {selectedColumns.label && <div className={styles.cell}>{post.label}</div>}
      {selectedColumns.uuid && <div className={styles.cell}>{post.uuid}</div>}
      {selectedColumns.config && (
        <div className={styles.cell}>
          {post.config && Object.entries(post.config).length > 0 ? (
            <div>
              <p>config {"{"}</p>
              <ul style={{ paddingLeft: "20px", margin: "5px 0" }}>
                {Object.entries(post.config).map(([key, value]) => (
                  <li key={key} style={{ listStyleType: "none" }}>
                    - {key}: {JSON.stringify(value)}
                  </li>
                ))}
              </ul>
              <p>{"}"}</p>
            </div>
          ) : (
            "No configuration given"
          )}
        </div>
      )}

      {selectedColumns.on_connect && (
        <div className={styles.cell}>{post.on_connect}</div>
      )}

      {/* Edit button and delete button with callback */}
      <div className={`${styles.cell} ${styles.actions}`}>
        <MyButton className="list-button" onClick={() => edit(post)}>
          <img
            src="/edit.png"
            alt="Edit"
            //className="icon-button"
            width={20}
            height={20}
          />
        </MyButton>

        <MyButton onClick={() => remove(post)} className="list-button">
          <img
            src="/trashCan.svg"
            alt="Delete"
            //className="icon-button"
            width={20}
            height={20}
          />
        </MyButton>
      </div>
    </div>
  );
};

export default TableItem;
