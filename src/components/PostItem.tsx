import MyButton from "./UI/button/MyButton";
import { PostItemProps } from "@/types";
import React from "react";
import { editSensorConfigAction } from "@/actions/action_editSensor";
import styles from "@/styles/PostItem.module.css";

/**
 * Contains minimal information about the sensor: Description, title.
 * Action buttons: Delete and Edit Buttons
 *
 * @component
 * @param {number} props.number - The position number of the post.
 * @param {object} props.post - The post data object containing title and description.
 * @param {(post: object) => void} props.remove - Callback to handle post removal.
 *
 * @example
 * // Example usage of PostItem component
 *
 * import PostItem from "./PostItem";
 *
 * const removePost = (post) => {
 *   setPosts(posts.filter((p) => p.uuid !== post.uuid));
 * };
 *
 * const editPost = (post) => {
 *   setPostToEdit(post);
 *   setModal(true);
 * };
 *
 * <PostItem
 *   edit={editPost}
 *   remove={removePost}
 *   number={index}
 *   post={{ title: "Post Title", description: "Post Description" }}
 *   key={posts[index].uuid}
 * />
 *
 * <PostItem edit={edit} remove={remove} number={index + 1} post={posts[index]} key={posts[index].id} />
 */
const PostItem: React.FC<PostItemProps> = (props) => {
  const editSensorHandler = async () => {
    const updatedConfig = {
      /* Add logic to get updated values */
    };
    const result = await editSensorConfigAction(props.post.uuid, updatedConfig);
    if (result.success) {
      alert(result.message);
      props.edit(props.post);
    } else {
      alert(`Error: ${result.message}`);
    }
  };

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
        <MyButton onClick={editSensorHandler}>
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
