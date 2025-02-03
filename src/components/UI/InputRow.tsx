import React, { useState } from "react";
//import MyButton from "../UI/button/MyButton";
//import styles from "./Table.module.css";
import { InputRowProps } from "@/types";
import MyButton from "../UI/button/MyButton";
import styles from "@/styles/TableItem.module.css";
import MyInput from "../UI/input/MyInput";
import { Post } from "@/types";
import { v4 as uuidv4 } from "uuid";

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

  const handleSubmit = (e: React.FormEvent) => {
    if (postToEdit) {
      edit({ ...post, date_modified: getCurrentDate() });
    } else {
      createPost({ ...post, uuid: uuidv4() }); // Generate a unique ID based on the current timestamp
    }

    setPost({
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
      {selectedColumns.title && (
        <div className={styles.cell}>
          <MyInput
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            type="text"
            placeholder="Title"
          />
        </div>
      )}
      {selectedColumns.description && (
        <div className={styles.cell}>
          {
            <MyInput
              value={post.description}
              onChange={(e) =>
                setPost({ ...post, description: e.target.value })
              }
              type="text"
              placeholder="Description"
            />
          }
        </div>
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

      {selectedColumns.label && (
        <div className={styles.cell}>
          <MyInput
            value={post.label}
            onChange={(e) => setPost({ ...post, label: e.target.value })}
            type="text"
            placeholder="Label"
          />
        </div>
      )}
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
        <div className={styles.cell}>
          <MyInput
            value={post.on_connect}
            onChange={(e) => setPost({ ...post, on_connect: e.target.value })}
            type="text"
            placeholder="On Connect"
          />
        </div>
      )}

      {/* Edit button and delete button with callback */}
      <div className={`${styles.cell} ${styles.actions}`}>
        <MyButton className="list-button" onClick={handleSubmit}>
          <img
            src="/edit.png"
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
            src="/trashCan.svg"
            alt="Cancel"
            //className="icon-button"
            width={20}
            height={20}
          />
        </MyButton>
      </div>
    </div>
  );
};

export default InputRow;
