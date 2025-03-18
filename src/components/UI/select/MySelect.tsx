import { MySelectProps } from "@/types";
import React from "react";
import styles from "./MySelect.module.css";
import { tinkerforgeDTO } from "@/models/zTinkerforgeSensor.schema";

/**
 * A reusable and customizable dropdown (select) component.
 *
 * This component provides:
 * - Dynamic option rendering: Accepts an array of objects containing `value` and `name` properties.
 * - Controlled state management: The `value` prop determines the currently selected option.
 * - Callback function: Calls `onChange` when the user selects a different option.
 *
 * @component
 * @param {Array<{value: keyof tinkerforgeDTO, name: string}>} options - An array of selectable options, where each option has a `value` (field in `tinkerforgeDTO`) and a `name` (display text).
 * @param {string} defaultValue - Placeholder text shown when no value is selected.
 * @param {keyof tinkerforgeDTO | ''} value - The currently selected value.
 * @param {(newValue: keyof tinkerforgeDTO) => void} onChange - Callback function triggered when the selected value changes.
 *
 * @example
 * const options = [
 *   { value: "title", name: "Name" },
 *   { value: "description", name: "Description" },
 *   { value: "enabled", name: "Enabled" }
 * ];
 *
 * <MySelect
 *   options={options}
 *   defaultValue="Select a field"
 *   value={selectedField}
 *   onChange={setSelectedField}
 * />
 *
 * @returns {JSX.Element} A `<select>` dropdown element.
 */
const MySelect: React.FC<MySelectProps> = ({
  options,
  defaultValue,
  value,
  onChange,
}) => {
  return (
    <div className={styles["select-container"]}>
      <select
        className={styles["my-select"]}
        value={value}
        onChange={(event) =>
          onChange(event.target.value as keyof tinkerforgeDTO)
        } // Converts selected value to a key of `tinkerforgeDTO`
      >
        {/* Default disabled option, acting as a placeholder */}
        <option disabled value="">
          {defaultValue}
        </option>

        {/* Generate dropdown options dynamically, based on the `options` array */}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MySelect;
