import MyButton from "./UI/button/MyButton";
import React from "react";
import { TableItemProps } from "@/types";
import { deleteSensorAction } from "@/actions/action_deleteSensors";
import styles from "@/styles/TableItem.module.css";

/**
 * This component represents a single row in the table, displaying sensor data and providing action buttons.
 *
 * This component provides:
 * - Conditional Rendering: Only renders if at least one column is selected.
 * - Dynamic Column Visibility: Displays only the columns that are enabled in `selectedColumns`.
 * - Edit & Delete Actions:
 *   - Edit: Triggers the `edit` function to modify a post.
 *   - Delete: Calls an async function to remove a sensor and updates UI upon success.
 *
 * @component
 * @param {tinkerforgeDTO} post - The sensor data for this row.
 * @param {(post: tinkerforgeDTO) => void} remove - Callback function to remove a sensor from the list.
 * @param {(post: tinkerforgeDTO) => void} edit - Callback function to open edit mode for a post.
 * @param {Record<string, boolean>} selectedColumns - Object where keys represent column names and values indicate whether they are visible.
 *
 * @example
 * const post = {
 *   id: "1234-5678",
 *   description: "This is a post.",
 *   date_created: "2025-01-08",
 *   date_modified: "2025-01-08",
 *   enabled: true,
 *   label: "UG",
 *   uid: "1234-4578",
 *   config: { theme: "dark", notifications: true },
 *   on_connect: ["action1", "action2"],
 * };
 *
 * const selectedColumns = {
 *   description: true,
 *   date_created: false,
 *   date_modified: true,
 *   enabled: true,
 *   config: true,
 *   on_connect: false,
 * };
 *
 * <TableItem
 *   edit={edit}
 *   remove={remove}
 *   post={post}
 *   selectedColumns={selectedColumns}
 *   key={post.id}
 * />
 *
 * @returns {JSX.Element | null} A table row with data or `null` if no columns are selected.
 */
const TableItem: React.FC<TableItemProps> = ({
  post,
  remove,
  edit,
  selectedColumns,
}) => {
  // Check if at least one column is selected before rendering
  const isRowVisible = Object.values(selectedColumns).some((value) => value);
  if (!isRowVisible) return null;

  /**
   * Handles the deletion of a sensor post.
   * Calls the async `deleteSensorAction` and updates UI based on the result.
   */
  const deleteSensorHandler = async () => {
    const result = await deleteSensorAction(post);
    if (result.success) {
      alert(result.message);
      remove(post); // Remove the post from UI upon successful deletion
    } else {
      alert(`Error: ${result.message}`);
    }
  };

  return (
    <div className={`${styles.row}`}>
      {/* Conditionally rendering table cells based on `selectedColumns` */}
      {selectedColumns.uuid && <div className={styles.cell}>{post.id}</div>}
      {selectedColumns.date_created && (
        <div className={styles.cell}>{post.date_created}</div>
      )}
      {selectedColumns.date_modified && (
        <div className={styles.cell}>{post.date_modified}</div>
      )}
      {selectedColumns.enabled && (
        <div className={styles.cell}>
          {/* Display colored indicators for enabled/disabled state */}
          {post.enabled === true ? (
            <div
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: "green",
                borderRadius: "50%",
              }}
            ></div>
          ) : post.enabled === false ? (
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
      {selectedColumns.label && <div className={styles.cell}>{post.label}</div>}
      {selectedColumns.description && (
        <div className={styles.cell}>{post.description}</div>
      )}
      {selectedColumns.uid && <div className={styles.cell}>{post.uid}</div>}
      {selectedColumns.config && (
        <div className={styles.cell}>
          {/* Display configuration object if available, otherwise show a default message */}
          {post.config && Object.keys(post.config).length > 0 ? (
            <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
              {JSON.stringify(post.config, null, 2)}
            </pre>
          ) : (
            "No configuration given"
          )}
        </div>
      )}

      {selectedColumns.on_connect && (
        <div className={styles.cell}>
          <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
            {JSON.stringify(post.on_connect, null, 2)}
          </pre>
        </div>
      )}

      {/* Action buttons for editing and deleting the post */}
      <div className={styles.cell}>
        <MyButton className="list-button" onClick={() => edit(post)}>
          <img src="/edit.png" alt="Edit" width={20} height={20} />
        </MyButton>

        <MyButton onClick={deleteSensorHandler} className="list-button">
          <img src="/trashCan.svg" alt="Delete" width={20} height={20} />
        </MyButton>
      </div>
    </div>
  );
};

export default TableItem;
