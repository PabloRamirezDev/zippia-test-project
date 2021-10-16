import React from "react";

import styles from "../styles/components/Card.module.css";

interface Props {}

// Base card component
const Card: React.FC<Props> = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};

export default Card;
