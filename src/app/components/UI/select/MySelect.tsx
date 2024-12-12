import React from 'react';
import { MySelectProps, Post } from '@/app/types';
import styles from './MySelect.module.css';


/**
 * A reusable and customizable dropdown (select) component.
 *
 * This component allows rendering a list of options with a default placeholder and the ability
 * to handle changes in the selected value. It is designed to work with objects of type `Post`.
 *
 * @component
 * @param {MySelectProps} props - The properties for the `MySelect` component.
 * @param {Array<{value: keyof Post, name: string}>} props.options - An array of selectable options, where each option has a `value` (field in `Post`) and a `name` (display text).
 * @param {string} props.defaultValue - The placeholder text shown when no value is selected.
 * @param {keyof Post | ''} props.value - The currently selected value, which should match one of the options.
 * @param {(newValue: keyof Post) => void} props.onChange - Callback function triggered when the selected value changes.
 *
 * @returns {JSX.Element} A `<select>` dropdown element with options.
 */
const MySelect: React.FC<MySelectProps> = ({ options, defaultValue, value, onChange }) => {
  return (
    <div className={styles['select-container']}>
    <select className={styles['my-select']} value={value} onChange={event => onChange(event.target.value as keyof Post)} // Converts selected value to a key of `Post`
    > {/* Questionable. We have to adapt the type better */}

      {/* Default option, disabled to act as a placeholder */}
      <option disabled value="">{defaultValue}</option>

      {/* Dynamically generate options based on the `options` array */}
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
    </div>
  );
};

export default MySelect;