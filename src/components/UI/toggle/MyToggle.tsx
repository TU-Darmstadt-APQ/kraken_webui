import React from "react";
import { ToggleProps } from "@/types";
import styles from "./MyToggle.module.css";

/**
 * This is a reusable toggle switch (checkbox) component.
 *
 * This component provides:
 * - Controlled state management: The `checked` prop determines whether the toggle is active.
 * - Custom label support: Displays a label next to the toggle.
 * - Callback function: Calls `onChange` with the updated state when toggled.
 *
 * @component
 * @param {string} label - The label text displayed next to the toggle switch.
 * @param {boolean} checked - The current state of the toggle (`true` for ON, `false` for OFF).
 * @param {(checked: boolean) => void} onChange - Callback function triggered when the toggle state changes.
 *
 * @example
 * const [isEnabled, setIsEnabled] = useState(false);
 *
 * <MyToggle
 *   label="Enable feature"
 *   checked={isEnabled}
 *   onChange={setIsEnabled}
 * />
 *
 * @returns {JSX.Element} A styled toggle switch with a label.
 */
const MyToggle: React.FC<ToggleProps> = ({ label, checked, onChange }) => {
  return (
    <label className={styles["toggle-label"]}>
      {/* Hidden checkbox input for toggle functionality */}
      <input
        type="checkbox"
        checked={checked} // Controlled component
        onChange={(e) => onChange(e.target.checked)} // Call the parent function with the updated state
      />
      {label} {/* Display toggle label */}
    </label>
  );
};

export default MyToggle;
