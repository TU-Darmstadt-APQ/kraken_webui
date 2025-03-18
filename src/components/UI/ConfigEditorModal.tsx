import React, { useState } from "react";
import { ConfigEditorModalProps } from "@/types";
import MyButton from "./button/MyButton";
import MyInput from "./input/MyInput";

/**
 * This is a component for managing sensor configurations.
 *
 * This component provides:
 * - Dynamic key-value pair management: Users can add, edit, or remove configuration entries.
 * - Controlled input fields: Uses React state to manage changes.
 * - Sensor-specific behavior:
 *   - If `selectedSensorType` is provided, values are directly editable.
 *   - Otherwise, users can add new key-value pairs.
 *
 * @component
 * @param {Record<string, string>} config - The current configuration object.
 * @param {(config: Record<string, string>) => void} setConfig - Function to update the configuration.
 * @param {string | null} [selectedSensorType] - If provided, restricts the ability to add new keys and only allows value editing.
 *
 * @example
 * const [config, setConfig] = useState({});
 *
 * <ConfigEditorModal config={config} setConfig={setConfig} selectedSensorType={null} />
 *
 * @returns {JSX.Element} A modal for editing key-value configurations.
 */
const ConfigEditorModal: React.FC<ConfigEditorModalProps> = ({
  config,
  setConfig,
  selectedSensorType,
}) => {
  /**
   * State to manage new configuration entries:
   * - key: Stores the input for a new configuration key.
   * - value: Stores the input for a new configuration value.
   */
  const [key, setKey] = useState<string>("");
  const [value, setValue] = useState<string>("");

  /**
   * Adds a new key-value entry to the configuration.
   * - Prevents adding empty or whitespace-only keys/values.
   * - Resets the input fields after adding.
   *
   * @param {React.MouseEvent<HTMLButtonElement>} e - The button click event.
   */
  const addConfigEntry = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (key.trim() && value.trim()) {
      setConfig({ ...config, [key]: value });
      setKey("");
      setValue("");
    }
  };

  /**
   * Updates the value of an existing configuration entry.
   *
   * @param {string} key - The key of the configuration entry.
   * @param {string} value - The new value to be assigned.
   */
  const handleValueChange = (key: string, value: string) => {
    setConfig({ ...config, [key]: value });
  };

  /**
   * Removes a configuration entry by key.
   *
   * @param {string} entryKey - The key of the entry to be removed.
   */
  const removeConfigEntry = (entryKey: string) => {
    const updatedConfig = { ...config };
    delete updatedConfig[entryKey];
    setConfig(updatedConfig);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <span>Edit Configuration</span>

      {/* Input fields for new key-value pairs (if no specific sensor type is selected) */}
      {!selectedSensorType && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <MyInput
            value={key}
            onChange={(e) => setKey(e.target.value)}
            type="text"
            placeholder="Key"
            style={{ flex: 1 }}
          />
          <MyInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="Value"
            style={{ flex: 1 }}
          />
          <MyButton
            onClick={addConfigEntry}
            style={{
              width: "60px",
              height: "30px",
              backgroundColor: "teal",
              color: "white",
            }}
          >
            Add
          </MyButton>
        </div>
      )}

      {/* List of existing configuration entries */}
      <ul
        style={{
          listStyleType: "none",
          padding: 0,
          maxHeight: "288px", // Maximum height without scrolling
          overflowY: "auto", // Enable scrolling for long lists
          border: "1px solid teal",
          borderRadius: "8px",
        }}
      >
        {/* Display message if there are no configuration entries */}
        {Object.keys(config).length === 0 ? (
          <li style={{ textAlign: "center", color: "#888" }}>
            No configuration added yet.
          </li>
        ) : (
          // Iterate through the existing configuration and render each entry
          Object.entries(config).map(([entryKey, entryValue]) => (
            <li
              key={entryKey}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "5px 10px",
              }}
            >
              <span>
                <b>{entryKey}</b>: {!selectedSensorType && String(entryValue)}
              </span>

              {/* If a sensor type is selected, allow direct value editing */}
              {selectedSensorType && (
                <MyInput
                  value={String(entryValue)}
                  onChange={(e) => handleValueChange(entryKey, e.target.value)}
                  type="text"
                />
              )}

              {/* Delete button (only shown if no specific sensor type is selected) */}
              {!selectedSensorType && (
                <MyButton
                  onClick={() => removeConfigEntry(entryKey)}
                  styles={{ margin: "5px 0" }}
                >
                  Delete
                </MyButton>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ConfigEditorModal;
