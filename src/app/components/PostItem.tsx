import React from "react";
import MyButton from "./UI/button/MyButton";
import styles from "./../styles/PostItem.module.css";

import { PostItemProps } from "@/app/types";

/**
 * Contains minimal information about the sensor: Description, title.
 * Action buttons: Delete and Edit Buttons
 *
 * @component
 * @param {number} props.number - The position number of the post.
 * @param {object} props.post - The post data object containing title and description.
 * @param {(post: object) => void} props.remove - Callback to handle post removal.
 */
const PostItem: React.FC<PostItemProps> = (props) => {
  return (
    <div className={styles["post"]}>
      {/* Post content: number, title, and description */}
      <div className="post__content">
        <strong>
          {props.number}. {props.post.title}
        </strong>
        <div>{props.post.description}</div>
      </div>

      {/* Action buttons: Edit and Delete */}
      <div className="post__btns">
        <MyButton onClick={() => props.edit(props.post)}>
          <img
            src="/edit.png"
            alt="Edit"
            //className="icon-button"
            width={20}
            height={20}
          />
        </MyButton>
        <MyButton onClick={() => props.remove(props.post)}>
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

export default PostItem;
