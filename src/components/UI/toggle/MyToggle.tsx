import { ToggleProps } from "@/types";
import React from "react";
import styles from "./MyToggle.module.css";

import { Switch } from "@nextui-org/react";

const MyToggle: React.FC<ToggleProps> = ({ label, checked, onChange }) => {
  return (
    <label className={styles["toggle-label"]}>
      <Switch
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        color="primary"
      />
      {label}
    </label>
  );
};

export default MyToggle;
