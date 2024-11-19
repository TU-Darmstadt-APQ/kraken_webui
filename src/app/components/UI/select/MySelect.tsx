import React from 'react';
import { MySelectOption, MySelectProps, Post } from "../../../types";


const MySelect: React.FC<MySelectProps> = ({ options, defaultValue, value, onChange }) => {
  return (
    <select value={value} onChange={event => onChange(event.target.value as keyof Post)}> {/*Fraglich. Man muss den Typen besser anpassen */}
      <option disabled value="">{defaultValue}</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default MySelect;