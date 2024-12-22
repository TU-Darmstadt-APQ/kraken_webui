import React, { useState } from "react";
import Image from "next/image";
import PostItem from "./PostItem";
import TableItem from "./TableItem";

import { PostListProps } from "@/app/types";

/**
 * Component for rendering a list of posts with the ability to toggle between table view and post view.
 *
 * @component
 * @param {Array} posts - Array of post objects to display.
 * @param {string} listTitle - Title of the list.
 * @param {(post: object) => void} remove - Callback function to handle removing a post.
 */
const PostList: React.FC<PostListProps> = ({ posts, listTitle, remove }) => {
  // Display a message when no posts are available
  if (!posts.length) {
    return <h1 style={{ textAlign: "center" }}>No sensors found.</h1>;
  }

  // State to toggle between table view and post view
  const [isTableView, setIsTableView] = useState(false);

  return (
    <div>
      {/* Title for the list */}
      <h1 style={{ textAlign: "center" }}>{listTitle}</h1>

      {/* Buttons to toggle view mode */}
      <div className="view-buttons">
        <button onClick={() => setIsTableView(true)} className="list-button">
          <Image
            src="/table-list.png"
            alt="Table View"
            className="icon-button"
            width={20}
            height={20}
          />
        </button>
        <button onClick={() => setIsTableView(false)} className="list-button">
          <Image
            src="/list.png"
            alt="Posts View"
            className="icon-button"
            width={20}
            height={20}
          />
        </button>
      </div>

      {/* Conditional rendering for table view or post view */}
      {isTableView ? (
        // Render posts in table format
        <table className="sensor-table" border={0}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Date created</th>
              <th>Date modified</th>
              <th>Enabled</th>
              <th>Label</th>
              <th>UID</th>
              <th>Config</th>
              <th>on_connect</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <TableItem remove={remove} post={post} key={post.id} />
            ))}
          </tbody>
        </table>
      ) : (
        // Render posts in a card-like view
        posts.map((post, index) => (
          <PostItem
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
