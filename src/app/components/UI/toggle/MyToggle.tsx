import { ToggleProps } from '@/app/types';
import React from 'react';
import styles from './MyToggle.module.css';


const MyToggle: React.FC<ToggleProps> = ({ label, checked, onChange }) => {
  return (
    <label className={styles["toggle-label"]}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label}
    </label>
  );
};

export default MyToggle;