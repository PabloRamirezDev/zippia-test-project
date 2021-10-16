import React from "react";

import styles from "../styles/components/Input.module.css";

interface Props {
  value: string;
  label: string;
  onChange: (value: string) => void;
}

// A simple input component
const Input: React.FC<Props> = ({ value, label, onChange }) => {
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label}
      />
    </div>
  );
};

export default Input;
