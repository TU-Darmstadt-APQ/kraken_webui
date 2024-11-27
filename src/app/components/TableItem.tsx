import React from "react";
import MyButton from "./UI/button/MyButton";

import { TableItemProps } from '@/app/types';

/**
 * A component representing a single table row with data and action buttons.
 * 
 * @component
 * @param {Post} post - The data object for the table row.
 * @param {(post: Post) => void} props.remove - Callback to handle the removal of a row.
 */
const TableItem: React.FC<TableItemProps> = ({post, remove}) => {
    return(
        <tr>
            {/* Displaying properties of the `post` object */}
            <td>{post.id}</td>
            <td>{post.title}</td>
            <td>{post.description}</td>
            <td>{post.date_created
                ? `${post.date_created.day}.${post.date_created.month}.${post.date_created.year}`
                : "Date not given"}
            </td>
            <td>{post.date_modified
                ? `${post.date_modified.day}.${post.date_modified.month}.${post.date_modified.year}`
                : "Date not given"}
            </td>
            <td>
                {post.enabled == true ? (
                <div style={{ width: "10px", height: "10px", backgroundColor: "green", borderRadius: "50%" }}></div>
            ): post.enabled == false ? (
                <div style={{ width: "10px", height: "10px", backgroundColor: "red", borderRadius: "50%" }}></div>
            ) : null
                }
            </td>
            <td>{post.label}</td>
            <td>{post.uid}</td>
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
            <td>{post.on_connect}</td>
            
            {/* Edit button */}
            <td style={{ borderBottomStyle: 'hidden', borderTopStyle: 'hidden', borderRightStyle: 'hidden' }}><MyButton className="list-button">Edit</MyButton></td>
            
            {/* Delete button with callback */}
            <td style={{ borderBottomStyle: 'hidden', borderTopStyle: 'hidden', borderRightStyle: 'hidden' }}><MyButton onClick={() => remove(post)} className="list-button">Delete</MyButton></td>
        </tr>
    );
};

export default TableItem;

