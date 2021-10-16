import React from "react";

import styles from "../styles/components/Input.module.css";

interface Props {
  value: string;
  label: string;
  onChange: (value: string) => void;
}

const Input: React.FC<Props> = ({ value, label, onChange }) => {
  const id = `${Math.ceil(Math.random() * 5)}`;
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label}
      />
    </div>
  );
};

export default Input;
