import React from "react";
import MyButton from "./UI/button/MyButton";

import { TableItemProps } from "@/types";

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
    <tr>
      {/* Displaying properties of the `post` object */}
      {selectedColumns.id && <td>{post.id}</td>}
      {selectedColumns.title && <td>{post.title}</td>}
      {selectedColumns.description && <td>{post.description}</td>}

      {selectedColumns.date_created && (
        <td>
          {post.date_created
            ? `${post.date_created.day}.${post.date_created.month}.${post.date_created.year}`
            : "Date not given"}
        </td>
      )}

      {selectedColumns.date_modified && (
        <td>
          {post.date_modified
            ? `${post.date_modified.day}.${post.date_modified.month}.${post.date_modified.year}`
            : "Date not given"}
        </td>
      )}

      {selectedColumns.enabled && (
        <td>
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
        </td>
      )}

      {selectedColumns.label && <td>{post.label}</td>}
      {selectedColumns.uuid && <td>{post.uuid}</td>}
      {selectedColumns.config && (
        <td>
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
        </td>
      )}

      {selectedColumns.on_connect && <td>{post.on_connect}</td>}

      {/* Edit button and delete button with callback */}
      <td
        style={{
          borderBottomStyle: "hidden",
          borderTopStyle: "hidden",
          borderRightStyle: "hidden",
        }}
      >
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
            src="/trashCan.png"
            alt="Delete"
            //className="icon-button"
            width={20}
            height={20}
          />
        </MyButton>
      </td>
    </tr>
  );
};

export default TableItem;
