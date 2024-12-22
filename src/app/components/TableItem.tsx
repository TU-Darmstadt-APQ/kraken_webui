import React from "react";
import MyButton from "./UI/button/MyButton";

import { TableItemProps } from "@/app/types";

/**
 * A component representing a single table row with data and action buttons.
 *
 * @component
 * @param {Post} post - The data object for the table row.
 * @param {(post: Post) => void} props.remove - Callback to handle the removal of a row.
 */
const TableItem: React.FC<TableItemProps> = ({ post, remove }) => {
  return (
    <tr>
      {/* Displaying properties of the `post` object */}
      <td>{post.id}</td>
      <td>{post.title}</td>
      <td>{post.description}</td>
      <td>{post.date_created}</td>
      <td>{post.date_modified}</td>
      <td>{post.enabled}</td>
      <td>{post.label}</td>
      <td>{post.uid}</td>
      <td>{post.config}</td>
      <td>{post.on_connect}</td>

      {/* Edit button */}
      <td
        style={{
          borderBottomStyle: "hidden",
          borderTopStyle: "hidden",
          borderRightStyle: "hidden",
        }}
      >
        <MyButton className="list-button">Edit</MyButton>
      </td>

      {/* Delete button with callback */}
      <td
        style={{
          borderBottomStyle: "hidden",
          borderTopStyle: "hidden",
          borderRightStyle: "hidden",
        }}
      >
        <MyButton onClick={() => remove(post)} className="list-button">
          Delete
        </MyButton>
      </td>
    </tr>
  );
};

export default TableItem;
