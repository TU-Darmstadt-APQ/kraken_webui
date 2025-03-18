import React, { useState } from "react";
import { InputRowProps } from "@/types";

import ModalWindow from "../UI/ModalWindow/ModalWindow";
import MyButton from "../UI/button/MyButton";

import MyInput from "../UI/input/MyInput";

import MyToggle from "../UI/toggle/MyToggle";
import PostForm from "../PostForm";
import styles from "@/styles/TableItem.module.css";
import { tinkerforgeDTO } from "@/models/zTinkerforgeSensor.schema";
import { v4 as uuidv4 } from "uuid";

/**
 * InputRow renders an editable row for creating or modifying sensor data.
 *
 * This component provides:
 * - Dynamic form fields: Shows only the fields specified in `selectedColumns`.
 * - Modal for configuration editing: Opens a modal to modify the `config` field.
 * - Controlled input fields.
 * - Submit & Cancel buttons: Allows saving or discarding changes.
 *
 * @component
 * @param {boolean} visible - Determines whether the input row is visible.
 * @param {(visible: boolean) => void} setVisible - Function to toggle visibility.
 * @param {(post: tinkerforgeDTO) => void} createPost - Callback to create a new post.
 * @param {(post: tinkerforgeDTO) => void} .edit - Callback to edit an existing post.
 * @param {tinkerforgeDTO | null} [postToEdit] - If provided, pre-fills the form for editing.
 * @param {Record<string, boolean>} selectedColumns - Object indicating which fields should be displayed.
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
 * <InputRow
 *   visible={true}
 *   setVisible={setVisible}
 *   createPost={createPost}
 *   edit={editPost}
 *   postToEdit={postToEdit}
 *   selectedColumns={selectedColumns}
 * />
 *
 * @returns {JSX.Element | null} A row with input fields for adding or editing a post.
 *
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

  /**
   * Generates the current date-time in ISO format.
   * Used for populating `date_created` and `date_modified` fields.
   */
  const getCurrentDateISOString = (): string => {
    return new Date().toISOString();
  };

  /**
   * Default structure for a new post.
   * Used when no `postToEdit` is provided.
   */
  const defaultPost: tinkerforgeDTO = {
    id: "",
    uid: 0,
    description: "",
    date_created: getCurrentDateISOString(),
    date_modified: getCurrentDateISOString(),
    enabled: false,
    label: "",
    config: {},
    on_connect: [],
  };

  /**
   * State to manage the input values of the form.
   * - If editing, initializes with `postToEdit`.
   * - Otherwise, starts with a new `defaultPost`.
   */
  const [post, setPost] = useState<tinkerforgeDTO>(postToEdit || defaultPost);

  /**
   * State to control the visibility of the modal for editing configuration (`config` field).
   */
  const [modalVisible, setModalVisible] = useState(false);

  /**
   * Handles form submission.
   * - Calls `edit` if modifying an existing post.
   * - Calls `createPost` if adding a new post.
   * - Resets the form after submission.
   *
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = (e: React.FormEvent) => {
    if (postToEdit) {
      edit({ ...post, date_modified: getCurrentDateISOString() });
    } else {
      createPost({ ...post, id: uuidv4() }); // Generate a unique ID
    }

    // Reset input fields after submission
    setPost({
      id: "",
      uid: 0,
      description: "",
      date_created: getCurrentDateISOString(),
      date_modified: getCurrentDateISOString(),
      enabled: false,
      label: "",
      config: {},
      on_connect: [],
    });
  };

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
      {selectedColumns.date_created && (
        <div className={styles.cell}>{post.date_created}</div>
      )}
      {selectedColumns.date_modified && (
        <div className={styles.cell}>{post.date_modified}</div>
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

      {selectedColumns.description && (
        <div className={styles.cell}>
          <MyInput
            value={post.description || ""}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            type="text"
            placeholder="Description"
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
            value={
              Array.isArray(post.on_connect)
                ? JSON.stringify(post.on_connect)
                : JSON.stringify([
                    {
                      function: post.on_connect,
                      args: [],
                      kwargs: {},
                      timeout: null,
                    },
                  ])
            }
            onChange={(e) =>
              setPost({
                ...post,
                on_connect: JSON.parse(e.target.value), // Convert String to array
              })
            }
            type="text"
            placeholder="On Connect"
          />
        </div>
      )}

      {/* Edit button and delete button with callback */}
      <div className={styles.cell}>
        <MyButton className="list-button" onClick={handleSubmit}>
          <img src="/floppy-disk-pen.png" alt="Submit" width={20} height={20} />
        </MyButton>

        <MyButton
          onClick={() => {
            setVisible(false);
            setPost({
              id: "",
              uid: 0,
              description: "",
              date_created: getCurrentDateISOString(),
              date_modified: getCurrentDateISOString(),
              enabled: false,
              label: "",
              config: {},
              on_connect: [],
            }); // After canceling the addition or editing - empty all the fields
          }}
          className="list-button"
        >
          <img src="/cross.png" alt="Cancel" width={20} height={20} />
        </MyButton>
      </div>

      {/* Modal Window for Configuration Editing */}
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
