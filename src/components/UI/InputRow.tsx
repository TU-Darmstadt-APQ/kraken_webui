import { InputRowProps, Post } from "@/types";
import React, { useState } from "react";

import ModalWindow from "../UI/ModalWindow/ModalWindow";
import MyButton from "../UI/button/MyButton";

import MyInput from "../UI/input/MyInput";

import MyToggle from "../UI/toggle/MyToggle";
import PostForm from "../PostForm";
import styles from "@/styles/TableItem.module.css";
import { v4 as uuidv4 } from "uuid";
import { upsertSensorAction } from "@/actions/action_upsertSensor";

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

  const defaultPost: Post = {
    id: "",
    description: "",
    date_created: new Date().toISOString(),
    date_modified: new Date().toISOString(),
    enabled: true,
    label: "",
    uid: 0,
    config: {},
    on_connect: [],
  };

  // State for managing the input values of the form
  const [post, setPost] = useState<Post>(postToEdit || defaultPost);

  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sensorDTO = {
      id: post.id || uuidv4(), // Ensure `uuid` is a string (or convert it if necessary)
      date_created: post.date_created, // Convert to string
      date_modified: post.date_modified, // Convert to string
      enabled: post.enabled || false, // Ensure `enabled` is a boolean
      label: post.label || null, // Ensure `label` is `string | null`
      description: post.description || null, // Ensure `description` is `string | null`
      uid: post.uid || 0, // Ensure `uid` is a string (or convert it if necessary)
      config: post.config || {}, // Ensure `config` is an object
      on_connect: post.on_connect || [], // Ensure `on_connect` is an array
    };

    const result = await upsertSensorAction(sensorDTO);

    if (result.success) {
      if (postToEdit) {
        edit({ ...post, date_modified: new Date().toISOString() });
      } else {
        createPost({ ...post, id: uuidv4() });
      }
    }
      setPost({
        id: "",
        description: "",
        date_created: new Date().toISOString(),
        date_modified: new Date().toISOString(),
        enabled: false,
        label: "",
        uid: 0,
        config: {},
        on_connect: [],
      }); // After inserting Element, we empty InputFields
      alert(result.message);
    }

    return (
      <div className={`${styles.row}`}>
        {/* Displaying properties of the `post` object */}
        {selectedColumns.uuid && (
          <div className={styles.cell}>
            <MyInput
              value={post.id}
              onChange={(e) => setPost({ ...post, id: e.target.value })}
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
        {/* {selectedColumns.topic && (
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
      )} */}
        {selectedColumns.uid && (
          <div className={styles.cell}>
            <MyInput
              value={post.uid}
              onChange={(e) =>
                setPost({ ...post, uid: Number(e.target.value) || 0 })
              }
              type="number"
              placeholder="UID"
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
            <MyButton onClick={() => setModalVisible(true)}>
              Edit Config
            </MyButton>
          </div>
        )}

        {/* {selectedColumns.on_connect && (
        <div className={styles.cell}>
          <MyInput
            value={post.on_connect}
            onChange={(e) => setPost({ ...post, on_connect: e.target.value })}
            type="text"
            placeholder="On Connect"
          />
        </div>
      )} */}

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
                id: "",
                description: "",
                date_created: new Date().toISOString(),
                date_modified: new Date().toISOString(),
                enabled: false,
                label: "",
                uid: 0,
                config: {},
                on_connect: [],
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
