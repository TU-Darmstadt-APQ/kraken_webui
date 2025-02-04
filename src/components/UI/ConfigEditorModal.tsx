import React, { useState } from "react";
import { ConfigEditorModalProps } from "@/types";
import MyButton from "./button/MyButton";
import MyInput from "./input/MyInput";

const ConfigEditorModal: React.FC<ConfigEditorModalProps> = ({
  config,
  setConfig,
}) => {
  const [key, setKey] = useState<string>(""); // state for Key
  const [value, setValue] = useState<string>(""); // state for Value

  const addConfigEntry = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (key.trim() && value.trim()) {
      setConfig({ ...config, [key]: value });
      setKey("");
      setValue("");
    }
  };

  const removeConfigEntry = (entryKey: string) => {
    const updatedConfig = { ...config };
    delete updatedConfig[entryKey];
    setConfig(updatedConfig);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <span>Edit configuration</span>
      {/* Inputfields for Key and Value */}
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
          style={{
            flex: 1,
          }}
        />
        <MyInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="Value"
          style={{
            flex: 1,
          }}
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

      {/* List of the current configuration */}
      <ul
        style={{
          listStyleType: "none",
          padding: 0,
          maxHeight: "75px", // Maximum height without scrolling
          overflowY: "auto", // Scrollbar for the list
          border: "1px solid teal",
        }}
      >
        {Object.keys(config).length === 0 ? (
          <li style={{ textAlign: "center", color: "#888" }}>
            No configuration added yet.
          </li>
        ) : (
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
                <b>{entryKey}</b>: {String(entryValue)}
              </span>
              <MyButton
                onClick={() => removeConfigEntry(entryKey)}
                styles={{ margin: "5px 0" }}
              >
                Delete
              </MyButton>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ConfigEditorModal;
