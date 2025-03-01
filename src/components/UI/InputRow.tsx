import { InputRowProps, Post } from "@/types";
import React, { useState } from "react";

import ModalWindow from "../UI/ModalWindow/ModalWindow";
import MyButton from "../UI/button/MyButton";

import MyInput from "../UI/input/MyInput";

import MyToggle from "../UI/toggle/MyToggle";
import PostForm from "../PostForm";
import styles from "@/styles/TableItem.module.css";
import { v4 as uuidv4 } from "uuid";

/**
 * InputRow component renders a row in the UI that allows a user to either create a new post or edit an existing one.
 *
 * This component displays various input fields such as UUID, label, topic, driver, and others based on the
 * provided selectedColumns prop.
 * A modal window is used to modify the configuration through a PostForm.
 *
 * @component
 * @param {InputRowProps} props - The props for the InputRow component.
 * @param {boolean} props.visible - Determines whether the input row is shown.
 * @param {function(boolean): void} props.setVisible - Callback to change the visibility of the input row.
 * @param {function(Post): void} props.createPost - Callback to create a new post.
 * @param {function(Post): void} props.edit - Callback to edit an existing post.
 * @param {Post} [props.postToEdit] - Optional post to pre-fill the input fields for editing.
 * @param {Object} props.selectedColumns - An object indicating which columns/fields should be displayed.
 *
 * @example
 * const selectedColumns = {
 *   uuid: true,
 *   label: true,
 *   enabled: true,
 *   topic: true,
 *   driver: true,
 *   config: true,
 *   on_connect: true,
 * };
 *
 * />
 */
const InputRow: React.FC<InputRowProps> = ({
  visible,
  setVisible,
  createPost,
  edit,
  postToEdit,
  selectedColumns,
}) => {
  // if false - we will not render this object
  if (!visible) return null;

  // Helper function to generate the current date
  const getCurrentDate = () => {
    const currentDate = new Date();
    return {
      day: currentDate.getDate(),
      month: currentDate.getMonth() + 1, // Months are 0-indexed
      year: currentDate.getFullYear(),
      nanoseconds: currentDate.getMilliseconds() * 1e6, // Milliseconds to nanoseconds
    };
  };

  const defaultPost: Post = {
    uid: 0,
    title: "",
    description: "",
    date_created: getCurrentDate(),
    date_modified: getCurrentDate(),
    enabled: false,
    label: "",
    uuid: "",
    config: {},
    on_connect: undefined,
    topic: "",
    unit: "",
    driver: "",
    port: 0,
    sad: 0,
    pad: 0,
    host: "",
  };

  // State for managing the input values of the form
  const [post, setPost] = useState<Post>(postToEdit || defaultPost);

  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    if (postToEdit) {
      edit({ ...post, date_modified: getCurrentDate() });
    } else {
      createPost({ ...post, uuid: uuidv4() }); // Generate a unique ID based on the current timestamp
    }

    setPost({
      uid: 0,
      title: "",
      description: "",
      date_created: getCurrentDate(),
      date_modified: getCurrentDate(),
      enabled: false,
      label: "",
      uuid: "",
      config: {},
      on_connect: undefined,
      topic: "",
      unit: "",
      driver: "",
      port: 0,
      sad: 0,
      pad: 0,
      host: "",
    }); // After inserting Element, we empty InputFields
  };

  return (
    <div className={`${styles.row}`}>
      {/* Displaying properties of the `post` object */}
      {selectedColumns.uuid && (
        <div className={styles.cell}>
          <MyInput
            value={post.uuid}
            onChange={(e) => setPost({ ...post, uuid: e.target.value })}
            type="text"
            placeholder="UUID"
          />
        </div>
      )}
      {selectedColumns.label && (
        <div className={styles.cell}>
          <MyInput
            value={post.label || ""}
            onChange={(e) => setPost({ ...post, label: e.target.value })}
            type="text"
            placeholder="Label"
          />
        </div>
      )}

      {selectedColumns.enabled && (
        <div className={styles.cell}>
          <MyToggle
            label="Enabled"
            checked={post.enabled}
            onChange={(value) => setPost({ ...post, enabled: value })}
          />
        </div>
      )}
      {selectedColumns.topic && (
        <div className={styles.cell}>
          <MyInput
            value={post.topic}
            onChange={(e) => setPost({ ...post, topic: e.target.value })}
            type="text"
            placeholder="Topic"
          />
        </div>
      )}
      {selectedColumns.driver && (
        <div className={styles.cell}>
          <MyInput
            value={post.driver}
            onChange={(e) => setPost({ ...post, driver: e.target.value })}
            type="text"
            placeholder="Driver"
          />
        </div>
      )}

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

          {/* Button to edit config */}
          <MyButton onClick={() => setModalVisible(true)}>Edit Config</MyButton>
        </div>
      )}

      {selectedColumns.on_connect && (
        <div className={styles.cell}>
          <MyInput
            value={post.on_connect}
            onChange={(e) => setPost({ ...post, on_connect: e.target.value })}
            type="text"
            placeholder="On Connect"
          />
        </div>
      )}
      {selectedColumns.uid && (
        <div className={styles.cell}>
          <MyInput
            value={post.uid}
            onChange={(e) => setPost({ ...post, uid: Number(e.target.value) })}
            type="number"
            placeholder="UID"
          />
        </div>
      )}

      {/* Edit button and delete button with callback */}
      <div className={styles.cell}>
        <MyButton className="list-button" onClick={handleSubmit}>
          <img
            src="/floppy-disk-pen.png"
            alt="Submit"
            //className="icon-button"
            width={20}
            height={20}
          />
        </MyButton>

        <MyButton
          onClick={() => {
            setVisible(false);
            setPost({
              uid: 0,
              title: "",
              description: "",
              date_created: getCurrentDate(),
              date_modified: getCurrentDate(),
              enabled: false,
              label: "",
              uuid: "",
              config: {},
              on_connect: undefined,
              topic: "",
              unit: "",
              driver: "",
              port: 0,
              sad: 0,
              pad: 0,
              host: "",
            }); // After canceling the addition or editing - empty all the fields
          }}
          className="list-button"
        >
          <img
            src="/cross.png"
            alt="Cancel"
            //className="icon-button"
            width={20}
            height={20}
          />
        </MyButton>
      </div>

      {/* Modal Window */}
      {modalVisible && (
        <ModalWindow visible={modalVisible} setVisible={setModalVisible}>
          <PostForm
            postToEdit={post}
            edit={(updatedPost) => {
              setPost((prev) => ({ ...prev, config: updatedPost.config }));
              setModalVisible(false);
            }}
            create={(newPost) => {
              setPost((prev) => ({ ...prev, config: newPost.config }));
              setModalVisible(false);
            }}
          />
        </ModalWindow>
      )}
    </div>
  );
};

export default InputRow;
