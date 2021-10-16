import React from "react";
import Image from "next/image";

import Card from "./Card";

import styles from "../styles/components/JobCard.module.css";

interface Props {
  title: string;
  description: string;
  companyName: string;
  companyLogo: string;
}

// A component that renders the job data
const JobCard: React.FC<Props> = ({
  title,
  description,
  companyName,
  companyLogo,
}) => {
  return (
    <Card>
      <div className={styles.cardContainer}>
        <aside className={styles.cardSider}>
          {companyLogo && (
            <img
              src={companyLogo}
              alt={`${companyName} Logo`}
              className={styles.companyLogo}
            />
          )}
        </aside>

        <div className={styles.cardContent}>
          <header className={styles.cardHeader}>
            <h1 className={styles.title}>{title}</h1>
            <h2 className={styles.companyName}>{companyName}</h2>
          </header>
          <hr className={styles.divider} />
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </Card>
  );
};

export default JobCard;
