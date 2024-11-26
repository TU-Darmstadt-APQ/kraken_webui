import React, { useState } from "react";
import MyButton from "./button/MyButton";
import MyInput from "./input/MyInput";

import { ConfigEditorModalProps } from '@/app/types';

const ConfigEditorModal: React.FC<ConfigEditorModalProps> = ({config, setConfig,}) => {
  
    const [key, setKey] = useState<string>(""); // Schlüssel (Key)
    const [value, setValue] = useState<string>(""); // Wert (Value)

    const addConfigEntry = (e) => {
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
        <span>Konfiguration bearbeiten</span>
        {/* Eingabefelder für Key und Value */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <MyInput
            value={key}
            onChange={(e) => setKey(e.target.value)}
            type="text"
            placeholder="Schlüssel"
          />
          <MyInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="Wert"
          />
          <MyButton onClick={addConfigEntry}>Hinzufügen</MyButton>
        </div>

        {/* Liste der aktuellen Konfiguration */}
        <ul
          style={{
            listStyleType: "none",
            padding: 0,
            maxHeight: "75px", // Maximale Höhe ohne Scroll
            overflowY: "auto", // Scrollbar für die Liste
            border: "1px solid teal",
          }}
        >
          {Object.keys(config).length === 0 ? (
            <li style={{ textAlign: "center", color: "#888"}}>
                Noch keine Konfiguration hinzugefügt.
            </li>
            ) : 
          
            (Object.entries(config).map(([entryKey, entryValue]) => (
            <li
              key={entryKey}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "5px 10px"
              }}
            >
              <span>
                <b>{entryKey}</b>: {String(entryValue)}
              </span>
              <MyButton onClick={() => removeConfigEntry(entryKey)} styles={{ margin: "5px 0"}}>
                Entfernen
              </MyButton>
            </li>
          )))}
        </ul>
      </div>
  );
};

export default ConfigEditorModal;
